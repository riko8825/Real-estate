/* ============================================================
   main.js — All interactive behavior (PLACEHOLDER)

   Source: index.html <script> block (bottom of body)

   Modules to migrate (preserve order — some depend on DOM ready):
   1. cursor-glow         mouse follow
   2. nav scroll state    .scrolled class @ scrollY > 60
   3. hero parallax       #heroBg translateY
   4. about visual reveal #aboutVisual IntersectionObserver
   5. scroll reveal       .reveal → .visible
   6. animateCounters()   .stat-num[data-target] cubic ease-out 1800ms
   7. testimonials slider perView 2/1, auto-rotate 5500ms, touch 50px
   8. mobile menu         #navHamburger / #mobileClose
   9. heart toggle        .property-action SVG fill + data-on
   10. handleSubmit()     form — PLACEHOLDER, no backend wired

   RULES (already enforced in index.html):
   - Vanilla JS only (no framework, no jQuery)
   - ID-driven selectors (getElementById)
   - Guard all queries with `if (el)`
   - { passive: true } on scroll/touch listeners
   - window.handleSubmit / closeMobile must be global (inline onclick)
   ============================================================ */

'use strict';

/* TODO: migrate modules from index.html <script> block when split happens */
