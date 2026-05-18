# CLAUDE.md — Real-estate (Your Holiday Villas Pattaya)

Kalba: **lietuvių**. Globalus `~/.claude/CLAUDE.md` taikomas, bet šis failas turi **pirmenybę**.

---

## 1. Projekto paskirtis

Single-page marketing landing **Your Holiday Villas Pattaya** — Tailando (Pattaya) nekilnojamojo turto agentūros svetainė. Tikslinė auditorija: užsienio pirkėjai (EN/TH/RU bilingual team), pool villas / condos / houses **pirkimas, pardavimas, nuoma** Pratumnak / Jomtien / East Pattaya / Na Kluea / Banglamung rajonuose.

Konversijos kanalai:
- Kontaktinė forma sekcijoje `#contact` (šiuo metu **be backend'o** — `handleSubmit()` tik rodo toast'ą)
- WhatsApp floating button (`https://wa.me/6680000000` — **placeholder** numeris)
- LINE floating button (`@yourholidayvillas` — placeholder ID)
- Telefonas: `+66 38 000 000` (**placeholder**)

---

## 2. Tech stack

| Sluoksnis | Sprendimas |
|---|---|
| Markup | Vanilla HTML5, semantic sections |
| Styling | Vanilla CSS, **viskas inline `<style>` bloke** (CSS variables, Grid, Flexbox, `clamp()`) |
| JS | Vanilla JS, **inline `<script>` bloke** — jokio framework, jokio bundler |
| Tipografika | Google Fonts: `Playfair Display` (serif) + `Inter` (sans-serif), `preconnect` optimizacija |
| Vaizdai | **Visi išoriniai** — Unsplash CDN su `?w=...&q=...&auto=format&fit=crop` URL params |
| Build | **Nėra** — atidaryti `index.html` tiesiai naršyklėje |
| Deploy | **Dar neapibrėžta** (GitHub repo: `riko8825/Real-estate`, branch `main`) |
| Form backend | **Nėra** (TODO — Formspree / Netlify Forms / custom) |
| Analytics | **Nėra** (TODO — GA4 / Plausible) |

Jokio `package.json`, jokio `node_modules`, jokio CI/CD. Vienintelis tracking failas — git.

---

## 3. Failų struktūra

```
Real-estate/
├── .git/
├── .claude/                     ← Claude Code project config
│   ├── settings.json            ← permissions (allow/deny/ask) + env
│   ├── rules/global.md          ← 7 project-wide rules
│   └── commands/                ← slash command templates
│       ├── build-section.md     ← /build-section <name> [after-id]
│       └── new-component.md     ← /new-component <name> [type]
├── CLAUDE.md                    ← šis failas
├── index.html                   ← 1572 eil., GYVAS — visas turinys + CSS + JS čia
├── assets/
│   ├── css/
│   │   ├── variables.css        ← PLACEHOLDER (tuščias, su komentarais)
│   │   ├── reset.css            ← PLACEHOLDER
│   │   └── main.css             ← PLACEHOLDER
│   ├── js/
│   │   └── main.js              ← PLACEHOLDER
│   ├── images/.gitkeep          ← (real photos eventually)
│   └── fonts/.gitkeep           ← (self-hosted fonts if needed)
├── components/                  ← PLACEHOLDER (tušti su komentarais)
│   ├── header.html
│   ├── nav.html
│   └── footer.html
├── memory/                      ← Project context docs (READ FIRST)
│   ├── brand.md                 ← brand identity, tone, colors, do/don't
│   ├── pages.md                 ← site map, planned pages, status
│   ├── components.md            ← UI inventory + status
│   ├── seo.md                   ← keywords, meta formula, schema, OG specs
│   └── decisions.md             ← architecture & design decisions log
└── sections/                    ← PLACEHOLDER (tušti su komentarais)
    ├── hero.html
    ├── properties.html
    ├── about.html
    ├── services.html
    ├── why-pattaya.html
    ├── buyer-guide.html
    ├── testimonials.html
    ├── locations.html
    └── contact.html
```

**Architektūros statusas:** vis dar **single-file project** — visas gyvas kodas yra `index.html`. Folder'iai `/assets/`, `/components/`, `/sections/` yra **scaffold'inti placeholder'iai** kaip referencinis žemėlapis ateities migracijai. Jie neturi turinio ir nėra įtraukti į `index.html` jokiu būdu (jokio `<link>`, jokio `<script src>`).

**Kai redaguoji svetainę — redaguoji TIK `index.html`.** Placeholder failai gali būti naudojami tik kaip dokumentacija (jų komentaruose nurodyta kur kas yra `index.html` viduje).

