/* Host-side verification & 240x240 RGB565 framebuffer preview harness for
 * M-VAVE FM-1 UI/UX Redesign (compiled with -DFM1_HOST_TEST -fsanitize=address,undefined). */
#define _POSIX_C_SOURCE 200809L
#include <assert.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "fm1.h"
#include "fm1_engine_control.h"
#include "instrument.h"
#include "cfw_dsp.h"
#include "cfw_seq.h"

/* ---- Mock 240x240 RGB565 Framebuffer & Hardware State ---- */
static uint16_t fb[FM1_SCREEN_HEIGHT][FM1_SCREEN_WIDTH];
static uint32_t mock_ms = 2000U;
static struct fm1_controls mock_ctrl;
static uint8_t mock_muted[8] = {0, 0, 0, 0, 1, 0, 0, 0};
static uint8_t mock_solo[8]  = {0, 0, 0, 0, 0, 0, 0, 1};
static uint8_t mock_vol[8]   = {96, 84, 110, 88, 76, 80, 72, 92};
static uint8_t mock_lvl[8]   = {102, 74, 118, 52, 0, 66, 38, 94};
static uint8_t mock_type[8]  = {GROOVE_DX7, GROOVE_303, GROOVE_808, GROOVE_PLUCK, GROOVE_DX7, GROOVE_PSG, GROOVE_SAMPLE, GROOVE_DX7};
static unsigned mock_len[8]  = {64, 64, 64, 64, 64, 64, 64, 64};
static int mock_undo_calls = 0;
static int mock_clear_calls = 0;

uint32_t fm1_millis(void) { return mock_ms; }
void fm1_controls_read(struct fm1_controls *s) { *s = mock_ctrl; memset(mock_ctrl.encoders, 0, sizeof mock_ctrl.encoders); }
void fm1_screen_init(void) { memset(fb, 0, sizeof fb); }
int fm1_screen_pending(void) { return 0; }
int fm1_screen_submit(unsigned x, unsigned y, unsigned w, unsigned h, uint16_t *pixels, size_t count)
{
    if (!pixels || x + w > FM1_SCREEN_WIDTH || y + h > FM1_SCREEN_HEIGHT || count < w * h) return -1;
    for (unsigned r = 0; r < h; ++r)
        for (unsigned c = 0; c < w; ++c)
            fb[y + r][x + c] = pixels[r * w + c];
    return 0;
}

void groove_get_view(unsigned t, unsigned step, struct groove_view *v)
{
    memset(v, 0, sizeof *v);
    t &= 7U;
    v->type = mock_type[t];
    v->volume = mock_vol[t];
    v->level = mock_lvl[t];
    v->muted = mock_muted[t];
    v->solo = mock_solo[t];
    v->audible = !v->muted;
    v->ready = 1;
    v->playing = 1;
    v->tempo = 124;
    v->play_step = 8;
    v->sequence_length = (uint8_t)mock_len[t];
    v->next_length = (uint8_t)mock_len[t];
    v->active_steps = 0x1111111111115555ULL;
    v->step.note = (uint8_t)(60 + (step % 12));
    v->step.velocity = 104;
    v->modified = (t == 0);
}
int groove_fm_copy(unsigned t, uint8_t patch[156], struct groove_fm_controls *c)
{
    memset(patch, 0, 156);
    patch[0] = 14; patch[1] = 56; patch[2] = 68; patch[3] = 42;
    patch[4] = 99; patch[5] = 85; patch[6] = 72; patch[7] = 0;
    patch[134] = 4;
    const char *nm = (t == 0) ? "STEINWAY  " : (t == 7) ? "STRINGS   " : "DX7 E.PNO ";
    memcpy(patch + 145, nm, 10);
    if (c) memset(c, 0, sizeof *c);
    return 0;
}
int groove_tone_copy(unsigned t, unsigned part, uint8_t values[GROOVE_TONE_PARAMS])
{
    (void)t; (void)part;
    memset(values, 64, GROOVE_TONE_PARAMS);
    values[2] = 16; values[3] = 70; values[4] = 84; values[5] = 48;
    return 0;
}
void groove_project_name(char out[13]) { strcpy(out, "STACKTRACE"); }
unsigned groove_project_dirty(void) { return 1; }
unsigned groove_source_type(unsigned t) { return mock_type[t & 7U]; }
int groove_source_set(unsigned t, unsigned s) { mock_type[t & 7U] = (uint8_t)s; return 0; }
unsigned groove_sequence_length(unsigned t) { return mock_len[t & 7U]; }
void groove_sequence_length_set(unsigned t, unsigned l) { mock_len[t & 7U] = l; }
int groove_edit_undo(void) { ++mock_undo_calls; return 0; }
int groove_edit_clear(unsigned t, unsigned c, unsigned s) { (void)t;(void)c;(void)s; ++mock_clear_calls; return 0; }
void groove_mix_toggle(unsigned t, int solo) { if (solo) mock_solo[t & 7U] ^= 1; else mock_muted[t & 7U] ^= 1; }
unsigned groove_midi_activity(unsigned t) { return (t == 0 || t == 2) ? 1U : 0U; }
unsigned cfw_seq_length_get(unsigned t) { return mock_len[t & 7U]; }
void cfw_seq_length_set(unsigned t, unsigned l) { mock_len[t & 7U] = l; }

#include "ui_stubs.inc"
#include "../app/screen.c"

