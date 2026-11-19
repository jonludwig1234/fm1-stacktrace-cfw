# M-VAVE FM-1 Firmware — UI/UX Redesign Specification

> **Status:** Phase 1 Complete (Audit & Design Specification — awaiting approval before modifying firmware source code)  
> **Target Repository:** `fm1-stacktrace-cfw` (`app/screen.c`, `app/board/lcd.inc`, `app/board/fm1_input.h`)  
> **Design Goal:** Radically simple, 1-screen zero-diving performance workflow with max 2-level hierarchy, 100% consistent muscle-memory controls, real-time visual feedback, and strict zero-allocation embedded safety.

---

## 1. Hardware Constraints & Resource Budget

### 1.1 MCU & Memory Map (`sdk/config/linker.ld.in`)
| Resource | Budget | Notes |
|---|---|---|
| **MCU** | JieLi AC791N (32-bit dual-core, SPI1 LCD DMA + SPI2 scan DMA) | Audio runs in `.volatile_ram_code`; UI runs strictly in `app_control` task |
| **Flash (`rom`)** | `1,024 KB` (`0x2000120`) | Shared by SDK, DSP engines, LZ77 demo songs (`27.7 KB`), and UI code |
| **Internal RAM (`ram0`)** | `~511.3 KB` (`523,596 B`) | Shared by audio buffers, synth voices, sequencer, and UI |
| **Cache RAM (`cache_ram`)** | `28 KB` (`7 × 4 KB`) | Hardware cache ways |
| **UI Static RAM Footprint** | `~9.5 KB` total | `paint_pixels[240×16]` (`7,680 B`) + `saved_cache` + `band_cache` + `frame_views[8]`; **zero `malloc`/heap** |

### 1.2 Display Subsystem (`app/board/fm1_lcd_hw.h`, `app/board/lcd.inc`)
- **Controller:** ST7789 IPS Color LCD over SPI1 DMA.
- **Resolution & Color Depth:** `240 × 240 px`, **16-bit RGB565** (byte-swapped in-place before DMA submit).
- **Non-Blocking Band Renderer (`app/screen.c:36-68, 1872-1914`):**
  - Renders in **15 horizontal bands of 16 rows** (`PAINT_ROWS = 16`, `FM1_SCREEN_DMA_PIXELS = 240 × 16 = 3,840 px = 7,680 B`).
  - Uses dirty-region tracking (`paint_left[15]`, `paint_right[15]`, `paint_priority` bitmask) and `fm1_screen_submit()` / `fm1_screen_pending()` with a hard `4 ms` per-tick budget so LCD transfers **never stall audio or MIDI interrupts**.
- **Built-in Typography (`app/screen.c:20-32, 88-145`):**
  - 5×7 bitmap font (`font[36][5]` digits + uppercase A–Z, plus 32 ASCII punctuation glyphs).
  - Rendered at integer `scale = 1` (`6×7 px` cell, up to 40 chars/line) or `scale = 2` (`12×14 px` cell, up to 20 chars/line).
- **Palette (`app/screen.c:10-18, 151`):**
  - `BACK` (`0x0000`), `PANEL` (`0x18e3`), `TEXT` (`0xef5d`), `ACCENT` (`0x07ff` cyan), `DIM` (`0x738e`), `GREEN` (`0x07e0`), `AMBER` (`0xfd20`), plus 8 semantic per-track/engine colors `colors[0..7]`.

### 1.3 Physical Controls (`app/board/fm1_input.h`, `app/board/panel.c`, `sdk/include/fm1.h`)
| Control Group | Count | Hardware Mapping | LED Feedback |
|---|---|---|---|
| **Panel Buttons** | `14` | `OCT_DOWN (0)`, `OCT_UP (1)`, `FX (2)`, `SCL (3)`, `ENV (4)`, `LFO (5)`, `EDIT (6)`, `GLO (7)`, `HOME (8)`, `SAVE (9)`, `ARP (10)`, `SEQ (11)`, `PLAY (12)`, `REC (13)` | Individual LEDs (`0..13`) via `fm1_led_set()` |
| **Keyboard Keys** | `27` | `F3..G5` (`bits 0..26`, 16 white keys mapped to steps/slots/tracks) | Individual LEDs (`14..40`) via `fm1_led_set()` |
| **Rotary Encoders** | `7` | `ENC0` (Select/Track), `ENC1` (Page/Sub-tab), `ENC2..ENC5` (4 Soft Knobs `K1..K4`), `ENC6` (Preset/Value/Tempo) | On-screen highlights + 1–4× velocity acceleration |
| **Analog Controls** | `2` | Master volume potentiometer (`knob`, 10-bit ADC) + Battery monitor (`battery`, 10-bit ADC) | Header battery/level readout |

