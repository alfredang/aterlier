# CLAUDE.md

Single-page luxury landing site "Atelier Interior Studio". Static frontend — **no build, no deps.** Open [index.html](index.html) or serve with any static server.

## Files

- [index.html](index.html) — markup, SEO meta + JSON-LD, inline favicon
- [style.css](style.css) — tokens, layout, both themes, keyframes
- [script.js](script.js) — vanilla JS, defer-loaded

External: Google Fonts (Fraunces + Manrope), Unsplash via URL params.

## Conventions

**CSS:** Design tokens in `:root` and `[data-theme="dark"]` at top — colours, fonts, type scale, spacing (`--s-1`..`--s-9`), easings. Mobile-first; breakpoints: 640/700/900/1100/1200px. Editorial luxury aesthetic — Fraunces display, Manrope body, hairline borders (`var(--hairline)`), bronze accent (`var(--bronze)`) used sparingly. Avoid shadows, rounded corners, filled cards. Paper grain on `body::before` — don't exceed z-index 999. `prefers-reduced-motion` handled at bottom.

**JS:** One IIFE with numbered self-contained sub-IIFEs (theme, navScroll, mobileMenu, smoothScroll, reveal, counters, portfolioFilter, lightbox, carousel, enquiry, backToTop, year). Add features as new sub-IIFEs; no frameworks. `$` = querySelector, `$$` returns array.

**Animation:** `[data-reveal]` = CSS, fires on load (hero), optional `data-delay`. `[data-animate]` = IntersectionObserver, fires once on scroll, optional `data-stagger="N"` sets `--stagger` for rippled siblings. Hero headline uses per-word `.word > span` with `wordRise` keyframes — editing headline requires updating both word spans and `nth-child` delays.

**Portfolio/lightbox:** `portfolioFilter` toggles `.is-hidden` (`display: none`). Lightbox `visibleTiles()` re-derives active set from DOM — keep in sync if filtering changes. Lightbox upgrades images by regex-rewriting Unsplash `w=NNN` → `w=1800`; new sources must preserve that URL shape.

## Gotchas

- **FormSubmit activation:** enquiry form POSTs to `https://formsubmit.co/ajax/angch@tertiaryinfotech.com` ([script.js](script.js) `ENDPOINT`). First submission triggers a one-time activation email; nothing delivers until clicked. Change recipient via `ENDPOINT` only.
- **WhatsApp number** `6596983731` in [index.html](index.html) (`wa.me/`). Country code, no `+`/spaces.
- **Floating labels** use `:placeholder-shown` — every input/textarea needs `placeholder=" "` (single space).
- **Nav colour:** white over hero, dark when scrolled (`.site-header.is-scrolled`). New nav items should use `currentColor`.
- **Theme** stored in `localStorage.atelier-theme`, falls back to `prefers-color-scheme`. Attribute on `<html>`, not `<body>`.

## Verification

No automated tests. Smoke test: scroll (reveals fire once, nav solidifies past 80px); toggle theme + reload (persists); ~375px (mobile menu, hamburger → X); portfolio filter + tile click (lightbox cycles filtered set; ←/→/Esc); submit form empty (errors) and valid (toast).
