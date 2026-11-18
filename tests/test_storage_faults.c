/* Host-side flash fault-injection and persistence test suite for
 * app/project.c and app/fm_library.c.
 *
 * Compiles directly against app/project.c and app/fm_library.c with a NOR flash
 * simulator enforcing 1->0 bit programming rules and supporting fault injection
 * (IO error, BUSY, partial write, corrupt bytes) at any erase/write/read step.
 */
#include "instrument.h"
#include "fm_patch.h"
#include "fm1_device.h"
#include "fm1_engine_control.h"
#include <assert.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* ---- Simulated NOR Flash ---- */
static uint8_t flash_mem[GROOVE_FLASH_BYTES];
static uint32_t sim_flash_size = GROOVE_FLASH_BYTES;
static uint32_t sim_now_ms = 0;

enum fault_op {
    FAULT_NONE = 0,
    FAULT_ERASE_FAIL,
    FAULT_WRITE_FAIL_BEFORE,
    FAULT_WRITE_PARTIAL,
    FAULT_WRITE_AMBIGUOUS_AFTER,
    FAULT_READ_FAIL
};

static struct {
    int enabled;
    unsigned target_op;      /* 1-based write/erase op counter */
    unsigned current_op;
    enum fault_op kind;
    int err_code;
    unsigned partial_bytes;
    int triggered;
} fault;

static void flash_reset(void)
{
    memset(flash_mem, 0xff, sizeof flash_mem);
    sim_flash_size = GROOVE_FLASH_BYTES;
    memset(&fault, 0, sizeof fault);
}

static void fault_arm(unsigned op_index, enum fault_op kind, int err_code, unsigned partial_bytes)
{
    memset(&fault, 0, sizeof fault);
    fault.enabled = 1;
    fault.target_op = op_index;
    fault.kind = kind;
    fault.err_code = err_code;
    fault.partial_bytes = partial_bytes;
}

static void fault_clear(void)
{
    memset(&fault, 0, sizeof fault);
}

uint32_t fm1_flash_size(void) { return sim_flash_size; }
uint32_t fm1_millis(void) { return sim_now_ms; }

int fm1_flash_read(uint32_t offset, void *dst, size_t bytes)
{
    if (!dst || offset > sim_flash_size || bytes > sim_flash_size - offset)
        return FM1_FLASH_INVALID;
    if (fault.enabled && fault.kind == FAULT_READ_FAIL) {
        fault.current_op++;
        if (fault.current_op == fault.target_op) {
            fault.triggered = 1;
            return fault.err_code;
        }
    }
    memcpy(dst, flash_mem + offset, bytes);
    return FM1_FLASH_OK;
}

int fm1_flash_erase(uint32_t offset)
{
    if ((offset & (FM1_FLASH_SECTOR_BYTES - 1U)) != 0 ||
        offset + FM1_FLASH_SECTOR_BYTES > sim_flash_size)
        return FM1_FLASH_INVALID;
    if (fault.enabled && fault.kind != FAULT_READ_FAIL) {
        fault.current_op++;
        if (fault.current_op == fault.target_op && fault.kind == FAULT_ERASE_FAIL) {
            fault.triggered = 1;
            return fault.err_code;
        }
    }
    memset(flash_mem + offset, 0xff, FM1_FLASH_SECTOR_BYTES);
    return FM1_FLASH_OK;
}

int fm1_flash_write(uint32_t offset, const void *src, size_t bytes)
{
    if (!src || offset > sim_flash_size || bytes > sim_flash_size - offset)
        return FM1_FLASH_INVALID;
    if (fault.enabled && fault.kind != FAULT_READ_FAIL) {
        fault.current_op++;
        if (fault.current_op == fault.target_op) {
            if (fault.kind == FAULT_WRITE_FAIL_BEFORE) {
                fault.triggered = 1;
                return fault.err_code;
            }
            if (fault.kind == FAULT_WRITE_PARTIAL) {
                fault.triggered = 1;
                unsigned n = fault.partial_bytes < bytes ? fault.partial_bytes : bytes;
                const uint8_t *p = src;
                for (unsigned i = 0; i < n; ++i) {
                    if ((p[i] & ~flash_mem[offset + i]) != 0)
                        return FM1_FLASH_NEEDS_ERASE;
                    flash_mem[offset + i] &= p[i];
                }
                return fault.err_code;
            }
        }
    }
    const uint8_t *p = src;
    /* Enforce real NOR flash physics: cannot flip 0 -> 1 without erase. */
    for (unsigned i = 0; i < bytes; ++i) {
        if ((p[i] & ~flash_mem[offset + i]) != 0)
            return FM1_FLASH_NEEDS_ERASE;
    }
    for (unsigned i = 0; i < bytes; ++i)
        flash_mem[offset + i] &= p[i];

    if (fault.enabled && fault.kind == FAULT_WRITE_AMBIGUOUS_AFTER &&
        fault.current_op == fault.target_op) {
        fault.triggered = 1;
        return fault.err_code;
    }
    return FM1_FLASH_OK;
}

