# UI Issues Audit — All Pages

Status legend: `[ ]` open · `[x]` fixed · `[-]` won't fix

---

## Navbar

| ID  | Status | Issue |
|-----|--------|-------|
| N-1 | [x] | **Text invisible on light pages at top of scroll.** Nav links are `text-[#7A6A60]` on transparent background — readable over dark hero images, but invisible on light-background pages (Services, About, Contact) until scrolled. Fix: always give navbar a dark-to-transparent gradient behind it on transparent state, or switch link color based on scroll. |
| N-2 | [x] | **Logo text color on transparent state.** Logo is `text-[#1C1410]` (dark) — invisible over dark hero images (Home, Gallery hero). |

---

## Contact Page

| ID  | Status | Issue |
|-----|--------|-------|
| C-1 | [x] | **Social pills (Instagram, Facebook, WhatsApp) have no visible hover.** `hover:text-[#C9A84C]` and `hover:border-[#C9A84C]/50` are overridden by the global `a { transition: all }`. Pills feel flat — need a background fill on hover. |
| C-2 | [x] | **Contact detail cards (card-premium) bounce on hover.** Info cards with an address/phone should not lift like a CTA card. Hover should be subtler — border glow only, no translateY. |
| C-3 | [x] | **Fake map card-dark lifts on hover.** A decorative element should not have pointer interaction effects. |
| C-4 | [x] | **Form inputs: focus ring barely visible.** `focus:ring-[#C9A84C]/20` is near-invisible. Gold border appears but ring needs more opacity. |

---

## Home Page

| ID  | Status | Issue |
|-----|--------|-------|
| H-1 | [x] | **Floating stat card in hero is barely visible.** `bg-white/8` is nearly transparent; `text-[11px]` labels are too small. |
| H-2 | [x] | **Service preview cards: icon hover + card lift causes layout jitter.** Icon container `group-hover:bg-[#5B2D5E]` + card-premium translateY(-6px) together cause a stutter on tight grids. |
| H-3 | [x] | **Owner portrait cards give no signal they are clickable links.** No label, no "View Team" overlay, no cursor cue. Border appear on hover is too subtle for discoverability. |
| H-4 | [x] | **"Why Choose Us" number labels (01–06) too small and low contrast.** `text-xs text-[#C9A84C]` on dark background — needs larger size or higher opacity. |

---

## Services Page

| ID  | Status | Issue |
|-----|--------|-------|
| S-1 | [x] | **Sticky category tab indicator jumps on switch.** The active gold underline has no smooth transition — it snaps between tabs. |
| S-2 | [x] | **Flush service item rows have no visible hover state.** `card-flush` background diff (cream → slightly lighter cream) is imperceptible. No border or shadow cue on hover. |
| S-3 | [x] | **Featured category image has no fallback if URL fails to load.** No alt-text-driven placeholder or error state. |

---

## About Page

| ID  | Status | Issue |
|-----|--------|-------|
| A-1 | [x] | **Timeline dot markers disappear on mobile.** `w-3 h-3` gold dots sit on a vertical line that collapses on small screens — dots become unreachable. |
| A-2 | [x] | **Core values card icons (✦ ◆ ○ ✿) are static on hover.** Text character icons have no hover animation — feels inert compared to card lift. |
| A-3 | [x] | **Certifications list has no row-level hover.** Each `CheckCircle` row looks like a static list. Even a subtle background highlight per row on hover would help. |

---

## Team Page

| ID  | Status | Issue |
|-----|--------|-------|
| T-1 | [x] | **Owner flip cards give no hint they are interactive.** On mobile (touch only), there is no "click to flip" label, icon, or badge. Users won't know to tap. |
| T-2 | [x] | **Staff card image scale-on-hover may not clip correctly on Safari/Firefox.** Known issue: `overflow-hidden` + CSS `scale` transform can bleed outside the card boundary in some browsers. |
| T-3 | [x] | **Staff card "Book a Session" link has no hover state.** Only gap change on hover — needs underline or color transition to feel interactive. |

---

## Gallery Page

| ID  | Status | Issue |
|-----|--------|-------|
| G-1 | [x] | **Filter tab switch: items already in viewport stay invisible.** IntersectionObserver won't re-fire for items that never left the viewport — they remain at opacity:0 after a tab switch. |
| G-2 | [x] | **Lightbox close button is small and edge-overlapping on mobile.** Hard to tap; overlaps top-right corner of image. |
| G-3 | [x] | **Lightbox prev/next arrows show no disabled state at first/last image.** No visual feedback that you cannot go further. |

---

## Testimonials Page

| ID  | Status | Issue |
|-----|--------|-------|
| Te-1 | [x] | **Rating bar animation does not replay on re-visit.** Bars animate once on mount. Navigating away and back shows fully-filled bars with no animation. |
| Te-2 | [x] | **Quote icon on review cards is near-invisible.** `text-[#C9A84C]/20` opacity is too low — the icon is barely distinguishable from the card background. |

---

## Consultation Page

| ID  | Status | Issue |
|-----|--------|-------|
| Co-1 | [x] | **Unselected category cards do not dim after selection.** All 5 cards stay equally prominent — selection is unclear at a glance. Deselected cards should dim slightly. |
| Co-2 | [x] | **Calendar selected date uses shadcn default plum (`bg-primary`).** Clashes with gold theme — selected date should use gold or a coordinated accent. |
| Co-3 | [x] | **"Back" button on steps 2 & 3 has no visual weight.** Looks like plain text — needs a ghost border or subtle background to read as a button. |
| Co-4 | [x] | **Step dot connecting lines show on mobile even when labels are hidden.** Below `sm` breakpoint labels hide but lines remain, making the progress indicator look broken. |

---

## Summary

| Priority | Count | IDs |
|----------|-------|-----|
| Critical (visibility) | 2 | ~~N-1, N-2~~ ✅ |
| High (broken interaction) | 5 | C-1, C-2, C-3, G-1, Co-2 |
| Medium (missing feedback) | 11 | C-4, H-1, H-2, H-3, S-1, S-2, T-1, T-3, G-2, G-3, Co-1 |
| Low (polish) | 8 | H-4, A-1, A-2, A-3, T-2, Te-1, Te-2, Co-3, Co-4 |
