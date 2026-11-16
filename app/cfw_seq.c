/* SPDX-License-Identifier: GPL-3.0-only WITH GPL-3.0-linking-exception */
#include "cfw_seq.h"
#include "fm1_engine_control.h"
#include "cfw_demo_songs.h"
#include <string.h>

/* ============================================================================
 * Extended 128-Step Phrase Mirror, Conditionals, Ratchets & Scenes
 * ============================================================================ */
static struct groove_step bank_a[GROOVE_TRACKS][CFW_BANK_STEPS];
static struct groove_step bank_b[GROOVE_TRACKS][CFW_BANK_STEPS];
/* step_ext[t][s]: bits 0..2 prob, bits 3..5 cond, bits 6..7 ratchet (0..3 => 1x..4x) */
static uint8_t step_ext[GROOVE_TRACKS][CFW_MAX_STEPS];
static uint8_t track_len[GROOVE_TRACKS];       /* 16,32,48,64,80,96,112,128 */
static uint8_t active_bank[GROOVE_TRACKS];     /* 0=Bank A, 1=Bank B */
static uint8_t loop_pass[GROOVE_TRACKS];       /* Incremented each track loop wrap */
static uint8_t last_hw_step[GROOVE_TRACKS];
static uint8_t playing_flag;
static uint8_t track_muted_mask;
static uint8_t track_is_drum_mask;
static uint8_t track_last_note[GROOVE_TRACKS];
static uint32_t seq_bpm = 120U;

/* Sample-accurate audio clock for CFW synth engines & ratchets */
static uint32_t audio_phase_q16;
static uint32_t audio_step_idx[GROOVE_TRACKS];
static uint8_t audio_ratchet_left[GROOVE_TRACKS];
static uint32_t audio_ratchet_acc[GROOVE_TRACKS];
static uint32_t audio_ratchet_period[GROOVE_TRACKS];
static uint8_t audio_ratchet_note[GROOVE_TRACKS];
static uint8_t audio_ratchet_vel[GROOVE_TRACKS];
static uint32_t seq_rng = 0x9E3779B9U;

static struct cfw_scene scenes[CFW_SCENES];
static struct cfw_slicer_cfg slicer = {0U, 8U, 0U, 100U};
static unsigned bank_a_dirty_ticks;

enum { DEMO_MAX_ACTIVE = 16 };
struct cfw_demo_voice {
    uint8_t active, track, note;
    uint32_t off_ms;
};
static struct cfw_demo_voice demo_voices[DEMO_MAX_ACTIVE];
static uint8_t demo_unpacked[CFW_DEMO_MAX_BYTES];
static uint8_t demo_active, demo_song_id;
static uint16_t demo_pos, demo_raw_len;
static uint32_t demo_start_ms, demo_next_ms, demo_elapsed_s;

static void demo_lz77_unpack(const uint8_t *src, unsigned src_len, uint8_t *dst, unsigned dst_cap)
{
    unsigned at = 0U, out = 0U;
    while (at < src_len && out < dst_cap) {
        unsigned tok = src[at++];
        if ((tok & 0x80U) == 0U) {
            for (unsigned n = tok + 1U; n && at < src_len && out < dst_cap; --n)
                dst[out++] = src[at++];
        } else {
            if (at >= src_len) break;
            unsigned low = src[at++], dist = low & 127U;
            if ((low & 128U) && at < src_len) dist |= (unsigned)src[at++] << 7;
            for (unsigned n = (tok & 127U) + 3U; n && out < dst_cap; --n) {
                dst[out] = dist <= out ? dst[out - dist] : 0U;
                ++out;
            }
        }
    }
}

static int clamp_i(int v, int lo, int hi)
{
    return v < lo ? lo : v > hi ? hi : v;
}

static FM1_AUDIO_CODE uint32_t seq_rand(void)
{
    uint32_t x = seq_rng;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    seq_rng = x;
    return x;
}

