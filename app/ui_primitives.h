/* SPDX-License-Identifier: GPL-3.0-only WITH GPL-3.0-linking-exception
 * Reusable zero-allocation 240x240 RGB565 UI primitives for M-VAVE FM-1.
 * All drawing uses integer math and routes through paint_fill/text/frame/line
 * so it integrates directly with the non-blocking 16-row SPI1 band DMA. */
#pragma once

static inline unsigned ui_pct_from_text(const char *s)
{
    if (!s || !*s) return 0U;
    if (s[0] == 'O' && s[1] == 'F' && s[2] == 'F') return 0U;
    if (s[0] == 'O' && s[1] == 'N' && !s[2]) return 100U;
    int neg = 0, val = 0, digits = 0;
    const char *p = s;
    if (*p == '-' || *p == '+') { neg = (*p == '-'); ++p; }
    while (*p >= '0' && *p <= '9') {
        val = val * 10 + (*p - '0');
        ++digits;
        ++p;
    }
    if (!digits) return 50U;
    if (neg) val = -val;
    if (*p == '%') {
        if (val < 0) return 0U;
        return val > 100 ? 100U : (unsigned)val;
    }
    if (val < 0) {
        int mapped = 50 + (val * 50) / 64;
        return mapped < 0 ? 0U : (unsigned)mapped;
    }
    if (val <= 100) return (unsigned)val;
    if (val <= 127) return (unsigned)((val * 100) / 127);
    if (val <= 255) return (unsigned)((val * 100) / 255);
    return 100U;
}

static void ui_progress_bar(unsigned x, unsigned y, unsigned w, unsigned h,
                            unsigned pct, uint16_t fg, uint16_t bg)
{
    if (w < 2U || h < 2U) return;
    if (paint_rendering && (y >= paint_top + PAINT_ROWS || y + h <= paint_top)) return;
    if (pct > 100U) pct = 100U;
    paint_fill(x, y, w, h, bg);
    unsigned fill = (w * pct + 50U) / 100U;
    if (fill > w) fill = w;
    if (fill) paint_fill(x, y, fill, h, fg);
}

static void ui_tab_bar(unsigned y, const char *const *labels, unsigned count,
                       unsigned active, uint16_t accent)
{
    if (!labels || !count) return;
    if (paint_rendering && (y >= paint_top + PAINT_ROWS || y + 16U <= paint_top)) return;
    paint_fill(0, y, FM1_SCREEN_WIDTH, 16U, BACK);
    paint_fill(0, y + 15U, FM1_SCREEN_WIDTH, 1U, PANEL);
    unsigned slot_w = (FM1_SCREEN_WIDTH - 12U) / count;
    for (unsigned i = 0; i < count; ++i) {
        unsigned x = 6U + i * slot_w;
        unsigned w = slot_w - 4U;
        unsigned sel = (i == active);
        uint16_t bg = sel ? accent : PANEL;
        uint16_t fg = sel ? BACK : DIM;
        paint_fill(x, y + 1U, w, 13U, bg);
        if (labels[i]) {
            unsigned n = (unsigned)strlen(labels[i]);
            unsigned tw = n * 6U;
            unsigned tx = tw < w ? x + (w - tw) / 2U : x + 2U;
            text(tx, y + 4U, labels[i], 1U, fg, bg);
        }
    }
}

