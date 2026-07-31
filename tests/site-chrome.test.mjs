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
