/* SPDX-License-Identifier: GPL-3.0-only WITH GPL-3.0-linking-exception */
#include "cfw_dsp.h"

#ifdef FM1_HOST_TEST
#include <stdatomic.h>
#define CFW_WORD _Atomic(unsigned)
#else
#define CFW_WORD volatile unsigned
#endif

/* ============================================================================
 * Fixed-point LUTs in internal SRAM (.volatile_ram.fm1) - Flash-write safe!
 * ============================================================================ */
/* Phase increments (2^32 * f / 44100) for MIDI notes 96..107 (C7..B7). */
static FM1_AUDIO_DATA const uint32_t oct7_inc[12] = {
    203893310U, 216017150U, 228861877U, 242470360U,
    256888022U, 272163002U, 288346251U, 305491780U,
    323656789U, 342901925U, 363291445U, 384893357U
};

/* Quarter-wave sine Q15 (0..pi/2, 65 entries: idx 0..64). */
static FM1_AUDIO_DATA const int16_t qsin_lut[65] = {
        0,   804,  1608,  2410,  3212,  4011,  4808,  5602,
     6393,  7179,  7962,  8739,  9512, 10278, 11039, 11793,
    12539, 13279, 14010, 14732, 15446, 16151, 16846, 17530,
    18204, 18868, 19519, 20159, 20787, 21403, 22005, 22594,
    23170, 23731, 24279, 24811, 25329, 25832, 26319, 26790,
    27245, 27683, 28105, 28510, 28898, 29268, 29621, 29956,
    30273, 30571, 30852, 31113, 31356, 31580, 31785, 31971,
    32137, 32285, 32412, 32521, 32609, 32678, 32728, 32757,
    32767
};

enum {
    VA_VOICES = 6,
    SID_VOICES = 4,
    DRUM909_VOICES = 6,
    GRAIN_VOICES = 4,
    RING_FRAMES = 4096,     /* 22050 Hz stereo ring => 185.7 ms (16384 B) */
    RING_MASK = RING_FRAMES - 1,
    MIDI_RING = 64
};

/* Per-track engine & parameter config (8 tracks) */
static uint8_t track_engine[8];
static uint8_t track_params[8][4];
static uint8_t active_ui_track;
static struct cfw_fx_state fx_cfg;

/* USB Live telemetry */
static volatile uint32_t usb_rx_last_block, usb_tx_last_block, block_counter;

/* Control -> Audio lock-free MIDI queue */
static struct {
    CFW_WORD read, write;
    uint32_t msg[MIDI_RING];
} midi_q __attribute__((aligned(32)));

/* Global DSP state */
static uint32_t rng_state = 0x12345679U;
static uint32_t dsp_tempo_bpm = 120U;

/* Shared stereo circular capture buffer at 22050 Hz (16 KiB) */
static int16_t ring_buf[RING_FRAMES * 2];
static uint32_t ring_write_idx;
static uint32_t ring_downsample_tog;
static uint32_t punch_read_q16;
static uint32_t punch_speed_q16 = 65536U;
static uint32_t punch_step_blocks;
static uint8_t punch_latched_mode;
static int32_t wash_hpf_l, wash_hpf_r, wash_lp_l, wash_lp_r;
static int32_t ring_peak_l, ring_peak_r;

/* Grit FX state */
static int32_t crush_hold_l, crush_hold_r;
static uint32_t crush_cnt;
static int32_t ap_l[4], ap_r[4], ap_fb_l, ap_fb_r;
static uint32_t phaser_phase;
static int32_t sc_env_q15; /* 0 = unity, 32768 = full duck */

/* Polyphonic VA voices */
struct va_voice {
    uint8_t active, held, track, note;
    uint32_t ph1, ph2, inc1, inc2, age;
    int32_t svf_lp, svf_bp;
    int32_t env_q15, fenv_q15;
    uint8_t stage; /* 0=off, 1=atk, 2=dec/sus, 3=rel */
    uint8_t vel;
};
static struct va_voice va_v[VA_VOICES];
static uint32_t va_age;

/* C64 SID voices */
struct sid_voice {
    uint8_t active, held, track, note;
    uint8_t vel, arp_idx, stage;
    uint32_t ph, ph_mod, inc, arp_tick, age;
    int32_t env_q15, lp;
};
static struct sid_voice sid_v[SID_VOICES];
static uint32_t sid_age;

/* TR-909 drum voices: 0=Kick, 1=Snare, 2=CH, 3=OH, 4=Clap, 5=Tom */
struct d909_voice {
    uint8_t active, type, track, vel;
    uint32_t ph, inc, pitch_env, env, age;
    int32_t lp, hp, prev;
};
static struct d909_voice d909_v[DRUM909_VOICES];

/* Granular Cloud voices */
struct grain_voice {
    uint8_t active, held, track, note;
    uint8_t vel, stage, rev;
    uint32_t pos_q12, win_q16, step_q12, age;
    int32_t env_q15, lp_l, lp_r;
};
static struct grain_voice grain_v[GRAIN_VOICES];
static uint32_t grain_age;

/* MIDI Learn bindings */
static uint8_t learn_armed;
static int16_t learn_cc[CFW_LEARN_TARGETS]; /* -1 unmapped, else (ch<<8)|cc */

/* ============================================================================
 * Audio Helpers (all FM1_AUDIO_CODE, zero libc)
 * ============================================================================ */
static FM1_AUDIO_CODE int32_t clip24(int64_t x)
{
    if (x > 8388607) return 8388607;
    if (x < -8388608) return -8388608;
    return (int32_t)x;
}

static FM1_AUDIO_CODE int32_t fast_sin_q15(uint32_t ph)
{
    uint32_t p = ph >> 24; /* 0..255 */
    uint32_t q = p >> 6;
    uint32_t idx = p & 63U;
    int32_t v;
    if (q == 0) v = qsin_lut[idx];
    else if (q == 1) v = qsin_lut[64U - idx];
    else if (q == 2) v = -qsin_lut[idx];
    else v = -qsin_lut[64U - idx];
    return v;
}

static FM1_AUDIO_CODE uint32_t midi_phase_inc(unsigned note)
{
    if (note > 127U) note = 127U;
    unsigned oct = note / 12U;     /* C-1=0 .. C7=8 .. G9=10 */
    unsigned semi = note % 12U;
    uint32_t base = oct7_inc[semi];
    if (oct < 8U) return base >> (8U - oct);
    if (oct > 8U) return base << (oct - 8U);
    return base;
}

static FM1_AUDIO_CODE uint32_t next_noise(void)
{
    uint32_t x = rng_state;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    rng_state = x;
    return x;
}

