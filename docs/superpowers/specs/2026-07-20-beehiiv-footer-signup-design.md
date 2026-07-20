# beehiiv Newsletter Signup — Design

**Ticket:** SHO22-472
**Date:** 2026-07-20
**Related:** SHO22-239 (add a newsletter sign up field to the website footer)

> The filename says "footer" for continuity with the original commit and PR #42.
> The design moved to a standalone section before that shipped — see *Revision*
> below.

## Goal

A newsletter signup that is 100% our own markup and styling. No beehiiv-rendered
components reach the browser — that regression is what the ticket title calls out.

## Revision — footer row to standalone section

First implementation put a compact signup row in the footer of all ten pages.
Design mockups then landed showing a full-bleed section instead, so:

- The footer row was removed from all ten pages.
- A standalone section now sits on `index.html` only, directly above the final
  `.cta-section` ("Ready to Outgrow The Competition?").
- Copy comes from the mockups verbatim. Note this changed the promised cadence
  from weekly to **monthly**; the old "one email a week" line is gone, and a test
  guards against it returning.

Legal, about, pricing, and blog pages now have no signup. That was a deliberate
call — accepted trade-off for a single high-intent capture point.

## Constraints from the existing codebase

- No build step, no framework, no `package.json`. Ten standalone `.html` files
  deployed as static assets on Vercel.
- Each page carries its own ~1500-line inline `<style>` block.
- The site had zero `<input>` elements before this, so it establishes the input
  pattern rather than matching one.

## Code organization

Shared external `assets/css/newsletter.css` and `assets/js/newsletter.js`, linked
from `index.html`. The section markup lives inline in the page.

Sharing the assets mattered more when ten footers duplicated the markup. Now that
the signup is index-only it is a smaller win, but external files still keep a
1500-line inline `<style>` block from growing further.

## UI

Full-bleed dark section, centered, above the final CTA.

- Eyebrow "The Operator Brief" in `--mono`, uppercase, letter-spaced, with a
  `--accent-green` dash.
- Display headline "Steal our *benchmarks*" in `--display`, the last word in
  `--accent-green` via `em` — matching the existing `.hero-headline em` pattern.
- Input with `rgba(255,255,255,0.12)` border, focusing to `--accent-green`.
- Pill submit button filled `--accent-green`, label "Get the brief".
- States: idle, loading, success, error, in a fixed-height status line so nothing
  shifts.
- Mobile (≤640px): input and button stack full-width, headline wraps to two lines.

### Resting copy

The reassurance line doubles as the status region's idle state. It lives in the
**markup**, not in JS, for two reasons: it renders without JS, and CSS owns the
responsive part. An earlier version measured the viewport once in JS via
`matchMedia` — that goes stale on resize, and read `0` in a non-laid-out tab,
silently hiding the desktop copy. The third clause is now dropped on narrow
screens by a CSS rule on `.newsletter-note-extra`.

### Disabled button

The ticket requires "submit disabled until valid"; the mockup shows a
full-strength green button at rest. Resolved by keeping the button genuinely
disabled — preserving the semantics and blocking empty submits — but dimming it
only lightly (opacity `0.75`), so the resting section reads as inviting rather
than switched off.

## Bot protection

- Hidden honeypot field, `tabindex="-1"`, `autocomplete="off"`, hidden from users
  and screen readers.
- Submit stays disabled until the email passes client-side validation.
- Both checks repeat server-side. The client checks are UX, not security.

## Backend

`api/subscribe.js` — a Vercel zero-config serverless function. Any `/api/*.js`
file is auto-detected; no framework required.

Flow: accept `POST { email, website }`, validate the email server-side, reject a
filled honeypot, then call:

```
POST https://api.beehiiv.com/v2/publications/{BEEHIIV_PUB_ID}/subscriptions
Authorization: Bearer {BEEHIIV_API_KEY}
```

with `reactivate_existing: false`, `send_welcome_email: true`, and
`utm_source: "agencyai_footer"`.

`BEEHIIV_API_KEY` and `BEEHIIV_PUB_ID` are server-side environment variables set
in Vercel. Never in client JS, never committed. When absent the function returns a
clean 503 and the UI shows its error state — the form must never look dead.

A filled honeypot returns 200 without calling beehiiv, so bots get no signal. An
already-subscribed address also returns 200: telling someone "that went wrong"
when they are already on the list is the dead-form behaviour the ticket warns
about.

## The swap seam

The client has one `submitEmail(email)` function that knows only about
`/api/subscribe`. The UI never learns what the backend is. Changing backends later
touches that one function — this is what the ticket's Step 1 requires so Step 2 /
Step 3 can be swapped without a redesign.

## Testing

- `tests/newsletter-signup.test.mjs` — the section exists on `index.html` with the
  approved copy, sits directly above the final CTA, is absent from the other nine
  pages, ships the honeypot and live region, and leaks no beehiiv reference.
- `tests/subscribe-api.test.mjs` — executes the handler with `fetch` and the
  environment stubbed: happy path, honeypot, malformed and overlong addresses,
  missing credentials, already-subscribed, beehiiv outage, network failure, and
  non-POST methods. Mutation-tested — disabling the honeypot, breaking
  `utm_source`, or leaking beehiiv's wording each fails exactly one test.