const uint8_t *fm1_flash_map(uint32_t offset, size_t bytes)
{
    if (offset > sim_flash_size || bytes > sim_flash_size - offset)
        return NULL;
    return flash_mem + offset;
}

/* ---- Runtime / Engine Stubs ---- */
static struct groove_project live_project;
static struct groove_tuning live_tuning[GROOVE_TRACKS];
static struct groove_midi_config live_midi;
static unsigned live_clock = GROOVE_CLOCK_INTERNAL;
static uint8_t live_role[GROOVE_TRACKS];
static uint8_t live_channel[GROOVE_TRACKS];
static int live_dirty = 0;
static int pause_depth = 0;
static uint8_t factory_voice_raw[128];

void fm1_engine_pause(void) { ++pause_depth; }
void fm1_engine_resume(void) { assert(pause_depth > 0); --pause_depth; }
int fm1_bluetooth_configure(unsigned features) { (void)features; return 0; }
int fm1_ble_set_role(enum fm1_ble_role role) { (void)role; return 0; }
unsigned fm1_midi_output_ports(void) { return 7; }
unsigned fm1_midi_input_ports(void) { return 7; }

const uint8_t *groove_fm_factory_raw(unsigned program)
{
    memset(factory_voice_raw, (int)(program & 0x7f), sizeof factory_voice_raw);
    return factory_voice_raw;
}
void groove_fm_factory(uint8_t p[156], unsigned program)
{
    memset(p, (int)(program & 0x3f), 156);
}

static void make_valid_project(struct groove_project *p, const char *name12, uint16_t tempo)
{
    memset(p, 0, sizeof *p);
    p->tempo = tempo;
    memcpy(p->name, "            ", 12);
    size_t n = strlen(name12);
    if (n > 12) n = 12;
    memcpy(p->name, name12, n);
    p->effects[0] = 40;
    p->effects[1] = GROOVE_DELAY_DEFAULT;
    p->effects[2] = 30;
    p->effects[3] = 50;
    p->sequence.version = 4;
    for (unsigned i = 0; i < GROOVE_LOCKS; ++i)
        p->sequence.lock[i].track = 255;
    groove_project_arp_defaults(p);
}

void groove_project_arp_defaults(struct groove_project *p)
{
    for (unsigned t = 0; t < GROOVE_TRACKS; ++t) {
        p->arp[t][0] = 0;
        p->arp[t][1] = 0;
    }
}

int groove_project_valid(const struct groove_project *p)
{
    if (!p) return 0;
    if (p->tempo < 30 || p->tempo > 300) return 0;
    if (p->sequence.version != 4) return 0;
    return 1;
}

int groove_arrangement_capture(struct groove_project *p)
{
    char tmp[13];
    *p = live_project;
    groove_project_name(tmp);
    memcpy(p->name, tmp, 12);
    return 0;
}

int groove_project_apply(const struct groove_project *p)
{
    live_project = *p;
    groove_project_metadata(p);
    return 0;
}

int groove_project_apply_edit(const struct groove_project *p, unsigned operation)
{
    (void)operation;
    return groove_project_apply(p);
}

int groove_tuning_capture(struct groove_tuning t[GROOVE_TRACKS])
{
    memcpy(t, live_tuning, sizeof live_tuning);
    return 0;
}

int groove_tuning_apply(const struct groove_tuning t[GROOVE_TRACKS])
{
    memcpy(live_tuning, t, sizeof live_tuning);
    return 0;
}

int groove_arrangement_tuning_capture(struct groove_tuning t[GROOVE_TRACKS])
{
    return groove_tuning_capture(t);
}

int groove_arrangement_tuning_apply(const struct groove_tuning t[GROOVE_TRACKS])
{
    return groove_tuning_apply(t);
}

void groove_midi_defaults(struct groove_midi_config *c)
{
    memset(c, 0, sizeof *c);
}

int groove_midi_config_valid(const struct groove_midi_config *c)
{
    (void)c;
    return 1;
}