static FM1_AUDIO_CODE void audio_barrier(void)
{
#ifndef FM1_HOST_TEST
    __asm__ volatile("csync" ::: "memory");
#endif
}

/* ============================================================================
 * Engine Voice Allocators & Note Routing (FM1_AUDIO_CODE)
 * ============================================================================ */
static FM1_AUDIO_CODE void va_note_on(uint8_t track, uint8_t note, uint8_t vel)
{
    unsigned pick = 0;
    uint32_t best_age = 0xFFFFFFFFU;
    for (unsigned i = 0; i < VA_VOICES; ++i) {
        if (va_v[i].active && va_v[i].track == track && va_v[i].note == note) {
            pick = i; break;
        }
        if (!va_v[i].active) { pick = i; break; }
        uint32_t score = (va_v[i].stage == 3 ? 0U : 0x80000000U) | va_v[i].age;
        if (score < best_age) { best_age = score; pick = i; }
    }
    struct va_voice *v = &va_v[pick];
    uint32_t inc = midi_phase_inc(note);
    uint32_t det = (128U + (uint32_t)track_params[track][3] * 3U) * (inc >> 16);
    v->active = 1;
    v->held = 1;
    v->track = track;
    v->note = note;
    v->vel = vel ? vel : 96;
    v->inc1 = inc;
    v->inc2 = inc + det;
    if (v->stage == 0) {
        v->ph1 = 0;
        v->ph2 = 0x40000000U;
        v->svf_lp = 0;
        v->svf_bp = 0;
        v->env_q15 = 0;
    }
    v->fenv_q15 = 32767;
    v->stage = 1;
    v->age = ++va_age;
}

static FM1_AUDIO_CODE void sid_note_on(uint8_t track, uint8_t note, uint8_t vel)
{
    unsigned pick = 0;
    uint32_t best_age = 0xFFFFFFFFU;
    for (unsigned i = 0; i < SID_VOICES; ++i) {
        if (!sid_v[i].active || (sid_v[i].track == track && sid_v[i].note == note)) {
            pick = i; break;
        }
        if (sid_v[i].age < best_age) { best_age = sid_v[i].age; pick = i; }
    }
    struct sid_voice *v = &sid_v[pick];
    v->active = 1;
    v->held = 1;
    v->track = track;
    v->note = note;
    v->vel = vel ? vel : 100;
    v->inc = midi_phase_inc(note);
    if (v->stage == 0) {
        v->ph = 0;
        v->ph_mod = 0;
        v->lp = 0;
        v->env_q15 = 0;
    }
    v->arp_idx = 0;
    v->arp_tick = 0;
    v->stage = 1;
    v->age = ++sid_age;
}

static FM1_AUDIO_CODE void drum909_note_on(uint8_t track, uint8_t note, uint8_t vel)
{
    unsigned dtype;
    unsigned mod12 = note % 12U;
    if (note == 36 || note == 35 || mod12 == 0) dtype = 0;          /* Kick */
    else if (note == 38 || note == 40 || mod12 == 2) dtype = 1;     /* Snare */
    else if (note == 42 || note == 44 || mod12 == 6) dtype = 2;     /* CH */
    else if (note == 46 || note == 49 || note == 51 || mod12 == 10) dtype = 3; /* OH / Ride */
    else if (note == 39 || note == 37 || mod12 == 3) dtype = 4;     /* Clap / Rim */
    else dtype = 5;                                                 /* Tom */

    struct d909_voice *v = &d909_v[dtype];
    v->active = 1;
    v->type = (uint8_t)dtype;
    v->track = track;
    v->vel = vel ? vel : 110;
    v->ph = 0;
    v->age = 0;
    v->lp = v->hp = v->prev = 0;
    int tune_off = ((int)track_params[track][0] - 50) * 6;
    if (dtype == 0) {
        v->inc = midi_phase_inc((unsigned)(34 + (tune_off / 50)));
        v->pitch_env = 32767U;
        v->env = 32767U;
        cfw_dsp_sidechain_trigger((uint8_t)(((unsigned)v->vel * fx_cfg.sidechain) / 100U));
    } else if (dtype == 1) {
        v->inc = midi_phase_inc((unsigned)(54 + (tune_off / 40)));
        v->pitch_env = 32767U;
        v->env = 32767U;
    } else if (dtype == 2) {
        v->inc = midi_phase_inc(92);
        v->env = 32767U;
        /* Choke OH cleanly */
        if (d909_v[3].active) d909_v[3].env >>= 3;
    } else if (dtype == 3) {
        v->inc = midi_phase_inc(90);
        v->env = 32767U;
    } else if (dtype == 4) {
        v->inc = midi_phase_inc(68);
        v->env = 32767U;
    } else {
        v->inc = midi_phase_inc(note > 36 && note < 72 ? note : 48U);
        v->pitch_env = 32767U;
        v->env = 32767U;
    }
}

static FM1_AUDIO_CODE void grain_note_on(uint8_t track, uint8_t note, uint8_t vel)
{
    unsigned pick = 0;
    uint32_t best = 0xFFFFFFFFU;
    for (unsigned i = 0; i < GRAIN_VOICES; ++i) {
        if (!grain_v[i].active) { pick = i; break; }
        if (grain_v[i].age < best) { best = grain_v[i].age; pick = i; }
    }
    struct grain_voice *v = &grain_v[pick];
    uint32_t scatter = (uint32_t)track_params[track][3] * 18U;
    uint32_t offset = (ring_write_idx - 256U - (next_noise() % (scatter + 64U))) & RING_MASK;
    uint32_t pitch_q12 = (uint32_t)((((uint64_t)midi_phase_inc(note) << 12) / midi_phase_inc(60U)) >> 1);
    if (pitch_q12 < 512U) pitch_q12 = 512U;
    if (pitch_q12 > 16384U) pitch_q12 = 16384U;
    v->active = 1;
    v->held = 1;
    v->track = track;
    v->note = note;
    v->vel = vel ? vel : 100;
    v->rev = (track_params[track][3] > 60U) && (next_noise() & 1U);
    v->pos_q12 = offset << 12;
    v->win_q16 = 0;
    v->step_q12 = pitch_q12;
    v->env_q15 = 0;
    v->stage = 1;
    v->age = ++grain_age;
}

