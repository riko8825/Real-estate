# Decisions log — architecture & design

Newest decisions on top. Format: `YYYY-MM-DD — Decision — Reason`.

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