---

## 4. `index.html` vidinė struktūra

| Sritys | Eilutės (apytiksliai) | Paskirtis |
|---|---|---|
| `<head>` meta + fonts | 1-18 | SEO meta, Open Graph, font preconnect |
| `<style>` blokas | 20-580 | Visi stiliai (CSS vars → komponentai → responsive) |
| `:root` variables | viršuje `<style>` | **Vienintelis tiesos šaltinis spalvoms/fontams** |
| `<body>` markup | ~585-1320 | Visi sections markup'as |
| `<script>` blokas | ~1325-1441 | Vanilla JS (žr. §6) |

Sekcijų eilė `<body>` viduje:
1. `#cursor-glow` div + `.floating-btns` (WhatsApp + LINE)
2. `<nav id="mainNav">` + `.mobile-menu`
3. `<section class="hero" id="hero">`
4. `.marquee-strip` (gold marquee su lokacijomis)
5. `<section class="properties" id="properties">` (5 property cards, asymetric grid)
6. `<section class="about" id="about">` (2-col split su animuotais stat counters)
7. `<section class="services" id="services">` (4-col grid)
8. `<section class="why-pattaya" id="why-pattaya">` (6 stat cards, 3-col)
9. `<section class="buyer-guide" id="buyer-guide">` (Foreign buyer freehold/leasehold)
10. `<section class="testimonials" id="testimonials">` (slider su dots + auto-rotate)
11. `<section class="locations" id="locations">` (2-col su animuotais map pins)
12. `<section class="contact" id="contact">` (forma su gold focus states)
13. `<footer>` (4-col + TripAdvisor badge)
14. `#toast` div (success notification)

---

## 5. Design system — konvencijos

### 5.1 Design tokens (`:root` `<style>` bloke)

Pilna design token sistema gyvena `:root` viršuje `<style>` bloko. **Visi nauji stiliai TURI naudoti `var(--token-name)` — jokio hardcoded hex/px reikšmių.**

**Token grupės (102 viso):**

| Grupė | Prefix | Naudojimas |
|---|---|---|
| Semantic colors | `--color-*` | Naujam kodui (`--color-primary`, `--color-bg`, `--color-text-muted`, `--color-border`) |
| Legacy color aliases | `--c-*` | Esamam kodui (nepašalinti — viskas vis dar veikia) |
| Brand colors | `--color-wa`, `--color-line`, `--color-tripadvisor` | WhatsApp / LINE / TripAdvisor |
| Typography family | `--font-family-serif`, `--font-family-sans` | + legacy `--ff-serif`, `--ff-sans` |
| Type scale | `--font-2xs` → `--font-4xl` | 0.6rem → 2.8rem, modular ~1.2 ratio |
| Display fluid | `--font-display-section`, `--font-display-hero` | `clamp()` based, responsive |
| Weights | `--font-weight-light` → `--font-weight-bold` | 300/400/500/600/700 |
| Letter spacing | `--tracking-tight` → `--tracking-hero` | -0.02em → 0.5em |
| Line height | `--leading-tight` → `--leading-loose` | 1.1 → 1.8 |
| Spacing | `--space-1` → `--space-16` | 4px base scale (4/8/12/16/20/24/28/32/36/40/44/48/52/60/72/80) |
| Section padding | `--section-pad-desktop`, `--section-pad-tablet`, `--section-pad-mobile` | Preset per breakpoint |
| Radius | `--radius-xs` → `--radius-pill`, `--radius-full` | 3/4/8/16/50px + 50% |
| Shadows | `--shadow-gold-sm` → `--shadow-pin-active` | 9 presets (gold-tinted + dark drops) |
| Motion | `--transition`, `--transition-fast`, `--transition-slow` | 0.2s / 0.4s / 0.8s |
| Z-index | `--z-base` → `--z-cursor` | 1 / 100 / 998 / 999 / 1000 / 9998 / 9999 |

**Tikrintinos taisyklės:**
- ❌ NIEKADA `color: #d4af37` → ✅ `color: var(--color-primary)`
- ❌ NIEKADA `padding: 16px 24px` → ✅ `padding: var(--space-4) var(--space-6)`
- ❌ NIEKADA `font-size: 0.78rem` → ✅ `font-size: var(--font-sm)`
- ❌ NIEKADA `box-shadow: 0 8px 32px rgba(212,175,55,.3)` → ✅ `box-shadow: var(--shadow-gold-md)`

