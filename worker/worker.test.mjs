/**
 * End-to-end check of the listening-room Worker with fake KV and R2.
 *
 * There is no dev server in this environment, and the security-relevant paths
 * (wrong code, missing cookie, track not on your invite, expired invite) are
 * exactly the ones you cannot afford to find broken in production with
 * unreleased audio behind them.
 *
 *   npx esbuild worker/index.ts --bundle --format=esm --outfile=.cache/worker.mjs --platform=neutral
 *   node worker/worker.test.mjs
 */
import { readFileSync } from "node:fs"

const worker = (await import("../.cache/worker.mjs")).default

const AUDIO = readFileSync(new URL("../.cache/private-audio/new-fragment.mp3", import.meta.url))
const TRACK = "unreleased/new-fragment.mp3"
const OTHER = "unreleased/something-else.mp3"

function makeKV(seed = {}, blobs = {}) {
  const map = new Map(Object.entries(seed))
  const bin = new Map(Object.entries(blobs))
  return {
    async get(k, type) {
      if (type === "arrayBuffer") {
        const b = bin.get(k)
        return b ? b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) : null
      }
      return map.has(k) ? map.get(k) : null
    },
    async put(k, v) {
      map.set(k, v)
    },
    _map: map,
  }
}

// mirrors the shape of a real R2 object closely enough for this Worker
const R2 = {
  async get(key) {
    if (key !== TRACK) return null
    return {
      size: AUDIO.length,
      async arrayBuffer() {
        return AUDIO.buffer.slice(AUDIO.byteOffset, AUDIO.byteOffset + AUDIO.byteLength)
      },
    }
  },
}

const VALID = "TEST-CODE"
function env(overrides = {}) {
  return {
    ASSETS: { fetch: async () => new Response("static page", { status: 200 }) },
    PRIVATE_AUDIO: R2,
    INVITES: makeKV({
      [`invite:${VALID}`]: JSON.stringify({
        name: "Test Label",
        expires: Date.now() + 86400000,
        tracks: [TRACK],
      }),
      "invite:EXPIRED-1": JSON.stringify({
        name: "Old", expires: Date.now() - 1000, tracks: [TRACK],
      }),
      "invite:NOTYOURS": JSON.stringify({
        name: "Other", expires: Date.now() + 86400000, tracks: [OTHER],
      }),
    }, { [`audio:${TRACK}`]: AUDIO }),
    SESSION_SECRET: "test-secret-value",
    ...overrides,
  }
}

const post = (path, body) =>
  new Request(`https://x.test${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

let pass = 0
let fail = 0
function check(name, cond, extra = "") {
  if (cond) {
    pass++
    console.log(`  ok    ${name}`)
  } else {
    fail++
    console.log(`  FAIL  ${name} ${extra}`)
  }
}

async function openSession(e, code) {
  const res = await worker.fetch(post("/api/listening/session", { code }), e)
  const cookie = (res.headers.get("Set-Cookie") || "").split(";")[0]
  return { res, cookie }
}

console.log("\nlistening room")

// --- the public site must keep working regardless -------------------------
{
  const e = env()
  const res = await worker.fetch(new Request("https://x.test/merch"), e)
  check("public pages still served", res.status === 200)
}
{
  const e = env({ INVITES: undefined, PRIVATE_AUDIO: undefined, SESSION_SECRET: undefined })
  const site = await worker.fetch(new Request("https://x.test/"), e)
  const api = await worker.fetch(post("/api/listening/session", { code: VALID }), e)
  check("site survives with bindings missing", site.status === 200)
  check("listening returns 503 when unconfigured", api.status === 503, `got ${api.status}`)
}

// --- the gate -------------------------------------------------------------
{
  const e = env()
  const bad = await worker.fetch(post("/api/listening/session", { code: "WRONG-ONE" }), e)
  check("wrong code rejected", bad.status === 401, `got ${bad.status}`)

  const malformed = await worker.fetch(post("/api/listening/session", { code: "x" }), e)
  check("malformed code rejected", malformed.status === 400, `got ${malformed.status}`)

  const expired = await worker.fetch(post("/api/listening/session", { code: "EXPIRED-1" }), e)
  check("expired invite rejected", expired.status === 401, `got ${expired.status}`)

  const { res, cookie } = await openSession(e, VALID)
  const body = await res.json()
  check("valid code accepted", res.status === 200)
  check("session cookie is HttpOnly + Secure + SameSite", /HttpOnly/.test(res.headers.get("Set-Cookie")) && /Secure/.test(res.headers.get("Set-Cookie")) && /SameSite=Strict/.test(res.headers.get("Set-Cookie")))
  check("invitee name returned", body.name === "Test Label")
  check("track title derived from filename", body.tracks[0]?.title === "new fragment", JSON.stringify(body.tracks))
  check("cookie issued", cookie.startsWith("otl_session="))

  const rec = JSON.parse(await e.INVITES.get(`invite:${VALID}`))
  check("access is logged against the invite", rec.hits === 1 && typeof rec.lastSeen === "number", JSON.stringify(rec))
}

// --- streaming ------------------------------------------------------------
{
  const e = env()
  const { cookie } = await openSession(e, VALID)
  const withCookie = (extra = {}) =>
    new Request(`https://x.test/api/listening/stream/${encodeURIComponent(TRACK)}`, {
      headers: { Cookie: cookie, ...extra },
    })

  const anon = await worker.fetch(
    new Request(`https://x.test/api/listening/stream/${encodeURIComponent(TRACK)}`), e)
  check("audio refused without a session", anon.status === 401, `got ${anon.status}`)

  const ok = await worker.fetch(withCookie(), e)
  const bytes = new Uint8Array(await ok.arrayBuffer())
  check("audio served with a session", ok.status === 200, `got ${ok.status}`)
  check("full file returned", bytes.length === AUDIO.length, `${bytes.length} vs ${AUDIO.length}`)
  check("content type is audio", ok.headers.get("Content-Type") === "audio/mpeg")
  check("marked no-store", /no-store/.test(ok.headers.get("Cache-Control") || ""))
  check("marked noindex", /noindex/.test(ok.headers.get("X-Robots-Tag") || ""))

  const ranged = await worker.fetch(withCookie({ Range: "bytes=100-199" }), e)
  const rb = new Uint8Array(await ranged.arrayBuffer())
  check("range request honoured (seeking works)", ranged.status === 206, `got ${ranged.status}`)
  check("range length correct", rb.length === 100, `${rb.length}`)
  check("content-range header set", ranged.headers.get("Content-Range") === `bytes 100-199/${AUDIO.length}`, ranged.headers.get("Content-Range"))

  // a session for an invite that does not include this track
  const other = await openSession(e, "NOTYOURS")
  const forbidden = await worker.fetch(
    new Request(`https://x.test/api/listening/stream/${encodeURIComponent(TRACK)}`,
      { headers: { Cookie: other.cookie } }), e)
  check("cannot reach a track not on your invite", forbidden.status === 403, `got ${forbidden.status}`)

  // forged cookie
  const forged = await worker.fetch(
    new Request(`https://x.test/api/listening/stream/${encodeURIComponent(TRACK)}`,
      { headers: { Cookie: `otl_session=${VALID}.${Date.now() + 1e6}.deadbeef` } }), e)
  check("forged cookie rejected", forged.status === 401, `got ${forged.status}`)
}

