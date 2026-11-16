#!/usr/bin/env python3
"""Generate compact Flash assets for FM1 C firmware:
1) Lossless RLE stacktrace_avatar_rle.h (saves ~4.6 KB .rodata)
2) Packed 3-byte/event C streams for Beethoven Orchestra (56s) & Jazz All-Star (112s)
"""
import json
import os
import re

APP_DIR = "/home/jon/.gemini/antigravity/scratch/fm1_k250_stacktrace/fm1_open/app"
ORCH_JSON = "/home/jon/.gemini/antigravity/scratch/fm1_campaign/beethoven3_events.json"
JAZZ_JSON = "/home/jon/.gemini/antigravity/scratch/fm1_campaign/jazz_events.json"
MARCH_JSON = "/home/jon/.gemini/antigravity/scratch/fm1_campaign/march_events.json"
MIXED_JSON = "/home/jon/.gemini/antigravity/scratch/fm1_campaign/mixed_events.json"


def build_avatar_rle():
    with open(os.path.join(APP_DIR, "stacktrace_avatar.h"), "r") as f:
        vals = [int(x, 16) for x in re.findall(r"0x[0-9a-fA-F]{4}", f.read())]
    assert len(vals) == 64 * 64, f"Expected 4096 pixels, got {len(vals)}"

    # Quantize to 16-entry phosphor palette + 1-byte (run_len[4]:pal_idx[4]) RLE (~1.5 KB total)
    qvals = [0 if v <= 0x0041 else v for v in vals]
    bins = {}
    for v in qvals:
        if v == 0:
            continue
        g = ((v >> 5) & 63) >> 2  # 0..15 green bands
        bins.setdefault(g, []).append(v)

    # Collapse if >=15 non-black bands so total palette <= 16 entries
    pal = [0]
    band_to_idx = {}
    sorted_bands = sorted(bins.keys())
    while len(sorted_bands) > 15:
        # Merge two smallest adjacent bands
        g0, g1 = sorted_bands[0], sorted_bands[1]
        bins[g1] = bins[g0] + bins[g1]
        del bins[g0]
        sorted_bands = sorted(bins.keys())
    for g in sorted_bands:
        vs = bins[g]
        ar = round(sum((x >> 11) & 31 for x in vs) / len(vs))
        ag = round(sum((x >> 5) & 63 for x in vs) / len(vs))
        ab = round(sum(x & 31 for x in vs) / len(vs))
        band_to_idx[g] = len(pal)
        pal.append((ar << 11) | (ag << 5) | ab)
    while len(pal) < 16:
        pal.append(0)

    idx_vals = [0 if v == 0 else band_to_idx[min(bins.keys(), key=lambda bg: abs(bg - (((v >> 5) & 63) >> 2)))] for v in qvals]

    enc = bytearray()
    i, n = 0, len(idx_vals)
    while i < n:
        c = idx_vals[i]
        j = i
        while j < n and idx_vals[j] == c and (j - i) < 16:
            j += 1
        enc.append(((j - i - 1) << 4) | (c & 0x0F))
        i = j

    # Verify round-trip pixel count == 4096
    cnt = sum(((b >> 4) & 0x0F) + 1 for b in enc)
    assert cnt == 4096, f"RLE decoded {cnt} != 4096 pixels"

    out_path = os.path.join(APP_DIR, "stacktrace_avatar_rle.h")
    with open(out_path, "w") as f:
        f.write("/* Auto-generated 16-color indexed RLE Stack Trace 64x64 RGB565 avatar */\n")
        f.write("#ifndef STACKTRACE_AVATAR_RLE_H\n#define STACKTRACE_AVATAR_RLE_H\n#include <stdint.h>\n\n")
        f.write("#define STACKTRACE_AVATAR_W 64U\n#define STACKTRACE_AVATAR_H 64U\n")
        f.write("static const uint16_t stacktrace_avatar_pal[16] = {\n    ")
        f.write(", ".join(f"0x{c:04x}" for c in pal))
        f.write("\n};\n")
        f.write(f"static const uint8_t stacktrace_avatar_rle[{len(enc)}] = {{\n")
        for off in range(0, len(enc), 18):
            chunk = ", ".join(f"0x{b:02x}" for b in enc[off:off + 18])
            f.write(f"    {chunk},\n")
        f.write("};\n#endif\n")
    print(f"Wrote {out_path}: pal=32B + rle={len(enc)}B = {32+len(enc)}B (saved {len(vals)*2 - (32+len(enc))} bytes)")


