/* SPDX-License-Identifier: GPL-3.0-only WITH GPL-3.0-linking-exception */
#ifndef FM1_CFW_SEQ_H
#define FM1_CFW_SEQ_H

#include "instrument.h"
#include "cfw_dsp.h"

enum {
    CFW_MAX_STEPS = 128,
    CFW_BANK_STEPS = 64,
    CFW_SCENES = 8
};

enum cfw_step_cond {
    CFW_COND_ALWAYS = 0,
    CFW_COND_1_2,
    CFW_COND_2_2,
    CFW_COND_1_4,
    CFW_COND_4_4,
    CFW_COND_FILL,
    CFW_COND_NOT_FILL,
    CFW_COND_1ST,
    CFW_COND_COUNT
};

struct cfw_scene {
    uint8_t used;
    uint8_t mute_mask;
    uint8_t bank_mask;     /* Bit t = 1 means Bank B (65..128) pinned */
    uint8_t eng[GROOVE_TRACKS];
    uint8_t pages[GROOVE_TRACKS]; /* 1..8 (x16 steps) */
    uint16_t tempo;
};

struct cfw_slicer_cfg {
    uint8_t slot;      /* 0..7 flash sample slot */
    uint8_t slices;    /* 2, 4, or 8 */
    uint8_t start_pct; /* 0..90 */
    uint8_t end_pct;   /* 10..100 */
};

void cfw_seq_init(void);

/* 128-step phrase support & Bank A/B state */
unsigned cfw_seq_length_get(unsigned track);
void cfw_seq_length_set(unsigned track, unsigned steps); /* 16..128 in 16s */
unsigned cfw_seq_active_bank(unsigned track);            /* 0 = Bank A (1..64), 1 = Bank B (65..128) */
void cfw_seq_get_step(unsigned track, unsigned step, struct groove_step *out);
void cfw_seq_set_step(unsigned track, unsigned step, unsigned note, unsigned vel, uint16_t drums);

/* Step-Ext (0..127): Probability (0..7), Conditional (0..7), Ratchet (0..3 => 1x..4x) */
unsigned cfw_seq_prob_get(unsigned track, unsigned step);
void cfw_seq_prob_edit(unsigned track, unsigned step, int delta);
const char *cfw_seq_prob_name(unsigned idx);

unsigned cfw_seq_cond_get(unsigned track, unsigned step);
void cfw_seq_cond_edit(unsigned track, unsigned step, int delta);
const char *cfw_seq_cond_name(unsigned idx);

unsigned cfw_seq_ratchet_get(unsigned track, unsigned step);
void cfw_seq_ratchet_edit(unsigned track, unsigned step, int delta);

/* Generative Tools */
void cfw_seq_gen_euclidean(unsigned track, unsigned pulses, unsigned steps,
                           unsigned rotate, unsigned note_or_pad);
void cfw_seq_gen_acid(unsigned track, unsigned root_note, unsigned scale_mode,
                      unsigned density, unsigned seed);
const char *cfw_seq_scale_name(unsigned scale_mode);

/* Stopped Step-Time Chord Capture */
int cfw_seq_step_chord(unsigned track, unsigned step, const uint8_t *notes,
                       unsigned count, unsigned velocity);

/* Scene Clip Launcher (8 scenes) */
void cfw_scene_capture(unsigned scene_idx);
int cfw_scene_launch(unsigned scene_idx);
void cfw_scene_info(unsigned scene_idx, struct cfw_scene *out);

/* Control & Audio synchronization */
void cfw_seq_control_poll(void);
void cfw_seq_sync_bank_a(unsigned track);
FM1_AUDIO_CODE void cfw_seq_audio_transport(uint8_t status);
FM1_AUDIO_CODE void cfw_seq_audio_tick(void);

/* Sample Slicer helpers (implemented across samples.c + cfw_seq.c) */
void cfw_slicer_get(struct cfw_slicer_cfg *out);
void cfw_slicer_edit(unsigned param, int delta);
int cfw_slicer_apply(void);
int cfw_slicer_gen_groove(unsigned track);
int cfw_slicer_restore(void);

/* Sample bank query API provided by samples.c */
int groove_samples_entry_info(unsigned slot, unsigned *frames, char name_out[16]);
int groove_samples_bind_slices(unsigned slot, unsigned start_pct, unsigned end_pct, unsigned count);
int groove_samples_restore_bank(void);

/* Built-in K250 Showcase Demo Jukebox */
enum { CFW_DEMO_ORCH = 0, CFW_DEMO_JAZZ = 1, CFW_DEMO_MARCH = 2, CFW_DEMO_MIXED = 3, CFW_DEMO_COUNT = 4 };
int groove_factory_apply_demo(unsigned demo_id);
int cfw_demo_start(unsigned id);
void cfw_demo_stop(void);
unsigned cfw_demo_playing(void);
unsigned cfw_demo_current(void);
const char *cfw_demo_name(unsigned id);
unsigned cfw_demo_elapsed_sec(void);
unsigned cfw_demo_duration_sec(unsigned id);

#endif
