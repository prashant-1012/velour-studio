# Velour Studio — Feature List

## Theme & Visual

- **Dark/Light Theme Toggle** — next-themes class strategy; sun/moon icon in navbar; no hydration flash via suppressHydrationWarning
- **Custom Color Palette** — Deep Plum (#5B2D5E) + Champagne Gold (#C9A84C) + Warm Cream (#FAF6F1); full dark mode variants
- **Premium Typography** — Cormorant Garamond for headings (editorial feel), DM Sans for body (modern readability)
- **Gradient Backgrounds** — No plain solid colors; every section uses layered CSS gradients
- **Subtle Texture Overlay** — SVG noise/grain utility class `.texture-overlay` for depth

## Animations

- **Fade-in-up on Scroll** — `.fade-in-up` + IntersectionObserver hook adds `.in-view` when elements enter viewport
- **Animated Counters** — Stats bar numbers count up from 0 on scroll entry
- **Smooth Hover Transitions** — `transition-all duration-300` on all interactive elements
- **Image Hover Overlays** — Gallery and card images reveal gold label on hover

## Navigation

- **Sticky Frosted-Glass Navbar** — backdrop-blur, semi-transparent bg, transitions on scroll
- **Mobile Hamburger Drawer** — slides in from right with smooth animation
- **Active Link Highlighting** — based on current Next.js route
- **Prominent CTA Button** — "Request Consultation" visually distinct from nav links

## Pages & Sections

- **Home Page** — 7 sections: Hero, Stats, Services Preview, Why Choose Us, Meet the Owners, Testimonials Preview, Consultation CTA
- **Services Page** — Category tabs/anchors, individual service cards with SVG icons, duration badges, book buttons
- **About Page** — Studio story, Core Values, Certifications, Timeline milestones
- **Team Page** — Owner spotlight cards, supporting staff cards, hover reveal/flip effects, careers teaser
- **Gallery Page** — Masonry grid, filter tabs (All/Hair/Skin/Nails/Bridal/Men's), lightbox with prev/next (no library), dark lookbook aesthetic
- **Testimonials Page** — Rating summary bar chart, full review cards, Google Reviews badge placeholder
- **Contact Page** — shadcn form (Name, Email, Phone, Subject dropdown, Message), toast on submit, fake map div
- **Consultation Page** — 4-step multi-step wizard: category selection, date/time picker (shadcn Calendar), details form, confirmation screen with reference number

## Responsive Design

- **Mobile-first** — tested at 375px, 768px, 1280px
- **Stacked layouts on mobile** — hero, owner cards, footer columns all stack gracefully
- **Touch-friendly gallery** — filter tabs scroll horizontally on mobile

## SEO & Meta

- Metadata export on every page (title, description)
- Semantic HTML structure throughout
- Alt text on all images

## Footer

- 4-column layout (About, Quick Links, Top Services, Contact & Hours)
- Social icons: Instagram, Facebook, WhatsApp
- Fake map placeholder div (no API)
- Gold separator line + copyright
