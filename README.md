# Atelier

A single-page luxury interior design landing site — pure HTML, CSS, and vanilla JavaScript. No build step, no dependencies.

## Quick start

Open `index.html` directly in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Stack

- HTML5 (semantic, SEO meta, JSON-LD)
- CSS (design tokens, light + dark themes, mobile-first)
- Vanilla JS (IIFE modules, no frameworks)
- Google Fonts: Fraunces + Manrope
- Unsplash for placeholder imagery
- FormSubmit for enquiry handling

## Features

- Sticky transparent navbar
- Hero with word-by-word reveal animation
- Filterable portfolio grid with keyboard-navigable lightbox
- Animated stat counters
- Testimonial carousel (auto-advance + hover pause)
- Enquiry form with validation + FormSubmit integration
- Light / dark theme toggle (persisted)
- Floating WhatsApp button
- Back-to-top button
- Fully responsive
- Respects `prefers-reduced-motion`

See [CLAUDE.md](CLAUDE.md) for architecture notes.
