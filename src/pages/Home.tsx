import { Link } from "react-router-dom"
import ComingSoonCard from "../components/ComingSoonCard"
import DustParticles from "../components/DustParticles"
import Reveal from "../components/Reveal"
import ReleaseCard from "../components/ReleaseCard"
import { useAmbientAudio } from "../context/useAmbientAudio"
import { releases } from "../data/releases"

const latest = releases.find((r) => r.id === "savior-complex") ?? releases[0]

export default function Home() {
  const { enable } = useAmbientAudio()

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden border-b border-stone/60 px-6 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url(/images/bg-obelisk.jpg)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-void/80 to-void" aria-hidden="true" />
        <div className="bg-noise absolute inset-0" aria-hidden="true" />
        <DustParticles />

        <div className="relative z-10 flex flex-col items-center">
          <img
            src="/images/symbol.png"
            alt=""
            aria-hidden="true"
            className="animate-flicker h-20 w-20 object-contain sm:h-24 sm:w-24"
          />
          <h1 className="mt-8 text-shadow-ember text-4xl tracking-[0.12em] sm:text-6xl md:text-7xl">
            OBELISK'S TORMENTOR
          </h1>
          <p className="mt-6 font-heading text-xs tracking-[0.5em] text-gold sm:text-sm">
            THE DESTROYER OF IDOLS
          </p>

          <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row">
            <Link
              to="/music"
              onClick={enable}
              className="border border-gold/60 px-8 py-3 text-sm uppercase tracking-[0.3em] text-parchment transition hover:bg-gold/10 hover:text-gold"
            >
              Listen
            </Link>
            <Link
              to="/lore"
              className="text-sm uppercase tracking-[0.3em] text-parchment-dim underline-offset-8 hover:text-gold hover:underline"
            >
              Enter the Archive
            </Link>
          </div>
        </div>

        <div
          className="absolute bottom-8 h-10 w-px bg-gradient-to-b from-transparent via-sand to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* LATEST RELEASE */}
      <section className="relative overflow-hidden border-b border-stone/60 px-6 py-24 sm:px-8">
        <DustParticles count={14} />
        <Reveal className="relative mx-auto grid max-w-5xl gap-10 sm:grid-cols-2 sm:items-center">
          <img
            src={latest.artwork}
            alt={`${latest.title} cover art`}
            className="aspect-square w-full border border-stone/60 object-cover"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              Latest {latest.type}
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl">{latest.title}</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-sand">
              {latest.year}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={`/music/${latest.id}`}
                className="border border-parchment/30 px-6 py-2.5 text-sm uppercase tracking-[0.2em] hover:border-gold hover:text-gold"
              >
                View Release
              </Link>
              {latest.links.bandcamp && (
                <a
                  href={latest.links.bandcamp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-6 py-2.5 text-sm uppercase tracking-[0.2em] text-parchment-dim hover:text-gold"
                >
                  Bandcamp &rarr;
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ARTIFACTS */}
      <section className="relative overflow-hidden border-b border-stone/60 px-6 py-24 sm:px-8">
        <DustParticles count={14} />
        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <h2 className="text-center text-3xl sm:text-4xl">Artifacts</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3">
            {releases.map((r, i) => (
              <Reveal key={r.id} delay={i * 100}>
                <ReleaseCard release={r} index={i} />
              </Reveal>
            ))}
            <Reveal delay={releases.length * 100}>
              <ComingSoonCard />
            </Reveal>
          </div>
        </div>
      </section>

      {/* THE OBELISK */}
      <section className="relative overflow-hidden border-b border-stone/60 px-6 py-28 sm:px-8">
        <DustParticles count={14} />
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">The Obelisk</h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-parchment-dim italic sm:text-xl">
            A monument raised by those who abandoned the truth.
          </p>
        </Reveal>
      </section>

      {/* THE TORMENTOR */}
      <section className="relative overflow-hidden px-6 py-28 sm:px-8">
        <DustParticles count={14} />
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">The Tormentor</h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-parchment-dim italic sm:text-xl">
            No name.
            <br />
            No voice.
            <br />
            Only judgement.
          </p>
          <Link
            to="/lore"
            className="mt-10 inline-block text-sm uppercase tracking-[0.3em] text-gold underline-offset-8 hover:underline"
          >
            Descend into the Lore
          </Link>
        </Reveal>
      </section>
    </>
  )
}
