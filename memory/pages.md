# Pages — site map

## Current state

**Single-page + listings page** — `index.html` (landing) + `sell-rent.html` (listings, Phase 1 placeholder).
**Production:** https://pridaproperty.com (Vercel, auto-deploys on `git push origin main`)

## Live pages

| Slug | File | Title | Purpose | Status |
|---|---|---|---|---|
| `/` | `index.html` | Your Holiday Villas Pattaya \| Pool Villas, Condos & Houses For Sale & Rent | All-in-one landing — hero, properties, about, services, why-us, why-pattaya, buyer-guide, testimonials, locations, contact | ✅ done |
| `/sell-rent.html` | `sell-rent.html` | Sell & Rent Properties in Pattaya \| Your Holiday Villas | Listings page with 5-filter bar (type/area/price/bedrooms/property), sort dropdown, 6 placeholder cards. CMS pending. | ⚠️ placeholder content + CMS pending |
| `/privacy-policy.html` | `privacy-policy.html` | Privacy Policy \| Your Holiday Villas Pattaya | 13-section legal page — Thai PDPA + GDPR. Data controller, collected data, usage, cookies, rights, retention, contact. | ✅ live (needs legal audit) |
| `/terms.html` | `terms.html` | Terms of Service \| Your Holiday Villas Pattaya | 14-section legal page — agency role, foreign buyer rules (condo/villa/land), fees, liability, jurisdiction (Thai). | ✅ live (needs legal audit) |
| `/sitemap.html` | `sitemap.html` | Sitemap \| Your Holiday Villas Pattaya | 4-column visual sitemap with Live/Planned badges. Main pages, in-page anchors, planned properties/areas/guides, contact. | ✅ live |

## In-page anchors (current navigation)

Nav links iš `components/nav.html` reference'ai (visi `#anchors` ant `index.html`):

| Anchor | Section | Status |
|---|---|---|
| `#hero` | Hero + marquee | ✅ done |
| `#properties` | Featured listings (5 placeholder cards) | ⚠️ placeholder content |
| `#about` | About + animated counters | ⚠️ placeholder stats |
| `#services` | 4 services grid | ✅ done |
| `#why-pattaya` | 6 investment stats | ✅ done |
| `#buyer-guide` | Freehold vs leasehold | ✅ done |
| `#testimonials` | 4 placeholder reviews | ⚠️ placeholder content |
| `#locations` | 6 Pattaya areas + map pins | ⚠️ placeholder listing counts |
| `#contact` | Contact form + info | ⚠️ form has no backend |

## Footer-referenced pages (currently `href="#"` — DO NOT EXIST)

These are linked from footer but lead nowhere. Either:
- (a) Build them as separate pages, OR
- (b) Convert to in-page filters/sections, OR
- (c) Remove from footer

| Slug | Title (inferred) | Purpose | Status |
|---|---|---|---|
| `/villas-for-sale` | Pool Villas For Sale | Filtered listings, sale only, villas | 📋 planned |
| `/condos-for-sale` | Condos For Sale | Filtered listings, sale only, condos | 📋 planned |
| `/houses-for-sale` | Houses For Sale | Filtered listings, sale only, houses | 📋 planned |
| `/villas-for-rent` | Villas For Rent | Filtered listings, rent only | 📋 planned |
| `/land-plots` | Land Plots | Filtered listings, land only | 📋 planned |
| `/new-developments` | New Developments | Off-plan / pre-construction projects | 📋 planned |
| `/pratumnak-hill` | Pratumnak Hill Properties | Area landing page | 📋 planned |
| `/jomtien-beach` | Jomtien Beach Properties | Area landing page | 📋 planned |
| `/east-pattaya` | East Pattaya Properties | Area landing page | 📋 planned |
| `/na-kluea` | Na Kluea Properties | Area landing page | 📋 planned |
| `/pattaya-beach` | Pattaya Beach Properties | Area landing page | 📋 planned |
| `/banglamung` | Banglamung Properties | Area landing page | 📋 planned |
| `/about` | About Us | Full team bio, history, philosophy | 📋 planned |
| `/foreign-buyer-guide` | Foreign Buyer Guide | Expanded legal + tax guide | 📋 planned |
| `/why-invest-pattaya` | Why Invest in Pattaya | Long-form investment thesis | 📋 planned |
| `/property-valuation` | Free Property Valuation | Lead-gen form for owners wanting to sell | 📋 planned |
| `/contact` | Contact Us | Standalone contact page (or just anchor to #contact) | 📋 planned |
| `/privacy-policy.html` | Privacy Policy | GDPR / Thai PDPA compliance | ✅ live 2026-05-19 |
| `/terms.html` | Terms of Service | Legal terms | ✅ live 2026-05-19 |
| `/sitemap.html` | Sitemap (HTML) | User-friendly visual sitemap | ✅ live 2026-05-19 |
| `/sitemap.xml` | Sitemap (XML, SEO) | SEO sitemap for search engines | 📋 planned (Phase 2 backend) |

## Individual property pages

**[TODO]** — strategy decision needed:
- (a) Each property gets own page (`/property/pratumnak-pool-villa-3bed`) for SEO
- (b) Modal/lightbox on click (no separate page)
- (c) Just gallery, no individual details

Currently: property cards click → nowhere (no `<a>` wrapping the card, only heart button works)

## Pages roadmap priority

**Phase 1 — fix current placeholder content:**
1. Real photos (5 properties + hero + about + locations) — ⏳ poy.png done, 1/12 Unsplash 404 fixed 2026-05-19, rest pending
2. Real testimonials (currently fake) — ⏳ pending
3. Real listing counts in locations section — ⏳ pending
4. Real contact info: WhatsApp ✅, LINE ✅, Phone ✅, Email ✅ (chabaratree@gmail.com, 2026-05-19)
5. Self-host all Unsplash photos as `/assets/images/*.jpg` (eliminate CDN 404 risk) — ⏳ pending

**Phase 2 — backend infrastructure:**
1. Contact form backend (Formspree / Netlify Forms / custom)
2. Favicon, sitemap.xml (SEO), robots.txt, OG image
3. GA4 or Plausible analytics (cookie banner ✅ already in place — onAccept hooks ready)

**Phase 3 — content expansion:**
1. `/foreign-buyer-guide` — top-priority SEO page for "buy property thailand" keywords
2. `/why-invest-pattaya` — long-form for "invest pattaya real estate" keywords
3. Area landing pages (Pratumnak, Jomtien, etc.) — long-tail SEO
4. Privacy + Terms — ✅ DONE 2026-05-19 (needs legal audit)

**Phase 4 — listings system:**
1. Individual property pages (or property detail modal)
2. Filtered category pages (For Sale, For Rent, By Area)
3. **[TODO]** — decide if listings come from CMS, JSON file, or hardcoded HTML

## Legend

- ✅ done — built and live
- ⚠️ placeholder content — built but needs real data
- 🚧 in-progress — actively being worked on
- 📋 planned — not yet started

---

**Updated:** 2026-05-18 (initial — inferred from `index.html` + footer links)