/* Evaluate Probability + Conditional inside FM1_AUDIO_CODE */
static FM1_AUDIO_CODE int eval_step_fire(uint8_t t, uint8_t ext, uint8_t pass, uint8_t fill_on)
{
    (void)t;
    unsigned prob = ext & 7U;
    unsigned cond = (ext >> 3) & 7U;
    static FM1_AUDIO_DATA const uint8_t prob_thresh[8] = {255, 192, 128, 64, 224, 85, 170, 32};

    if (cond == CFW_COND_1_2 && (pass & 1U) != 0U) return 0;
    if (cond == CFW_COND_2_2 && (pass & 1U) != 1U) return 0;
    if (cond == CFW_COND_1_4 && (pass & 3U) != 0U) return 0;
    if (cond == CFW_COND_4_4 && (pass & 3U) != 3U) return 0;
    if (cond == CFW_COND_FILL && !fill_on) return 0;
    if (cond == CFW_COND_NOT_FILL && fill_on) return 0;
    if (cond == CFW_COND_1ST && pass != 0U) return 0;

    if (prob && ((seq_rand() & 255U) >= prob_thresh[prob])) return 0;
    return 1;
}

static FM1_AUDIO_CODE void trigger_cfw_step(uint8_t t, unsigned abs_step, uint32_t step_samples_q16, uint8_t fill_on)
{
    if (track_muted_mask & (1U << t)) return;
    unsigned eng = cfw_dsp_engine_get(t);
    if (eng == CFW_ENG_STOCK) return;

    unsigned bank_idx = abs_step >> 6;
    unsigned s = abs_step & 63U;
    const struct groove_step *cell = bank_idx ? &bank_b[t][s] : &bank_a[t][s];
    uint8_t ext = step_ext[t][abs_step];
    unsigned ratch = (ext >> 6) & 3U;

    /* Release previous note on melodic CFW engines */
    if (eng != CFW_ENG_TR909 && track_last_note[t] < 128U) {
        cfw_dsp_note_off(t, track_last_note[t]);
        track_last_note[t] = 255U;
    }

    if (eng == CFW_ENG_TR909) {
        if (!cell->drums && !cell->velocity) return;
        if (!eval_step_fire(t, ext, loop_pass[t], fill_on)) return;
        if (cell->drums) {
            /* Map hardware drum pads 0..10 to GM/TR909 MIDI notes */
            static FM1_AUDIO_DATA const uint8_t pad_notes[16] = {
                36, 38, 41, 43, 45, 37, 39, 56, 49, 46, 42, 47, 48, 50, 51, 54
            };
            for (unsigned p = 0; p < 16U; ++p) {
                if (cell->drums & (1U << p))
                    cfw_dsp_note_on(t, pad_notes[p], 112U);
            }
            if (ratch > 0) {
                audio_ratchet_left[t] = (uint8_t)ratch;
                audio_ratchet_note[t] = (cell->drums & 1U) ? 36U : (cell->drums & 2U) ? 38U : 42U;
                audio_ratchet_vel[t] = 96U;
                audio_ratchet_period[t] = (step_samples_q16 >> 16) / (ratch + 1U);
                audio_ratchet_acc[t] = 0;
            }
        } else {
            cfw_dsp_note_on(t, cell->note, cell->velocity);
        }
        return;
    }

    /* Melodic CFW engine (VA Poly, C64 SID, Granular) */
    if (!cell->velocity) return;
    if (!eval_step_fire(t, ext, loop_pass[t], fill_on)) return;

    cfw_dsp_note_on(t, cell->note, cell->velocity);
    track_last_note[t] = cell->note;
    if (ratch > 0) {
        audio_ratchet_left[t] = (uint8_t)ratch;
        audio_ratchet_note[t] = cell->note;
        audio_ratchet_vel[t] = (uint8_t)((cell->velocity * 3U) >> 2);
        audio_ratchet_period[t] = (step_samples_q16 >> 16) / (ratch + 1U);
        audio_ratchet_acc[t] = 0;
    }
}

/* ============================================================================
 * Audio Thread Transport & Step Scheduler (FM1_AUDIO_CODE)
 * ============================================================================ */
FM1_AUDIO_CODE void cfw_seq_audio_transport(uint8_t status)
{
    if (status == 0xfaU || status == 0xffU || status == 0xfcU) {
        if (status == 0xfaU) {
            audio_phase_q16 = 0;
            for (unsigned t = 0; t < GROOVE_TRACKS; ++t) {
                audio_step_idx[t] = 0;
                loop_pass[t] = 0;
                audio_ratchet_left[t] = 0;
                if (track_last_note[t] < 128U) {
                    cfw_dsp_note_off((uint8_t)t, track_last_note[t]);
                    track_last_note[t] = 255U;
                }
            }
            playing_flag = 1;
        } else {
            playing_flag = 0;
            for (unsigned t = 0; t < GROOVE_TRACKS; ++t) {
                audio_ratchet_left[t] = 0;
                if (track_last_note[t] < 128U) {
                    cfw_dsp_note_off((uint8_t)t, track_last_note[t]);
                    track_last_note[t] = 255U;
                }
            }
            cfw_dsp_all_notes_off(255U);
        }
    } else if (status == 0xfbU) {
        playing_flag = 1;
    }
}

