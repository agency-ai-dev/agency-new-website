import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const PAGES = [
  'index.html',
  'about.html',
  'pricing.html',
  'blog.html',
  'cookie-policy.html',
  'terms-of-service.html',
  'privacy-policy.html',
  'blog/2025-01-01-facebook-instagram-shopify-setup.html',
  'blog/2026-04-20-vapor95-meta-ads-case-study.html',
  'blog/2026-05-21-google-youtube-shopify-setup.html'
];

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const pages = PAGES.map((path) => [path, read(path)]);
const clientJs = read('assets/js/newsletter.js');
const serverJs = read('api/subscribe.js');

test('every page carries the footer signup form', () => {
  for (const [path, html] of pages) {
    assert.match(html, /<div class="newsletter">/, `${path} is missing the signup block`);
    assert.match(html, /class="newsletter-input"[^>]*type="email"/, `${path} is missing the email input`);
    assert.match(html, /<button class="newsletter-submit" type="submit">Subscribe<\/button>/, `${path} is missing the submit button`);
    assert.match(html, /Get the brief/, `${path} is missing the signup label`);
  }
});

test('the signup sits above the footer bottom bar', () => {
  for (const [path, html] of pages) {
    assert.ok(
      html.indexOf('class="newsletter"') < html.indexOf('class="footer-bottom"'),
      `${path} renders the signup below the footer bottom bar`
    );
  }
});

test('every page links the shared newsletter assets with a correct relative path', () => {
  for (const [path, html] of pages) {
    const prefix = path.includes('/') ? '\\.\\./' : '';
    assert.match(html, new RegExp(`<link rel="stylesheet" href="${prefix}assets/css/newsletter\\.css"`), `${path} is missing the stylesheet link`);
    assert.match(html, new RegExp(`<script src="${prefix}assets/js/newsletter\\.js" defer>`), `${path} is missing the deferred script`);
  }
});

test('every page ships the honeypot, hidden from assistive tech', () => {
  for (const [path, html] of pages) {
    assert.match(html, /class="newsletter-hp" aria-hidden="true"/, `${path} is missing the honeypot wrapper`);
    assert.match(html, /name="website" tabindex="-1" autocomplete="off"/, `${path} has a reachable honeypot`);
  }
});

test('the status line announces state changes politely', () => {
  for (const [path, html] of pages) {
    assert.match(html, /class="newsletter-status" role="status" aria-live="polite"/, `${path} is missing the live status region`);
  }
});

test('no beehiiv markup, script, or asset reaches the browser', () => {
  for (const [path, html] of pages) {
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

test('credentials are read from the environment and never inlined', () => {
  assert.match(serverJs, /process\.env\.BEEHIIV_API_KEY/);
  assert.match(serverJs, /process\.env\.BEEHIIV_PUB_ID/);
  assert.doesNotMatch(serverJs, /pub_[0-9a-f]{8}-/i, 'a real publication id looks hardcoded');
});

test('the subscribe endpoint tags subscribers with the footer source', () => {
  assert.match(serverJs, /utm_source: UTM_SOURCE/);
  assert.match(serverJs, /var UTM_SOURCE = 'agencyai_footer';/);
});

test('the subscribe endpoint rejects non-POST requests', () => {
  assert.match(serverJs, /req\.method !== 'POST'/);
  assert.match(serverJs, /405/);
});

test('a filled honeypot never reaches beehiiv', () => {
  const honeypotGuard = serverJs.indexOf('body.website');
  const beehiivCall = serverJs.indexOf('await fetch(');
  assert.ok(honeypotGuard > -1, 'no honeypot check server-side');
  assert.ok(honeypotGuard < beehiivCall, 'honeypot is checked after the beehiiv call');
});
