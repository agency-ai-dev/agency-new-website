# Shared Header + Mobile Menu CSS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the header and mobile-menu CSS out of the inline `<style>` block on all 11 pages into two shared stylesheets, and add a test that makes the `900px` breakpoint impossible to drift.

**Architecture:** Extract the three duplicated CSS blocks (header, mobile menu, wordmark) into `assets/css/header.css` and `assets/css/mobile-menu.css`, linked from every page. The single per-page difference — the scroll offset, which is larger on `index.html` because of the ticker — becomes a CSS custom property with a default in the shared file and one override on `index.html`. A new test file pins the breakpoint across both stylesheets and the menu JS, and fails CI if header/menu CSS is ever pasted back inline.

**Tech Stack:** Static HTML/CSS/JS on Vercel. Tests use Node's built-in runner (`node:test`, `node:assert/strict`). Python 3 is used for the one-off extraction scripts. No build step, no framework, no `package.json`.

**Spec:** `docs/superpowers/specs/2026-07-31-shared-header-menu-css-design.md`

## Global Constraints

- No build step, no framework, no `package.json`. Static `.html` files deployed on Vercel.
- Tests run with `node --test tests/*.test.mjs`. All 68 existing tests must stay green.
- The 11 pages carrying the shared header are exactly: `index.html`, `about.html`, `blog.html`, `pricing.html`, `partners.html`, `cookie-policy.html`, `privacy-policy.html`, `terms-of-service.html`, `blog/2026-01-01-facebook-instagram-shopify-setup.html`, `blog/2026-04-20-vapor95-meta-ads-case-study.html`, `blog/2026-05-21-google-youtube-shopify-setup.html`.
- Stylesheet href is `assets/css/…` from the eight root pages and `../assets/css/…` from the three `blog/` posts.
- Desktop breakpoint is `900px`. It must be identical in `header.css`, `mobile-menu.css`, and the `DESKTOP` constant in `assets/js/mobile-menu.js`.
- `639px` is a header-only wordmark breakpoint and is deliberately NOT part of the `900px` invariant.
- Scroll offset: `76px` default for pages with no ticker; `110px` on `index.html` (60px header + 34px ticker + 16px breathing room).
- The HTML comment *"must stay a SIBLING of .hdr-wrap, never a child"* is load-bearing documentation of the `backdrop-filter` fix from PR #8. It stays in the markup on every page and must not be deleted.

## File Structure

**Create:**
- `assets/css/header.css` — the `.hdr-*` block: fixed wrapper, brand lockup, desktop nav, `.hdr-burger` trigger, the two `900px` desktop media queries, the scroll-offset default, and the `.hdr-word img` wordmark rules. Expected: **248 lines**.
- `assets/css/mobile-menu.css` — the `.mm-*` block: panel, tokens, links, focus styles, `body.mm-locked`, reduced-motion, the `900px` desktop hide, and `.mm-logo-word img`. Expected: **276 lines**.
- `tests/site-chrome.test.mjs` — link assertions, the anti-drift scan, and the breakpoint invariant.

**Modify:**
- All 11 pages: delete the three inline blocks, add two `<link>` tags before `<style>`. `index.html` additionally gains a `:root { --hdr-scroll-offset: 110px; }` declaration.

**Expected net change:** pages drop from 14,889 to 9,214 lines (−5,675); the two stylesheets add 524. **Net −5,151 lines.**

---

### Task 1: Build the two shared stylesheets

Additive only — no page is touched in this task, so the site is unchanged and cannot break.

**Files:**
- Create: `assets/css/header.css`
- Create: `assets/css/mobile-menu.css`
- Create: `tests/site-chrome.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces: `assets/css/header.css` defining `html { scroll-padding-top: var(--hdr-scroll-offset, 76px); }` plus all `.hdr-*` rules; `assets/css/mobile-menu.css` defining all `.mm-*` rules. Task 2 links both files. Task 3 reads both for the breakpoint invariant.

- [ ] **Step 1: Write the failing test**

Create `tests/site-chrome.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

