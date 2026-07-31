# Shared Header + Mobile Menu CSS — Design

**Date:** 2026-07-31
**Branch:** `feature/homepage-mobile-menu`
**Related:** PR #49 (homepage + mobile menu redesign), commit `02799ef`

## Goal

The header and mobile-menu CSS is hand-copied into the inline `<style>` block of
all 11 pages. Extract it into two shared stylesheets so there is one source of
truth, and add a test that makes the `900px` breakpoint impossible to drift.

PR #49 already showed how this class of duplication fails: the redesign replaced
the old `.nav-*` header with `.hdr-*` and removed the dead CSS from `index.html`,
but left it behind on the other ten pages. That was ~830 dead lines, cleaned up in
`02799ef`. Extraction removes the mechanism rather than the symptom.

## What is actually duplicated

Measured on `02799ef`:

| Block | Size per page | Copies | Identical? |
| --- | --- | --- | --- |
| Mobile menu CSS (`.mm-*`) | 273 lines / 8,188 bytes | 11 | Byte-identical across all 11 |
| Header CSS (`.hdr-*`) | ~225 lines | 11 | Identical except one value |
| "ROUND 1: wordmark" block | 4 lines | 11 | Byte-identical across all 11 |

The wordmark block sits *after* the menu CSS, separate from both other blocks, and
mixes concerns — `.hdr-word img` and a `@media (max-width: 639px)` override belong
to the header, `.mm-logo-word img` belongs to the menu. It is easy to miss; any
extraction that ignores it leaves `.hdr-`/`.mm-` rules inline on every page.

The only genuine per-page variation in ~500 duplicated lines is:

```css
html { scroll-padding-top: 110px; }  /* index.html — has the ticker */
html { scroll-padding-top: 76px;  }  /* the other ten pages */
```

The `900px` breakpoint appears as 3 real `@media (min-width: 900px)` declarations
per page (2 in the header block, 1 in the menu block). Across 11 pages that is
**33 declarations, plus the `DESKTOP` constant in `assets/js/mobile-menu.js` — 34
places, none enforced.**

(`index.html:2260` also contains `max-width: 900px`. That is an unrelated content
width, not a breakpoint, and is out of scope.)

## Why extraction, not a build step

Two code comments already assume these files exist:

- The header block: *"Pairs with assets/css/mobile-menu.css + assets/js/mobile-menu.js"* —
  that stylesheet has never existed.
- The menu block: *"this file owns the panel only"* — written as if already standalone.

`assets/css/newsletter.css` and `assets/js/newsletter.js` established the shared
external-asset pattern here (see the 2026-07-20 beehiiv spec). This follows it.

No build step, no framework, no `package.json` — the constraint from every prior
spec in this directory holds.

## Design

### File layout

- **`assets/css/header.css`** — the `.hdr-*` block: fixed wrapper, brand lockup,
  desktop nav, the `.hdr-burger` trigger, and the two desktop media queries.
- **`assets/css/mobile-menu.css`** — the `.mm-*` block: panel, tokens, links,
  focus styles, `body.mm-locked`, reduced-motion, and the desktop hide.

The wordmark block splits along the same seam: `.hdr-word img` and its
`@media (max-width: 639px)` override go to `header.css`, `.mm-logo-word img` goes
to `mobile-menu.css`. Nothing of it stays inline.

`639px` is a header-only breakpoint and lands in exactly one place after
extraction, so it is not part of the `900px` invariant test below.

Two files rather than one combined. The menu CSS pairs 1:1 with `mobile-menu.js`
and owns the panel; the header is a separate component that merely hosts the
trigger. Each is independently understandable, and both are cached across all 11
pages after the first request.

All 11 pages gain two `<link rel="stylesheet">` tags in `<head>` and lose ~500
lines of inline CSS each. Net change roughly **−5,300 lines**.

Relative paths differ by location: `assets/css/…` from the eight root pages,
`../assets/css/…` from the three `blog/` posts.

### The one varying value

`header.css` carries the default:

```css
html { scroll-padding-top: var(--hdr-scroll-offset, 76px); }
```

`index.html` overrides it in its own inline `<style>`, beside the ticker CSS that
causes the difference:

```css
:root { --hdr-scroll-offset: 110px; } /* 60px header + 34px ticker + 16px */
```

The shared file stays free of page-specific knowledge; the page that differs
declares why it differs.

### Breakpoint invariant

After extraction the `900px` value lives in exactly 4 places: two media queries
in `header.css`, one in `mobile-menu.css`, and `DESKTOP` in `mobile-menu.js`.

A test reads the `DESKTOP` constant out of the JS, extracts every
`@media (min-width: …)` from both stylesheets, and asserts all four agree. The
invariant becomes enforced rather than documented, and the `mobile-menu.js`
comment naming `mobile-menu.css` becomes true.

## Testing

Reusing the stylesheet-assertion pattern already in
`tests/newsletter-signup.test.mjs:49`:

1. All 11 pages link both stylesheets, with the correct relative path for their
   directory depth.
2. No page carries inline `.hdr-` or `.mm-` CSS rules. This is the anti-drift
   guard: a future copy-paste back into a page fails CI.

   The assertion must scope itself to the contents of `<style>` blocks. Every
   page carries an HTML comment in its markup — *"must stay a SIBLING of
   .hdr-wrap, never a child"* — and a naive whole-file regex matches it and fails
   for the wrong reason. That comment is load-bearing documentation of the
   `backdrop-filter` fix and must stay.

   Verified on `02799ef`: once the three blocks above are extracted, that comment
   is the *only* remaining `.hdr-`/`.mm-` occurrence outside them on all 11 pages.
3. The breakpoint invariant above.
4. `index.html` sets `--hdr-scroll-offset`; the other ten do not.

The existing 68 tests assert markup (`data-mm-open`, `class="hdr-wrap"`), not
CSS, so none should need changing. All 68 must stay green.

## Risks

**Flash of unstyled header.** Stylesheets in `<head>` are render-blocking, so
there should be none. Verify in the browser on a root page and a `blog/` page,
covering the fixed header, the desktop/mobile breakpoint switch, and the menu
open/close/scroll-lock cycle.

**First-paint cost.** One extra cached request against ~15KB less HTML per page
(measured: 15,206 bytes on the ten non-index pages, 15,239 on `index.html`; the
two stylesheets total 14.8KB and are cached across all 11).
Expected to be a wash or slightly better. PR #49 moved LCP 4.15s → 2.9s; this
should not regress it. The known render-blocking Google Fonts stylesheet
(~850ms) remains the dominant cost and stays out of scope.

## Out of scope

- The render-blocking Google Fonts stylesheet.
- Extracting any other duplicated per-page CSS (footer, buttons, typography).
- Any build step, template include, or framework.
- `index.html:2260`'s unrelated `max-width: 900px`.
