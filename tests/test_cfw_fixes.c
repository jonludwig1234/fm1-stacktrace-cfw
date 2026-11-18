/* Host-side regression tests for non-storage CFW fixes:
 *  1. app/presets.c: groove_factory_apply_demo(4) (CFW_DEMO_FOX)
 *  2. app/samples.c: groove_samples_bind_slices() trailing frame clamp
 *  3. app/cfw_seq.c: demo_lz77_unpack() dist == 0 guard & demo_raw_len clamp
 */
#include "instrument.h"
#include "cfw_seq.h"
#include "fm_patch.h"
#include "fm1_device.h"
#include "fm1_engine_control.h"
#include "drum808.h"
#include "sampledrum.h"
#include <assert.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>

/* Include cfw_seq.c directly so we can unit-test static demo_lz77_unpack()
 * as well as public cfw_demo_name() / cfw_demo_start(). */
#include "../app/cfw_seq.c"

/* ---- Minimal mocks for presets.c, samples.c, cfw_seq.c ---- */
static uint8_t flash_buf[GROOVE_FLASH_BYTES];
static struct groove_project scratch_proj;
static struct groove_project applied_proj;
static struct {
    unsigned pad;
    const uint8_t *data;
    unsigned bytes;
    unsigned frames;
    char name[16];
} bound_pads[8];
static unsigned bound_count = 0;

uint32_t fm1_flash_size(void) { return sizeof flash_buf; }
uint32_t fm1_millis(void) { return 1000; }
int fm1_flash_read(uint32_t offset, void *dst, size_t bytes)
{
    if (offset + bytes > sizeof flash_buf) return FM1_FLASH_INVALID;
    memcpy(dst, flash_buf + offset, bytes);
    return 0;
}
int fm1_flash_write(uint32_t offset, const void *src, size_t bytes)
{
    if (offset + bytes > sizeof flash_buf) return FM1_FLASH_INVALID;
    memcpy(flash_buf + offset, src, bytes);
    return 0;
}
int fm1_flash_erase(uint32_t offset)
{
    if (offset + FM1_FLASH_SECTOR_BYTES > sizeof flash_buf) return FM1_FLASH_INVALID;
    memset(flash_buf + offset, 0xff, FM1_FLASH_SECTOR_BYTES);
    return 0;
}
const uint8_t *fm1_flash_map(uint32_t offset, size_t bytes)
{
    if (offset + bytes > sizeof flash_buf) return NULL;
    return flash_buf + offset;
}
void fm1_engine_pause(void) {}
void fm1_engine_resume(void) {}
int groove_storage_prepare(void) { return 0; }
void groove_samples_stop(void) {}
void groove_fm_library_init(void) {}
void groove_fm_factory(uint8_t p[156], unsigned program) { memset(p, (int)(program & 0x3f), 156); }
void groove_fm_pack(uint8_t b[128], const uint8_t p[156]) { (void)p; memset(b, 0, 128); }
struct groove_project *groove_project_scratch(void) { return &scratch_proj; }
int groove_project_valid(const struct groove_project *p)
{
    return p && p->tempo >= 30 && p->tempo <= 300 && p->sequence.version == 4;
}
int groove_project_apply(const struct groove_project *p)
{
    applied_proj = *p;
    return 0;
}
void groove_sequence_defaults(struct groove_sequence_options *o)
{
    memset(o, 0, sizeof *o);
    o->version = 4;
    for (unsigned i = 0; i < GROOVE_LOCKS; ++i) o->lock[i].track = 255;
}
void groove_project_arp_defaults(struct groove_project *p) { memset(p->arp, 0, sizeof p->arp); }
int sampledrum_bind(unsigned pad, const uint8_t *data, unsigned bytes, unsigned frames, const char *name)
{
    if (pad < 8) {
        bound_pads[pad].pad = pad;
        bound_pads[pad].data = data;
        bound_pads[pad].bytes = bytes;
        bound_pads[pad].frames = frames;
        memset(bound_pads[pad].name, 0, sizeof bound_pads[pad].name);
        if (name) memcpy(bound_pads[pad].name, name, 15);
        ++bound_count;
    }
    return 0;
}
void groove_sequence_read(unsigned track, unsigned first, struct groove_step *cells, unsigned count)
{ (void)track; (void)first; memset(cells, 0, count * sizeof *cells); }
void groove_sequence_replace(unsigned track, unsigned first, const struct groove_step *cells, unsigned count)
{ (void)track; (void)first; (void)cells; (void)count; }
void groove_sequence_length_set(unsigned track, unsigned steps) { (void)track; (void)steps; }
unsigned groove_sequence_length(unsigned track) { (void)track; return 64; }
void groove_get_view(unsigned track, unsigned step, struct groove_view *v)
{ (void)track; (void)step; memset(v, 0, sizeof *v); v->tempo = 120; }
int groove_midi_local(const uint8_t *msg, size_t bytes) { (void)msg; (void)bytes; return 0; }
void groove_midi_panic(void) {}
void cfw_dsp_note_on(uint8_t track, uint8_t note, uint8_t vel) { (void)track; (void)note; (void)vel; }
void cfw_dsp_note_off(uint8_t track, uint8_t note) { (void)track; (void)note; }
void cfw_dsp_all_notes_off(uint8_t track) { (void)track; }
void cfw_dsp_set_track_engine(unsigned track, unsigned engine) { (void)track; (void)engine; }
unsigned cfw_dsp_get_track_engine(unsigned track) { (void)track; return 0; }
void cfw_dsp_set_sampler_loop(unsigned pad, unsigned mode) { (void)pad; (void)mode; }
void cfw_dsp_set_param(unsigned track, unsigned param, int32_t value) { (void)track; (void)param; (void)value; }
unsigned groove_step_setting(unsigned track, unsigned step, unsigned setting) { (void)track; (void)step; (void)setting; return 0; }
int groove_step_setting_edit(unsigned track, unsigned step, unsigned setting, int delta) { (void)track; (void)step; (void)setting; (void)delta; return 0; }
unsigned groove_pad_count(unsigned track) { (void)track; return 0; }
int groove_sequence_chord(unsigned track, unsigned step, const uint8_t *notes, unsigned count, unsigned velocity) { (void)track; (void)step; (void)notes; (void)count; (void)velocity; return 0; }
void groove_mix_toggle(unsigned track, int solo) { (void)track; (void)solo; }
unsigned groove_midi_input_channel(unsigned track) { return track == 7 ? 9U : track; }
void groove_edit_record(unsigned enabled, unsigned track, unsigned step) { (void)enabled; (void)track; (void)step; }
void fm1_engine_stop(void) {}
int fm1_flash_invalidate(uint32_t offset, size_t bytes) { (void)offset; (void)bytes; return 0; }
unsigned cfw_dsp_engine_get(unsigned track) { (void)track; return CFW_ENG_STOCK; }
void cfw_dsp_engine_set(unsigned track, unsigned eng) { (void)track; (void)eng; }
void cfw_dsp_set_tempo_bpm(unsigned bpm) { (void)bpm; }
void cfw_dsp_fx_get(struct cfw_fx_state *out) { if (out) memset(out, 0, sizeof *out); }
static const fm1_param_t dummy_param = { .name = "P", .max = 127, .def = 64 };
const fm1_param_t *drum808_param(int part, int parameter) { (void)part; (void)parameter; return &dummy_param; }
int drum808_nparams(int part) { (void)part; return 0; }
const fm1_param_t *sampledrum_param(unsigned parameter) { (void)parameter; return &dummy_param; }

