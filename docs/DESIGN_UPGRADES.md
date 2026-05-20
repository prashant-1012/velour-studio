# Design Upgrade Notes — Premium Polish

Reference for all remaining steps. Apply these principles to every page built from Step 5 onwards.
**Home page (Step 4) has already been retrofitted** — see Section 9 for what was actually implemented.

---

## 1. Hero — Cinematic Feel
- Add slow **Ken Burns effect** on hero images: CSS `@keyframes` with `scale(1) → scale(1.08)` over 8–12s
- Use **full-bleed image** with text overlaid, not two clean columns split
- Add a thin decorative serif tagline line ABOVE the main headline (e.g. "Est. 2015 · Baner, Pune")
- Headline text should feel like it **bleeds over** or overlaps the image edge

## 2. Typography — More Contrast & Scale
- Headings should be **larger and lighter**: `font-weight: 300`, sizes 80–100px on desktop (`text-7xl` to `text-8xl`)
- Mix weights dramatically: ultra-thin display headline + one bold/gold accent word
- Uppercase section labels: increase tracking to `tracking-[0.3em]` or more
- Body text: keep DM Sans at 300–400 weight, slightly larger line height (`leading-8`)

## 3. Color — 95% Neutral, 5% Accent
- Use brand colors (plum, gold) as **accents only** — one gold line, one plum button per section
- Sections should feel **cream/ivory** (light) or **obsidian** (dark) — color should surprise, not repeat
- Add a **warm paper texture** to cream sections instead of flat CSS gradients
- Footer = **black velvet** feel: near-black `#0A060A`, not just dark gray

## 4. Whitespace — Breathe More
- Key hero and statement sections: `py-32 lg:py-40` minimum
- Supporting/dense info sections (hours, addresses): can be tighter — contrast is the point
- Don't pad every section equally — create rhythm between spacious and dense

## 5. Premium Detail Checklist
- [x] **Scrolling marquee strip** between sections — "Balayage · Bridal · Hydra Facial · Men's Grooming ·" repeating ticker
      → Pure CSS `@keyframes marquee` with `translateX`, no library
      → `<MarqueeStrip dark />` component in `app/page.tsx` — reuse this pattern on all pages
      → Placed after Hero and between Why Choose Us → Meet the Owners
- [x] **Gold hairline dividers** — `h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent` between sections
- [x] **Tall portrait image crops** — `aspect-[3/4]` on owner cards, no rounded corners
- [ ] **Custom cursor dot** — small gold `6px` dot that follows cursor, pure CSS `mix-blend-mode: difference`
      → Only on desktop (hide on touch devices) — implement in Step 12
- [x] **Image hover overlay** — gold hairline border `border-[#C9A84C]/50` appears on hover on image cards
- [x] **Section entrance stagger** — children use `transitionDelay: \`${i * 70}ms\`` inline style for natural cascade

## 6. Per-Page Application Plan

| Page | Status | Specific Upgrades |
|------|--------|------------------|
| Home (Step 4) | ✅ Done | Full-bleed Ken Burns hero, marquee ×2, obsidian/cream alternating, `font-weight:300`, pull-quote testimonials, `aspect-[3/4]` owner cards, gold hairlines |
| Services (Step 5) | ⬜ Next | Tall portrait section images `aspect-[3/4]`, marquee after hero, flush `gap-px` grid for service cards, no rounded corners |
| About (Step 6) | ⬜ | Timeline as vertical gold line `border-l-2 border-[#C9A84C]`, not a flat list; full-bleed story image |
| Team (Step 7) | ⬜ | `aspect-[3/4]` portrait cards, hover reveal overlay with bio, no rounded corners |
| Gallery (Step 8) | ⬜ | Full dark bg `#0A060A`, tall masonry crops, sharp corners, dark lookbook hero |
| Testimonials (Step 9) | ⬜ | Large pull-quote Cormorant `text-3xl italic`, rating bar chart, obsidian bg |
| Contact (Step 10) | ⬜ | Split layout: full-height left image panel, form on right |
| Consultation (Step 11) | ⬜ | Mood panel with tall editorial image left, gold dot step indicators |
| Final Polish (Step 12) | ⬜ | Add custom cursor dot, audit all pages for consistency |

## 7. Global CSS — Already Added to globals.css ✅

```css
/* Ken Burns */
@keyframes kenburns {
  0%   { transform: scale(1) translate(0, 0); }
  100% { transform: scale(1.08) translate(-1%, 1%); }
}
.ken-burns {
  animation: kenburns 12s ease-in-out infinite alternate;
}

/* Marquee */
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-track {
  animation: marquee 28s linear infinite;
}
```

## 9. Home Page Retrofit — What Was Actually Implemented (reference)

These patterns are the **source of truth** for how pages should look. Copy from `app/page.tsx`.

- **Hero**: full-bleed image + `animation: kenburns 14s ease-in-out infinite alternate` on `<Image>` inline style
- **Headline**: `text-6xl sm:text-7xl lg:text-8xl xl:text-9xl`, `fontWeight: 300`, `lineHeight: 0.95`
- **Eyebrow label**: `text-[11px] tracking-[0.35em] uppercase text-[#C9A84C]` with `w-10 h-px bg-[#C9A84C]` line prefix
- **Italic gold accent**: one word per headline in `fontStyle: "italic", color: "#C9A84C"` inline
- **Marquee component**: `<MarqueeStrip dark />` — reusable, drop in between any two sections
- **Section alternation**: cream (`#FAF6F1→#EDE8E3`) and obsidian (`#0F0A0F→#170F17`) strictly alternating
- **Gold hairline**: `<div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />`
- **Service cards**: flush `gap-px bg-[#DDD0C8]/60` grid, each cell `bg-[#FAF6F1] hover:bg-white` — no borders, no radius
- **Why Choose Us**: sticky left heading + numbered `01–06` grid on right, both on obsidian bg
- **Owner cards**: `aspect-[3/4]`, no `rounded-*`, gold `border-[#C9A84C]/50` on hover, text overlaid at bottom
- **Testimonials**: `text-2xl fontWeight:300 fontStyle:italic` pull quotes, obsidian bg, `gap-px` grid
- **CTA Banner**: real background image + Ken Burns + plum overlay + gold CTA button (not white text button)
- **Stats bar**: `font-weight:300`, `text-5xl lg:text-6xl`, `divide-x divide-[#2E2030]` separators

## 10. What NOT to Do
- Don't use plum as a section background — reserve it for the stats bar, CTA banner, and buttons only
- Don't fill cards with color — keep them white/transparent with a hairline gold or neutral border
- Don't center every section — left-align body copy where possible for editorial tension
- Don't use rounded corners on gallery images — sharp edges feel more fashion/editorial
