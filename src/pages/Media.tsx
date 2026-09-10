import { useState } from "react"
import DustParticles from "../components/DustParticles"
import Lightbox from "../components/Lightbox"
import Reveal from "../components/Reveal"

const artworkImages = [
  { src: "/images/cover-glyph.jpg", alt: "Glyph cover art" },
  { src: "/images/cover-inventia-hominum.jpg", alt: "Inventia Hominum cover art" },
  { src: "/images/cover-savior-complex.jpg", alt: "Savior Complex cover art" },
]

const liveImages = [
  { src: "/images/live/live-vocalist-jump.webp", alt: "OBELISK'S TORMENTOR — live performance" },
  { src: "/images/live/live-guitarist-smoke.webp", alt: "OBELISK'S TORMENTOR — live performance" },
  { src: "/images/live/live-drummer-solo.webp", alt: "OBELISK'S TORMENTOR — live performance" },
  { src: "/images/live/live-metal-blora-bersatu-01.webp", alt: "OBELISK'S TORMENTOR live at Metal Blora Bersatu" },
  { src: "/images/live/live-metal-blora-bersatu-02.webp", alt: "OBELISK'S TORMENTOR live at Metal Blora Bersatu" },
  { src: "/images/live/live-metal-blora-bersatu-03.webp", alt: "OBELISK'S TORMENTOR live at Metal Blora Bersatu" },
  { src: "/images/live/live-metal-blora-bersatu-04.webp", alt: "OBELISK'S TORMENTOR live at Metal Blora Bersatu" },
  { src: "/images/live/live-penghuni-kota-mati-01.jpg", alt: "OBELISK'S TORMENTOR live at Penghuni Kota Mati" },
  { src: "/images/live/live-penghuni-kota-mati-02.jpg", alt: "OBELISK'S TORMENTOR live at Penghuni Kota Mati" },
  { src: "/images/live/live-penghuni-kota-mati-03.jpg", alt: "OBELISK'S TORMENTOR live at Penghuni Kota Mati" },
  { src: "/images/live/live-group-backstage.webp", alt: "OBELISK'S TORMENTOR backstage" },
]

const videos = [
  { id: "WK_vaRPFmnc", title: "Undead Knox (Official Music Video)" },
  { id: "ybpw64F57a4", title: "Apithano (Official Video)" },
  { id: "Wy6SohitLSM", title: "Live at Metal Blora Bersatu #11" },
]

const allImages = [...artworkImages, ...liveImages]

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

        <Reveal delay={40}>
          <h2 className="mt-14 text-xl uppercase tracking-widest text-sand">Artwork</h2>
        </Reveal>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {artworkImages.map((img, i) => (
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

        <Reveal delay={40}>
          <h2 className="mt-16 text-xl uppercase tracking-widest text-sand">Live</h2>
        </Reveal>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {liveImages.map((img, i) => (
            <Reveal key={img.src} delay={i * 60}>
              <button
                type="button"
                onClick={() => setActive(artworkImages.length + i)}
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

        <Reveal delay={40}>
          <h2 className="mt-16 text-xl uppercase tracking-widest text-sand">Videos</h2>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {videos.map((v, i) => (
            <Reveal key={v.id} delay={i * 60}>
              <div className="aspect-video w-full border border-stone/60 bg-charcoal">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="mt-2 text-sm text-parchment-dim">{v.title}</p>
            </Reveal>
          ))}
        </div>

        {active !== null && (
          <Lightbox src={allImages[active].src} alt={allImages[active].alt} onClose={() => setActive(null)} />
        )}
      </div>
    </section>
  )
}
