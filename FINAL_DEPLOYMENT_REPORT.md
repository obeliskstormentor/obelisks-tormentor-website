==================================================
WEBSITE
==================================================

OBELISK'S TORMENTOR Official Website

==================================================
TECH STACK
==================================================

Framework:
React 19.2 + React Router 7 (client-side SPA)

Build system:
Vite 8.2 + TypeScript 6.0 (tsc -b && vite build)

Package manager:
npm (package-lock.json)

==================================================
GITHUB
==================================================

Repository:
https://github.com/obeliskstormentor/obelisks-tormentor-website (public)

Branch:
main

Latest commit:
39004f1 — "Fill in real domain for SEO metadata now that it's known"

==================================================
CLOUDFLARE
==================================================

Project:
obelisks-tormentor-website (Workers & Pages, Git-connected to the repo above)

Production deployment:
PASS

Deployment mechanism:
Cloudflare's unified Workers static-assets engine (confirmed via the
`/accounts/.../workers/scripts/...` API path in build logs). SPA routing is
handled by `wrangler.jsonc` (`assets.not_found_handling: "single-page-application"`),
not a classic `_redirects` file — Cloudflare's current validator rejects any
`_redirects` rule targeting `/index.html` with a 200 status as a false-positive
"infinite loop", regardless of source pattern (tried both a wildcard and an
explicit route list; both were rejected). The native Workers assets config was
the correct fix and required deleting `_redirects` entirely.

==================================================
LIVE URL
==================================================

https://obelisks-tormentor-website.obeliskstormentordc666.workers.dev

(No custom domain configured — using the default `*.workers.dev` subdomain,
which was NOT enabled by default and had to be turned on manually via
Settings → Domains → "Enable workers.dev subdomain" toggle.)

==================================================
TEST RESULTS
==================================================

Homepage: PASS
Music: PASS
Release pages: PASS (tested /music/glyph directly — full tracklist + credits render)
Lore: PASS
Band: PASS (member photos load correctly)
Media: PASS (verified in earlier local QA; not re-tested live in this pass — no code changed since)
Merch: PASS (verified in earlier local QA; not re-tested live in this pass — no code changed since)
Contact: PASS (email + all 4 social links verified with correct hrefs)
404: PASS — genuinely unmatched paths (e.g. /this-page-does-not-exist, /.env) correctly render the
  site's own styled 404 page with an HTTP 200, not Cloudflare's generic 404
Navigation: PASS
Mobile: PASS (375px width tested live — no horizontal overflow, hero/nav/type all correct)
Responsive: PASS (mobile confirmed live; desktop breakpoints verified in earlier local QA sessions
  during development — not re-tested live in this pass)
External links: PASS — Bandcamp link verified correct (https://obeliskstormentor.bandcamp.com);
  Spotify/YouTube/Instagram hrefs present and unchanged from source data (not each individually
  re-clicked live, but confirmed to match band/links.md exactly)
Audio: PASS — ambient toggle present in header; not re-tested for actual playback on the live
  domain in this pass (was verified locally during development)
Images: PASS — all images (covers, member photos, hero background, symbol) return HTTP 200 on the
  live domain
SEO: PASS — robots.txt and sitemap.xml both live and serving the correct absolute URLs; og:url and
  canonical tag confirmed live and pointing at the real domain
Accessibility: Not independently re-audited in this deployment pass (site was originally built with
  semantic HTML, focus-visible states, alt text, and prefers-reduced-motion support — unchanged by
  this deployment work)
Performance: PASS — total deployed asset size ~6.9MB, no build warnings, all images serve with
  proper caching (304s observed on repeat navigation)
Security: PASS — no .env/secrets in the repo (verified by grep before first commit); confirmed live
  that requesting /.env returns the site's own 404 page (200), not any real file content

==================================================
DEPLOYMENT STATUS
==================================================

PRODUCTION READY

- Production build succeeds (verified via clean `npm ci` + `npm run build`)
- GitHub repository is correct and up to date (main branch, 5 commits, working tree clean)
- Cloudflare deployment succeeds (latest build 39004f1: green checkmark)
- HTTPS works (default on the workers.dev domain)
- Homepage works
- Internal routes work, including a client-side dynamic route (/music/glyph) and a genuinely
  unknown path (correctly shows the app's own 404, not a platform-level one)
- Assets load (images, fonts, CSS, JS all verified 200 on the live domain)
- No console errors observed on the live homepage
- No secrets exposed
- Mobile site works (tested live at 375px)
- External links point to the correct real destinations

==================================================
KNOWN OPEN ITEMS (non-blocking)
==================================================

1. No custom domain attached yet — site is on the default `*.workers.dev` subdomain. Attaching a
   real domain (if the user owns one for the band) is a future step, not attempted here since it
   wasn't requested and would require DNS changes.
2. `public/images/logo.png` remains an unused, uncommitted-to-purpose asset in the repo (never
   referenced in code) — harmless, left untouched per the "don't change unrelated things" scope of
   this deployment task.
3. Audio playback, Media gallery/lightbox, Merch, and desktop-breakpoint responsiveness were
   validated during earlier local development QA but not individually re-clicked on the live domain
   in this deployment pass — no code affecting them changed between then and now, so risk is low,
   but flagging this explicitly rather than claiming a live re-test that didn't happen.
