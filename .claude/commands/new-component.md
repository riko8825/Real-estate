---
description: Create a new reusable UI component (button, card, badge, etc.) — checks for duplicates first
argument-hint: <component-name> [type: button|card|badge|form|nav|layout|other]
allowed-tools: Read, Edit, Grep
---

# /new-component — Create a reusable UI component

You are creating a new reusable UI component (NOT a full section — for sections use `/build-section`).

**Argument:** `$ARGUMENTS`
- First word = component name (kebab-case, e.g., `tag-pill`, `feature-icon`, `price-tag`)
- Optional second word = type for naming convention (see Step 2)

---

## Step 1 — DUPLICATE CHECK (mandatory — do not skip)

Before doing anything else:

1. Read [memory/components.md](../../memory/components.md) — full UI inventory
2. Grep `index.html` for similar class names:
   ```
   Grep: class="[^"]*<keyword>[^"]*"
   ```
3. Grep existing CSS for similar visual patterns

**If a similar component exists** — STOP and report to user:
- "Found existing `.<existing-class>` that does <X>. Should I (a) reuse it, (b) extend it with a variant, or (c) create a new component anyway?"

**Project already has 50+ components.** Do not create duplicates. Common existing groups:

| Need | Use existing |
|---|---|
| Gold button | `.btn-primary` |
| Outline button | `.btn-secondary` or `.btn-outline` |
| Small chip button | `.nav-cta` |
| Round icon button | `.property-action` or `.t-nav-btn` or `.footer-social` |
| Card with image + content | `.property-card` |
| Card with icon + text | `.service-card` or `.why-card` or `.buyer-card` |
| Stat/number display | `.stat-num` or `.why-stat` |
| Section eyebrow label | `.section-eyebrow` |
| Form input | `.form-input` / `.form-select` / `.form-textarea` |
| Heading + desc block | `.section-header` |

---

## Step 2 — Naming convention (match existing prefixes)

Use the established prefix system from [.claude/rules/global.md](../rules/global.md) Rule 4:

| Type | Prefix pattern | Example |
|---|---|---|
| Button | `.btn-<variant>` | `.btn-ghost`, `.btn-danger` |
| Card | `.<context>-card` | `.team-card`, `.faq-card` |
| Badge | `.<context>-badge` or `.badge-<variant>` | `.badge-new`, `.badge-featured` |
| Form field | `.form-<element>` | `.form-checkbox`, `.form-radio` |
| Nav element | `.nav-<part>` | `.nav-submenu`, `.nav-search` |
| Icon | `.<context>-icon` | `.feature-icon` |
| Layout wrapper | `.<context>-grid` or `.<context>-inner` | `.faq-grid`, `.testimonials-inner` |

**Do NOT introduce a new top-level prefix** (e.g., don't add `.ui-*`, `.c-*`, `.atom-*` — these break the project's flat naming).

---

## Step 3 — Plan the component (show user, wait for approval)

Present this and wait:

```
Component: .<class-name>
Type: <button | card | badge | form | layout | other>
Purpose: <1 sentence>
Where it will be used:
  - <existing section or "future section X">
States:
  - default
  - hover (describe)
  - active / focus (if interactive)
  - disabled (if applicable)
Dependencies: <none | needs JS handler | needs IntersectionObserver>
Tokens used:
  - color: var(--color-<token>)
  - spacing: var(--space-<n>)
  - radius: var(--radius-<size>)
  - font: var(--font-<size>) / var(--font-weight-<weight>)
  - shadow: var(--shadow-<variant>) (if any)
```

---

## Step 4 — Write the CSS

Insert into `<style>` block, in the **section it belongs to** (e.g., button → in nav/contact CSS area; card → near related card components). If it's truly cross-cutting, place near `/* SECTION COMMONS */`.

Skeleton template:

```css
/* <COMPONENT NAME> */
.<class-name> {
  /* layout */
  display: <inline-flex | grid | block>;
  padding: var(--space-<n>) var(--space-<n>);

  /* typography */
  font-family: var(--font-family-sans);  /* or -serif if heading-like */
  font-size: var(--font-<size>);
  font-weight: var(--font-weight-<weight>);
  letter-spacing: var(--tracking-<scale>);

  /* color */
  color: var(--color-text);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);

  /* motion */
  transition: var(--transition-fast);
}

.<class-name>:hover {
  background: var(--color-primary);
  color: var(--color-bg);
  transform: translateY(-2px);  /* match existing CTA pattern */
}

/* Variants (if any) */
.<class-name>--<variant> {
  /* override specific properties only */
}
```

**Mandatory rules:**
- ❌ NO hardcoded hex (`#...`), rgba(...), px values (other than 1-2px borders), rem (other than what tokens encode)
- ✅ ONLY `var(--*)` from the 102-token system
- ✅ Hover/focus transitions use `var(--transition-fast)` or `var(--transition)`
- ✅ If interactive — include `:focus-visible` styling (accessibility)

**If a needed token doesn't exist:**
1. Don't hardcode it
2. Report to user — "I need a `--color-X` / `--space-X` that doesn't exist. Should I add it to `:root` first?"

---

## Step 5 — Add JS if interactive (optional)

If the component needs JS behavior (e.g., toggle, expand, dismiss):

1. Use existing pattern — `if (el) { ... }` guard, ID or class selector, `{ passive: true }` on scroll/touch listeners
2. Add to `<script>` block bottom of `index.html`, near related JS modules
3. Match style of existing JS (no jQuery, no framework, vanilla)

**Example pattern:**
```javascript
/* <component-name> toggle */
document.querySelectorAll('.<class-name>').forEach(el => {
  el.addEventListener('click', function() {
    this.classList.toggle('is-active');
  });
});
```

---

## Step 6 — Document in `memory/components.md`

Add a row to the appropriate table section:

```
| `.<class-name>` | <one-line description> | `index.html` (search for class) | ✅ live |
```

If it has variants, list them in the "Variants" column.

If it's planned but not yet used in any visible context, mark it as `🚧 partial — defined but not yet used`.

---

## Step 7 — Test usage

1. Add a single instance of the component to a visible part of `index.html` (e.g., as a stub inside an existing section) to verify it renders
2. Test at 480 / 768 / 1024 / 1200 breakpoints
3. Test hover/focus/active states if interactive

**If user did not specify where to use it** — report:
"Component `.<class-name>` created. Where would you like me to first use it? (or should I leave it as a defined-but-unused primitive for future use?)"

---

## Step 8 — Report

Final message to user:

```
Component added: .<class-name>
Type: <type>
Lines added: CSS ~X, JS ~Y (if applicable)
Tokens used: <list>
Memory updated: components.md
Used in: <section name or "not yet used">
Test status: <verified at 4 breakpoints | needs visual QA>
```

---

## DO NOT

- ❌ Create a component that duplicates an existing one (Step 1 enforces this)
- ❌ Introduce a new naming prefix outside the established system
- ❌ Use hardcoded values (Rule 2 in [.claude/rules/global.md](../rules/global.md))
- ❌ Create the component in a separate file (`components/<name>.html`) — that's the placeholder folder, not source of truth. Component CSS lives in `index.html`.
- ❌ Add a framework dependency, even a small one (no Lit, no Stencil, no Web Components polyfill)
- ❌ Update [memory/components.md](../../memory/components.md) BEFORE the component is built — only after
