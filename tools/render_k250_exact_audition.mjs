#!/usr/bin/env node
/**
 * Renders exact-MIDI arrangements through the REAL 675-sample Kurzweil K250
 * Web Workstation (/home/jon/Desktop/FM1_Firmware/web_emulator/index.html)
 * via Chrome DevTools Protocol (zero npm deps).
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const HTML_URL = 'file:///home/jon/Desktop/FM1_Firmware/web_emulator/index.html';
const SRC_DIR = '/home/jon/projects/fm1_campaign';
const OUT_DIR = process.argv[2] || '/home/jon/.gemini/antigravity/brain/e9b5a9f3-15e9-4e66-a923-0a513a876ef5/scratch/audition';
const TARGETS = process.argv.slice(3).length ? process.argv.slice(3) : ['orchestra', 'march'];

fs.mkdirSync(OUT_DIR, { recursive: true });

const CONFIGS = {
  orchestra: {
    json: 'beethoven3_events.json',
    outName: 'Song1_Beethoven_Orch_K250_EXACT.wav',
    duration: 56.0, bpm: 132, reverbNorm: 0.46,
    vols:  [0.88, 0.80, 0.80, 0.94, 0.78, 0.78, 0.82, 0.58],
    pans:  [-0.52, 0.34, 0.16, -0.14, -0.26, 0.24, -0.40, 0.04],
    verbs: [0.48, 0.40, 0.46, 0.38, 0.48, 0.46, 0.48, 0.44],
  },
  jazz: {
    json: 'jazz_events.json',
    outName: 'Song2_Jazz_AllStar_K250_EXACT.wav',
    duration: 112.0, bpm: 140, reverbNorm: 0.30,
    vols:  [0.96, 0.94, 0.82, 0.88, 0.92, 0.94, 0.92, 0.78],
    pans:  [0.02, -0.04, -0.44, -0.06, -0.28, 0.26, 0.16, 0.46],
    verbs: [0.20, 0.12, 0.28, 0.24, 0.30, 0.30, 0.28, 0.22],
  },
  march: {
    json: 'march_events.json',
    outName: 'Song3_Stars_And_Stripes_March_K250_EXACT.wav',
    duration: 87.0, bpm: 132, reverbNorm: 0.42,
    vols:  [0.98, 1.04, 1.06, 0.72, 1.00, 0.90, 0.88, 0.98],
    pans:  [-0.06, 0.04, -0.52, 0.50, -0.58, 0.52, -0.34, 0.40],
    verbs: [0.30, 0.22, 0.44, 0.44, 0.42, 0.40, 0.36, 0.40],
  },
  mixed: {
    json: 'mixed_events.json',
    outName: 'Song4_AllBank_Mix_K250_EXACT.wav',
    duration: 102.0, bpm: 116, reverbNorm: 0.28,
    vols:  [0.96, 0.94, 0.74, 0.84, 0.98, 0.76, 0.72, 0.84],
    pans:  [-0.22, 0.00, 0.00, 0.00, -0.26, 0.00, 0.26, 0.16],
    verbs: [0.24, 0.14, 0.12, 0.32, 0.34, 0.14, 0.20, 0.34],
  },
  fox: {
    json: 'fox_events.json',
    outName: 'Song5_20th_Century_Fox_Fanfare_K250_EXACT.wav',
    duration: 23.0, bpm: 114, reverbNorm: 0.38,
    vols:  [0.98, 1.04, 0.85, 0.90, 0.92, 0.98, 1.02, 0.85],
    pans:  [-0.08, 0.04, 0.00, -0.30, 0.24, -0.34, 0.28, 0.00],
    verbs: [0.28, 0.24, 0.36, 0.38, 0.36, 0.38, 0.38, 0.30],
  }
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function waitForDevTools(port, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/list`);
      const list = await r.json();
      const page = list.find(t => t.type === 'page');
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(150);
  }
  throw new Error('Timed out waiting for Chrome DevTools');
}

class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.ready = new Promise((res, rej) => { this.ws.onopen = res; this.ws.onerror = rej; });
    this.ws.onmessage = (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id && this.pending.has(m.id)) {
        const { res, rej } = this.pending.get(m.id);
        this.pending.delete(m.id);
        if (m.error) rej(new Error(m.error.message)); else res(m.result);
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
    const r = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text || JSON.stringify(r.exceptionDetails));
    return r.result?.value;
  }
  close() { this.ws.close(); }
}

async function renderSong(name) {
  const cfg = CONFIGS[name];
  const dlDir = path.join(OUT_DIR, `_dl_${name}`);
  fs.rmSync(dlDir, { recursive: true, force: true });
  fs.mkdirSync(dlDir, { recursive: true });

  const data = JSON.parse(fs.readFileSync(path.join(SRC_DIR, cfg.json), 'utf8'));
  const actions = [];
  data.events.forEach((ev, idx) => {
    const key = `k_${idx}_${ev.bus}_${ev.midi}`;
    actions.push({ type: 'on',  t: ev.tOn,  bus: ev.bus, presetIdx: ev.presetIdx, midi: ev.midi, vel: ev.vel, eng: ev.eng || 'k250', key });
    actions.push({ type: 'off', t: ev.tOff, key });
  });
  actions.sort((a, b) => a.t - b.t || (a.type === 'off' ? -1 : 1));
  const lastT = actions.length ? actions[actions.length - 1].t : cfg.duration;

  const port = 9300 + Math.floor(Math.random() * 400);
  const chrome = spawn('google-chrome', [
    '--headless=new', '--disable-gpu', '--no-sandbox',
    '--autoplay-policy=no-user-gesture-required',
    `--remote-debugging-port=${port}`, 'about:blank'
  ], { stdio: 'ignore' });

  try {
    const wsUrl = await waitForDevTools(port);
    const cdp = new CDP(wsUrl);
    await cdp.ready;
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: dlDir });
    await cdp.send('Page.navigate', { url: HTML_URL });
    await sleep(1200);

    // Power on workstation, wait for all 675 K250 multi-samples to decode, configure 8-bus mixer, start REC
    await cdp.eval(`(async () => {
      const pwr = document.getElementById('btn-power');
      if (pwr) pwr.click();
      await new Promise(r => setTimeout(r, 1200));
      if (typeof initAudio === 'function') initAudio();
      if (audioCtx.state === 'suspended') await audioCtx.resume();
      if (typeof metronomeEnabled !== 'undefined') metronomeEnabled = false;
      const totalSamples = (typeof K250_SAMPLES !== 'undefined') ? Object.keys(K250_SAMPLES).length : 0;
      for (let t = 0; t < 200 && (!window.__samplesReady && Object.keys(decodedBuffers).length < totalSamples); t++) {
        await new Promise(r => setTimeout(r, 100));
      }
      const c = ${JSON.stringify(cfg)};
      for (let t = 0; t < tracks.length; t++) {
        tracks[t].vol = c.vols[t] || 0;
        tracks[t].pan = c.pans[t] || 0;
        tracks[t].reverbSend = c.verbs[t] || 0;
        tracks[t].delaySend = 0.0;
        tracks[t].muted = (t >= 8 || (c.vols[t] || 0) <= 0);
      }
      if (typeof updateTrackMixerRouting === 'function') updateTrackMixerRouting();
      if (typeof reverbGain !== 'undefined' && reverbGain) reverbGain.gain.setValueAtTime(c.reverbNorm, audioCtx.currentTime);
      if (typeof setSustainPedal === 'function') setSustainPedal(false);
      if (typeof isPlaying !== 'undefined') isPlaying = false;
      if (typeof setK250Preset === 'function') setK250Preset(0);
      if (typeof generateDefaultBreakbeatBuffer === 'function' && !userSampleBuffer) generateDefaultBreakbeatBuffer(audioCtx);
      window.__k250BusOverride = null;
      const origGet = getTrackBusNode;
      getTrackBusNode = function(idx) {
        if (idx === 3 && window.__k250BusOverride !== null && window.__k250BusOverride !== undefined)
          return origGet(Math.min(7, window.__k250BusOverride));
        return origGet(idx);
      };
      document.getElementById('btn-rec').click();
    })()`);

    await sleep(200);
    console.log(`[${name}] Starting real K250 multi-sample render (${data.events.length} exact notes, ${cfg.duration}s)...`);

    const endWait = Math.max(lastT + 1.2, cfg.duration - 0.1);
    await cdp.eval(`(() => {
      const actList = ${JSON.stringify(actions)};
      const endWaitSec = ${endWait};
      window.__done = false;
      const originT = audioCtx.currentTime + 0.15;
      let cursor = 0;
      const timer = setInterval(() => {
        const horizon = audioCtx.currentTime + 0.14;
        while (cursor < actList.length && (originT + actList[cursor].t) <= horizon) {
          const act = actList[cursor++];
          const exactT = Math.max(audioCtx.currentTime, originT + act.t);
          scheduledAudioTime = exactT;
          if (act.type === 'off') {
            releaseNoteVoices(act.key, exactT);
          } else if (typeof window.triggerShowcaseEvent === 'function') {
            window.triggerShowcaseEvent(act);
          } else {
            window.__k250BusOverride = act.bus;
            playK250Instrument(act.midi, act.vel, act.presetIdx, act.key);
            window.__k250BusOverride = null;
          }
        }
        scheduledAudioTime = 0;
        if (cursor >= actList.length && (audioCtx.currentTime - originT) >= endWaitSec) {
          clearInterval(timer);
          window.__done = true;
        }
      }, 12);
    })()`);

    while (!(await cdp.eval('window.__done'))) await sleep(250);
    await sleep(350);
    await cdp.eval(`document.getElementById('btn-rec').click()`);

    let wavFile = null;
    for (let i = 0; i < 60; i++) {
      const files = fs.readdirSync(dlDir).filter(f => f.endsWith('.wav'));
      if (files.length) {
        const p = path.join(dlDir, files[0]);
        if (fs.statSync(p).size > 100000) { wavFile = p; break; }
      }
      await sleep(250);
    }
    cdp.close();
    if (!wavFile) throw new Error(`No WAV captured for ${name}`);
    const dest = path.join(OUT_DIR, cfg.outName);
    fs.copyFileSync(wavFile, dest);
    fs.rmSync(dlDir, { recursive: true, force: true });
    console.log(`[${name}] Saved REAL K250 render -> ${dest} (${(fs.statSync(dest).size / 1048576).toFixed(1)} MB)`);
  } finally {
    chrome.kill('SIGKILL');
  }
}

for (const t of TARGETS) {
  await renderSong(t);
}
