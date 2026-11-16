import os
import sys
import subprocess
import hashlib
import json
import struct

ROOT = '/home/jon/.gemini/antigravity/scratch/fm1_k250_stacktrace/fm1_open'
TOOLCHAIN_BIN = '/home/jon/.gemini/antigravity/scratch/jieli_pi32/bin'
CLANG = os.path.join(TOOLCHAIN_BIN, 'clang.exe')
LD = os.path.join(TOOLCHAIN_BIN, 'pi32v2-ld.exe')
NM = os.path.join(TOOLCHAIN_BIN, 'llvm-nm.exe')
OBJCOPY = os.path.join(TOOLCHAIN_BIN, 'llvm-objcopy.exe')
BUILD_DIR = os.path.join(ROOT, 'build/dx7')
OBJ_DIR = os.path.join(BUILD_DIR, 'obj')
GEN_DIR = os.path.join(BUILD_DIR, 'generated')

os.makedirs(OBJ_DIR, exist_ok=True)
os.makedirs(GEN_DIR, exist_ok=True)

def run_wine(cmd, cwd=BUILD_DIR):
    # Execute Windows binary via Wine
    full_cmd = ['wine'] + cmd
    env = os.environ.copy()
    env['WINEDEBUG'] = '-all'
    res = subprocess.run(full_cmd, cwd=cwd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, env=env)
    if res.returncode != 0:
        print(f"Error running {' '.join(full_cmd)}")
        print("STDOUT:", res.stdout.decode('latin1', errors='replace'))
        print("STDERR:", res.stderr.decode('latin1', errors='replace'))
        sys.exit(res.returncode)
    return res.stdout

print("Collecting source files...")
sources = []
for dirpath, _, filenames in os.walk(os.path.join(ROOT, 'app')):
    if dirpath.startswith(os.path.join(ROOT, 'app/synth')):
        continue
    for f in filenames:
        if f.endswith('.c') or f.endswith('.S'):
            rel = os.path.relpath(os.path.join(dirpath, f), ROOT).replace('\\', '/')
            sources.append(rel)

sources.sort()
print(f"Found {len(sources)} application source files.")

includes = ['sdk/include', 'sdk/include/libc', 'app/synth', 'sdk/config', 'app', 'app/board']
inc_flags = ['-I' + os.path.join(ROOT, d) for d in includes]

base_flags = [
    '-target', 'pi32v2', '-integrated-as', '-mcpu=r3', '-mfprev1', '-Wuninitialized',
    '-Wno-invalid-noreturn', '-fno-common', '-flto', '-fallow-pointer-null', '-fprefer-gnu-section',
    '-femulated-tls', '-Wno-shift-negative-value', '-Wframe-larger-than=2560', '-fms-extensions',
    '-fno-unwind-tables', '-ffunction-sections', '-fdata-sections', '-fmessage-length=0',
    '-cl-single-precision-constant', '-mllvm', '-pi32v2-large-program=true', '-D__GCC_PI32V2__', '-O2'
] + inc_flags

objects = []
for idx, src in enumerate(sources):
    src_path = os.path.join(ROOT, src)
    out_obj = f"obj/{idx}_{src.replace('/', '_').replace('.', '_')}.obj"
    flags = list(base_flags)
    if src in ['app/screen.c', 'app/transfer.c', 'app/midi_router.c']:
        flags.append('-fno-lto')
    if src == 'app/board/panel.c':
        flags.extend(['-fno-lto', '-fno-pic'])
    flags.extend(['-fwrapv', '-fno-fast-math', '-ffp-contract=off'])
    if src in ['app/project.c', 'app/transfer.c', 'app/samples.c', 'app/screen.c', 'app/presets.c', 'app/midi_router.c', 'app/fm_factory.c', 'app/fm_library.c', 'app/cfw_seq.c', 'app/cfw_dsp.c', 'app/audio_output.c', 'app/board/audio.c', 'app/board/device.c']:
        flags.append('-Oz')
    if src == 'app/screen.c':
        flags.append('-fno-inline-functions')
    if src in ['app/cfw_dsp.c', 'app/cfw_seq.c']:
        flags.append('-fno-lto')
    
    out_obj_full = os.path.join(BUILD_DIR, out_obj)
    if os.path.exists(out_obj_full):
        os.remove(out_obj_full)
    cmd = [CLANG] + flags + ['-c', src_path, '-o', out_obj]
    print(f"Compiling [{idx+1}/{len(sources)}] {src}...")
    run_wine(cmd)
    objects.append(out_obj)

