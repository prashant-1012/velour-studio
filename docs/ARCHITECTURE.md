# Velour Studio — Architecture

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Theming | next-themes (class strategy) |
| Icons | lucide-react |
| Fonts | Cormorant Garamond (headings), DM Sans (body) via next/font/google |
| Images | next/image with Unsplash + ui-avatars.com |

## Folder Structure

```
velour-studio/
├── app/
│   ├── layout.tsx              # Root layout — ThemeProvider, Navbar, Footer
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles, CSS variables, animations
│   ├── services/
│   │   └── page.tsx            # Services menu with category tabs
│   ├── about/
│   │   └── page.tsx            # Studio story, values, timeline
│   ├── team/
│   │   └── page.tsx            # Team profiles
│   ├── gallery/
│   │   └── page.tsx            # Lookbook with lightbox and filters
│   ├── testimonials/
│   │   └── page.tsx            # Reviews with rating breakdown
│   ├── contact/
│   │   └── page.tsx            # Contact form + map placeholder
│   └── consultation/
│       └── page.tsx            # Multi-step booking form
├── components/
│   ├── Navbar.tsx              # Sticky frosted-glass navbar
│   ├── Footer.tsx              # 4-column footer with map placeholder
│   └── ui/                     # shadcn/ui primitives
├── hooks/
│   └── useIntersectionObserver.ts  # Scroll-triggered animation hook
├── lib/
│   └── utils.ts                # shadcn cn() utility
└── docs/                       # Project documentation
```

## Routing

All routes use the App Router file-system convention. Every page is a Server Component by default; interactive sections use `"use client"` directive.

## Component Breakdown

- **Navbar**: sticky, frosted glass, mobile drawer, theme toggle, active link detection
- **Footer**: 4-column layout, fake map div, social icons
- **Page Heroes**: reusable gradient banner pattern (each page defines its own)
- **Consultation Form**: 4-step wizard built with React useState, no backend
- **Gallery Lightbox**: built with React useState, no external library

## Design Decisions

- Tailwind CSS v4 with CSS variables for theming (not tailwind.config.ts extend)
- `class` strategy for dark mode (ThemeProvider attribute="class")
- `suppressHydrationWarning` on `<html>` to prevent theme flash
- All animations via CSS classes + IntersectionObserver (no Framer Motion dependency)
- No real backend — forms show toast confirmations only