FM1_AUDIO_CODE void cfw_seq_audio_tick(void)
{
    if (!playing_flag) return;
    struct cfw_fx_state fx;
    cfw_dsp_fx_get(&fx);
    uint32_t bpm = seq_bpm ? seq_bpm : 120U;
    /* Samples per 16th note in Q16: ((44100 * 15 / bpm) << 16) */
    uint32_t step_len_q16 = (uint32_t)(((uint64_t)FM1_SAMPLE_RATE * 15ULL << 16) / bpm);

    /* Ratchet retrigger counters */
    for (unsigned t = 0; t < GROOVE_TRACKS; ++t) {
        if (audio_ratchet_left[t] > 0) {
            audio_ratchet_acc[t] += FM1_BLOCK_FRAMES;
            if (audio_ratchet_acc[t] >= audio_ratchet_period[t]) {
                audio_ratchet_acc[t] -= audio_ratchet_period[t];
                audio_ratchet_left[t]--;
                cfw_dsp_note_on((uint8_t)t, audio_ratchet_note[t], audio_ratchet_vel[t]);
                track_last_note[t] = audio_ratchet_note[t];
            }
        }
    }

    if (audio_phase_q16 == 0) {
        for (uint8_t t = 0; t < GROOVE_TRACKS; ++t)
            trigger_cfw_step(t, audio_step_idx[t], step_len_q16, fx.fill_held);
    }

    audio_phase_q16 += ((uint32_t)FM1_BLOCK_FRAMES << 16);
    if (audio_phase_q16 >= step_len_q16) {
        audio_phase_q16 -= step_len_q16;
        for (uint8_t t = 0; t < GROOVE_TRACKS; ++t) {
            unsigned len = track_len[t] ? track_len[t] : 64U;
            unsigned next = audio_step_idx[t] + 1U;
            if (next >= len) {
                next = 0;
                loop_pass[t]++;
            }
            audio_step_idx[t] = next;
            trigger_cfw_step(t, next, step_len_q16, fx.fill_held);
        }
    }
}

/* ============================================================================
 * Control API & Stock 64-Step <-> Bank B Synchronization
 * ============================================================================ */
void cfw_seq_init(void)
{
    memset(bank_a, 0, sizeof bank_a);
    memset(bank_b, 0, sizeof bank_b);
    memset(step_ext, 0, sizeof step_ext);
    memset(scenes, 0, sizeof scenes);
    memset(last_hw_step, 0, sizeof last_hw_step);
    for (unsigned t = 0; t < GROOVE_TRACKS; ++t) {
        track_len[t] = (uint8_t)groove_sequence_length(t);
        if (!track_len[t]) track_len[t] = 64U;
        active_bank[t] = 0;
        loop_pass[t] = 0;
        track_last_note[t] = 255U;
        audio_step_idx[t] = 0;
        audio_ratchet_left[t] = 0;
        cfw_seq_sync_bank_a(t);
    }
    slicer.slot = 0;
    slicer.slices = 8;
    slicer.start_pct = 0;
    slicer.end_pct = 100;
    playing_flag = 0;
    seq_bpm = 120;
    audio_phase_q16 = 0;
    bank_a_dirty_ticks = 0;
    demo_active = 0;
    demo_pos = 0;
    demo_elapsed_s = 0;
    memset(demo_voices, 0, sizeof demo_voices);
}

void cfw_seq_sync_bank_a(unsigned track)
{
    if (track >= GROOVE_TRACKS) return;
    if (active_bank[track] == 0U) {
        groove_sequence_read(track, 0, bank_a[track], CFW_BANK_STEPS);
    }
}

unsigned cfw_seq_length_get(unsigned track)
{
    return track < GROOVE_TRACKS && track_len[track] ? track_len[track] : 64U;
}

