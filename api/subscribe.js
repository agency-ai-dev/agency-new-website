/**
 * POST /api/subscribe — footer newsletter signup.
 *
 * Vercel zero-config serverless function. The beehiiv credentials live only here,
 * server-side; the browser never sees them and never talks to beehiiv directly.
 *
 * Required environment variables (set in the Vercel project, never committed):
 *   BEEHIIV_API_KEY  — from beehiiv Settings > Integrations
 *   BEEHIIV_PUB_ID   — same screen, format `pub_...`
 */

'use strict';

var BEEHIIV_API = 'https://api.beehiiv.com/v2';
var UTM_SOURCE = 'agencyai_footer';

// Matches the client-side check in assets/js/newsletter.js. Kept loose on purpose:
// rejecting unusual-but-valid addresses loses real subscribers.
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

var GENERIC_ERROR = 'Something went wrong. Try again in a moment.';

function send(res, status, body) {
  res.setHeader('Content-Type', 'application/json');
  res.status(status).send(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed' });
  }

  // Vercel parses JSON bodies, but be defensive about a raw string body.
  var body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (err) {
      return send(res, 400, { error: 'Invalid request.' });
    }
  }
  if (!body || typeof body !== 'object') {
    return send(res, 400, { error: 'Invalid request.' });
  }

  // Honeypot. Return 200 so a bot cannot tell it was caught, but do not call
  // beehiiv — this submission goes nowhere.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return send(res, 200, { ok: true });
  }

  var email = typeof body.email === 'string' ? body.email.trim() : '';
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return send(res, 400, { error: 'That email address does not look right.' });
  }

  var apiKey = process.env.BEEHIIV_API_KEY;
  var pubId = process.env.BEEHIIV_PUB_ID;

  // Missing config is our failure, not the visitor's. Log loudly for us, show the
  // generic error to them — a form that silently does nothing looks broken.
  if (!apiKey || !pubId) {
    console.error(
      '[subscribe] Missing beehiiv config: ' +
        (!apiKey ? 'BEEHIIV_API_KEY ' : '') +
        (!pubId ? 'BEEHIIV_PUB_ID' : '')
    );
    return send(res, 503, { error: GENERIC_ERROR });
  }

  try {
    var beehiivRes = await fetch(
      BEEHIIV_API + '/publications/' + encodeURIComponent(pubId) + '/subscriptions',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: UTM_SOURCE
        })
      }
    );

    if (beehiivRes.ok) {
      return send(res, 200, { ok: true });
    }

    // Read the failure body for our logs only. beehiiv's wording is not written
    // for our visitors, so it never reaches the browser.
    var detail = await beehiivRes.text().catch(function () { return ''; });
    console.error('[subscribe] beehiiv ' + beehiivRes.status + ': ' + detail);

    // An already-subscribed address is the common case here, and telling someone
    // "that went wrong" when they are already on the list is the exact dead-form
    // behaviour the ticket warns about.
    if (beehiivRes.status === 400 || beehiivRes.status === 409) {
      return send(res, 200, { ok: true });
    }

    return send(res, 502, { error: GENERIC_ERROR });
  } catch (err) {
    console.error('[subscribe] Request to beehiiv failed: ' + (err && err.message));
    return send(res, 502, { error: GENERIC_ERROR });
  }
};