void groove_midi_config_read(struct groove_midi_config *c) { *c = live_midi; }
void groove_midi_config_apply(const struct groove_midi_config *c) { live_midi = *c; }
unsigned groove_midi_setting(unsigned track, unsigned parameter) { (void)track; (void)parameter; return 0; }
void groove_clock_set(unsigned mode) { live_clock = mode; }
unsigned groove_track_role(unsigned track) { return live_role[track]; }
unsigned groove_midi_input_channel(unsigned track) { return live_channel[track]; }
int groove_track_role_set(unsigned track, unsigned role)
{
    if (track >= GROOVE_TRACKS || role > GROOVE_TRACK_OFF) return GROOVE_PROJECT_INVALID;
    live_role[track] = (uint8_t)role;
    return 0;
}
int groove_midi_input_set(unsigned track, unsigned channel)
{
    if (track >= GROOVE_TRACKS || channel > 15) return GROOVE_PROJECT_INVALID;
    live_channel[track] = (uint8_t)channel;
    return 0;
}
void groove_edit_checkpoint(unsigned operation) { (void)operation; }
void groove_project_clean(void) { live_dirty = 0; }
void groove_project_touch(void) { live_dirty = 1; }
int groove_factory_build(unsigned index, struct groove_project *p)
{
    (void)index;
    make_valid_project(p, "FACTORY     ", 120);
    return 0;
}

static void reset_runtime(void)
{
    make_valid_project(&live_project, "UNTITLED    ", 120);
    memset(live_tuning, 0, sizeof live_tuning);
    groove_midi_defaults(&live_midi);
    live_clock = GROOVE_CLOCK_INTERNAL;
    memset(live_role, 0, sizeof live_role);
    for (unsigned t = 0; t < GROOVE_TRACKS; ++t)
        live_channel[t] = (uint8_t)groove_channel(t);
    live_dirty = 0;
    sim_now_ms = 0;
    groove_project_init();
}

/* ---- Helpers to construct legacy on-flash records ---- */
enum {
    T_PROJECT_MAGIC = 0x36504d46U,
    T_SETTINGS_MAGIC = 0x36534d46U,
    T_V5_PROJECT_MAGIC = 0x35504d46U,
    T_LEGACY_PROJECT_MAGIC = 0x34504d46U,
    T_TUNING_MAGIC = 0x54314d46U,
    T_SESSION_MAGIC = 0x31534d46U,
    T_LEGACY_TUNING_JOURNAL_MAGIC = 0x4a544d46U,
    T_SETTINGS_SECTOR = GROOVE_PROJECT_SLOTS - 1,
    T_STAGING_SECTOR = GROOVE_PROJECT_SLOTS
};

struct t_header { uint32_t magic, generation, target, crc, commit; };
struct t_settings { uint8_t role, clock, slot, radio_off; struct groove_midi_config midi; };
struct t_tuning_entry { uint32_t key; struct groove_tuning t[GROOVE_TRACKS]; uint32_t crc; };
struct t_session_settings { uint32_t magic; uint8_t role[8], channel[8]; uint32_t crc; };
struct t_tuning_sector {
    uint32_t magic, version;
    struct t_tuning_entry entry[GROOVE_PROJECT_SLOTS];
    struct t_session_settings session;
};
struct t_tuning_journal { uint32_t magic, crc, commit; };

static uint32_t legacy_tuning_crc(uint32_t gen, const struct groove_tuning *t, uint32_t proj_crc)
{
    uint32_t crc = groove_crc32(~0U, &gen, sizeof gen);
    crc = groove_crc32(crc, t, sizeof(struct groove_tuning) * GROOVE_TRACKS);
    return ~groove_crc32(crc, &proj_crc, sizeof proj_crc);
}

static int failures = 0;
#define CHECK(cond, msg) do { \
    if (!(cond)) { \
        fprintf(stderr, "FAIL [%s:%d]: %s\n", __func__, __LINE__, msg); \
        ++failures; \
        return; \
    } \
} while (0)

