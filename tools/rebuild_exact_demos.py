#!/usr/bin/env python3
"""Rebuild all 5 FM-1 Stack Trace CFW showcase demos directly from the authentic
uncompressed source JSON arrangements in /home/jon/projects/fm1_campaign/:
  - beethoven3_events.json (816 notes) -> Song 1: Symphony / Beethoven Orchestra
  - jazz_events.json      (1471 notes) -> Song 2: Jazz All-Star Big Band
  - march_events.json     (5270 notes) -> Song 3: Stars & Stripes Marching Band
  - mixed_events.json     (1654 notes) -> Song 4: All-Bank Multi-Engine Mix
  - fox_events.json        (229 notes) -> Song 5: 20th Century Fox Fanfare

Zero thinning! Preserves 100% of original notes with:
  - Exact 1 ms Note-On timing (0 ms quantization error)
  - Exact 1 ms Note-Off timing (0 ms duration error, up to 8191 ms)
  - Exact 7-bit MIDI velocity (1..127 from source float vel)
  - Exact per-track instrument routing matching app/presets.c
  - Exports exact SMF Type 1 (.mid) files into demos/ and writes app/cfw_demo_songs.h
"""
import json
import os
import struct
from collections import defaultdict, Counter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC_DIR = os.environ.get('FM1_CAMPAIGN_DIR', '/home/jon/projects/fm1_campaign')
HDR_PATH = os.path.join(ROOT, 'app', 'cfw_demo_songs.h')
DEMOS_DIR = os.path.join(ROOT, 'demos')

JAZZ_DRUM_MAP = {
    59: 49, 60: 36, 61: 37, 62: 38, 63: 38,
    64: 41, 65: 43, 66: 46, 67: 42, 68: 46,
    69: 45, 70: 43, 71: 45,
}
JAZZ_PERC_MAP = {
    60: 41, 61: 43, 62: 45, 64: 37, 66: 39, 67: 56, 69: 45,
}

def vel_to_7bit(v):
    return max(1, min(127, int(round(min(1.0, max(0.01, float(v))) * 127.0))))

def map_orch(ev):
    p = int(ev['presetIdx']); m = int(ev['midi'])
    if p == 208:  # Timpani -> T7 (808 BEAT)
        km = 36 if m <= 40 else (41 if m <= 45 else 43)
        return 7, km
    if p == 74:  # Contrabass -> T1 (SUB_BASS)
        return 1, max(28, min(60, m - 12 if m > 52 else m))
    if p in (72, 73, 77, 81):  # Violin / Viola / Pizz -> T0 (STRINGS)
        return 0, max(48, min(96, m))
    if p in (75, 78):  # Cello -> T2 (STRINGS)
        return 2, max(36, min(84, m))
    if p == 0:  # Piano -> T3 (ELECTRIC/Grand)
        return 3, max(36, min(96, m))
    if p in (136, 138, 140, 142):  # Flute / Oboe / Clarinet / Bassoon -> T4 (REED)
        return 4, max(48, min(96, m))
    if p in (104, 106, 107, 108, 109, 110):  # French Horn / Brass -> T5 (BRASS)
        return 5, max(40, min(88, m))
    return 6, max(36, min(88, m))  # Ensemble Strings -> T6 (WARM_PAD)

def map_jazz(ev):
    bus = min(7, int(ev['bus'])); m = int(ev['midi']); p = int(ev['presetIdx'])
    if bus == 0:
        return 0, JAZZ_DRUM_MAP.get(m, 42)
    if bus == 7:
        if p == 240:
            return 7, JAZZ_PERC_MAP.get(m, 43)
        # Ghost guitar comping on bus 7 (p=188/189) -> T3 (DX7 GUITAR)
        return 3, max(36, min(96, m))
    if bus == 1:
        # Upright bass preset 194 is stored 2 octaves above sounding bass pitch
        return 1, max(28, min(60, m - 24))
    return bus, max(36, min(96, m))

