/**
 * Private listening room.
 *
 * The site is otherwise a pure static-asset Worker, which means anything under
 * dist/ is fetchable by anyone who guesses the URL. Unreleased audio therefore
 * never goes there: it lives in a private R2 bucket and only ever reaches the
 * browser through this Worker, after an invite code has been checked.
 *
 * What this does and does not buy you:
 *   - it keeps the files off the open web and off search engines
 *   - every play is attributed to one invite code, so a leak has a name on it
 *   - it cannot stop a listener recording their own speakers. Nothing can.
 *     Attribution is the real deterrent, not prevention.
 */

interface Env {
  ASSETS: Fetcher
  // Optional on purpose. This Worker fronts the entire site, so if the R2 and
  // KV bindings are not set up yet it must still serve every public page
  // normally and fail only the listening endpoints. A hard dependency here
  // would take the whole site down until the bindings exist.
  PRIVATE_AUDIO?: R2Bucket
  INVITES?: KVNamespace
  SESSION_SECRET?: string
}

function configured(env: Env) {
  return Boolean(env.INVITES && env.PRIVATE_AUDIO && env.SESSION_SECRET)
}

interface Invite {
  name: string
  /** ms epoch; the invite stops working after this */
  expires: number
  /** R2 object keys this person may hear */
  tracks: string[]
  hits?: number
  lastSeen?: number
}

const COOKIE = "otl_session"
const SESSION_TTL_MS = 6 * 60 * 60 * 1000 // 6 h, well short of the invite window

// ---------------------------------------------------------------- helpers
const enc = new TextEncoder()

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  )
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data))
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

async function signSession(secret: string, code: string, exp: number) {
  const body = `${code}.${exp}`
  return `${body}.${await hmac(secret, body)}`
}

async function readSession(secret: string, token: string | null) {
  if (!token) return null
  const parts = token.split(".")
  if (parts.length !== 3) return null
  const [code, expRaw, sig] = parts
  const exp = Number(expRaw)
  if (!Number.isFinite(exp) || Date.now() > exp) return null
  const expected = await hmac(secret, `${code}.${expRaw}`)
  // constant-time-ish compare
  if (sig.length !== expected.length) return null
  let diff = 0
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i)
  return diff === 0 ? code : null
}

function cookieValue(req: Request, name: string) {
  const raw = req.headers.get("Cookie") || ""
  for (const part of raw.split(";")) {
    const [k, ...v] = part.trim().split("=")
    if (k === name) return v.join("=")
  }
  return null
}

const json = (data: unknown, status = 200, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
  })

async function getInvite(env: Env, code: string): Promise<Invite | null> {
  const raw = await env.INVITES!.get(`invite:${code}`)
  if (!raw) return null
  const inv = JSON.parse(raw) as Invite
  return Date.now() > inv.expires ? null : inv
}

// ---------------------------------------------------------------- routes
async function openSession(req: Request, env: Env) {
  const { code } = (await req.json().catch(() => ({}))) as { code?: string }
  const clean = (code || "").trim().toUpperCase()
  if (!/^[A-Z0-9-]{6,40}$/.test(clean)) return json({ error: "invalid" }, 400)

  // crude throttle: a handful of wrong guesses per IP per hour
  const ip = req.headers.get("CF-Connecting-IP") || "?"
  const bucket = `throttle:${ip}:${Math.floor(Date.now() / 3.6e6)}`
  const tries = Number((await env.INVITES!.get(bucket)) || "0")
  if (tries > 12) return json({ error: "throttled" }, 429)

  const invite = await getInvite(env, clean)
  if (!invite) {
    await env.INVITES!.put(bucket, String(tries + 1), { expirationTtl: 3600 })
    return json({ error: "invalid" }, 401)
  }

  invite.hits = (invite.hits || 0) + 1
  invite.lastSeen = Date.now()
  await env.INVITES!.put(`invite:${clean}`, JSON.stringify(invite))

  const exp = Date.now() + SESSION_TTL_MS
  const token = await signSession(env.SESSION_SECRET!, clean, exp)
  return json(
    {
      name: invite.name,
      expires: invite.expires,
      tracks: invite.tracks.map((k) => ({ id: k, title: titleOf(k) })),
    },
    200,
    {
      "Set-Cookie":
        `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_TTL_MS / 1000}`,
    },
  )
}

function titleOf(key: string) {
  return key.replace(/^.*\//, "").replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")
}

async function stream(req: Request, env: Env, key: string) {
  const code = await readSession(env.SESSION_SECRET!, cookieValue(req, COOKIE))
  if (!code) return json({ error: "no session" }, 401)

  const invite = await getInvite(env, code)
  if (!invite || !invite.tracks.includes(key)) return json({ error: "forbidden" }, 403)

  // Range matters: without it the browser cannot seek, and Safari will not
  // start playback at all.
  const range = req.headers.get("Range")
  let opts: R2GetOptions | undefined
  let start = 0
  let end: number | undefined
  if (range) {
    const m = /bytes=(\d*)-(\d*)/.exec(range)
    if (m) {
      start = m[1] ? Number(m[1]) : 0
      end = m[2] ? Number(m[2]) : undefined
      opts = { range: { offset: start, length: end !== undefined ? end - start + 1 : undefined } }
    }
  }

  const obj = await env.PRIVATE_AUDIO!.get(key, opts)
  if (!obj) return json({ error: "not found" }, 404)

  const size = obj.size
  const headers = new Headers({
    "Content-Type": "audio/mpeg",
    "Cache-Control": "private, no-store",
    "Accept-Ranges": "bytes",
    // keep it out of search engines and previews
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "Content-Disposition": "inline",
  })
  if (range && obj.range) {
    const off = (obj.range as { offset: number }).offset ?? 0
    const len = (obj.range as { length: number }).length ?? size - off
    headers.set("Content-Range", `bytes ${off}-${off + len - 1}/${size}`)
    headers.set("Content-Length", String(len))
    return new Response(obj.body, { status: 206, headers })
  }
  headers.set("Content-Length", String(size))
  return new Response(obj.body, { status: 200, headers })
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url)

    if (url.pathname.startsWith("/api/listening/") && !configured(env)) {
      return json({ error: "not configured" }, 503)
    }
    if (url.pathname === "/api/listening/session" && req.method === "POST") {
      return openSession(req, env)
    }
    if (url.pathname === "/api/listening/logout" && req.method === "POST") {
      return json({ ok: true }, 200, {
        "Set-Cookie": `${COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`,
      })
    }
    if (url.pathname.startsWith("/api/listening/stream/")) {
      return stream(req, env, decodeURIComponent(url.pathname.slice("/api/listening/stream/".length)))
    }
    if (url.pathname.startsWith("/api/")) return json({ error: "not found" }, 404)

    return env.ASSETS.fetch(req)
  },
}