void cfw_seq_length_set(unsigned track, unsigned steps)
{
    if (track >= GROOVE_TRACKS) return;
    steps = ((steps + 15U) / 16U) * 16U;
    if (steps < 16U) steps = 16U;
    if (steps > CFW_MAX_STEPS) steps = CFW_MAX_STEPS;
    track_len[track] = (uint8_t)steps;
    groove_sequence_length_set(track, steps > 64U ? 64U : steps);
    if (steps <= 64U && active_bank[track]) {
        active_bank[track] = 0;
        groove_sequence_replace(track, 0, bank_a[track], CFW_BANK_STEPS);
    }
}

unsigned cfw_seq_active_bank(unsigned track)
{
    return track < GROOVE_TRACKS ? active_bank[track] : 0U;
}

void cfw_seq_get_step(unsigned track, unsigned step, struct groove_step *out)
{
    if (!out || track >= GROOVE_TRACKS || step >= CFW_MAX_STEPS) return;
    if (step < CFW_BANK_STEPS) {
        if (active_bank[track] == 0U) {
            struct groove_view v = {0};
            groove_get_view(track, step, &v);
            *out = v.step;
        } else {
            *out = bank_a[track][step];
        }
    } else {
        *out = bank_b[track][step - CFW_BANK_STEPS];
    }
}

void cfw_seq_set_step(unsigned track, unsigned step, unsigned note, unsigned vel, uint16_t drums)
{
    if (track >= GROOVE_TRACKS || step >= CFW_MAX_STEPS) return;
    struct groove_step cell = { (uint8_t)note, (uint8_t)vel, drums };
    if (step < CFW_BANK_STEPS) {
        bank_a[track][step] = cell;
        if (active_bank[track] == 0U)
            groove_sequence_replace(track, step, &cell, 1U);
    } else {
        bank_b[track][step - CFW_BANK_STEPS] = cell;
        if (active_bank[track] == 1U)
            groove_sequence_replace(track, step - CFW_BANK_STEPS, &cell, 1U);
    }
}

unsigned cfw_seq_prob_get(unsigned track, unsigned step)
{
    if (track >= GROOVE_TRACKS || step >= CFW_MAX_STEPS) return 0U;
    return step_ext[track][step] & 7U;
}

void cfw_seq_prob_edit(unsigned track, unsigned step, int delta)
{
    if (track >= GROOVE_TRACKS || step >= CFW_MAX_STEPS || !delta) return;
    int v = (int)(step_ext[track][step] & 7U) + delta;
    v = (v % 8 + 8) % 8;
    step_ext[track][step] = (uint8_t)((step_ext[track][step] & ~7U) | (unsigned)v);
    if (step < 64U && active_bank[track] == 0U) {
        /* Mirror prob to hardware setting 2 when Bank A is mounted */
        int cur = (int)groove_step_setting(track, step, 2);
        groove_step_setting_edit(track, step, 2, v - cur);
    }
}

const char *cfw_seq_prob_name(unsigned idx)
{
    static const char *const names[8] = {"100%", "75%", "50%", "25%", "88%", "33%", "66%", "12%"};
    return names[idx & 7U];
}

unsigned cfw_seq_cond_get(unsigned track, unsigned step)
{
    if (track >= GROOVE_TRACKS || step >= CFW_MAX_STEPS) return 0U;
    return (step_ext[track][step] >> 3) & 7U;
}

void cfw_seq_cond_edit(unsigned track, unsigned step, int delta)
{
    if (track >= GROOVE_TRACKS || step >= CFW_MAX_STEPS || !delta) return;
    int v = (int)((step_ext[track][step] >> 3) & 7U) + delta;
    v = (v % CFW_COND_COUNT + CFW_COND_COUNT) % CFW_COND_COUNT;
    step_ext[track][step] = (uint8_t)((step_ext[track][step] & ~(7U << 3)) | ((unsigned)v << 3));
}

const char *cfw_seq_cond_name(unsigned idx)
{
    static const char *const names[CFW_COND_COUNT] = {
        "ALWAYS", "1:2", "2:2", "1:4", "4:4", "FILL", "!FILL", "1ST"
    };
    return names[idx % CFW_COND_COUNT];
}

unsigned cfw_seq_ratchet_get(unsigned track, unsigned step)
{
    if (track >= GROOVE_TRACKS || step >= CFW_MAX_STEPS) return 0U;
    return (step_ext[track][step] >> 6) & 3U;
}

