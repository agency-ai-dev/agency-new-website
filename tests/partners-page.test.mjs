import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const partners = readFileSync(new URL('../partners.html', import.meta.url), 'utf8');
const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

// ── Rollout: hidden + unlinked (SHO22-524 / AGY-1) ──
test('partners page is noindex, nofollow while hidden', () => {
  assert.match(partners, /<meta\s+name="robots"\s+content="noindex,nofollow"\s*\/?>/);
});

test('partners is reachable by clean URL via a vercel rewrite', () => {
  const sources = vercel.rewrites.map((r) => r.source);
  assert.ok(sources.includes('/partners'), 'expected a /partners rewrite');
  const rule = vercel.rewrites.find((r) => r.source === '/partners');
  assert.equal(rule.destination, '/partners.html');
});

test('partners is not linked from other pages nav or footer (kept hidden)', () => {
  for (const page of ['index.html', 'pricing.html', 'about.html', 'blog.html']) {
    const html = readFileSync(new URL(`../${page}`, import.meta.url), 'utf8');
    assert.doesNotMatch(html, /href="[^"]*partners[^"]*"/i, `${page} must not link to partners yet`);
  }
});

test('no sitemap ships that would expose the hidden page', () => {
  // The site has no sitemap.xml; the page must simply not be indexed/crawled.
  assert.doesNotMatch(partners, /sitemap/i);
});

// ── Structure: all Variant A sections present (AGY-3) ──
test('partners page renders every Variant A section', () => {
  assert.match(partners, /class="p-marquee"/);
  assert.match(partners, /class="p-hero"/);
  assert.match(partners, /class="p-curated"/);
  assert.match(partners, /class="p-closing"/);
});

test('hero headline splits with a blue accent second line', () => {
  assert.match(partners, /Partners that<br\s*\/?>\s*<span class="accent">scale with you<\/span>/);
});

test('closing band carries the GROW ghost wordmark and mint apply CTA', () => {
  assert.match(partners, /class="p-closing__ghost"[^>]*><span>GROW<\/span>/);
  assert.match(partners, /class="p-closing__cta"[\s\S]*?Apply to partner/);
});

// ── Data source + cards (AGY-2) ──
test('partners render from a data array, not hardcoded markup', () => {
  assert.match(partners, /const PARTNERS = \[/);
  assert.match(partners, /getElementById\('partnerGrid'\)/);
});

test('seeded with the five placeholder partners from the handoff', () => {
  for (const name of ['Northbeam Labs', 'Studio Kern', 'Haul & Co.', 'Loop Retention', 'Meridian Growth']) {
    assert.ok(partners.includes(name), `expected placeholder partner ${name}`);
  }
});

test('partner CTA links open externally with safe rel', () => {
  assert.match(partners, /target="_blank" rel="noopener sponsored"/);
});

test('partner count is auto-derived from the data length', () => {
  assert.match(partners, /padStart\(2, '0'\)/);
  assert.match(partners, /Current partners/);
});

// ── Motion + type (AGY-3 / AGY-4) ──
test('marquee pauses under prefers-reduced-motion', () => {
  assert.match(partners, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?p-marquee__track\s*\{\s*animation: none/);
});

test('display + mono type follow the handoff (Archivo / JetBrains Mono)', () => {
  assert.match(partners, /family=Archivo/);
  assert.match(partners, /--p-font-display: 'Archivo'/);
  assert.match(partners, /--p-font-mono: 'JetBrains Mono'/);
});

test('partners grid collapses to a single column on mobile', () => {
  assert.match(partners, /@media \(max-width: 768px\)[\s\S]*?p-curated__grid\s*\{\s*grid-template-columns: 1fr/);
});

// ── Reuse of existing site chrome (AGY-1) ──
test('partners page reuses the existing site nav and footer', () => {
  assert.match(partners, /class="site-header"/);
  assert.match(partners, /class="nav-links"/);
  assert.match(partners, /class="footer-top"/);
});

test('page uses a main landmark for the partners content', () => {
  assert.match(partners, /<main class="partners-page">/);
});