uint32_t groove_crc32(uint32_t crc, const void *data, unsigned bytes)
{
    static const uint32_t table[16] = {
        0x00000000U, 0x1db71064U, 0x3b6e20c8U, 0x26d930acU,
        0x76dc4190U, 0x6b6b51f4U, 0x4db26158U, 0x5005713cU,
        0xedb88320U, 0xf00f9344U, 0xd6d6a3e8U, 0xcb61b38cU,
        0x9b64c2b0U, 0x86d3d2d4U, 0xa00ae278U, 0xbdbdf21cU
    };
    const uint8_t *p = data;
    while (bytes--) {
        crc ^= *p++;
        crc = (crc >> 4) ^ table[crc & 15U];
        crc = (crc >> 4) ^ table[crc & 15U];
    }
    return crc;
}

static int failures = 0;
#define CHECK(cond, msg) do { \
    if (!(cond)) { \
        fprintf(stderr, "FAIL [%s:%d]: %s\n", __func__, __LINE__, msg); \
        ++failures; \
        return; \
    } \
} while (0)

/* ---- Test 1: groove_factory_apply_demo for all 5 demos ---- */
static void test_factory_demo_fox(void)
{
    for (unsigned d = 0; d < CFW_DEMO_COUNT; ++d) {
        memset(&applied_proj, 0, sizeof applied_proj);
        int r = groove_factory_apply_demo(d);
        CHECK(r == 0, "groove_factory_apply_demo must succeed for all 0..CFW_DEMO_COUNT-1 (including Fox demo 4)");
        CHECK(applied_proj.tempo >= 60 && applied_proj.tempo <= 200, "demo project must have valid tempo");
    }
    CHECK(groove_factory_apply_demo(CFW_DEMO_COUNT) == GROOVE_PROJECT_INVALID,
          "out-of-range demo_id must return GROOVE_PROJECT_INVALID");
}