/* ---- Test 1: Blank vs Valid vs Corrupt Project Slot ---- */
static void test_blank_vs_corrupt_slot(void)
{
    flash_reset();
    reset_runtime();
    char name[13];

    /* Blank slot must report GROOVE_PROJECT_EMPTY */
    int r = groove_project_info(0, name);
    CHECK(r == GROOVE_PROJECT_EMPTY, "blank slot info should be GROOVE_PROJECT_EMPTY");
    r = groove_project_load_slot(0);
    CHECK(r == GROOVE_PROJECT_EMPTY, "blank slot load should be GROOVE_PROJECT_EMPTY");

    /* Save a valid project in slot 0 */
    make_valid_project(&live_project, "GOOD PROJ   ", 128);
    groove_project_metadata(&live_project);
    r = groove_project_save_slot(0);
    CHECK(r == 0, "save valid project to slot 0");

    /* Corrupt a byte inside slot 0's payload (CRC mismatch) */
    flash_mem[0 * FM1_FLASH_SECTOR_BYTES + 100] ^= 0x55;
    /* Also clear staging so no valid fallback exists */
    memset(flash_mem + T_STAGING_SECTOR * FM1_FLASH_SECTOR_BYTES, 0xff, FM1_FLASH_SECTOR_BYTES);

    /* Corrupt slot MUST report GROOVE_PROJECT_INVALID, NOT GROOVE_PROJECT_EMPTY */
    r = groove_project_info(0, name);
    CHECK(r == GROOVE_PROJECT_INVALID, "corrupt slot info must return GROOVE_PROJECT_INVALID");
    r = groove_project_load_slot(0);
    CHECK(r == GROOVE_PROJECT_INVALID, "corrupt slot load must return GROOVE_PROJECT_INVALID");

    /* Uncommitted non-blank sector (commit != 0) must also report GROOVE_PROJECT_INVALID */
    memset(flash_mem, 0xff, FM1_FLASH_SECTOR_BYTES);
    uint32_t garbage = 0xDEADBEEFU;
    memcpy(flash_mem, &garbage, sizeof garbage);
    r = groove_project_load_slot(0);
    CHECK(r == GROOVE_PROJECT_INVALID, "non-blank garbage sector must return GROOVE_PROJECT_INVALID");

    /* Corrupt SETTINGS_SECTOR (slot 15) must NOT be silently overwritten by settings auto-save */
    make_valid_project(&live_project, "SLOT16 SAFE ", 110);
    groove_project_metadata(&live_project);
    r = groove_project_save_slot(T_SETTINGS_SECTOR);
    CHECK(r == 0, "save slot 16");
    memset(flash_mem + T_STAGING_SECTOR * FM1_FLASH_SECTOR_BYTES, 0xff, FM1_FLASH_SECTOR_BYTES);
    /* Corrupt slot 16 */
    uint8_t saved_corrupt[FM1_FLASH_SECTOR_BYTES];
    flash_mem[T_SETTINGS_SECTOR * FM1_FLASH_SECTOR_BYTES + 200] ^= 0xAA;
    memcpy(saved_corrupt, flash_mem + T_SETTINGS_SECTOR * FM1_FLASH_SECTOR_BYTES, FM1_FLASH_SECTOR_BYTES);

    groove_settings_clock(GROOVE_CLOCK_MIDI);
    sim_now_ms += 2000;
    groove_project_poll();
    CHECK(groove_settings_status() == GROOVE_PROJECT_INVALID,
          "settings poll must report GROOVE_PROJECT_INVALID on corrupt SETTINGS_SECTOR");
    CHECK(memcmp(saved_corrupt, flash_mem + T_SETTINGS_SECTOR * FM1_FLASH_SECTOR_BYTES,
                 FM1_FLASH_SECTOR_BYTES) == 0,
          "settings poll must NOT erase/overwrite corrupt SETTINGS_SECTOR");
}

/* ---- Test 2: Exhaustive Fault Injection on Project Save & Recovery ---- */
static void test_project_save_fault_injection(void)
{
    enum fault_op modes[] = {
        FAULT_ERASE_FAIL,
        FAULT_WRITE_FAIL_BEFORE,
        FAULT_WRITE_PARTIAL,
        FAULT_WRITE_AMBIGUOUS_AFTER
    };

    for (unsigned m = 0; m < sizeof(modes) / sizeof(modes[0]); ++m) {
        for (unsigned step = 1; step <= 12; ++step) {
            flash_reset();
            reset_runtime();

            /* Commit initial version (gen 1) */
            make_valid_project(&live_project, "VERSION ONE ", 120);
            groove_project_metadata(&live_project);
            CHECK(groove_project_save_slot(2) == 0, "initial save gen 1");

            /* Attempt to save gen 2 with fault injected at `step` */
            make_valid_project(&live_project, "VERSION TWO ", 140);
            groove_project_metadata(&live_project);
            fault_arm(step, modes[m], FM1_FLASH_IO, 17);
            int r = groove_project_save_slot(2);
            int hit = fault.triggered;
            fault_clear();

            if (!hit)
                break; /* Past last flash op of save_slot */
            CHECK(r == FM1_FLASH_IO, "injected fault must return FM1_FLASH_IO");

            /* Simulate reboot: reset RAM and load slot 2 */
            reset_runtime();
            r = groove_project_load_slot(2);
            CHECK(r == 0, "reboot load after interrupted save must recover a valid version");
            char name[13];
            groove_project_name(name);
            int is_v1 = (memcmp(name, "VERSION ONE ", 12) == 0 && live_project.tempo == 120);
            int is_v2 = (memcmp(name, "VERSION TWO ", 12) == 0 && live_project.tempo == 140);
            CHECK(is_v1 || is_v2, "recovered project must be intact gen 1 or gen 2");

            /* Recovery retry + subsequent save (gen 3) must succeed cleanly */
            CHECK(groove_storage_prepare() == 0, "groove_storage_prepare must recover staging");
            make_valid_project(&live_project, "VERSION TRE ", 150);
            groove_project_metadata(&live_project);
            CHECK(groove_project_save_slot(2) == 0, "save gen 3 after recovery");
            reset_runtime();
            CHECK(groove_project_load_slot(2) == 0, "load gen 3");
            groove_project_name(name);
            CHECK(memcmp(name, "VERSION TRE ", 12) == 0 && live_project.tempo == 150,
                  "gen 3 must be intact");
        }
    }
}