void cfw_seq_ratchet_edit(unsigned track, unsigned step, int delta)
{
    if (track >= GROOVE_TRACKS || step >= CFW_MAX_STEPS || !delta) return;
    int v = (int)((step_ext[track][step] >> 6) & 3U) + delta;
    v = clamp_i(v, 0, 3);
    step_ext[track][step] = (uint8_t)((step_ext[track][step] & ~(3U << 6)) | ((unsigned)v << 6));
}

/* ============================================================================
 * Generative Algorithms: Euclidean Rhythm & 303 Acid Line
 * ============================================================================ */
void cfw_seq_gen_euclidean(unsigned track, unsigned pulses, unsigned steps,
                           unsigned rotate, unsigned note_or_pad)
{
    if (track >= GROOVE_TRACKS) return;
    if (steps < 2U) steps = 16U;
    if (steps > 32U) steps = 32U;
    if (pulses > steps) pulses = steps;

    unsigned is_drum = groove_pad_count(track) != 0 || cfw_dsp_engine_get(track) == CFW_ENG_TR909;
    unsigned pad = note_or_pad % 16U;
    unsigned len = cfw_seq_length_get(track);

    for (unsigned s = 0; s < len; ++s) {
        unsigned m = (s + steps - (rotate % steps)) % steps;
        unsigned hit = pulses == 0 ? 0U : (((m * pulses) % steps) < pulses);
        struct groove_step cell;
        cfw_seq_get_step(track, s, &cell);
        if (is_drum) {
            if (hit) cell.drums |= (uint16_t)(1U << pad);
            else     cell.drums &= (uint16_t)~(1U << pad);
            cell.note = (uint8_t)(step_ext[track][s] & 7U); /* prob on stock drums */
            cell.velocity = cell.drums ? ((m & 3U) ? 98U : 122U) : 0U;
        } else {
            cell.note = (uint8_t)(note_or_pad < 128U ? note_or_pad : 48U);
            cell.velocity = hit ? ((m & 3U) ? 96U : 120U) : 0U;
            cell.drums = 0U;
        }
        cfw_seq_set_step(track, s, cell.note, cell.velocity, cell.drums);
    }
}

const char *cfw_seq_scale_name(unsigned scale_mode)
{
    static const char *const scales[4] = {"MINOR", "PHRYG", "DORIAN", "PENTA"};
    return scales[scale_mode & 3U];
}

void cfw_seq_gen_acid(unsigned track, unsigned root_note, unsigned scale_mode,
                      unsigned density, unsigned seed)
{
    if (track >= GROOVE_TRACKS) return;
    static const uint8_t scales[4][7] = {
        {0, 2, 3, 5, 7, 8, 10}, /* Minor */
        {0, 1, 3, 5, 7, 8, 10}, /* Phrygian */
        {0, 2, 3, 5, 7, 9, 10}, /* Dorian */
        {0, 3, 5, 7, 10, 0, 12} /* Pentatonic */
    };
    const uint8_t *sc = scales[scale_mode & 3U];
    uint32_t rng = 0x51A093U ^ (seed * 2654435761U) ^ (track * 1013904223U);
    unsigned len = cfw_seq_length_get(track);
    if (density < 15U) density = 65U;
    if (density > 100U) density = 100U;

    for (unsigned s = 0; s < len; ++s) {
        rng = rng * 1664525U + 1013904223U;
        unsigned r = (rng >> 16) & 255U;
        unsigned active = (s == 0) || ((r * 100U) >> 8) < density;
        if (!active) {
            cfw_seq_set_step(track, s, (unsigned)root_note, 0U, 0U);
            continue;
        }
        unsigned deg = (rng >> 8) % 7U;
        unsigned oct_jump = ((rng >> 24) & 7U) == 0U ? 12U : 0U;
        unsigned note = root_note + sc[deg] + oct_jump;
        if (note > 108U) note -= 12U;
        unsigned accent = ((rng >> 12) & 3U) == 0U;
        unsigned slide = ((rng >> 20) & 3U) == 0U;
        uint16_t drums = slide ? (1U << 12) : 0U; /* Bit 12 = tie/slide for 303/melodic */
        cfw_seq_set_step(track, s, note, accent ? 127U : 92U, drums);
    }
}

