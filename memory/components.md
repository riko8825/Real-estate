# Components — UI inventory

## How to read this

- **Location** column points to where component lives:
  - `index.html:NN` — line numbers in single-file `index.html` (current truth)
  - `components/*.html` / `sections/*.html` — placeholder scaffold files (NOT YET LIVE)
- **Status:**
  - ✅ live — built and shipping in `index.html`
  - ⚠️ placeholder — visual exists but needs real content/data
  - 🚧 partial — works but missing features
  - 📋 planned — not built yet

---

## Layout components (structural)

| Name | Description | Location | Status |
|---|---|---|---|
| `nav#mainNav` | Fixed top nav, scrolled-state on scroll | `index.html` body top + `components/nav.html` (placeholder) | ✅ live |
| `.mobile-menu` | Slide-in full-screen menu (≤768px) | `index.html` + `components/nav.html` | ✅ live |
| `.nav-hamburger` | 3-line burger trigger (≤768px only) | `index.html` | ✅ live |
| `footer` | 4-col footer (brand + 3 link columns) | `index.html` + `components/footer.html` | ⚠️ placeholder (some links still `href="#"`) |
| `.footer-bottom` (3-col grid) | Copyright (left) / Privacy·Terms·Sitemap (center) / Built by Empirra (right). Mobile stack vertical. `padding-right:220px` desktop to avoid LINE button overlap. | `index.html:747` + `sell-rent.html:427` + 3 legal pages | ✅ live 2026-05-19 |
| `#toast` | Bottom-center success notification (4s autohide) | `index.html` | ✅ live |
| `<head>` block | Meta, fonts, OG tags | `index.html` + `components/header.html` | ⚠️ placeholder (no favicon, no OG image) |

## Section components (page-level)

| Name | Description | Location | Status |
|---|---|---|---|
| `.hero` | 100vh hero with parallax bg + animated text | `index.html` + `sections/hero.html` | ✅ live |
| `.marquee-strip` | Auto-scroll gold strip with 20 location chips | `index.html` + `sections/hero.html` | ✅ live |
| `.properties` | Asymmetric grid (1 large + 4 small property cards) | `index.html` + `sections/properties.html` | ⚠️ placeholder (Unsplash images, fake listings) |
| `.about` | 2-col about + animated stat counters | `index.html` + `sections/about.html` | ⚠️ placeholder (fake stats) |
| `.video-intro` | Centered presentation video section — eyebrow+title+desc + 16:9 lazy-loaded video frame + 2 CTAs. Between `#about` and `#services`. | `index.html` | ✅ live 2026-05-20 (video = real, poster = Unsplash) |
| `.services` | 4-col services grid (Pool Villa Sales, Condo Sales, Holiday Rentals, Land) | `index.html` + `sections/services.html` | ✅ live |
| `.why-pattaya` | 6-card stat grid (investment thesis) | `index.html` + `sections/why-pattaya.html` | ✅ live |
| `.buyer-guide` | Freehold vs leasehold 2-col + warning note | `index.html` + `sections/buyer-guide.html` | ✅ live |
| `.testimonials` | Slider with 4 reviews, dots, prev/next, auto-rotate, touch swipe | `index.html` + `sections/testimonials.html` | ⚠️ placeholder (fake reviews) |
| `.locations` | 2-col with location list (6 areas) + map visual (4 animated pins) | `index.html` + `sections/locations.html` | ⚠️ placeholder (fake listing counts) |
| `.contact` | 2-col contact info + enquiry form (7 fields) | `index.html` + `sections/contact.html` | 🚧 partial — form has NO backend |

## UI primitives (reusable)

| Name | Description | Variants | Status |
|---|---|---|---|
| `.btn-primary` | Gold-filled CTA | — | ✅ live |
| `.btn-secondary` | Outline white CTA (backdrop-blur) | — | ✅ live |
| `.btn-outline` | Gold outline btn (used as section "view all") | — | ✅ live |
| `.nav-cta` | Compact gold-outline btn (nav only) | — | ✅ live |
| `.form-submit` | Full-width gold submit button | — | ✅ live |
| `.float-btn` | Pill-shape floating button (WhatsApp/LINE) | `.float-wa`, `.float-line` | ✅ live |
| `.contact-social-btn` | Inline WhatsApp/LINE button (contact section) | `.btn-wa`, `.btn-line` | ✅ live |
| `.property-badge` | Small uppercase badge on property card | `.badge-sale` (gold), `.badge-rent` (blue) | ✅ live |
| `.property-action` | Round 38px heart toggle button | — | ✅ live (toggles SVG fill) |
| `.section-eyebrow` | All-caps gold label above title | — | ✅ live (used 9+ times) |
| `.section-title` | Playfair h2 with fluid `clamp()` size | — | ✅ live |
| `.section-desc` | Muted body paragraph (max-width 520px) | — | ✅ live |
| `.section-header` / `.section-header-flex` | Wrapper for eyebrow+title+desc | — | ✅ live |
| `.reveal` | Class for scroll-triggered fade-up | + `.visible` (added by JS) | ✅ live |
| `#cursor-glow` | Mouse-follow gold radial glow (desktop only) | — | ✅ live |

## Card components

