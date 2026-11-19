#!/usr/bin/env python3
"""Extract the full 256-preset / 675-sample Kurzweil K250 sound bank from
/home/jon/Desktop/FM1_Firmware/web_emulator/index.html into lazy-loadable
GitHub Pages assets under docs/:
  - docs/k250_presets_and_zones.js  (all 256 k250Presets + 42 MS_* tables + findClosestSample + playVoiceByType)
  - docs/k250_chunks/manifest.json  (sampleKey -> chunk index)
  - docs/k250_chunks/chunk_XX.json  (675 real MP3 base64 samples split into ~3 MB chunks)
"""
import json
import os
import re

SRC_HTML = '/home/jon/Desktop/FM1_Firmware/web_emulator/index.html'
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DOCS_DIR = os.path.join(ROOT, 'docs')
CHUNKS_DIR = os.path.join(DOCS_DIR, 'k250_chunks')
os.makedirs(CHUNKS_DIR, exist_ok=True)

txt = open(SRC_HTML, 'r', encoding='utf-8', errors='ignore').read()
lines = txt.splitlines()

# 1. Extract k250Presets (256 presets)
m_p = re.search(r'const k250Presets = (\[.*?\n\s*\]);', txt, re.S)
assert m_p, 'k250Presets not found'
presets_json = m_p.group(1)
presets = json.loads(presets_json)
print(f'Extracted {len(presets)} K250 presets')

# 2. Extract K250_SAMPLES (675 base64 MP3 samples)
m_s = re.search(r'const K250_SAMPLES = (\{.*?\});', txt)
assert m_s, 'K250_SAMPLES not found'
samples = json.loads(m_s.group(1))
print(f'Extracted {len(samples)} K250 multi-samples')

# 3. Extract DX7_ALGORITHMS + dx7Bank, LAYER_BASE_NOTES, all MS_* tables, findClosestSample, playVoiceByType,
#    and all 11 real K250 DSP/sampler voice engines (through play808Drum, before playVaSynth)
l_dx7_alg = next(i for i, l in enumerate(lines) if 'const DX7_ALGORITHMS =' in l)
l_dx7 = next(i for i, l in enumerate(lines) if 'const dx7Bank =' in l)
bdepth = 0; l_dx7_end = l_dx7
for i in range(l_dx7, len(lines)):
    bdepth += lines[i].count('[') - lines[i].count(']')
    if i >= l_dx7 and bdepth <= 0 and ']' in lines[i]:
        l_dx7_end = i; break
dx7_code = '\n'.join(lines[l_dx7_alg:l_dx7_end + 1]) + '\nlet activeDx7PatchIdx = 0;\n'

l_layer = next(i for i, l in enumerate(lines) if 'const LAYER_BASE_NOTES' in l)
l_ms_start = next(i for i, l in enumerate(lines) if 'const MS_STEINWAY' in l)
l_va_start = next(i for i, l in enumerate(lines) if 'function playVaSynth(' in l)

# Extract LAYER_BASE_NOTES block cleanly
depth = 0; l_layer_end = l_layer
for i in range(l_layer, l_ms_start):
    depth += lines[i].count('{') - lines[i].count('}')
    if i >= l_layer and depth <= 0 and '}' in lines[i]:
        l_layer_end = i; break

layer_code = '\n'.join(lines[l_layer:l_layer_end + 1])
zones_and_engines = '\n'.join(lines[l_ms_start:l_va_start])

# Rewrite ALL decodedBuffers[expr] existence checks to hasK250Sample(expr) so
# findClosestSample(), MS_VIBES/MS_MARIMBA/MS_CELESTA/MS_XYLO/MS_GLOCK/MS_HARPSICHORD,
# drum kit sample lookups, and playVoiceByType() all see all 675 lazy-loaded samples!
def replace_decoded_buffers(code_str):
    out = []
    i = 0
    needle = 'decodedBuffers['
    n = len(code_str)
    while i < n:
        idx = code_str.find(needle, i)
        if idx == -1:
            out.append(code_str[i:])
            break
        out.append(code_str[i:idx])
        # Find matching ']' handling nested brackets like MS_MARIMBA[0].key
        j = idx + len(needle)
        bdepth = 1
        while j < n and bdepth > 0:
            if code_str[j] == '[': bdepth += 1
            elif code_str[j] == ']': bdepth -= 1
            j += 1
        expr = code_str[idx + len(needle):j - 1]
        out.append(f'hasK250Sample({expr})')
        i = j
    return ''.join(out)