const headerCss = read('../assets/css/header.css');
const menuCss = read('../assets/css/mobile-menu.css');

test('header.css owns the header rules', () => {
  assert.match(headerCss, /\.hdr-wrap\s*\{/, 'missing .hdr-wrap');
  assert.match(headerCss, /\.hdr-nav\b/, 'missing .hdr-nav');
  assert.match(headerCss, /\.hdr-burger\b/, 'missing the menu trigger styles');
  assert.match(headerCss, /\.hdr-word img\b/, 'missing the wordmark artwork rule');
});

test('header.css defaults the scroll offset for pages without a ticker', () => {
  assert.match(headerCss, /scroll-padding-top:\s*var\(--hdr-scroll-offset,\s*76px\)/);
  assert.doesNotMatch(headerCss, /scroll-padding-top:\s*110px/,
    'the ticker offset belongs on index.html, not in the shared file');
});

test('mobile-menu.css owns the panel rules', () => {
  assert.match(menuCss, /\.mm-panel\s*\{/, 'missing .mm-panel');
  assert.match(menuCss, /body\.mm-locked\s*\{/, 'missing the scroll lock');
  assert.match(menuCss, /@media \(prefers-reduced-motion: reduce\)/, 'missing the reduced-motion guard');
  assert.match(menuCss, /\.mm-logo-word img\b/, 'missing the wordmark artwork rule');
});

test('the two stylesheets do not overlap', () => {
  assert.doesNotMatch(headerCss, /\.mm-[\w-]+\s*[,{]/, 'header.css must not style the panel');
  assert.doesNotMatch(menuCss, /\.hdr-[\w-]+\s*[,{]/, 'mobile-menu.css must not style the header');
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
node --test tests/site-chrome.test.mjs
```

Expected: FAIL — `ENOENT: no such file or directory, open '.../assets/css/header.css'`.

- [ ] **Step 3: Build the stylesheets**

Save as `build-chrome-css.py` in the repo root and run it once with `python3 build-chrome-css.py`. It reads `index.html`, which carries the richest version of the header block (the other ten pages are identical apart from the scroll offset and one missing comment).

```python
import re, textwrap, os

src = open('index.html', encoding='utf-8').read().splitlines()

# Header block: the ── HEADER ── marker through the line before the next ── marker.
ha = next(i for i, l in enumerate(src) if '── HEADER ──' in l)
hb = next(i for i, l in enumerate(src) if i > ha and re.match(r'\s*/\* ── (?!HEADER)', l)) - 1

# Menu block: the /* ==== banner through the 900px desktop-hide rule.
ma = next(i for i, l in enumerate(src) if 'agency ai — mobile menu' in l) - 1
mb = next(i for i, l in enumerate(src) if i > ma and '.mm-panel { display: none; }' in l) + 1

header = textwrap.dedent("\n".join(src[ha:hb + 1]))   # inline block is indented; files are not
menu = "\n".join(src[ma:mb + 1])                      # menu block is already at column 0

header = header.replace(
    "html { scroll-padding-top: 110px; } /* 60px header + 34px ticker + 16px breathing room */",
    "html { scroll-padding-top: var(--hdr-scroll-offset, 76px); }\n"
    "/* Pages with the ticker (index.html) raise --hdr-scroll-offset to 110px:\n"
    "   60px header + 34px ticker + 16px breathing room. */")
assert "--hdr-scroll-offset" in header, "scroll-padding line not found — check index.html"

# The "ROUND 1: wordmark" block mixes concerns; split it along the same seam.
header += ("\n\n/* ── wordmark supplied as artwork ── */\n"
           ".hdr-word img { display: block; width: auto; height: 18px; }\n"
           "@media (max-width: 639px) { .hdr-word img { height: 16px; } }\n")
menu += ("\n\n/* ── wordmark supplied as artwork ── */\n"
         ".mm-logo-word img { display: block; width: auto; height: 20px; }\n")

os.makedirs('assets/css', exist_ok=True)
open('assets/css/header.css', 'w').write(header)
open('assets/css/mobile-menu.css', 'w').write(menu)
print(f"header.css      {len(header.splitlines())} lines")
print(f"mobile-menu.css {len(menu.splitlines())} lines")
```

Expected output:

```
header.css      248 lines
mobile-menu.css 276 lines
```

If the line counts differ, stop and investigate — the block markers in `index.html` have moved and the spans are wrong.

- [ ] **Step 4: Run the test to verify it passes**

```bash
node --test tests/site-chrome.test.mjs
```

Expected: PASS, 4 tests.

- [ ] **Step 5: Delete the one-off script and commit**

```bash
rm build-chrome-css.py
git add assets/css/header.css assets/css/mobile-menu.css tests/site-chrome.test.mjs
git commit -m "extract the header and mobile menu CSS into shared stylesheets

Built from index.html, which carries the richest version of the header
block. Not yet linked from any page - the next commit does the swap.

The scroll offset becomes --hdr-scroll-offset (default 76px) so the one
page that differs can override it instead of forking the whole block."
```

---

### Task 2: Strip the inline blocks and link the stylesheets

This is the risky mutation, isolated so it can be reviewed and reverted on its own.

**Files:**
- Modify: all 11 pages (see Global Constraints for the exact list)
- Modify: `tests/site-chrome.test.mjs`

**Interfaces:**
- Consumes: `assets/css/header.css` and `assets/css/mobile-menu.css` from Task 1.
- Produces: every page carrying `<link rel="stylesheet" href="[../]assets/css/header.css"/>` and the matching `mobile-menu.css` link immediately before its `<style>` tag, with no inline `.hdr-`/`.mm-` rules left. `index.html` declares `--hdr-scroll-offset: 110px` inside its inline `<style>`.

- [ ] **Step 1: Write the failing test**

Append to `tests/site-chrome.test.mjs`:

```js
/* Every page that carries the shared header + mobile menu. */
const SHARED_HEADER_PAGES = [
  '../index.html',
  '../about.html',
  '../blog.html',
  '../pricing.html',
  '../partners.html',
  '../privacy-policy.html',
  '../terms-of-service.html',
  '../cookie-policy.html',
  '../blog/2026-01-01-facebook-instagram-shopify-setup.html',
  '../blog/2026-04-20-vapor95-meta-ads-case-study.html',
  '../blog/2026-05-21-google-youtube-shopify-setup.html',
];

const hrefPrefix = (page) => (page.startsWith('../blog/') ? '../' : '');

/* Inline <style> contents with CSS comments stripped. Comments must go first:
   pages legitimately mention .hdr-wrap in prose (the hero's --hv-header-offset
   note) and a naive scan would match those and fail for the wrong reason. */
function inlineCss(pageHtml) {
  const blocks = pageHtml.match(/<style[^>]*>[\s\S]*?<\/style>/g) ?? [];
  return blocks.join('\n').replace(/\/\*[\s\S]*?\*\//g, '');
}

test('every page links both shared stylesheets', () => {
  for (const page of SHARED_HEADER_PAGES) {
    const html = read(page);
    const prefix = hrefPrefix(page);
    const headerLink = `<link rel="stylesheet" href="${prefix}assets/css/header.css"/>`;
    const menuLink = `<link rel="stylesheet" href="${prefix}assets/css/mobile-menu.css"/>`;
    assert.ok(html.includes(headerLink), `${page}: missing ${headerLink}`);
    assert.ok(html.includes(menuLink), `${page}: missing ${menuLink}`);
  }
});

test('no page carries inline header or menu CSS', () => {
  for (const page of SHARED_HEADER_PAGES) {
    const found = [...new Set(inlineCss(read(page)).match(/\.(?:hdr|mm)-[\w-]+/g) ?? [])];
    assert.deepEqual(found, [],
      `${page}: header/menu CSS belongs in assets/css/, found ${found.join(', ')}`);
  }
});

test('only index.html raises the scroll offset for the ticker', () => {
  for (const page of SHARED_HEADER_PAGES) {
    const css = inlineCss(read(page));
    if (page === '../index.html') {
      assert.match(css, /--hdr-scroll-offset:\s*110px/, 'index.html must clear the ticker');
    } else {
      assert.doesNotMatch(css, /--hdr-scroll-offset/,
        `${page}: has no ticker, so it must not override the offset`);
    }
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
node --test tests/site-chrome.test.mjs
```

Expected: FAIL on all three new tests — no page links the stylesheets yet, every page still carries inline `.hdr-`/`.mm-` rules, and `index.html` has no `--hdr-scroll-offset`.

- [ ] **Step 3: Strip the blocks and insert the links**

Save as `swap-chrome-css.py` in the repo root and run it once with `python3 swap-chrome-css.py`.

```python
import re, glob

PAGES = ["index.html", "about.html", "blog.html", "pricing.html", "partners.html",
         "cookie-policy.html", "privacy-policy.html",
         "terms-of-service.html"] + sorted(glob.glob("blog/*.html"))

def spans(lines):
    """(start, end) line indexes of the three duplicated blocks, inclusive."""
    ha = next(i for i, l in enumerate(lines) if '── HEADER ──' in l)
    hb = next(i for i, l in enumerate(lines) if i > ha and re.match(r'\s*/\* ── (?!HEADER)', l)) - 1
    ma = next(i for i, l in enumerate(lines) if 'agency ai — mobile menu' in l) - 1
    mb = next(i for i, l in enumerate(lines) if i > ma and '.mm-panel { display: none; }' in l) + 1
    wa = next(i for i, l in enumerate(lines) if 'ROUND 1: wordmark' in l)
    return (ha, hb), (ma, mb), (wa, wa + 3)

assert len(PAGES) == 11, f"expected 11 pages, found {len(PAGES)}"

for p in PAGES:
    lines = open(p, encoding='utf-8').read().splitlines()
    drop = set()
    for a, b in spans(lines):
        drop.update(range(a, b + 1))
    txt = "\n".join(l for i, l in enumerate(lines) if i not in drop) + "\n"

    # Shared chrome loads BEFORE the page's own inline CSS, so a page can still
    # override it and the header keeps its current early position in the cascade.
    prefix = "../" if p.startswith("blog/") else ""
    links = (f'  <link rel="stylesheet" href="{prefix}assets/css/header.css"/>\n'
             f'  <link rel="stylesheet" href="{prefix}assets/css/mobile-menu.css"/>\n')
    before = txt
    txt = re.sub(r'(\n)(\s*<style>)', lambda m: "\n" + links + m.group(2), txt, count=1)
    assert txt != before, f"{p}: could not find the <style> tag"

    if p == "index.html":
        txt = txt.replace("  <style>\n",
                          "  <style>\n"
                          "    /* index is the only page with the ticker under the header */\n"
                          "    :root { --hdr-scroll-offset: 110px; }\n", 1)

    open(p, 'w').write(txt)
    print(f"rewritten {p}")
```

- [ ] **Step 4: Run the full suite to verify everything passes**

```bash
node --test tests/*.test.mjs
```

Expected: PASS, **75 tests** (68 existing + 7 from `site-chrome.test.mjs`), 0 failures. The existing 68 assert markup, not CSS, so none should need changing. If any of the 68 fails, the extraction removed something it should not have — revert and investigate rather than editing the old test.

- [ ] **Step 5: Verify the expected size reduction**

```bash
git diff --stat
```

Expected: the 11 pages lose 5,675 lines in total (−515 on `index.html`, −516 on each of the other ten).

- [ ] **Step 6: Delete the one-off script and commit**

```bash
rm swap-chrome-css.py
git add index.html about.html blog.html pricing.html partners.html cookie-policy.html privacy-policy.html terms-of-service.html blog/ tests/site-chrome.test.mjs
git commit -m "link the shared chrome stylesheets and drop the inline copies

Each page loses ~516 lines of header, menu and wordmark CSS that was
byte-identical across all 11. index.html keeps a single declaration,
--hdr-scroll-offset: 110px, because the ticker sits under its header.

The stylesheets load before each page's inline <style> so the header
keeps its current early position in the cascade."
```

---

### Task 3: Pin the breakpoint so it cannot drift

Before this task the `900px` value agrees everywhere by luck. This makes CI enforce it.

**Files:**
- Modify: `tests/site-chrome.test.mjs`
- Modify: `assets/js/mobile-menu.js:18-20` (comment only)

**Interfaces:**
- Consumes: `assets/css/header.css`, `assets/css/mobile-menu.css` (Task 1), and the `DESKTOP` constant in `assets/js/mobile-menu.js`.
- Produces: nothing consumed downstream.

- [ ] **Step 1: Write the invariant test**

Append to `tests/site-chrome.test.mjs`:

```js
const menuJs = read('../assets/js/mobile-menu.js');

test('the desktop breakpoint agrees across the menu JS and both stylesheets', () => {
  const declared = menuJs.match(/var DESKTOP = '\(min-width: (\d+)px\)'/);
  assert.ok(declared, 'mobile-menu.js: could not find the DESKTOP constant');
  const breakpoint = declared[1];

  for (const [name, css] of [['header.css', headerCss], ['mobile-menu.css', menuCss]]) {
    const widths = [...css.matchAll(/@media \(min-width: (\d+)px\)/g)].map((m) => m[1]);
    assert.ok(widths.length > 0, `${name}: expected at least one min-width media query`);
    for (const width of widths) {
      assert.equal(width, breakpoint,
        `${name}: ${width}px must match the DESKTOP constant in mobile-menu.js (${breakpoint}px)`);
    }
  }
});
```

Note the regex matches the `min-width` prefix of `@media (min-width: 900px) and (max-width: 1099px)`, which is intended. `max-width` queries — the `639px` wordmark rule and the `359px` lockup rule — are header-only and correctly ignored.

- [ ] **Step 2: Prove the test actually catches drift**

The invariant already holds, so this test passes on arrival. That is not evidence it works. Break it on purpose:

```bash
sed -i '' 's/@media (min-width: 900px) {/@media (min-width: 901px) {/' assets/css/header.css
```

Then run:

```bash
node --test tests/site-chrome.test.mjs
```

Expected: FAIL with `header.css: 901px must match the DESKTOP constant in mobile-menu.js (900px)`.

Now restore:

```bash
git checkout assets/css/header.css
```

And confirm green again:

```bash
node --test tests/site-chrome.test.mjs
```

Expected: PASS.

- [ ] **Step 3: Make the JS comment name the real files**

The comment written in commit `02799ef` describes the pre-extraction world. Replace lines 18-20 of `assets/js/mobile-menu.js`:

```js
  /* Must match the (min-width: …) media queries in assets/css/header.css and
     assets/css/mobile-menu.css. tests/site-chrome.test.mjs enforces this. */
  var DESKTOP = '(min-width: 900px)';
```

- [ ] **Step 4: Run the full suite**

```bash
node --test tests/*.test.mjs
```

Expected: PASS, **76 tests**, 0 failures.

- [ ] **Step 5: Commit**

```bash
git add tests/site-chrome.test.mjs assets/js/mobile-menu.js
git commit -m "pin the 900px breakpoint across the menu JS and both stylesheets

Before extraction this value lived in 34 unenforced places: three media
queries on each of 11 pages, plus the DESKTOP constant. It now lives in
four, and a failing test is the thing keeping them equal.

Verified the test catches drift by editing header.css to 901px and
watching it fail."
```

---

### Task 4: Verify in a browser

The suite asserts structure. It cannot see a flash of unstyled header, which is the one risk the spec calls out.

**Files:** none modified unless a defect is found.

**Interfaces:**
- Consumes: the finished state of Tasks 1-3.
- Produces: nothing.

- [ ] **Step 1: Start the preview server**

Use the `agency-website` configuration already in `.claude/launch.json` (`npx serve -l 3456 .`). Do not start a server with Bash.

- [ ] **Step 2: Check a root page at desktop width**

Load `http://localhost:3456/about.html` at 1280x800. Confirm: the header renders with brand lockup, five nav links, and the Dashboard / Download buttons; there is no unstyled flash on reload; the console is clean.

- [ ] **Step 3: Check a blog page at mobile width**

Load `http://localhost:3456/blog/2026-04-20-vapor95-meta-ads-case-study.html` at 375x812. This is the path-prefix case — if `../assets/css/…` were wrong, the header would render unstyled here and nowhere else. Confirm the header and hamburger are styled, and that the network panel shows both stylesheets returning 200.

- [ ] **Step 4: Exercise the menu**

Click the hamburger. Confirm via the page's computed state that `aria-expanded` flips to `true`, the panel becomes visible, `body` gains `mm-locked`, and the "Blog" link shows its active styling. Press Escape and confirm it closes and the lock is released.

- [ ] **Step 5: Check the breakpoint switch**

Resize from 375px to 1280px with the menu closed. Confirm the hamburger gives way to the desktop nav at 900px and the panel stays hidden.

- [ ] **Step 6: Check the scroll offset**

On `index.html`, follow an in-page link such as `#features`. Confirm the target heading clears the fixed header and the ticker rather than sitting under them. Repeat on `pricing.html`, where the offset should be the 76px default.

- [ ] **Step 7: Sanity-check the first-paint trade**

The spec's second risk is that the extra request costs more than the smaller HTML saves. Confirm the trade is roughly as expected rather than measuring LCP properly:

- In the network panel, confirm `header.css` and `mobile-menu.css` each transfer at well under 10KB, and that a second page load serves both from cache (`304`, or `disk cache`).
- Confirm each page's HTML document is ~20KB smaller than on `main`.

If either stylesheet is unexpectedly large or is re-downloaded per page, stop and report — the caching assumption behind this design is wrong. A proper LCP comparison belongs on the Vercel preview deployment, not the local server, and is out of scope here.

- [ ] **Step 8: Record the result**

If everything passes, no commit is needed — the work is already committed. If a defect appears, fix it, re-run `node --test tests/*.test.mjs`, and commit the fix on its own.

---

## Notes for the implementer

**Why `index.html` is the extraction source.** All 11 header blocks are identical apart from two things: the scroll offset (110px vs 76px) and one explanatory comment about the hamburger bar geometry that only `index.html` carries. Extracting from `index.html` keeps the better comment.

**Why the menu block is not dedented but the header block is.** The menu CSS was authored at column 0 inside the inline `<style>`; the header CSS is indented four spaces on `index.html` and six on the other ten. `textwrap.dedent` normalises the header; the menu is copied verbatim.

**The wordmark block is easy to miss.** It sits after the menu CSS, is only four lines, and mixes header and menu rules — `.hdr-word img` and a `639px` override belong to the header, `.mm-logo-word img` belongs to the menu. Task 2's anti-drift test fails if it is left behind.

**Do not delete the sibling comment.** Every page's markup carries *"must stay a SIBLING of .hdr-wrap, never a child"*. It documents the `backdrop-filter` fix from PR #8 and is markup, not CSS — the extraction scripts do not touch it, and it must survive.

**This plan was dry-run.** The extraction was executed against a throwaway copy of the tree at commit `02799ef`: all 68 existing tests passed afterwards, no inline `.hdr-`/`.mm-` rules remained on any page, and the `900px` value collapsed from 34 places to 4. The line counts quoted throughout are measured, not estimated.
