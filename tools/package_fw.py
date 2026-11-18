import os
import sys
import subprocess
import struct
import hashlib

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
_tc_root = os.environ.get('FM1_PI32_TOOLCHAIN', os.path.join(ROOT, '..', 'jieli_pi32'))
TOOLCHAIN_BIN = _tc_root if os.path.basename(_tc_root) == 'bin' else os.path.join(_tc_root, 'bin')
OBJCOPY = os.path.join(TOOLCHAIN_BIN, 'llvm-objcopy.exe')
if not os.path.isfile(OBJCOPY):
    sys.exit(f"JieLi PI32v2 llvm-objcopy.exe not found at {OBJCOPY}. Set FM1_PI32_TOOLCHAIN.")
BUILD_DIR = os.path.join(ROOT, 'build/dx7')
GEN_DIR = os.path.join(BUILD_DIR, 'generated')
SDK_DIR = os.path.join(ROOT, 'sdk')
PACK_DIR = os.path.join(SDK_DIR, 'tools/pack')
ELF = os.path.join(BUILD_DIR, 'sdk.elf')

def run_wine(cmd, cwd=BUILD_DIR):
    full_cmd = ['wine'] + cmd
    env = os.environ.copy()
    env['WINEDEBUG'] = '-all'
    res = subprocess.run(full_cmd, cwd=cwd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, env=env)
    if res.returncode != 0:
        print(f"Error: {res.stderr.decode('latin1', errors='replace')}")
        sys.exit(res.returncode)

print("Extracting ELF binary sections...")
sections = ['text', 'data', 'ram0_data', 'cache_ram_data']
combined = bytearray()
for sec in sections:
    out_bin = os.path.join(GEN_DIR, f"{sec}.bin")
    run_wine([OBJCOPY, '-O', 'binary', '-j', f".{sec}", ELF, out_bin])
    with open(out_bin, 'rb') as f:
        data = f.read()
        print(f"Section .{sec}: {len(data)} bytes")
        combined.extend(data)

print(f"Total raw app binary: {len(combined)} bytes")

# Python port of Package.cs
AREA = 0x4000
ENTRY_POINT = 0x02000120
APP_DATA = 0x120
FLASH_LIMIT = 0xff000
USER_SIZE = 536576
BT_SIZE = 4096
MINIMUM_VM = 32768
PUBLIC_CODE = 0x980f

def make_crc_table():
    table = []
    for i in range(256):
        val = i << 8
        for b in range(8):
            val = ((val << 1) ^ (0x1021 if (val & 0x8000) else 0)) & 0xFFFF
        table.append(val)
    return table

CRC_TABLE = make_crc_table()

def crc16(data, begin=0, length=None):
    if length is None:
        length = len(data) - begin
    val = 0
    for i in range(begin, begin + length):
        val = ((val << 8) ^ CRC_TABLE[(val >> 8) ^ data[i]]) & 0xFFFF
    return val

def cipher(data, begin, length, state):
    for i in range(begin, begin + length):
        data[i] ^= (state & 0xFF)
        state = ((state << 1) ^ (0x1021 if (state & 0x8000) else 0)) & 0xFFFF

def round_up(size, alignment):
    return (size + alignment - 1) & -alignment

class Image:
    def __init__(self, size, fill=0):
        self.bytes = bytearray([fill] * size)
    def number(self, offset, value, width):
        for n in range(width):
            self.bytes[offset + n] = (value >> (8 * n)) & 0xFF
    def copy(self, offset, data):
        self.bytes[offset:offset+len(data)] = data
    def text(self, offset, string):
        b = string.encode('ascii')
        self.copy(offset, b)
    def checksum(self, field, offset, size):
        self.number(field, crc16(self.bytes, offset, size), 2)
    def record(self, offset, name, crc, address, size, attributes, last, extra=None):
        self.bytes[offset:offset+32] = b'\x00' * 32
        self.number(offset + 2, crc, 2)
        self.number(offset + 4, address, 4)
        self.number(offset + 8, size, 4)
        self.number(offset + 12, attributes, 2)
        self.number(offset + 14, last, 2)
        for n in range(16, 32):
            self.bytes[offset + n] = 0xFF
        name_bytes = name.encode('ascii')
        self.bytes[offset + 16:offset + 16 + len(name_bytes)] = name_bytes
        self.bytes[offset + 16 + len(name_bytes)] = 0
        if extra is not None:
            self.number(offset + 28, extra, 4)
        self.checksum(offset, offset + 2, 30)

def encode_boot(plain):
    result = bytearray(plain)
    banks = struct.unpack('<H', plain[0:2])[0]
    prev_end = banks * 16
    for i in range(banks):
        hdr = i * 16
        length = struct.unpack('<H', plain[hdr+2:hdr+4])[0]
        start = struct.unpack('<i', plain[hdr+8:hdr+12])[0]
        cipher(result, hdr, 16, 0xFFFF)
        cipher(result, start, length, 0xFFFF)
        prev_end = start + length
    return result