FM1_AUDIO_CODE void cfw_dsp_note_on(uint8_t track, uint8_t note, uint8_t vel)
{
    if (track >= 8U || note > 127U) return;
    /* Any note on track with kick note 36 can trigger sidechain if configured */
    if (note == 36U && fx_cfg.sidechain > 0 && track_engine[track] == CFW_ENG_STOCK) {
        cfw_dsp_sidechain_trigger((uint8_t)(((unsigned)(vel ? vel : 100U) * fx_cfg.sidechain) / 100U));
    }
    if (!vel) {
        cfw_dsp_note_off(track, note);
        return;
    }
    unsigned eng = track_engine[track];
    if (eng == CFW_ENG_VA_POLY) va_note_on(track, note, vel);
    else if (eng == CFW_ENG_TR909) drum909_note_on(track, note, vel);
    else if (eng == CFW_ENG_C64_SID) sid_note_on(track, note, vel);
    else if (eng == CFW_ENG_GRANULAR) grain_note_on(track, note, vel);
}

FM1_AUDIO_CODE void cfw_dsp_note_off(uint8_t track, uint8_t note)
{
    if (track >= 8U) return;
    for (unsigned i = 0; i < VA_VOICES; ++i)
        if (va_v[i].active && va_v[i].track == track && va_v[i].note == note) {
            va_v[i].held = 0;
            va_v[i].stage = 3;
        }
    for (unsigned i = 0; i < SID_VOICES; ++i)
        if (sid_v[i].active && sid_v[i].track == track && sid_v[i].note == note) {
            sid_v[i].held = 0;
            sid_v[i].stage = 3;
        }
    for (unsigned i = 0; i < GRAIN_VOICES; ++i)
        if (grain_v[i].active && grain_v[i].track == track && grain_v[i].note == note) {
            grain_v[i].held = 0;
            grain_v[i].stage = 3;
        }
}

FM1_AUDIO_CODE void cfw_dsp_all_notes_off(uint8_t track)
{
    for (unsigned i = 0; i < VA_VOICES; ++i)
        if (track >= 8U || va_v[i].track == track) { va_v[i].held = 0; va_v[i].stage = 3; }
    for (unsigned i = 0; i < SID_VOICES; ++i)
        if (track >= 8U || sid_v[i].track == track) { sid_v[i].held = 0; sid_v[i].stage = 3; }
    for (unsigned i = 0; i < GRAIN_VOICES; ++i)
        if (track >= 8U || grain_v[i].track == track) { grain_v[i].held = 0; grain_v[i].stage = 3; }
    if (track >= 8U) {
        for (unsigned i = 0; i < DRUM909_VOICES; ++i) d909_v[i].active = 0;
    }
}

FM1_AUDIO_CODE void cfw_dsp_sidechain_trigger(uint8_t strength)
{
    int32_t s = ((int32_t)strength * 32767) / 127;
    if (s > 32767) s = 32767;
    if (s > sc_env_q15) sc_env_q15 = s;
}

FM1_AUDIO_CODE void cfw_dsp_set_tempo_bpm(unsigned bpm)
{
    if (bpm >= 30U && bpm <= 300U) dsp_tempo_bpm = bpm;
}

/* ============================================================================
 * Per-Engine Renderers (FM1_AUDIO_CODE, 128-frame stereo Q23 additive)
 * ============================================================================ */
static FM1_AUDIO_CODE void drain_midi_queue(void)
{
    unsigned r = midi_q.read;
    while (r != midi_q.write) {
        audio_barrier();
        uint32_t ev = midi_q.msg[r & (MIDI_RING - 1U)];
        audio_barrier();
        r++;
        uint8_t st = (uint8_t)(ev & 0xffU);
        uint8_t d1 = (uint8_t)((ev >> 8) & 0x7fU);
        uint8_t d2 = (uint8_t)((ev >> 16) & 0x7fU);
        uint8_t mask = (uint8_t)((ev >> 24) & 0xffU);
        unsigned type = st & 0xf0U;
        if (st == 0xffU) {
            for (uint8_t t = 0; t < 8U; ++t)
                if (mask & (1U << t)) cfw_dsp_all_notes_off(t);
            continue;
        }
        for (uint8_t t = 0; t < 8U; ++t) {
            if (!(mask & (1U << t))) continue;
            if (type == 0x90U && d2 > 0) cfw_dsp_note_on(t, d1, d2);
            else if (type == 0x80U || (type == 0x90U && d2 == 0)) cfw_dsp_note_off(t, d1);
        }
    }
    midi_q.read = r;
}

static FM1_AUDIO_CODE void render_va(int32_t *out)
{
    for (unsigned i = 0; i < VA_VOICES; ++i) {
        struct va_voice *v = &va_v[i];
        if (!v->active) continue;
        unsigned t = v->track & 7U;
        if (track_engine[t] != CFW_ENG_VA_POLY) { v->held = 0; v->stage = 3; }
        int32_t cut_param = (int32_t)track_params[t][0];
        int32_t res_param = (int32_t)track_params[t][1];
        int32_t rel_step = 40 - ((int32_t)track_params[t][2] * 34) / 100;
        if (rel_step < 4) rel_step = 4;
        int32_t damp_q10 = 1024 - (res_param * 820) / 100; /* 1024..204 */
        int32_t morph = (int32_t)track_params[t][3];
        int32_t gain_q15 = ((int32_t)v->vel * 16000) / 127;

        for (unsigned n = 0; n < FM1_BLOCK_FRAMES; ++n) {
            if (v->stage == 1) {
                v->env_q15 += 1800;
                if (v->env_q15 >= 32767) { v->env_q15 = 32767; v->stage = 2; }
            } else if (v->stage == 2) {
                int32_t sus = 16000 + morph * 120;
                if (v->env_q15 > sus) v->env_q15 -= 18;
            } else {
                v->env_q15 -= rel_step;
                if (v->env_q15 <= 0) { v->env_q15 = 0; v->active = 0; v->stage = 0; break; }
            }
            if (v->fenv_q15 > 4096) v->fenv_q15 -= 16 + ((100 - (int32_t)track_params[t][2]) >> 2);

            v->ph1 += v->inc1;
            v->ph2 += v->inc2;
            /* Dual oscillator: saw + pulse/sub blend in Q15 (-32768..+32767) */
            int32_t saw1 = (int32_t)(v->ph1 >> 16) - 32768;
            uint32_t pw = 0x80000000U - ((uint32_t)morph << 23);
            int32_t sqr2 = (v->ph2 > pw) ? 24000 : -24000;
            int32_t osc = (saw1 + ((sqr2 * (40 + morph)) >> 7)) >> 1;

            /* Chamberlin 2-pole SVF (Q10 f = 60..760 stable < 1.0) */
            int32_t f_q10 = 55 + ((cut_param * 460) / 100) + ((v->fenv_q15 * 240) >> 15);
            if (f_q10 > 740) f_q10 = 740;
            int32_t hp = osc - v->svf_lp - ((v->svf_bp * damp_q10) >> 10);
            v->svf_bp += (hp * f_q10) >> 10;
            v->svf_lp += (v->svf_bp * f_q10) >> 10;
            /* Soft limit SVF state */
            if (v->svf_bp > 65535) v->svf_bp = 65535;
            if (v->svf_bp < -65535) v->svf_bp = -65535;

            int32_t s = ((v->svf_lp * v->env_q15) >> 15);
            s = (s * gain_q15) >> 9; /* -> Q23 scale (~2M FS) */
            out[n * 2]     += s;
            out[n * 2 + 1] += s;
        }
    }
}

