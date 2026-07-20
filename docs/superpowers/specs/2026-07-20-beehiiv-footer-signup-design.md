# beehiiv Footer Newsletter Signup — Design

**Ticket:** SHO22-472
**Date:** 2026-07-20
**Related:** SHO22-239 (add a newsletter sign up field to the website footer)

## Goal

A newsletter signup in the site footer that is 100% our own markup and styling. No
beehiiv-rendered components reach the browser — that regression is what the ticket
title calls out.

## Constraints from the existing codebase

- No build step, no framework, no `package.json`. Ten standalone `.html` files
  deployed as static assets on Vercel.
- Each page carries a fully duplicated `<footer>` and its own ~1500-line inline
  `<style>` block.
- The site has zero `<input>` elements today, so this establishes the input pattern
  rather than matching an existing one.

## Code organization

Shared external `assets/css/newsletter.css` and `assets/js/newsletter.js`, linked
from all ten pages. The ~15-line form markup lives inline in each footer.

This deliberately breaks the site's "everything inline" convention. The alternative
— duplicating ~150 lines of CSS and ~100 lines of JS across ten files — makes every
future change a ten-file edit. The convention break is narrow and buys a single
source of truth.

Rejected: injecting the markup from JS. It removes the duplication entirely but the
form then does not exist without JS and flashes in on load.

## UI

A signup row inside the dark footer, above `.footer-bottom`, separated by the same
`1px solid rgba(255,255,255,0.07)` border the footer already uses.

- Micro-label "Get the brief" in `--mono`, uppercase, letter-spaced — matching the
  existing `.footer-col-title` treatment.
- Transparent input, `rgba(255,255,255,0.15)` border, focuses to `--accent-blue`.
- Submit button reuses the `--accent-green` fill from the CTA button on `index.html`.
- States: idle, loading, success, error. All rendered inline in a fixed-height status
  line so nothing shifts as state changes.

## Bot protection

- Hidden honeypot field. Named to look real to a scraper, hidden from users and
  screen readers, `tabindex="-1"`, `autocomplete="off"`.
- Submit stays disabled until the email passes client-side validation.
- Both checks repeat server-side. The client checks are UX, not security.

## Backend

`api/subscribe.js` — a Vercel zero-config serverless function. Any `/api/*.js` file
is auto-detected as a function; no framework is required.

Flow: accept `POST { email, website }`, validate the email server-side, reject a
filled honeypot, then call:

```
POST https://api.beehiiv.com/v2/publications/{BEEHIIV_PUB_ID}/subscriptions
Authorization: Bearer {BEEHIIV_API_KEY}
```

with `reactivate_existing: false`, `send_welcome_email: true`, and
`utm_source: "agencyai_footer"`.

`BEEHIIV_API_KEY` and `BEEHIIV_PUB_ID` are server-side environment variables set in
Vercel. Never in client JS, never committed. When they are absent the function
returns a clean 503 and the UI shows its error state — the form must never look dead.

A filled honeypot returns 200 without calling beehiiv, so bots get no signal.

## The swap seam

The client has one `submitEmail(email)` function that knows only about
`/api/subscribe`. The UI never learns what the backend is. Changing backends later
touches that one function and nothing else — this is what the ticket's Step 1
requires so Step 2/Step 3 can be swapped without a redesign.

## Testing

`tests/newsletter-signup.test.mjs`, following the assertion style already in
`tests/landing-page.test.mjs`: assert the markup, honeypot, and asset links are
present on all ten pages, and that no beehiiv embed script or beehiiv-hosted asset
appears anywhere in the HTML.
