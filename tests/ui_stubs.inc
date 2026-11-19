/* Auto-generated exact-signature stubs for host UI test harness */
__attribute__((unused)) unsigned cfw_demo_current(void) { return 0; }
__attribute__((unused)) unsigned cfw_demo_duration_sec(unsigned id) { return 0; }
__attribute__((unused)) unsigned cfw_demo_elapsed_sec(void) { return 0; }
__attribute__((unused)) const char * cfw_demo_name(unsigned id) { return "OK"; }
__attribute__((unused)) unsigned cfw_demo_playing(void) { return 0; }
__attribute__((unused)) int cfw_demo_start(unsigned id) { return 0; }
__attribute__((unused)) void cfw_demo_stop(void) {}
__attribute__((unused)) void cfw_dsp_active_track_set(unsigned track) {}
__attribute__((unused)) unsigned cfw_dsp_engine_get(unsigned track) { return 0; }
__attribute__((unused)) const char * cfw_dsp_engine_name(unsigned engine) { return "OK"; }
__attribute__((unused)) void cfw_dsp_engine_set(unsigned track, unsigned engine) {}
__attribute__((unused)) void cfw_dsp_fx_edit(unsigned param, int delta) {}
__attribute__((unused)) FM1_AUDIO_CODE void cfw_dsp_fx_get(struct cfw_fx_state *out) { if (out) memset(out, 0, sizeof *out); }
__attribute__((unused)) void cfw_dsp_param_edit(unsigned track, unsigned idx, int delta) {}
__attribute__((unused)) unsigned cfw_dsp_param_get(unsigned track, unsigned idx) { return 0; }
__attribute__((unused)) const char * cfw_dsp_param_label(unsigned engine, unsigned idx) { return "OK"; }
__attribute__((unused)) const char * cfw_dsp_punch_name(unsigned mode) { return "OK"; }
__attribute__((unused)) void cfw_dsp_reset(void) {}
__attribute__((unused)) unsigned cfw_dsp_usb_rx_active(void) { return 0; }
__attribute__((unused)) unsigned cfw_dsp_usb_tx_active(void) { return 0; }
__attribute__((unused)) void cfw_learn_arm(unsigned target) {}
__attribute__((unused)) unsigned cfw_learn_armed_target(void) { return 0; }
__attribute__((unused)) void cfw_learn_clear(unsigned target) {}
__attribute__((unused)) int cfw_learn_get_cc(unsigned target) { return 0; }
__attribute__((unused)) const char * cfw_learn_target_name(unsigned target) { return "OK"; }
__attribute__((unused)) void cfw_scene_capture(unsigned scene_idx) {}
__attribute__((unused)) void cfw_scene_info(unsigned scene_idx, struct cfw_scene *out) {}
__attribute__((unused)) int cfw_scene_launch(unsigned scene_idx) { return 0; }
__attribute__((unused)) unsigned cfw_seq_active_bank(unsigned track) { return 0; }
__attribute__((unused)) void cfw_seq_cond_edit(unsigned track, unsigned step, int delta) {}
__attribute__((unused)) unsigned cfw_seq_cond_get(unsigned track, unsigned step) { return 0; }
__attribute__((unused)) const char * cfw_seq_cond_name(unsigned idx) { return "OK"; }
__attribute__((unused)) void cfw_seq_control_poll(void) {}
__attribute__((unused)) void cfw_seq_gen_acid(unsigned track, unsigned root_note, unsigned scale_mode, unsigned density, unsigned seed) {}
__attribute__((unused)) void cfw_seq_gen_euclidean(unsigned track, unsigned pulses, unsigned steps, unsigned rotate, unsigned note_or_pad) {}
__attribute__((unused)) void cfw_seq_get_step(unsigned track, unsigned step, struct groove_step *out) {}
__attribute__((unused)) void cfw_seq_prob_edit(unsigned track, unsigned step, int delta) {}
__attribute__((unused)) unsigned cfw_seq_prob_get(unsigned track, unsigned step) { return 0; }
__attribute__((unused)) const char * cfw_seq_prob_name(unsigned idx) { return "OK"; }
__attribute__((unused)) void cfw_seq_ratchet_edit(unsigned track, unsigned step, int delta) {}
__attribute__((unused)) unsigned cfw_seq_ratchet_get(unsigned track, unsigned step) { return 0; }
__attribute__((unused)) const char * cfw_seq_scale_name(unsigned scale_mode) { return "OK"; }
__attribute__((unused)) void cfw_seq_set_step(unsigned track, unsigned step, unsigned note, unsigned vel, uint16_t drums) {}
__attribute__((unused)) int cfw_seq_step_chord(unsigned track, unsigned step, const uint8_t *notes, unsigned count, unsigned velocity) { return 0; }
__attribute__((unused)) int cfw_slicer_apply(void) { return 0; }
__attribute__((unused)) void cfw_slicer_edit(unsigned param, int delta) {}
__attribute__((unused)) int cfw_slicer_gen_groove(unsigned track) { return 0; }
__attribute__((unused)) void cfw_slicer_get(struct cfw_slicer_cfg *out) {}
__attribute__((unused)) int cfw_slicer_restore(void) { return 0; }
__attribute__((unused)) void fm1_audio_stats_read(struct fm1_audio_stats *stats) {}
__attribute__((unused)) int fm1_ble_connect(unsigned index) { return 0; }
__attribute__((unused)) int fm1_ble_disconnect(void) { return 0; }
__attribute__((unused)) int fm1_ble_forget_bonds(void) { return 0; }
__attribute__((unused)) int fm1_ble_get_device(unsigned index, struct fm1_ble_device *device) { return 0; }
__attribute__((unused)) void fm1_ble_get_status(struct fm1_ble_status *status) {}
__attribute__((unused)) int fm1_ble_scan(void) { return 0; }
__attribute__((unused)) void fm1_bluetooth_get_status(struct fm1_bluetooth_status *status) {}
__attribute__((unused)) void fm1_controls_init(void) {}
__attribute__((unused)) FM1_AUDIO_CODE unsigned fm1_engine_output_level(void) { return 0; }
__attribute__((unused)) void fm1_engine_stats_read(struct fm1_engine_stats *output) {}
__attribute__((unused)) void fm1_led_set(unsigned key, int on) {}
__attribute__((unused)) void groove_adsr_edit(unsigned track, unsigned parameter, int delta) {}
__attribute__((unused)) void groove_adsr_enable(unsigned track, int enabled) {}
__attribute__((unused)) void groove_arp_edit(unsigned track, unsigned parameter, int delta) {}
__attribute__((unused)) unsigned groove_arp_enabled(unsigned track) { return 0; }
__attribute__((unused)) void groove_arp_set(unsigned track, unsigned enabled) {}
__attribute__((unused)) unsigned groove_arp_setting(unsigned track, unsigned parameter) { return 0; }
__attribute__((unused)) void groove_audio_stats(struct fm1_render_stats *stats) {}
__attribute__((unused)) FM1_DSP_CODE unsigned groove_clock_mode(void) { return 0; }
__attribute__((unused)) void groove_control_edit(unsigned track, int program_steps, int volume_steps, int cutoff_steps) {}
__attribute__((unused)) unsigned groove_delay_ticks(void) { return 0; }
__attribute__((unused)) uint64_t groove_drum_steps(unsigned track, unsigned drum) { return 0; }
__attribute__((unused)) unsigned groove_edit_clipboard_count(void) { return 0; }
__attribute__((unused)) int groove_edit_copy(unsigned track, unsigned step, unsigned scope) { return 0; }
__attribute__((unused)) unsigned groove_edit_cursor(void) { return 0; }
__attribute__((unused)) unsigned groove_edit_error(void) { return 0; }
__attribute__((unused)) int groove_edit_paste(unsigned track, unsigned step, unsigned scope) { return 0; }
__attribute__((unused)) void groove_edit_record(unsigned enabled, unsigned track, unsigned step) {}
__attribute__((unused)) FM1_DSP_CODE unsigned groove_edit_recording(void) { return 0; }
__attribute__((unused)) int groove_edit_repeat(unsigned track, unsigned steps) { return 0; }
__attribute__((unused)) void groove_edit_seek(unsigned track, unsigned step) {}
__attribute__((unused)) void groove_effects_edit(unsigned parameter, int delta) {}
__attribute__((unused)) void groove_effects_get(uint8_t values[4]) {}
__attribute__((unused)) int groove_factory_load(unsigned index) { return 0; }
__attribute__((unused)) const char * groove_factory_name(unsigned index) { return "OK"; }
__attribute__((unused)) void groove_fm_edit(unsigned track, unsigned parameter, int delta) {}
__attribute__((unused)) void groove_fm_name_edit(unsigned track, unsigned character, char value) {}
__attribute__((unused)) unsigned groove_key_note(unsigned track, unsigned key, int octave) { return 0; }
__attribute__((unused)) void groove_lfo_copy(unsigned track, uint8_t values[4]) {}
__attribute__((unused)) void groove_lfo_edit(unsigned track, unsigned parameter, int delta) {}
__attribute__((unused)) unsigned groove_lfo_rate(unsigned value) { return 0; }
__attribute__((unused)) const char * groove_lock_parameter_name(unsigned track, unsigned parameter) { return "OK"; }
__attribute__((unused)) int groove_master_update(unsigned adc) { return 0; }
__attribute__((unused)) uint32_t groove_midi_dropped(void) { return 0; }
__attribute__((unused)) FM1_DSP_CODE unsigned groove_midi_input_channel(unsigned track) { return 0; }
__attribute__((unused)) int groove_midi_local(const uint8_t *message, size_t bytes) { return 0; }
__attribute__((unused)) unsigned groove_midi_setting(unsigned track, unsigned parameter) { return 0; }
__attribute__((unused)) void groove_mono_set(unsigned track, unsigned mono) {}
__attribute__((unused)) void groove_operator_toggle(unsigned track, unsigned op) {}
__attribute__((unused)) FM1_DSP_CODE unsigned groove_pad_count(unsigned track) { return 0; }
__attribute__((unused)) FM1_DSP_CODE int groove_pad_index(unsigned track, unsigned note) { return 0; }
__attribute__((unused)) const char * groove_pad_label(unsigned track, unsigned pad) { return "OK"; }
__attribute__((unused)) const char * groove_pad_name(unsigned track, unsigned pad) { return "OK"; }
__attribute__((unused)) FM1_DSP_CODE unsigned groove_pad_note(unsigned track, unsigned pad) { return 0; }
__attribute__((unused)) int groove_project_info(unsigned slot, char name[13]) { return 0; }
__attribute__((unused)) int groove_project_load_slot(unsigned slot) { return 0; }
__attribute__((unused)) void groove_project_rename(unsigned character, char value) {}
__attribute__((unused)) uint32_t groove_project_revision(void) { return 0; }
__attribute__((unused)) int groove_project_save_slot(unsigned slot) { return 0; }
__attribute__((unused)) unsigned groove_project_slot(void) { return 0; }
__attribute__((unused)) int groove_samples_entry_info(unsigned slot, unsigned *frames, char name_out[16]) { return 0; }
__attribute__((unused)) void groove_sends_edit(unsigned track, unsigned parameter, int delta) {}
__attribute__((unused)) void groove_sends_get(unsigned track, uint8_t values[2]) {}
__attribute__((unused)) const char * groove_sequence_chord_name(unsigned id) { return "OK"; }
__attribute__((unused)) unsigned groove_sequence_count_in(void) { return 0; }
__attribute__((unused)) void groove_sequence_edit(unsigned track, unsigned step, unsigned note, unsigned velocity) {}
__attribute__((unused)) unsigned groove_sequence_rewound(void) { return 0; }
__attribute__((unused)) unsigned groove_sequence_setting(unsigned setting) { return 0; }
__attribute__((unused)) void groove_sequence_setting_edit(unsigned setting, int delta) {}
__attribute__((unused)) void groove_settings_clock(unsigned mode) {}
__attribute__((unused)) void groove_settings_midi(unsigned track, unsigned parameter, int delta) {}
__attribute__((unused)) int groove_settings_radio(unsigned flags, unsigned role) { return 0; }
__attribute__((unused)) unsigned groove_settings_radio_flags(void) { return 0; }
__attribute__((unused)) unsigned groove_settings_role_value(void) { return 0; }
__attribute__((unused)) int groove_settings_status(void) { return 0; }
__attribute__((unused)) int groove_settings_track(unsigned track, unsigned parameter, int delta) { return 0; }
__attribute__((unused)) unsigned groove_step_setting(unsigned track, unsigned step, unsigned setting) { return 0; }
__attribute__((unused)) int groove_step_setting_edit(unsigned track, unsigned step, unsigned setting, int delta) { return 0; }
__attribute__((unused)) void groove_tempo_edit(int delta) {}
__attribute__((unused)) int groove_tempo_tap(uint32_t now) { return 0; }
__attribute__((unused)) int groove_timbre_export(unsigned track, uint8_t *data, unsigned capacity) { return 0; }
__attribute__((unused)) int groove_timbre_import(unsigned track, const uint8_t *data, unsigned bytes) { return 0; }
__attribute__((unused)) unsigned groove_tone_count(unsigned track, unsigned part) { return 0; }
__attribute__((unused)) void groove_tone_edit(unsigned track, unsigned part, unsigned parameter, int delta) {}
__attribute__((unused)) const fm1_param_t * groove_tone_parameter(unsigned track, unsigned part, unsigned parameter) { return NULL; }
__attribute__((unused)) FM1_DSP_CODE unsigned groove_track_role(unsigned track) { return 0; }
