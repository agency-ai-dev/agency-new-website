import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const html = read('../index.html');

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

function decode(s) {
  return s
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&middot;/g, '·')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/* ── preserved page furniture ── */

test('landing uses blue and green accent variables', () => {
  assert.match(html, /--accent-blue:/);
  assert.match(html, /--accent-green:/);
});

test('landing includes the product video section', () => {
  assert.match(html, /<section class="video-section" id="video">/);
  assert.match(html, /Agency_Ai_video_1_xwubxm\.mp4/);
  assert.match(html, /<video[\s\S]*controls[\s\S]*playsinline/);
});

test('the product video autoplays muted in-view at no initial-load cost', () => {
  const video = html.slice(html.indexOf('<video'), html.indexOf('</video>'));
  // muted + playsinline are what make programmatic playback permissible on mobile
  assert.match(video, /muted/);
  assert.match(video, /playsinline/);
  // controls stay so a viewer can unmute
  assert.match(video, /controls/);
  // nothing but the header is fetched until the band is actually visible
  assert.match(video, /preload="metadata"/);
  // playback is driven by the observer, never by the autoplay attribute
  assert.doesNotMatch(video, /\bautoplay\b(?!-in-view)/);
  assert.match(video, /data-autoplay-in-view/);
  assert.match(html, /IntersectionObserver[\s\S]{0,600}data-autoplay-in-view|data-autoplay-in-view[\s\S]{0,900}IntersectionObserver/);
});

test('landing includes the ai phone conversation section', () => {
  assert.match(html, /<section class="ai-call" id="ai-call">/);
  assert.match(html, /AI Agent/i);
  assert.match(html, /Session summary/i);
});

test('landing includes the faq section above the closing bands', () => {
  assert.match(html, /<section class="faq" id="faq">/);
  assert.match(html, /Does Agency AI replace my agency\?/);
  assert.ok(html.indexOf('id="faq"') < html.indexOf('class="newsletter"'));
});

// Removed in round 1 (docx image12): the mint "Ready to Outgrow The Competition?"
// band with the ghost GROW wordmark and the Install-free-on-Shopify button.
test('the final CTA band stays removed', () => {
  assert.doesNotMatch(html, /class="cta-section"/);
  assert.doesNotMatch(html, /cta-headline/);
  assert.doesNotMatch(html, /Ready to<br\/>Outgrow/);
});

test('landing uses public proof brands instead of fabricated testimonial names', () => {
  assert.match(html, /Lola Hemp/);
  assert.match(html, /Vapor95/);
  assert.match(html, /Mayhem Haus/);
  assert.doesNotMatch(html, /Sarah Chen/);
  assert.doesNotMatch(html, /Marcus Williams/);
  assert.doesNotMatch(html, /Jamie Rodriguez/);
});

test('landing removes emoji icons from core product sections', () => {
  assert.doesNotMatch(html, /⏱|💸|📉|🎯|📈|✍️|📊|⚡|🏪|🎨|🚀/);
});