static FM1_AUDIO_CODE void render_909(int32_t *out)
{
    for (unsigned i = 0; i < DRUM909_VOICES; ++i) {
        struct d909_voice *v = &d909_v[i];
        if (!v->active) continue;
        unsigned t = v->track & 7U;
        if (track_engine[t] != CFW_ENG_TR909) { v->active = 0; continue; }
        int32_t punch = (int32_t)track_params[t][0];
        int32_t snap  = (int32_t)track_params[t][1];
        int32_t decay = (int32_t)track_params[t][2];
        int32_t drive = (int32_t)track_params[t][3];
        int32_t gain = ((int32_t)v->vel * 32000) / 127;

        for (unsigned n = 0; n < FM1_BLOCK_FRAMES; ++n) {
            int32_t s = 0;
            v->age++;
            if (v->type == 0) {
                /* 909 Kick: rapid exponential pitch sweep + thumpy sine + transient click */
                v->pitch_env = (v->pitch_env * 32610U) >> 15;
                v->env = (v->env * (32710U + (uint32_t)(decay >> 2))) >> 15;
                if (v->env < 12U) { v->active = 0; break; }
                uint32_t cur_inc = v->inc + ((v->inc >> 4) * ((v->pitch_env * (uint32_t)(48 + punch)) >> 11));
                v->ph += cur_inc;
                int32_t body = fast_sin_q15(v->ph);
                int32_t click = v->age < 90U ? ((int32_t)((next_noise() >> 16) - 32768U) * (int32_t)(90U - v->age)) >> 7 : 0;
                s = ((body + (click * (32 + snap)) / 100) * (int32_t)v->env) >> 15;
                s += (s * drive) >> 7;
                if (s > 32767) s = 32767;
                if (s < -32768) s = -32768;
            } else if (v->type == 1) {
                /* 909 Snare: dual triangle body + HPF crisp noise */
                v->pitch_env = (v->pitch_env * 32400U) >> 15;
                v->env = (v->env * (32630U + (uint32_t)(decay >> 1))) >> 15;
                if (v->env < 12U) { v->active = 0; break; }
                v->ph += v->inc + ((v->inc >> 6) * (v->pitch_env >> 10));
                int32_t p = (int32_t)(v->ph >> 17);
                int32_t tri = (p < 16384 ? p * 2 : (32767 - p) * 2) - 16384;
                int32_t nz = (int32_t)(next_noise() >> 16) - 32768;
                v->hp = nz - v->prev + ((v->hp * 26000) >> 15);
                v->prev = nz;
                int32_t npart = (v->hp * (45 + snap)) / 100;
                s = (((tri >> 1) + npart) * (int32_t)v->env) >> 15;
            } else if (v->type == 2 || v->type == 3) {
                /* 909 CH / OH: 6 inharmonic metallic oscillators + HPF */
                uint32_t mul = (v->type == 2) ? (32200U + (uint32_t)decay * 3U) : (32680U + (uint32_t)(decay >> 1));
                v->env = (v->env * mul) >> 15;
                if (v->env < 14U) { v->active = 0; break; }
                v->ph += v->inc;
                uint32_t x = v->ph;
                int32_t metal = (((x >> 31) & 1U) ^ ((x >> 27) & 1U) ^ ((x >> 23) & 1U) ^ ((x >> 19) & 1U)) ? 18000 : -18000;
                int32_t nz = ((int32_t)(next_noise() >> 17) - 16384);
                int32_t mix = (metal + nz) >> 1;
                v->hp = mix - v->prev + ((v->hp * 29000) >> 15);
                v->prev = mix;
                s = (v->hp * (int32_t)v->env) >> 15;
            } else if (v->type == 4) {
                /* 909 Clap: 3 micro bursts (every ~420 samples = ~9.5ms) + tail */
                v->env = (v->env * (32600U + (uint32_t)decay)) >> 15;
                if (v->env < 14U) { v->active = 0; break; }
                int32_t nz = (int32_t)(next_noise() >> 16) - 32768;
                v->lp += ((nz - v->lp) * 9000) >> 15;
                int32_t bpf = v->lp - ((v->prev * 24000) >> 15);
                v->prev = v->lp;
                int32_t gate = 32767;
                if (v->age < 1300U) {
                    unsigned mod = v->age % 430U;
                    gate = (mod < 210U) ? 32767 : 8000;
                }
                s = (((bpf * gate) >> 15) * (int32_t)v->env) >> 15;
            } else {
                /* 909 Tom */
                v->pitch_env = (v->pitch_env * 32640U) >> 15;
                v->env = (v->env * (32660U + (uint32_t)decay)) >> 15;
                if (v->env < 14U) { v->active = 0; break; }
                v->ph += v->inc + ((v->inc >> 5) * (v->pitch_env >> 11));
                s = (fast_sin_q15(v->ph) * (int32_t)v->env) >> 15;
            }
            int32_t out_q23 = (s * gain) >> 8;
            out[n * 2]     += out_q23;
            out[n * 2 + 1] += out_q23;
        }
    }
}

