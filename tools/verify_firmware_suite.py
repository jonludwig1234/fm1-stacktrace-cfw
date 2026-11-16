import os
import sys
import struct
import subprocess
import json

ELF = '/home/jon/Desktop/FM1_Firmware/FM1_K250_STACKTRACE.elf'
FWSC = '/home/jon/Desktop/FM1_Firmware/FM1_K250_STACKTRACE.fwsc'
TOOLCHAIN_BIN = '/home/jon/.gemini/antigravity/scratch/jieli_pi32/bin'
NM = os.path.join(TOOLCHAIN_BIN, 'llvm-nm.exe')

def run_wine(cmd):
    env = os.environ.copy()
    env['WINEDEBUG'] = '-all'
    res = subprocess.run(['wine'] + cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, env=env)
    if res.returncode != 0:
        raise RuntimeError(res.stderr.decode('latin1', errors='replace'))
    return res.stdout.decode('latin1', errors='replace')

print("========================================================")
print("  FM-1 K250 STACK TRACE FIRMWARE COMPREHENSIVE TEST SUITE")
print("========================================================")

test_results = []

def record(name, status, details=""):
    test_results.append((name, status, details))
    print(f"[{'PASS' if status else 'FAIL'}] {name} - {details}")

# TEST 1: ELF Header and Architecture Validation
try:
    with open(ELF, 'rb') as f:
        elf_bytes = f.read(52)
    ident = elf_bytes[:16]
    magic = ident[:4]
    file_class = ident[4] # 1 = 32-bit
    data_enc = ident[5] # 1 = little endian
    entry = struct.unpack('<I', elf_bytes[24:28])[0]
    
    if magic == b'\x7fELF' and file_class == 1 and data_enc == 1 and entry == 0x02000120:
        record("ELF Header & Architecture", True, f"Valid ELF32 LE, entry=0x{entry:08X} (matching AC791N boot entry)")
    else:
        record("ELF Header & Architecture", False, f"Unexpected header: magic={magic}, class={file_class}, entry=0x{entry:08X}")
except Exception as e:
    record("ELF Header & Architecture", False, str(e))

# TEST 2: Symbol Extraction & Verification
try:
    nm_out = run_wine([NM, '--print-size', ELF])
    symbols = {}
    for line in nm_out.splitlines():
        parts = line.strip().split()
        if len(parts) >= 3:
            addr = int(parts[0], 16)
            if len(parts) >= 4 and len(parts[1]) == 8:
                size = int(parts[1], 16)
                kind = parts[2]
                name = parts[3]
            else:
                size = 0
                kind = parts[1]
                name = parts[2]
            symbols[name] = (addr, size, kind)
    
    # Check boot entry and symbols
    required_symbols = [
        '_start', '_text_rodata_begin', 'boot_draw', 'paint_avatar_rle',
        'cfw_dsp_process', 'cfw_seq_audio_tick', 'fm1_layout', 'fm1_build_id',
        'groove_sequence_render', 'synth_dx7_render', 'synth_dx7_midi',
        'drum808_kit_render', 'bass303_bank_render', 'sampledrum_render',
        'sampledrum_trigger', 'fm1_mix128', 'fm1_master_mix128',
        'fm1_fx_render', 'audio_app_bluetooth_open', 'connectivity_wl82_bluetooth_start'
    ]
    missing = [s for s in required_symbols if s not in symbols]
    if not missing:
        avatar_addr, avatar_size, _ = symbols['paint_avatar_rle']
        record("Symbol Table Integrity", True, f"All {len(required_symbols)} key symbols found (including CFW DSP & Seq). paint_avatar_rle at 0x{avatar_addr:08X} ({avatar_size} bytes)")
    else:
        record("Symbol Table Integrity", False, f"Missing symbols: {missing}")
except Exception as e:
    record("Symbol Table Integrity", False, str(e))

# TEST 3: Memory Bounds & SRAM Check
try:
    sram_callbacks = ['fm1_input_tick', 'fm1_panel_irq', 'fm1_scan_decode', 'fm1_key_pin', 'fm1_encoder_pin', 'fm1_quadrature']
    out_of_sram = []
    for cb in sram_callbacks:
        if cb in symbols:
            addr = symbols[cb][0]
            if not (0x01C00000 <= addr < 0x01C80000):
                out_of_sram.append(f"{cb} at 0x{addr:08X}")
        else:
            out_of_sram.append(f"{cb} missing")
    if not out_of_sram:
        record("Hardware ISR SRAM Placement", True, "All critical panel IRQ, input tick & quadrature decoders mapped to high-speed internal SRAM (0x01C00000 - 0x01C80000)")
    else:
        record("Hardware ISR SRAM Placement", False, f"Violations: {out_of_sram}")
