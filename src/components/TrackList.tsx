import type { Track } from "../data/types"

export default function TrackList({ tracks }: { tracks: Track[] }) {
  return (
    <ol className="divide-y divide-stone/50 border-y border-stone/50">
      {tracks.map((t) => (
        <li key={t.number} className="flex items-center gap-4 py-3 text-parchment-dim">
          <span className="w-6 shrink-0 text-right font-heading text-sm text-sand">
            {t.number}
          </span>
          <span className="flex-1 font-body text-base sm:text-lg">{t.title}</span>
          {t.previewClip ? (
            <audio controls preload="none" className="h-8 max-w-[10rem]">
              <source src={t.previewClip} />
            </audio>
          ) : null}
          <span className="shrink-0 font-body text-sm tabular-nums text-sand">
            {t.duration}
          </span>
        </li>
      ))}
    </ol>
  )
}
