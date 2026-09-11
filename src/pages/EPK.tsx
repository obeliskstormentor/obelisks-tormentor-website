import DustParticles from "../components/DustParticles"
import Reveal from "../components/Reveal"
import { band } from "../data/band"
import { releases } from "../data/releases"

const downloads = [
  {
    label: "Electronic Press Kit",
    sub: "PDF · bio, photos, discography",
    href: "/epk/OBELISKS-TORMENTOR-EPK-PUBLIC.pdf",
  },
  {
    label: "Booking Dossier (Bahasa Indonesia)",
    sub: "PDF · rates, technical requirements",
    href: "/epk/OBELISKS_TORMENTOR_BOOKING_EPK_2026_BAHASA_INDONESIA.pdf",
  },
  {
    label: "Booking Dossier (English)",
    sub: "PDF · rates, technical requirements",
    href: "/epk/OBELISKS_TORMENTOR_BOOKING_EPK_2026_ENGLISH.pdf",
  },
]

export default function EPK() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-8">
      <DustParticles count={18} />
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {band.genre} &middot; {band.location} &middot; est. {band.founded}
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl">Press Kit</h1>
          <p className="mt-4 max-w-xl text-parchment-dim">
            Bio, photos, discography, and booking information for press, promoters, and event
            organizers.
          </p>
        </Reveal>

        <Reveal delay={60} className="mt-14">
          <h2 className="text-sm uppercase tracking-[0.3em] text-sand">Downloads</h2>
          <div className="mt-6 space-y-3">
            {downloads.map((d) => (
              <a
                key={d.href}
                href={d.href}
                className="flex items-center justify-between border border-stone/60 bg-charcoal/40 px-5 py-4 transition hover:border-gold/60"
              >
                <span>
                  <span className="block font-heading text-base text-parchment">{d.label}</span>
                  <span className="block text-xs text-sand">{d.sub}</span>
                </span>
                <span className="font-heading text-xs uppercase tracking-widest text-gold">
                  Download
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-16">
          <h2 className="text-sm uppercase tracking-[0.3em] text-sand">Biography</h2>
          <p className="mt-6 whitespace-pre-line font-body text-lg leading-relaxed text-parchment-dim">
            {band.bio}
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-16">
          <h2 className="text-sm uppercase tracking-[0.3em] text-sand">Members</h2>
          <ul className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {band.members.map((m) => (
              <li key={m.name} className="text-center">
                <div className="mx-auto flex aspect-square w-full items-center justify-center border border-stone/60 bg-charcoal">
                  {m.image && (
                    <img src={m.image} alt={m.name} className="h-full w-full object-cover grayscale" />
                  )}
                </div>
                <p className="mt-3 font-heading text-sm tracking-wide text-parchment">{m.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-sand">{m.role}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={200} className="mt-16">
          <h2 className="text-sm uppercase tracking-[0.3em] text-sand">Discography</h2>
          <ul className="mt-6 space-y-4">
            {releases.map((r) => (
              <li key={r.id} className="flex items-center gap-4 border border-stone/60 bg-charcoal/40 p-4">
                <img src={r.artwork} alt={`${r.title} cover`} className="h-16 w-16 border border-stone/60 object-cover" />
                <div>
                  <p className="font-heading text-base text-parchment">{r.title}</p>
                  <p className="text-xs uppercase tracking-widest text-sand">
                    {r.type} &middot; {r.releaseDate} &middot; {r.tracks.length} track
                    {r.tracks.length > 1 ? "s" : ""}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={240} className="mt-16">
          <h2 className="text-sm uppercase tracking-[0.3em] text-sand">Contact</h2>
          <div className="mt-6 space-y-2 font-body text-lg text-parchment-dim">
            {band.contactEmail && <p>{band.contactEmail}</p>}
            <p>WhatsApp: +62 895-0273-7711</p>
            <p>{band.links.bandcamp}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
