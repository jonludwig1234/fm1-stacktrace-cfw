#!/usr/bin/env python3
"""Export all 5 full-length authentic FM-1 Stack Trace demo songs into docs/k250_demos.json
so the live Web Studio Jukebox plays the complete compositions (9,508 exact notes) with
each event's exact Kurzweil K250 multi-sampled instrument or synth engine.
"""
import json
import os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC_DIR = os.environ.get('FM1_CAMPAIGN_DIR', '/home/jon/projects/fm1_campaign')
OUT_PATH = os.path.join(ROOT, 'docs', 'k250_demos.json')

SONGS = [
    {
        'id': 0,
        'name': '1. Beethoven Orchestra',
        'file': 'beethoven3_events.json',
        'bpm': 132,
        'tracks': ['K250', 'K250', 'K250', 'K250', 'K250', 'K250', 'K250', 'K250'],
    },
    {
        'id': 1,
        'name': '2. Jazz Big-Band',
        'file': 'jazz_events.json',
        'bpm': 140,
        'tracks': ['K250', 'K250', 'K250', 'K250', 'K250', 'K250', 'K250', 'K250'],
    },
    {
        'id': 2,
        'name': '3. Stars & Stripes March',
        'file': 'march_events.json',
        'bpm': 132,
        'tracks': ['K250', 'K250', 'K250', 'K250', 'K250', 'K250', 'K250', 'K250'],
    },
    {
        'id': 3,
        'name': '4. All-Bank Multi-Engine',
        'file': 'mixed_events.json',
        'bpm': 116,
        'tracks': ['K250', 'B303', 'D808', 'K250', 'VA', 'D808', 'SID', 'GRAN'],
    },
    {
        'id': 4,
        'name': '5. 20th Century Fox Fanfare',
        'file': 'fox_events.json',
        'bpm': 106,
        'tracks': ['K250', 'K250', 'K250', 'K250', 'K250', 'K250', 'K250', 'K250'],
    },
]

ENG_MAP = {
    'k250': 'K250',
    '303': 'B303',
    '808': 'D808',
    '909': 'D808',
    'fm': 'DX7',
    'va': 'VA',
    'sid': 'SID',
    'gran': 'GRAN',
}

demos_out = []
total_notes = 0

for s in SONGS:
    src = os.path.join(SRC_DIR, s['file'])
    raw = json.load(open(src, 'r', encoding='utf-8'))['events']
    notes = []
    max_t = 0.0
    for e in raw:
        t_on = round(max(0.0, float(e['tOn'])), 3)
        t_off = float(e['tOff'])
        dur = round(max(0.04, min(6.0, t_off - t_on)), 3)
        bus = max(0, min(7, int(e.get('bus', 0))))
        midi = max(21, min(108, int(e['midi'])))
        vel = max(1, min(127, int(round(min(1.0, max(0.01, float(e['vel']))) * 127.0))))
        eng = ENG_MAP.get(str(e.get('eng', 'k250')).lower(), 'K250')
        p_idx = int(e.get('presetIdx', 0))
        # Compact tuple: [tOn, bus, midi, vel, dur, presetIdx_or_engCode]
        # Positive int >= 0 = K250_PRESETS index; string = non-K250 engine ('B303','D808','DX7','VA','SID','GRAN')
        voice = p_idx if eng == 'K250' else eng
        notes.append([t_on, bus, midi, vel, dur, voice])
        if t_on + dur > max_t:
            max_t = t_on + dur
    notes.sort(key=lambda x: x[0])
    total_notes += len(notes)
    demos_out.append({
        'id': s['id'],
        'name': s['name'],
        'bpm': s['bpm'],
        'durSec': round(max_t + 0.8, 1),
        'tracks': s['tracks'],
        'notes': notes,
    })
    print(f"  {s['name']:30s}: {len(notes):5d} notes, {max_t:.1f}s")

with open(OUT_PATH, 'w', encoding='utf-8') as f:
    json.dump(demos_out, f, separators=(',', ':'))

print(f"Wrote {OUT_PATH} ({os.path.getsize(OUT_PATH)/1024:.1f} KB, {total_notes} total notes)")