static FM1_AUDIO_CODE void render_sid(int32_t *out)
{
    static FM1_AUDIO_DATA const uint8_t sid_arp_ofs[3] = {0, 4, 7};
    for (unsigned i = 0; i < SID_VOICES; ++i) {
        struct sid_voice *v = &sid_v[i];
        if (!v->active) continue;
        unsigned t = v->track & 7U;
        if (track_engine[t] != CFW_ENG_C64_SID) { v->held = 0; v->stage = 3; }
        int32_t pw_param = (int32_t)track_params[t][0];
        int32_t arp_on   = track_params[t][3] > 20U;
        int32_t ring_on  = track_params[t][3] > 55U;
        int32_t rel_step = 48 - ((int32_t)track_params[t][2] * 40) / 100;
        if (rel_step < 5) rel_step = 5;
        int32_t f_q12 = 600 + ((int32_t)track_params[t][1] * 28);
        int32_t gain_q15 = ((int32_t)v->vel * 16500) / 127;
        uint32_t pw = 0x20000000U + ((uint32_t)pw_param * 0x01400000U);

        for (unsigned n = 0; n < FM1_BLOCK_FRAMES; ++n) {
            if (v->stage == 1) {
                v->env_q15 += 2400;
                if (v->env_q15 >= 32767) { v->env_q15 = 32767; v->stage = 2; }
            } else if (v->stage == 2) {
                if (v->env_q15 > 20000) v->env_q15 -= 16;
            } else {
                v->env_q15 -= rel_step;
                if (v->env_q15 <= 0) { v->env_q15 = 0; v->active = 0; v->stage = 0; break; }
            }
            if (arp_on && ++v->arp_tick >= 882U) { /* 50 Hz PAL frame arp tick */
                v->arp_tick = 0;
                v->arp_idx = (uint8_t)((v->arp_idx + 1U) % 3U);
                v->inc = midi_phase_inc((unsigned)v->note + sid_arp_ofs[v->arp_idx]);
            }
            v->ph += v->inc;
            v->ph_mod += (v->inc >> 1) + (v->inc >> 3);
            int32_t wave = (v->ph < pw) ? 28000 : -28000;
            if (ring_on && (v->ph_mod & 0x80000000U)) wave = -wave;
            v->lp += ((wave - v->lp) * f_q12) >> 12;
            int32_t s = ((v->lp * v->env_q15) >> 15);
            s = (s * gain_q15) >> 9;
            out[n * 2]     += s;
            out[n * 2 + 1] += s;
        }
    }
}

static FM1_AUDIO_CODE void render_granular(int32_t *out)
{
    int32_t has_audio = (ring_peak_l + ring_peak_r) > 300;
    for (unsigned i = 0; i < GRAIN_VOICES; ++i) {
        struct grain_voice *v = &grain_v[i];
        if (!v->active) continue;
        unsigned t = v->track & 7U;
        if (track_engine[t] != CFW_ENG_GRANULAR) { v->held = 0; v->stage = 3; }
        int32_t brt = 800 + (int32_t)track_params[t][0] * 30;
        int32_t density_step = 48 + ((int32_t)(100 - track_params[t][2]) * 2);
        int32_t gain_q15 = ((int32_t)v->vel * 19000) / 127;

        for (unsigned n = 0; n < FM1_BLOCK_FRAMES; ++n) {
            if (v->stage == 1) {
                v->env_q15 += 1200;
                if (v->env_q15 >= 32767) { v->env_q15 = 32767; v->stage = 2; }
            } else if (v->stage == 3) {
                v->env_q15 -= 16;
                if (v->env_q15 <= 0) { v->env_q15 = 0; v->active = 0; v->stage = 0; break; }
            }
            v->win_q16 += (uint32_t)density_step;
            if (v->win_q16 >= 65536U) {
                v->win_q16 -= 65536U;
                uint32_t scatter = (uint32_t)track_params[t][3] * 18U + 64U;
                v->pos_q12 = ((ring_write_idx - 256U - (next_noise() % scatter)) & RING_MASK) << 12;
            }
            /* Smooth Hann-like triangle*sin window 0..32767 */
            uint32_t widx = (v->win_q16 >> 8) & 255U;
            uint32_t tri = widx < 128U ? (widx << 8) : ((255U - widx) << 8);
            int32_t gl, gr;
            if (has_audio) {
                uint32_t idx = (v->pos_q12 >> 12) & RING_MASK;
                uint32_t idx2 = (idx + 1U) & RING_MASK;
                uint32_t frac = v->pos_q12 & 4095U;
                int32_t l0 = ring_buf[idx * 2], l1 = ring_buf[idx2 * 2];
                int32_t r0 = ring_buf[idx * 2 + 1], r1 = ring_buf[idx2 * 2 + 1];
                gl = l0 + (((l1 - l0) * (int32_t)frac) >> 12);
                gr = r0 + (((r1 - r0) * (int32_t)frac) >> 12);
                if (v->rev) v->pos_q12 -= v->step_q12;
                else v->pos_q12 += v->step_q12;
            } else {
                /* Self-generating harmonic pad grain when input ring is silent */
                v->pos_q12 += (v->step_q12 << 4);
                gl = fast_sin_q15(v->pos_q12 << 16) >> 1;
                gr = fast_sin_q15((v->pos_q12 << 16) + 0x40000000U) >> 1;
            }
            gl = (gl * (int32_t)tri) >> 15;
            gr = (gr * (int32_t)tri) >> 15;
            v->lp_l += ((gl - v->lp_l) * brt) >> 12;
            v->lp_r += ((gr - v->lp_r) * brt) >> 12;

            int32_t out_l = (((v->lp_l * v->env_q15) >> 15) * gain_q15) >> 8;
            int32_t out_r = (((v->lp_r * v->env_q15) >> 15) * gain_q15) >> 8;
            out[n * 2]     += out_l;
            out[n * 2 + 1] += out_r;
        }
    }
}

/* ============================================================================
 * Main Audio Post-Mix Hook (called inside FM1_AUDIO_CODE fm1_output_mix)
 * ============================================================================ */
