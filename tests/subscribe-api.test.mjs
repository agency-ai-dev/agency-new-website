import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const handler = require('../api/subscribe.js');

/** Minimal stand-in for the Vercel response object. */
function mockRes() {
  return {
    statusCode: null,
    body: null,
    headers: {},
    setHeader(k, v) { this.headers[k] = v; },
    status(code) { this.statusCode = code; return this; },
    send(payload) { this.body = JSON.parse(payload); return this; }
  };
}

/** Runs the handler with env and fetch stubbed, restoring both afterwards. */
async function invoke(body, { env = {}, fetchImpl } = {}) {
  const prevKey = process.env.BEEHIIV_API_KEY;
  const prevPub = process.env.BEEHIIV_PUB_ID;
  const prevFetch = globalThis.fetch;

  process.env.BEEHIIV_API_KEY = 'test-key';
  process.env.BEEHIIV_PUB_ID = 'pub_test';
  if ('BEEHIIV_API_KEY' in env && env.BEEHIIV_API_KEY === undefined) delete process.env.BEEHIIV_API_KEY;
  if ('BEEHIIV_PUB_ID' in env && env.BEEHIIV_PUB_ID === undefined) delete process.env.BEEHIIV_PUB_ID;

  const calls = [];
  globalThis.fetch = (...args) => {
    calls.push(args);
    return fetchImpl
      ? fetchImpl(...args)
      : Promise.resolve({ ok: true, status: 201, text: () => Promise.resolve('') });
  };

  const res = mockRes();
  try {
    await handler({ method: 'POST', body }, res);
  } finally {
    process.env.BEEHIIV_API_KEY = prevKey;
    process.env.BEEHIIV_PUB_ID = prevPub;
    globalThis.fetch = prevFetch;
  }
  return { res, calls };
}

test('a valid email is forwarded to beehiiv and reported as success', async () => {
  const { res, calls } = await invoke({ email: 'operator@example.com', website: '' });

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true });
  assert.equal(calls.length, 1);

  const [url, options] = calls[0];
  assert.equal(url, 'https://api.beehiiv.com/v2/publications/pub_test/subscriptions');
  assert.equal(options.headers.Authorization, 'Bearer test-key');

  const sent = JSON.parse(options.body);
  assert.equal(sent.email, 'operator@example.com');
  assert.equal(sent.utm_source, 'agencyai_footer');
  assert.equal(sent.reactivate_existing, false);
  assert.equal(sent.send_welcome_email, true);
});

test('the email is trimmed before being sent', async () => {
  const { calls } = await invoke({ email: '  operator@example.com  ', website: '' });
  assert.equal(JSON.parse(calls[0][1].body).email, 'operator@example.com');
});

test('a filled honeypot looks successful but never reaches beehiiv', async () => {
  const { res, calls } = await invoke({ email: 'bot@example.com', website: 'http://spam.example' });

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true });
  assert.equal(calls.length, 0, 'honeypot submission was forwarded to beehiiv');
});

test('a malformed email is rejected without calling beehiiv', async () => {
  for (const email of ['not-an-email', '', 'a@b', 'no@domain.', undefined]) {
    const { res, calls } = await invoke({ email, website: '' });
    assert.equal(res.statusCode, 400, `accepted ${JSON.stringify(email)}`);
    assert.equal(calls.length, 0, `forwarded ${JSON.stringify(email)}`);
  }
});

test('an absurdly long address is rejected', async () => {
  const { res, calls } = await invoke({ email: 'a'.repeat(250) + '@example.com', website: '' });
  assert.equal(res.statusCode, 400);
  assert.equal(calls.length, 0);
});

test('missing credentials fail loudly to the logs but softly to the visitor', async () => {
  const { res, calls } = await invoke(
    { email: 'operator@example.com', website: '' },
    { env: { BEEHIIV_API_KEY: undefined } }
  );

  assert.equal(res.statusCode, 503);
  assert.match(res.body.error, /try again/i);
  assert.equal(calls.length, 0);
});

test('an already-subscribed address is not shown as a failure', async () => {
  const { res } = await invoke(
    { email: 'existing@example.com', website: '' },
    { fetchImpl: () => Promise.resolve({ ok: false, status: 400, text: () => Promise.resolve('already exists') }) }
  );

  // Telling someone "that went wrong" when they are already subscribed is the
  // dead-form behaviour the ticket calls out.
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true });
});

test('a beehiiv outage surfaces a generic error, never beehiiv wording', async () => {
  const { res } = await invoke(
    { email: 'operator@example.com', website: '' },
    { fetchImpl: () => Promise.resolve({ ok: false, status: 500, text: () => Promise.resolve('beehiiv internal explosion') }) }
  );

  assert.equal(res.statusCode, 502);
  assert.doesNotMatch(res.body.error, /beehiiv/i);
});

test('a network failure is caught rather than crashing the function', async () => {
  const { res } = await invoke(
    { email: 'operator@example.com', website: '' },
    { fetchImpl: () => Promise.reject(new Error('ECONNRESET')) }
  );

  assert.equal(res.statusCode, 502);
  assert.doesNotMatch(res.body.error, /ECONNRESET/);
});

test('a JSON string body is parsed', async () => {
  const { res, calls } = await invoke(JSON.stringify({ email: 'operator@example.com', website: '' }));
  assert.equal(res.statusCode, 200);
  assert.equal(calls.length, 1);
});

test('a junk body is rejected', async () => {
  const { res } = await invoke('not json at all');
  assert.equal(res.statusCode, 400);
});

test('non-POST methods are refused', async () => {
  const res = mockRes();
  await handler({ method: 'GET' }, res);
  assert.equal(res.statusCode, 405);
  assert.equal(res.headers.Allow, 'POST');
});
