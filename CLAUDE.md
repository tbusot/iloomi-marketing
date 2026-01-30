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

**Site/Page Assets**
If the site assets are available, they will be under the `_references/screenshots/%page%/image_assets` folder. Consult the images in the `./frames` folder and find the corresponding `image_assets` file to place into the page.

**Bug Screenshots**
Bug screenshots are placed in `_references/screenshots/%page%/bug-%section%/` (e.g., `homepage/bug-hero/`). Each bug folder contains:
- `%bug%-good.png` — the desired/correct appearance of the specific section
- `%bug%-%desc%.png` — the current buggy appearance
- `%page%-full-good.jpg` — **full-page reference** showing the entire page at correct scale and layout. Always consult this file to understand how the section fits within the overall page: what elements appear above and below, how much vertical space the section occupies, and whether elements (e.g., device collages, images) extend beyond the section boundary into adjacent areas.

Compare the two screenshots to identify differences in size, color, text, layout, etc. Note that text, labels, or other content baked into the "good" image should not be duplicated as HTML overlay text. Fix only the specific issue shown — no other changes.

Bug screenshots may include the outer browser frame/chrome to convey the proper scale of elements relative to the full viewport. Use this framing to judge proportions, full-bleed vs. contained layouts, and how much of the viewport a section occupies — do not treat the browser chrome itself as part of the design.

**Animation Frames**
When a `frames/` folder exists under `_references/screenshots/%page%/`, it contains exported frames from a screen recording (`.mov`). The subfolder is named after the source movie file. Review the frame sequence to understand:
- Entrance animations (elements sliding/fading in)
- Scroll-driven transitions (elements fading, scaling, or translating on scroll)
- The order and timing of animated elements

Use these frames as the definitive reference for which elements animate, their direction of motion, and their visual state at different scroll positions. Do not remove animated elements when fixing other issues — preserve all animations visible in the frames.

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
