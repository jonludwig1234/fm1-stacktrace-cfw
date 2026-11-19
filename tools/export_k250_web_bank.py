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

# 3. Extract LAYER_BASE_NOTES, all MS_* tables, findClosestSample, and playVoiceByType
l_layer = next(i for i, l in enumerate(lines) if 'const LAYER_BASE_NOTES' in l)
l_ms_start = next(i for i, l in enumerate(lines) if 'const MS_STEINWAY' in l)
l_pvt_start = next(i for i, l in enumerate(lines) if 'function playVoiceByType(' in l)
depth = 0; l_pvt_end = l_pvt_start
for i in range(l_pvt_start, len(lines)):
    depth += lines[i].count('{') - lines[i].count('}')
    if i > l_pvt_start and depth <= 0:
        l_pvt_end = i; break

# Extract LAYER_BASE_NOTES block cleanly
depth = 0; l_layer_end = l_layer
for i in range(l_layer, l_ms_start):
    depth += lines[i].count('{') - lines[i].count('}')
    if i >= l_layer and depth <= 0 and '}' in lines[i]:
        l_layer_end = i; break

layer_code = '\n'.join(lines[l_layer:l_layer_end + 1])
zones_and_pvt = '\n'.join(lines[l_ms_start:l_pvt_end + 1])

# Make playVoiceByType always call playSamplerVoice even before decodedBuffers[key] is populated
# so our lazy chunk loader can fetch & decode the exact sample on demand!
zones_and_pvt = re.sub(r'if\s*\(\s*decodedBuffers\[([^\]]+)\]\s*\)', r'if (K250_MANIFEST[\1] !== undefined || decodedBuffers[\1])', zones_and_pvt)

out_js = os.path.join(DOCS_DIR, 'k250_presets_and_zones.js')
with open(out_js, 'w', encoding='utf-8') as f:
    f.write('// Auto-extracted Kurzweil K250 256-Preset & 675-Sample Zone Tables\n')
    f.write('const K250_PRESETS = ' + presets_json + ';\n\n')
    f.write(layer_code + '\n\n')
    f.write(zones_and_pvt + '\n')
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
