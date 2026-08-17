# DSphere 2026 — Frontend

This repository contains a Vite + React + Tailwind frontend for the DSphere 2026 event website. It is intended to be deployed as a static site (Vercel recommended).

Quick start

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
npm run preview
```

Notes

- Replace the placeholder Google Form URLs in `src/data/events.js`.
- The `Globe` component is intentionally lightweight; replace or enhance Three.js assets carefully to preserve performance on mobile.
- Deploy to Vercel by importing the repo and using the `npm run build` command.
