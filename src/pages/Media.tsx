import { useState } from "react"
import DustParticles from "../components/DustParticles"
import Lightbox from "../components/Lightbox"
import Reveal from "../components/Reveal"

const images = [
  { src: "/images/cover-glyph.jpg", alt: "Glyph cover art" },
  { src: "/images/cover-inventia-hominum.jpg", alt: "Inventia Hominum cover art" },
  { src: "/images/cover-savior-complex.jpg", alt: "Savior Complex cover art" },
  { src: "/images/band-photo.jpg", alt: "OBELISK'S TORMENTOR band photo" },
]

export default function Media() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-8">
      <DustParticles count={18} />
      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <h1 className="text-3xl sm:text-4xl">Media</h1>
          <p className="mt-4 max-w-xl text-parchment-dim">Artwork and photography from the archive.</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((img, i) => (
            <Reveal key={img.src} delay={i * 60}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="aspect-square w-full border border-stone/60 object-cover transition hover:opacity-80"
                />
              </button>
            </Reveal>
          ))}
        </div>

        {active !== null && (
          <Lightbox src={images[active].src} alt={images[active].alt} onClose={() => setActive(null)} />
        )}
      </div>
    </section>
  )
}
