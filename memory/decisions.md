# Decisions log — architecture & design

Newest decisions on top. Format: `YYYY-MM-DD — Decision — Reason`.

---

## 2026-05-20 — New section: video-intro (agent presentation video)

**Decision:** Added a new `<section class="video-intro" id="video-intro">` between `#about` and `#services` — a 36-second presentation video of agent Poy.

**Placement reasoning:** After `#about` (user already knows the agency → natural "see for yourself" continuation), before `#services` (video explains services visually → text section reinforces).

**Technical approach:**
- **Lazy load:** `<video preload="none">` with `data-src` attribute. Actual `src` assigned only on play click via JS — 0 bytes video traffic on initial page load.
- **Click anywhere on frame triggers play** (intuitive UX); once playing, native `<video controls>` handles pause/seek. Native `<button>` handles Enter/Space keyboard — no custom keydown listener.
- **Poster:** Unsplash luxury villa image (`photo-1613490493576-7fde63acd811`) — user chose this over real frame extraction.
- **`object-fit: contain`** (not cover) on `<video>` — so portrait/landscape both fit fully without crop, black letterbox sits naturally on the black section bg.
- New nav link "Story" added (desktop + mobile menu) — total 8 nav items.
- New CSS keyframes named `videoPulse` and `dotBlink` — deliberately NOT `pulse` (existing `@keyframes pulse` powers `.map-pin`; same-name would override it).

**Video file issue (resolved):** Original phone-recorded MP4 was 22 MB and played black-screen-with-audio in browsers — H.265/HEVC codec which browsers can't decode. Fix: user re-encoded via CloudConvert to H.264 → 4.4 MB file, plays correctly. Final file: `assets/videos/intro.mp4` (renamed from CloudConvert output, old 22 MB original deleted).

**Two-round QA:** frontend-revizorius agent audit found 5 bugs (3 critical: keyframes collision, inline style, duplicate aria-label; 2 medium: missing focus-visible, mobile-menu overflow). All fixed. Re-audit caught 1 regression from the mobile-menu fix (`overflow-y: auto` + `justify-content: center` collision) — fixed with `justify-content: flex-start` + `padding: max(80px, 15vh)`.

**Lesson:** Phone-recorded video is often H.265 — always re-encode to H.264 before using in `<video>`. Black screen + working audio = codec the browser can't decode.

**Files changed:** `index.html` only (CSS block ~239 lines, section markup ~38 lines, JS ~27 lines, 2 nav links). New folder `assets/videos/`.

---

## 2026-05-19 — Session 4 close: Cookie banner + 3 legal pages + Empirra credit + email fix

**Status snapshot:**
- Cookie consent banner live (Silktide Consent Manager copied 1:1 from Empirra)
- 3 new pages live: `privacy-policy.html`, `terms.html`, `sitemap.html`
- Footer redesigned: 3-column grid (copyright / legal links / Empirra credit) — no overlap with floating WhatsApp/LINE buttons
- Email placeholder resolved: `chabaratree@gmail.com` (3 spots across index.html + sell-rent.html)
- Broken Unsplash image fixed (1 of 12 photos was 404)

**Self-score: 7/10. Project completion: 75%.**

**Architectural decisions made:**

1. **Placeholder folders activated for first time** — `/assets/css/`, `/assets/js/` now contain real files (Silktide vendor lib + consent-init.js). This is a deliberate deviation from CLAUDE.md §7 "never include placeholders in index.html" rule, because 53KB 3rd-party vendor JS inline'd would double HTML size and slow first paint. Vendor libs MUST be separate files. CLAUDE.md §3 updated.

2. **Cookie banner config = exact Empirra copy** — after 3 failed iterations attempting custom config (cookieTypes→consentTypes, text.banner→text.prompt, .stcm-reject-all vs .stcm-modal-reject-all), reverted to Empirra's 3-type setup (Necessary + Analytics + Advertising) with gtag hooks that no-op when gtag absent. Saves debugging time, prepares for GA4 install later.

3. **3 legal pages built standalone** — each is a self-contained HTML file with full design token set copied inline. Total ~600 LOC of duplicated CSS per page (~1800 LOC duplicated across 3 pages). Accepted trade-off: maintains single-file-per-page convention from CLAUDE.md §7. Future shared CSS migration deferred until project structure decision (same as sell-rent.html).