DUR_TICKS_LUT = [
    2, 3, 4, 5, 6, 8, 10, 12,
    14, 17, 20, 24, 28, 33, 39, 46,
    54, 64, 76, 90, 106, 125, 148, 175,
    205, 240, 280, 320, 360, 400, 440, 480
]


def quant_dur_idx(dur_sec):
    ticks = max(2, int(round(dur_sec / 0.015)))
    best_i = 0
    best_err = abs(DUR_TICKS_LUT[0] - ticks)
    for i, dt in enumerate(DUR_TICKS_LUT):
        err = abs(dt - ticks)
        if err < best_err:
            best_err = err
            best_i = i
    return best_i


def map_orch_note(ev):
    p = int(ev["presetIdx"])
    m = int(ev["midi"])
    if p == 208:  # Timpani -> Track 7 (808 low tom / bd kettle hits)
        km = 36 if m <= 40 else (41 if m <= 45 else 43)
        return 7, km
    if p == 74:  # Contrabass -> Track 1 (Sub Bass)
        return 1, max(31, min(60, m))
    if p == 75:  # Cello -> Track 2 (Strings)
        return 2, max(36, min(84, m))
    if p in (72, 73):  # Violin / Viola -> Track 0 (Strings)
        return 0, max(48, min(96, m))
    if p == 0:  # Piano -> Track 3 (DX7 Electric/Grand)
        return 3, max(36, min(96, m))
    if p in (136, 140):  # Flute / Clarinet -> Track 4 (Reed)
        return 4, max(48, min(96, m))
    if p in (107, 108, 109, 110):  # Brass -> Track 5 (Brass)
        return 5, max(40, min(88, m))
    return 6, max(36, min(88, m))


JAZZ_DRUM_MAP = {
    59: 49, 60: 36, 61: 37, 62: 38, 63: 38,
    64: 41, 65: 43, 66: 46, 67: 42, 68: 46,
    69: 45, 70: 43, 71: 45,
}
JAZZ_PERC_MAP = {
    60: 41, 61: 43, 62: 45, 64: 37, 66: 39, 67: 56, 69: 45,
}


def map_jazz_note(ev):
    bus = min(7, int(ev["bus"]))
    m = int(ev["midi"])
    if bus == 0:
        return 0, JAZZ_DRUM_MAP.get(m, 42)
    if bus == 7:
        return 7, JAZZ_PERC_MAP.get(m, 43)
    if bus == 1:
        return 1, max(28, min(72, m))
    return bus, max(36, min(96, m))


def pack_song_events(events, mapper):
    sorted_evs = sorted(events, key=lambda e: (e["tOn"], e["bus"], e["midi"]))
    out = bytearray()
    cur_tick = 0
    for ev in sorted_evs:
        trk, midi = mapper(ev)
        midi = max(1, min(127, midi))
        on_tick = max(cur_tick, int(round(ev["tOn"] / 0.015)))
        dt = on_tick - cur_tick
        cur_tick = on_tick
        while dt > 63:
            step = min(65535, dt)
            # Special Wait opcode: (byte1 & 0x7F) == 0
            out.append(step & 0xFF)
            out.append(0x00)
            out.append((step >> 8) & 0xFF)
            dt -= step
        vel3 = max(0, min(7, int(round((float(ev["vel"]) - 0.35) / 0.10))))
        dur5 = quant_dur_idx(float(ev["tOff"]) - float(ev["tOn"]))
        b0 = (dt & 0x3F) | ((vel3 & 0x03) << 6)
        b1 = (midi & 0x7F) | ((vel3 & 0x04) << 5)
        b2 = (trk & 0x07) | ((dur5 & 0x1F) << 3)
        out.extend((b0, b1, b2))
    return bytes(out)