/* ---- Test 3: Stale Staging & Transient BUSY/IO Retries ---- */
static void test_stale_staging_and_transient_busy(void)
{
    flash_reset();
    reset_runtime();

    /* Save gen 1 then gen 2 to slot 1 */
    make_valid_project(&live_project, "GEN ONE     ", 100);
    groove_project_metadata(&live_project);
    CHECK(groove_project_save_slot(1) == 0, "save gen 1");
    /* Snapshot gen 1 from target */
    uint8_t gen1_sector[FM1_FLASH_SECTOR_BYTES];
    memcpy(gen1_sector, flash_mem + 1 * FM1_FLASH_SECTOR_BYTES, FM1_FLASH_SECTOR_BYTES);

    make_valid_project(&live_project, "GEN TWO     ", 130);
    groove_project_metadata(&live_project);
    CHECK(groove_project_save_slot(1) == 0, "save gen 2");

    /* Plant stale gen 1 in staging sector */
    memcpy(flash_mem + T_STAGING_SECTOR * FM1_FLASH_SECTOR_BYTES, gen1_sector, FM1_FLASH_SECTOR_BYTES);

    reset_runtime();
    CHECK(groove_project_load_slot(1) == 0, "load with stale staging");
    char name[13];
    groove_project_name(name);
    CHECK(memcmp(name, "GEN TWO     ", 12) == 0, "must choose newer target over stale staging");
    CHECK(groove_storage_prepare() == 0, "recover_staging must not regress target to stale gen 1");
    CHECK(groove_project_load_slot(1) == 0, "load after recover_staging");
    groove_project_name(name);
    CHECK(memcmp(name, "GEN TWO     ", 12) == 0, "target must still be gen 2");

    /* Transient FM1_FLASH_BUSY during boot poll must retry on next poll */
    reset_runtime();
    fault_arm(1, FAULT_READ_FAIL, FM1_FLASH_BUSY, 0);
    groove_project_poll();
    CHECK(fault.triggered, "boot poll hit transient BUSY");
    fault_clear();
    groove_project_poll();
    /* Should now complete cleanly without error */
    CHECK(groove_settings_status() == 0, "boot poll recovers after transient BUSY");
}

/* ---- Test 4: Absent vs Corrupt Optional Tuning & Session Settings ---- */
static void test_tuning_absent_vs_corrupt(void)
{
    flash_reset();
    reset_runtime();

    /* Save project to slot 0 with all-zero tuning */
    make_valid_project(&live_project, "TUNED PROJ  ", 120);
    groove_project_metadata(&live_project);
    CHECK(groove_project_save_slot(0) == 0, "save slot 0");

    /* Erase tuning sector completely (genuinely absent) */
    memset(flash_mem + GROOVE_TUNING_OFFSET, 0xff, FM1_FLASH_SECTOR_BYTES);
    /* Set non-zero tuning in RAM to prove absent tuning resets to zero default */
    live_tuning[0].main[0] = 25;
    CHECK(groove_project_load_slot(0) == 0, "absent tuning sector must load with default zero");
    CHECK(live_tuning[0].main[0] == 0, "absent tuning must apply 12-TET zero default");

    /* Save real non-zero tuning */
    live_tuning[0].main[3] = 17;
    live_tuning[1].alt[5] = -23;
    CHECK(groove_project_save_slot(0) == 0, "save slot 0 with tuning");
    memset(live_tuning, 0, sizeof live_tuning);
    CHECK(groove_project_load_slot(0) == 0, "load slot 0 with valid tuning");
    CHECK(live_tuning[0].main[3] == 17 && live_tuning[1].alt[5] == -23, "valid tuning restored");

    /* Corrupt slot 0's tuning entry CRC -> MUST return GROOVE_PROJECT_INVALID, NOT 0! */
    uint8_t corrupt_tuning[FM1_FLASH_SECTOR_BYTES];
    flash_mem[GROOVE_TUNING_OFFSET + offsetof(struct t_tuning_sector, entry) + 10] ^= 0x40;
    memcpy(corrupt_tuning, flash_mem + GROOVE_TUNING_OFFSET, FM1_FLASH_SECTOR_BYTES);

    int r = groove_project_load_slot(0);
    CHECK(r == GROOVE_PROJECT_INVALID, "corrupt slot tuning entry must return GROOVE_PROJECT_INVALID");

    /* Corrupt tuning sector header -> load AND save must both report GROOVE_PROJECT_INVALID
     * and NOT silently wipe the tuning sector! */
    flash_mem[GROOVE_TUNING_OFFSET] ^= 0x01;
    memcpy(corrupt_tuning, flash_mem + GROOVE_TUNING_OFFSET, FM1_FLASH_SECTOR_BYTES);

    r = groove_project_load_slot(0);
    CHECK(r == GROOVE_PROJECT_INVALID, "corrupt tuning header must fail load with GROOVE_PROJECT_INVALID");

    r = groove_project_save_slot(1);
    CHECK(r == GROOVE_PROJECT_INVALID, "corrupt tuning header must prevent tuning_save from wiping sector");
    CHECK(memcmp(corrupt_tuning, flash_mem + GROOVE_TUNING_OFFSET, FM1_FLASH_SECTOR_BYTES) == 0,
          "corrupt tuning sector must NOT be silently wiped");
}

