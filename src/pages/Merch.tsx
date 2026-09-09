import DustParticles from "../components/DustParticles"
import Reveal from "../components/Reveal"

const merch = [
  {
    name: "Fear Not The Death",
    image: "/images/merch/tshirt-fear-not-the-death.jpg",
    price: "Rp130.000",
  },
  {
    name: "Inventia Hominum",
    image: "/images/merch/tshirt-inventia-hominum.webp",
    material: "Cotton Combed 24s Premium, sablon",
  },
  {
    name: "Obelisk's Tormentor",
    image: "/images/merch/tshirt-anubis.webp",
  },
]

export default function Merch() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-8">
      <DustParticles count={16} />
      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <h1 className="text-3xl sm:text-4xl">The Archive</h1>
          <p className="mt-4 max-w-xl text-parchment-dim">
            Past pressings, now sold out. Kept here as record of what once surfaced.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {merch.map((item, i) => (
            <Reveal key={item.name} delay={i * 80}>
              <div className="relative overflow-hidden border border-stone/60">
                <img
                  src={item.image}
                  alt={`${item.name} t-shirt`}
                  loading="lazy"
                  className="aspect-square w-full object-cover grayscale-[30%]"
                />
                <span className="absolute right-3 top-3 border border-blood/70 bg-void/80 px-2 py-1 text-[0.65rem] uppercase tracking-widest text-blood">
                  Sold Out
                </span>
              </div>
              <h2 className="mt-4 font-heading text-lg">{item.name}</h2>
              {item.material && <p className="mt-1 text-sm text-parchment-dim">{item.material}</p>}
              {item.price && <p className="mt-1 text-sm text-sand">{item.price}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
