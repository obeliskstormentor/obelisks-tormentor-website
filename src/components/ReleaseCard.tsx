import { Link } from "react-router-dom"
import { releaseLabel } from "../data/releases"
import type { Release } from "../data/types"

export default function ReleaseCard({ release }: { release: Release }) {
  return (
    <Link
      to={`/music/${release.id}`}
      className="group block outline-none"
    >
      <div className="relative overflow-hidden border border-stone/60 bg-charcoal">
        <img
          src={release.artwork}
          alt={`${release.title} cover art`}
          loading="lazy"
          className="aspect-square w-full object-cover grayscale-[15%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-void/0 to-void/0" />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3 border-b border-transparent pb-1 group-hover:border-gold/50">
        <h3 className="font-heading text-lg tracking-wide text-parchment group-hover:text-gold">
          {release.title}
        </h3>
        <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-sand">
          {release.year}
        </span>
      </div>
      {/*
        The designation sits here rather than over the artwork: every cover has
        the band's own wordmark across the top, so a corner label collided with
        it on all three releases, and the white Glyph sleeve left sand text
        unreadable. On the void background it needs no scrim, and it replaces
        the old type line ("single") which said the same thing as "Fragment".
      */}
      <p className="mt-1 font-heading text-xs uppercase tracking-[0.2em] text-gold">
        {releaseLabel(release)}
      </p>
    </Link>
  )
}