4. **HTML Sitemap, not XML** — `sitemap.html` is a user-friendly index page with Live/Planned badges. SEO `sitemap.xml` deferred to Phase 2 backend infra (per memory/pages.md priority).

5. **Privacy/Terms content AI-generated** — Thai PDPA + GDPR best-practice templates. NOT legally audited. Flagged for client review with Thai property law firm before production-critical use.

**Files changed:** 7 files (index.html, sell-rent.html, +3 new HTML pages, +3 new files in /assets/). Memory docs updated.

**Open blockers (need user action):**
- Privacy/Terms legal review by Thai property law firm
- `og:image` file missing — pridaproperty.com/assets/images/og-image-home.jpg returns 404 (carry-over Session 3)
- Sanity Editor invite for Poy (chabaratree@gmail.com) — carry-over Session 2
- poy.png 1.43MB optimization (carry-over)
- Git commit + push for this session NOT done (user did not confirm)
- 11 of 12 Unsplash photos still CDN dependency risk (only 1 fixed reactively)

**Next session should pick up:**
1. Git commit + push Session 4 work (10 file changes)
2. Phase 3 — wire sell-rent.html to Sanity API (replace 6 hardcoded cards with fetch from dataset t4802zzb)
3. Add CORS origin https://pridaproperty.com in Sanity Manage when Phase 3 starts
4. Self-host all 12 Unsplash photos as `/assets/images/*.jpg` (eliminate CDN 404 risk)
5. Create `og-image-home.jpg` (1200×630) — fix broken social previews
6. Consider extracting shared CSS from 5 HTML files (index, sell-rent, privacy, terms, sitemap)

