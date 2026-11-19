/* Host-side Firmware Demo Audition Renderer:
 * Drives the ACTUAL app/cfw_seq.c + app/cfw_demo_songs.h + app/presets.c
 * playback engine at 1 ms resolution and renders 44.1 kHz 16-bit stereo WAVs
 * for all 5 redone demos so every track's exact MIDI press/release/velocity
 * and instrument timbre can be auditioned directly.
 */
#include "instrument.h"
#include "cfw_seq.h"
#include "fm_patch.h"
#include "fm1_device.h"
#include "fm1_engine_control.h"
#include "drum808.h"
#include "sampledrum.h"
#include <math.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

#include "../app/cfw_seq.c"

/* ---- Firmware Stubs & State Capture ---- */
static uint32_t sim_ms = 0;
static struct groove_project scratch_proj, cur_proj;
static unsigned track_cfw_eng[GROOVE_TRACKS];

uint32_t fm1_millis(void) { return sim_ms; }
void fm1_engine_pause(void) {}
void fm1_engine_resume(void) {}
void fm1_engine_stop(void) {}
void groove_fm_factory(uint8_t p[156], unsigned program) { memset(p, (int)(program & 0x3f), 156); }
void groove_fm_pack(uint8_t b[128], const uint8_t p[156]) { (void)p; memset(b, 0, 128); }
struct groove_project *groove_project_scratch(void) { return &scratch_proj; }
int groove_project_valid(const struct groove_project *p) { return p && p->tempo >= 30 && p->tempo <= 300; }
int groove_project_apply(const struct groove_project *p) { cur_proj = *p; return 0; }
void groove_sequence_defaults(struct groove_sequence_options *o) { memset(o, 0, sizeof *o); o->version = 4; }
void groove_project_arp_defaults(struct groove_project *p) { memset(p->arp, 0, sizeof p->arp); }
void groove_sequence_read(unsigned t, unsigned f, struct groove_step *c, unsigned n) { (void)t; (void)f; memset(c, 0, n * sizeof *c); }
void groove_sequence_replace(unsigned t, unsigned f, const struct groove_step *c, unsigned n) { (void)t; (void)f; (void)c; (void)n; }
void groove_sequence_length_set(unsigned t, unsigned s) { (void)t; (void)s; }
unsigned groove_sequence_length(unsigned t) { (void)t; return 64; }
void groove_get_view(unsigned t, unsigned s, struct groove_view *v) { (void)t; (void)s; memset(v, 0, sizeof *v); v->tempo = cur_proj.tempo ? cur_proj.tempo : 120; }
void groove_midi_panic(void) {}
unsigned groove_step_setting(unsigned t, unsigned s, unsigned k) { (void)t; (void)s; (void)k; return 0; }
int groove_step_setting_edit(unsigned t, unsigned s, unsigned k, int d) { (void)t; (void)s; (void)k; (void)d; return 0; }
unsigned groove_pad_count(unsigned t) { return cur_proj.preset[t].type == GROOVE_808 ? 11U : 0U; }
int groove_sequence_chord(unsigned t, unsigned s, const uint8_t *n, unsigned c, unsigned v) { (void)t; (void)s; (void)n; (void)c; (void)v; return 0; }
void groove_mix_toggle(unsigned t, int s) { (void)t; (void)s; }
unsigned groove_midi_input_channel(unsigned t) { return t == 7 ? 9U : t; }
void groove_edit_record(unsigned e, unsigned t, unsigned s) { (void)e; (void)t; (void)s; }
unsigned cfw_dsp_engine_get(unsigned t) { return t < GROOVE_TRACKS ? track_cfw_eng[t] : 0U; }
void cfw_dsp_engine_set(unsigned t, unsigned e) { if (t < GROOVE_TRACKS) track_cfw_eng[t] = e; }
void cfw_dsp_set_tempo_bpm(unsigned b) { (void)b; }
void cfw_dsp_fx_get(struct cfw_fx_state *o) { if (o) memset(o, 0, sizeof *o); }
void cfw_dsp_note_on(uint8_t t, uint8_t n, uint8_t v) { (void)t; (void)n; (void)v; }
void cfw_dsp_note_off(uint8_t t, uint8_t n) { (void)t; (void)n; }
void cfw_dsp_all_notes_off(uint8_t t) { (void)t; }
int groove_samples_bind_slices(unsigned a, unsigned b, unsigned c, unsigned d) { (void)a; (void)b; (void)c; (void)d; return 0; }
int groove_samples_restore_bank(void) { return 0; }
static const fm1_param_t dummy_param = { .name = "P", .max = 127, .def = 64 };
const fm1_param_t *drum808_param(int p, int k) { (void)p; (void)k; return &dummy_param; }
int drum808_nparams(int p) { (void)p; return 0; }
const fm1_param_t *sampledrum_param(unsigned k) { (void)k; return &dummy_param; }