# Build identity
print("Generating build identity...")
identity_src = """#include "layout.h"
const struct fm1_firmware_layout fm1_layout = {536576U, 7U};
const unsigned char fm1_build_id[32] = {0x11,0x22,0x33,0x44,0x55,0x66,0x77,0x88,0x99,0xaa,0xbb,0xcc,0xdd,0xee,0xff,0x00,0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x0e,0x0f,0x10};
const unsigned char fm1_update_identity[27] = "FM-1_801000";
"""
with open(os.path.join(GEN_DIR, 'build_identity.c'), 'w') as f:
    f.write(identity_src)

bi_obj = os.path.join(BUILD_DIR, 'obj/build_identity.obj')
if os.path.exists(bi_obj):
    os.remove(bi_obj)
run_wine([CLANG] + base_flags + ['-c', 'generated/build_identity.c', '-o', 'obj/build_identity.obj'])
objects.append('obj/build_identity.obj')

# Prepare linker script
print("Preparing linker script...")
with open(os.path.join(ROOT, 'sdk/config/linker.ld.in'), 'r') as f:
    linker_content = f.read()
linker_content = linker_content.replace('@SBC_DECODER@', 'sbc_decoder\n').replace('@ACL_TX_EXTRA@', ' + 1024').replace('@ACL_RX_EXTRA@', ' + 4096')
with open(os.path.join(GEN_DIR, 'linker'), 'w') as f:
    f.write(linker_content)

# Link
print("Linking sdk.elf...")
link_cmd = [
    LD,
    '--plugin', os.path.join(TOOLCHAIN_BIN, 'LLVMgold.dll'),
    '-o', 'sdk.elf'
] + objects + [
    '-flto', '--plugin-opt=-pi32v2-always-use-itblock=false', '--plugin-opt=-enable-ipra=true',
    '--plugin-opt=-pi32v2-merge-max-offset=4096', '--plugin-opt=-pi32v2-enable-simd=true', '--plugin-opt=mcpu=r3',
    '--plugin-opt=-global-merge-on-const', '--plugin-opt=-inline-threshold=5', '--plugin-opt=-inline-max-allocated-size=32',
    '--plugin-opt=-inline-normal-into-special-section=true', '--plugin-opt=-dont-used-symbol-list=malloc,free,sprintf,printf,puts,putchar',
    '--plugin-opt=-pi32v2-enable-rep-memop', '--plugin-opt=-emulated-tls', '--sort-common',
    '--plugin-opt=-pi32v2-large-program=true', '--plugin-opt=-pi32v2-csync-before-rti=true', '--start-group',
    '--whole-archive', '../../sdk/lib/libfm1_engine.a', '--no-whole-archive',
    '../../sdk/lib/libc.a', '../../sdk/lib/libcompiler_rt.a',
    '--end-group', '--gc-sections', '-Tgenerated/linker', '-M=sdk.map',
    '--undefined=connectivity_wl82_bluetooth_start',
    '--undefined=audio_app_bluetooth_open', '--undefined=bt_get_local_name', '--undefined=bt_get_mac_addr'
]
run_wine(link_cmd)
elf_path = os.path.join(BUILD_DIR, 'sdk.elf')
print(f"Linking complete! ELF size: {os.path.getsize(elf_path)} bytes.")
