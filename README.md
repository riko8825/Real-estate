# Your Holiday Villas Pattaya

Single-page marketing website for **Your Holiday Villas** — a real estate agency in Pattaya, Thailand, specialising in pool villas, condos and houses for sale and rent. The site targets foreign buyers (English, Thai, Russian-speaking team).

**Live URL:** not yet deployed — hosting decision pending.

## Tech stack

- Vanilla HTML5
- Vanilla CSS (inline `<style>` with 102 design tokens in `:root`)
- Vanilla JS (inline `<script>`)
- Google Fonts: Playfair Display + Inter
- Images: Unsplash CDN (placeholders — to be replaced with real photography)
- **No** framework, build step, or package manager

## Folder structure

```
Real-estate/
├── .claude/                ← Claude Code config (settings, rules, slash commands)
├── .git/
├── .gitignore
├── CHANGELOG.md
├── CLAUDE.md               ← project rules for AI assistants
├── README.md               ← this file
├── index.html              ← SOURCE OF TRUTH — HTML + CSS + JS all here (~1690 lines)
├── assets/                 ← placeholder scaffold (not currently loaded by index.html)
│   ├── css/
│   ├── fonts/
│   ├── images/
│   └── js/
├── components/             ← placeholder scaffold (header.html, nav.html, footer.html)
├── memory/                 ← persistent project context
│   ├── brand.md            ← brand identity, tone, colors, fonts
│   ├── components.md       ← UI component inventory
│   ├── decisions.md        ← architecture decisions log
│   ├── pages.md            ← site map + planned pages
│   └── seo.md              ← keywords, meta formulas, schema
└── sections/               ← placeholder scaffold (one file per page section)
```

The `assets/`, `components/`, and `sections/` folders exist as a reference scaffold only. All live code is in `index.html`. See `CLAUDE.md` §3 for details.

## How to run locally

This is a static HTML file. No server, build, or install required.

**Option A — open directly:**
- Double-click `index.html` in your file explorer
- Or: `start index.html` (Windows) / `open index.html` (macOS) / `xdg-open index.html` (Linux)

**Option B — local web server (recommended for `file://` quirks):**
- VS Code Live Server extension: right-click `index.html` → "Open with Live Server"
- Python: `python -m http.server 8000` → open `http://localhost:8000`
- Node (if installed globally): `npx serve` → follow printed URL

## Editing

Everything lives in `index.html`:

| Region | Lines (approx) |
|---|---|
| `<head>` (meta, SEO, JSON-LD, fonts) | 1–135 |
| `<style>` block | 135–650 |
| `:root` design tokens | inside `<style>`, near top |
| `<body>` markup (sections in order: nav, hero, properties, about, services, why-pattaya, buyer-guide, testimonials, locations, contact, footer) | 655–1545 |
| `<script>` block | 1550–1690 |

When editing:

- Use design tokens (`var(--color-primary)`, `var(--space-4)`, etc.) — never hardcode hex/rem/px values
- Match existing component naming patterns (see `memory/components.md`)
- For new sections or components, see `.claude/commands/build-section.md` and `.claude/commands/new-component.md`

## Deploy

**Hosting not yet decided.** See `memory/decisions.md` for the open hosting decision.

Once decided, deployment is trivial for a single-file static site:

- **GitHub Pages:** push to `main`, enable Pages in repo settings (Source: deploy from branch `main`, folder `/`)
- **Netlify drop:** drag `index.html` to netlify.com/drop
- **Vercel:** `vercel --prod` from repo root
- **Static host / VPS:** copy `index.html` to web root

After deployment, replace the placeholder domain `https://yourholidayvillas.com/` in `index.html` (canonical, og:url, JSON-LD `@id`/`url`) with the real domain. Search the file for `yourholidayvillas.com` to find all occurrences.

## Known placeholders (replace before production)

Documented in `CLAUDE.md` §9. Summary:

- Phone: `+66 38 000 000`
- WhatsApp: `wa.me/6680000000`
- LINE: `@yourholidayvillas`
- Email: `info@yourholidayvillas.com`
- 5 property cards (Unsplash photos, fake prices and locations)
- 4 testimonials (fake people, Unsplash avatars)
- Contact form submit handler (`handleSubmit` only shows toast — no backend)
- All footer links use `href="#"`
- Listing counts in `#locations` section
- Open Graph image (`/assets/images/og-image-home.jpg` referenced but file does not exist)
- Favicon set (scaffolded as HTML comment in `<head>`, awaiting asset files)

## Documentation

- `CLAUDE.md` — project rules for AI assistants (override global rules)
- `memory/brand.md` — brand identity, tone of voice, color palette, DO/DON'T
- `memory/pages.md` — current and planned pages
- `memory/components.md` — UI component inventory with status
- `memory/seo.md` — keyword strategy, meta formulas, schema templates
- `memory/decisions.md` — architecture and design decisions log
- `CHANGELOG.md` — release notes (currently empty)

## Repository

`https://github.com/riko8825/Real-estate`
