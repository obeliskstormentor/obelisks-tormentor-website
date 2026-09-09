import { useMemo } from "react"

interface Particle {
  left: string
  size: number
  duration: string
  delay: string
  drift: string
  opacity: number
}

/**
 * Drifting dust motes used across every major section for atmosphere. Pure
 * CSS-driven (see .dust-mote / @keyframes dust-rise in index.css) — no
 * canvas, no per-frame JS. Respects prefers-reduced-motion via the global
 * override in index.css (animations collapse to ~instant, so motes settle
 * without any perceptible motion). Visible but not a snow effect — the
 * parent section needs `relative overflow-hidden` (or at least `relative`)
 * for the motes to stay clipped to that section.
 */
export default function DustParticles({ count = 20 }: { count?: number }) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 3.5,
        duration: `${16 + Math.random() * 20}s`,
        delay: `${-Math.random() * 30}s`,
        drift: `${(Math.random() - 0.5) * 70}px`,
        opacity: 0.3 + Math.random() * 0.45,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="dust-mote"
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size,
              "--dust-duration": p.duration,
              "--dust-delay": p.delay,
              "--dust-drift": p.drift,
              "--dust-opacity": p.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
