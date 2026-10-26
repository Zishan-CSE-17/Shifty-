# Shifty

A mobile-friendly shift planner and work-time calculator. This repository is ready to publish with GitHub Pages.

## Features
- Shift calendar, shift templates, break tracking, reports and settings
- Installable progressive web app (PWA)
- Add personal tasks and events from the Calendar page
- Calendar items saved locally in the current browser/device
- Quick preset-break dropdown in the shift editor
- Responsive UI polish for desktop and mobile

## Preview locally
Because the app registers a service worker, use a local web server instead of opening `index.html` directly.

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Publish with GitHub Pages
1. Create a GitHub repository and upload all files in this folder to its root.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site.

The app is static and requires no build step. Tasks and events are stored in browser `localStorage`; they do not sync between devices and are not included in the existing shift backup yet. Download a copy of the repository before replacing a live deployment.
