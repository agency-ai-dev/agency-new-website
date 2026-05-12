# Agency AI Landing Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the static `index.html` landing page so it uses a blue/green brand system, embeds the provided product video, adds an AI phone-conversation mockup and FAQ, and replaces the most placeholder-feeling proof/content with brand-aligned material.

**Architecture:** Keep the site as a single static HTML file with inline CSS/JS, and add a lightweight Node-based regression test that checks for required content hooks in `index.html`. Implement the refresh in small vertical slices so color system, new sections, and proof updates are each verified independently.

**Tech Stack:** Static HTML/CSS/JS, Node.js built-in test runner (`node:test`), Git

---

## File Structure

- Modify: `index.html`
- Create: `tests/landing-page.test.mjs`
- Reference spec: `docs/superpowers/specs/2026-05-12-agencyai-landing-refresh-design.md`

The code remains intentionally single-file for the page itself. The only supporting artifact is a small regression test that reads `index.html` and asserts required sections/content markers remain present.

### Task 1: Video Block + Blue/Green Theme Foundation

**Files:**
- Modify: `index.html`
- Create: `tests/landing-page.test.mjs`
- Test: `tests/landing-page.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('landing uses blue and green accent variables', () => {
  assert.match(html, /--accent-blue:/);
  assert.match(html, /--accent-green:/);
});

test('landing includes the product video section', () => {
  assert.match(html, /<section class="video-section" id="video">/);
  assert.match(html, /Agency_Ai_video_1_xwubxm\.mp4/);
  assert.match(html, /<video[\s\S]*controls[\s\S]*playsinline/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/landing-page.test.mjs`

Expected: FAIL because `index.html` still uses orange variables and has no `video-section`.

- [ ] **Step 3: Write minimal implementation**

```html
<!-- in :root -->
--accent-blue: #1d8cff;
--accent-green: #34d399;

<!-- after hero -->
<section class="video-section" id="video">
  <div class="container">
    <div class="video-shell">
      <video controls playsinline preload="metadata">
        <source src="https://res.cloudinary.com/dn71ngylo/video/upload/v1759252335/Agency_Ai_video_1_xwubxm.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</section>
```

Also replace orange-dependent CTA, label, border, glow, marquee, and accent rules with the new blue/green variables so the page no longer reads orange-first.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/landing-page.test.mjs`

Expected: PASS for both tests.

- [ ] **Step 5: Commit**

```bash
git add index.html tests/landing-page.test.mjs
git commit -m "feat: refresh landing theme and add video block"
```

### Task 2: AI Phone Conversation Mockup + FAQ

**Files:**
- Modify: `index.html`
- Test: `tests/landing-page.test.mjs`

- [ ] **Step 1: Extend the failing test**

```js
test('landing includes the ai phone conversation section', () => {
  assert.match(html, /<section class="ai-call" id="ai-call">/);
  assert.match(html, /AI agent/i);
  assert.match(html, /Call summary/i);
});

test('landing includes the faq section before the cta', () => {
  assert.match(html, /<section class="faq" id="faq">/);
  assert.match(html, /Does Agency AI replace my agency\?/);
  assert.ok(html.indexOf('id="faq"') < html.indexOf('class="cta-section"'));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/landing-page.test.mjs`

Expected: FAIL because the AI call and FAQ sections do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```html
<section class="ai-call" id="ai-call">
  <div class="container">
    <div class="call-card">
      <div class="call-header">Live Strategy Call · AI agent</div>
      <div class="call-thread">
        <div class="call-bubble founder">We need to scale Meta without adding agency overhead.</div>
        <div class="call-bubble agent">I can launch three new creative angles, rebalance budget, and keep every change pending your approval.</div>
      </div>
      <div class="call-summary">Call summary: 3 campaign actions surfaced, 1 approval queue created.</div>
    </div>
  </div>
</section>

<section class="faq" id="faq">
  <div class="container">
    <article class="faq-item">
      <h3>Does Agency AI replace my agency?</h3>
      <p>Agency AI replaces the repetitive execution layer while keeping you in control of approvals, creative direction, and launch decisions.</p>
    </article>
  </div>
</section>
```

Style both sections to match the refreshed editorial system, keep them mobile-friendly, and place the FAQ immediately before `.cta-section`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/landing-page.test.mjs`

Expected: PASS for the new AI call and FAQ assertions.

- [ ] **Step 5: Commit**

```bash
git add index.html tests/landing-page.test.mjs
git commit -m "feat: add ai call mockup and faq section"
```

### Task 3: Replace Placeholder Proof, Icons, and Messaging

**Files:**
- Modify: `index.html`
- Test: `tests/landing-page.test.mjs`

- [ ] **Step 1: Extend the failing test**

```js
test('landing uses public proof brands instead of fabricated testimonial names', () => {
  assert.match(html, /Lola Hemp/);
  assert.match(html, /Vapor95/);
  assert.match(html, /Epic Hoodie/);
  assert.doesNotMatch(html, /Sarah Chen/);
  assert.doesNotMatch(html, /Marcus Williams/);
  assert.doesNotMatch(html, /Jamie Rodriguez/);
});

test('landing removes emoji icons from core product sections', () => {
  assert.doesNotMatch(html, /⏱|💸|📉|🎯|📈|✍️|📊|⚡|🏪|🎨|🚀/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/landing-page.test.mjs`

Expected: FAIL because the old testimonial names and emoji icons are still present.

- [ ] **Step 3: Write minimal implementation**

```html
<!-- testimonial card names -->
<div class="testi-name">Lola Hemp</div>
<div class="testi-name">Vapor95</div>
<div class="testi-name">Epic Hoodie</div>

<!-- replace emoji icon nodes with svg/icon shells -->
<div class="problem-icon">
  <svg viewBox="0 0 24 24" aria-hidden="true">...</svg>
</div>
```

Update surrounding copy so the page references the live public proof points and feels less synthetic. Replace emoji-driven icons in the problem, features, and steps sections with inline SVG or simple abstract icon shapes that inherit the new brand colors.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/landing-page.test.mjs`

Expected: PASS for the proof and icon assertions.

- [ ] **Step 5: Run full verification**

Run: `node --test tests/landing-page.test.mjs`

Expected: PASS with all tests green.

- [ ] **Step 6: Commit**

```bash
git add index.html tests/landing-page.test.mjs
git commit -m "feat: replace placeholder proof and iconography"
```

## Self-Review

### Spec coverage

- Blue/green palette: Task 1
- Video block with provided asset: Task 1
- AI phone conversation mockup: Task 2
- FAQ before CTA: Task 2
- Replace placeholder icons and reviews: Task 3
- Keep single-file architecture and responsiveness: all tasks modify only `index.html` plus one test file

### Placeholder scan

No `TODO`, `TBD`, or "similar to above" placeholders remain in the tasks.

### Type consistency

The plan consistently uses:

- `video-section` / `id="video"`
- `ai-call` / `id="ai-call"`
- `faq` / `id="faq"`
- `tests/landing-page.test.mjs`

