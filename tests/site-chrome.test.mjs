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

const menuJs = read('../assets/js/mobile-menu.js');

/* A media query tagged sync:desktop must switch at the DESKTOP value in
   mobile-menu.js; one tagged sync:desktop-1 closes the band one pixel below it.
   Untagged breakpoints (640px, 639px, 359px) are independent of the menu and
   are deliberately not checked. */
function taggedBreakpoints(css, marker, prop) {
  const lines = css.split('\n');
  const found = [];
  lines.forEach((line, i) => {
    if (line.trim() !== `/* ${marker} */`) return;
    const next = lines[i + 1] ?? '';
    const m = next.match(new RegExp(`${prop}: (\\d+)px`));
    assert.ok(m, `${marker} must sit directly above a ${prop} media query, got: ${next.trim()}`);
    found.push(Number(m[1]));
  });
  return found;
}

test('every breakpoint tagged sync:desktop tracks the menu JS', () => {
  const declared = menuJs.match(/var DESKTOP = '\(min-width: (\d+)px\)'/);
  assert.ok(declared, 'mobile-menu.js: could not find the DESKTOP constant');
  const desktop = Number(declared[1]);

  const sheets = [['header.css', headerCss], ['mobile-menu.css', menuCss]];
  let tagged = 0;

  for (const [name, css] of sheets) {
    for (const width of taggedBreakpoints(css, 'sync:desktop', 'min-width')) {
      tagged += 1;
      assert.equal(width, desktop,
        `${name}: ${width}px must equal the DESKTOP constant in mobile-menu.js (${desktop}px)`);
    }
    for (const width of taggedBreakpoints(css, 'sync:desktop-1', 'max-width')) {
      tagged += 1;
      assert.equal(width, desktop - 1,
        `${name}: ${width}px must close the band one pixel below DESKTOP (${desktop - 1}px)`);
    }
  }

  assert.equal(tagged, 5, `expected 5 tagged breakpoints, found ${tagged} - a tag was lost`);
});
