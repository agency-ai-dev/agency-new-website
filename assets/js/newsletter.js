/* ── NEWSLETTER — THE OPERATOR BRIEF ──
   Progressive enhancement over the section markup already in index.html.
   Loaded with `defer`. */

(function () {
  'use strict';

  var ENDPOINT = '/api/subscribe';

  // Deliberately loose. Real validation is the server's job; this only decides
  // when to enable the button, so it should not reject unusual-but-valid addresses.
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var MESSAGES = {
    loading: 'Signing you up…',
    success: "You're in. Check your inbox to confirm.",
    invalid: 'That email address does not look right.',
    error: 'Something went wrong. Try again in a moment.'
  };

  // The reassurance line doubles as the resting state of the status region. It
  // lives in the markup rather than here so it renders without JS, and so CSS
  // owns the responsive part — a width measured once in JS goes stale on resize.

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
    var idleHTML = status.innerHTML;

    // Idle restores the markup's own copy (which carries a span CSS hides on
    // narrow screens); every other state is plain text.
    function setStatus(state, message) {
      status.setAttribute('data-state', state);
      if (state === 'idle') {
        status.innerHTML = idleHTML;
      } else {
        status.textContent = message;
      }
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
        setStatus('idle');
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

    setStatus('idle');
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