static void ui_adsr_graph(unsigned x, unsigned y, unsigned w, unsigned h,
                          unsigned atk, unsigned dec, unsigned sus, unsigned rel,
                          uint16_t accent)
{
    if (w < 24U || h < 16U) return;
    if (paint_rendering && (y >= paint_top + PAINT_ROWS || y + h <= paint_top)) return;
    paint_fill(x, y, w, h, BACK);
    frame(x, y, w, h, PANEL);
    unsigned top_pad = h >= 36U ? 13U : 4U;
    unsigned inner_w = w - 8U;
    unsigned inner_h = h - top_pad - 4U;
    unsigned x0 = x + 4U;
    unsigned y_bot = y + h - 4U;
    unsigned y_top = y + top_pad;

    if (atk > 100U) atk = 100U;
    if (dec > 100U) dec = 100U;
    if (sus > 100U) sus = 100U;
    if (rel > 100U) rel = 100U;

    unsigned seg_a = 3U + (inner_w * 24U * atk) / 10000U;
    unsigned seg_d = 4U + (inner_w * 26U * dec) / 10000U;
    unsigned seg_r = 4U + (inner_w * 26U * rel) / 10000U;
    unsigned used = seg_a + seg_d + seg_r;
    unsigned seg_s = used + 8U < inner_w ? inner_w - used : 8U;
    if (used + seg_s > inner_w) {
        seg_r = inner_w > (seg_a + seg_d + seg_s) ? inner_w - (seg_a + seg_d + seg_s) : 2U;
    }

    unsigned x1 = x0 + seg_a;
    unsigned x2 = x1 + seg_d;
    unsigned x3 = x2 + seg_s;
    unsigned x4 = x3 + seg_r;
    if (x4 > x0 + inner_w) x4 = x0 + inner_w;
    unsigned y_sus = y_bot - (inner_h * sus) / 100U;

    /* Subtle baseline + sustain guide */
    paint_fill(x0, y_bot, inner_w, 1U, PANEL);
    /* Crisp 2px-thick ADSR polyline using integer Bresenham line() */
    line((int)x0, (int)y_bot, (int)x1, (int)y_top, accent);
    line((int)x0, (int)y_bot - 1, (int)x1, (int)y_top + 1, accent);
    line((int)x1, (int)y_top, (int)x2, (int)y_sus, accent);
    line((int)x2, (int)y_sus, (int)x3, (int)y_sus, GREEN);
    line((int)x3, (int)y_sus, (int)x4, (int)y_bot, AMBER);
    /* Control node dots */
    paint_fill(x1 > 1U ? x1 - 1U : x1, y_top, 3U, 3U, TEXT);
    paint_fill(x2 > 1U ? x2 - 1U : x2, y_sus > 1U ? y_sus - 1U : y_sus, 3U, 3U, TEXT);
    paint_fill(x3 > 1U ? x3 - 1U : x3, y_sus > 1U ? y_sus - 1U : y_sus, 3U, 3U, TEXT);
}

static void ui_toast_bar(const char *msg, uint16_t color)
{
    if (!msg || !*msg) return;
    unsigned y = 171U;
    if (paint_rendering && (y >= paint_top + PAINT_ROWS || y + 15U <= paint_top)) return;
    paint_fill(6U, y, FM1_SCREEN_WIDTH - 12U, 15U, color);
    frame(6U, y, FM1_SCREEN_WIDTH - 12U, 15U, TEXT);
    text(12U, y + 4U, msg, 1U, BACK, color);
}

static void ui_confirm_modal(const char *title, const char *line1, const char *line2,
                             const char *yes_lbl, const char *no_lbl)
{
    unsigned x = 18U, y = 62U, w = 204U, h = 104U;
    if (paint_rendering && (y >= paint_top + PAINT_ROWS || y + h <= paint_top)) return;
    paint_fill(x, y, w, h, BACK);
    frame(x, y, w, h, AMBER);
    frame(x + 1U, y + 1U, w - 2U, h - 2U, AMBER);
    paint_fill(x + 2U, y + 2U, w - 4U, 18U, AMBER);
    text(x + 8U, y + 7U, title ? title : "CONFIRM ACTION", 1U, BACK, AMBER);
    if (line1) text(x + 10U, y + 30U, line1, 1U, TEXT, BACK);
    if (line2) text(x + 10U, y + 46U, line2, 1U, DIM, BACK);
    /* Action pills */
    paint_fill(x + 10U, y + 72U, 88U, 20U, GREEN);
    text(x + 16U, y + 79U, yes_lbl ? yes_lbl : "SAVE: YES", 1U, BACK, GREEN);
    paint_fill(x + 106U, y + 72U, 88U, 20U, PANEL);
    frame(x + 106U, y + 72U, 88U, 20U, DIM);
    text(x + 114U, y + 79U, no_lbl ? no_lbl : "HOME: NO", 1U, TEXT, PANEL);
}
