'use strict';

// ============================================
// Hero Title — Character Reveal
// ============================================
function initHeroTextReveal() {
  var title = document.querySelector('.js-reveal-text');
  if (!title) return;

  // Split HTML into char spans, preserving <br> tags
  var rawHTML = title.innerHTML;
  var parts = rawHTML.split(/(<br\s*\/?>)/gi);

  var charIndex = 0;
  var html = '';

  parts.forEach(function (part) {
    if (/^<br/i.test(part)) {
      html += part;
    } else {
      part.split('').forEach(function (char) {
        if (char === ' ' || char === '\u00a0') {
          html += ' ';
        } else {
          var delay = (0.15 + charIndex * 0.05).toFixed(2);
          html += '<span class="char" style="transition-delay:' + delay + 's">' + char + '</span>';
          charIndex++;
        }
      });
    }
  });

  title.innerHTML = html;

  // Trigger reveal after a short delay
  requestAnimationFrame(function () {
    setTimeout(function () {
      title.querySelectorAll('.char').forEach(function (char) {
        char.classList.add('revealed');
      });
    }, 200);
  });
}

// ============================================
// Scroll Reveal — Intersection Observer
// ============================================
function initScrollReveal() {
  var targets = document.querySelectorAll('.js-reveal');
  if (!targets.length) return;

  // Stagger children within grid containers
  var staggerParents = document.querySelectorAll(
    '.problems-grid, .reasons-grid, .lessons-grid, .pricing-grid, .testimonials-grid'
  );

  staggerParents.forEach(function (parent) {
    var items = parent.querySelectorAll('.js-reveal');
    items.forEach(function (item, i) {
      var base = parseFloat(item.style.transitionDelay) || 0;
      item.style.transitionDelay = (base + i * 0.08) + 's';
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -48px 0px'
  });

  targets.forEach(function (el) {
    observer.observe(el);
  });
}

// ============================================
// Hamburger Menu
// ============================================
function initHamburger() {
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function () {
    var isOpen = this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    this.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on menu link click
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ============================================
// Header — Scroll Effect
// ============================================
function initHeaderScroll() {
  var header = document.querySelector('[data-section="header"]');
  if (!header) return;

  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var current = window.scrollY;

    if (current > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = current;
  }, { passive: true });
}

// ============================================
// Smooth Scroll — internal anchors
// ============================================
function initSmoothScroll() {
  var HEADER_H = 60;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - HEADER_H;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}

// ============================================
// Ticker — duplicate for seamless loop
//   (The HTML already has doubled content;
//   this ensures the animation wraps cleanly.)
// ============================================
function initTicker() {
  var ticker = document.querySelector('.hero-ticker');
  if (!ticker) return;
  // Width is handled via CSS animation; nothing extra needed.
}

// ============================================
// Init
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  initHeroTextReveal();
  initScrollReveal();
  initHamburger();
  initHeaderScroll();
  initSmoothScroll();
  initTicker();
});
