import DustParticles from "../components/DustParticles"
import Reveal from "../components/Reveal"

const fragments = [
  {
    title: "The Archive",
    text: "Fragments remain. The rest is buried beneath the stones.",
  },
  {
    title: "The Obelisk",
    text: "Born from the shadows of an ancient world, where human kneel before stone and raise idols in the place of God.",
  },
  {
    title: "The Worship",
    text: "Idolatry wearing the face of devotion.",
  },
  {
    title: "The Tormentor",
    text: "An unnamed executioner walks among the ruins. He does not speak. He does not seek glory. He comes only to destroy those who worship the Obelisk.",
  },
  {
    title: "The Judgement",
    text: "Death. Judgement. Destruction.",
  },
  {
    title: "The Fall",
    text: "The Obelisk must fall.",
  },
]

export default function Lore() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-8">
      <DustParticles count={22} />
      <div className="relative mx-auto max-w-2xl">
        <Reveal>
          <h1 className="text-center text-3xl sm:text-4xl">Lore</h1>
        </Reveal>

        <div className="mt-20 space-y-28">
          {fragments.map((f, i) => (
            <Reveal key={f.title} delay={i * 60} className="text-center">
              <h2 className="text-xs uppercase tracking-[0.5em] text-gold">{f.title}</h2>
              <p className="mx-auto mt-6 max-w-lg font-body text-xl italic leading-relaxed text-parchment-dim sm:text-2xl">
                {f.text}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-28 text-center">
          <p className="font-heading text-sm tracking-[0.3em] text-sand">
            Fac Fixum Volatile et Volatile Fixum
          </p>
        </Reveal>

        <Reveal delay={40} className="mt-28">
          <h2 className="text-center text-xs uppercase tracking-[0.5em] text-gold">Milestones</h2>
          <div className="mx-auto mt-10 max-w-sm border border-stone/60 bg-charcoal/40 p-6 text-center">
            <img
              src="/images/hammerclash-live-curation-2025.jpg"
              alt="OBELISK'S TORMENTOR selected for Hammerclash Live Curation, Semarang"
              loading="lazy"
              className="mx-auto w-full max-w-[220px] border border-stone/60"
            />
            <p className="mt-5 font-body text-base italic leading-relaxed text-parchment-dim">
              Selected for Hammerclash Live Curation — Semarang, 23 August 2025.
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-sand">
              Hammersonic Records × Ravel Entertainment
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
