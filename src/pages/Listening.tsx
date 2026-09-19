import { useEffect, useRef, useState } from "react"

import DustParticles from "../components/DustParticles"
import Reveal from "../components/Reveal"

/**
 * Private listening room.
 *
 * Nothing here is a security boundary — the Worker is. This page only ever
 * holds a session cookie it cannot read (HttpOnly) and audio URLs that return
 * 403 without one, so viewing source gains an attacker nothing.
 */

type Track = { id: string; title: string }
type Session = { name: string; expires: number; tracks: Track[] }

export default function Listening() {
  const [code, setCode] = useState("")
  const [session, setSession] = useState<Session | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [playing, setPlaying] = useState<string | null>(null)
  const [daysLeft, setDaysLeft] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    document.title = "Private Listening — Obelisk's Tormentor"
    const meta = document.createElement("meta")
    meta.name = "robots"
    meta.content = "noindex, nofollow"
    document.head.appendChild(meta)
    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/listening/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
      if (res.status === 503) throw new Error("The chamber is not open yet.")
      if (res.status === 429) throw new Error("Too many attempts. Try again later.")
      if (!res.ok) throw new Error("That code is not valid, or it has expired.")
      const s = (await res.json()) as Session
      setDaysLeft(Math.max(0, Math.ceil((s.expires - Date.now()) / 86400000)))
      setSession(s)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setBusy(false)
    }
  }

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
      <section className="relative overflow-hidden px-6 py-24 sm:px-8">
        <DustParticles count={14} />
        <div className="relative mx-auto max-w-md">
          <Reveal>
            <h1 className="text-center text-3xl sm:text-4xl">The Chamber</h1>
            <p className="mt-4 text-center text-parchment-dim">
              Private listening. Access by invitation only.
            </p>
            <form onSubmit={submit} className="mt-12">
              <label
                htmlFor="code"
                className="block text-xs uppercase tracking-[0.3em] text-sand"
              >
                Invitation code
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
                disabled={busy || code.length < 6}
                className="mt-6 w-full border border-gold/50 px-4 py-3 text-xs uppercase tracking-[0.3em] text-gold transition hover:bg-gold/10 disabled:opacity-40"
              >
                {busy ? "Opening…" : "Enter"}
              </button>
            </form>
            <p className="mt-10 text-center text-xs leading-relaxed text-sand">
              Every entry is recorded against the code used.
            </p>
          </Reveal>
        </div>
      </section>
    )
  }

  // computed once per session rather than on every render: Date.now() in the
  // render body makes the output unstable across re-renders
  const days = daysLeft

  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-8">
      <DustParticles count={16} />
      <div className="relative mx-auto max-w-2xl">
        <Reveal>
          <h1 className="text-3xl sm:text-4xl">The Chamber</h1>
          <p className="mt-4 text-parchment-dim">
            Opened for <span className="text-parchment">{session.name}</span>. Access ends in{" "}
            {days} day{days === 1 ? "" : "s"}.
          </p>
          <div className="mt-6 border border-blood/40 bg-void/60 px-4 py-3 text-xs leading-relaxed text-parchment-dim">
            Unreleased material. Do not share, record, or redistribute. This session is logged
            against your invitation code.
          </div>
        </Reveal>

        <ul className="mt-12 divide-y divide-stone/40 border-y border-stone/40">
          {session.tracks.map((t, i) => (
            <Reveal key={t.id} delay={i * 70}>
              <li className="flex items-center gap-4 py-4">
                <button
                  onClick={() => play(t)}
                  aria-label={playing === t.id ? `Pause ${t.title}` : `Play ${t.title}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/50 text-gold transition hover:bg-gold/10"
                >
                  {playing === t.id ? "❚❚" : "▶"}
                </button>
                <span className="font-heading tracking-wide text-parchment">{t.title}</span>
                <span className="ml-auto text-xs uppercase tracking-[0.2em] text-sand">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>

        {/* controlsList and the disabled context menu only discourage the casual
            save — the real protection is that this URL 403s without the cookie. */}
        <audio
          ref={audioRef}
          controls
          controlsList="nodownload noplaybackrate"
          onContextMenu={(e) => e.preventDefault()}
          onEnded={() => setPlaying(null)}
          className="mt-10 w-full"
        />

        <button
          onClick={async () => {
            await fetch("/api/listening/logout", { method: "POST" })
            setSession(null)
            setCode("")
          }}
          className="mt-10 text-xs uppercase tracking-[0.3em] text-sand transition hover:text-gold"
        >
          Leave the chamber
        </button>
      </div>
    </section>
  )
}