// --- KV-only backend: the configuration actually deployed ------------------
{
  const e = env({ PRIVATE_AUDIO: undefined })
  const { res, cookie } = await openSession(e, VALID)
  check("session opens without R2", res.status === 200, `got ${res.status}`)

  const url = `https://x.test/api/listening/stream/${encodeURIComponent(TRACK)}`
  const ok = await worker.fetch(new Request(url, { headers: { Cookie: cookie } }), e)
  const bytes = new Uint8Array(await ok.arrayBuffer())
  check("audio served from KV", ok.status === 200, `got ${ok.status}`)
  check("KV file intact", bytes.length === AUDIO.length && bytes[0] === AUDIO[0] && bytes[bytes.length - 1] === AUDIO[AUDIO.length - 1])

  const ranged = await worker.fetch(
    new Request(url, { headers: { Cookie: cookie, Range: "bytes=1000-1999" } }), e)
  const rb = new Uint8Array(await ranged.arrayBuffer())
  check("KV range sliced correctly", ranged.status === 206 && rb.length === 1000, `${ranged.status} ${rb.length}`)
  check("KV range bytes match the source", rb.every((b, i) => b === AUDIO[1000 + i]))

  const open = await worker.fetch(
    new Request(url, { headers: { Cookie: cookie, Range: "bytes=2000-" } }), e)
  check("open-ended range works", open.status === 206 && open.headers.get("Content-Range") === `bytes 2000-${AUDIO.length - 1}/${AUDIO.length}`, open.headers.get("Content-Range"))

  const bad = await worker.fetch(
    new Request(url, { headers: { Cookie: cookie, Range: `bytes=${AUDIO.length + 50}-` } }), e)
  check("out-of-bounds range rejected with 416", bad.status === 416, `got ${bad.status}`)

  const missing = await worker.fetch(
    new Request(`https://x.test/api/listening/stream/${encodeURIComponent(OTHER)}`,
      { headers: { Cookie: cookie } }), e)
  check("unknown track still 403 (not on invite)", missing.status === 403, `got ${missing.status}`)
}

// --- brute force ----------------------------------------------------------
{
  const e = env()
  let throttled = false
  for (let i = 0; i < 20; i++) {
    const r = await worker.fetch(
      new Request("https://x.test/api/listening/session", {
        method: "POST",
        headers: { "Content-Type": "application/json", "CF-Connecting-IP": "1.2.3.4" },
        body: JSON.stringify({ code: `GUESS-${i}` }),
      }), e)
    if (r.status === 429) { throttled = true; break }
  }
  check("brute force gets throttled", throttled)
}

console.log(`\n${pass} passed, ${fail} failed\n`)
process.exit(fail ? 1 : 0)
