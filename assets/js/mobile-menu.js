/* ============================================================
   agency ai — mobile menu 1a "Quiet stack"
   Adapted from the 1a-quiet-stack handoff.
   Vanilla, no dependencies. Handles open/close, scroll lock,
   Esc, focus trap and focus restore.

   Markup contract:
     <button data-mm-open aria-controls="mobile-menu" aria-expanded="false">
     <div id="mobile-menu" class="mm-panel" data-mm-panel aria-hidden="true">
       ... <button data-mm-close> ...
       ... <a data-mm-dismiss> ...
   ============================================================ */

(function () {
  'use strict';

  var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
  /* Media queries tagged "sync:desktop" in assets/css/header.css and
     assets/css/mobile-menu.css must match this value; "sync:desktop-1" ones
     sit one pixel below it. tests/site-chrome.test.mjs enforces both. */
  var DESKTOP = '(min-width: 900px)';

  function toArray(list) {
    return Array.prototype.slice.call(list || []);
  }

  function MobileMenu(panel) {
    if (!panel) return;

    this.panel = panel;
    this.triggers = toArray(
      document.querySelectorAll('[data-mm-open][aria-controls="' + panel.id + '"]')
    );
    this.lastFocus = null;

    var self = this;

    this.triggers.forEach(function (t) {
      t.addEventListener('click', function () { self.open(t); });
    });

    toArray(panel.querySelectorAll('[data-mm-close]')).forEach(function (b) {
      b.addEventListener('click', function () { self.close(); });
    });

    // any nav choice closes the menu
    toArray(panel.querySelectorAll('[data-mm-dismiss]')).forEach(function (a) {
      a.addEventListener('click', function () { self.close(); });
    });

    document.addEventListener('keydown', function (e) {
      if (!self.isOpen()) return;
      if (e.key === 'Escape' || e.key === 'Esc') { e.preventDefault(); self.close(); }
      if (e.key === 'Tab') self.trap(e);
    });

    // the panel is display:none at desktop widths — never leave the page
    // scroll-locked behind a panel the user can no longer see or dismiss
    if (window.matchMedia) {
      var mq = window.matchMedia(DESKTOP);
      var onChange = function (e) { if (e.matches && self.isOpen()) self.close(); };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }

    // stagger index for the entrance animation
    toArray(panel.querySelectorAll('.mm-link')).forEach(function (el, i) {
      el.style.setProperty('--i', i);
    });
  }

  MobileMenu.prototype.isOpen = function () {
    return this.panel.classList.contains('is-open');
  };

  MobileMenu.prototype.open = function (trigger) {
    if (this.isOpen()) return;
    this.lastFocus = trigger || document.activeElement;
    this.panel.classList.add('is-open');
    this.panel.setAttribute('aria-hidden', 'false');
    this.triggers.forEach(function (t) { t.setAttribute('aria-expanded', 'true'); });
    document.body.classList.add('mm-locked');
    var first = this.panel.querySelector('[data-mm-close]');
    if (first) first.focus();
  };

  MobileMenu.prototype.close = function () {
    if (!this.isOpen()) return;
    this.panel.classList.remove('is-open');
    this.panel.setAttribute('aria-hidden', 'true');
    this.triggers.forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
    document.body.classList.remove('mm-locked');
    if (this.lastFocus && this.lastFocus.focus) this.lastFocus.focus();
  };

  MobileMenu.prototype.trap = function (e) {
    var items = toArray(this.panel.querySelectorAll(FOCUSABLE))
      .filter(function (el) { return el.offsetParent !== null; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  function init() {
    toArray(document.querySelectorAll('[data-mm-panel]')).forEach(function (p) {
      if (!p.__mm) p.__mm = new MobileMenu(p);
    });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);

  window.MobileMenu = MobileMenu;
})();