/* ---- Clean Polyphonic Multi-Timbral FM / Analog / Drum Synth ---- */
#define SR 44100.0
#define MAX_VOICES 48

enum timbre_kind {
    TM_STRINGS, TM_BRASS, TM_PIANO, TM_REED, TM_BASS, TM_PAD, TM_BELL, TM_GUITAR, TM_303, TM_SID, TM_GRAN, TM_DRUM
};

struct voice {
    int active, released;
    uint8_t trk, note;
    enum timbre_kind kind;
    double freq, phase, phase2, mod_phase;
    double amp, env, rel_rate, atk_rate, dec_rate, sus_lvl;
    double pan_l, pan_r, age, lp;
};

static struct voice voices[MAX_VOICES];
static uint32_t rng = 0x12345678U;
static inline double frand(void) {
    rng = rng * 1664525U + 1013904223U;
    return ((double)(int32_t)rng) / 2147483648.0;
}

static enum timbre_kind track_timbre(unsigned song, unsigned trk)
{
    if (song == 0) { /* Beethoven Orch */
        static const enum timbre_kind m[8] = {TM_STRINGS, TM_BASS, TM_STRINGS, TM_PIANO, TM_REED, TM_BRASS, TM_PAD, TM_DRUM};
        return m[trk];
    }
    if (song == 1) { /* Jazz */
        static const enum timbre_kind m[8] = {TM_DRUM, TM_BASS, TM_PIANO, TM_GUITAR, TM_REED, TM_REED, TM_BRASS, TM_DRUM};
        return m[trk];
    }
    if (song == 2) { /* March */
        static const enum timbre_kind m[8] = {TM_DRUM, TM_BASS, TM_BRASS, TM_BELL, TM_REED, TM_REED, TM_BRASS, TM_BRASS};
        return m[trk];
    }
    if (song == 3) { /* Mixed */
        static const enum timbre_kind m[8] = {TM_PIANO, TM_303, TM_DRUM, TM_STRINGS, TM_BRASS, TM_DRUM, TM_SID, TM_GRAN};
        return m[trk];
    }
    /* Fox Fanfare */
    static const enum timbre_kind m[8] = {TM_DRUM, TM_BASS, TM_STRINGS, TM_STRINGS, TM_BRASS, TM_BRASS, TM_PAD, TM_DRUM};
    return m[trk];
}

static unsigned cur_song_id = 0;

