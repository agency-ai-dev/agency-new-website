# Agency AI Landing Refresh Design

## Summary

This spec defines a light-touch refresh of the current static landing page in `index.html`.
The goal is to keep the existing editorial structure and motion language while updating the page so it feels aligned with the live `agencyai.app` brand.

The refresh will:

- replace the orange-led palette with a blue/green accent system closer to the current site
- embed the provided Agency AI product video
- add a stylized phone conversation mockup with the AI agent
- add an FAQ section near the bottom of the page
- replace the most placeholder-feeling icons, testimonials, and proof points with brand-aligned content

This is intentionally not a full rebuild or a close copy of the live site.

## Approved Direction

The approved approach is a high-polish light-touch refresh:

- preserve the current one-file static implementation
- preserve the broad section flow and responsive structure where possible
- update the visual system, content quality, and trust signals
- insert only the new sections that materially strengthen the story: video, AI phone conversation, and FAQ

## Design Intent

The refreshed page should feel:

- more credible and brand-consistent
- less placeholder-heavy and less "template-like"
- visually cooler and sharper through blue/green accents instead of orange
- more product-led through a real video asset and a concrete AI-agent conversation mockup

The page should still feel bold and editorial, but less aggressive and less dependent on a hot orange CTA color.

## Visual System

### Color Direction

Replace the orange accent system with a blue/green palette inspired by the current site.

Planned use:

- primary accent: blue-cyan for buttons, highlights, borders, and key emphasis
- secondary accent: green/teal for live states, proof signals, and supporting highlights
- dark surfaces remain dark
- off-white and gray neutrals remain the base for readability

The new palette must cover:

- buttons and hover states
- label borders and section accents
- marquee/divider styling
- featured cards and CTA emphasis
- testimonial accents
- decorative glow and blob treatments

### Icon Direction

Replace emoji-style icons in problem, feature, and step areas with cleaner inline SVG or simple geometric icon treatments that better match a premium SaaS/product brand.

## Content Changes

### Hero

Keep the current hero structure, but tune wording and accents so the section feels closer to the live brand voice.

Updates may include:

- stronger emphasis on the "growth engine" framing
- CTA and demo language that better supports the new video block
- stat styling updated to match the new palette

### Proof / Testimonials

Replace the fabricated testimonial set with copy and brands closer to the proof shown on `agencyai.app`.

Preferred proof source:

- Lola Hemp
- Vapor95
- Epic Hoodie

If exact long-form quotes are not available from the live site, the implementation should use concise, credible testimonial copy derived from the public messaging rather than keeping obviously fake founder names and made-up brand stories.

### Integrations / Platform Credibility

Keep the integrations section, but ensure the presentation feels more product-grade and less placeholder-driven.

Likely updates:

- tighter label copy
- more consistent icon treatment
- improved status styling

## New Sections

### Video Block

Add a dedicated video section using the provided asset:

`https://res.cloudinary.com/dn71ngylo/video/upload/v1759252335/Agency_Ai_video_1_xwubxm.mp4`

Requirements:

- use a native HTML5 `video` element
- show playback controls
- make the section feel premium rather than dropped-in
- ensure the video is responsive and works on mobile
- place it high enough on the page to support the main product narrative

Recommended placement:

- after hero, or immediately after the first trust/problem section if that reads better in flow

### AI Phone Conversation Mockup

Add a stylized section showing a mock phone conversation with the AI agent.

This block should:

- visually resemble a live call or transcript summary
- communicate that the product can guide or act like a high-context marketing operator
- feel designed, not like a generic chat bubble dump

Recommended content structure:

- call status/header
- short back-and-forth between founder/operator and AI agent
- one or two surfaced outcomes or suggested actions

### FAQ

Add an FAQ section before the final CTA.

The FAQ should answer practical buyer questions such as:

- what Agency AI actually automates
- whether it replaces an agency
- how setup works
- whether it is built for Shopify brands
- how human approval/control works

The section should be visually lightweight and easy to scan.

## Structural Guidance

The page should remain mostly intact, but the likely final order is:

1. nav
2. ticker
3. hero
4. video block
5. problem / credibility
6. features
7. marquee
8. how it works
9. AI phone conversation mockup
10. integrations
11. testimonials
12. FAQ
13. final CTA
14. footer

This order may be adjusted slightly if the page reads better with the video after the problem section instead of immediately after the hero.

## Interaction and Motion

Keep the existing lightweight motion system:

- reveal-on-scroll
- counter animation
- hover transitions
- cursor treatment if it still feels appropriate after the palette update

Do not introduce heavy JavaScript or complex interaction logic.

## Accessibility and Implementation Constraints

The implementation should:

- stay within the current static `index.html` architecture
- avoid adding build tooling or framework migration
- preserve responsiveness across desktop, tablet, and mobile
- maintain readable contrast after the palette shift
- keep the code straightforward enough to remain editable in a single file

## Out of Scope

The refresh does not include:

- rebuilding the page in a framework
- cloning the full live `agencyai.app` layout
- adding backend logic or form handling
- replacing every section on the page

## Acceptance Criteria

The work is complete when:

- orange is no longer the dominant accent color
- the page uses a cohesive blue/green system
- the provided video is embedded in a polished responsive section
- an AI phone conversation mockup section is added
- an FAQ section is added before the CTA
- placeholder-feeling icons and social proof are replaced with more brand-aligned content
- the page still feels coherent, responsive, and polished in one static file
