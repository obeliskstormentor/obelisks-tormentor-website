import DustParticles from "../components/DustParticles"
import Reveal from "../components/Reveal"
import { band } from "../data/band"

export default function Band() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-8">
      <DustParticles count={20} />
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {band.genre} &middot; {band.location} &middot; est. {band.founded}
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl">{band.name}</h1>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-10 whitespace-pre-line font-body text-lg leading-relaxed text-parchment-dim">
            {band.bio}
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-20">
          <h2 className="text-sm uppercase tracking-[0.3em] text-sand">Members</h2>
          <ul className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {band.members.map((m) => (
              <li key={m.name} className="text-center">
                <div className="mx-auto flex aspect-square w-full items-center justify-center border border-stone/60 bg-charcoal">
                  {m.image ? (
                    <img src={m.image} alt={m.name} className="h-full w-full object-cover grayscale" />
                  ) : (
                    <span className="font-heading text-2xl text-stone-light" aria-hidden="true">
                      &mdash;
                    </span>
                  )}
                </div>
                <p className="mt-3 font-heading text-sm tracking-wide text-parchment">{m.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-sand">{m.role}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