/* ---- Test 5: Legacy v1 Tuning Migration (Valid, Missing, Corrupt, Interrupted) ---- */
static void test_legacy_v1_tuning_migration(void)
{
    /* 5a: Valid v1 tuning + missing slot + fault injection at every boundary */
    for (unsigned step = 1; step <= 10; ++step) {
        flash_reset();
        reset_runtime();

        /* Save valid project to slot 0, leave slot 1 empty */
        make_valid_project(&live_project, "V1 TUNED    ", 124);
        groove_project_metadata(&live_project);
        CHECK(groove_project_save_slot(0) == 0, "save slot 0");

        /* Read slot 0 header to construct a valid v1 tuning sector */
        struct t_header hdr;
        memcpy(&hdr, flash_mem, sizeof hdr);
        struct t_tuning_sector v1;
        memset(&v1, 0xff, sizeof v1);
        v1.magic = T_TUNING_MAGIC;
        v1.version = 1;
        v1.entry[0].key = hdr.generation;
        memset(v1.entry[0].t, 0, sizeof v1.entry[0].t);
        v1.entry[0].t[0].main[2] = 33;
        v1.entry[0].crc = legacy_tuning_crc(hdr.generation, v1.entry[0].t, hdr.crc);
        memcpy(flash_mem + GROOVE_TUNING_OFFSET, &v1, sizeof v1);

        /* Trigger migration via settings save with fault injection at `step` */
        groove_settings_clock(GROOVE_CLOCK_MIDI);
        sim_now_ms += 2000;
        fault_arm(step, FAULT_WRITE_PARTIAL, FM1_FLASH_IO, 13);
        groove_project_poll();
        int hit = fault.triggered;
        fault_clear();
        if (!hit)
            break;

        /* After interruption, reboot and load slot 0: tuning MUST still be intact (+33)! */
        reset_runtime();
        CHECK(groove_project_load_slot(0) == 0, "slot 0 must load after interrupted v1->v2 migration");
        CHECK(live_tuning[0].main[2] == 33, "v1 tuning must never be lost during interrupted migration");

        /* Retry migration cleanly and verify v2 on flash */
        groove_settings_clock(GROOVE_CLOCK_MIDI);
        sim_now_ms += 2000;
        groove_project_poll();
        CHECK(groove_settings_status() == 0, "migration completes cleanly on retry");
        uint32_t ver = 0;
        memcpy(&ver, flash_mem + GROOVE_TUNING_OFFSET + 4, 4);
        CHECK(ver == 2, "tuning sector upgraded to version 2");
        reset_runtime();
        CHECK(groove_project_load_slot(0) == 0, "load slot 0 after v2 migration");
        CHECK(live_tuning[0].main[2] == 33, "v2 migrated tuning matches original v1 value");
    }

    /* 5b: Corrupt v1 entry for an existing project must NOT be silently erased! */
    flash_reset();
    reset_runtime();
    make_valid_project(&live_project, "V1 CORRUPT  ", 124);
    groove_project_metadata(&live_project);
    CHECK(groove_project_save_slot(0) == 0, "save slot 0");

    struct t_header hdr;
    memcpy(&hdr, flash_mem, sizeof hdr);
    struct t_tuning_sector v1;
    memset(&v1, 0xff, sizeof v1);
    v1.magic = T_TUNING_MAGIC;
    v1.version = 1;
    v1.entry[0].key = hdr.generation;
    memset(v1.entry[0].t, 0, sizeof v1.entry[0].t);
    v1.entry[0].t[0].main[2] = 33;
    v1.entry[0].crc = legacy_tuning_crc(hdr.generation, v1.entry[0].t, hdr.crc) ^ 0xFF; /* Corrupt CRC */
    memcpy(flash_mem + GROOVE_TUNING_OFFSET, &v1, sizeof v1);

    groove_settings_clock(GROOVE_CLOCK_MIDI);
    sim_now_ms += 2000;
    groove_project_poll();
    CHECK(groove_settings_status() == GROOVE_PROJECT_INVALID,
          "corrupt v1 tuning entry must fail migration with GROOVE_PROJECT_INVALID");
    uint32_t ver = 0;
    memcpy(&ver, flash_mem + GROOVE_TUNING_OFFSET + 4, 4);
    CHECK(ver == 1, "corrupt v1 tuning sector must NOT be erased/overwritten");
}