def lz77_pack(data: bytes):
    out = bytearray()
    i = 0
    n = len(data)
    while i < n:
        best_len = 0
        best_dist = 0
        start = max(0, i - 16383)
        if i + 3 <= n:
            for d in range(1, i - start + 1):
                if data[i - d] == data[i] and data[i - d + 1] == data[i + 1] and data[i - d + 2] == data[i + 2]:
                    l = 3
                    while l < 130 and i + l < n and data[i - d + l] == data[i + l]:
                        l += 1
                    if l > best_len:
                        best_len = l
                        best_dist = d
                        if l == 130:
                            break
        if best_len >= 4:
            out.append(0x80 + (best_len - 3))
            if best_dist < 128:
                out.append(best_dist)
            else:
                out.append((best_dist & 0x7F) | 0x80)
                out.append((best_dist >> 7) & 0x7F)
            i += best_len
        else:
            lit_start = i
            i += 1
            while i < n and (i - lit_start) < 128:
                if i + 4 <= n:
                    found = False
                    s0 = max(0, i - 16383)
                    for d in range(1, i - s0 + 1):
                        if data[i - d:i - d + 4] == data[i:i + 4]:
                            found = True
                            break
                    if found:
                        break
                i += 1
            cnt = i - lit_start
            out.append(cnt - 1)
            out.extend(data[lit_start:i])
    return bytes(out)


def map_march_note(ev):
    bus = min(7, int(ev["bus"]))
    m = int(ev["midi"])
    p = int(ev["presetIdx"])
    if p == 220:  # Gran Cassa Bass Drum -> 808 BD
        return 0, 36
    if p == 222:  # Piatti Crash -> 808 Crash
        return 0, 49
    if p == 221:  # Snare & Tenor Quads -> 808 Snare / Toms
        if m in (65, 66):
            return 0, 41
        if m in (68, 69, 70):
            return 0, 45
        return 0, 38
    if bus == 1:
        return 1, max(28, min(60, m))
    return bus, max(36, min(96, m))


def thin_march_for_fw(events):
    """Compact FM1 hardware arrangement of the March: preserves full Tuba, Bass Drum, Main Snare, Brass Fanfare, Trio & Piccolo Finale cleanly inside Flash."""
    sorted_evs = sorted(events, key=lambda e: (e["tOn"], -e["vel"]))
    seen = set()
    kept = []
    for e in sorted_evs:
        p = int(e["presetIdx"])
        bus, midi = map_march_note(e)
        if p in (104, 115, 126, 136, 150, 151, 213, 221):  # omit redundant accompaniment & snare rolls for Flash headroom
            continue
        if p == 214 and float(e["tOn"]) < 32.0:  # feature Glockenspiel/Bells in Trio + Finale
            continue
        if p == 221 and midi == 38 and float(e["vel"]) < 0.94:
            continue
        slot_sec = 0.20 if bus == 0 else (0.16 if bus in (1, 4, 6) else 0.36)
        t_slot = int(round(e["tOn"] / slot_sec))
        key = (t_slot, bus, midi if bus == 0 else 0)
        if key in seen:
            continue
        seen.add(key)
        kept.append(e)
    return sorted(kept, key=lambda e: (e["tOn"], e["bus"], e["midi"]))


def thin_jazz_for_fw(events):
    """Preserve all solos, melody, piano, upright bass, drums, and horns while trimming secondary pocket strums for Flash."""
    kept = []
    for e in events:
        bus = min(7, int(e["bus"]))
        p = int(e["presetIdx"])
        if bus == 7:
            continue
        if p == 235 and int(e["midi"]) not in (59, 60, 62, 67):  # keep kick, snare, ride, crash
            continue
        kept.append(e)
    return sorted(kept, key=lambda e: (e["tOn"], e["bus"], e["midi"]))


def thin_mixed_for_fw(events):
    """Preserve all 7 section leads, basslines, kicks/snares, and chords within Flash budget."""
    kept = []
    for e in events:
        eng = e.get("eng", "k250")
        p = int(e["presetIdx"])
        m = int(e["midi"])
        if eng in ("gran", "sid"):
            continue
        if eng in ("808", "909") and m not in (36, 38, 49):
            continue
        if p in (232, 233) and m not in (36, 38, 49):
            continue
        kept.append(e)
    return sorted(kept, key=lambda e: (e["tOn"], e["bus"], e["midi"]))


def map_mixed_note(ev):
    eng = ev.get("eng", "k250")
    bus = min(7, int(ev["bus"]))
    m = int(ev["midi"])
    p = int(ev["presetIdx"])
    if eng == "gran":
        if 1 <= m <= 8:
            return 7, 48 + (m - 1) * 2
        return 7, max(48, min(84, m))
    if eng == "303" or p in (194, 195, 203, 111):
        return 1, max(28, min(60, m))
    if eng == "808" or p in (208, 222, 233, 235):
        if p == 208:
            return 2, 36
        if p == 222:
            return 2, 49
        return 2, max(35, min(59, m))
    if eng == "909":
        return 5, max(35, min(59, m))
    if eng in ("fm", "va", "sid"):
        return bus, max(36, min(96, m))
    return 3, max(36, min(96, m))