FM1_AUDIO_CODE void cfw_dsp_process(int32_t *output, unsigned master_gain_q7)
{
    (void)master_gain_q7;
    if (!output) return;
    ++block_counter;
    drain_midi_queue();

    /* 1. Render active CFW synth engines & drums additively into output Q23 block */
    render_va(output);
    render_909(output);
    render_sid(output);
    render_granular(output);

    /* 2. Feed stereo circular ring capture buffer at 22050 Hz (16-bit Q15 scaled from Q23) */
    ring_peak_l = (ring_peak_l * 7) >> 3;
    ring_peak_r = (ring_peak_r * 7) >> 3;
    for (unsigned n = 0; n < FM1_BLOCK_FRAMES; ++n) {
        if ((n & 1U) == (ring_downsample_tog & 1U)) {
            int32_t sl = output[n * 2] >> 8;
            int32_t sr = output[n * 2 + 1] >> 8;
            if (sl > 32767) sl = 32767; else if (sl < -32768) sl = -32768;
            if (sr > 32767) sr = 32767; else if (sr < -32768) sr = -32768;
            ring_buf[ring_write_idx * 2]     = (int16_t)sl;
            ring_buf[ring_write_idx * 2 + 1] = (int16_t)sr;
            int32_t al = sl < 0 ? -sl : sl;
            int32_t ar = sr < 0 ? -sr : sr;
            if (al > ring_peak_l) ring_peak_l = al;
            if (ar > ring_peak_r) ring_peak_r = ar;
            ring_write_idx = (ring_write_idx + 1U) & RING_MASK;
        }
    }
    ring_downsample_tog ^= 1U;

    /* 3. Apply Punch-In Performance FX over the buffer if engaged */
    unsigned punch = fx_cfg.punch_fx;
    if (punch != punch_latched_mode) {
        punch_latched_mode = (uint8_t)punch;
        punch_step_blocks = 0;
        if (punch == CFW_PUNCH_STUTTER) {
            /* Capture 1/16 note (~2756 frames @ 22.05k at 120BPM, capped to RING_FRAMES/2) */
            uint32_t win = (22050U * 15U) / (dsp_tempo_bpm ? dsp_tempo_bpm : 120U);
            if (win > 2048U) win = 2048U;
            if (win < 256U) win = 256U;
            punch_read_q16 = ((ring_write_idx - win) & RING_MASK) << 16;
            punch_speed_q16 = 32768U; /* 1:1 @ 44.1->22.05k */
        } else if (punch == CFW_PUNCH_TAPE_STOP) {
            punch_read_q16 = ((ring_write_idx - 128U) & RING_MASK) << 16;
            punch_speed_q16 = 32768U;
        } else if (punch == CFW_PUNCH_HALF_TIME) {
            punch_read_q16 = ((ring_write_idx - 1024U) & RING_MASK) << 16;
            punch_speed_q16 = 16384U; /* half speed! */
        } else if (punch == CFW_PUNCH_BIT_SCATTER) {
            punch_read_q16 = ((ring_write_idx - 512U) & RING_MASK) << 16;
            punch_speed_q16 = 32768U;
        }
    }

    if (punch == CFW_PUNCH_STUTTER || punch == CFW_PUNCH_HALF_TIME || punch == CFW_PUNCH_BIT_SCATTER) {
        uint32_t win = (22050U * 15U) / (dsp_tempo_bpm ? dsp_tempo_bpm : 120U);
        if (punch == CFW_PUNCH_BIT_SCATTER) win >>= 1;
        if (win > 2048U) win = 2048U;
        if (win < 256U) win = 256U;
        uint32_t loop_start = (ring_write_idx - win) & RING_MASK;
        for (unsigned n = 0; n < FM1_BLOCK_FRAMES; ++n) {
            uint32_t ofs = ((punch_read_q16 >> 16) % win);
            if (punch == CFW_PUNCH_BIT_SCATTER && ((n >> 5) & 1U)) ofs = win - 1U - ofs;
            uint32_t idx = (loop_start + ofs) & RING_MASK;
            int32_t l = ((int32_t)ring_buf[idx * 2]) << 8;
            int32_t r = ((int32_t)ring_buf[idx * 2 + 1]) << 8;
            if (punch == CFW_PUNCH_BIT_SCATTER) {
                l = (l >> 14) << 14;
                r = (r >> 14) << 14;
            }
            output[n * 2] = l;
            output[n * 2 + 1] = r;
            punch_read_q16 += punch_speed_q16;
        }
    } else if (punch == CFW_PUNCH_TAPE_STOP) {
        for (unsigned n = 0; n < FM1_BLOCK_FRAMES; ++n) {
            if (punch_speed_q16 > 90U) punch_speed_q16 -= 3U;
            else punch_speed_q16 = 0;
            uint32_t idx = (punch_read_q16 >> 16) & RING_MASK;
            int32_t l = ((int32_t)ring_buf[idx * 2]) << 8;
            int32_t r = ((int32_t)ring_buf[idx * 2 + 1]) << 8;
            int32_t fade = (int32_t)(punch_speed_q16 >> 8); /* 128..0 */
            output[n * 2]     = (int32_t)(((int64_t)l * fade) >> 7);
            output[n * 2 + 1] = (int32_t)(((int64_t)r * fade) >> 7);
            punch_read_q16 += punch_speed_q16;
        }
    } else if (punch == CFW_PUNCH_WASH_HPF) {
        for (unsigned n = 0; n < FM1_BLOCK_FRAMES; ++n) {
            int32_t l = output[n * 2], r = output[n * 2 + 1];
            wash_lp_l += (l - wash_lp_l) >> 3;
            wash_lp_r += (r - wash_lp_r) >> 3;
            wash_hpf_l = l - wash_lp_l;
            wash_hpf_r = r - wash_lp_r;
            uint32_t tap = (ring_write_idx - 1024U) & RING_MASK;
            output[n * 2]     = clip24((int64_t)wash_hpf_l + (((int64_t)ring_buf[tap * 2]) << 7));
            output[n * 2 + 1] = clip24((int64_t)wash_hpf_r + (((int64_t)ring_buf[tap * 2 + 1]) << 7));
        }
    }

    /* 4. Apply Master Grit FX: Sidechain -> Overdrive -> Bitcrush -> 4-stage Phaser */
    unsigned do_sc     = fx_cfg.sidechain > 0;
    unsigned do_drive  = fx_cfg.drive > 0;
    unsigned do_crush  = fx_cfg.crush > 0;
    unsigned do_phaser = fx_cfg.phaser > 0;

    if (!do_sc && !do_drive && !do_crush && !do_phaser) return;

    uint32_t hold_period = do_crush ? (1U + ((uint32_t)fx_cfg.crush >> 3)) : 1U;
    uint32_t bit_shift   = do_crush ? (10U + (((uint32_t)fx_cfg.crush * 9U) / 100U)) : 0U;
    int32_t drive_gain_q8 = 256 + ((int32_t)fx_cfg.drive * 640) / 100; /* 1.0x .. 3.5x */
    int32_t ph_wet_q8 = ((int32_t)fx_cfg.phaser * 200) / 100;

    for (unsigned n = 0; n < FM1_BLOCK_FRAMES; ++n) {
        int32_t l = output[n * 2];
        int32_t r = output[n * 2 + 1];

        /* Sidechain envelope follower & duck (~180 ms recovery) */
        if (sc_env_q15 > 0) {
            if (do_sc) {
                int32_t gain_q15 = 32767 - sc_env_q15;
                l = (int32_t)(((int64_t)l * gain_q15) >> 15);
                r = (int32_t)(((int64_t)r * gain_q15) >> 15);
            }
            sc_env_q15 -= 6;
            if (sc_env_q15 < 0) sc_env_q15 = 0;
        }

        /* Overdrive asymmetric Q23 soft-clipper */
        if (do_drive) {
            int64_t dl = ((int64_t)l * drive_gain_q8) >> 8;
            int64_t dr = ((int64_t)r * drive_gain_q8) >> 8;
            /* Cubic soft clipper in normalized Q15 units (8388608 -> 256 in >>15) */
            int32_t xl = (int32_t)(dl >> 8);
            int32_t xr = (int32_t)(dr >> 8);
            if (xl > 32767) xl = 32767; else if (xl < -32768) xl = -32768;
            if (xr > 32767) xr = 32767; else if (xr < -32768) xr = -32768;
            int32_t x2l = (xl * xl) >> 15;
            int32_t x2r = (xr * xr) >> 15;
            int32_t sl = xl - ((xl * x2l) >> 17);
            int32_t sr = xr - ((xr * x2r) >> 17);
            l = sl << 8;
            r = sr << 8;
        }

        /* Bitcrusher + Sample Rate Hold */
        if (do_crush) {
            if (++crush_cnt >= hold_period) {
                crush_cnt = 0;
                crush_hold_l = (l >> bit_shift) << bit_shift;
                crush_hold_r = (r >> bit_shift) << bit_shift;
            }
            l = crush_hold_l;
            r = crush_hold_r;
        }

        /* 4-stage cascaded first-order Allpass Phaser */
        if (do_phaser) {
            phaser_phase += 34000U; /* ~0.35 Hz LFO sweep */
            int32_t lfo = fast_sin_q15(phaser_phase); /* -32767..+32767 */
            int32_t coeff_q14 = 6000 + ((lfo * 5200) >> 15); /* ~0.05..0.68 */

            int32_t xl = l + ((ap_fb_l * 3) >> 3);
            int32_t xr = r + ((ap_fb_r * 3) >> 3);
            for (unsigned st = 0; st < 4; ++st) {
                int32_t yl = ((int64_t)-coeff_q14 * xl >> 14) + ap_l[st];
                ap_l[st] = xl + (int32_t)(((int64_t)coeff_q14 * yl) >> 14);
                xl = yl;
                int32_t yr = ((int64_t)-coeff_q14 * xr >> 14) + ap_r[st];
                ap_r[st] = xr + (int32_t)(((int64_t)coeff_q14 * yr) >> 14);
                xr = yr;
            }
            ap_fb_l = clip24(xl >> 1);
            ap_fb_r = clip24(xr >> 1);
            l = clip24((int64_t)l + (((int64_t)xl * ph_wet_q8) >> 8));
            r = clip24((int64_t)r + (((int64_t)xr * ph_wet_q8) >> 8));
        }

        output[n * 2]     = clip24(l);
        output[n * 2 + 1] = clip24(r);
    }
}

