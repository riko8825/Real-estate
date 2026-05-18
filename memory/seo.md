# SEO — keywords, meta, schema

## Target market

- **Geography:** International foreign buyers (primarily UK, Germany, Russia, Australia, Nordic countries, Scandinavia)
- **Searching from:** Outside Thailand (Google.co.uk, .de, .ru, .com.au, .com)
- **Search intent:** Investment + lifestyle + retirement + holiday rental
- **Competing against:** thailand-property.com, fazwaz.com, pattayaprestigeproperties.com, lazudi.com

## Primary keywords (from current meta)

Extracted iš `index.html` `<meta name="keywords">`:

| Keyword | Estimated competition | Priority |
|---|---|---|
| `Pattaya pool villa` | Medium | 🔴 primary |
| `Pattaya real estate` | High | 🔴 primary |
| `buy villa Pattaya` | Medium | 🔴 primary |
| `rent villa Pattaya` | Medium | 🟡 secondary |
| `Pratumnak villa` | Low | 🟢 long-tail |
| `Jomtien condo` | Low | 🟢 long-tail |
| `East Pattaya house` | Low | 🟢 long-tail |
| `Thailand property` | Very high | 🟡 secondary |

## Recommended keyword expansion

**[TODO]** — Run keyword research for these clusters:

### Buyer intent keywords
- "buy property Thailand foreigner"
- "foreign freehold condo Pattaya"
- "Pattaya investment property ROI"
- "leasehold villa Thailand"
- "Chanote title deed Pattaya"

### Area-specific (long-tail SEO opportunities)
- "Pratumnak Hill property for sale"
- "Jomtien Beach condo sea view"
- "East Pattaya pool villa"
- "Na Kluea luxury villa"
- "Banglamung land for sale"

### Rental intent
- "Pattaya holiday villa rental"
- "long-term villa rent Pattaya"
- "monthly villa rental Jomtien"

### Investment / financial
- "Pattaya rental yield"
- "Thailand property tax foreigners"
- "best area to invest Pattaya"

### Russian market (team speaks RU)
- "Купить виллу Паттайя"
- "Недвижимость Таиланд"
- "Кондо Джомтьен"
- **[TODO]** — decide if Russian-language landing page is in scope

## Meta title formula

**Current** (`index.html` line 6):
`Your Holiday Villas Pattaya | Pool Villas, Condos & Houses For Sale & Rent`

### Template for new pages

```
[Primary Keyword] | [Modifier] | Your Holiday Villas Pattaya
```

**Length target:** 50–60 characters (60 max to avoid truncation in SERPs)

### Examples

| Page | Title |
|---|---|
| Homepage (current) | `Your Holiday Villas Pattaya \| Pool Villas, Condos & Houses For Sale & Rent` (74 chars — slightly long) |
| Pratumnak area page | `Pratumnak Hill Pool Villas For Sale \| Your Holiday Villas` (~56 chars) |
| Jomtien condo page | `Jomtien Beach Condos For Sale & Rent \| Your Holiday Villas` (~57 chars) |
| Foreign buyer guide | `Buying Property in Thailand as a Foreigner — Legal Guide` (~56 chars) |
| Why invest Pattaya | `Why Invest in Pattaya Real Estate — 2026 Guide` (~46 chars) |
| Individual property | `[Property Name] — [Area] \| ฿[Price] \| Your Holiday Villas` |

**[TODO]** — homepage title is 74 chars (Google truncates ~60). Consider shortening to:
`Pattaya Pool Villas, Condos & Houses For Sale & Rent` (52 chars)

## Meta description formula

**Current** (`index.html` line 8):
`Pattaya's trusted pool villa specialists. Buy, sell or rent luxury pool villas, condos and houses in Pratumnak, Jomtien, East Pattaya. Foreign buyer experts. Call +66 38 000 000`

### Template

```
[Value prop in 1 sentence] [What we do] [Where] [Trust signal / CTA]
```

**Length target:** 150–160 characters (160 max)

### Quality checklist