**Legacy code (`--c-gold`, `--ff-serif`, `--radius-sm`) gali likti** — naujos sistemos token'ai sukurti šalia, nesilietė. Bet **naujam kodui** naudoti `--color-*`, `--font-*`, `--space-*`, `--radius-*`, `--shadow-*`.

### 5.2 Tipografika

- **Serif (Playfair):** visi `.section-title`, `.property-price`, `.testimonial-quote`, `.stat-num`, brand wordmark
- **Sans (Inter):** body, buttons, meta, eyebrow labels
- **Weights:** 300 (body), 500 (titles), 600 (CTA, prices), 700 (stat badges)
- **Eyebrow pattern:** `font-size: .68rem; letter-spacing: .5em; text-transform: uppercase; color: gold`

### 5.3 Spacing & responsive

- Section padding: `120px 60px` desktop → `80px 40px` (≤1024) → `72px 24px` (≤768)
- **Niekada** nekeisk šių breakpoint'ų tik vienam komponentui — visa svetainė laikosi 1200 / 1024 / 768 / 480 ribų

### 5.4 Animacijos

- Transitions: **TIK** per `var(--transition)` (0.4s cubic-bezier) arba `var(--transition-fast)` (0.2s ease)
- Keyframes: `fadeUp`, `marquee`, `scrollPulse`, `pulse`
- Scroll reveal pattern: pridėti class `.reveal` → IntersectionObserver prideda `.visible`
- Staggered delays: inline `style="transition-delay:.1s"` (žr. property cards, services)

---

## 6. JS pattern'ai (`<script>` blokas pabaigoje)

| Funkcija | Veikia su | Pastaba |
|---|---|---|
| `cursor-glow` | `#cursor-glow` div | Mouse follow |
| Nav scroll | `#mainNav` + `.scrolled` | Threshold 60px |
| Hero parallax | `#heroBg` | Inline style ant scroll |
| IntersectionObserver × 3 | `.reveal`, `.stats-grid`, `#aboutVisual` | |
| `animateCounters()` | `.stat-num[data-target]` | Cubic ease-out, 1800ms |
| Testimonials slider | `#testimonialsTrack`, `#tPrev`, `#tNext`, `#tDots` | Auto-rotate 5500ms, touch swipe 50px |
| `handleSubmit(e)` | form submit | **PLACEHOLDER** — tik toast, jokio backend'o |
| Heart toggle | `.property-action` | SVG fill + `data-on` attr |

**JS konvencija:** ID-driven selectors (`getElementById`), ne classes. Visi event handler'iai apsaugoti `if (el)` patikrinimu. Visi scroll/touch listeners turi `{ passive: true }`.

---

## 7. Privalomos taisyklės

### ❌ NIEKADA

- **Nepilstyti turinio iš `index.html` į placeholder failus** (`assets/css/*.css`, `components/*.html`, `sections/*.html`) be aiškaus migracijos prašymo. Šie failai egzistuoja kaip scaffold'as, bet `index.html` lieka SOURCE OF TRUTH.
- **Nepridėti `<link rel="stylesheet" href="assets/...">` ar `<script src="assets/...">` į `index.html`** — placeholder failai tušti, sulaužytų svetainę
- **Nedėti framework'ų** (React, Vue, Tailwind, Bootstrap, jQuery) — viskas vanilla
- **Nedėti build step** (npm, Vite, 11ty, Astro) — vartotojas pasirinko paprastumą prieš automation'ą
- **Nehardcode'ti spalvų** — visada per `var(--c-*)`
- **Nepridėti tracking script'ų** (GA, Hotjar, Pixel) be aiškios užklausos
- **Nekeisti placeholder kontaktų** (`+66 38 000 000`, `wa.me/6680000000`, `@yourholidayvillas`) į realius **be vartotojo patvirtinimo**
- **Nepush'inti į `origin/main`** be klausimo
- **Nešalinti `loading="lazy"`** nuo `<img>` — visos ne-hero nuotraukos privalo būti lazy

### ✅ DARYK

- Naujus stilius dėk į esamą `<style>` bloką **prie atitinkamos sekcijos**
- Naujus skriptus dėk į vieną `<script>` bloką pabaigoje
- Naujam komponentui — sekti esamą eyebrow + title + desc + grid pattern'ą
- Kainos formatas: `฿X,XXX,XXX` (THB su tūkstančio kableliais) + `≈ $XXX,XXX USD` po juo
- Property badge: `badge-sale` (gold) ARBA `badge-rent` (blue) — daugiau tipų **nesukurti** be sutarimo
- Naujus SVG'us — inline, `viewBox="0 0 24 24"`, be `<title>` (aria-label ant tėvinio elementeo pakanka)