---

## 2. Audit of Current UI Pain Points (`app/screen.c`, 3,401 lines)

### 2.1 Deep, Fragmented 20-Screen State Machine
`app/screen.c:148` currently defines **20 separate top-level `page` enums**:
`OVERVIEW`, `STEPS`, `FM_EDIT`, `FM_ENV`, `FM_LFO`, `TONE_EDIT`, `MIX`, `BLE`, `PROJECT`, `NAME`, `EFFECTS`, `SOURCE`, `ACTIONS`, `STEP_EDIT`, `RHYTHM`, `FM_QUICK`, `PRESET_BROWSER`, `ARP_EDIT`, `CFW_LAB`, `STARTUP`.

On top of those 20 screens, multiple screens hide deep nested sub-pages:
- `FM_EDIT`: `11` parameter groups × `6` operators = **66 sub-views**.
- `EFFECTS`: `5` sub-pages (`0..4`).
- `CFW_LAB`: `5` sub-tabs (`0..4`).
- `STEPS`: `4` sub-pages (`0..3`).
- `ACTIONS`: **26-item scrolling text menu** (`app/screen.c:172-178`).

### 2.2 Inconsistent & Undiscoverable Input Mappings
1. **`HOME` Does Not Stay Home (`app/screen.c:2225-2230`):** Pressing `HOME` while already on `OVERVIEW` unexpectedly jumps into `PRESET_BROWSER` instead of acting as a safe idempotent "Return Home / Cancel" button.
2. **14 Hidden Multi-Button Chords & Long-Presses (`app/screen.c:2119-2264`):**
   - `HOME+PLAY` (Panic), `HOME+SAVE` (Undo), `HOME+SEQ` (Tap Tempo), `HOME+GLO` (BLE), `HOME+EDIT` (CFW Lab), `HOME+ENC6` (Engine Switch), `EDIT+REC` (DX7 Name), `SEQ+EDIT` (Actions), `Hold SEQ 600ms` (Actions), `Hold ARP 600ms` (Arp Edit), `Hold EDIT 600ms` (Advanced Edit), `Hold REC 600ms + ENC0` (Cursor Seek), `Tap GLO` (Mix), `Hold GLO + Keys/Enc` (Momentary Mix). None of these are discoverable on-screen.
3. **Shifting Meaning of `OCT_DOWN / OCT_UP` (`app/screen.c:2288-2295`):** Changes keyboard octave on most screens, pages steps on `STEPS` and `ACTIONS`, and toggles `64/128-step` length on `CFW_LAB tab 1`.
4. **Shifting Meaning of `SAVE` (`app/screen.c:2296-2303, 2358, 2386`):** Opens `PROJECT` from some screens, acts as "Execute/Confirm" on `SOURCE`/`ACTIONS`/`BLE`/`CFW_LAB`, and silently does nothing on others.
5. **Confirmed Existing Bug in `ACTIONS` Dispatch (`app/screen.c:176-177` vs `2415-2421`):**
   - Menu item `22` (`"CFW: GEN EUCLID/ACID"`) actually toggles `64/128-STEP` length, while menu item `25` (`"CFW: TOGGLE 128-STEP"`) actually opens `CFW_LAB tab 3`.

### 2.3 Missing Performance Visuals & Safety Gaps
- **No Real-Time Sound Visualization on Home (`overview()`, `app/screen.c:536-615`):** Home is a dense 8-row spreadsheet (`y=48..190`) showing raw 7-char track labels (`"303 SAW"`, `"808 KIT"`, `"SAMPLER"`) with **no active preset name**, **no octave badge**, **no waveform/ADSR preview**, and **no visual parameter bars** on `K1..K4` (just plain text strings).
- **Ad-Hoc Destructive Confirmations:** `ACTIONS` uses `action_confirm`, `BLE` uses `ble_forget`, and `PROJECT` uses `project_reload` — three separate confirmation mechanisms with inconsistent cancel gestures.
- **No Reusable UI Primitives:** Coordinates, borders, value bars, tab headers, and toasts are hand-coded inline across 20 draw functions, inflating Flash code size and making layout alignment brittle.