- ✅ Contains 1-2 primary keywords (naturally, not stuffed)
- ✅ Mentions geographic specifics (Pattaya, area names)
- ✅ Trust signal (years experience, # of clients, certifications)
- ✅ Soft CTA (Call, Browse, Discover, Get free consultation)
- ❌ No clickbait, no all-caps, no emojis
- ❌ No keyword stuffing (max 2 repetitions of primary keyword)

### Examples

| Page | Description |
|---|---|
| Pratumnak page | `Browse Pratumnak Hill pool villas for sale & rent. Premium hillside properties with sea views. Bilingual team, 15+ years Pattaya experience. Free consultation.` (159 chars) |
| Foreign buyer guide | `Complete guide to buying property in Thailand as a foreigner. Freehold condos, leasehold villas, legal process explained. In-house Thai legal team.` (148 chars) |

## Open Graph (social sharing)

**Current state** (`index.html` lines 11-13):
- `og:title` ✅ present
- `og:description` ✅ present
- `og:type` ✅ "website"
- `og:image` ❌ **MISSING — high priority**
- `og:url` ❌ missing (add when domain confirmed)
- `og:locale` ❌ missing (suggest `en_US` + `ru_RU`, `de_DE` alternates)
- `og:site_name` ❌ missing
- Twitter Card tags ❌ missing

### OG image specs

**[TODO]** — Create OG image asset:
- **Dimensions:** 1200 × 630 px (Facebook + Twitter standard)
- **Format:** JPG (smaller) or PNG (sharper)
- **File size:** < 1 MB (ideally < 300 KB)
- **Location:** `/assets/images/og-image-home.jpg`
- **Per-page versions:** generate variants for major landing pages (homepage, area pages, buyer guide)

**Suggested design:**
- Dark background (`#0a0a0a`)
- Pool villa hero photo (left 60%) with gradient overlay
- Right side: brand wordmark + tagline + key offer in gold
- Gold border accent (matches site `--color-primary`)

## Schema.org structured data

**Current state:** **NONE** — `index.html` has zero JSON-LD blocks. High SEO priority.

### Recommended schema types

#### `RealEstateAgent` — site-wide (in `<head>`)

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Your Holiday Villas",
  "image": "https://[domain]/assets/images/og-image-home.jpg",
  "telephone": "+66380000000",
  "email": "info@yourholidayvillas.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Pratumnak Hill",
    "addressLocality": "Pattaya",
    "addressRegion": "Chonburi",
    "postalCode": "20150",
    "addressCountry": "TH"
  },
  "areaServed": ["Pattaya", "Pratumnak", "Jomtien", "East Pattaya", "Na Kluea", "Banglamung"],
  "knowsLanguage": ["English", "Thai", "Russian"],
  "foundingDate": "2009",
  "url": "https://[domain]"
}
```

#### `Product` or `SingleFamilyResidence` — per property listing

When individual property pages exist, each should have:

```json
{
  "@context": "https://schema.org",
  "@type": "SingleFamilyResidence",
  "name": "Pratumnak Pool Villa",
  "description": "3-bedroom luxury pool villa in Pratumnak Hill",
  "numberOfBedrooms": 3,
  "numberOfBathroomsTotal": 3,
  "floorSize": { "@type": "QuantitativeValue", "value": 280, "unitText": "SQM" },
  "address": { "@type": "PostalAddress", "addressLocality": "Pratumnak Hill, Pattaya" },
  "offers": {
    "@type": "Offer",
    "price": 8500000,
    "priceCurrency": "THB",
    "availability": "https://schema.org/InStock"
  }
}
```

#### `FAQPage` — for buyer-guide section / dedicated FAQ page

Convert "Foreign Buyer Guide" section into FAQ schema for rich SERP results.

#### `BreadcrumbList` — when subpages exist

#### `Review` + `AggregateRating` — for testimonials section

```json
{
  "@type": "AggregateRating",
  "ratingValue": "5.0",
  "reviewCount": "[TODO: actual count]"
}
```

## Technical SEO checklist

| Item | Status | Priority |
|---|---|---|
| `<title>` tag | ✅ present (74 chars — slightly long, consider 52-char version) | 🟢 cleanup |
| `<meta description>` | ✅ present (151 chars — within 160 limit) | — |
| `<meta keywords>` | ✅ present (low value but doesn't hurt) | — |
| `<meta name="author">` | ✅ present | — |
| `<meta name="robots">` | ✅ present (`index, follow, max-image-preview:large`) | — |
| `<meta name="googlebot">` | ✅ present | — |
| `<meta name="theme-color">` | ✅ present (`#0a0a0a`) | — |
| Open Graph tags | ✅ complete (title, description, type, url, site_name, locale, image + dimensions + alt) | — |
| `og:image` asset | ❌ URL referenced but file does not exist (`/assets/images/og-image-home.jpg`) | 🔴 high |
| Twitter Card tags | ✅ present (`summary_large_image` + image alt) | — |
| `twitter:site` (@handle) | ❌ missing (no Twitter/X account yet) | 🟢 low |
| Schema.org JSON-LD | ✅ 2 blocks live: `RealEstateAgent` + `WebSite` | — |
| Per-property `SingleFamilyResidence` schema | 📋 planned (when property detail pages exist) | 🟡 medium |
| `FAQPage` schema for buyer-guide | 📋 planned | 🟢 low |
| `AggregateRating` for testimonials | 📋 planned (need real testimonial count first) | 🟢 low |
| Canonical URL | ✅ present (`https://yourholidayvillas.com/` — **placeholder domain**) | 🔴 update when domain decided |
| `<link rel="alternate" hreflang>` | ❌ missing | 🟡 medium (if RU/DE versions planned) |
| `robots.txt` | ❌ missing | 🔴 high |
| `sitemap.xml` | ❌ missing | 🔴 high |
| Favicon (all sizes) | ⚠️ scaffold present in `<head>` (commented out — needs asset files) | 🔴 high |
| Apple touch icon | ⚠️ scaffold present (commented out) | 🟡 medium |
| Web manifest | ⚠️ scaffold present (commented out) | 🟡 medium |
| Image alt text | ✅ all 12 `<img>` have alt | — |
| Image width/height attrs | ✅ all 12 `<img>` have intrinsic dimensions (CLS prevention) | — |
| Image lazy loading | ✅ all 12 `<img>` have `loading="lazy"` | — |
| Hero LCP preload | ✅ `<link rel="preload" as="image" fetchpriority="high">` for hero bg | — |
| Image CDN preconnect | ✅ `<link rel="preconnect" href="https://images.unsplash.com">` | — |
| Font preconnect | ✅ googleapis + gstatic | — |
| Semantic HTML | ✅ good (sections, nav, footer) | — |
| Heading hierarchy | ✅ one h1, multiple h2/h3 | — |
| Mobile-friendly | ✅ responsive 480/768/1024/1200 | — |
| Critical CSS extraction | ⚠️ all CSS inline (single-file), so technically "critical" — but no above-fold-only split | 🟢 low |
| HTTPS | ⚠️ depends on hosting | 🔴 high (hosting decision pending) |
| Internal linking | ⚠️ all footer links go `href="#"` | 🟡 medium |