int cfw_seq_step_chord(unsigned track, unsigned step, const uint8_t *notes,
                       unsigned count, unsigned velocity)
{
    if (track >= GROOVE_TRACKS || step >= CFW_MAX_STEPS || !notes || !count) return -1;
    if (step < CFW_BANK_STEPS && active_bank[track] == 0U) {
        return groove_sequence_chord(track, step, notes, count, velocity);
    }
    cfw_seq_set_step(track, step, notes[0], velocity, 0U);
    return 0;
}

/* ============================================================================
 * 8-Scene Clip Launcher
 * ============================================================================ */
void cfw_scene_capture(unsigned idx)
{
    if (idx >= CFW_SCENES) return;
    struct cfw_scene *sc = &scenes[idx];
    sc->used = 1U;
    sc->mute_mask = 0U;
    sc->bank_mask = 0U;
    for (unsigned t = 0; t < GROOVE_TRACKS; ++t) {
        struct groove_view v = {0};
        groove_get_view(t, 0, &v);
        if (v.muted) sc->mute_mask |= (uint8_t)(1U << t);
        if (active_bank[t]) sc->bank_mask |= (uint8_t)(1U << t);
        sc->eng[t] = (uint8_t)cfw_dsp_engine_get(t);
        sc->pages[t] = (uint8_t)(cfw_seq_length_get(t) / 16U);
        if (t == 0U) sc->tempo = v.tempo ? v.tempo : 120U;
    }
}

int cfw_scene_launch(unsigned idx)
{
    if (idx >= CFW_SCENES || !scenes[idx].used) return -1;
    const struct cfw_scene *sc = &scenes[idx];
    for (unsigned t = 0; t < GROOVE_TRACKS; ++t) {
        struct groove_view v = {0};
        groove_get_view(t, 0, &v);
        unsigned want_mute = (sc->mute_mask >> t) & 1U;
        if (v.muted != want_mute) groove_mix_toggle(t, 0);
        cfw_dsp_engine_set(t, sc->eng[t]);
        cfw_seq_length_set(t, (unsigned)sc->pages[t] * 16U);
        unsigned want_bank = (sc->bank_mask >> t) & 1U;
        if (active_bank[t] != want_bank) {
            active_bank[t] = (uint8_t)want_bank;
            groove_sequence_replace(t, 0, want_bank ? bank_b[t] : bank_a[t], CFW_BANK_STEPS);
        }
    }
    return 0;
}

void cfw_scene_info(unsigned idx, struct cfw_scene *out)
{
    if (out && idx < CFW_SCENES) *out = scenes[idx];
}

/* ============================================================================
 * Control Poll: Keep Shadow Bank A, Mutes, Tempo & 128-Step Swaps Aligned
 * ============================================================================ */
