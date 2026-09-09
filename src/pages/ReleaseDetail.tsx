import { Navigate, useParams } from "react-router-dom"
import DustParticles from "../components/DustParticles"
import Reveal from "../components/Reveal"
import TrackList from "../components/TrackList"
import { getReleaseById } from "../data/releases"

export default function ReleaseDetail() {
  const { id } = useParams<{ id: string }>()
  const release = id ? getReleaseById(id) : undefined

  if (!release) return <Navigate to="/music" replace />

  return (
    <article className="relative overflow-hidden px-6 py-20 sm:px-8">
      <DustParticles count={20} />
      <div className="relative mx-auto max-w-3xl">
      <Reveal className="grid gap-10 sm:grid-cols-[280px_1fr]">
        <img
          src={release.artwork}
          alt={`${release.title} cover art`}
          className="aspect-square w-full border border-stone/60 object-cover"
        />
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {release.type} &middot; {release.year}
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl">{release.title}</h1>

          {release.links.bandcamp && (
            <a
              href={release.links.bandcamp}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-block border border-gold/60 px-6 py-2.5 text-sm uppercase tracking-[0.2em] hover:bg-gold/10 hover:text-gold"
            >
              Listen on Bandcamp
            </a>
          )}
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <TrackList tracks={release.tracks} />
      </Reveal>

      {release.description && (
        <Reveal className="mt-14">
          <h2 className="text-sm uppercase tracking-[0.3em] text-sand">Description</h2>
          <p className="mt-4 whitespace-pre-line font-body text-lg leading-relaxed text-parchment-dim">
            {release.description}
          </p>
        </Reveal>
      )}

      {release.lore && (
        <Reveal className="mt-14">
          <h2 className="text-sm uppercase tracking-[0.3em] text-sand">Lore</h2>
          <p className="mt-4 whitespace-pre-line font-body text-lg italic leading-relaxed text-parchment-dim">
            {release.lore}
          </p>
        </Reveal>
      )}

      {release.lyrics && (
        <Reveal className="mt-14">
          <h2 className="text-sm uppercase tracking-[0.3em] text-sand">Lyrics</h2>
          <p className="mt-4 whitespace-pre-line font-body text-lg leading-relaxed text-parchment-dim">
            {release.lyrics}
          </p>
        </Reveal>
      )}

      {release.credits.length > 0 && (
        <Reveal className="mt-14 border-t border-stone/50 pt-8">
          <h2 className="text-sm uppercase tracking-[0.3em] text-sand">Credits</h2>
          <ul className="mt-4 space-y-1 text-parchment-dim">
            {release.credits.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Reveal>
      )}
      </div>
    </article>
  )
}