static void synth_note_on(uint8_t trk, uint8_t note, uint8_t vel)
{
    int slot = -1;
    for (int i = 0; i < MAX_VOICES; ++i) {
        if (!voices[i].active) { slot = i; break; }
    }
    if (slot < 0) {
        double oldest = -1.0;
        for (int i = 0; i < MAX_VOICES; ++i)
            if (voices[i].age > oldest) { oldest = voices[i].age; slot = i; }
    }
    struct voice *v = &voices[slot];
    memset(v, 0, sizeof *v);
    v->active = 1;
    v->trk = trk;
    v->note = note;
    v->kind = track_timbre(cur_song_id, trk);
    v->freq = 440.0 * pow(2.0, ((int)note - 69) / 12.0);
    double vol = (cur_proj.preset[trk].volume / 100.0) * (vel / 127.0);
    v->amp = vol * 0.22;
    /* Gentle stereo stage spread by track */
    static const double pans[8] = {-0.45, 0.0, 0.45, -0.15, -0.35, 0.35, 0.20, 0.05};
    double p = pans[trk];
    v->pan_l = sqrt(0.5 * (1.0 - p));
    v->pan_r = sqrt(0.5 * (1.0 + p));

    switch (v->kind) {
    case TM_STRINGS: v->atk_rate = 1.0/(0.055*SR); v->dec_rate = 1.0/(0.40*SR); v->sus_lvl = 0.78; v->rel_rate = 1.0/(0.22*SR); break;
    case TM_BRASS:   v->atk_rate = 1.0/(0.025*SR); v->dec_rate = 1.0/(0.25*SR); v->sus_lvl = 0.80; v->rel_rate = 1.0/(0.14*SR); break;
    case TM_PIANO:   v->atk_rate = 1.0/(0.004*SR); v->dec_rate = 1.0/(0.65*SR); v->sus_lvl = 0.25; v->rel_rate = 1.0/(0.20*SR); break;
    case TM_REED:    v->atk_rate = 1.0/(0.018*SR); v->dec_rate = 1.0/(0.20*SR); v->sus_lvl = 0.75; v->rel_rate = 1.0/(0.10*SR); break;
    case TM_BASS:    v->atk_rate = 1.0/(0.008*SR); v->dec_rate = 1.0/(0.35*SR); v->sus_lvl = 0.55; v->rel_rate = 1.0/(0.12*SR); break;
    case TM_PAD:     v->atk_rate = 1.0/(0.120*SR); v->dec_rate = 1.0/(0.50*SR); v->sus_lvl = 0.70; v->rel_rate = 1.0/(0.35*SR); break;
    case TM_BELL:    v->atk_rate = 1.0/(0.002*SR); v->dec_rate = 1.0/(0.90*SR); v->sus_lvl = 0.15; v->rel_rate = 1.0/(0.30*SR); break;
    case TM_GUITAR:  v->atk_rate = 1.0/(0.005*SR); v->dec_rate = 1.0/(0.45*SR); v->sus_lvl = 0.22; v->rel_rate = 1.0/(0.15*SR); break;
    case TM_303:     v->atk_rate = 1.0/(0.004*SR); v->dec_rate = 1.0/(0.18*SR); v->sus_lvl = 0.35; v->rel_rate = 1.0/(0.08*SR); break;
    case TM_SID:     v->atk_rate = 1.0/(0.003*SR); v->dec_rate = 1.0/(0.15*SR); v->sus_lvl = 0.65; v->rel_rate = 1.0/(0.06*SR); break;
    case TM_GRAN:    v->atk_rate = 1.0/(0.180*SR); v->dec_rate = 1.0/(0.60*SR); v->sus_lvl = 0.72; v->rel_rate = 1.0/(0.45*SR); break;
    case TM_DRUM:    v->atk_rate = 1.0/(0.001*SR); v->dec_rate = 1.0/(0.18*SR); v->sus_lvl = 0.0;  v->rel_rate = 1.0/(0.12*SR); v->amp *= 1.45; break;
    }
}

static void synth_note_off(uint8_t trk, uint8_t note)
{
    for (int i = 0; i < MAX_VOICES; ++i)
        if (voices[i].active && !voices[i].released && voices[i].trk == trk && voices[i].note == note)
            voices[i].released = 1;
}

int groove_midi_local(const uint8_t *msg, size_t bytes)
{
    if (bytes == 3) {
        uint8_t st = msg[0] & 0xF0U;
        uint8_t ch = msg[0] & 0x0FU;
        uint8_t trk = (ch == 9U) ? 7U : (ch < 7U ? ch : 0U);
        if (st == 0x90U && msg[2] > 0) synth_note_on(trk, msg[1], msg[2]);
        else if (st == 0x80U || (st == 0x90U && msg[2] == 0)) synth_note_off(trk, msg[1]);
    }
    return 0;
}