/* ---- Test 6: Legacy v4 Project Record & Legacy Tuning Journal ---- */
static void test_legacy_records_and_journal(void)
{
    flash_reset();
    reset_runtime();

    /* Build a valid legacy v4 project record in slot 3 */
    struct {
        struct t_header header;
        struct groove_project project;
        struct t_settings settings;
    } rec;
    memset(&rec, 0, sizeof rec);
    make_valid_project(&rec.project, "LEGACY V4   ", 115);
    rec.project.sequence.version = 3; /* Legacy v4 project uses sequence version 3 */
    rec.header.magic = T_LEGACY_PROJECT_MAGIC;
    rec.header.generation = 7;
    rec.header.target = 3;
    rec.header.commit = 0;
    uint32_t crc = groove_crc32(~0U, &rec.header, offsetof(struct t_header, crc));
    crc = groove_crc32(crc, &rec.settings, 4);
    crc = groove_crc32(crc, &rec.project, GROOVE_PROJECT_LEGACY_BYTES);
    rec.header.crc = ~crc;

    uint32_t base = 3 * FM1_FLASH_SECTOR_BYTES;
    memcpy(flash_mem + base, &rec.header, sizeof rec.header);
    memcpy(flash_mem + base + sizeof rec.header, &rec.project, GROOVE_PROJECT_LEGACY_BYTES);
    memcpy(flash_mem + base + sizeof rec.header + GROOVE_PROJECT_LEGACY_BYTES, &rec.settings, 4);

    CHECK(groove_project_load_slot(3) == 0, "valid legacy v4 project loads");
    char name[13];
    groove_project_name(name);
    CHECK(memcmp(name, "LEGACY V4   ", 12) == 0 && live_project.sequence.version == 4,
          "legacy v4 upgraded to sequence.version 4 in RAM");

    /* Corrupt legacy v4 -> GROOVE_PROJECT_INVALID */
    flash_mem[base + 64] ^= 0x01;
    CHECK(groove_project_load_slot(3) == GROOVE_PROJECT_INVALID,
          "corrupt legacy v4 must return GROOVE_PROJECT_INVALID");

    /* Legacy tuning journal in staging with non-0xFF garbage right after legacy payload */
    flash_reset();
    reset_runtime();
    struct t_tuning_sector legacy_ts;
    memset(&legacy_ts, 0xff, sizeof legacy_ts);
    legacy_ts.magic = T_TUNING_MAGIC;
    legacy_ts.version = 2;
    unsigned legacy_bytes = offsetof(struct t_tuning_sector, session);
    struct t_tuning_journal tj;
    tj.magic = T_LEGACY_TUNING_JOURNAL_MAGIC;
    tj.crc = ~groove_crc32(~0U, &legacy_ts, legacy_bytes);
    tj.commit = 0;

    uint32_t stage_addr = T_STAGING_SECTOR * FM1_FLASH_SECTOR_BYTES;
    memcpy(flash_mem + stage_addr, &tj, sizeof tj);
    memcpy(flash_mem + stage_addr + sizeof tj, &legacy_ts, legacy_bytes);
    /* Plant invalid session garbage immediately after legacy journal body */
    uint32_t bad_session_magic = 0x12345678U;
    memcpy(flash_mem + stage_addr + sizeof tj + legacy_bytes, &bad_session_magic, 4);

    /* Boot poll calls session_settings_load; must NOT fail on bytes past legacy journal! */
    groove_project_poll();
    CHECK(groove_settings_status() == 0,
          "session_settings_load must ignore bytes past LEGACY_TUNING_JOURNAL_MAGIC");

    /* Now plant corrupt session settings inside a real v2 tuning sector -> must report error */
    CHECK(groove_storage_prepare() == 0, "recover legacy journal to GROOVE_TUNING_OFFSET");
    flash_mem[GROOVE_TUNING_OFFSET + offsetof(struct t_tuning_sector, session)] = 0x42;
    reset_runtime();
    groove_project_poll();
    CHECK(groove_settings_status() == GROOVE_PROJECT_INVALID,
          "corrupt session settings in v2 tuning sector must report GROOVE_PROJECT_INVALID");
}