/* ---- Test 2: demo_lz77_unpack with dist == 0 ---- */
static void test_demo_lz77_dist_zero(void)
{
    /* Token: 0x80 (back-reference, len = 3), dist = 0x00 (invalid dist == 0) */
    const uint8_t src[] = { 0x80, 0x00 };
    uint8_t dst[8];
    memset(dst, 0xAA, sizeof dst); /* Poison buffer to catch self-read of uninitialized dst[out] */
    demo_lz77_unpack(src, sizeof src, dst, sizeof dst);
    CHECK(dst[0] == 0 && dst[1] == 0 && dst[2] == 0,
          "demo_lz77_unpack with dist==0 must write 0U instead of reading uninitialized dst[out]");
}

/* ---- Test 3: groove_samples_bind_slices partial trailing chunk ---- */
static void test_samples_bind_slices_clamp(void)
{
    memset(flash_buf, 0xff, sizeof flash_buf);
    memset(bound_pads, 0, sizeof bound_pads);
    bound_count = 0;

    /* Build a valid sample bank header with 1 sample of 500 frames (not a multiple of 320):
     * 2 chunks (640 chunk-capacity) -> slice 0 = chunk 0 (320 frames), slice 1 = chunk 1 (should be 180 frames, NOT 320!). */
    struct {
        uint32_t magic, version, bytes, crc, commit, rate, reserved[2];
        struct { uint32_t offset, frames, bytes; char name[16]; } entry[16];
        uint8_t padding[32];
    } hdr;
    memset(&hdr, 0, sizeof hdr);
    hdr.magic = 0x53314d46U; /* 'FM1S' */
    hdr.version = 1;
    hdr.rate = 32000;
    hdr.entry[0].offset = 512;
    hdr.entry[0].frames = 500;
    hdr.entry[0].bytes = 2U * SAMPLE_DRUM_CHUNK_BYTES; /* 2 chunks of 228 bytes */
    memcpy(hdr.entry[0].name, "TEST500", 7);
    for (unsigned i = 1; i < 16; ++i)
        hdr.entry[i].offset = 512 + hdr.entry[0].bytes;
    hdr.bytes = 512 + hdr.entry[0].bytes;
    hdr.crc = 0;
    hdr.commit = 0;

    memcpy(flash_buf + GROOVE_SAMPLE_OFFSET, &hdr, sizeof hdr);
    memset(flash_buf + GROOVE_SAMPLE_OFFSET + 512, 0, hdr.entry[0].bytes);
    for (unsigned c = 0; c < 2; ++c) {
        uint8_t *ch = flash_buf + GROOVE_SAMPLE_OFFSET + 512 + c * SAMPLE_DRUM_CHUNK_BYTES;
        ch[0] = 1; ch[1] = 0x45; ch[2] = 20; ch[3] = 0x5a;
    }
    uint32_t crc = groove_crc32(~0U, flash_buf + GROOVE_SAMPLE_OFFSET, hdr.bytes);
    hdr.crc = ~crc;
    memcpy(flash_buf + GROOVE_SAMPLE_OFFSET, &hdr, sizeof hdr);

    groove_samples_init();
    while (groove_samples_status() == 1)
        groove_samples_poll();
    CHECK(groove_samples_status() == 2, "sample bank must validate as ready");

    bound_count = 0;
    int r = groove_samples_bind_slices(0, 0, 100, 2);
    CHECK(r == 0, "groove_samples_bind_slices must succeed");
    CHECK(bound_pads[0].frames == 320, "slice 0 should have 320 frames");
    CHECK(bound_pads[1].frames == 180, "slice 1 must clamp to remaining 180 frames (not 320)");
}

int main(void)
{
    test_factory_demo_fox();
    test_demo_lz77_dist_zero();
    test_samples_bind_slices_clamp();

    if (failures) {
        fprintf(stderr, "TOTAL FAILURES: %d\n", failures);
        return 1;
    }
    printf("ALL CFW FIX TESTS PASSED\n");
    return 0;
}