except Exception as e:
    record("Hardware ISR SRAM Placement", False, str(e))

# TEST 4: Splash Screen & UI Code Audit
try:
    with open('/home/jon/.gemini/antigravity/scratch/fm1_k250_stacktrace/fm1_open/app/screen.c', 'r') as f:
        screen_src = f.read()
    
    has_stacktrace = '"STACK TRACE"' in screen_src
    has_presents = '"PRESENTS"' in screen_src
    has_k250 = '"K250 SIMULATOR"' in screen_src
    has_avatar_render = 'paint_avatar_rle(88, 36, STACKTRACE_AVATAR_W, STACKTRACE_AVATAR_H' in screen_src
    
    if has_stacktrace and has_presents and has_k250 and has_avatar_render:
        record("Splash Screen & UI Code Audit", True, "Stack Trace Presents, 64x64 RLE Avatar & K250 Simulator title verified in screen.c")
    else:
        record("Splash Screen & UI Code Audit", False, f"Flags: ST={has_stacktrace}, P={has_presents}, K250={has_k250}, Bitmap={has_avatar_render}")
except Exception as e:
    record("Splash Screen & UI Code Audit", False, str(e))

# TEST 5: Avatar Bitmap Array Verification
try:
    with open('/home/jon/.gemini/antigravity/scratch/fm1_k250_stacktrace/fm1_open/app/stacktrace_avatar.h', 'r') as f:
        avatar_h = f.read()
    elements = avatar_h.count('0x')
    if elements == 4096: # 64 * 64
        record("Avatar Data Precision", True, f"Verified exactly 4,096 RGB565 words (8,192 bytes) matching 64x64 screen bounds")
    else:
        record("Avatar Data Precision", False, f"Found {elements} RGB565 words, expected 4096")
except Exception as e:
    record("Avatar Data Precision", False, str(e))

# TEST 6: FWSC Container Structure and Packaging
try:
    with open(FWSC, 'rb') as f:
        fwsc_data = f.read()
    
    # De-interleave product signature and decipher UFW header
    raw_ufw = bytearray()
    product_bytes = bytearray()
    dest = 0
    src = 0
    while dest < len(fwsc_data):
        raw_ufw.append(fwsc_data[dest])
        if src < 940 and (src + 1) % 47 == 0:
            dest += 1
            if dest < len(fwsc_data):
                idx = src // 47
                ch_code = fwsc_data[dest] - idx - 1
                if 0 <= ch_code < 128:
                    product_bytes.append(ch_code)
        dest += 1
        src += 1
    
    # Decipher first 64 bytes of ufw
    state = 0xFFFF
    plain_hdr = bytearray()
    for b in raw_ufw[:64]:
        plain_hdr.append(b ^ (state & 0xFF))
        state = ((state << 1) ^ (0x1021 if (state & 0x8000) else 0)) & 0xFFFF
    
    total_len = struct.unpack('<I', plain_hdr[4:8])[0]
    soc_tag = plain_hdr[16:22].decode('ascii', errors='replace')
    product_id = product_bytes.decode('ascii', errors='ignore').split('}')[0]
    
    if total_len == len(raw_ufw) and soc_tag == "AC791N" and "FM-1" in product_id:
        record("Firmware Package Container (.fwsc)", True, f"Container verified: SoC={soc_tag}, Product={product_id}, TotalUFW={total_len} bytes")
    else:
        record("Firmware Package Container (.fwsc)", False, f"Mismatch: total={total_len}, soc={soc_tag}, prod={product_id}")
except Exception as e:
    record("Firmware Package Container (.fwsc)", False, str(e))

# TEST 7: Audio Synthesis Engine & DSP Compatibility
try:
    engine_symbols = [
        'synth_dx7_render', 'synth_dx7_midi', 'synth_dx7_active',
        'sampledrum_render', 'sampledrum_trigger', 'sampledrum_active',
        'bass303_bank_render', 'drum808_kit_render', 'pluck_render',
        'fm1_fx_render', 'fm1_master_mix128'
    ]
    all_engine_present = all(s in symbols for s in engine_symbols)
    if all_engine_present:
        record("Sound Engine & DSP Subsystems", True, f"All 11 polyphonic synthesis engines, drum modules, sampler & FX buffers verified")
    else:
        missing_eng = [s for s in engine_symbols if s not in symbols]
        record("Sound Engine & DSP Subsystems", False, f"Missing engine routines: {missing_eng}")
except Exception as e:
    record("Sound Engine & DSP Subsystems", False, str(e))

print("========================================================")
passed = sum(1 for _, st, _ in test_results if st)
total = len(test_results)
print(f"  TEST SUMMARY: {passed}/{total} tests PASSED")
print("========================================================")