/* ============================================================================
 * Control API (safe from screen / control task)
 * ============================================================================ */
void cfw_dsp_active_track_set(unsigned track) { if (track < 8U) active_ui_track = (uint8_t)track; }
unsigned cfw_dsp_active_track_get(void) { return active_ui_track; }

void cfw_dsp_init(void)
{
    for (unsigned t = 0; t < 8U; ++t) {
        track_engine[t] = CFW_ENG_STOCK;
        track_params[t][0] = 68;
        track_params[t][1] = 35;
        track_params[t][2] = 52;
        track_params[t][3] = 40;
    }
    fx_cfg.drive = 0;
    fx_cfg.crush = 0;
    fx_cfg.phaser = 0;
    fx_cfg.sidechain = 0;
    fx_cfg.punch_fx = CFW_PUNCH_OFF;
    fx_cfg.fill_held = 0;
    fx_cfg.usb_mon_gain = 100;
    fx_cfg.usb_rec_mute = 0;
    for (unsigned i = 0; i < CFW_LEARN_TARGETS; ++i) learn_cc[i] = -1;
    learn_armed = CFW_LEARN_NONE;
    cfw_dsp_reset();
}

void cfw_dsp_reset(void)
{
    for (unsigned i = 0; i < VA_VOICES; ++i) va_v[i].active = va_v[i].stage = 0;
    for (unsigned i = 0; i < SID_VOICES; ++i) sid_v[i].active = sid_v[i].stage = 0;
    for (unsigned i = 0; i < DRUM909_VOICES; ++i) d909_v[i].active = 0;
    for (unsigned i = 0; i < GRAIN_VOICES; ++i) grain_v[i].active = grain_v[i].stage = 0;
    for (unsigned i = 0; i < 4; ++i) ap_l[i] = ap_r[i] = 0;
    ap_fb_l = ap_fb_r = sc_env_q15 = crush_hold_l = crush_hold_r = 0;
    wash_hpf_l = wash_hpf_r = wash_lp_l = wash_lp_r = 0;
    midi_q.read = midi_q.write = 0;
}

unsigned cfw_dsp_engine_get(unsigned track)
{
    return track < 8U ? track_engine[track] : CFW_ENG_STOCK;
}

void cfw_dsp_engine_set(unsigned track, unsigned engine)
{
    if (track >= 8U || engine >= CFW_ENG_COUNT) return;
    track_engine[track] = (uint8_t)engine;
}

const char *cfw_dsp_engine_name(unsigned engine)
{
    static const char *const names[CFW_ENG_COUNT] = {
        "STOCK ENGINE", "VA POLY SYNTH", "TR-909 DRUMS", "C64 SID CHIP", "GRANULAR CLD"
    };
    return engine < CFW_ENG_COUNT ? names[engine] : "STOCK ENGINE";
}

unsigned cfw_dsp_param_get(unsigned track, unsigned idx)
{
    return (track < 8U && idx < 4U) ? track_params[track][idx] : 0U;
}

void cfw_dsp_param_set(unsigned track, unsigned idx, unsigned value)
{
    if (track >= 8U || idx >= 4U) return;
    if (value > 100U) value = 100U;
    track_params[track][idx] = (uint8_t)value;
}

void cfw_dsp_param_edit(unsigned track, unsigned idx, int delta)
{
    if (track >= 8U || idx >= 4U || !delta) return;
    int v = (int)track_params[track][idx] + delta;
    if (v < 0) v = 0;
    if (v > 100) v = 100;
    track_params[track][idx] = (uint8_t)v;
}

const char *cfw_dsp_param_label(unsigned engine, unsigned idx)
{
    static const char *const va_l[4]   = {"CUTOFF", "RESO", "DECAY", "MORPH"};
    static const char *const d909_l[4] = {"TUNE", "SNAP", "DECAY", "DRIVE"};
    static const char *const sid_l[4]  = {"PULSE W", "FILTER", "DECAY", "ARP/RNG"};
    static const char *const gr_l[4]   = {"BRIGHT", "DENS", "SIZE", "SCATTER"};
    if (idx >= 4U) return "";
    if (engine == CFW_ENG_TR909) return d909_l[idx];
    if (engine == CFW_ENG_C64_SID) return sid_l[idx];
    if (engine == CFW_ENG_GRANULAR) return gr_l[idx];
    return va_l[idx];
}

