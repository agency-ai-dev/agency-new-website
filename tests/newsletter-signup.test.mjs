import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const OTHER_PAGES = [
  'about.html',
  'pricing.html',
  'blog.html',
  'cookie-policy.html',
  'terms-of-service.html',
  'privacy-policy.html',
  'blog/2026-01-01-facebook-instagram-shopify-setup.html',
  'blog/2026-04-20-vapor95-meta-ads-case-study.html',
  'blog/2026-05-21-google-youtube-shopify-setup.html'
];

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const index = read('index.html');
const others = OTHER_PAGES.map((path) => [path, read(path)]);
const clientJs = read('assets/js/newsletter.js');
const serverJs = read('api/subscribe.js');

test('index carries the signup section with the approved copy', () => {
  assert.match(index, /<section class="newsletter">/);
  assert.match(index, /The Operator Brief/);
  assert.match(index, /Steal our <em>benchmarks<\/em>/);
  assert.match(index, /Once a month: median ROAS and CPA by vertical/);
  assert.match(index, /<button class="newsletter-submit" type="submit">Get the brief<\/button>/);
  assert.match(index, /placeholder="you@yourstore\.com"/);
});

test('the section sits directly above the final CTA', () => {
  const section = index.indexOf('<section class="newsletter">');
  const cta = index.indexOf('<section class="cta-section">');
  assert.ok(section > -1 && cta > -1, 'section or CTA missing');
  assert.ok(section < cta, 'signup renders below the final CTA');
  // Nothing but whitespace between them — they read as one block.
  assert.match(index.slice(index.lastIndexOf('</section>', cta) + 10, cta), /^\s*$/);
});

test('the signup appears on index only', () => {
  for (const [path, html] of others) {
    assert.doesNotMatch(html, /class="newsletter"/, `${path} still has the signup`);
    assert.doesNotMatch(html, /newsletter\.css/, `${path} still links the stylesheet`);
    assert.doesNotMatch(html, /newsletter\.js/, `${path} still links the script`);
  }
});

test('index links the shared newsletter assets', () => {
  assert.match(index, /<link rel="stylesheet" href="assets\/css\/newsletter\.css"\/>/);
  assert.match(index, /<script src="assets\/js\/newsletter\.js" defer><\/script>/);
});

test('the honeypot ships and is hidden from assistive tech', () => {
  assert.match(index, /class="newsletter-hp" aria-hidden="true"/);
  assert.match(index, /name="website" tabindex="-1" autocomplete="off"/);
});

test('the status line announces state changes politely', () => {
  assert.match(index, /class="newsletter-status" role="status" aria-live="polite"/);
});

test('the email input is labelled for screen readers', () => {
  assert.match(index, /class="newsletter-input"[^>]*aria-label="Email address"/);
});

test('no beehiiv markup, script, or asset reaches the browser', () => {
  assert.doesNotMatch(index, /beehiiv/i, 'index leaks beehiiv into the page');
  for (const [path, html] of others) {
    assert.doesNotMatch(html, /beehiiv/i, `${path} leaks beehiiv into the page`);
  }
  // The word may appear in comments; what matters is that the browser never
  // resolves a beehiiv host or loads a beehiiv asset.
  assert.doesNotMatch(clientJs, /beehiiv\.com/i, 'client JS contacts beehiiv directly');
});

test('client code talks only to our own endpoint through one seam', () => {
  assert.match(clientJs, /var ENDPOINT = '\/api\/subscribe';/);
  assert.match(clientJs, /function submitEmail\(/);
  // A second fetch target would mean the UI has learned about the backend.
  assert.equal(clientJs.match(/fetch\(/g).length, 1);
});

test('the resting message lives in the markup so it renders without JS', () => {
  assert.match(index, /1 email\/month · Unsubscribe in one click/);
  assert.match(index, /<span class="newsletter-note-extra"> · We never sell your data<\/span>/);
  // The old weekly claim must not survive the copy change.
  assert.doesNotMatch(index, /email a week/i);
  assert.doesNotMatch(clientJs, /email a week/i);
});

test('the third clause is dropped on narrow screens by CSS, not by JS', () => {
  const css = read('assets/css/newsletter.css');
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*\.newsletter-note-extra \{ display: none; \}/);
  // A width measured once in JS goes stale on resize, and read 0 in a
  // backgrounded tab — which silently hid the desktop copy.
  assert.doesNotMatch(clientJs, /matchMedia/);
});

test('credentials are read from the environment and never inlined', () => {
  assert.match(serverJs, /process\.env\.BEEHIIV_API_KEY/);
  assert.match(serverJs, /process\.env\.BEEHIIV_PUB_ID/);
  assert.doesNotMatch(serverJs, /pub_[0-9a-f]{8}-/i, 'a real publication id looks hardcoded');
});

test('the subscribe endpoint tags subscribers with the footer source', () => {
  assert.match(serverJs, /utm_source: UTM_SOURCE/);
  assert.match(serverJs, /var UTM_SOURCE = 'agencyai_footer';/);
});