zones_and_engines = replace_decoded_buffers(zones_and_engines)

# Patch instrument routing bugs discovered during full 256-preset ROM audit:
# 1. Woodwinds 155-160 (Clarinet/Flute, Oboe/Eng Horn, Tin Whistle, Quena, Bagpipes, Ocarina)
#    were misrouted to Saxophone because of `|| p.id >= 150`.
zones_and_engines = zones_and_engines.replace(
    'const isSax = pName.includes("SAX") || p.id >= 150;',
    'const isSax = pName.includes("SAX") || (p.id >= 150 && p.id <= 154);'
)
zones_and_engines = zones_and_engines.replace(
    'if (pName.includes("PICCOLO") || p.id === 138 || p.id === 149) {',
    'if (pName.includes("PICCOLO") || pName.includes("WHISTLE") || p.id === 138 || p.id === 149 || p.id === 157) {'
)
zones_and_engines = zones_and_engines.replace(
    '} else if (pName.includes("OBOE") || pName.includes("ENGLISH")) {',
    '} else if (pName.includes("OBOE") || pName.includes("ENGLISH") || pName.includes("BAGPIPE")) {'
)
# 2. Guitars: 188 (Clean Strat) & 193 (12-String Rickenbacker) were misrouted to Acoustic Guitar
#    instead of real sampled Electric Guitar (emily_gtr_* / MS_GTR_FULL), and 194 to MS_GTR_HARM (emily_soft_*).
zones_and_engines = zones_and_engines.replace(
    'const isAcGtr = p.name.includes("NYLON") || p.name.includes("CLASSICAL") || p.name.includes("ACOUSTIC") || p.name.includes("12-STRING") || p.id === 185 || p.id === 186 || p.id === 187 || p.id === 188 || p.id === 193;',
    'const isAcGtr = p.id === 185 || p.id === 186 || p.id === 187 || p.name.includes("NYLON") || p.name.includes("CLASSICAL");'
)
zones_and_engines = zones_and_engines.replace(
    'else if ((isDist || p.name.includes("ROCK") || p.name.includes("STRAT")) && typeof MS_GTR_ELECTRIC !== "undefined") gTable = MS_GTR_ELECTRIC;',
    'else if ((p.name.includes("STRAT") || p.id === 188 || p.id === 193) && typeof MS_GTR_FULL !== "undefined") gTable = MS_GTR_FULL;\n        else if ((isDist || p.name.includes("ROCK")) && typeof MS_GTR_ELECTRIC !== "undefined") gTable = MS_GTR_ELECTRIC;'
)
# 3. Brass: 109 (Cup Muted Trumpet) uses real Harmon/Muted Trumpet multi-samples (MS_TRUMPET_HARMON).
zones_and_engines = zones_and_engines.replace(
    'const isHarmon = pName.includes("HARMON") || pName.includes("MILES") || p.id === 108;',
    'const isHarmon = pName.includes("HARMON") || pName.includes("MILES") || pName.includes("CUP MUTED") || p.id === 108 || p.id === 109;'
)
# 4. Electric Basses (196-200, 206): use real sampled electric bass (MS_GTR_ELECTRIC pitched -1 oct)
#    instead of pure oscillator fallback.
zones_and_engines = zones_and_engines.replace(
    '        } else {\n          playAuthenticBassVoice(midiNote, effMidi, velocity, p);\n        }',
    '        } else if ((p.id >= 196 && p.id <= 200) || p.id === 206) {\n          const bMidi = effMidi + 12;\n          const sampleInfo = findClosestSample(MS_GTR_ELECTRIC, bMidi, "bg_el_e3");\n          const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);\n          const isSlap = pName.includes("SLAP") || pName.includes("POP");\n          const isFretless = pName.includes("FRETLESS");\n          playSamplerVoice({\n            key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity: velocity * 1.15,\n            attack: isFretless ? 0.018 : 0.002, decay: Math.max(p.dec || 2.8, 2.4),\n            cutoff: isSlap ? 7200 : (isFretless ? 3200 : 4200), res: isSlap ? 2.4 : (isFretless ? 2.0 : 1.0),\n            detune: (p.det || 0) + (sampleInfo.tune || 0),\n            vibratoRate: isFretless ? 4.8 : 0, vibratoDepth: isFretless ? 7 : 0,\n            canLoop: false, naturalSustain: true, releaseTime: 0.24\n          });\n        } else {\n          playAuthenticBassVoice(midiNote, effMidi, velocity, p);\n        }'
)
# 5. Mallets: 216 (Crotales) -> MS_GLOCK, 217 (Balafon) -> MS_MARIMBA, 231 (Marimba & Vibes Duet) -> both!
zones_and_engines = zones_and_engines.replace(
    'else if ((p.id === 212 || pName.includes("MARIMBA")) && typeof MS_MARIMBA !== "undefined" && MS_MARIMBA.length && hasK250Sample(MS_MARIMBA[0].key)) mTbl = MS_MARIMBA;',
    'else if ((p.id === 212 || p.id === 217 || pName.includes("MARIMBA") || pName.includes("BALAFON")) && typeof MS_MARIMBA !== "undefined" && MS_MARIMBA.length && hasK250Sample(MS_MARIMBA[0].key)) mTbl = MS_MARIMBA;'
)
zones_and_engines = zones_and_engines.replace(
    'else if ((p.id === 215 || pName.includes("GLOCKENSPIEL")) && typeof MS_GLOCK !== "undefined" && MS_GLOCK.length && hasK250Sample(MS_GLOCK[0].key)) mTbl = MS_GLOCK;',
    'else if ((p.id === 215 || p.id === 216 || pName.includes("GLOCKENSPIEL") || pName.includes("CROTALES")) && typeof MS_GLOCK !== "undefined" && MS_GLOCK.length && hasK250Sample(MS_GLOCK[0].key)) mTbl = MS_GLOCK;'
)

