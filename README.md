# Pipper Studio Workshop — Wallpaper studio

Drift is a self-contained wallpaper browsing experience designed for MacBook screens. It includes:

- A curated discover dashboard with a MacBook preview
- Generated wallpaper artwork with no image or build dependencies
- Search, category, and mood filters
- Favorite toggles and selected wallpaper preview
- A desktop-style “Apply wallpaper” confirmation
- Responsive layouts for smaller screens

## Run locally

Open [`index.html`](./index.html) in a browser. No install step or build tool is required.

The app is intentionally static so it can be wrapped in Electron, Tauri, or another native Mac shell later without changing the UI layer.

## Deploy to Vercel

From this folder, run:

```bash
npx vercel --prod
```

When prompted, log in with your Vercel account and accept the default project settings. Since this is a static app, no build command or framework preset is required.