---

## 3. New Information Architecture (Max 2 Levels Deep)

Collapse all 20 legacy screens into **1 Performance Home Screen** + **5 Flat 1-Click Workspaces** (each with 1–3 visual tabs via `ENC1`, clearly badged `1/3`) + **1 Universal Modal/Toast Layer**:

| Level 1 (1-Click Button) | Screen / Workspace | Level 2 Tabs (`ENC1`, shown as `1/N` in Header) | Replaces Legacy Pages |
|---|---|---|---|
| **`HOME`** | **Performance Hub** *(always safe return)* | Single screen (no sub-tabs) | `OVERVIEW`, `FM_QUICK`, `STARTUP` |
| **`EDIT`** *(or `ENV`/`LFO`/`SCL` direct jump)* | **Sound Designer** | `1/3` **TONE** (4 macros + Engine/Source) · `2/3` **ENV/LFO** (live ADSR curve + LFO) · `3/3` **DEEP** (DX7 Op/Alg or Tone Adv) | `FM_EDIT`, `FM_ENV`, `FM_LFO`, `TONE_EDIT`, `SOURCE`, `NAME` |
| **`SEQ`** | **Sequencer** | `1/2` **GRID** (16/128-step bars + velocity) · `2/2` **TOOLS** (Step edit, Copy/Paste/Clear, Euclid/Acid gen, 64/128 len) | `STEPS`, `STEP_EDIT`, `RHYTHM`, `ACTIONS`, `ARP_EDIT` |
| **`FX`** | **FX & Grit** | `1/2` **TRACK** (Rev/Dly Send, Drive/Grit, Crush) · `2/2` **MASTER** (Hall, Chorus, Comp, Punch) | `EFFECTS` (0..4) |
| **`GLO`** | **8-Bus Mixer** | Single screen (8 vertical meters + Mute/Solo/Vol) | `MIX` |
| **`SAVE`** | **Browser & Utility** | `1/3` **PRESETS** (Bank/Preset/Demo quick load) · `2/3` **PROJECT** (Save/Load/Rename slot) · `3/3` **SYSTEM** (BLE/MIDI/Clock/Slicer) | `PRESET_BROWSER`, `PROJECT`, `BLE`, `CFW_LAB` |
| *(Overlay)* | **Confirm Modal & Toast** | Non-blocking 1.5s toast bar (`y=170..186`); blocking `[SAVE=YES / HOME=NO]` modal for destructive actions | `action_confirm`, `ble_forget`, `project_reload`, `notice` |

> **Direct Muscle-Memory Shortcuts Preserved:** Pressing `ENV`, `LFO`, or `SCL` jumps straight into `SOUND` tab `2/3` (ENV/LFO) or `3/3` (DEEP) in **1 click**. Pressing `HOME` from *any* screen or modal **always** returns safely to `HOME` (canceling any pending modal/confirm without side effects).

---

## 4. Unified Input Grammar Table

Every physical control keeps the **exact same mental model** across every screen:

| Physical Control | Performance (`HOME`) | Edit Workspaces (`SOUND` / `SEQ` / `FX` / `MIX`) | Utility / Modal (`UTIL` / Confirm) |
|---|---|---|---|
| **`HOME` (Tap)** | Idempotent: stays on `HOME`, clears toast | Return immediately to `HOME` | Cancel modal / return to `HOME` |
| **`HOME` + `PLAY`** | **Panic / All-Notes-Off** + Rewind | **Panic / All-Notes-Off** + Return `HOME` | **Panic / All-Notes-Off** |
| **`HOME` + `SAVE`** | **Undo / Redo** (with toast) | **Undo / Redo** (with toast) | **Undo / Redo** |
| **`ENC0` (Select)** | Select Active Track (`T1`–`T8`) | Select Track (`T1`–`T8`) or List Item (`TOOLS`) | Scroll Preset / Project / Setting |
| **`ENC1` (Page)** | Adjust **Tempo (BPM)** (`60–200`) | Switch Sub-Tab (`1/3` → `2/3` → `3/3`) | Switch Utility Tab (`1/3`–`3/3`) |
| **`ENC2..ENC5` (`K1..K4`)** | Adjust 4 Live Performance Macros (bar animates immediately) | Adjust 4 Visible Tab Parameters (matching bottom bar `K1..K4`) | Adjust Bank / Filter / Char / Value |
| **`ENC6` (Value)** | Scroll Active Track **Preset** (instant audition) | Coarse Step / Cursor / DX7 Operator (`OP1..6`) | Load / Preview Selected Item |
| **`HOME` + `ENC2..5`** | Coarse step (`±10`) on `K1..K4` | Coarse step (`±10`) on `K1..K4` | Coarse scroll (`±8`) |
| **`OCT-` / `OCT+`** | Keyboard Octave (`-2..+2`, shown in header) | Keyboard Octave (`-2..+2`); on `SEQ`: Page `1/8..8/8` (shown in header) | Prev / Next Bank |
| **`PLAY` / `REC`** | Play/Stop · Arm/Disarm Live Rec | Play/Stop · Step/Live Rec | Audition Demo / Confirm |
| **`ARP` (Tap / Hold)** | Tap: Toggle Arp · Hold `500ms`: Arp Params | Tap: Toggle Arp · Hold `500ms`: Arp Params | — |
| **`SAVE`** | Open `UTIL` (`PROJECT` tab) | Open `UTIL` (`PROJECT` tab) | **Confirm / Execute** (destructive ops prompt modal first) |
| **`27 Keys` (`F3..G5`)** | Play active track live | Play live; on `SEQ`: 16 white keys toggle steps `1..16`; on `MIX`: keys `1..8` Mute, `9..16` Solo | Quick-select slot `1..16` |

---

## 5. ASCII Pixel-Grid Wireframes (`240 × 240 px` ST7789 RGB565)

Every screen shares a strict **3-zone vertical grid** (`1 px` dividers, generous `6 px` side margins, zero overlapping text):
- **Zone A — Top Status Bar (`y = 0..25`, `26 px`):** BPM/Clock, Transport/Step, Octave (`C4`), Track/Tab Pill (`1/3`), Dirty `*` + Battery.
- **Zone B — Main Visual Canvas (`y = 26..187`, `162 px`):** High-contrast hero card, live graphs (ADSR/step/meter), or focused controls.
- **Zone C — 4-Knob Soft Bar (`y = 188..239`, `52 px`):** 4 equal `56 px` cells (`x = 4, 62, 120, 178`) aligned directly above hardware encoders `K1..K4`, each with 4–5 char label, proportional level bar (`4 px` tall), and bold value!

### 5.1 Screen 1: `HOME` — 1-Screen Performance Hub (`240 × 240`)
```text
y=0   +----------------------------------------------------------+
      | 124 BPM  ▶ 09/64   OCT:C4   [LIVE]  *  [===]             |  Header (26px)
y=26  +----------------------------------------------------------+
      | [T1]  K250 SAMPLER                        VOL 88  [====] |  Hero Card (46px)
      |       001 STEINWAY GRAND                       A/B: [A]  |  scale=2 preset
y=72  +----------------------------------------------------------+
      |  ADSR / LIVE MONITOR           16-STEP PLAYHEAD          |  Visual Strip (52px)
      |     /\___                      █ . . . █ . . . █ . . .   |  Live ADSR curve +
      |    /     \                     ▼ step 9                  |  mini step bar
y=124 +----------------------------------------------------------+
      | [1]   [2]   [3]   [4]   [5]   [6]   [7]   [8]            |  8-Track Strip (64px)
      | PNO   303   808   VA    DX7   SID   GRN   STR            |  Active = inverted
      | ▓▓▓   ▓▓░   ▓▓▓   ▓░░   ▓▓░   ▓░░   ░░░   ▓▓░  (meters)  |  Live peak bars
      | [ ]   [ ]   [ ]   [ ]   [M]   [ ]   [ ]   [S]            |  Mute/Solo badges
y=188 +----------------------------------------------------------+
      | CUTOF      | RESO       | DECAY      | DETUN             |  4-Knob Bar (52px)
      | [██████░░] | [███░░░░░] | [█████░░░] | [██░░░░░░]        |  Proportional bars
      |    78      |    34      |    68      |    18             |  scale=2 values
y=240 +----------------------------------------------------------+
```