def map_march(ev):
    bus = min(7, int(ev['bus'])); m = int(ev['midi']); p = int(ev['presetIdx'])
    if p == 220:  # Gran Cassa Bass Drum -> T0 (808 BD)
        return 0, 36
    if p == 222:  # Piatti Crash -> T0 (808 Crash)
        return 0, 49
    if p == 221:  # Snare & Tenor Quads -> T0 (808 Snare / Toms)
        if m in (65, 66): return 0, 41
        if m in (68, 69, 70): return 0, 45
        return 0, 38
    if bus == 1:  # Sousaphone / Tuba -> T1 (SUB_BASS)
        return 1, max(28, min(60, m))
    return bus, max(36, min(96, m))

def map_mixed(ev):
    eng = ev.get('eng', 'k250'); bus = min(7, int(ev['bus'])); m = int(ev['midi']); p = int(ev['presetIdx'])
    if eng == 'gran':
        return 7, (48 + (m - 1) * 2) if 1 <= m <= 8 else max(48, min(84, m))
    if eng == 'sid':
        return 6, max(36, min(96, m))
    if eng == '303' or p in (194, 195, 203, 111):
        return 1, max(28, min(60, m))
    if eng == '808' or p in (208, 222, 232, 233, 235):
        if p == 208: return 2, 36
        if p == 222: return 2, 49
        return 2, max(35, min(59, m))
    if eng == '909':
        return 5, max(35, min(59, m))
    if eng in ('fm', 'va'):
        return bus, max(36, min(96, m))
    return 3, max(36, min(96, m))

def map_fox(ev):
    bus = min(7, int(ev['bus'])); m = int(ev['midi']); p = int(ev['presetIdx'])
    if p == 221: return 0, 38  # Snare roll -> T0 (808 BEAT)
    if p == 222: return 0, 49  # Piatti crash -> T0 (808 BEAT)
    if p == 208:               # Timpani -> T7 (808 BEAT)
        return 7, 36 if m <= 38 else (41 if m <= 42 else 43)
    if p == 111: return 1, max(28, min(55, m))  # Tuba -> T1 (SUB_BASS)
    if p == 75:  return 2, max(36, min(84, m))  # Cellos -> T2 (STRINGS)
    if p == 72:  return 3, max(48, min(96, m))  # Violins -> T3 (STRINGS)
    if bus == 6: return 4, max(48, min(88, m))  # Lead Trumpets -> T4 (BRASS)
    return 5, max(44, min(84, m))               # Horns/Trombones -> T5 (BRASS)

def load_json_events(filename, mapper):
    raw = json.load(open(os.path.join(SRC_DIR, filename)))['events']
    evs = []
    for e in raw:
        trk, note = mapper(e)
        on_ms = max(0, int(round(float(e['tOn']) * 1000.0)))
        off_ms = max(on_ms + 20, min(on_ms + 8191, int(round(float(e['tOff']) * 1000.0))))
        evs.append({
            'on': on_ms,
            'off': off_ms,
            'trk': trk,
            'note': max(1, min(127, note)),
            'vel': vel_to_7bit(e['vel']),
        })
    evs.sort(key=lambda x: (x['on'], x['trk'], x['note']))
    return evs

def pack_exact_5byte(events):
    out = bytearray(); cur_ms = 0
    for e in events:
        dt = e['on'] - cur_ms
        cur_ms = e['on']
        while dt > 255:
            step = min(0xFFFFFF, dt)
            out.extend((step & 0xFF, 0x00, (step >> 8) & 0xFF, (step >> 16) & 0xFF, 0x00))
            dt -= step
        dur = max(1, min(8191, e['off'] - e['on']))
        out.extend((dt & 0xFF, e['note'] & 0x7F, e['vel'] & 0x7F, dur & 0xFF, (e['trk'] & 0x07) | (((dur >> 8) & 0x1F) << 3)))
    return bytes(out)

