/* ── FOOTER NEWSLETTER SIGNUP ──
   Progressive enhancement over the markup already in each page's footer.
   Loaded with `defer` on every page. */

(function () {
  'use strict';

  var ENDPOINT = '/api/subscribe';

  // Deliberately loose. Real validation is the server's job; this only decides
  // when to enable the button, so it should not reject unusual-but-valid addresses.
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var MESSAGES = {
    idle: 'One email a week. Unsubscribe anytime.',
    loading: 'Signing you up…',
    success: "You're in. Check your inbox to confirm.",
    invalid: 'That email address does not look right.',
    error: 'Something went wrong. Try again in a moment.'
  };

  /**
   * The single seam between the UI and the backend.
   *
   * The UI never learns what the backend is, so swapping beehiiv wiring later
   * (embed endpoint, different provider, whatever) means changing this function
   * and nothing else. Resolves on success, rejects with a user-safe message.
   */
  function submitEmail(email, honeypot) {
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, website: honeypot })
    }).then(function (res) {
      return res
        .json()
        .catch(function () { return {}; })
        .then(function (body) {
          if (res.ok) return body;
          throw new Error(body && body.error ? body.error : MESSAGES.error);
        });
    });
  }

  function initNewsletter(root) {
    var form = root.querySelector('.newsletter-form');
    var input = root.querySelector('.newsletter-input');
    var button = root.querySelector('.newsletter-submit');
    var status = root.querySelector('.newsletter-status');
    var honeypot = root.querySelector('.newsletter-hp input');

    if (!form || !input || !button || !status) return;

    var submitting = false;

    function setStatus(state, message) {
      status.setAttribute('data-state', state);
      status.textContent = message;
    }

    function isValid() {
      return EMAIL_RE.test(input.value.trim());
    }

    function syncButton() {
      button.disabled = submitting || !isValid();
    }

    // Clear the error styling as soon as the user starts correcting the address —
    // nagging while someone is mid-fix is worse than no feedback at all.
    input.addEventListener('input', function () {
      root.classList.remove('is-invalid');
      if (status.getAttribute('data-state') === 'error') {
        setStatus('idle', MESSAGES.idle);
      }
      syncButton();
    });

    input.addEventListener('blur', function () {
      if (input.value.trim() && !isValid()) {
        root.classList.add('is-invalid');
        setStatus('error', MESSAGES.invalid);
      }
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (submitting || !isValid()) return;

      submitting = true;
      syncButton();
      setStatus('loading', MESSAGES.loading);

      submitEmail(input.value.trim(), honeypot ? honeypot.value : '')
        .then(function () {
          setStatus('success', MESSAGES.success);
          input.value = '';
          // Leave the button disabled on success so the empty field cannot be
          // resubmitted; syncButton() below would re-enable it.
          submitting = false;
          button.disabled = true;
        })
        .catch(function (err) {
          setStatus('error', err && err.message ? err.message : MESSAGES.error);
          submitting = false;
          syncButton();
        });
    });

    setStatus('idle', MESSAGES.idle);
    syncButton();
  }

  function init() {
    var roots = document.querySelectorAll('.newsletter');
    for (var i = 0; i < roots.length; i++) initNewsletter(roots[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
