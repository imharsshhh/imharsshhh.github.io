# Harsh Moradiya Portfolio

A fast, responsive, and accessible static personal portfolio website built with semantic HTML5, modern CSS, and vanilla JavaScript.

## Features

- **Theme Toggle**: Dark mode by default with a warm earth/olive palette and light mode toggle, saved to `localStorage` (with FOUC prevention).
- **Modern Performance**: High-fidelity WebP illustrated assets with PNG fallbacks (~90% smaller payload size).
- **Responsive Navigation**: Mobile menu drawer with smooth toggle, outside-click close, and `Escape` key support.
- **Scroll Reveals**: Lightweight `IntersectionObserver` animations with `prefers-reduced-motion` accessibility support.
- **SEO & Social Sharing**: Complete OpenGraph, Twitter Card metadata, and embedded SVG favicon.

## Files

- `index.html` — Semantic HTML5 structure, metadata, and content
- `styles.css` — Modern CSS custom properties, responsive breakpoints, and animations
- `script.js` — Theme toggle, mobile navigation, and scroll effects
- `*.webp` / `*.png` — Illustrated vector-style portfolio assets

## Deploy on your domain

Upload **all files in this folder** to the root directory of any static hosting service (GitHub Pages, Vercel, Netlify, Cloudflare Pages, Firebase Hosting, Apache, or Nginx).

To test locally, run:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.
