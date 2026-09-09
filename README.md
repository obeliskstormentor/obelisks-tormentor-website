# OBELISK'S TORMENTOR — Official Website

React + TypeScript + Vite + Tailwind CSS v4.

## Run

```bash
npm install
npm run dev      # dev server
npm run build    # production build (tsc + vite build)
npm run lint     # oxlint
```

## Data

`src/data/band.ts` and `src/data/releases.ts` mirror the canonical files in the
parent project (`../../../band/*.md` and `../../../releases/*/release.yaml`).
They are hand-synced, not auto-generated — update both places if release info
changes.

## Known TODOs (do not fill with invented content)

- No short audio preview clips exist yet (`Track.previewClip` stays undefined
  until real ones are generated from the masters — never ship the private
  WAV files here).
- No individual member photos/bios/last names.
- `public/sitemap.xml` has a placeholder domain — replace once the site is
  deployed.
- Album 2 is intentionally absent from all data files — do not add it until
  the user confirms it has actually been publicly released.
- Merch page is a placeholder ("Artifacts") — no products exist yet.

## Notes for future development

- `Reveal.tsx` fades sections in via `IntersectionObserver` with a 1.2s
  timeout fallback (never leaves content permanently invisible if the
  observer doesn't fire for any reason).
- Colors/fonts are defined as Tailwind v4 `@theme` tokens in `src/index.css`.
- All images live in `public/images/` — resized/compressed copies of the
  originals in the parent project's `assets/`/`releases/` folders; the
  originals are untouched.
