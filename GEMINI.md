# M-VAVE FM-1 Stack Trace CFW & Web Studio Rules

## Web Studio & Kurzweil K250 Bank
- Keep all 7 synth engines active (`K250`, `DX7`, `VA`, `B303`, `D808`, `SID`, `GRAN`); default `T1`–`T8` to distinct engines and display the active K250 category (not repeated `K250 SAMPLER`) on K250 tracks.
- Keep the K250 preset list limited to distinct, genuinely sampled instruments (no duplicate variants or oscillator-only fillers).
- Mirror every edit between `docs/index.html` and `web/stacktrace_ui_prototype.html`.
- Whenever changing `docs/k250_presets_and_zones.js` or preset indices/schemas, bump the script cache-buster (`?v=N`) and `STORAGE_KEY` version (`fm1_stacktrace_session_vN`).
- Demo songs (`app/cfw_demo_songs.h`, `demos/*.mid`, `docs/k250_demos.json`) must use the authentic un-thinned source arrangements from `/home/jon/projects/fm1_campaign/` with exact per-track instruments—never short placeholder motifs.
- Treat `/home/jon/Desktop/FM1_Firmware/web_emulator/index.html` as read-only reference input; never modify it.

## Firmware UI & Hardware Safety (`app/screen.c`, `app/ui_primitives.h`)
- Target hardware: JieLi AC791N (`1,024 KB` ROM, `~511 KB` RAM0), ST7789 `240×240` RGB565 LCD via non-blocking 16-row SPI1 band DMA (`7,680 B`). Never allocate heap memory or block audio/MIDI ISRs.
- Keep `HOME` strictly idempotent (return to `OVERVIEW`, clear toast, cancel confirmation modals—never open sub-browsers from `HOME`).
- After any C UI change, verify with:
  1. `gcc -std=c11 -Os -DFM1_HOST_TEST -Iapp -Isdk/include -Iapp/synth -c app/screen.c -o /tmp/screen_host.o && size /tmp/screen_host.o`
  2. `gcc -std=c11 -DFM1_HOST_TEST -Iapp -Isdk/include -Iapp/synth -fsanitize=address,undefined tests/test_ui_redesign.c -o /tmp/test_ui_redesign && /tmp/test_ui_redesign`
  3. Export and visually inspect 4× PNG framebuffer previews in `ui_previews/`.