### 5.2 Screen 2: `SOUND` — Tab `2/3 ENV / LFO` (`240 × 240`)
```text
y=0   +----------------------------------------------------------+
      | 124 BPM  ▶ 09/64   OCT:C4   [SOUND 2/3]                  |  Header (26px)
y=26  +----------------------------------------------------------+
      | [1:TONE]   [■ 2:ENV/LFO ■]   [3:DEEP]                    |  Tab Strip (18px)
y=44  +----------------------------------------------------------+
      |  T1: STEINWAY GRAND            LFO: SIN  RT:35  DP:28    |  Context (16px)
y=60  +----------------------------------------------------------+
      |  +----------------------------------------------------+  |  Live ADSR Graph
      |  |        /\                                          |  |  (124px canvas)
      |  |       /  \_______________                          |  |  Real-time polyline
      |  |      /                   \                         |  |  drawn with line()
      |  |     /                     \                        |  |  updating at 30fps
      |  |  A:12    D:62      S:70     R:48                   |  |  on K1..K4 turn
      |  +----------------------------------------------------+  |
y=188 +----------------------------------------------------------+
      | ATK        | DEC        | SUS        | REL               |  4-Knob Bar (52px)
      | [█░░░░░░░] | [█████░░░] | [██████░░] | [████░░░░]        |
      |    12      |    62      |    70      |    48             |
y=240 +----------------------------------------------------------+
```

### 5.3 Screen 3: `SEQ` — Tab `1/2 GRID` (`240 × 240`)
```text
y=0   +----------------------------------------------------------+
      | 124 BPM  ▶ 09/64   PG 1/4   [SEQ 1/2]                    |  Header (26px)
y=26  +----------------------------------------------------------+
      | [■ 1:GRID ■]   [2:TOOLS]           LEN:64   T1: PIANO    |  Tab Strip (18px)
y=44  +----------------------------------------------------------+
      |  STEP 05  NOTE: C4   VEL:112   GATE:75%   PROB:100%      |  Selected Step (18px)
y=62  +----------------------------------------------------------+
      |   01 02 03 04  05 06 07 08  09 10 11 12  13 14 15 16     |  16-Step Velocity
      |   ▓▓ .. .. ..  ██ .. ▓▓ ..  ▓▓ .. .. ▓▓  ██ .. ▓▓ ..     |  Columns (104px)
      |   ▓▓ .. .. ..  ██ .. ▓▓ ..  ▓▓ .. .. ▓▓  ██ .. ▓▓ ..     |  Height = velocity
      |   ▓▓ .. .. ..  ██ .. ▓▓ ..  ▓▓ .. .. ▓▓  ██ .. ▓▓ ..     |  Green bar = head
      |   [1]          [▲]          [9]          [13]            |  White box = cursor
y=168 |  [KEYS 1-16: TOGGLE]  [OCT-/+: PAGE]  [ENC6: CURSOR]     |  Hint Strip (18px)
y=188 +----------------------------------------------------------+
      | NOTE       | VEL        | GATE       | PROB              |  4-Knob Bar (52px)
      | [█████░░░] | [███████░] | [██████░░] | [████████]        |
      |    C4      |   112      |    75      |   100             |
y=240 +----------------------------------------------------------+
```

### 5.4 Screen 4: `MIX` — 8-Bus Performance Mixer (`240 × 240`)
```text
y=0   +----------------------------------------------------------+
      | 124 BPM  ▶ 09/64   OCT:C4   [MIX]                        |  Header (26px)
y=26  +----------------------------------------------------------+
      |  T1   T2   T3   T4   T5   T6   T7   T8                   |  8 Vertical Strips
      |  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐                 |  (142px height)
      |  │  │ │  │ │██│ │  │ │  │ │  │ │  │ │  │                 |  Track-colored
      |  │██│ │██│ │██│ │██│ │  │ │  │ │  │ │██│                 |  faders + peak
      |  │██│ │██│ │██│ │██│ │██│ │██│ │██│ │██│                 |  hold line
      |  │██│ │██│ │██│ │██│ │██│ │██│ │██│ │██│                 |
      |  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘                 |
      |  [■]  [ ]  [ ]  [ ]  [M]  [ ]  [ ]  [S]                  |  Active/Mute/Solo
      |   88   86   92   86   84   80   78   84                  |
y=168 |  [KEYS 1-8: MUTE]   [KEYS 9-16: SOLO]   [ENC0: BANK]     |  Hint Strip (18px)
y=188 +----------------------------------------------------------+
      | T1 VOL     | T2 VOL     | T3 VOL     | T4 VOL            |  4-Knob Bar (52px)
      | [███████░] | [███████░] | [████████] | [███████░]        |
      |    88      |    86      |    92      |    86             |
y=240 +----------------------------------------------------------+
```

