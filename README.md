<div align="center">

# Atelier — Luxury Interior Design

[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Custom_Properties-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla_ES2020-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![No Build](https://img.shields.io/badge/Build-None-22C55E)](#quick-start)
[![Zero Deps](https://img.shields.io/badge/Dependencies-0-22C55E)](#quick-start)
[![Google Fonts](https://img.shields.io/badge/Fonts-Fraunces_%2B_Manrope-4285F4?logo=googlefonts&logoColor=white)](https://fonts.google.com/)
[![FormSubmit](https://img.shields.io/badge/Forms-FormSubmit-7C3AED)](https://formsubmit.co/)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile_First-22D3EE)](#features)
[![A11y](https://img.shields.io/badge/A11y-Keyboard_%2B_Reduced_Motion-0EA5E9)](#features)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![Live Demo](https://img.shields.io/badge/Live_Demo-alfredang.github.io%2Faterlier-22D3EE?logo=github&logoColor=white)](https://alfredang.github.io/aterlier/)
[![Deploy](https://github.com/alfredang/aterlier/actions/workflows/deploy.yml/badge.svg)](https://github.com/alfredang/aterlier/actions/workflows/deploy.yml)

**A single-page luxury interior design landing site — editorial typography, warm neutral palette, hand-built motion, FormSubmit-powered enquiries. Pure HTML, CSS, and vanilla JavaScript. No framework, no build step, no dependencies.**

🌐 **Live demo:** [https://alfredang.github.io/aterlier/](https://alfredang.github.io/aterlier/)

![Atelier hero screenshot](screenshot.png)

</div>

## About

Atelier is a production-grade marketing landing page for a boutique interior design studio. Every section is engineered for **first-impression conversion**: a full-bleed hero with a word-by-word reveal, a numbered editorial structure (01–05) borrowed from print monographs, a filterable portfolio with a keyboard-navigable lightbox, an auto-playing testimonial carousel, animated stat counters, and an enquiry form that delivers leads straight to your inbox via FormSubmit — all without a build pipeline.

The aesthetic is committed: **Fraunces** (variable serif with optical sizing) paired with **Manrope** (modern geometric sans), a warm cream / ivory / bronze palette, hairline rules instead of boxes, a subtle SVG paper-grain overlay, and a single accent colour used sparingly. The result reads like Architectural Digest, not a template.

Built to be **dropped on any static host** (GitHub Pages, Netlify, Cloudflare Pages, S3, a USB stick) — open `index.html` and it works.

## Features

### Design system
- **Editorial luxury aesthetic** — Fraunces display + Manrope body, variable-font optical sizing, tight letter-spacing on display, wide tracking on eyebrow labels
- **Two themes** — light (warm cream) and dark (deep brown-black), toggled and persisted via `localStorage`, falls back to `prefers-color-scheme`
- **Design tokens** — every colour, font, spacing step (`--s-1`..`--s-9`), easing and breakpoint flows from CSS custom properties in `:root`
- **Paper grain overlay** — fixed inline SVG noise on `body::before` for subtle texture
- **Mobile-first responsive** — fluid type via `clamp()`, no media-query soup; breakpoints at 640 / 700 / 900 / 1100 / 1200px

### Motion
- **Hero headline reveal** — word-by-word `transform: translateY(120%)` with staggered keyframe delays
- **Scroll-triggered fade + rise** — IntersectionObserver-driven, fires once per element, `data-stagger` ripples siblings
- **Animated stat counters** — `requestAnimationFrame` easeOut from 0 → target, runs once on scroll-into-view
- **Ken Burns hero zoom** — subtle 18s background scale
- **`prefers-reduced-motion: reduce`** is respected in both CSS and JS — animations soften, counters snap to final value

### Sections
- **Sticky transparent navbar** — solidifies past 80px scroll with backdrop blur; mobile hamburger opens a full-screen overlay menu
- **Hero** — full-viewport background image with dark gradient overlay, eyebrow + oversized serif headline + dual CTAs + meta footer
- **About + Stats** — split layout, founder signature, four animated counters
- **Services** — 4-card grid with custom inline SVG line icons (chair, building, blueprint, hammer)
- **Portfolio** — masonry-style grid with editorial row spans, 5 filter chips (All / Living Room / Bedroom / Office / Kitchen)
- **Testimonials** — JS carousel, auto-advance every 7s, pauses on hover and tab-hide, dot + arrow controls
- **Enquiry form** — floating-label underline-only inputs, client-side validation, loading state, toast notifications
- **Footer** — three columns, social icons, copyright with auto-updating year
- **Floating WhatsApp button** with first-load pulse
- **Back-to-top button** that appears past 600px
- **Lightbox modal** — keyboard nav (←/→/Esc), click-outside-to-close, focus restoration, cycles only the currently-filtered tiles

### SEO + standards
- Per-page `<title>`, `meta description`, canonical URL
- Open Graph + Twitter Card meta
- **JSON-LD** `InteriorDesignBusiness` schema with full `PostalAddress`
- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`)
- Inline SVG favicon (no extra HTTP request)
- Skip-link for keyboard users
- Lazy-loaded portfolio imagery (`loading="lazy"`)

### Lead capture
- **FormSubmit integration** — `fetch()` POST with JSON body, no backend required
- Hidden honeypot field (`_honey`) to silently drop bot submissions
- `_subject` + `_template=table` for clean, formatted lead emails
- Inline per-field validation (name, email regex, optional phone format, message length)
- Success / error toast notifications
- One-time activation email from FormSubmit on first send (industry-standard)

## Tech Stack

| Layer | Choice |
|-------|--------|
| **Markup** | HTML5 — semantic, SEO meta, JSON-LD `InteriorDesignBusiness` |
| **Styling** | CSS3 — custom properties, `clamp()` fluid type, mobile-first |
| **Behaviour** | Vanilla JavaScript (ES2020) — IIFE-per-concern, IntersectionObserver, `fetch` |
| **Type** | [Fraunces](https://fonts.google.com/specimen/Fraunces) (variable, opt-sz) + [Manrope](https://fonts.google.com/specimen/Manrope) |
| **Imagery** | Unsplash via URL params — no API key, no rate-limit signup |
| **Forms** | [FormSubmit](https://formsubmit.co/) — no backend, no server, no SMTP config |
| **Build** | None |
| **Bundler** | None |
| **Runtime** | Any modern browser (Chrome / Edge / Safari / Firefox) |

## Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                          index.html                                │
│   <head>  SEO meta · OG · Twitter · JSON-LD · Fraunces+Manrope     │
│   <body>  Nav · Hero · About+Stats · Services · Portfolio          │
│           Testimonials · Enquiry · Footer · WhatsApp · Lightbox    │
└────────────┬──────────────────────────────────┬────────────────────┘
             │                                  │
   ┌─────────▼──────────┐            ┌──────────▼──────────────────┐
   │      style.css     │            │         script.js           │
   │  Tokens · Themes   │            │   theme · navScroll · menu  │
   │  Layout · Motion   │            │   reveal · counters · filter│
   │  Reduced-motion    │            │   lightbox · carousel · form│
   └────────────────────┘            └──────────┬──────────────────┘
                                                │
                                  ┌─────────────▼──────────────┐
                                  │  https://formsubmit.co/    │
                                  │  ajax/<recipient-email>    │
                                  └────────────────────────────┘
```

## Quick Start

### Prerequisites

A modern browser. That's it.

### Run locally

Either double-click `index.html`, or serve the folder so `fetch()` and OG previews behave naturally:

```bash
# Python 3
python -m http.server 8000

# Node (any of)
npx serve .
npx http-server .

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`.

### Deploy

Drop the three files (plus `README.md`) onto any static host:

| Host | How |
|------|-----|
| **GitHub Pages** | Push to `main`, Settings → Pages → branch `main` / root |
| **Netlify** | Drag-and-drop the folder onto [app.netlify.com/drop](https://app.netlify.com/drop) |
| **Cloudflare Pages** | Connect repo, no build command, output `/` |
| **Vercel** | `vercel --prod` from the folder |
| **S3 + CloudFront** | `aws s3 sync . s3://bucket --exclude ".git/*"` |

## Configuration

Everything you'd reasonably want to change is in a single, obvious place.

| Change | Where |
|--------|-------|
| **Lead recipient email** | `script.js` → `ENDPOINT` constant (`https://formsubmit.co/ajax/<email>`) |
| **WhatsApp number** | `index.html` → `<a class="wa-float" href="https://wa.me/<number>">` — country code, no `+`/spaces |
| **Brand name** | `index.html` → `.brand-word` (4 occurrences: nav, mobile menu, footer) |
| **Studio address / phone / hours** | `index.html` → `.contact-list` + JSON-LD block in `<head>` |
| **Colour palette + fonts** | `style.css` → `:root` design tokens at the top |
| **Hero headline** | `index.html` → `.hero-title .word` spans (update `nth-child` delays in CSS if word count changes) |
| **Portfolio projects** | `index.html` → `#portfolioGrid .tile` figures |
| **Testimonials** | `index.html` → `#carouselTrack .quote` items |
| **Services** | `index.html` → `.service-card` articles |

> **First-send activation.** FormSubmit will email a one-time confirmation link to the recipient address on the very first form submission. Click it once and all future submissions deliver silently.

## File Layout

```
.
├── index.html      Markup · SEO meta · JSON-LD · inline favicon
├── style.css       Design tokens · layout · both themes · keyframes
├── script.js       Vanilla JS · IIFE-per-concern · defer-loaded
├── CLAUDE.md       Architecture notes for AI agents
└── README.md       This file
```

## Browser Support

Modern evergreen browsers — Chrome, Edge, Firefox, Safari. Uses:
- CSS custom properties + `clamp()` + `color-mix()`
- IntersectionObserver
- `fetch` + `async/await`
- `localStorage`
- `backdrop-filter` (graceful degrades on Firefox without it)

## Accessibility

- Skip-link to main content
- Semantic landmarks
- ARIA labels on icon-only buttons
- `aria-live` on the toast
- Full keyboard nav in the lightbox (←/→/Esc, focus trap on close)
- Visible focus rings via `:focus-visible`
- Honours `prefers-reduced-motion: reduce`
- Honours `prefers-color-scheme` on first visit

## License

MIT.