| Name | Description | Location | Status |
|---|---|---|---|
| `.property-card` | Image + price + name + meta (hover reveals meta) | `sections/properties.html` | ⚠️ placeholder data |
| `.service-card` | Number + icon + title + desc (bottom border on hover) | `sections/services.html` | ✅ live |
| `.why-card` | Stat + label + desc | `sections/why-pattaya.html` | ✅ live |
| `.buyer-card` | Icon + title + features list + price | `sections/buyer-guide.html` | ✅ live |
| `.testimonial-card` | 5 stars + quote + author with avatar | `sections/testimonials.html` | ⚠️ placeholder data |
| `.location-item` | Area name + listing count (gold) | `sections/locations.html` | ⚠️ placeholder counts |
| `.contact-detail-item` | Icon + label + value (phone/email/office) | `sections/contact.html` | ⚠️ placeholder values |
| `.video-intro-frame` | 16:9 video container — poster `<img>` + overlay + meta badge + gold play button + `<video>`. Hover: gold border, corner accents, lift. `.playing` state swaps poster→video. | `index.html` | ✅ live 2026-05-20 |

## Form components

| Name | Description | Status |
|---|---|---|
| `.form-input` | Text/email/tel input (dark bg, gold focus border) | ✅ live |
| `.form-select` | Custom dropdown with gold chevron SVG | ✅ live |
| `.form-textarea` | Resizable textarea (110px min) | ✅ live |
| `.form-row` | 2-col grid wrapper for form fields | ✅ live |
| `.form-group` | Single field wrapper (label + input) | ✅ live |
| `.form-label` | All-caps muted label (`.68rem`, `.3em` tracking) | ✅ live |

## Interactive behavior (JS-driven)

| Feature | Trigger | Implementation | Status |
|---|---|---|---|
| Cursor glow | `mousemove` | Inline JS in `index.html` `<script>` | ✅ live |
| Nav scroll state | `scroll` > 60px | Toggle `.scrolled` class | ✅ live |
| Hero parallax | `scroll` | `translateY(scrollY * 0.3)` | ✅ live |
| About visual zoom | IntersectionObserver | Add `.in-view` class | ✅ live |
| Scroll reveal | IntersectionObserver | Add `.visible` to all `.reveal` | ✅ live |
| Stat counter animation | IntersectionObserver (one-shot) | RAF + cubic ease-out, 1800ms | ✅ live |
| Testimonials slider | Buttons + dots + touch + auto-rotate | 5500ms interval, 50px touch threshold | ✅ live |
| Mobile menu | Hamburger click | Toggle `.open` class | ✅ live |
| Heart toggle | `.property-action` click | Toggle SVG `fill` + `data-on` | ✅ live |
| Form submit | `<form>` onsubmit | `handleSubmit()` — **FAKE**, just shows toast | 🚧 no backend |
| Video intro lazy-load | Click on `.video-intro-frame` or play button | Assigns `data-src`→`src` on first click, adds `.playing` class, calls `.play()` | ✅ live 2026-05-20 |

## Components NOT YET BUILT (planned)

| Name | Purpose | Priority |
|---|---|---|
| Property detail page/modal | Click property card → see full info, gallery, map, agent contact | 🔴 high |
| Property search/filter bar | Filter by area, price, bedrooms, sale/rent | 🟡 medium |
| Property gallery (multi-image) | Lightbox swiper for property photos | 🟡 medium |
| ~~Cookie consent banner~~ | ~~GDPR + Thai PDPA compliance~~ — ✅ DONE 2026-05-19 (Silktide, see below) | ~~🟡 medium~~ |
| Newsletter signup | Email capture for property updates | 🟢 low |
| Currency switcher | THB / USD / EUR / GBP / RUB | 🟢 low |
| Language switcher | EN / TH / RU (currently only EN, but team is trilingual) | 🟡 medium |
| Favorites/saved properties | Heart button currently visual-only — make persistent | 🟢 low |
| Map view of all properties | Google Maps / Mapbox embed with property pins | 🟢 low |
| Mortgage / yield calculator | Investment math for foreign buyers | 🟢 low |

## Third-party vendor components

| Name | Description | Location | Status |
|---|---|---|---|
| Silktide Consent Manager | Cookie consent banner + Preferences modal. 3 consent types: Necessary (required) + Analytics (opt-in, no-op until GA4) + Advertising (opt-in, no-op). Bottom-left position. Cookie icon persistent after consent. | `assets/js/silktide-consent-manager.js` (53KB vendor) + `assets/css/silktide-consent-manager.css` (12KB vendor) + `assets/js/consent-init.js` (project config) | ✅ live 2026-05-19 |

**Vendor lib notes:**
- Loaded on ALL 5 HTML pages (index, sell-rent, privacy-policy, terms, sitemap)
- Defer scripts (non-blocking)
- CSS preloaded with `onload` swap to stylesheet
- Config copied 1:1 from Empirra `consent-init.js` — DO NOT customize without testing (see DECISION_LOG 2026-05-19, took 3 failed iterations)
- localStorage key: `stcm.hasConsented` — clear to re-trigger banner during dev
- Cookie icon DOM id: `#stcm-icon`. Banner DOM id: `#stcm-banner`. Modal: `#stcm-modal`.
- onAccept hooks for Analytics/Advertising check `typeof gtag === 'function'` so they no-op safely until GA4 is wired up

---

**Updated:** 2026-05-20 (added video-intro section + lazy-load video frame)