test('head metadata and structured data survive the redesign', () => {
  assert.match(html, /<title>Agency AI — Automate Meta & Google Ads for Shopify<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.agencyai\.app\/" \/>/);
  assert.match(html, /property="og:site_name"/);
  assert.match(html, /name="twitter:card"/);
  assert.match(html, /assets\/logos\/agency-favicon\.png/);
  assert.match(html, /"@type": "SoftwareApplication"/);
  assert.match(html, /"@type": "FAQPage"/);
  assert.match(html, /"@type": "Organization"/);
});

/* ── FAQPage structured data must mirror the visible FAQ ──
   Google requires FAQ rich-result markup to match on-page content. This test is
   the guard: every question and answer in the JSON-LD has to appear verbatim in
   the rendered FAQ section. */

test('FAQPage JSON-LD stays in sync with the visible FAQ', () => {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((m) => JSON.parse(m[1]));
  const faqLd = blocks.find((b) => b['@type'] === 'FAQPage');
  assert.ok(faqLd, 'FAQPage JSON-LD block is missing');

  const from = html.indexOf('<section class="faq" id="faq">');
  const section = html.slice(from, html.indexOf('</section>', from));
  const visible = [...section.matchAll(/<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)].map((m) => ({
    q: decode(m[1]),
    a: decode(m[2]),
  }));

  assert.ok(faqLd.mainEntity.length > 0, 'FAQPage has no entries');
  for (const entry of faqLd.mainEntity) {
    const match = visible.find((v) => v.q === entry.name);
    assert.ok(match, `FAQ question in JSON-LD is not on the page: "${entry.name}"`);
    assert.equal(
      entry.acceptedAnswer.text,
      match.a,
      `FAQ answer in JSON-LD does not match the visible answer for "${entry.name}"`,
    );
  }
});

/* ── the redesigned home page sections ── */

test('home page renders every redesigned section in the designed order', () => {
  // round 2: the strategist band moved directly below the hero
  const order = [
    'class="hero-v2"',
    'id="strategist"',
    'id="video"',
    'id="problem"',
    'id="features"',
    'id="how"',
    'id="mcp"',
    'id="integrations"',
  ];
  let cursor = -1;
  for (const marker of order) {
    const at = html.indexOf(marker);
    assert.ok(at > -1, `missing section marker: ${marker}`);
    assert.ok(at > cursor, `section out of order: ${marker}`);
    cursor = at;
  }
});

test('the hero owns the single h1', () => {
  const h1s = html.match(/<h1[\s>]/g) || [];
  assert.equal(h1s.length, 1, 'the page must have exactly one h1');
  assert.match(html, /<h1[^>]*class="hv-h1"/);
});

test('hero ships the designed CTAs and their real destinations', () => {
  assert.match(html, /Start free today/i);
  assert.match(html, /href="https:\/\/apps\.shopify\.com\/agency-ai"/);
  assert.match(
    html,
    /href="https:\/\/calendly\.com\/agency-demo\/30min"[^>]*target="_blank"[^>]*rel="noopener"/,
  );
});

test('the ticker ships on the home page only', () => {
  assert.match(html, /<div class="tick">/);
  for (const page of SHARED_HEADER_PAGES.slice(1)) {
    assert.doesNotMatch(read(page), /<div class="tick">/, `${page} must not carry the ticker`);
  }
});

test('features section keeps the final six-system copy', () => {
  assert.match(html, /Everything you/i);
  for (const name of ['Meta Ads', 'Google Ads', 'AI Design', 'Copy', 'Unified', 'Instant']) {
    assert.ok(html.includes(name), `features row missing: ${name}`);
  }
});

test('four steps section keeps the final short copy', () => {
  for (const label of ['Install', 'Learn', 'Launch', 'Compound']) {
    assert.match(html, new RegExp(label, 'i'), `step label missing: ${label}`);
  }
  assert.match(html, /Six quick questions/);
  assert.match(html, /It reads your site, press and customers/);
  assert.match(html, /Approve smart changes with one tap/);
});

test('MCP section carries its verbatim headline and connector URL', () => {
  assert.match(html, /80% fewer tokens/i);
  assert.match(html, /https:\/\/s\.agencyai\.app\/mcp/);
});

test('the strategist banner is a link, not a form field', () => {
  const start = html.indexOf('id="strategist"');
  const band = html.slice(start, html.indexOf('</section>', start));
  assert.doesNotMatch(band, /<textarea/, 'the typed line must never be a real input');
  assert.doesNotMatch(band, /<input/, 'the banner has no form controls');
  assert.match(band, /aria-label="Ask your AI Strategist"/);
});

test('decorative motion is gated behind prefers-reduced-motion', () => {
  assert.match(html, /@media \(prefers-reduced-motion: no-preference\)/);
});

/* ── shared header + mobile menu, on all 11 pages ── */

test('every page carries the mobile menu trigger with its aria contract', () => {
  for (const page of SHARED_HEADER_PAGES) {
    const pageHtml = read(page);
    assert.match(pageHtml, /data-mm-open/, `${page}: missing menu trigger`);
    assert.match(pageHtml, /aria-controls="mobile-menu"/, `${page}: trigger missing aria-controls`);
    assert.match(pageHtml, /aria-expanded="false"/, `${page}: trigger missing initial aria-expanded`);
  }
});

test('every page carries the mobile menu panel with its dialog semantics', () => {
  for (const page of SHARED_HEADER_PAGES) {
    const pageHtml = read(page);
    assert.match(pageHtml, /data-mm-panel/, `${page}: missing menu panel`);
    assert.match(pageHtml, /id="mobile-menu"/, `${page}: panel id must match aria-controls`);
    assert.match(pageHtml, /role="dialog"/, `${page}: panel missing role=dialog`);
    assert.match(pageHtml, /aria-modal="true"/, `${page}: panel missing aria-modal`);
    assert.match(pageHtml, /aria-hidden="true"/, `${page}: panel missing initial aria-hidden`);
    assert.match(pageHtml, /data-mm-close/, `${page}: panel missing close button`);
  }
});

test('every page loads the shared menu behaviour script', () => {
  for (const page of SHARED_HEADER_PAGES) {
    assert.match(read(page), /assets\/js\/mobile-menu\.js" defer/, `${page}: menu script not loaded`);
  }
});

test('the legacy nav markup and its scripts are gone everywhere', () => {
  for (const page of SHARED_HEADER_PAGES) {
    const pageHtml = read(page);
    assert.doesNotMatch(pageHtml, /class="nav-toggle"/, `${page}: legacy toggle still present`);
    assert.doesNotMatch(pageHtml, /class="nav-links"/, `${page}: legacy nav list still present`);
    assert.doesNotMatch(
      pageHtml,
      /querySelector\('\.nav-toggle'\)/,
      `${page}: legacy menu script still present`,
    );
    assert.doesNotMatch(pageHtml, /nav\.style\.padding/, `${page}: legacy nav-shrink script still present`);
  }
});

test('the dashboard is linked, never embedded or rehosted', () => {
  for (const page of SHARED_HEADER_PAGES) {
    const pageHtml = read(page);
    assert.match(pageHtml, /href="https:\/\/dashboard\.agencyai\.app\//, `${page}: dashboard link missing`);
    assert.doesNotMatch(
      pageHtml,
      /<iframe[^>]*dashboard\.agencyai\.app/,
      `${page}: dashboard must not be embedded`,
    );
  }
});

/* ── brand QC on the shipped page ── */

test('no banned marketing vocabulary reaches the page', () => {
  for (const word of [
    'agentic',
    'AI agent intelligence',
    'orchestration',
    'AI-powered omnichannel',
    'leverage',
    'seamless',
    'unlock',
    'revolutionize',
    'game-changing',
  ]) {
    assert.doesNotMatch(html, new RegExp(word, 'i'), `banned word on the page: ${word}`);
  }
});

test('only the AI Strategist is presented as live today', () => {
  assert.match(html, /AI Strategist/i);
  for (const role of ['media buyer', 'creative director']) {
    assert.doesNotMatch(
      html,
      new RegExp(`${role}[^.]{0,40}(live|today|available now)`, 'i'),
      `${role} must not read as shipping`,
    );
  }
});
