# Pricing Page Design

**Date:** 2026-05-18  
**Status:** Approved

## Overview

Create a standalone `pricing.html` page that surfaces the existing $59 founder pricing section from the homepage. The page follows the same self-contained HTML pattern as `about.html` (inline CSS, same nav/footer structure).

## New File: `pricing.html`

### Head
- Title: `Pricing | Agency AI — $59/mo Founder Plan`
- Description: Founder pricing at $59/mo. 30-day free trial, no hidden fees. Lock in before tiered plans launch in 2026.
- Canonical: `https://www.agencyai.app/pricing`
- OG/Twitter meta tags matching above
- Structured data: `PriceSpecification` schema (price: 59, currency: USD)
- Same font/icon links as other pages

### Styles
Copy from `index.html` inline `<style>`:
- All base/reset styles (`:root`, `body`, `a`, etc.)
- Nav styles (`.site-header`, `nav`, `.logo`, `.nav-links`, `.nav-cta`, `.nav-toggle`, mobile hamburger)
- Reveal animation (`.reveal`, `@keyframes`)
- Pricing section styles (`.pricing`, `.founder-plan`, `.founder-badge`, `.founder-plan-name`, `.founder-plan-sub`, `.founder-price`, `.founder-currency`, `.founder-amount`, `.founder-period`, `.founder-features`, `.btn-founder`, `.founder-note`)
- Future pricing styles (`.pricing-future`, `.pricing-future-label`, `.pricing-grid`, `.plan`, `.plan-name`, `.plan-desc`, `.plan-price`, `.plan-currency`, `.plan-amount`, `.plan-period`, `.plan-features`, `.btn-plan`, `.pricing-future-overlay`, `.coming-soon-badge`, `.btn-lock-pricing`, `.lock-pricing-note`)
- Footer styles
- Responsive overrides

### Body: Navigation
Same nav as `about.html`. The "Pricing" link points to `pricing.html` (active, not a hash anchor).

### Body: Main Content
The full `<section class="pricing">` block from `index.html` lines 2090–2197, with no changes to content:
- Section header ("Simple Launch Pricing", "One Plan / No Hidden Fees")
- Founder plan card ($59, 6 features, "Start Free Trial" CTA)
- Future pricing tiers grid with "Coming 2026" overlay and "Lock In $59/mo Founder Pricing" CTA

### Body: Footer
Same footer as `about.html`, with the "Pricing" footer link updated to `pricing.html`.

## Updates to Existing Pages

| File | Change |
|---|---|
| `index.html` | Nav "Pricing" link: stays `#pricing` (scrolls within same page) |
| `index.html` | Footer "Pricing" link: `#pricing` → `pricing.html` |
| `about.html` | Nav "Pricing" link: `index.html#pricing` → `pricing.html` |
| `about.html` | Footer "Pricing" link: `index.html#pricing` → `pricing.html` |

## Scroll Animation

Copy the `reveal` IntersectionObserver script from `index.html` into `pricing.html` so the section animates in on scroll.

## Out of Scope

- No new pricing content
- No design changes to the pricing section itself
- No routing/build system changes (plain HTML)
