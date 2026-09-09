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
      </div>
    </section>
  )
}