static void pump_frames(unsigned n)
{
    for (unsigned i = 0; i < n; ++i) {
        mock_ms += 40U;
        groove_screen_control();
    }
}

static void save_ppm(const char *path)
{
    FILE *f = fopen(path, "wb");
    assert(f != NULL);
    fprintf(f, "P6\n%u %u\n255\n", FM1_SCREEN_WIDTH, FM1_SCREEN_HEIGHT);
    for (unsigned y = 0; y < FM1_SCREEN_HEIGHT; ++y) {
        for (unsigned x = 0; x < FM1_SCREEN_WIDTH; ++x) {
            uint16_t c = fb[y][x];
            uint8_t rgb[3] = {
                (uint8_t)(((c >> 11) & 31U) * 255U / 31U),
                (uint8_t)(((c >> 5)  & 63U) * 255U / 63U),
                (uint8_t)((c & 31U) * 255U / 31U)
            };
            fwrite(rgb, 1, 3, f);
        }
    }
    fclose(f);
}

int main(void)
{
    groove_screen_init();
    mock_ms += 1500U;
    pump_frames(20);
    assert(page == OVERVIEW);

    /* 1. Render HOME Performance Hub */
    save_ppm("/tmp/ui_home.ppm");

    /* 2. Verify HOME idempotency (stays on OVERVIEW) */
    mock_ctrl.buttons = BUTTON(HOME); pump_frames(2);
    mock_ctrl.buttons = 0; pump_frames(2);
    assert(page == OVERVIEW);

    /* 3. Verify OCT_UP / OCT_DOWN clamping (-2..+2) */
    for (int i = 0; i < 6; ++i) { mock_ctrl.buttons = BUTTON(OCT_UP); pump_frames(1); mock_ctrl.buttons = 0; pump_frames(1); }
    assert(octave == 2);
    for (int i = 0; i < 6; ++i) { mock_ctrl.buttons = BUTTON(OCT_DOWN); pump_frames(1); mock_ctrl.buttons = 0; pump_frames(1); }
    assert(octave == -2);
    for (int i = 0; i < 2; ++i) { mock_ctrl.buttons = BUTTON(OCT_UP); pump_frames(1); mock_ctrl.buttons = 0; pump_frames(1); }
    assert(octave == 0);

    /* 4. Verify K1 encoder turn highlights active knob + HOME+K1 coarse step */
    mock_ctrl.buttons = BUTTON(HOME);
    mock_ctrl.encoders[2] = 2;
    pump_frames(1);
    assert(encoder_speed[2] == 4);
    assert((int32_t)(knob_flash_until[0] - mock_ms) > 0);
    mock_ctrl.buttons = 0;
    pump_frames(16);

    /* 5. Verify HOME+SAVE Undo triggers non-blocking Toast */
    mock_ctrl.buttons = BUTTON(HOME) | BUTTON(SAVE); pump_frames(1);
    mock_ctrl.buttons = 0; pump_frames(16);
    assert(mock_undo_calls == 1);
    assert(notice != NULL);
    save_ppm("/tmp/ui_home_toast.ppm");

    /* 6. Render SEQ screen */
    mock_ctrl.buttons = BUTTON(SEQ); pump_frames(1);
    mock_ctrl.buttons = 0; pump_frames(18);
    assert(page == STEPS);
    save_ppm("/tmp/ui_seq.ppm");

    /* 7. Render MIX screen */
    mock_ctrl.buttons = BUTTON(GLO); pump_frames(1);
    mock_ctrl.buttons = 0; pump_frames(18);
    assert(page == MIX);
    save_ppm("/tmp/ui_mix.ppm");

    /* 8. Verify Destructive Confirm Modal + HOME Cancel + ACTIONS[22/25] fix */
    mock_ctrl.buttons = BUTTON(SEQ) | BUTTON(EDIT); pump_frames(1);
    mock_ctrl.buttons = 0; pump_frames(4);
    assert(page == ACTIONS);
    action = 10; /* CLEAR TRACK (destructive) */
    mock_ctrl.buttons = BUTTON(SAVE); pump_frames(1);
    mock_ctrl.buttons = 0; pump_frames(18);
    assert(action_confirm == 1);
    assert(mock_clear_calls == 0);
    save_ppm("/tmp/ui_confirm_modal.ppm");

    /* HOME cancels confirmation modal safely without clearing */
    mock_ctrl.buttons = BUTTON(HOME); pump_frames(1);
    mock_ctrl.buttons = 0; pump_frames(2);
    assert(action_confirm == 0);
    assert(mock_clear_calls == 0);

    /* Verify ACTIONS[25] toggles 64/128-step length */
    action = 25;
    mock_ctrl.buttons = BUTTON(SAVE); pump_frames(1);
    mock_ctrl.buttons = 0; pump_frames(2);
    assert(mock_len[0] == 128U);

    /* Verify ACTIONS[22] opens CFW_LAB tab 3 (Euclid/Acid Gen) */
    action = 22;
    mock_ctrl.buttons = BUTTON(SAVE); pump_frames(1);
    mock_ctrl.buttons = 0; pump_frames(2);
    assert(page == CFW_LAB && cfw_tab == 3U);

    /* Return HOME safely */
    mock_ctrl.buttons = BUTTON(HOME); pump_frames(1);
    mock_ctrl.buttons = 0; pump_frames(2);
    assert(page == OVERVIEW);

    puts("ALL UI REDESIGN ASSERTIONS PASSED (ASan+UBSan clean)!");
    return 0;
}