static void render_sample(double *out_l, double *out_r)
{
    double l = 0.0, r = 0.0;
    for (int i = 0; i < MAX_VOICES; ++i) {
        struct voice *v = &voices[i];
        if (!v->active) continue;
        v->age += 1.0 / SR;

        if (v->kind == TM_DRUM) {
            double s = 0.0;
            if (v->note == 36) { /* Kick / Gran Cassa / Timpani low */
                double f = 52.0 + 95.0 * exp(-v->age * 28.0);
                v->phase += 2.0 * M_PI * f / SR;
                s = sin(v->phase) * exp(-v->age * 7.5);
                if (v->age > 0.55) v->active = 0;
            } else if (v->note == 38 || v->note == 37) { /* Snare / Rim */
                double f = 185.0 + 60.0 * exp(-v->age * 40.0);
                v->phase += 2.0 * M_PI * f / SR;
                double body = sin(v->phase) * exp(-v->age * 22.0);
                double wire = frand() * exp(-v->age * 16.0);
                s = 0.45 * body + 0.65 * wire;
                if (v->age > 0.28) v->active = 0;
            } else if (v->note == 41 || v->note == 43 || v->note == 45) { /* Toms / Quads / Timpani */
                double base = v->note == 41 ? 92.0 : (v->note == 43 ? 116.0 : 146.0);
                double f = base + 35.0 * exp(-v->age * 22.0);
                v->phase += 2.0 * M_PI * f / SR;
                s = sin(v->phase) * exp(-v->age * 6.5);
                if (v->age > 0.60) v->active = 0;
            } else if (v->note == 49) { /* Crash / Piatti */
                double n = frand();
                v->lp = v->lp + 0.55 * (n - v->lp);
                s = (n - v->lp * 0.6) * exp(-v->age * 2.2) * 0.75;
                if (v->age > 1.8) v->active = 0;
            } else { /* Hi-hat / Ride (42/46) */
                double n = frand();
                double dec = (v->note == 46) ? 7.5 : 32.0;
                v->lp = v->lp + 0.35 * (n - v->lp);
                s = (n - v->lp) * exp(-v->age * dec) * 0.55;
                if (v->age > (v->note == 46 ? 0.55 : 0.14)) v->active = 0;
            }
            l += s * v->amp * v->pan_l;
            r += s * v->amp * v->pan_r;
            continue;
        }

        /* Envelope */
        if (!v->released) {
            if (v->age < (1.0 / v->atk_rate) / SR) {
                v->env += v->atk_rate;
                if (v->env > 1.0) v->env = 1.0;
            } else if (v->env > v->sus_lvl) {
                v->env -= v->dec_rate;
                if (v->env < v->sus_lvl) v->env = v->sus_lvl;
            }
        } else {
            v->env -= v->rel_rate;
            if (v->env <= 0.0005) { v->active = 0; continue; }
        }

        double dt = 2.0 * M_PI * v->freq / SR;
        v->phase += dt;
        v->phase2 += dt * 1.0045;
        double s = 0.0;

        if (v->kind == TM_BRASS) {
            double idx = 2.4 * (0.35 + 0.65 * v->env);
            s = 0.65 * sin(v->phase + idx * sin(v->phase)) + 0.35 * sin(v->phase2 + idx * 0.7 * sin(v->phase2));
        } else if (v->kind == TM_STRINGS || v->kind == TM_PAD) {
            double saw1 = (fmod(v->phase, 2*M_PI) / M_PI) - 1.0;
            double saw2 = (fmod(v->phase2, 2*M_PI) / M_PI) - 1.0;
            double raw = 0.5 * (saw1 + saw2);
            v->lp += 0.12 * (raw - v->lp);
            s = v->lp * 1.4;
        } else if (v->kind == TM_PIANO || v->kind == TM_GUITAR) {
            double idx = 2.2 * exp(-v->age * 5.0);
            s = sin(v->phase + idx * sin(v->phase * 2.0)) + 0.25 * sin(v->phase * 3.0) * exp(-v->age * 9.0);
        } else if (v->kind == TM_REED) {
            double idx = 1.1 * v->env;
            s = sin(v->phase + idx * sin(v->phase * 2.0));
        } else if (v->kind == TM_BASS || v->kind == TM_303) {
            double saw = (fmod(v->phase, 2*M_PI) / M_PI) - 1.0;
            double cut = (v->kind == TM_303) ? (0.08 + 0.42 * exp(-v->age * 9.0)) : 0.14;
            v->lp += cut * (saw - v->lp);
            s = 0.65 * sin(v->phase) + 0.65 * v->lp;
        } else if (v->kind == TM_BELL) {
            double idx = 3.2 * exp(-v->age * 3.5);
            s = sin(v->phase + idx * sin(v->phase * 3.5));
        } else if (v->kind == TM_SID) {
            s = (fmod(v->phase, 2*M_PI) < M_PI * 0.35) ? 0.55 : -0.55;
        } else { /* TM_GRAN */
            double g = 0.5 + 0.5 * sin(v->age * 18.0);
            s = (0.5 * sin(v->phase) + 0.5 * sin(v->phase2 * 2.0)) * g;
        }

        double out = s * v->env * v->amp;
        l += out * v->pan_l;
        r += out * v->pan_r;
    }
    *out_l = l;
    *out_r = r;
}