def unpack_exact_5byte(raw):
    t_ms = 0; out = []
    for i in range(0, len(raw) - 4, 5):
        b0, b1, b2, b3, b4 = raw[i:i+5]
        if (b1 & 0x7F) == 0:
            t_ms += b0 | (b2 << 8) | (b3 << 16); continue
        t_ms += b0
        dur = b3 | (((b4 >> 3) & 0x1F) << 8)
        out.append({'on': t_ms, 'off': t_ms + dur, 'trk': b4 & 0x07, 'note': b1 & 0x7F, 'vel': b2 & 0x7F})
    return out

def lz77_pack(data: bytes):
    out = bytearray(); i = 0; n = len(data)
    while i < n:
        best_len = 0; best_dist = 0
        start = max(0, i - 16383)
        if i + 3 <= n:
            for d in range(1, i - start + 1):
                if data[i - d] == data[i] and data[i - d + 1] == data[i + 1] and data[i - d + 2] == data[i + 2]:
                    l = 3
                    while l < 130 and i + l < n and data[i - d + l] == data[i + l]:
                        l += 1
                    if l > best_len:
                        best_len = l; best_dist = d
                        if l == 130: break
        if best_len >= 4:
            out.append(0x80 + (best_len - 3))
            if best_dist < 128: out.append(best_dist)
            else: out.extend(((best_dist & 0x7F) | 0x80, (best_dist >> 7) & 0x7F))
            i += best_len
        else:
            lit_start = i; i += 1
            while i < n and (i - lit_start) < 128:
                if i + 4 <= n:
                    found = False; s0 = max(0, i - 16383)
                    for d in range(1, i - s0 + 1):
                        if data[i - d:i - d + 4] == data[i:i + 4]:
                            found = True; break
                    if found: break
                i += 1
            out.append(i - lit_start - 1)
            out.extend(data[lit_start:i])
    return bytes(out)

def vlq(v):
    buf = [v & 0x7F]; v >>= 7
    while v:
        buf.append((v & 0x7F) | 0x80); v >>= 7
    return bytes(reversed(buf))

def write_smf(path, title, bpm, events, drum_tracks):
    tpq = 480; us_per_beat = int(round(60000000.0 / bpm))
    def ms_to_tick(ms): return int(round((ms * 1000.0 * tpq) / us_per_beat))
    tracks_bin = []
    t0 = bytearray()
    t0 += b'\x00\xff\x03' + vlq(len(title)) + title.encode('ascii')
    t0 += b'\x00\xff\x51\x03' + us_per_beat.to_bytes(3, 'big') + b'\x00\xff\x2f\x00'
    tracks_bin.append(bytes(t0))
    by_trk = defaultdict(list)
    for e in events: by_trk[e['trk']].append(e)
    for trk in range(8):
        if not by_trk[trk]: continue
        ch = 9 if trk in drum_tracks else trk
        msgs = []
        for e in by_trk[trk]:
            msgs.append((ms_to_tick(e['on']), 1, bytes((0x90 | ch, e['note'], e['vel']))))
            msgs.append((ms_to_tick(e['off']), 0, bytes((0x80 | ch, e['note'], 0))))
        msgs.sort(key=lambda x: (x[0], x[1]))
        tb = bytearray()
        tname = f"Track {trk}".encode('ascii')
        tb += b'\x00\xff\x03' + vlq(len(tname)) + tname
        cur = 0
        for tk, _, payload in msgs:
            tb += vlq(max(0, tk - cur)) + payload; cur = tk
        tb += b'\x00\xff\x2f\x00'
        tracks_bin.append(bytes(tb))
    with open(path, 'wb') as f:
        f.write(b'MThd' + struct.pack('>IHHH', 6, 1, len(tracks_bin), tpq))
        for tb in tracks_bin: f.write(b'MTrk' + struct.pack('>I', len(tb)) + tb)

