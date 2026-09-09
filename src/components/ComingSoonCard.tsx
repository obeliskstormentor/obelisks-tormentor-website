/**
 * Non-clickable teaser for a release that hasn't been publicly confirmed yet
 * (currently: "Forged Beyond Death", formerly tracked as "Album 2"). Shows
 * only a silhouette + "coming soon" — no title, no tracklist, no real
 * artwork reveal. Do not wire this to a route until the user confirms the
 * release is actually public. See releases/forged-beyond-death/release.yaml
 * and band/visual-direction.md.
 */
export default function ComingSoonCard({ numeral = "IV" }: { numeral?: string }) {
  return (
    <div
      className="group relative block cursor-default select-none"
      aria-label="Upcoming release — details not yet announced"
    >
      <div className="relative aspect-square overflow-hidden border border-stone/60 bg-charcoal">
        <img
          src="/images/bg-obelisk.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-110 object-cover opacity-25 brightness-[0.35] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/70" aria-hidden="true" />
        <span className="absolute left-3 top-3 font-heading text-xs tracking-[0.2em] text-sand">
          {numeral}
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="animate-flicker font-heading text-xs tracking-[0.4em] text-sand">
            COMING SOON
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3 pb-1">
        <h3 className="font-heading text-lg tracking-wide text-stone-light">???</h3>
        <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-sand/70">TBA</span>
      </div>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-sand/70">album</p>
    </div>
  )
}