/* ---- Test 7: FM Library Bank Fault Injection ---- */
static void test_fm_library_fault_injection(void)
{
    uint8_t bank_a[4096], bank_b[4096], readback[4096];
    memset(bank_a, 0x21, sizeof bank_a);
    memset(bank_b, 0x55, sizeof bank_b);

    for (unsigned step = 1; step <= 8; ++step) {
        flash_reset();
        reset_runtime();
        groove_fm_library_init();

        CHECK(groove_fm_library_write(0, bank_a) == 0, "initial FM bank 0 write");

        fault_arm(step, FAULT_WRITE_PARTIAL, FM1_FLASH_IO, 19);
        int r = groove_fm_library_write(0, bank_b);
        int hit = fault.triggered;
        fault_clear();
        if (!hit)
            break;
        CHECK(r == FM1_FLASH_IO, "FM library write fault returns FM1_FLASH_IO");

        /* Reboot and verify bank 0 is either intact bank_a or intact bank_b */
        groove_fm_library_init();
        CHECK(groove_fm_library_read(0, readback) == 0, "read bank 0 after power cut");
        int is_a = (memcmp(readback, bank_a, sizeof bank_a) == 0);
        int is_b = (memcmp(readback, bank_b, sizeof bank_b) == 0);
        CHECK(is_a || is_b, "FM bank 0 must be intact A or intact B after interrupted write");

        /* Recovery + fresh write must succeed */
        CHECK(groove_storage_prepare() == 0, "recover FM bank staging");
        CHECK(groove_fm_library_write(0, bank_b) == 0, "write bank_b after recovery");
        CHECK(groove_fm_library_read(0, readback) == 0, "read bank_b");
        CHECK(memcmp(readback, bank_b, sizeof bank_b) == 0, "bank_b verified");
    }
}

/* ---- Test 8: Tuning Commit & Session Settings Save Fault Injection ---- */
static void test_tuning_and_session_fault_injection(void)
{
    for (unsigned step = 1; step <= 10; ++step) {
        flash_reset();
        reset_runtime();

        /* Save initial project + tuning (+17) + track 0 role PLAY */
        make_valid_project(&live_project, "TUN COMMIT  ", 120);
        groove_project_metadata(&live_project);
        live_tuning[0].main[0] = 17;
        CHECK(groove_project_save_slot(0) == 0, "initial save with tuning +17");
        CHECK(groove_settings_track(0, 0, 1) == 0, "set track 0 role PLAY");
        sim_now_ms += 2000;
        groove_project_poll();
        CHECK(groove_settings_status() == 0, "initial session settings saved");

        /* Update tuning to +42 with fault injected at `step` */
        live_tuning[0].main[0] = 42;
        fault_arm(step, FAULT_WRITE_PARTIAL, FM1_FLASH_IO, 21);
        int r = groove_project_save_slot(0);
        int hit = fault.triggered;
        fault_clear();
        if (!hit)
            break;
        CHECK(r == FM1_FLASH_IO, "injected tuning commit fault returns FM1_FLASH_IO");

        /* Reboot and verify slot 0 loads with either +17 or +42, and session role intact */
        reset_runtime();
        groove_project_poll();
        CHECK(groove_settings_status() == 0, "boot session load clean after tuning fault");
        CHECK(live_role[0] == GROOVE_TRACK_PLAY, "session role preserved across tuning fault");
        CHECK(groove_project_load_slot(0) == 0, "slot 0 loads cleanly after tuning fault");
        CHECK(live_tuning[0].main[0] == 17 || live_tuning[0].main[0] == 42,
              "tuning must be intact old (+17) or new (+42)");

        /* Recovery retry must succeed */
        CHECK(groove_storage_prepare() == 0, "recover tuning staging");
    }
}

int main(void)
{
    test_blank_vs_corrupt_slot();
    test_project_save_fault_injection();
    test_stale_staging_and_transient_busy();
    test_tuning_absent_vs_corrupt();
    test_legacy_v1_tuning_migration();
    test_legacy_records_and_journal();
    test_fm_library_fault_injection();
    test_tuning_and_session_fault_injection();

    if (failures) {
        fprintf(stderr, "TOTAL FAILURES: %d\n", failures);
        return 1;
    }
    printf("ALL STORAGE FAULT-INJECTION TESTS PASSED\n");
    return 0;
}
