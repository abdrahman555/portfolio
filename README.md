# Cinematic Portfolio — Scaffold

This is a lightweight ultra-premium cinematic portfolio scaffold. It uses the six images you provided. Place your images into `assets/images/` with the following filenames:

- `hero.kjpg` — main fullscreen hero background (cinematic blur + glow)
- `story1.jpg` — about section image
- `story2.jpg` — featured story image
- `grid1.jpg` — gallery/grid image 1
- `grid2.jpg` — gallery/grid image 2
- `banner.jpg` — achievement / identity banner

Files created:
- `index.html` — main markup
- `styles.css` — styles (glassmorphism, neon, responsive)
- `app.js` — animations (GSAP) and lightbox

Preview locally:

1. Place the six images in `assets/images/` as listed above.
2. Start a simple static server in the project folder, for example using Python:

```bash
# Python 3
python -m http.server 8000

# then open http://localhost:8000
```

Notes & next steps:
- You can tune color grading by adjusting `styles.css` variables (`--accent`, `--accent2`).
- Replace the email link in the contact section.
- If you'd like, I can import your images for you and adjust color-grading automatically.
