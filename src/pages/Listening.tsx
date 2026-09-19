import { useCallback, useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"

/**
 * Private listening room — /listen/:slug
 *
 * Deliberately bare: no site header, no footer, no navigation. It should read
 * as a document sent to one person, not as a page of the public site.
 *
 * The code normally arrives in the link (?k=…) so the recipient clicks once and
 * it plays — a label A&R will not type an access code. The typed form is only a
 * fallback for when the link has been split from the code on purpose.
 *
 * Nothing here is a security boundary; the Worker is. This page only holds a
 * session cookie it cannot read (HttpOnly) and audio URLs that 403 without one.
 */

type Track = { id: string; title: string }
type Session = { name: string; expires: number; tracks: Track[] }

/**
 * Declared at module level on purpose. Defined inside the component it would be
 * a new component type on every render, so React would unmount and remount the
 * subtree — including the <audio> element, which stops playback dead.
 */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-void px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-lg">{children}</div>
    </div>
  )
}

export default function Listening() {
  const [params] = useSearchParams()
  const [code, setCode] = useState("")
  const [session, setSession] = useState<Session | null>(null)
  const [error, setError] = useState<string | null>(null)
  // starts true when the link carries a code, so the first paint is already the
  // "Opening…" state rather than a code form that flashes and disappears
  const [busy, setBusy] = useState(() => params.has("k"))
  const [playing, setPlaying] = useState<string | null>(null)
  const [daysLeft, setDaysLeft] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    document.title = "Private Listening — Obelisk's Tormentor"
    const meta = document.createElement("meta")
    meta.name = "robots"
    meta.content = "noindex, nofollow, noarchive"
    document.head.appendChild(meta)
    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  const open = useCallback(async (value: string) => {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/listening/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: value }),
      })
      if (res.status === 503) throw new Error("This session is not open yet.")
      if (res.status === 429) throw new Error("Too many attempts. Try again later.")
      if (!res.ok) throw new Error("This link is not valid, or it has expired.")
      // A 200 that is not JSON means the asset layer answered instead of the
      // Worker — a routing misconfiguration, not a bad code. Say so plainly
      // rather than blaming the listener's link.
      if (!(res.headers.get("Content-Type") || "").includes("application/json")) {
        throw new Error("Server misconfigured — the listening API is not reachable.")
      }
      const s = (await res.json()) as Session
      setDaysLeft(Math.max(0, Math.ceil((s.expires - Date.now()) / 86400000)))
      setSession(s)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setBusy(false)
    }
  }, [])

  // code carried in the link: open straight away, then strip it from the address
  // bar so it does not end up in a screenshot or a shared URL
  useEffect(() => {
    const k = params.get("k")
    if (k) {
      void open(k)
      window.history.replaceState({}, "", window.location.pathname)
    }
  }, [params, open])

  function play(t: Track) {
    const el = audioRef.current
    if (!el) return
    if (playing === t.id) {
      el.pause()
      setPlaying(null)
      return
    }
    el.src = `/api/listening/stream/${encodeURIComponent(t.id)}`
    el.play().catch(() => setError("Playback failed. Reload and try again."))
    setPlaying(t.id)
  }

  if (!session) {
    return (
      <Frame>
        <p className="text-xs uppercase tracking-[0.35em] text-sand">Obelisk&rsquo;s Tormentor</p>
        <h1 className="mt-6 font-heading text-3xl tracking-wide text-parchment">
          Private Listening Session
        </h1>
        {busy ? (
          <p className="mt-10 text-sm text-parchment-dim">Opening…</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              void open(code)
            }}
            className="mt-10"
          >
            <label htmlFor="code" className="block text-xs uppercase tracking-[0.3em] text-sand">
              Access code
            </label>
            <input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              autoComplete="off"
              spellCheck={false}
              placeholder="XXXX-XXXX"
              className="mt-3 w-full border border-stone/60 bg-charcoal px-4 py-3 font-heading tracking-[0.2em] text-parchment outline-none focus:border-gold/60"
            />
            {error && <p className="mt-3 text-sm text-blood-bright">{error}</p>}
            <button
              type="submit"
              disabled={code.length < 6}
              className="mt-6 w-full border border-gold/50 px-4 py-3 text-xs uppercase tracking-[0.3em] text-gold transition hover:bg-gold/10 disabled:opacity-40"
            >
              Enter
            </button>
          </form>
        )}
        {error && busy === false && !code && (
          <p className="mt-6 text-sm text-blood-bright">{error}</p>
        )}
      </Frame>
    )
  }

  return (
    <Frame>
      <p className="text-xs uppercase tracking-[0.35em] text-sand">Obelisk&rsquo;s Tormentor</p>
      <h1 className="mt-4 font-heading text-4xl tracking-wide text-parchment">Album II</h1>
      <p className="mt-2 font-body text-lg italic text-parchment-dim">
        Private Listening Session
      </p>

      <ol className="mt-12 space-y-1">
        {session.tracks.map((t, i) => (
          <li key={t.id}>
            <button
              onClick={() => play(t)}
              className="group flex w-full items-baseline gap-4 py-3 text-left transition hover:text-gold"
            >
              <span className="w-8 shrink-0 font-heading text-sm text-sand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`font-heading uppercase tracking-[0.12em] ${
                  playing === t.id ? "text-gold" : "text-parchment group-hover:text-gold"
                }`}
              >
                {t.title}
              </span>
              <span className="ml-auto text-xs uppercase tracking-[0.2em] text-sand opacity-0 transition group-hover:opacity-100">
                {playing === t.id ? "Pause" : "Play"}
              </span>
            </button>
          </li>
        ))}
      </ol>

      {/* controlsList and the blocked context menu only discourage a casual save;
          the URL itself 403s without the session cookie. */}
      <audio
        ref={audioRef}
        controls
        controlsList="nodownload noplaybackrate"
        onContextMenu={(e) => e.preventDefault()}
        onEnded={() => setPlaying(null)}
        className="mt-10 w-full"
      />
      {error && <p className="mt-4 text-sm text-blood-bright">{error}</p>}

      <p className="mt-14 text-sm font-medium text-parchment-dim">
        For label / management / industry consideration
      </p>

      <div className="mt-6 border-t border-stone/50 pt-6 text-xs leading-relaxed text-sand">
        Prepared for {session.name}. Access ends in {daysLeft} day
        {daysLeft === 1 ? "" : "s"}.
        <br />
        Unreleased material — please do not share, record or redistribute. This session is
        logged against the link you were sent.
      </div>
    </Frame>
  )
}
