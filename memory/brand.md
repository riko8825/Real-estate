# Brand — Your Holiday Villas Pattaya

## Identity

| | |
|---|---|
| **Brand name** | Your Holiday Villas |
| **Full name** | Your Holiday Villas Pattaya |
| **Tagline** | Pattaya's Premier Pool Villa Specialists |
| **Alt tagline** | Your Local Pattaya Property Experts |
| **Established** | 2009 (per hero eyebrow + footer copy) |
| **Location** | Pratumnak Hill, Pattaya, Chonburi 20150, Thailand |
| **Industry** | Real estate (luxury pool villas, condos, houses — sale + rent) |
| **Target audience** | Foreign buyers (UK, RU, DE, AU, other expats), investors, holiday renters |
| **Languages spoken** | English, Thai, Russian (bilingual team) |
| **Lead figure** | Poy (per about-signature: "Poy & Team") |

## Tone of voice

- **Direct, confident, professional** — "Pattaya's #1 Investment Destination", "Trusted pool villa specialists"
- **Expert-focused** — emphasis on experience ("15+ years"), legal team, due diligence
- **International / multilingual** — speaks to foreign buyers explicitly, USD conversions next to ฿
- **Reassuring for first-time foreign buyers** — explains freehold vs leasehold simply, mentions legal team handles everything
- **Aspirational but not boasting** — "Discover Your Dream Villa", not "Best villas in Thailand"
- **NOT used:** slang, exclamation marks, urgency tactics ("only 2 left!"), discount language

## Color palette (hex)

### Brand colors

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` (gold) | `#d4af37` | All CTAs, prices, eyebrows, accents — THE brand color |
| `--color-primary-hover` | `#e8c84a` | Hover state for gold CTAs |
| `--color-primary-dark` | `#a88420` | Pressed gold, scrollbar |
| `--color-secondary` (blue) | `#2563eb` | **Only** "For Rent" badge — never use elsewhere |
| `--color-secondary-lt` | `#3b82f6` | Reserved (currently unused) |

### Surface colors (dark theme)

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#0a0a0a` | Page base |
| `--color-bg-alt` | `#111111` | Alternating section bg (properties, contact) |
| `--color-bg-elevated` | `#1a1a1a` | Service card bg |
| `--color-bg-card` | `#161616` | Property card, testimonial card |

### Text + utility colors

| Token | Hex / rgba | Usage |
|---|---|---|
| `--color-text` | `#ffffff` | Primary text |
| `--color-text-soft` | `rgba(255,255,255,.68)` | Hero subtitle |
| `--color-text-body` | `rgba(255,255,255,.75)` | Body content |
| `--color-text-muted` | `rgba(255,255,255,.45)` | Secondary |
| `--color-text-subtle` | `rgba(255,255,255,.22)` | Footer copyright |
| `--color-border` | `rgba(212,175,55,.18)` | Gold-tinted borders |

### Third-party brand colors (do not change)

| Brand | Hex |
|---|---|
| WhatsApp | `#25D366` |
| LINE | `#00B900` |
| TripAdvisor accent | `#34e0a1` |

## Typography

| Use | Family | Weights | Source |
|---|---|---|---|
| **Headings, prices, quotes** | Playfair Display (serif) | 400, 500, 600, 700, 400i, 500i | Google Fonts |
| **Body, buttons, labels, meta** | Inter (sans) | 300, 400, 500, 600 | Google Fonts |

Fallback stack:
- Serif: `'Playfair Display', Georgia, serif`
- Sans: `'Inter', system-ui, sans-serif`

**Eyebrow signature pattern** (kartoja per visą svetainę):
`font-size: .68rem; letter-spacing: .5em; text-transform: uppercase; color: gold`

## DO

- ✅ Naudoti `var(--color-*)` ir `var(--font-*)` — niekada hardcode hex/rem
- ✅ Gold (`#d4af37`) — viskam, kas turi būti pastebėta (CTA, kainos, eyebrows)
- ✅ Serif fontu — tik headings, prices, brand wordmark, testimonial quotes
- ✅ Sans fontu — viskas kita (body, buttons, meta, labels)
- ✅ USD konversija po THB kainos (`฿8,500,000` + `≈ $236,000 USD`)
- ✅ Pattaya area pavadinimai PIRMINIAI keywords (Pratumnak, Jomtien, East Pattaya, Na Kluea, Pattaya Beach, Banglamung)
- ✅ Mentions of "foreign buyers", "expats", "international clients"
- ✅ Numbers + facts > marketing fluff ("15+ years", "393+ clients", "850M+ THB transacted")
- ✅ All-caps eyebrows tik su tracking `.5em` arba `.45em` (be tracking jie atrodo agresyviai)

## DON'T

- ❌ Hardcode'ti `#d4af37` arba kitas spalvas — visada `var(--color-primary)`
- ❌ Naudoti blue (`#2563eb`) niekur kitur, išskyrus "For Rent" badge
- ❌ Maišyti serif + sans tame pačiame heading'e
- ❌ Naudoti exclamation marks copy'je ("Amazing villa!" ❌ — "Stunning 3-bedroom pool villa" ✅)
- ❌ Urgency / scarcity tactics ("Only 2 left!", "Limited time offer!")
- ❌ Discount-language ("50% off!", "Best price guaranteed!")
- ❌ Generic stock phrases ("Click here", "Learn more" — vietoj to: "View Listings", "Free Consultation")
- ❌ Light theme (svetainė juodos design system'os, light theme sulaužytų gold palette)
- ❌ Sans-serif headings — visi `.section-title`, `.property-price`, brand wordmark privalo būti Playfair
- ❌ Hide USD prices — visada rodyti šalia THB (foreign buyers reikalauja)
- ❌ Mention "cheap" / "affordable" — pozicionuojami kaip premium agentūra

## Logo / wordmark

Šiuo metu **tekstinis logo:** `Your Holiday Villas` (Playfair, gold, letter-spacing .06em)
- Nav: 1.35rem
- Footer: 1.5rem

**[TODO]** Sukurti tikrą logo (SVG, monochrome + gold versijos). Šiuo metu wordmark veikia, bet brand identity sustiprintų vizualus žymuo.

## Photography style

Šiuo metu **visos nuotraukos iš Unsplash** (placeholder):
- Hero: pool villa exterior wide shot, sunset/golden hour
- Property cards: villa exteriors, condo views, terraces
- About: team / lifestyle shot
- Locations: coastline aerial Pattaya

**[TODO]** Real photography guidelines kai bus tikros nuotraukos:
- Format: landscape 4:3 (kortelės), wide 16:9 arba 21:9 (hero)
- Color grading: warm, slightly muted (matches dark + gold palette)
- Subjects: actual listed villas, no stock people
- Avoid: oversaturated, HDR-heavy, fish-eye distortion
- All images need `loading="lazy"` (except hero)

## Iconography

Inline SVG, `viewBox="0 0 24 24"`, stroke-based (line icons, ne filled):
- `stroke-width: 1.5` (default)
- Gold (`stroke: var(--color-primary)`) icon contexts
- No fill (unless decorative)

## Voice samples

✅ **Good (already in copy):**
- "Hand-selected properties across Pattaya's most desirable neighbourhoods — for sale, rent, and investment."
- "Two straightforward routes to ownership — we guide you through both with our in-house legal team."
- "Our legal team will guide you through every step of the purchase process."

❌ **Bad (avoid):**
- "Don't miss out — book your dream villa today!"
- "Incredible deals on Pattaya properties — limited stock!"
- "We're the best real estate agency in Pattaya!"

---

**Updated:** 2026-05-18 (initial — inferred from `index.html`)