FM1_AUDIO_CODE void cfw_dsp_fx_get(struct cfw_fx_state *out)
{
    if (out) *out = fx_cfg;
}

void cfw_dsp_fx_set(const struct cfw_fx_state *in)
{
    if (in) fx_cfg = *in;
}

static uint8_t clamp_u8(int v, int lo, int hi)
{
    return (uint8_t)(v < lo ? lo : v > hi ? hi : v);
}

void cfw_dsp_fx_edit(unsigned param, int delta)
{
    if (!delta) return;
    switch (param) {
    case 0: fx_cfg.drive = clamp_u8((int)fx_cfg.drive + delta * 3, 0, 100); break;
    case 1: fx_cfg.crush = clamp_u8((int)fx_cfg.crush + delta * 3, 0, 100); break;
    case 2: fx_cfg.phaser = clamp_u8((int)fx_cfg.phaser + delta * 3, 0, 100); break;
    case 3: fx_cfg.sidechain = clamp_u8((int)fx_cfg.sidechain + delta * 4, 0, 100); break;
    case 4: fx_cfg.punch_fx = clamp_u8((int)fx_cfg.punch_fx + (delta > 0 ? 1 : -1), 0, CFW_PUNCH_COUNT - 1); break;
    case 5: fx_cfg.fill_held = delta > 0 ? 1U : 0U; break;
    case 6: fx_cfg.usb_mon_gain = clamp_u8((int)fx_cfg.usb_mon_gain + delta * 4, 0, 100); break;
    case 7: fx_cfg.usb_rec_mute = delta > 0 ? 1U : 0U; break;
    default: break;
    }
}

const char *cfw_dsp_punch_name(unsigned mode)
{
    static const char *const names[CFW_PUNCH_COUNT] = {
        "OFF", "STUT", "TAPE", "WASH", "HALF", "SCAT"
    };
    return mode < CFW_PUNCH_COUNT ? names[mode] : "OFF";
}

FM1_AUDIO_CODE void cfw_dsp_usb_telemetry(int usb_frames, int usb_written)
{
    uint32_t bc = block_counter ? block_counter : 1U;
    if (usb_frames > 0) usb_rx_last_block = bc;
    if (usb_written > 0) usb_tx_last_block = bc;
}

unsigned cfw_dsp_usb_rx_active(void)
{
    return usb_rx_last_block && (block_counter - usb_rx_last_block) < 40U;
}

unsigned cfw_dsp_usb_tx_active(void)
{
    return usb_tx_last_block && (block_counter - usb_tx_last_block) < 40U;
}

void cfw_dsp_post_midi(unsigned track_mask, uint8_t status, uint8_t d1, uint8_t d2)
{
    unsigned w = midi_q.write;
    if (w - midi_q.read >= MIDI_RING) return;
    midi_q.msg[w & (MIDI_RING - 1U)] =
        (uint32_t)status | ((uint32_t)d1 << 8) | ((uint32_t)d2 << 16) | ((uint32_t)track_mask << 24);
    audio_barrier();
    midi_q.write = w + 1U;
}

/* ============================================================================
 * MIDI Learn Engine
 * ============================================================================ */
void cfw_learn_arm(unsigned target)
{
    learn_armed = (target < CFW_LEARN_TARGETS) ? (uint8_t)target : CFW_LEARN_NONE;
}

unsigned cfw_learn_armed_target(void) { return learn_armed; }

int cfw_learn_get_cc(unsigned target)
{
    return target < CFW_LEARN_TARGETS ? learn_cc[target] : -1;
}

void cfw_learn_clear(unsigned target)
{
    if (target < CFW_LEARN_TARGETS) learn_cc[target] = -1;
}

const char *cfw_learn_target_name(unsigned target)
{
    static const char *const names[CFW_LEARN_TARGETS] = {
        "NONE", "CUTOFF", "RESO", "DECAY", "MORPH",
        "DRIVE", "CRUSH", "PHASER", "SIDECHN", "PUNCH FX", "FILL", "USB MON"
    };
    return target < CFW_LEARN_TARGETS ? names[target] : "NONE";
}

static void apply_learned_cc(unsigned track_active, unsigned target, uint8_t val)
{
    unsigned pct = ((unsigned)val * 100U + 63U) / 127U;
    switch (target) {
    case CFW_LEARN_CUTOFF: case CFW_LEARN_RESO: case CFW_LEARN_DECAY: case CFW_LEARN_MORPH:
        cfw_dsp_param_set(track_active, target - CFW_LEARN_CUTOFF, pct); break;
    case CFW_LEARN_DRIVE:    fx_cfg.drive = (uint8_t)pct; break;
    case CFW_LEARN_CRUSH:    fx_cfg.crush = (uint8_t)pct; break;
    case CFW_LEARN_PHASER:   fx_cfg.phaser = (uint8_t)pct; break;
    case CFW_LEARN_SIDECHAIN:fx_cfg.sidechain = (uint8_t)pct; break;
    case CFW_LEARN_PUNCH_FX: fx_cfg.punch_fx = (uint8_t)((val * CFW_PUNCH_COUNT) >> 7); break;
    case CFW_LEARN_FILL:     fx_cfg.fill_held = val >= 64 ? 1U : 0U; break;
    case CFW_LEARN_USB_MON:  fx_cfg.usb_mon_gain = (uint8_t)pct; break;
    default: break;
    }
}

void cfw_learn_on_cc(unsigned track_active, uint8_t ch, uint8_t cc, uint8_t val)
{
    int16_t sig = (int16_t)(((unsigned)ch << 8) | cc);
    if (learn_armed != CFW_LEARN_NONE) {
        learn_cc[learn_armed] = sig;
        learn_armed = CFW_LEARN_NONE;
    }
    for (unsigned t = 1; t < CFW_LEARN_TARGETS; ++t) {
        if (learn_cc[t] == sig) apply_learned_cc(track_active, t, val);
    }
    /* Built-in hardware performance CC quick map (CC 80..85) */
    if (cc == 80U) fx_cfg.drive = (uint8_t)(((unsigned)val * 100U) / 127U);
    else if (cc == 81U) fx_cfg.crush = (uint8_t)(((unsigned)val * 100U) / 127U);
    else if (cc == 82U) fx_cfg.phaser = (uint8_t)(((unsigned)val * 100U) / 127U);
    else if (cc == 83U) fx_cfg.sidechain = (uint8_t)(((unsigned)val * 100U) / 127U);
    else if (cc == 84U) fx_cfg.punch_fx = (uint8_t)((val * CFW_PUNCH_COUNT) >> 7);
    else if (cc == 85U) fx_cfg.fill_held = val >= 64U ? 1U : 0U;
}