### 5.5 Overlay: Destructive Confirmation Modal & Non-Blocking Toast
```text
      +----------------------------------------------------------+
      |  ...underlying screen stays rendered cleanly behind...   |
      |     +==============================================+     |  Modal Box
      |     |  ! CONFIRM ACTION                            |     |  (x=24..216,
      |     |                                              |     |   y=68..164,
      |     |  CLEAR TRACK 1 (64 STEPS)?                   |     |   2px AMBER border)
      |     |  UNDO REMAINS AVAILABLE.                     |     |
      |     |                                              |     |
      |     |  [SAVE: YES, CLEAR]     [HOME: CANCEL]       |     |
      |     +==============================================+     |
      +----------------------------------------------------------+

Toast (non-blocking, auto-clears after 1500ms, y=170..186):
      |  [■ SAVED SLOT 03: NIGHT RUN                          ]  |
```

---

## 6. Phased Implementation Plan (Awaiting Approval)

### Phase 2: Modular UI Implementation
1. **Reusable Zero-Allocation UI Primitives (`app/ui_primitives.h` / `app/screen.c`):**
   - `ui_header()` — unified 26 px top bar with BPM, playhead, octave, tab badge (`1/3`), and dirty `*`.
   - `ui_tab_bar()` — 18 px pill tab selector for 2–3 tab workspaces.
   - `ui_knob_bar()` — 4-column `52 px` soft-knob strip with **proportional level bars** (`0..100%`) and active-turn highlight border (`300 ms` flash).
   - `ui_adsr_graph()` — integer-math real-time ADSR polyline renderer (zero floating point, zero heap).
   - `ui_toast_bar()` & `ui_confirm_modal()` — single universal non-blocking toast + single destructive confirmation dialog used by Project Overwrite, Pattern/Track Clear, BLE Forget, and Source Replace.
2. **Decoupled Band-DMA Pipeline & 30–60 FPS Pacing:**
   - Retain the existing `paint_pixels[240×16]` (`7,680 B`) non-blocking band-DMA engine and `4 ms` flush cap; add explicit dirty-flag gating + `33 ms` (~30 FPS) meter/playhead refresh cadence so SPI1 DMA never competes with audio ISRs.
3. **Screen-by-Screen Refactor & Unified Input Router:**
   - Replace the 20-page spaghetti switch and 14 hidden chords with the 6-screen (`HOME`, `SOUND`, `SEQ`, `FX`, `MIX`, `UTIL`) + `2`-level tab router matching Section 4.
   - Fix the confirmed `ACTIONS[22/25]` dispatch bug along the way by folding pattern tools cleanly into `SEQ -> 2/2 TOOLS`.

### Phase 3: Build & Verification
1. **Host Verification & Framebuffer PNG Previews (`./ui_previews/`):**
   - Compile with `gcc -std=c11 -Wall -Wextra -Werror -fsanitize=address,undefined -DFM1_HOST_TEST` and run a host framebuffer harness that renders every redesigned screen (`HOME`, `SOUND 1/3..3/3`, `SEQ 1/2..2/2`, `FX`, `MIX`, `UTIL`, `CONFIRM MODAL`) into 4× nearest-neighbor upscaled PNGs in `./ui_previews/` for pixel-exact visual inspection.
   - Run automated state-machine tests verifying: `HOME` idempotency, min/max clamping, rapid encoder bursts, undo/redo, and destructive confirmation cancel/accept paths.
2. **Firmware Build & Footprint Check:**
   - Verify zero warnings/errors and confirm Flash & RAM usage remain well within the AC791N `1024 KB` ROM / `511 KB` RAM0 budgets (note: full `.fwsc` packaging uses `sdk/Build.ps1` with the JieLi AC791N toolchain on Windows, while Linux host tests verify all C11 compilation, ASan/UBSan safety, and framebuffer rendering).

---

**Ready for your approval:** Reply **"approve"** (or let me know any tweaks to the wireframes, tab groupings, or button mappings) to proceed to **Phase 2: Modular UI Implementation**.