### Implementation note (2026-05-18)

Full `<head>` SEO setup completed in `index.html` lines 4-127. Two JSON-LD blocks validated. Three placeholders need real values:

1. **Domain** — currently `https://yourholidayvillas.com/` everywhere (canonical, og:url, og:image, JSON-LD `@id`/`url`). Replace globally when hosting/domain decided.
2. **OG image asset** — URL referenced (`/assets/images/og-image-home.jpg`) but file doesn't exist. Create per specs above.
3. **Favicon set** — `<link>` tags scaffolded inside HTML comment block. Uncomment after generating via realfavicongenerator.net.

## Google Search Console + Analytics setup

**[TODO]** — Not yet configured. When domain is live:
1. Add domain to Google Search Console
2. Submit `sitemap.xml`
3. Install Google Analytics 4 (or Plausible for privacy-friendly alternative)
4. Set up conversion events: form submit, WhatsApp click, LINE click, phone click

## Local SEO (Thailand-specific)

**[TODO]** — Consider these for local visibility:
- Google Business Profile (free, high priority for "real estate Pattaya" searches)
- DDProperty.com listing
- Hipflat.co.th listing
- Russian portal: tairu.ru
- German portal: thailand-immobilien.com

---

**Updated:** 2026-05-18 (initial — inferred from `index.html` meta tags + brand context)
