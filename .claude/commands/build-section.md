---
description: Add a new <section> to index.html following project conventions
argument-hint: <section-name> [position-after-section-id]
allowed-tools: Read, Edit, Grep, Glob
---

# /build-section — Add a new page section

You are adding a new `<section>` to `index.html`. Follow this checklist exactly.

**Argument:** `$ARGUMENTS`
- First word = section name (kebab-case, e.g., `team`, `pricing`, `faq`, `gallery`)
- Optional second word = ID of existing section to insert AFTER (e.g., `services`). Default: insert before `#contact`.

---

## Step 1 — Pre-flight checks (READ FIRST, no edits yet)

1. Read [memory/pages.md](../../memory/pages.md) — confirm this section is on the roadmap or check with user if it's a new ad-hoc addition
2. Read [memory/components.md](../../memory/components.md) — confirm you're not duplicating an existing section
3. Read [memory/brand.md](../../memory/brand.md) — refresh tone of voice + DO/DON'T list
4. Grep `index.html` for similar existing sections to study the pattern:
   ```
   Grep: <section class="(services|why-pattaya|buyer-guide)" id=
   ```

**If the section name conflicts with existing one — STOP and ask user.**

---

## Step 2 — Plan the section (output to user before any edit)

Present this short plan and wait for approval:

```
Section: <name>
Insert position: after #<id>
Layout: <1-col | 2-col split | 3-col grid | 4-col grid | asymmetric>
Background: <--color-bg | --color-bg-alt | --color-bg-elevated | --color-bg-card>
Has:
  - section-eyebrow: "<text>"
  - section-title: "<text>"
  - section-desc: "<text>" (optional)
  - <N> cards / <N> items / form / image+text split
Needs JS? <no | yes — describe what>
Responsive breakpoints to verify: 1200 / 1024 / 768 / 480
```

---

## Step 3 — Build the HTML

Insert into `index.html` using the project's existing pattern. Required scaffold:

```html
<!-- ═══════ <SECTION NAME UPPERCASE> ═══════ -->
<section class="<section-name>" id="<section-name>">
  <div class="section-header reveal">
    <p class="section-eyebrow">Eyebrow Text</p>
    <h2 class="section-title">Main Title<br><em>Italic Accent</em> Optional</h2>
    <p class="section-desc">Optional description, max ~520px.</p>
  </div>

  <div class="<section-name>-grid">
    <!-- N items, each with `.reveal` and staggered transition-delay -->
    <div class="<item-class> reveal">
      <!-- card content -->
    </div>
    <div class="<item-class> reveal" style="transition-delay:.1s">
      <!-- ... -->
    </div>
  </div>
</section>
```

**Rules:**
- Section `class` and `id` MUST match (e.g., `class="team"`, `id="team"`) — nav links use IDs
- Wrap every grid item in `.reveal` (scroll fade-in handled by existing IntersectionObserver)
- Stagger animation: `style="transition-delay:.1s"`, `:.2s`, etc.
- All images: `loading="lazy"` (unless above the fold)
- All SVG icons: inline, `viewBox="0 0 24 24"`, stroke-based
- All text: follow [memory/brand.md](../../memory/brand.md) tone (direct, professional, no exclamation marks)

---

## Step 4 — Add the CSS

Append to the `<style>` block, placed **right before** the `/* ANIMATIONS */` comment (around line 580+ in `index.html`). Use the section header pattern:

```css
/* <SECTION NAME UPPERCASE> */
.<section-name> { background: var(--color-bg-alt); }
.<section-name>-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-1);  /* or 2px hairline gap */
}
.<item-class> {
  background: var(--color-bg-card);
  padding: var(--space-11) var(--space-9);  /* never raw px */
  /* ... */
}
```

**Forbidden:**
- ❌ Hardcoded colors: `color: #d4af37` → ✅ `color: var(--color-primary)`
- ❌ Hardcoded sizes: `padding: 16px 32px` → ✅ `padding: var(--space-4) var(--space-8)`
- ❌ Hardcoded font sizes: `font-size: .88rem` → ✅ `font-size: var(--font-base)`
- ❌ Hardcoded shadows: → ✅ `box-shadow: var(--shadow-gold-md)`

---

## Step 5 — Add responsive breakpoints

Update existing `@media` blocks (1200 / 1024 / 768 / 480) — don't create new ones. Common pattern:

```css
@media (max-width: 1200px) {
  .<section-name>-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .<section-name>-grid { grid-template-columns: 1fr; }
}
```

---

## Step 6 — Update navigation (optional but usually needed)

If this is a major section, add it to:
1. `<nav>` `.nav-links` list (around line where existing nav links live)
2. `.mobile-menu` link list

Both must reference `#<section-name>`. Use the same uppercase-tracked styling.

---

## Step 7 — Update `memory/components.md` and `memory/pages.md`

After the section is built:

1. **`memory/components.md`** — add a row to the "Section components" table:
   ```
   | `.<section-name>` | <short description> | `index.html` (search for class) | ✅ live |
   ```

2. **`memory/pages.md`** — add to "In-page anchors" table:
   ```
   | `#<section-name>` | <description> | ✅ done |
   ```

---

## Step 8 — Verify

1. Read back the inserted HTML block to confirm it's syntactically correct
2. Check that ID is unique (no other section uses it):
   ```
   Grep: id="<section-name>"
   ```
3. Check that all CSS uses `var(--*)` (no hardcoded hex/rem/px in your additions):
   ```
   Grep: <section-name>.*#[0-9a-f]{3,6}
   ```
4. Report to user:
   - Section added: `#<name>`
   - Lines inserted: HTML ~X, CSS ~Y
   - Memory files updated: components.md, pages.md
   - Recommend: open `index.html` in browser, scroll to `#<name>`, check at 480/768/1024/1200 widths

---

## DO NOT

- ❌ Add `<link>` or `<script src>` to load external files (single-file architecture, see [memory/decisions.md](../../memory/decisions.md))
- ❌ Create the section in `sections/<name>.html` instead of inline (placeholder folder is reference only)
- ❌ Use any framework / library / build step
- ❌ Add `!important` (existing code uses it only on `.nav-cta` overrides — don't extend the pattern)
- ❌ Use hardcoded values (see Rule 2 in [.claude/rules/global.md](../rules/global.md))