out_js = os.path.join(DOCS_DIR, 'k250_presets_and_zones.js')
with open(out_js, 'w', encoding='utf-8') as f:
    f.write('// Auto-extracted Kurzweil K250 256-Preset, 675-Sample Zone Tables & Voice Engines\n')
    f.write('function hasK250Sample(k) { return Boolean((window.decodedBuffers && window.decodedBuffers[k]) || (window.K250_MANIFEST && window.K250_MANIFEST[k] !== undefined)); }\n')
    f.write('const K250_PRESETS = ' + presets_json + ';\n\n')
    f.write(dx7_code + '\n')
    f.write(layer_code + '\n\n')
    f.write(zones_and_engines + '\n')
print(f'Wrote {out_js} ({os.path.getsize(out_js)/1024:.1f} KB)')

# 4. Split 675 samples into ~3 MB chunks (putting Steinway sal_* first in chunk_00 for instant piano!)
keys_sorted = sorted(samples.keys(), key=lambda k: (0 if k.startswith('sal_') else 1, k))
MAX_CHUNK_BYTES = 3_200_000
chunks = []
cur_chunk = {}
cur_bytes = 0
for k in keys_sorted:
    v = samples[k]
    sz = len(k) + len(v) + 8
    if cur_chunk and cur_bytes + sz > MAX_CHUNK_BYTES:
        chunks.append(cur_chunk)
        cur_chunk = {}
        cur_bytes = 0
    cur_chunk[k] = v
    cur_bytes += sz
if cur_chunk:
    chunks.append(cur_chunk)

manifest = {}
for idx, ch in enumerate(chunks):
    cname = f'chunk_{idx:02d}.json'
    cpath = os.path.join(CHUNKS_DIR, cname)
    with open(cpath, 'w', encoding='utf-8') as f:
        json.dump(ch, f, separators=(',', ':'))
    for k in ch:
        manifest[k] = idx
    print(f'  {cname}: {len(ch):3d} samples ({os.path.getsize(cpath)/1048576:.2f} MB)')

mpath = os.path.join(CHUNKS_DIR, 'manifest.json')
with open(mpath, 'w', encoding='utf-8') as f:
    json.dump(manifest, f, separators=(',', ':'))
print(f'Wrote {mpath} ({len(manifest)} sample keys across {len(chunks)} chunks)')