static void write_wav_header(FILE *f, uint32_t frames)
{
    uint32_t data_bytes = frames * 4U;
    uint32_t riff_size = 36U + data_bytes;
    uint16_t fmt = 1, ch = 2, align = 4, bits = 16;
    uint32_t sr = 44100, br = sr * 4U, sub = 16;
    fwrite("RIFF", 1, 4, f); fwrite(&riff_size, 4, 1, f);
    fwrite("WAVEfmt ", 1, 8, f); fwrite(&sub, 4, 1, f);
    fwrite(&fmt, 2, 1, f); fwrite(&ch, 2, 1, f);
    fwrite(&sr, 4, 1, f); fwrite(&br, 4, 1, f);
    fwrite(&align, 2, 1, f); fwrite(&bits, 2, 1, f);
    fwrite("data", 1, 4, f); fwrite(&data_bytes, 4, 1, f);
}

int main(int argc, char **argv)
{
    const char *out_dir = argc > 1 ? argv[1] : "/tmp/fm1_audition";
    static const char *names[5] = {
        "Song1_Beethoven_Orch_EXACT.wav",
        "Song2_Jazz_AllStar_EXACT.wav",
        "Song3_Stars_And_Stripes_March_EXACT.wav",
        "Song4_AllBank_Mix_EXACT.wav",
        "Song5_20th_Century_Fox_Fanfare_EXACT.wav"
    };

    /* Simple stereo Schroeder-style early reflection delay buffer */
    static double dl[4410], dr[5292];

    for (unsigned d = 0; d < CFW_DEMO_COUNT; ++d) {
        cur_song_id = d;
        memset(voices, 0, sizeof voices);
        memset(dl, 0, sizeof dl);
        memset(dr, 0, sizeof dr);
        sim_ms = 0;
        if (cfw_demo_start(d) != 0) { fprintf(stderr, "Failed to start demo %u\n", d); return 1; }

        uint32_t dur_sec = cfw_demo_duration_sec(d) + 2U;
        uint32_t total_frames = dur_sec * 44100U;
        char path[512];
        snprintf(path, sizeof path, "%s/%s", out_dir, names[d]);
        FILE *f = fopen(path, "wb");
        if (!f) { perror(path); return 1; }
        write_wav_header(f, total_frames);

        int16_t buf[1024];
        unsigned bp = 0, idx_l = 0, idx_r = 0;
        double peak = 0.0;
        uint32_t last_ms = 0xFFFFFFFFU;

        for (uint32_t fr = 0; fr < total_frames; ++fr) {
            uint32_t ms = (uint32_t)(((uint64_t)fr * 1000ULL) / 44100ULL);
            if (ms != last_ms) {
                sim_ms = ms;
                cfw_seq_control_poll();
                last_ms = ms;
            }
            double l, r;
            render_sample(&l, &r);
            double wl = dl[idx_l], wr = dr[idx_r];
            dl[idx_l] = l + wr * 0.34;
            dr[idx_r] = r + wl * 0.34;
            idx_l = (idx_l + 1) % 4410;
            idx_r = (idx_r + 1) % 5292;
            l = tanh((l + wl * 0.24) * 1.15);
            r = tanh((r + wr * 0.24) * 1.15);
            if (fabs(l) > peak) peak = fabs(l);
            if (fabs(r) > peak) peak = fabs(r);
            buf[bp++] = (int16_t)(l * 30000.0);
            buf[bp++] = (int16_t)(r * 30000.0);
            if (bp == 1024) { fwrite(buf, sizeof(int16_t), bp, f); bp = 0; }
        }
        if (bp) fwrite(buf, sizeof(int16_t), bp, f);
        fclose(f);
        printf("Rendered %s (%.1fs, peak=%.2f dBFS)\n", path, (double)total_frames / 44100.0, 20.0 * log10(peak > 1e-6 ? peak : 1e-6));
    }
    return 0;
}