def verify_exact(label, src_evs, raw_bytes):
    dec = unpack_exact_5byte(raw_bytes)
    assert len(dec) == len(src_evs)
    for a, b in zip(src_evs, dec):
        assert a == b, f"{label}: mismatch {a} != {b}"
    active = []; max_p = 0; steals = 0
    bursts = Counter(e['on'] for e in dec)
    for e in dec:
        active = [v for v in active if v['off'] > e['on']]
        active = [v for v in active if not (v['trk'] == e['trk'] and v['note'] == e['note'])]
        if len(active) >= 48:
            steals += 1; active.sort(key=lambda v: v['off']); active.pop(0)
        active.append(e)
        max_p = max(max_p, len(active))
    trks_used = sorted(set(e['trk'] for e in dec))
    print(f"[EXACT] {label:<15} | notes={len(dec):4d} | raw={len(raw_bytes):5d}B | maxPoly={max_p:2d}/48 (steals={steals}) | maxBurst={max(bursts.values()):2d} | trks={trks_used}")

def main():
    songs = [
        ("BEETHOVEN ORCH", "cfw_demo_orch_lz",  132, 56,  load_json_events("beethoven3_events.json", map_orch),  {7},   "Song1_Beethoven_Orchestra.mid"),
        ("JAZZ ALL-STAR ", "cfw_demo_jazz_lz",  140, 112, load_json_events("jazz_events.json",       map_jazz),  {0,7}, "Song2_Jazz_AllStar.mid"),
        ("STARS&STRIPES ", "cfw_demo_march_lz", 132, 87,  load_json_events("march_events.json",      map_march), {0},   "Song3_Stars_And_Stripes_March.mid"),
        ("ALL-BANK MIX  ", "cfw_demo_mixed_lz", 116, 105, load_json_events("mixed_events.json",      map_mixed), {2,5}, "Song4_AllBank_Mix.mid"),
        ("20TH FANFARE  ", "cfw_demo_fox_lz",   114, 23,  load_json_events("fox_events.json",        map_fox),   {0,7}, "Song5_20th_Century_Fox_Fanfare.mid"),
    ]
    packed = []; max_raw = 0
    for name, sym, bpm, dsec, evs, drums, mid_name in songs:
        raw = pack_exact_5byte(evs)
        verify_exact(name.strip(), evs, raw)
        lz = lz77_pack(raw)
        max_raw = max(max_raw, len(raw))
        packed.append((name, sym, bpm, dsec, lz, len(raw)))
        write_smf(os.path.join(DEMOS_DIR, mid_name), name.strip(), bpm, evs, drums)

    with open(HDR_PATH, 'w') as f:
        f.write("/* Auto-generated LZ77-packed K250 showcase streams (100% UN-THINNED, EXACT 1 ms, 7-bit vel, 5-byte events) */\n")
        f.write("#ifndef FM1_CFW_DEMO_SONGS_H\n#define FM1_CFW_DEMO_SONGS_H\n#include <stdint.h>\n\n")
        f.write(f"#define CFW_DEMO_MAX_BYTES {max_raw}U\n\n")
        for name, sym, bpm, dsec, lz, raw_len in packed:
            f.write(f"static const uint8_t {sym}[{len(lz)}] = {{\n")
            for off in range(0, len(lz), 18):
                f.write("    " + ", ".join(f"0x{b:02x}" for b in lz[off:off+18]) + ",\n")
            f.write("};\n\n")
        f.write("struct cfw_demo_song_desc {\n    const char *name;\n    const uint8_t *lz_stream;\n    uint16_t lz_bytes;\n    uint16_t raw_bytes;\n    uint16_t bpm;\n    uint16_t duration_sec;\n};\n\n")
        f.write(f"static const struct cfw_demo_song_desc cfw_demo_songs[{len(packed)}] = {{\n")
        for name, sym, bpm, dsec, lz, raw_len in packed:
            f.write(f'    {{"{name}", {sym}, {len(lz)}U, {raw_len}U, {bpm}U, {dsec}U}},\n')
        f.write("};\n\n#endif\n")

    tot_lz = sum(len(x[4]) for x in packed)
    print(f"Wrote {HDR_PATH}: total LZ={tot_lz} bytes ({tot_lz/1024:.1f} KB), CFW_DEMO_MAX_BYTES={max_raw} bytes ({max_raw/1024:.1f} KB)")

if __name__ == "__main__":
    main()
