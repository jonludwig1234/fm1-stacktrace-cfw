/* SPDX-License-Identifier: GPL-3.0-only WITH GPL-3.0-linking-exception */
#ifndef FM1_CFW_DSP_H
#define FM1_CFW_DSP_H

#include "fm1.h"

enum cfw_engine {
    CFW_ENG_STOCK = 0,
    CFW_ENG_VA_POLY,
    CFW_ENG_TR909,
    CFW_ENG_C64_SID,
    CFW_ENG_GRANULAR,
    CFW_ENG_COUNT
};

enum cfw_punch_fx {
    CFW_PUNCH_OFF = 0,
    CFW_PUNCH_STUTTER,
    CFW_PUNCH_TAPE_STOP,
    CFW_PUNCH_WASH_HPF,
    CFW_PUNCH_HALF_TIME,
    CFW_PUNCH_BIT_SCATTER,
    CFW_PUNCH_COUNT
};

enum cfw_learn_target {
    CFW_LEARN_NONE = 0,
    CFW_LEARN_CUTOFF,
    CFW_LEARN_RESO,
    CFW_LEARN_DECAY,
    CFW_LEARN_MORPH,
    CFW_LEARN_DRIVE,
    CFW_LEARN_CRUSH,
    CFW_LEARN_PHASER,
    CFW_LEARN_SIDECHAIN,
    CFW_LEARN_PUNCH_FX,
    CFW_LEARN_FILL,
    CFW_LEARN_USB_MON,
    CFW_LEARN_TARGETS
};

struct cfw_fx_state {
    uint8_t drive;        /* 0..100 */
    uint8_t crush;        /* 0..100 */
    uint8_t phaser;       /* 0..100 */
    uint8_t sidechain;    /* 0..100 */
    uint8_t punch_fx;     /* enum cfw_punch_fx */
    uint8_t fill_held;    /* 0/1 */
    uint8_t usb_mon_gain; /* 0..100 (default 100) */
    uint8_t usb_rec_mute; /* 0/1 (default 0) */
};

void cfw_dsp_init(void);
void cfw_dsp_reset(void);
void cfw_dsp_active_track_set(unsigned track);
unsigned cfw_dsp_active_track_get(void);

/* Track custom engine selection and 4 sound parameters (0..100). */
unsigned cfw_dsp_engine_get(unsigned track);
void cfw_dsp_engine_set(unsigned track, unsigned engine);
const char *cfw_dsp_engine_name(unsigned engine);
unsigned cfw_dsp_param_get(unsigned track, unsigned idx);
void cfw_dsp_param_edit(unsigned track, unsigned idx, int delta);
void cfw_dsp_param_set(unsigned track, unsigned idx, unsigned value);
const char *cfw_dsp_param_label(unsigned engine, unsigned idx);

/* Global Grit/Punch/USB FX settings. */
FM1_AUDIO_CODE void cfw_dsp_fx_get(struct cfw_fx_state *out);
void cfw_dsp_fx_set(const struct cfw_fx_state *in);
void cfw_dsp_fx_edit(unsigned param, int delta);
const char *cfw_dsp_punch_name(unsigned mode);

/* Live USB Audio Class state observed from audio ISR (safe to poll from control). */
unsigned cfw_dsp_usb_rx_active(void);
unsigned cfw_dsp_usb_tx_active(void);
void cfw_dsp_usb_telemetry(int usb_frames, int usb_written);

/* Audio-safe note & step clock triggers (callable from FM1_AUDIO_CODE or control via queue). */
void cfw_dsp_post_midi(unsigned track_mask, uint8_t status, uint8_t d1, uint8_t d2);
FM1_AUDIO_CODE void cfw_dsp_note_on(uint8_t track, uint8_t note, uint8_t vel);
FM1_AUDIO_CODE void cfw_dsp_note_off(uint8_t track, uint8_t note);
FM1_AUDIO_CODE void cfw_dsp_all_notes_off(uint8_t track);
FM1_AUDIO_CODE void cfw_dsp_sidechain_trigger(uint8_t strength);
FM1_AUDIO_CODE void cfw_dsp_set_tempo_bpm(unsigned bpm);
FM1_AUDIO_CODE void cfw_dsp_process(int32_t *output, unsigned master_gain_q7);

/* MIDI Learn bindings (control task). */
void cfw_learn_arm(unsigned target);
unsigned cfw_learn_armed_target(void);
int cfw_learn_get_cc(unsigned target);
void cfw_learn_clear(unsigned target);
void cfw_learn_on_cc(unsigned track_active, uint8_t ch, uint8_t cc, uint8_t val);
const char *cfw_learn_target_name(unsigned target);

#endif
