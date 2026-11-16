# FM-1 Stack Trace CFW (Custom Firmware + 256-Preset Web Workstation)

**Open-source Custom Firmware (`FM1_K250_STACKTRACE.fwsc`) for the M-VAVE FM-1 Groovebox / Synthesizer**, built on FM1 Open V14 with 4 new Q23 fixed-point DSP synthesis engines, a 128-step Pro Sequencer, Euclidean & 303 Acid generators, an 8-scene clip launcher, live Grit & Punch FX, a zero-flash-write sample slicer, MIDI CC Learn, 4 built-in MIDI-driven showcase demos, and a standalone 256-preset browser workstation.

> **Safety First:** Always back up your Projects, Samples, and DX7 Voice Banks via the [M-VAVE FM-1 Workbench](https://open.m-vave.com/fm1-workbench) before flashing any custom firmware. You can return to stock V15 at any time using the official Workbench.

---

## What's New in Stack Trace CFW

| Area | Features Added |
| :--- | :--- |
| **4 Extra Live DSP Engines** (`cfw_dsp.c`) | **VA Poly** (dual-DCO SuperSaw + resonant SVF), **TR-909** (punchy analog/PCM hybrid kit), **C64 SID** (6581 chiptune arpeggiator & pulse/tri), **Granular** (real-time stereo scatter cloud), alongside Stock DX7 / 808 / Sampler |
| **128-Step Pro Sequencer** (`cfw_seq.c`) | Bank A (`1–64`) & Bank B (`65–128`), per-step **Probability** (`12%–100%`), **Conditionals** (`1:2`, `2:2`, `1:4`, `4:4`, `FILL`, `!FILL`, `1ST`), **1×–4× Ratchets**, and stopped step-time chord capture |
| **Algorithmic Generators** | **Euclidean Rhythm** generator (pulses / steps / rotation) & **303 Acid Pattern** generator (root, scale lock, density, seed) |
| **8-Scene Clip Launcher** | Snapshot & launch 8 scenes storing mute masks, Bank A/B state, per-track engines, pattern lengths, and tempo |
| **Grit & Punch Live FX** | **Overdrive**, **Bitcrusher**, **4-Stage Phaser**, **Sidechain Pump**, plus **Punch FX** (`STUTTER`, `TAPE STOP`, `WASH HPF`, `HALF-TIME`, `BIT SCATTER`) and `FILL` hold |
| **Zero-Flash-Write Slicer** | Slice any of the 8 flash sample slots into 2, 4, or 8 pads with custom start/end % — **no flash wear** |
| **MIDI CC Learn & USB Audio** | Map external MIDI CCs to Cutoff, Reso, Decay, Morph, Drive, Crush, Phaser, Sidechain, Punch FX, Fill, and USB Monitor; live USB Audio RX/TX telemetry |
| **4 Built-In Showcase Demos** | **Beethoven Orchestra (56s)**, **Jazz Big-Band All-Star (112s)**, **Stars & Stripes March (87s)**, and **Multi-Genre & EDM/Rock Showcase (102s)** — stored as compact LZ77-packed MIDI streams (`9.1 KB` total, zero embedded WAVs) |
| **256-Preset Web Workstation** | Standalone `web_emulator/index.html` with 675 calibrated multi-samples, studio amp/cabinet IR DSP, 8-bus mixer, and `.WAV` / `.MID` export |

---

## Flashing Guide (M-VAVE FM-1 Hardware)

1. **Back Up Your Synth**
   - Connect your FM-1 via USB and open the [M-VAVE FM-1 Workbench](https://open.m-vave.com/fm1-workbench).
   - Export your **Projects**, **Sample Bank**, and **DX7 Voice Banks A–D**.
2. **Download & Verify the Firmware**
   - Download `FM1_K250_STACKTRACE.fwsc` and `SHA256SUMS.txt` from the [GitHub Releases](../../releases) page.
   - Verify the SHA-256 checksum (`sha256sum -c SHA256SUMS.txt`).
3. **Flash via Workbench**
   - Select **Firmware Update -> Local File** in the Workbench and choose `FM1_K250_STACKTRACE.fwsc`.
   - Keep the FM-1 powered on and USB connected until the reboot splash screen (`STACK TRACE PRESENTS // K250 SIMULATOR`) appears.
4. **Rolling Back to Stock**
   - Use the M-VAVE Workbench firmware restore option to flash official V14/V15 at any time, then restore your exported backups.

---

## Quick-Start Hardware Controls

- **CFW Engines & Sound Params:** On track view, select between `STOCK`, `VA POLY`, `TR-909`, `C64 SID`, and `GRANULAR`, and tweak the 4 Q23 engine parameters (`0–100`).
- **128-Step Sequencer (Bank A/B):** Toggle Bank A (`1–64`) / Bank B (`65–128`) and edit per-step **Prob**, **Cond**, and **Ratchet (1×–4×)**.
- **Demo Jukebox:** Open the **DEMO SONGS** bank (`preset_bank == 2`) from the preset/project browser to audition all 4 built-in MIDI showcase tracks directly on the hardware DSP.
- **Zero-Wear Slicer:** Select a flash sample slot (`0–7`), set `2 / 4 / 8` slices and Start/End %, then apply to map slices across pads without writing to Flash.

---

## Standalone Web Workstation

Open `web_emulator/index.html` in any modern Chromium/Firefox/Safari browser (no server or install required) to:
- Audition all **256 workstation presets** across 8 synthesis/sampling engines.
- Play all **4 Showcase Demo Songs** live through the 8-bus mixer and record lossless 16-bit `.WAV` masters.
- Sync with physical FM-1 hardware over WebMIDI (`0xF8` clock & DX7 `.SYX` transfer).

---

## Building from Source

Firmware builds target the **AC791N (PI32v2 `r3`)** using the JieLi 2.5.3 toolchain (`clang.exe`, `pi32v2-ld.exe`, `llvm-objcopy.exe`).

- Windows PowerShell (official SDK flow):
  ```powershell
  $env:FM1_PI32_TOOLCHAIN = 'C:\JL\pi32'
  .\sdk\Build.ps1 -FirmwareOnly -Toolchain 'C:\JL\pi32'
  ```
- Linux (via Wine + Python packager):
  1. Generate compact Flash assets (`cfw_demo_songs.h`, `stacktrace_avatar_rle.h`): `python3 gen_firmware_assets.py`
  2. Compile & link `sdk.elf`: `python3 build_firmware.py`
  3. Package `FM1_OFFICIAL_OPEN.fwsc`: `python3 package_fw.py`
  4. Verify ELF/ISR/Container integrity (`7/7 PASS`): `python3 verify_firmware_suite.py`

---

## License & Attribution

- **Application Firmware (`app/`):** [GPLv3 with the FM1 SDK linking exception](LICENSE.md).
- **Device Engine SDK (`sdk/`):** Binary SDK provided under separate terms; retain [THIRD_PARTY.md](THIRD_PARTY.md) when distributing builds.
- Built on [m-vave/fm1_open](https://github.com/m-vave/fm1_open).
