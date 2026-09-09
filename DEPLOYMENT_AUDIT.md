# DEPLOYMENT_AUDIT — OBELISK'S TORMENTOR Official Website

Date: 2026-09-09
Scope: `website/future/` (the site itself). Nothing outside this folder is part of the deployable
project.

## 1. Framework & Build System

- **Framework:** React 19.2 + React Router 7 (client-side SPA routing, `BrowserRouter`)
- **Build tool:** Vite 8.2
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no separate PostCSS config needed)
- **Language:** TypeScript 6.0 (strict, project-references split: `tsconfig.app.json` / `tsconfig.node.json`)
- **Package manager:** **npm** (confirmed by `package-lock.json` — no yarn.lock/pnpm-lock.yaml present)
- **Linter:** oxlint

## 2. Build Command & Output

- **Install:** `npm ci` (verified clean install from lockfile — 61 packages, 0 vulnerabilities)
- **Build command:** `npm run build` → runs `tsc -b && vite build`
- **Output directory:** `dist/` (Vite default — confirmed by actual build output, not assumed)
- **Verified:** clean `npm ci` + `npm run build` succeeds with no errors, no warnings that block the
  build. Output: `dist/index.html`, `dist/assets/*.{js,css}`, plus all `public/` files copied as-is
  (`images/`, `audio/`, `robots.txt`, `sitemap.xml`). Total `dist/` size: **6.9MB** — well within
  Cloudflare Pages limits (25MB per file, no problematic total-size constraint at this scale).

## 3. Routing System

React Router `BrowserRouter` — **fully client-side routing**. Routes: `/`, `/music`,
`/music/:id`, `/lore`, `/band`, `/media`, `/merch`, `/contact`, plus a catch-all 404.

**Critical deployment requirement:** since this is a pure SPA with no server-side routes, a direct
request to e.g. `/music` or `/band` has no matching physical file — the host must fall back to
serving `index.html` for any unmatched path so React Router can take over client-side. **This file
did not exist and has been added** (see §7, Fix 1).

## 4. Environment Variables

**None required.** Grepped `src/` and `index.html` for API keys / secrets / tokens — nothing found.
The site is fully static: no backend calls, no build-time environment variables, no `.env` file
present or needed. No `.env.example` is necessary.

## 5. External Dependencies at Runtime

None beyond the two Google Fonts loaded via `<link>` in `index.html` (`fonts.googleapis.com` /
`fonts.gstatic.com` — Cinzel, EB Garamond). No third-party JS SDKs, no analytics, no API calls. This
confirms the site is appropriate for a purely static host like Cloudflare Pages.

## 6. Node.js Version Requirement

`vite@8` declares `engines.node: "^20.19.0 || >=22.12.0"`. Cloudflare Pages' default build image may
not match this. **Risk:** build could fail on Cloudflare if it defaults to an older Node version.
**Fix applied:** added `.node-version` (see §7, Fix 2) — Cloudflare Pages reads this file
automatically. As a backup, set the `NODE_VERSION` environment variable to `22` in the Cloudflare
Pages project settings if the `.node-version` file is not picked up.

## 7. Fixes Applied (deployment-necessary only — nothing visual/content changed)

1. **Added `public/_redirects`** with `/* /index.html 200` — required for Cloudflare Pages to serve
   the SPA correctly on any nested route (`/music`, `/band`, etc.) instead of a raw 404.
2. **Added `.node-version`** pinning Node `22.12.0` — matches Vite 8's minimum supported range.

No other files were changed. No visual identity, copy, lore, artwork, logo, release data, or social
links were touched, per instruction.

## 8. Assets Review

All files under `public/` are required by the live site and are correctly included in the build
output — verified via `dist/` listing above. One asset, `public/images/logo.png` (1.1MB), is **not
currently referenced anywhere in the code** (the site uses `symbol.png` instead) — it is dead weight
but harmless; left untouched since removing it is a content/asset decision, not a deployment
necessity.

Largest assets: `audio/ambience.mp3` (3.7MB), `images/logo.png` (1.1MB, unused), `images/symbol.png`
(622KB). None are close to Cloudflare's 25MB per-file limit.

## 9. Git Status

**No Git repository exists yet** — neither at `website/future/` nor at any parent directory. This is
a from-scratch `git init`, not a pre-existing history to preserve. `.gitignore` already present and
correct: excludes `node_modules/`, `dist/`, logs, editor/OS files. It does **not** exclude anything
under `public/` or `src/` — confirmed no required assets would be accidentally ignored.

## 10. Security Review

- No `.env` files, no secrets, no API keys, no tokens found anywhere in `src/`, `index.html`, or
  config files (grepped explicitly).
- `band.contactEmail` (a public contact address, intentionally displayed on the Contact page) is the
  only "sensitive-looking" string in the codebase — this is intended public content, not a secret.
- Nothing in this project touches GitHub or Cloudflare credentials; none should ever be committed.

## 11. Cloudflare Pages Compatibility

**Compatible, no blockers.** Recommended project configuration:

| Setting | Value |
|---|---|
| Framework preset | Vite (or "None" with manual config below) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `website/future` (if the whole `obelisk-tormentor` folder is the repo root — see §12) |
| Production branch | `main` |
| Environment variables | none required |
| Node version | 22 (via `.node-version`, already added — or set `NODE_VERSION=22` manually if needed) |

## 12. Recommended Repository Scope

**Recommendation:** initialize the Git repository at `website/future/` itself (not the whole
`obelisk-tormentor` project folder), since that folder is the actual deployable unit — it has its
own `package.json`, `.gitignore`, and build output. The parent `obelisk-tormentor/` folder contains
unrelated material (private release masters/WAV files, Bandcamp credentials-adjacent notes, band
internal docs) that must **never** be pushed to a public GitHub repo. Keeping the website as its own
repo avoids that risk entirely rather than relying on `.gitignore` to exclude it correctly.

## 13. Deployment Risks Summary

| Risk | Severity | Status |
|---|---|---|
| Missing SPA fallback (`_redirects`) | High — nested routes would 404 | **Fixed** |
| Node version mismatch on Cloudflare | Medium — build could fail | **Fixed** (`.node-version`) |
| Secrets/env exposure | None found | N/A |
| Unused asset (`logo.png`) | Cosmetic only, no deployment impact | Not fixed (out of scope) |
| `sitemap.xml` has placeholder domain | Low — cosmetic SEO issue | **Open** — needs the real deployed URL, which isn't known until after Phase 9-11. Will fix once the live URL is confirmed. |
| No existing Git repo | N/A | Will `git init` fresh, no history at risk |

## Status: No critical blockers. Proceeding to Phase 2 (already verified above) and Phase 4 (Git).
