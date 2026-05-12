import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('landing uses blue and green accent variables', () => {
  assert.match(html, /--accent-blue:/);
  assert.match(html, /--accent-green:/);
});

test('landing includes the product video section', () => {
  assert.match(html, /<section class="video-section" id="video">/);
  assert.match(html, /Agency_Ai_video_1_xwubxm\.mp4/);
  assert.match(html, /<video[\s\S]*controls[\s\S]*playsinline/);
});

test('landing includes the ai phone conversation section', () => {
  assert.match(html, /<section class="ai-call" id="ai-call">/);
  assert.match(html, /AI agent/i);
  assert.match(html, /Call summary/i);
});

test('landing includes the faq section before the cta', () => {
  assert.match(html, /<section class="faq" id="faq">/);
  assert.match(html, /Does Agency AI replace my agency\?/);
  assert.ok(html.indexOf('id="faq"') < html.indexOf('class="cta-section"'));
});

test('landing uses public proof brands instead of fabricated testimonial names', () => {
  assert.match(html, /Lola Hemp/);
  assert.match(html, /Vapor95/);
  assert.match(html, /Epic Hoodie/);
  assert.doesNotMatch(html, /Sarah Chen/);
  assert.doesNotMatch(html, /Marcus Williams/);
  assert.doesNotMatch(html, /Jamie Rodriguez/);
});

test('landing removes emoji icons from core product sections', () => {
  assert.doesNotMatch(html, /⏱|💸|📉|🎯|📈|✍️|📊|⚡|🏪|🎨|🚀/);
});
