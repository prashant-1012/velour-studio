# Velour Studio

A full-featured, premium beauty salon website built with Next.js 15, TypeScript, and Tailwind CSS. Designed for **Velour Studio** — a luxury unisex salon based in Baner, Pune — the site is built with an editorial aesthetic, dark/light theme support, and a fully responsive layout across all pages.

> Live site: [velourstudios.vercel.app](https://velourstudios.vercel.app)

---

## Preview

| Page | Description |
|------|-------------|
| `/` | Hero with Ken Burns effect, stats bar, services preview, Why Choose Us, owner teasers, testimonials pull-quotes, CTA banner |
| `/services` | Category tabs (Hair, Skin, Nails, Bridal, Men's), flush service grid, featured portrait image |
| `/about` | Studio story, core values, certifications, vertical gold-line timeline |
| `/team` | Owner 3D flip cards (hover/tap), supporting staff cards, careers section |
| `/gallery` | Masonry lookbook grid with filter tabs, custom no-library lightbox |
| `/testimonials` | Rating bar chart with scroll animation, full review cards, featured pull-quote |
| `/contact` | Split layout contact form with shadcn inputs, social pills, decorative map |
| `/consultation` | 4-step wizard — service selection, calendar date/time picker, details form, confirmation screen |

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Calendar, Input, Textarea, Select, Sonner) |
| Icons | Lucide React |
| Theming | next-themes (class strategy, no hydration flash) |
| Date Picker | react-day-picker v10 |
| Toasts | Sonner |
| Fonts | Cormorant Garamond (headings) + DM Sans (body) via `next/font` |

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Deep Plum | `#5B2D5E` | Primary buttons, stats bar, CTA overlays |
| Champagne Gold | `#C9A84C` | Accents, labels, hairlines, active states |
| Warm Cream | `#FAF6F1` | Light section backgrounds |
| Obsidian | `#0F0A0F` | Dark section backgrounds |

### Typography

- **Cormorant Garamond** — editorial display headings, `font-weight: 300`, sizes up to `text-9xl`
- **DM Sans** — body copy, labels, UI text, `font-weight: 300–400`

### Layout Conventions

- Sections strictly alternate: cream (`#FAF6F1 → #EDE8E3`) and obsidian (`#0F0A0F → #170F17`)
- Gold hairline dividers between sections: `h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent`
- Scrolling marquee strip (`<MarqueeStrip />`) placed between alternating sections
- No rounded corners on gallery/portrait images — sharp edges for editorial feel
- `aspect-[3/4]` tall portrait crops on owner and team cards

---

## Features

### Animations
- **Ken Burns** — slow `scale(1) → scale(1.08)` loop on all hero images
- **Fade-in-up on scroll** — `IntersectionObserver` + `.fade-in-up` / `.in-view` CSS classes
- **Animated counters** — eased count-up from 0 on scroll entry
- **Rating bar animation** — resets and replays on every page visit
- **Marquee strip** — pure CSS `@keyframes marquee`, no library

### Navigation
- Sticky frosted-glass navbar with `backdrop-blur`
- Scroll-aware: transparent at top → frosted on scroll
- Context-aware link colors: light text over dark hero pages (Home, Gallery), dark text over light-background pages
- Mobile hamburger drawer sliding in from the right

### Gallery
- Masonry CSS grid with variable row spans
- Filter tabs (All / Hair / Skin / Nails / Bridal / Men's) with smooth tab indicator
- Custom lightbox — no external library, keyboard navigation (← → Esc), disabled state at first/last image

### Consultation Wizard
- 4-step multi-step form with animated transitions between steps
- Mood panel with per-step editorial copy (desktop only)
- shadcn Calendar with gold accent override (CSS variable scoping)
- Unselected category cards dim on selection for clear visual feedback
- Generates a reference number on confirmation

### Theme
- Dark / Light toggle in navbar (sun/moon icon)
- Full dark mode support across all pages via CSS variables and Tailwind `dark:` variants
- `suppressHydrationWarning` on `<html>` to prevent flash

---

## Project Structure

```
velour-studio/
├── app/
│   ├── layout.tsx              # Root layout — ThemeProvider, fonts, globals
│   ├── globals.css             # Design tokens, card variants, animations
│   ├── page.tsx                # Home page
│   ├── services/page.tsx
│   ├── about/page.tsx
│   ├── team/page.tsx
│   ├── gallery/page.tsx
│   ├── testimonials/page.tsx
│   ├── contact/page.tsx
│   └── consultation/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ui/                     # shadcn components
├── docs/
│   ├── PROGRESS.md             # Build progress tracker
│   ├── UI_ISSUES.md            # UI audit — 26 issues, all resolved
│   ├── FEATURES.md
│   ├── DESIGN_UPGRADES.md
│   ├── CONTENT.md
│   └── ARCHITECTURE.md
└── public/
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# Production build
npm run build
npm run start
```

---

## Deployment

The project is ready to deploy to [Vercel](https://vercel.com) with zero configuration — the App Router and `next/image` remote patterns are already configured in `next.config.ts`.

```bash
vercel deploy
```

---

## Documentation

All design decisions and build notes live in [`/docs`](./docs):

- [`PROGRESS.md`](./docs/PROGRESS.md) — step-by-step build log
- [`DESIGN_UPGRADES.md`](./docs/DESIGN_UPGRADES.md) — premium polish principles and per-page upgrade plan
- [`UI_ISSUES.md`](./docs/UI_ISSUES.md) — full UI audit with fix status (all 26 issues resolved)
- [`FEATURES.md`](./docs/FEATURES.md) — complete feature inventory
- [`CONTENT.md`](./docs/CONTENT.md) — copy and content reference

---

## Credits

Built by [Prashant Kumar](https://github.com/developer99ai).  
Photography via [Unsplash](https://unsplash.com).  
Icons by [Lucide](https://lucide.dev).
