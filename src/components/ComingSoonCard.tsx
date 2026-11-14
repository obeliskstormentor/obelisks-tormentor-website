/**
 * Non-clickable teaser for a release that hasn't been publicly confirmed yet
 * (currently: "Forged Beyond Death", formerly tracked as "Album 2"). Shows
 * only a silhouette + "coming soon" — no title, no tracklist, no real
 * artwork reveal. Do not wire this to a route until the user confirms the
 * release is actually public. See releases/forged-beyond-death/release.yaml
 * and band/visual-direction.md.
 *
 * Release date confirmed by the user 2026-11-14 and shown here at their request;
 * the title and artwork stay off the site until release day.
 */
const RELEASE_DATE = "29.11.2026"

export default function ComingSoonCard({ label = "Artifact II" }: { label?: string }) {
  return (
    <div
      className="group relative block cursor-default select-none"
      aria-label={`Upcoming release — out ${RELEASE_DATE}`}
    >
      <div className="relative aspect-square overflow-hidden border border-stone/60 bg-charcoal">
        <img
          src="/images/bg-obelisk.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-110 object-cover opacity-25 brightness-[0.35] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/70" aria-hidden="true" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="animate-flicker font-heading text-xs tracking-[0.4em] text-sand">
            COMING SOON
          </span>
          <span className="font-heading text-lg tracking-[0.3em] text-parchment">{RELEASE_DATE}</span>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3 pb-1">
        <h3 className="font-heading text-lg tracking-wide text-stone-light">???</h3>
        <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-sand/70">{RELEASE_DATE}</span>
      </div>
      {/* Matches ReleaseCard: designation below the art, not over it. Dimmed
          because this release is not announced yet. */}
      <p className="mt-1 font-heading text-xs uppercase tracking-[0.2em] text-gold/70">{label}</p>
    </div>
  )
}