void cfw_seq_control_poll(void)
{
    uint8_t m_mask = 0U, d_mask = 0U;
    unsigned playing_any = 0U;
    unsigned tempo_now = 120U;

    ++bank_a_dirty_ticks;
    unsigned periodic_sync = (bank_a_dirty_ticks & 15U) == 0U;

    for (unsigned t = 0; t < GROOVE_TRACKS; ++t) {
        struct groove_view v = {0};
        groove_get_view(t, 0, &v);
        if (!v.audible && v.muted) m_mask |= (uint8_t)(1U << t);
        if (groove_pad_count(t) || cfw_dsp_engine_get(t) == CFW_ENG_TR909)
            d_mask |= (uint8_t)(1U << t);
        if (t == 0U && v.tempo) tempo_now = v.tempo;
        if (v.playing) playing_any = 1U;

        if (periodic_sync && active_bank[t] == 0U) {
            groove_sequence_read(t, 0, bank_a[t], CFW_BANK_STEPS);
        }

        /* 128-step Stock Engine Bank A <-> Bank B automatic swap on bar wrap */
        if (v.playing && track_len[t] > 64U && cfw_dsp_engine_get(t) == CFW_ENG_STOCK) {
            if (v.play_step < last_hw_step[t] && last_hw_step[t] >= 48U) {
                active_bank[t] ^= 1U;
                groove_sequence_replace(t, 0, active_bank[t] ? bank_b[t] : bank_a[t], CFW_BANK_STEPS);
            }
        }
        last_hw_step[t] = v.play_step;
    }

    track_muted_mask = m_mask;
    track_is_drum_mask = d_mask;
    seq_bpm = tempo_now;
    cfw_dsp_set_tempo_bpm(tempo_now);
    if (playing_any != playing_flag) {
        cfw_seq_audio_transport(playing_any ? 0xfaU : 0xfcU);
    }

    if (demo_active) {
        const struct cfw_demo_song_desc *desc = &cfw_demo_songs[demo_song_id];
        uint32_t now = fm1_millis();
        uint32_t elapsed = now - demo_start_ms;
        demo_elapsed_s = elapsed / 1000U;

        for (unsigned i = 0; i < DEMO_MAX_ACTIVE; ++i) {
            if (demo_voices[i].active && elapsed >= demo_voices[i].off_ms) {
                uint8_t off[3] = {(uint8_t)(0x80U | groove_midi_input_channel(demo_voices[i].track)), demo_voices[i].note, 0U};
                (void)groove_midi_local(off, 3U);
                demo_voices[i].active = 0U;
            }
        }

        unsigned burst = 0U;
        while ((unsigned)demo_pos + 3U <= (unsigned)demo_raw_len && burst < 10U) {
            const uint8_t *ev = demo_unpacked + demo_pos;
            uint8_t b0 = ev[0], b1 = ev[1], b2 = ev[2];
            if ((b1 & 0x7FU) == 0U) {
                uint32_t w = (uint32_t)b0 | ((uint32_t)b2 << 8);
                uint32_t t = demo_next_ms + w * 15U;
                if (elapsed < t) break;
                demo_next_ms = t;
                demo_pos += 3U;
                continue;
            }
            uint32_t dt = b0 & 0x3FU;
            uint32_t t = demo_next_ms + dt * 15U;
            if (elapsed < t) break;
            demo_next_ms = t;
            demo_pos += 3U;

            uint8_t trk = b2 & 7U;
            uint8_t midi = b1 & 0x7FU;
            uint8_t vel3 = (uint8_t)(((b0 >> 6) & 3U) | ((b1 >> 5) & 4U));
            uint8_t vel = (uint8_t)(56U + (unsigned)vel3 * 10U);
            uint32_t dur_ms = (uint32_t)cfw_demo_dur_ticks[(b2 >> 3) & 31U] * 15U;

            int free_slot = -1;
            unsigned oldest_idx = 0U;
            for (unsigned i = 0; i < DEMO_MAX_ACTIVE; ++i) {
                if (demo_voices[i].active && demo_voices[i].track == trk && demo_voices[i].note == midi) {
                    uint8_t off[3] = {(uint8_t)(0x80U | groove_midi_input_channel(trk)), midi, 0U};
                    (void)groove_midi_local(off, 3U);
                    demo_voices[i].active = 0U;
                }
                if (!demo_voices[i].active && free_slot < 0) free_slot = (int)i;
                if (demo_voices[i].off_ms < demo_voices[oldest_idx].off_ms) oldest_idx = i;
            }
            unsigned slot = free_slot >= 0 ? (unsigned)free_slot : oldest_idx;
            if (demo_voices[slot].active) {
                uint8_t off[3] = {(uint8_t)(0x80U | groove_midi_input_channel(demo_voices[slot].track)), demo_voices[slot].note, 0U};
                (void)groove_midi_local(off, 3U);
            }
            uint8_t on[3] = {(uint8_t)(0x90U | groove_midi_input_channel(trk)), midi, vel};
            (void)groove_midi_local(on, 3U);
            demo_voices[slot].active = 1U;
            demo_voices[slot].track = trk;
            demo_voices[slot].note = midi;
            demo_voices[slot].off_ms = elapsed + dur_ms;
            ++burst;
        }

        if ((unsigned)demo_pos + 3U > (unsigned)demo_raw_len) {
            unsigned still_on = 0U;
            for (unsigned i = 0; i < DEMO_MAX_ACTIVE; ++i)
                if (demo_voices[i].active) { still_on = 1U; break; }
            if (!still_on && demo_elapsed_s >= (unsigned)desc->duration_sec)
                cfw_demo_stop();
        }
    }
}