def build_flash(app, pack_dir, end, vm_end):
    with open(os.path.join(pack_dir, "uboot.boot"), 'rb') as f:
        boot = f.read()
    with open(os.path.join(pack_dir, "boot-config.bin"), 'rb') as f:
        config = f.read()
    with open(os.path.join(pack_dir, "cfg_tool.bin"), 'rb') as f:
        tool = f.read()
    
    image = Image(end, 255)
    settings = Image(34 + len(config), 0)
    for bit in range(16):
        settings.bytes[bit] = 16
        settings.bytes[16 + bit] = 16 ^ (0 if ((PUBLIC_CODE >> bit) & 1) == 0 else 255)
    settings.checksum(32, 0, 32)
    settings.copy(34, config)
    
    # AC791N boot header
    image.copy(0, bytearray([0, 0, 0x20, 2, 0x2f, 0x10, 0x41, 0x43, 0x37, 0x39, 0x31, 0x4e, 0, 0, 0, 0]))
    config_at = AREA - round_up(len(settings.bytes), 32)
    image.record(32, "boot.bin", crc16(boot, 0, len(boot)), 160, len(boot), 0x8002, 0, None)
    image.record(64, "sfc.bin", crc16(settings.bytes, 0, len(settings.bytes)), config_at, len(settings.bytes), 0x8002, 0, None)
    image.record(96, "app_dir_head", 0xFFFF, AREA, 0xFFFFFFFF, 0xFF81, 0, None)
    image.record(128, "key_mac", 0xFFFF, FLASH_LIMIT, 4096, 0x0112, 0xFFFF, None)
    for p in range(0, 160, 32):
        cipher(image.bytes, p, 32, 0xFFFF)
    image.copy(160, encode_boot(boot))
    image.copy(config_at, settings.bytes)
    
    payload_size = APP_DATA + len(app) + len(tool)
    app_pos = AREA + APP_DATA
    image.copy(app_pos, app)
    image.copy(app_pos + len(app), tool)
    
    image.record(AREA + 32, "app.bin", crc16(app, 0, len(app)), APP_DATA, len(app), 0xFF82, 0, None)
    image.record(AREA + 64, "cfg_tool.bin", crc16(tool, 0, len(tool)), APP_DATA + len(app), len(tool), 0xFF82, 0, None)
    image.record(AREA + 96, "VM", 0xFFFF, end, vm_end - end, 0x8112, 0, MINIMUM_VM)
    image.record(AREA + 128, "PRCT", 0xFFFF, 0, end, 0x8292, 0, 0x45444f43)
    image.record(AREA + 160, "BTIF", 0xFFFF, vm_end, BT_SIZE, 0x8192, 1, 0x4f545541)
    image.record(AREA, "app_area_head", crc16(image.bytes, AREA + 32, payload_size - 32), ENTRY_POINT, payload_size, 0xFF83, 0, None)
    
    reserved = AREA + payload_size
    image.record(reserved + 32, "USER", 0xFFFF, FLASH_LIMIT - USER_SIZE, USER_SIZE, 0x8192, 1, 0x4f545541)
    image.record(reserved, "EXT_RESERVED", crc16(image.bytes, reserved + 32, 32), 32, 64, 0xFF93, 1, None)
    
    for p in range(0, payload_size + 64, 32):
        cipher(image.bytes, AREA + p, min(32, payload_size + 64 - p), PUBLIC_CODE ^ (p >> 2))
    return image

def wrap(flash, loader, product):
    loader_at = 1024 + round_up(len(flash.bytes), 32)
    total = loader_at + round_up(len(loader), 32)
    ufw = Image(total, 255)
    ufw.bytes[0:224] = b'\x00' * 224
    files = [flash.bytes, loader]
    names = ["flash.bin", "ota.bin"]
    for i in range(len(files)):
        rec = 64 + i * 80
        ufw.number(rec, 0 if i == 0 else 100, 2)
        ufw.number(rec + 2, i, 2)
        ufw.number(rec + 4, crc16(files[i], 0, len(files[i])), 2)
        ufw.number(rec + 8, 1024 if i == 0 else loader_at, 4)
        ufw.number(rec + 12, len(files[i]), 4)
        ufw.number(rec + 16, round_up(len(files[i]), 32), 4)
        ufw.text(rec + 64, names[i])
        cipher(ufw.bytes, rec, 80, 0xFFFF)
    ufw.number(4, total, 4)
    ufw.number(8, 2, 2)
    ufw.number(10, 4, 2)
    ufw.number(12, 512, 4)
    ufw.text(16, "AC791N")
    ufw.checksum(2, 64, 160)
    ufw.checksum(0, 2, 62)
    cipher(ufw.bytes, 0, 64, 0xFFFF)
    ufw.copy(1024, flash.bytes)
    ufw.copy(loader_at, loader)
    
    output = bytearray(total + 20)
    dest = 0
    for src in range(total):
        output[dest] = ufw.bytes[src]
        dest += 1
        if src < 940 and (src + 1) % 47 == 0:
            index = src // 47
            output[dest] = (ord(product[index]) + index + 1) if index < len(product) else 125
            dest += 1
    return bytes(output)

print("Packaging firmware into .fwsc container...")
raw_end = AREA + APP_DATA + len(combined) + 383 + 64
image_size = round_up(raw_end, 4096)
user_at = FLASH_LIMIT - USER_SIZE
vm_end = user_at - BT_SIZE
print(f"Layout check: raw_end={raw_end} (0x{raw_end:x}), image_size={image_size} (0x{image_size:x}), vm_end={vm_end} (0x{vm_end:x}), vm_free={vm_end - image_size}")
assert image_size <= vm_end, f"Flash overflow: image_size={image_size} > vm_end={vm_end}"

flash_img = build_flash(combined, PACK_DIR, image_size, vm_end)
with open(os.path.join(PACK_DIR, "ota.bin"), 'rb') as f:
    loader_bin = f.read()

product_id = "FM-1_801000"
pkg_bytes = wrap(flash_img, loader_bin, product_id)
out_fwsc = os.path.join(GEN_DIR, 'FM1_OFFICIAL_OPEN.fwsc')
with open(out_fwsc, 'wb') as f:
    f.write(pkg_bytes)

print(f"Firmware package successfully built!")
print(f"File: {out_fwsc}")
print(f"Size: {len(pkg_bytes)} bytes")
print(f"SHA256: {hashlib.sha256(pkg_bytes).hexdigest()}")
