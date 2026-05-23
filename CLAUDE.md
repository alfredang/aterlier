# CLAUDE.md

Single-page Oriental Zen interior studio site "SUI·AN 翠庵" (emerald hermitage). Static frontend — **no build, no deps.** Open [index.html](index.html) or serve with any static server.

## Files

- [index.html](index.html) — markup, SEO meta + JSON-LD, inline favicon (kanji 翠)
- [style.css](style.css) — tokens, layout, both themes, keyframes
- [script.js](script.js) — vanilla JS, defer-loaded

External: Google Fonts (Shippori Mincho + Noto Sans JP + Klee One), Unsplash via URL params.

## Conventions

**CSS:** Design tokens in `:root` and `[data-theme="dark"]` at top — colours, fonts, type scale, spacing (`--s-1`..`--s-9`), easings. Mobile-first; breakpoints: 640/700/900/1100/1200px. Oriental Zen aesthetic — Shippori Mincho display, Noto Sans JP body, hairline borders (`var(--hairline)`), matcha-green primary accent (`var(--matcha)`), asagi sky-blue secondary accent (`var(--asagi)`). Paper/rice surfaces dominate; green leads on primary actions/focus rings, sky blue leads on services + testimonials sections. Lacquer accents (`--cinnabar`, `--gold-leaf`) appear at most once per page — the cinnabar seal in footer, the kintsugi gold seam in the about section. Avoid shadows, rounded corners (except circular pills/avatars), filled cards. Washi paper grain on `body::before` — don't exceed z-index 999. `prefers-reduced-motion` handled at bottom.

Legacy token aliases (`--cream`, `--ivory`, `--bone`, `--graphite`, `--bronze`, `--bronze-dk`) are kept pointing at the new Zen tokens so any code reusing the old names still resolves.

**JS:** One IIFE with numbered self-contained sub-IIFEs (theme, navScroll, mobileMenu, smoothScroll, reveal, counters, portfolioFilter, lightbox, carousel, enquiry, backToTop, year). Add features as new sub-IIFEs; no frameworks. `$` = querySelector, `$$` returns array. `localStorage` key is `atelier-theme` (unchanged for back-compat with existing visitors).

**Animation:** `[data-reveal]` = CSS, fires on load (hero), optional `data-delay`. `[data-animate]` = IntersectionObserver, fires once on scroll, optional `data-stagger="N"` sets `--stagger` for rippled siblings. Hero headline uses per-word `.word > span` with `wordRise` keyframes — editing headline requires updating both word spans and `nth-child` delays. SVG reveals (`.brush-stroke`, `.enso`) use `stroke-dasharray` countdowns; the enso joins `[data-animate]` and reveals on scroll, the brush-stroke fires on load with the hero.

**Portfolio/lightbox:** `portfolioFilter` toggles `.is-hidden` (`display: none`). Lightbox `visibleTiles()` re-derives active set from DOM — keep in sync if filtering changes. Lightbox upgrades images by regex-rewriting Unsplash `w=NNN` → `w=1800`; new sources must preserve that URL shape.

**Zen motifs (each used ONCE per page):**
- `.brush-stroke` SVG under hero headline
- `.enso` open circle in about section
- `.kintsugi` diagonal gold-leaf hairline in about section (only `--gold-leaf` usage)
- `.seal` cinnabar square with kanji in footer (only `--cinnabar` usage)
- `.kanji-rail` vertical kanji column on hero left edge (hidden ≤900px)

## Gotchas

- **FormSubmit activation:** enquiry form POSTs to `https://formsubmit.co/ajax/angch@tertiaryinfotech.com` ([script.js](script.js) `ENDPOINT`). First submission triggers a one-time activation email; nothing delivers until clicked. Change recipient via `ENDPOINT` only — the displayed email `studio@suian.example.com` is a brand placeholder, unrelated to the form delivery address.
- **WhatsApp number** `6596983731` in [index.html](index.html) (`wa.me/`). Country code, no `+`/spaces.
- **Floating labels** use `:placeholder-shown` — every input/textarea needs `placeholder=" "` (single space).
- **Nav colour:** white over hero, dark when scrolled (`.site-header.is-scrolled`). New nav items should use `currentColor`.
- **Theme** stored in `localStorage.atelier-theme`, falls back to `prefers-color-scheme`. Attribute on `<html>`, not `<body>`.
- **Single-use motif rule:** if you add a second cinnabar, kintsugi, or enso instance, the design loses its disciplined quietness. Reach for green or sky blue first; reserve red and gold for one rare moment each.

## Verification

No automated tests. Smoke test: scroll (reveals fire once, nav solidifies past 80px, enso draws as you enter about section); toggle theme + reload (persists); ~375px (mobile menu, hamburger → X, kanji rail hidden); portfolio filter + tile click (lightbox cycles filtered set; ←/→/Esc); submit form empty (errors in cinnabar) and valid (toast in sumi). Hero brush-stroke should draw in ~2.2s after load; the kintsugi gold seam should appear as a diagonal hairline near the top of the about section.
