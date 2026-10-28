# Shifty: Work Time & Shift Manager

A free, offline-capable web app (PWA) for tracking work shifts, breaks, overtime, pay periods and estimated earnings. All data stays on your device (browser storage). No account, no server.

## Features

- **Dashboard**: live shift timer, weekly / monthly / pay-period totals
- **Shifts**: editable shift templates (with default breaks added automatically to new shifts), one dropdown to pick and edit breaks, copy a shift to other days
- **Calendar**: monthly view with shifts, **events** and **tasks**; add them from the day panel
- **Reports**: pay-period summary, CSV export, print
- **Settings**: targets, companies and wages, backup / restore (shifts, settings, tasks and events)

## Deploy on GitHub Pages

1. Create a repository and upload **all** files in this folder to the repo root.
2. Go to **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.
3. Open `https://YOUR-USER.github.io/YOUR-REPO/`.
4. Check `https://YOUR-USER.github.io/YOUR-REPO/manifest.webmanifest` shows JSON, not a 404.

To install on a phone: open the site, then use **Add to Home Screen** (iOS Safari) or **Install app** (Chrome / Edge).

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app (code and styles bundled) |
| `manifest.webmanifest` | PWA install info |
| `sw.js` | Service worker for offline use |
| `icon-*.png`, `apple-touch-icon.png`, `Shifty_Logo.png` | Icons and logo |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Notes

Earnings are estimates only, not payroll. Back up your data regularly from **Settings → Download backup**.