**Lesson:** Live Server hot-reloads HTML only, not /assets/* files. User saw stale CSS 3 times → looked like "no changes happened". Always tell user to hard-reload (Ctrl+Shift+R) after vendor/asset changes, or rely on Playwright headless verification (which loads fresh each time).

---

## 2026-05-18 — Session 3 close: Deploy live on pridaproperty.com + placeholder cleanup

**Status snapshot:**
- Production live: https://pridaproperty.com (Vercel, project `real-estate` under `pinigine1-6549's projects`)
- GitHub Pages also enabled (riko8825.github.io/Real-estate) but 301 redirects to pridaproperty.com via CNAME — effectively redundant
- 6 commits pushed (e1cc749 → de7fb7a), all auto-deployed by Vercel after Git reconnect

**Self-score: 6/10. Project completion: 70%.**

**Diagnostic detour (cost ~15 min):**
Started session assuming deploy target was undecided per Session 2 notes. Pushed code to GitHub, then set up GitHub Pages with `.nojekyll` + `CNAME`. After user reported "nematau pakeitimų" on pridaproperty.com, discovered the domain was already on Vercel (Vercel project `real-estate` existed from before, but its Git link to `riko8825/Real-estate` had broken). Fix: user clicked "Reconnect" in Vercel Settings → Git, then pushed empty commit to trigger redeploy.

**Lesson:** before assuming "deploy is open blocker," check `curl -I <domain>` for `Server:` header — would have revealed `Server: Vercel` in 5 seconds vs the 15min path. Add to next session start-task pattern.

**Placeholder cleanup (real values now live):**
- WhatsApp: `wa.me/66824955455` + display `+66 82 495 5455` (was `wa.me/6680000000`)
- LINE: `line.me/ti/p/~poyinwonderland` + display `poyinwonderland` (was `@yourholidayvillas`)
- Phone (tel: + display + schema.org telephone): `+66 82 495 5455` (was `+66 38 000 000`) — same as WhatsApp per user
- Domain meta (canonical, og:url, og:image, twitter:image, schema.org @id/url, 15 spots): `pridaproperty.com` (was `yourholidayvillas.com`)
- Email INTENTIONALLY left as `info@yourholidayvillas.com` (user will provide later)

**Files changed:** `index.html` + `sell-rent.html` only. Placeholder folders (`components/`, `sections/`) untouched per CLAUDE.md §7. Memory docs (`pages.md`, `decisions.md`) updated.

**Open blockers (need user action):**
- Email value (`info@???`) — user said "pridėsiu vėliau"
- Sanity Editor invite for Poy (`chabaratree@gmail.com`) — carry-over from Session 2
- `og:image` file missing — `pridaproperty.com/assets/images/og-image-home.jpg` returns 404, social previews broken
- poy.png 1.43MB optimization (carry-over)

**Next session should pick up:**
1. Create `og-image-home.jpg` (1200×630, brand) — fix broken social media previews
2. Phase 3 — wire `sell-rent.html` to Sanity API (replace 6 hardcoded cards with `fetch` from dataset `t4802zzb`)
3. Add CORS origin `https://pridaproperty.com` in Sanity Manage when Phase 3 starts
4. Decide whether to keep GitHub Pages CNAME (currently redundant — Vercel handles everything)

**Browser QA NOT done this session** — all verification was via `curl` (server-side response). Live UI behavior on 1024/768/480 breakpoints after content changes is unverified.

---

## 2026-05-18 — Session 2 close: Sanity Studio deployed + content overhaul

**Status snapshot:**
- Sanity Studio live: https://real-estate-poy.sanity.studio (Project `t4802zzb`)
- 3 test listings in production dataset
- sell-rent.html created (Phase 1 — hardcoded placeholders)
- index.html content updated per client copy from Poy
- 2 architectures rolled back this session before settling on hybrid:
  index.html (vanilla single-file) + sell-rent.html (vanilla static) +
  studio-real-estate-poy/ (Node-based Sanity)

**Self-score: 6/10. Project completion: 55%.**

**Open blockers (need user action):**
- Invite Poy as Editor: https://www.sanity.io/manage/personal/project/t4802zzb/members (`chabaratree@gmail.com`)
- Decide deploy target for index.html + sell-rent.html (GitHub Pages / Netlify / Vercel)
- Commit + push pending (commit message prepared, not executed)

**Next session should pick up:**
1. Phase 3 — wire `sell-rent.html` to Sanity API (replace hardcoded cards with fetch)
2. Or: visual QA pass on content changes (test 1024/768/480 breakpoints in browser)
3. Or: image optimization (poy.png 1.43MB → WebP/squoosh)
4. CORS config in Sanity Manage when production domain decided

---

## 2026-05-18 — New page `sell-rent.html` + Sanity CMS planned (Phase 1 done)

**Decision:** Created `sell-rent.html` as a separate listings page with 5-filter bar (type / area / price / bedrooms / property) + sort dropdown + 6 placeholder listing cards. Nav menu updated in both `index.html` and `sell-rent.html` to cross-link.

**Architecture (hybrid):**
- `index.html` — remains single-file landing (no change to that file's structure)
- `sell-rent.html` — new standalone file. Inline `<style>` + `<script>` (same design tokens copied for consistency, no shared CSS file)
- Cross-linking: `index.html` nav links to `sell-rent.html`; `sell-rent.html` nav links back to `index.html#section`

**CMS plan (Phase 2 + 3 — not yet implemented):**
- **Stack:** Sanity.io headless CMS (same as Akva Studio sister project — see memory at `c--Users-pinig-OneDrive-Stalinis-kompiuteris-Automatiomm-empirra-akva-studio`)
- **Phase 2:** Create `studio/` folder with Sanity Studio, `listing` schema (title, slug, type [sale/rent], area, price THB, price USD, bedrooms, bathrooms, sqm, propertyType [condo/villa/house/land], images, features, description). Deploy studio to `<projectname>.sanity.studio`, invite client as editor.
- **Phase 3:** Replace placeholder HTML cards with JS fetch from Sanity API (`sanity-client.js` module). Filter logic operates on fetched JSON array. Image CDN: Sanity built-in.

**Reason:** Client (Poy) needs to manage listings themselves without touching code. Sanity gives a free admin panel + structured content + image hosting. Same pattern proven on Akva Studio.

**Impact on existing project rules:**
- This breaks the "single-file only" rule for the new page — but ONLY the new page. `index.html` stays single-file.
- When Phase 2/3 happen: introduces `node_modules/`, `package.json`, `studio/` folder (Node-based dev tooling). Listings page will need `<script type="module">` for ES imports.
- Updated CLAUDE.md needed when Phase 2 starts.

**Phase 1 deliverables (this session):**
- `sell-rent.html` (969 lines) — full standalone page with design system, nav, filters, 6 cards, footer
- Nav links added to `index.html` (desktop + mobile menu)
- CMS-pending banner shown on listings page (will be removed when Sanity is wired)

---

## 2026-05-18 — Performance basics pass (CLS, LCP, lazy loading)

**Decision:** Audited `index.html` for performance basics. Fixed 3 issues:
1. Added `width`/`height` to all 12 `<img>` elements (intrinsic dimensions from Unsplash URL `w=` param + aspect ratio inferred from CSS context)
2. Added `<link rel="preconnect" href="https://images.unsplash.com">` (saves TTFB on first image)
3. Added `<link rel="preload" as="image" fetchpriority="high">` for hero CSS background (hero is `background-image`, not `<img>`, so `loading="lazy"` is N/A — preload is the equivalent LCP optimization)

**Already OK before this pass:**
- CSS in `<head>` (inline `<style>`) ✅
- Main `<script>` at bottom of `<body>` ✅
- All 12 images have `loading="lazy"` ✅
- Font preconnect (googleapis + gstatic) ✅

**Reason:** CLS (Cumulative Layout Shift) — missing image dimensions cause layout reflow when images load. LCP (Largest Contentful Paint) — hero bg was waiting for CSS parse before browser knew to fetch it.

**Impact:** Expected improvements: CLS → near-zero (was likely 0.2+ on slow connections), LCP for hero → ~200-500ms faster on cold cache. No visual layout change.

---

## 2026-05-18 — Memory folder added with 5 files

**Decision:** Create `/memory/` with `brand.md`, `pages.md`, `components.md`, `seo.md`, `decisions.md`.

**Reason:** User requested persistent project memory separate from `CLAUDE.md`. Files serve as long-form context for future sessions — `CLAUDE.md` stays concise (rules + structure), `/memory/` holds detailed brand/SEO/decisions context.

**Impact:** Adds 5 markdown files; no code change. Future sessions should read `/memory/*.md` for brand/SEO/component context instead of re-deriving from `index.html`.

---

## 2026-05-18 — Scaffold folders re-created (3rd attempt)

**Decision:** Re-created `/assets/`, `/components/`, `/sections/` as **placeholder-only** scaffold. `index.html` remains untouched and authoritative.

**Reason:** User requested scaffold again (same prompt as 1st attempt). Confirmed via question — wanted scaffold without migration. Placeholder files contain only comments describing what would go there if migration happens.

**Impact:** 17 placeholder files added. `index.html` still source of truth. CLAUDE.md §7 rule updated: "don't pour content from `index.html` into placeholders without explicit migration request".

---

## 2026-05-18 — Design tokens system expanded in `:root`

**Decision:** Replaced the small original `:root` block (8 tokens) with a comprehensive 102-token design system: semantic colors, type scale (`--font-2xs` → `--font-4xl`), 4px-base spacing (`--space-1` → `--space-16`), radius tokens, shadow presets, z-index scale, breakpoint comments.

**Reason:** User requested full design tokens for systematic use across all CSS. Now all new styles must use `var(--token)` — no hardcoded values.

**Impact:** Legacy aliases (`--c-gold`, `--ff-serif`, `--radius-sm`) kept alongside new `--color-*`, `--font-family-*`, `--radius-*` for backward compatibility. Existing styles continue to work; new code uses the new naming.

---

## 2026-05-18 — Rollback from multi-file to single-file (2nd time)

**Decision:** Reverted 11ty + multi-file split. Merged all CSS + JS back into single `index.html` (1441 lines). Deleted `_includes/`, `components/`, `sections/`, `assets/`, `_site/`, `.github/`, `node_modules/`, `package.json`, `.eleventy.js`, `index.njk`.

**Reason:** After scaffolding and migrating to 11ty, user opened `index.njk` in VS Code and said "nieko nera. Noriu tureti index faila" — wanted to see actual visible content in one file instead of templating directives.

**Impact:** Lost build step, lost partial reusability, lost auto-deploy. Gained: zero dependencies, instant edit-refresh, one file to understand. **Lesson learned:** this user prizes simplicity over modularity for this project — do not propose multi-file split or build step again without explicit request.

---

## 2026-05-18 — Multi-file split with 11ty + GitHub Pages (later reverted)

**Decision:** Split monolithic `index.html` into:
- `assets/css/{variables,reset,main}.css`
- `assets/js/main.js`
- `components/{nav,footer}.html`
- `sections/{hero,properties,about,services,why-pattaya,buyer-guide,testimonials,locations,contact}.html`
- `_includes/base.njk` (11ty layout)
- `index.njk` (entry with `{% include %}` directives)
- `.eleventy.js`, `package.json`, `.github/workflows/deploy.yml`

**Reason:** User asked for "scaffold + migration". Chose 11ty (over Astro / JS-fetch / no-build) for: real HTML includes, SEO-friendly static output, zero runtime JS, simple Nunjucks syntax, easy GitHub Pages deploy.

**Impact:** Build worked (`npm run build` → 1 file output + 6 assets passthrough). Dev server tested OK. Reverted same session — see entry above.

---

## 2026-05-18 — Initial scaffold (1st attempt — later reverted)

**Decision:** Created empty `/assets/`, `/components/`, `/sections/` placeholder structure per user request. `index.html` not modified.

**Reason:** User requested standard static-website folder layout. Confirmed via question that this conflicted with then-current CLAUDE.md §7 single-file rule, but user wanted scaffold anyway.

**Impact:** 17 placeholder files added (later evolved into multi-file split + reverted).

---

## 2026-05-18 — `CLAUDE.md` created (initial)

**Decision:** Generated project-level `CLAUDE.md` with: project purpose, tech stack, folder structure, design system (colors, typography, spacing, animations), JS patterns, mandatory rules, build/deploy commands, known TODO list, refactoring rules.

**Reason:** User requested it as first step. Provides per-project override of global `~/.claude/CLAUDE.md` so future sessions have project-specific context.

**Impact:** Single source of project rules. Evolved through session (single-file → multi-file → single-file → placeholder scaffold) — current version reflects scaffolded-placeholder + single-file-truth state.

---

## Open / unresolved decisions

These need user input before they can be resolved:

| Topic | Options under consideration | Status |
|---|---|---|
| **Hosting / deploy** | ~~GitHub Pages, Netlify, Vercel, custom VPS~~ | ✅ RESOLVED 2026-05-18 — Vercel (pridaproperty.com live) |
| **Form backend** | Formspree, Netlify Forms, custom API, Web3Forms | ❓ undecided |
| **Analytics** | Google Analytics 4, Plausible, Fathom, none | ❓ undecided |
| **CMS for listings** | ~~Hardcoded HTML, JSON file, Airtable + JS, Headless CMS, WordPress~~ | ✅ RESOLVED 2026-05-18 — Sanity (Studio live, Phase 3 wire-up pending) |
| **Languages** | EN only, EN+TH+RU, EN+RU, more? | ❓ undecided (team speaks 3) |
| **Domain name** | ~~yourholidayvillas.com or .co.th or .asia or…~~ | ✅ RESOLVED 2026-05-18 — pridaproperty.com |
| **Logo** | Wordmark only (current) or design real SVG mark | ❓ undecided |
| **Property page strategy** | Individual pages, modal/lightbox, none (gallery only) | ❓ undecided |
| **Currency display** | THB + USD only (current), or add EUR/GBP/RUB switcher | ❓ undecided |
| **Cookie banner** | ~~Required by GDPR/PDPA, not yet built~~ | ✅ RESOLVED 2026-05-19 — Silktide Consent Manager (Empirra-copy config) |
| **Privacy/Terms pages** | ~~Templates, custom-written, or AI-generated~~ | ✅ RESOLVED 2026-05-19 — AI-generated (Thai PDPA + GDPR), needs legal audit |

---

## Decisions to revisit periodically

- **Single-file vs multi-file** — locked single-file 2026-05-18 (2× rollback). Re-evaluate only if: site grows past ~3000 lines, multiple developers join, or a CMS gets added.
- **Vanilla CSS vs framework** — locked vanilla 2026-05-18. Re-evaluate if: design system needs scaling across multiple sites, or theme switching is required.
- **No build step** — locked 2026-05-18. Re-evaluate if: image optimization becomes critical, or asset versioning needed.

---

**Updated:** 2026-05-18 (initial)
