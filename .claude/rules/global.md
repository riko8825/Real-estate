# Global rules — Real-estate project

These rules apply to **every interaction** in this project. They override generic Claude Code defaults but DO NOT override the user's explicit per-task instructions.

---

## Rule 1 — Read `/memory/` before changing anything

**Before any edit, change, or new component** — read the relevant `/memory/*.md` file first. These are the project's persistent context:

| Before doing... | Read first |
|---|---|
| Adding a new section | [memory/components.md](../../memory/components.md) + [memory/brand.md](../../memory/brand.md) |
| Changing colors / fonts / spacing | [memory/brand.md](../../memory/brand.md) (color palette + DO/DON'T) |
| Adding a new page / route | [memory/pages.md](../../memory/pages.md) (check if already planned) |
| Writing copy / meta tags / titles | [memory/brand.md](../../memory/brand.md) (tone of voice) + [memory/seo.md](../../memory/seo.md) (formulas) |
| Changing schema.org / SEO meta | [memory/seo.md](../../memory/seo.md) |
| Making an architectural decision | [memory/decisions.md](../../memory/decisions.md) (check what's already been decided + 2× rolled back) |

**Why:** This project has gone through 3 architectural reversals in one session (single-file → multi-file 11ty → single-file → scaffold-with-placeholders). The user explicitly prefers simplicity. Decisions log prevents re-asking what's been settled.

**Failure mode to avoid:** Suggesting a build step (npm, Vite, 11ty, Astro) or splitting `index.html` into partials. Both were tried and rolled back. Only revisit on explicit user request.

---

## Rule 2 — Never use inline styles. CSS variables only.

❌ **Forbidden:**
```html
<div style="color: #d4af37; padding: 16px;">...</div>
<div style="background: rgba(212,175,55,.1);">...</div>
```

✅ **Required:**
```html
<div class="my-element">...</div>
```
```css
.my-element {
  color: var(--color-primary);     /* never #d4af37 */
  padding: var(--space-4);         /* never 16px */
  background: var(--color-bg-alt); /* never #111 */
}
```

**Allowed exceptions** (already in `index.html`, do not add new ones):
- `style="transition-delay:.1s"` — staggered animation timing (no token for this; cosmetic only)
- `style="max-width:360px"` — one-off section description width override

**Token reference:** Full list of 102 design tokens is in `index.html` `:root` block (around line 26). Also documented in [memory/brand.md](../../memory/brand.md) and CLAUDE.md §5.1.

**If a needed value isn't in the token system:**
1. Don't hardcode it
2. Ask the user — "should this be a new token?"
3. If yes, add to `:root` AND document in `memory/brand.md`

---

## Rule 3 — Never modify `index.html` structure without explicit instruction

`index.html` is the source of truth. Its structure (section order, IDs, class naming) is settled.

### Safe edits (no permission needed):
- Fixing typos in copy
- Updating placeholder values (e.g., phone number) **if user provides real value**
- Adding/changing CSS rules inside `<style>` (using only `var(--*)`)
- Adding/changing JS logic inside `<script>` (preserving existing IDs)

### Requires explicit instruction:
- Adding a new `<section>`
- Reordering sections
- Removing any section
- Changing IDs (other tools/scripts reference them)
- Renaming classes that appear in JS (e.g., `.reveal`, `.property-action`, `.stat-num`)
- Adding `<link rel="stylesheet">` or `<script src="...">` (would activate placeholder files — this was rolled back, do not redo without explicit migration request)
- Changing the `<head>` block structure (fonts, meta order)

### Always requires permission:
- Deleting `index.html` content over 50 lines
- Replacing the entire `<style>` or `<script>` block
- Any change that would break existing JS-DOM coupling (e.g., removing `#mainNav`, `#heroBg`, `#testimonialsTrack`)

**When in doubt:** show the proposed diff and wait for approval. The `permissions.ask` block in `settings.json` enforces this for `Edit(index.html)`.

---

## Rule 4 — Check `components.md` before creating a new component

Before adding any new visual element (button, card, badge, form field, layout block):

1. **Open** [memory/components.md](../../memory/components.md)
2. **Search** for the closest existing component
3. **If a match exists** — reuse it (extend if necessary), don't create a parallel one
4. **If no match** — only THEN create a new one, AND:
   - Add an entry to `memory/components.md` in the right section (Layout / Section / UI primitive / Card / Form)
   - Follow naming convention: `.kebab-case-class` (e.g., `.property-card`, not `.PropertyCard` or `.property_card`)
   - Use existing design tokens (Rule 2)
   - Match existing visual patterns (see [memory/brand.md](../../memory/brand.md) DO/DON'T)

**Why:** Project already has 50+ components catalogued. Creating duplicates (e.g., another button variant when `.btn-primary`/`.btn-secondary`/`.btn-outline` already cover most cases) fragments the design system.

**Component naming patterns already established:**

| Prefix | Use case | Examples |
|---|---|---|
| `.btn-*` | Buttons | `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-wa`, `.btn-line` |
| `.form-*` | Form elements | `.form-input`, `.form-select`, `.form-textarea`, `.form-label`, `.form-row` |
| `.nav-*` | Navigation | `.nav-logo`, `.nav-links`, `.nav-cta`, `.nav-hamburger` |
| `.property-*` | Property card parts | `.property-card`, `.property-img`, `.property-price`, `.property-meta` |
| `.section-*` | Section primitives | `.section-eyebrow`, `.section-title`, `.section-desc`, `.section-header` |
| `.contact-*` | Contact section | `.contact-detail-item`, `.contact-social-btn` |
| `.footer-*` | Footer parts | `.footer-top`, `.footer-brand`, `.footer-links`, `.footer-social` |

Follow these patterns. Don't introduce new prefixes (e.g., don't add `.card-*` when `.property-card`, `.service-card`, `.why-card` already exist).

---

## Rule 5 — Language

Respond in **Lithuanian** by default (per global `~/.claude/CLAUDE.md`). Code, file content, commit messages, and documentation files (`/memory/`, `/.claude/`) stay in **English** — the project is for an international audience and English-speaking team members.

---

## Rule 6 — Be honest about placeholder data

The project has 12+ placeholder values flagged in CLAUDE.md §9:
- Phone, WhatsApp, LINE, email — all fake
- 5 property cards — Unsplash photos, fake prices/locations
- 4 testimonials — fake people
- Form submit — fake (just shows toast)
- Listing counts in locations section — fake
- All footer links → `href="#"`

**Never treat these as real.** If a task touches them, ask the user for real values or confirm placeholder is acceptable.

---

## Rule 7 — No git push without explicit confirmation

`git push` triggers consequences (visible to public if repo is public, breaks if it's the only person seeing changes who's unaware).

`settings.json` enforces this via `permissions.ask: ["Bash(git push *)"]`. Even if approved once for a specific branch, ask again for new push targets.

**Never run:** `git push --force`, `git push -f`, `git reset --hard`, `git clean -fd` — these are in `permissions.deny`.

---

**Last updated:** 2026-05-18