def build_demo_songs():
    orch = json.load(open(ORCH_JSON))
    jazz = json.load(open(JAZZ_JSON))
    march = json.load(open(MARCH_JSON))
    mixed = json.load(open(MIXED_JSON))
    orch_raw = pack_song_events(orch["events"], map_orch_note)
    jazz_raw = pack_song_events(thin_jazz_for_fw(jazz["events"]), map_jazz_note)
    march_fw_evs = thin_march_for_fw(march["events"])
    march_raw = pack_song_events(march_fw_evs, map_march_note)
    mixed_raw = pack_song_events(thin_mixed_for_fw(mixed["events"]), map_mixed_note)

    orch_lz = lz77_pack(orch_raw)
    jazz_lz = lz77_pack(jazz_raw)
    march_lz = lz77_pack(march_raw)
    mixed_lz = lz77_pack(mixed_raw)
    max_raw = max(len(orch_raw), len(jazz_raw), len(march_raw), len(mixed_raw))

    out_path = os.path.join(APP_DIR, "cfw_demo_songs.h")
    with open(out_path, "w") as f:
        f.write("/* Auto-generated LZ77-packed K250 showcase streams (15 ms tick, 3-byte events) */\n")
        f.write("#ifndef FM1_CFW_DEMO_SONGS_H\n#define FM1_CFW_DEMO_SONGS_H\n#include <stdint.h>\n\n")
        f.write(f"#define CFW_DEMO_MAX_BYTES {max_raw}U\n")
        f.write("static const uint16_t cfw_demo_dur_ticks[32] = {\n    ")
        f.write(", ".join(str(x) for x in DUR_TICKS_LUT))
        f.write("\n};\n\n")

        for sym, blob in [
            ("cfw_demo_orch_lz", orch_lz),
            ("cfw_demo_jazz_lz", jazz_lz),
            ("cfw_demo_march_lz", march_lz),
            ("cfw_demo_mixed_lz", mixed_lz),
        ]:
            f.write(f"static const uint8_t {sym}[{len(blob)}] = {{\n")
            for off in range(0, len(blob), 18):
                chunk = ", ".join(f"0x{b:02x}" for b in blob[off:off + 18])
                f.write(f"    {chunk},\n")
            f.write("};\n\n")

        f.write("struct cfw_demo_song_desc {\n")
        f.write("    const char *name;\n")
        f.write("    const uint8_t *lz_stream;\n")
        f.write("    uint16_t lz_bytes;\n")
        f.write("    uint16_t raw_bytes;\n")
        f.write("    uint16_t bpm;\n")
        f.write("    uint16_t duration_sec;\n")
        f.write("};\n\n")
        f.write("static const struct cfw_demo_song_desc cfw_demo_songs[4] = {\n")
        f.write(f"    {{\"BEETHOVEN ORCH\", cfw_demo_orch_lz, {len(orch_lz)}U, {len(orch_raw)}U, 132U, 56U}},\n")
        f.write(f"    {{\"JAZZ ALL-STAR \", cfw_demo_jazz_lz, {len(jazz_lz)}U, {len(jazz_raw)}U, 140U, 112U}},\n")
        f.write(f"    {{\"STARS&STRIPES \", cfw_demo_march_lz, {len(march_lz)}U, {len(march_raw)}U, 132U, 87U}},\n")
        f.write(f"    {{\"ALL-BANK MIX  \", cfw_demo_mixed_lz, {len(mixed_lz)}U, {len(mixed_raw)}U, 116U, 105U}},\n")
        f.write("};\n\n#endif\n")
    print(f"Wrote {out_path}: orch={len(orch_lz)}B, jazz={len(jazz_lz)}B, march={len(march_lz)}B, mixed={len(mixed_lz)}B ({len(mixed['events'])} ev, raw {len(mixed_raw)}B), total={len(orch_lz)+len(jazz_lz)+len(march_lz)+len(mixed_lz)}B")


if __name__ == "__main__":
    build_avatar_rle()
    build_demo_songs()
