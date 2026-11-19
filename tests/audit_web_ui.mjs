#!/usr/bin/env node
/**
 * Automated Chrome DevTools Protocol (CDP) UI/UX, Layout, Accessibility, and
 * Functional Bug Auditor for FM-1 Stack Trace Web UI.
 *
 * Uses local google-chrome + Node built-in fetch/WebSocket (zero npm deps).
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_URL = process.argv[2] || 'https://jonludwig1234.github.io/fm1-stacktrace-cfw/';
const SCREENSHOT_DIR = process.argv[3] || '/tmp/fm1_ui_audit';
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const PORT = 9222 + Math.floor(Math.random() * 500);
const chrome = spawn('google-chrome', [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--autoplay-policy=no-user-gesture-required',
  `--remote-debugging-port=${PORT}`,
  'about:blank'
], { stdio: ['ignore', 'pipe', 'pipe'] });

async function waitForDevTools(port, timeoutMs = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/list`);
      const list = await r.json();
      const page = list.find(t => t.type === 'page');
      if (page && page.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {}
    await new Promise(r => setTimeout(r, 150));
  }
  throw new Error('Timed out waiting for Chrome DevTools endpoint');
}

class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.events = [];
    this.ready = new Promise((res, rej) => {
      this.ws.onopen = res;
      this.ws.onerror = rej;
    });
    this.ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { res, rej } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) rej(new Error(msg.error.message));
        else res(msg.result);
      } else if (msg.method) {
        this.events.push(msg);
      }
    };
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((res, rej) => {
      this.pending.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async eval(expression) {
    const r = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (r.exceptionDetails) {
      throw new Error(r.exceptionDetails.text || JSON.stringify(r.exceptionDetails));
    }
    return r.result?.value;
  }
  async screenshot(filename) {
    const { data } = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(SCREENSHOT_DIR, filename), Buffer.from(data, 'base64'));
  }
  close() { this.ws.close(); }
}

const findings = [];
function report(severity, category, summary, detail = '') {
  findings.push({ severity, category, summary, detail });
}

try {
  const wsUrl = await waitForDevTools(PORT);
  const cdp = new CDP(wsUrl);
  await cdp.ready;
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Log.enable');

  // 1. Load page at 1440x900
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1440, height: 900, deviceScaleFactor: 1, mobile: false
  });
  await cdp.send('Page.navigate', { url: TARGET_URL });
  await new Promise(r => setTimeout(r, 1500));

  const title = await cdp.eval('document.title');
  console.log(`Loaded: ${title} (${TARGET_URL})`);
  await cdp.screenshot('audit_1440x900.png');

  // 2. Multi-viewport layout & overflow audit
  for (const [w, h] of [[1440, 900], [1280, 720], [1024, 640]]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: w, height: h, deviceScaleFactor: 1, mobile: false
    });
    await new Promise(r => setTimeout(r, 250));

    const layout = await cdp.eval(`(() => {
      const docOverflowX = document.documentElement.scrollWidth > window.innerWidth;
      const clipped = [];
      const offscreen = [];
      const els = document.querySelectorAll('button, .btn, .track-pill, .macro-name, .preset-title, .brand, .topbar, .dock-bar');
      for (const el of els) {
        const st = getComputedStyle(el);
        if (st.display === 'none' || st.visibility === 'hidden') continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.right > window.innerWidth + 1 || r.bottom > window.innerHeight + 1) {
          offscreen.push({ tag: el.tagName, cls: el.className, text: el.textContent.trim().slice(0,30), right: Math.round(r.right), bottom: Math.round(r.bottom) });
        }
        if (el.scrollWidth > el.clientWidth + 2 && st.textOverflow !== 'ellipsis') {
          clipped.push({ tag: el.tagName, cls: el.className, text: el.textContent.trim().slice(0,30), sw: el.scrollWidth, cw: el.clientWidth });
        }
      }
      // Check engine popover alignment
      document.getElementById('engineBadge').click();
      const badgeR = document.getElementById('engineBadge').getBoundingClientRect();
      const popR = document.getElementById('enginePopover').getBoundingClientRect();
      document.body.click();
      return { docOverflowX, clipped, offscreen, badgeR: { left: Math.round(badgeR.left), bottom: Math.round(badgeR.bottom) }, popR: { left: Math.round(popR.left), top: Math.round(popR.top), right: Math.round(popR.right) } };
    })()`);

    if (w === 1024) await cdp.screenshot('audit_1024x640.png');

    if (layout.docOverflowX) {
      report('HIGH', 'LAYOUT', `Horizontal page overflow at ${w}x${h}`);
    }
    if (layout.clipped.length) {
      report('MEDIUM', 'LAYOUT', `${layout.clipped.length} elements have clipped text at ${w}x${h}`, JSON.stringify(layout.clipped.slice(0, 5)));
    }
    if (layout.offscreen.length) {
      report('MEDIUM', 'LAYOUT', `${layout.offscreen.length} elements extend offscreen at ${w}x${h}`, JSON.stringify(layout.offscreen.slice(0, 5)));
    }
    if (Math.abs(layout.popR.left - layout.badgeR.left) > 20 || Math.abs(layout.popR.top - layout.badgeR.bottom) > 20) {
      report('MEDIUM', 'UI/UX', `Engine popover uses hardcoded fixed coordinates (left=${layout.popR.left}, top=${layout.popR.top}) instead of anchoring to #engineBadge (left=${layout.badgeR.left}, bottom=${layout.badgeR.bottom}) at ${w}x${h}`);
    }
  }

  // Restore 1440x900 for functional tests
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1440, height: 900, deviceScaleFactor: 1, mobile: false
  });
  await new Promise(r => setTimeout(r, 200));

  // 3. Functional Bug Probes
  const funcResults = await cdp.eval(`(() => {
    const out = {};

    // 3a: Track switching macro persistence bug?
    // Edit macro 0 on track 4, switch to track 1, switch back to track 4.
    const origM0 = state.macros[0];
    state.macros[0] = 11;
    document.querySelector('[data-t="0"]').click();
    document.querySelector('[data-t="3"]').click();
    out.macroLostOnTrackSwitch = (state.macros[0] !== 11);
    out.macroAfterSwitchBack = state.macros[0];

    // 3b: A/B compare bug?
    // Edit macro 0 to 15, click A/B (should go to B), edit B to 88, click A/B (should return 15)
    state.macros[0] = 15;
    document.getElementById('abBtn').click();
    const bVal = state.macros[0];
    state.macros[0] = 88;
    document.getElementById('abBtn').click();
    const aValBack = state.macros[0];
    out.abCompare = { bVal, aValBack, ok: (aValBack === 15) };

    // 3c: Check if track mute/volume in 8-Bus Mixer affects audio playback
    document.querySelector('[data-dock="mix"]').click();
    const mixSliders = document.querySelectorAll('[data-mix]').length;
    const mixMuteBtns = document.querySelectorAll('.mix-ch button').length;
    out.mixer = { mixSliders, mixMuteBtns };

    // 3d: Check if FX / LFO / ENV / Track volume controls are wired to Web Audio DSP
    const pn = playNote.toString();
    out.fxWiredToAudio = pn.includes('updateMasterFx') || pn.includes('state.fx');
    out.lfoWiredToAudio = pn.includes('state.lfo');
    out.envSustainReleaseWired = pn.includes('state.env.s') && pn.includes('state.env.r');
    out.trackVolWiredToAudio = pn.includes('t.vol') && pn.includes('t.mute');

    // 3e: Check keyboard octave / sustained notes / polyphony & stuck-note handling
    out.keyMapHasBlackKeys = ('w' in KEY_MAP);
    out.unmappedKeyLabels = (() => {
      document.querySelector('[data-dock="keys"]').click();
      const labels = [...document.querySelectorAll('.w-key')].map(k => k.textContent.trim().toLowerCase()).filter(Boolean);
      return labels.filter(ch => !(ch in KEY_MAP));
    })();

    // 3f: Check preset count claim vs actual PRESETS array length
    out.presetCountClaimed = document.getElementById('cmdTrigger').textContent.trim();
    out.actualPresetCount = PRESETS.length;

    // 3g: Check 128-step sequencer claim vs actual step count
    document.querySelector('[data-dock="seq"]').click();
    out.seqStepPads = document.querySelectorAll('.step-pad').length;
    out.hasBankABToggle = !!document.querySelector('[data-bank], #bankToggle');

    // 3h: Check if clicking 'PLAY' triggers sequencer and updates step highlight
    document.getElementById('playBtn').click();
    const isPlaying = state.playing;
    document.getElementById('playBtn').click();
    out.playTogglesCleanly = isPlaying && !state.playing;

    return out;
  })()`);

  if (funcResults.macroLostOnTrackSwitch) {
    report('HIGH', 'FUNCTIONALITY', 'Tweaked macro values are silently lost when switching tracks',
      `Edited Track 4 macro[0] to 11, switched to Track 1 and back -> reverted to ${funcResults.macroAfterSwitchBack} (macros are stored in global state.macros instead of per-track).`);
  }
  if (!funcResults.fxWiredToAudio) {
    report('HIGH', 'DSP/AUDIO', 'Grit & Punch FX drawer sliders (Overdrive, Bitcrush, Phaser, Hall Reverb) do not affect Web Audio output',
      'Sliders update state.fx and the 240x240 LCD, but playNote() never reads state.fx.');
  }
  if (!funcResults.lfoWiredToAudio) {
    report('HIGH', 'DSP/AUDIO', 'LFO Mod drawer controls (Rate, Depth) are not wired to Web Audio',
      'Sliders update state.lfo, but no LFO oscillator/modulator is connected in playNote().');
  }
  if (!funcResults.envSustainReleaseWired) {
    report('MEDIUM', 'DSP/AUDIO', 'ENV Sustain & Release sliders do not affect Web Audio envelope',
      'Only state.env.a (Attack) is read in playNote(); Decay uses macro[2] instead of state.env.d, and Sustain/Release are unused.');
  }
  if (!funcResults.trackVolWiredToAudio || funcResults.mixer.mixMuteBtns === 0) {
    report('MEDIUM', 'FUNCTIONALITY', '8-Bus Mixer channel volumes are not applied in Web Audio and Mute/Solo buttons are missing',
      `mixSliders=${funcResults.mixer.mixSliders}, mixMuteBtns=${funcResults.mixer.mixMuteBtns}, trackVolWired=${funcResults.trackVolWiredToAudio}`);
  }
  if (funcResults.unmappedKeyLabels.length) {
    report('LOW', 'UI/UX', `Keybed labels ${JSON.stringify(funcResults.unmappedKeyLabels)} are displayed on keys but not mapped in KEY_MAP`);
  }
  if (funcResults.actualPresetCount < 256) {
    report('INFO', 'PROTOTYPE SCOPE', `Search bar advertises 256 presets while prototype ships ${funcResults.actualPresetCount} sample presets`);
  }
  if (!funcResults.hasBankABToggle) {
    report('INFO', 'PROTOTYPE SCOPE', `Bottom dock tab says "16/128-STEP SEQ" with ${funcResults.seqStepPads} steps and no Bank A/B page selector yet`);
  }

  // 4. Accessibility (a11y) Audit
  const a11y = await cdp.eval(`(() => {
    const nonFocusableClickable = [];
    for (const el of document.querySelectorAll('.cmd-trigger, .bpm-pill, .hw-badge, .preset-item, .track-pill, .step-pad, .macro-knob, .w-key, .b-key, .pill')) {
      if (el.tagName !== 'BUTTON' && el.tagName !== 'A' && el.tabIndex < 0) {
        nonFocusableClickable.push(el.className.split(' ')[0]);
      }
    }
    const unlabeledInputs = [];
    for (const inp of document.querySelectorAll('input')) {
      const hasLabel = !!inp.getAttribute('aria-label') || !!inp.closest('label') || (inp.id && !!document.querySelector('label[for="'+inp.id+'"]'));
      if (!hasLabel) unlabeledInputs.push(inp.id || inp.type);
    }
    const uniqueNonFocusable = [...new Set(nonFocusableClickable)];
    return { uniqueNonFocusable, unlabeledInputs };
  })()`);

  if (a11y.uniqueNonFocusable.length) {
    report('MEDIUM', 'ACCESSIBILITY', `${a11y.uniqueNonFocusable.length} interactive control types are non-keyboard-focusable <div>/<span> elements`,
      `Classes missing tabindex/role="button": ${a11y.uniqueNonFocusable.join(', ')}`);
  }
  if (a11y.unlabeledInputs.length) {
    report('LOW', 'ACCESSIBILITY', `${a11y.unlabeledInputs.length} <input> elements lack aria-label or <label>`,
      `Inputs: ${a11y.unlabeledInputs.join(', ')}`);
  }

  // 5. Console / Page errors
  const runtimeErrors = cdp.events.filter(e =>
    e.method === 'Runtime.exceptionThrown' ||
    (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error') ||
    (e.method === 'Log.entryAdded' && e.params.entry.level === 'error')
  );
  if (runtimeErrors.length) {
    report('HIGH', 'RUNTIME', `${runtimeErrors.length} browser console/runtime errors detected`,
      JSON.stringify(runtimeErrors.slice(0, 3)));
  }

  console.log('\n=== AUDIT SUMMARY ===');
  console.log(`Runtime/Console Errors: ${runtimeErrors.length}`);
  console.log(`Total Findings: ${findings.length}`);
  for (const f of findings) {
    console.log(`[${f.severity}] (${f.category}) ${f.summary}${f.detail ? '\n    -> ' + f.detail : ''}`);
  }
  console.log(`Screenshots saved to: ${SCREENSHOT_DIR}`);

  cdp.close();
} finally {
  chrome.kill('SIGKILL');
}
