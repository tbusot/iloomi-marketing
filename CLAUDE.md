# ILOOMI Marketing Website

## What is ILOOMI

ILOOMI is **The Collaborative Biographer** — a Web, iOS, and Android app that helps users capture and preserve their life stories with the assistance of an AI biographer and contributions from family and friends.

- **Tagline:** "Stories told together. Memories cherished forever."
- **Status:** Live (out of beta)
- **Platforms:** Web, iOS (App Store), Android (Google Play)
- **Website:** https://www.iloomi.com
- **Contact:** info@iloomi.com

---

## Tech Stack

- **Framework:** Next.js 16.1.5 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4, Framer Motion 12.x
- **CMS:** Sanity v3 (embedded studio at `/studio`)
- **Carousel:** Swiper 12.x
- **Fonts:** Playfair Display (headings), Inter (body)
- **Node.js:** Requires >= 20.9.0 (use `nvm use 20.18.3`)

## Color Palette

| Token          | Hex       | Usage                    |
|----------------|-----------|--------------------------|
| `purple`       | `#7C3AED` | Primary brand, CTAs      |
| `dark-green`   | `#0D4D40` | Text, nav, footer bg     |
| `marine-teal`  | `#2B9E8C` | Secondary accent         |
| `off-white`    | `#F5F3EF` | Page backgrounds         |

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind theme, custom styles
│   ├── layout.tsx           # Root layout (fonts, Header, Footer, ScrollToTop)
│   ├── page.tsx             # Homepage (Hero, Ticker, Features, HowItWorks, Blog, FAQ, CTA)
│   ├── blog/
│   │   ├── page.tsx         # Blog listing
│   │   └── [slug]/page.tsx  # Individual blog post
│   ├── faq/page.tsx         # Full FAQ page
│   └── studio/              # Sanity CMS Studio
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Sticky nav, scroll effects, mobile menu, progress bar
│   │   └── Footer.tsx       # 4-column footer (Product, Resources, Careers, Connect)
│   ├── sections/
│   │   ├── Hero.tsx         # Two-column hero with screenshot collage, BetaSignupModal trigger
│   │   ├── ProductFeatures.tsx  # 6 feature blocks with alternating layout
│   │   ├── HowItWorks.tsx   # 7-step Swiper carousel
│   │   ├── BlogPreview.tsx  # Article carousel (Swiper), 8 placeholder posts
│   │   ├── FAQSection.tsx   # 12 accordion FAQs, Sanity CMS fallback
│   │   └── CTASection.tsx   # Download CTA with app store badges
│   └── ui/
│       ├── Accordion.tsx    # Expandable FAQ items
│       ├── BetaSignupModal.tsx  # TestFlight signup form with success state
│       ├── Button.tsx       # Reusable button (primary/secondary/outline/ghost)
│       ├── ScrollToTop.tsx  # Floating scroll-to-top button
│       └── Ticker.tsx       # Infinite scrolling testimonial bar
├── lib/sanity/
│   ├── client.ts            # Sanity client config
│   ├── image.ts             # Image URL builder
│   └── queries.ts           # GROQ queries for blog/FAQ
└── types/index.ts           # TypeScript interfaces (BlogPost, FAQ)
```

## Sanity CMS Schemas

- **blogPost:** title, slug, excerpt, featuredImage, content (PortableText), readingTime, publishedAt, author
- **faq:** question, answer (PortableText), category (ref), order
- **faqCategory:** name, slug, order

Environment variables needed in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=<project_id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

---

## Current State vs iloomi.com

### Matching the real site:
- [x] Hero: "The Collaborative Biographer" headline, two-column layout
- [x] 6 product feature blocks
- [x] "Tell your story, step by step" — 7-step Swiper carousel
- [x] Blog section: "Looking for help to get started?" with Swiper carousel
- [x] FAQ section: 12 questions matching iloomi.com
- [x] CTA: "Try Iloomi today" / "Start your Story"
- [x] Footer: Product / Resources / Careers / Connect columns
- [x] Footer: Terms, Privacy, info@iloomi.com in bottom bar
- [x] Ticker component (scrolling testimonials)
- [x] Ticker component (scrolling testimonials)

### Still using placeholders:
- [ ] Hero screenshots — currently showing placeholder cards, not actual app screenshots
- [ ] Blog post images — gradient placeholders instead of real images
- [ ] Feature section images — placeholder icons instead of app screenshots
- [ ] App Store / Google Play links — need actual store URLs
- [ ] Blog content — placeholder articles, not connected to Sanity CMS content yet
- [ ] Testimonials in Ticker — placeholder quotes, not real user testimonials

### Pages not yet created:
- [ ] `/terms` — Terms & Conditions page (linked in footer)
- [ ] `/privacy` — Privacy Policy page (linked in footer)

### Not yet integrated:
- [ ] Analytics — real site uses GA4, Facebook Pixel, Firebase
- [ ] Sanity CMS — schemas exist but no content populated yet

### Needs updating (code still references beta):
- [ ] BetaSignupModal — should be replaced with direct download/store links (app is out of beta)
- [ ] CTASection — references "free during beta", needs update
- [ ] Hero trust indicators — "Free during beta" badge needs update
- [ ] Footer — "Join Beta" link should become a download/signup link

---

## Reference Assets (`_references/`)

Drop screenshots and raw image assets into `_references/` for use during development. The folder is gitignored and organized as follows:

```
_references/
├── screenshots/           # Screenshots of the existing iloomi.com site
│   ├── homepage/          # Full-page and section-level captures of the homepage
│   ├── blog/              # Blog listing and individual post pages
│   ├── faq/               # FAQ page
│   └── mobile/            # Mobile responsive views
├── assets/                # Raw image assets to be used in the built site
│   ├── logo/              # Logo files (SVG, PNG, etc.)
│   ├── hero/              # Hero section images, app screenshot collages
│   ├── features/          # Feature section images/illustrations
│   ├── blog/              # Blog post thumbnails and images
│   ├── app-store/         # App Store and Google Play badge images
│   └── misc/              # Any other images (testimonial avatars, icons, etc.)
└── README.md              # Notes on what each asset is for
```

**How to use:** When providing assets, drop them into the appropriate subfolder. Reference them in instructions like: "Use `_references/assets/hero/collage.png` for the Hero section background."

**Frames** When dropping .mov files in, export individual frames from the movie into a folder with the same name under the ./frames folder. Use these frames as a reference for animations.

---

## Build & Dev Commands

```bash
# Ensure correct Node version
nvm use 20.18.3

# Install dependencies (--legacy-peer-deps needed for Sanity + Next.js 16 compat)
npm install --legacy-peer-deps

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## GitHub

- **Repo:** https://github.com/tbusot/iloomi-marketing
- **Branch:** main