int cfw_demo_start(unsigned id)
{
    if (id >= CFW_DEMO_COUNT) return -1;
    cfw_demo_stop();
    if (groove_factory_apply_demo(id) != 0) return -1;
    for (unsigned t = 0; t < GROOVE_TRACKS; ++t) cfw_dsp_engine_set(t, CFW_ENG_STOCK);
    if (id == CFW_DEMO_MIXED) {
        cfw_dsp_engine_set(4U, CFW_ENG_VA_POLY);
        cfw_dsp_engine_set(5U, CFW_ENG_TR909);
        cfw_dsp_engine_set(6U, CFW_ENG_C64_SID);
        cfw_dsp_engine_set(7U, CFW_ENG_GRANULAR);
    }
    const struct cfw_demo_song_desc *desc = &cfw_demo_songs[id];
    demo_raw_len = desc->raw_bytes;
    demo_lz77_unpack(desc->lz_stream, desc->lz_bytes, demo_unpacked, demo_raw_len);
    demo_song_id = (uint8_t)id;
    demo_pos = 0U;
    demo_next_ms = 0U;
    demo_start_ms = fm1_millis();
    demo_elapsed_s = 0U;
    demo_active = 1U;
    return 0;
}

void cfw_demo_stop(void)
{
    for (unsigned i = 0; i < DEMO_MAX_ACTIVE; ++i) {
        if (demo_voices[i].active) {
            uint8_t off[3] = {(uint8_t)(0x80U | groove_midi_input_channel(demo_voices[i].track)), demo_voices[i].note, 0U};
            (void)groove_midi_local(off, 3U);
            demo_voices[i].active = 0U;
        }
    }
    demo_active = 0U;
    demo_elapsed_s = 0U;
}

unsigned cfw_demo_playing(void) { return demo_active; }
unsigned cfw_demo_current(void) { return demo_song_id; }
const char *cfw_demo_name(unsigned id) { return id < CFW_DEMO_COUNT ? cfw_demo_songs[id].name : NULL; }
unsigned cfw_demo_elapsed_sec(void) { return demo_elapsed_s; }
unsigned cfw_demo_duration_sec(unsigned id) { return id < CFW_DEMO_COUNT ? cfw_demo_songs[id].duration_sec : 0U; }

/* ============================================================================
 * Sample Slicer Config Wrappers (bind via samples.c)
 * ============================================================================ */
void cfw_slicer_get(struct cfw_slicer_cfg *out)
{
    if (out) *out = slicer;
}

void cfw_slicer_edit(unsigned param, int delta)
{
    if (!delta) return;
    if (param == 0U) {
        slicer.slot = (uint8_t)clamp_i((int)slicer.slot + delta, 0, 7);
    } else if (param == 1U) {
        int order = slicer.slices == 2 ? 0 : slicer.slices == 4 ? 1 : 2;
        order = clamp_i(order + (delta > 0 ? 1 : -1), 0, 2);
        slicer.slices = (uint8_t)(order == 0 ? 2 : order == 1 ? 4 : 8);
    } else if (param == 2U) {
        int s = clamp_i((int)slicer.start_pct + delta * 5, 0, (int)slicer.end_pct - 10);
        slicer.start_pct = (uint8_t)s;
    } else if (param == 3U) {
        int e = clamp_i((int)slicer.end_pct + delta * 5, (int)slicer.start_pct + 10, 100);
        slicer.end_pct = (uint8_t)e;
    }
}

int cfw_slicer_apply(void)
{
    return groove_samples_bind_slices(slicer.slot, slicer.start_pct, slicer.end_pct, slicer.slices);
}

int cfw_slicer_gen_groove(unsigned track)
{
    if (track >= GROOVE_TRACKS) return -1;
    int r = cfw_slicer_apply();
    if (r) return r;
    unsigned count = slicer.slices ? slicer.slices : 8U;
    unsigned len = cfw_seq_length_get(track);
    unsigned is_drum = groove_pad_count(track) != 0 || cfw_dsp_engine_get(track) == CFW_ENG_TR909;
    for (unsigned s = 0; s < len; ++s) {
        if (!(s & 1U)) {
            unsigned slice = (s >> 1) % count;
            uint16_t dmask = is_drum ? (uint16_t)(1U << slice) : (uint16_t)(9U << 5);
            unsigned note = is_drum ? 0U : (36U + slice);
            cfw_seq_set_step(track, s, note, 110U, dmask);
        } else {
            cfw_seq_set_step(track, s, 0U, 0U, 0U);
        }
    }
    return 0;
}

int cfw_slicer_restore(void)
{
    return groove_samples_restore_bank();
}