---

## 8. Build / deploy

| Veiksmas | Komanda |
|---|---|
| Lokali peržiūra | Atidaryti `index.html` naršyklėje (dvigubas klik) |
| Live preview su auto-reload | VS Code extension "Live Server" (Right-click `index.html` → Open with Live Server) |
| Commit | `git add index.html && git commit -m "..."` |
| Test | Manual QA: 1200 / 1024 / 768 / 480 breakpoint'ai + form submit + slider touch swipe |

**Deploy strategija dar nepasirinkta** — prieš pirmą deploy paklausti vartotojo dėl hosting'o (kandidatai: GitHub Pages, Netlify drop, Vercel static).

---

## 9. Žinomas TODO / techninis skola

Šie dalykai **veikia kaip placeholder'iai** ir reikalauja realių duomenų prieš production:

1. **Contact form** (`handleSubmit` `<script>` bloke) — tik rodo toast'ą, neperduoda duomenų niekur
2. **Phone:** `+66 38 000 000`
3. **WhatsApp:** `wa.me/6680000000` (4+ vietose)
4. **LINE:** `@yourholidayvillas`
5. **Email:** `info@yourholidayvillas.com`
6. **Property photos:** visos 5 cards iš Unsplash — reikės realių villa nuotraukų
7. **Testimonials:** 4 placeholder reviews su Unsplash avatars
8. **Footer links** (`href="#"`) — nukreipia į nieką
9. **Privacy / Terms / Sitemap** puslapiai neegzistuoja
10. **Favicon** — nėra `<link rel="icon">`
11. **No `<meta name="robots">`, no `sitemap.xml`, no `robots.txt`** — SEO infra trūksta
12. **No Open Graph image** — `og:image` meta praleista

Šių elementų **nekeisti tyliai** — kai užduotis liečia šias vietas, klausti vartotojo dėl realių verčių.

---

## 10. Refactoring rules

Vartotojas pasirinko single-file architektūrą **du kartus** (kartą po neigiamo experimento su 11ty + multi-file split). Tai aiški preferencija paprastumui.

**Esamas state (po 3-čio scaffold prašymo):**
- `index.html` — gyvas, visas kodas čia
- `/assets/`, `/components/`, `/sections/` — **scaffold'inti tušti placeholder'iai** (nieko nedaro, tik dokumentacija)

**Jei vartotojas paprašys migruoti turinį iš `index.html` į placeholder failus:**
1. **Pirmiausia paklausti** — ar tikrai? Tai trečias kartas kai darom šitą sprendimą
2. Jei taip — paklausti deploy strategijos pirma (build step priklauso nuo to)
3. Skaidymo eiliškumas: vieno failo CSS → `assets/css/*.css`, vieno failo JS → `assets/js/main.js` (NIEKADA partial HTML files be SSG arba SSI)
4. Pridėti `<link>` ir `<script src>` į `index.html <head>`

**Default'as:** dirbk single-file `index.html` viduje. Placeholder folder'iai neturi būti palaikomi sinchroniškai su `index.html` — jie tik žemėlapis.

---

## 11. Sesijos kontekstas

**Sesijos pradžioje VISADA perskaityti `/memory/*.md` PIRMA** — tai pirminis projekto context šaltinis. CLAUDE.md čia tik trumpa rules santrauka.

| Failas | Ką ten rasi |
|---|---|
| [memory/brand.md](memory/brand.md) | Brand identity, tone, spalvos, fontai, DO/DON'T |
| [memory/pages.md](memory/pages.md) | Esami + planuojami puslapiai su status'ais |
| [memory/components.md](memory/components.md) | UI komponentų inventorius su status'ais |
| [memory/seo.md](memory/seo.md) | Keywords, meta formulės, schema, OG specs |
| [memory/decisions.md](memory/decisions.md) | Architektūros sprendimų logas |

**Git remote:** `https://github.com/riko8825/Real-estate.git` (`origin/main`)
**Paskutinis remote commit:** `165058c Add files via upload`

**Pagrindiniai sprendimai (santrauka — pilnas log'as memory/decisions.md):**
- 2026-05-18: Single-file `index.html` užfiksuotas (2× rollback iš multi-file)
- 2026-05-18: 102 design tokens įdėti į `:root`
- 2026-05-18: Placeholder scaffold (`/assets/`, `/components/`, `/sections/`) sukurtas kaip referencinis žemėlapis (NE source of truth)
- 2026-05-18: `/memory/` su 5 docs failais sukurta
