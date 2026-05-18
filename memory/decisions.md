# Decisions log — architecture & design

Newest decisions on top. Format: `YYYY-MM-DD — Decision — Reason`.

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
| **Hosting / deploy** | GitHub Pages, Netlify, Vercel, custom VPS | ❓ undecided |
| **Form backend** | Formspree, Netlify Forms, custom API, Web3Forms | ❓ undecided |
| **Analytics** | Google Analytics 4, Plausible, Fathom, none | ❓ undecided |
| **CMS for listings** | Hardcoded HTML, JSON file, Airtable + JS, Headless CMS (Sanity/Contentful), WordPress | ❓ undecided |
| **Languages** | EN only, EN+TH+RU, EN+RU, more? | ❓ undecided (team speaks 3) |
| **Domain name** | yourholidayvillas.com or .co.th or .asia or… | ❓ undecided |
| **Logo** | Wordmark only (current) or design real SVG mark | ❓ undecided |
| **Property page strategy** | Individual pages, modal/lightbox, none (gallery only) | ❓ undecided |
| **Currency display** | THB + USD only (current), or add EUR/GBP/RUB switcher | ❓ undecided |
| **Cookie banner** | Required by GDPR/PDPA, not yet built | ❓ undecided |
| **Privacy/Terms pages** | Templates from generator, custom-written, or AI-generated | ❓ undecided |

---

## Decisions to revisit periodically

- **Single-file vs multi-file** — locked single-file 2026-05-18 (2× rollback). Re-evaluate only if: site grows past ~3000 lines, multiple developers join, or a CMS gets added.
- **Vanilla CSS vs framework** — locked vanilla 2026-05-18. Re-evaluate if: design system needs scaling across multiple sites, or theme switching is required.
- **No build step** — locked 2026-05-18. Re-evaluate if: image optimization becomes critical, or asset versioning needed.

---

**Updated:** 2026-05-18 (initial)
