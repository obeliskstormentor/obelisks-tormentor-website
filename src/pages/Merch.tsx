import DustParticles from "../components/DustParticles"
import Reveal from "../components/Reveal"

export default function Merch() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:px-8">
      <DustParticles count={16} />
      <Reveal className="relative mx-auto max-w-2xl">
        <h1 className="text-3xl sm:text-4xl">The Archive</h1>
        <p className="mt-6 font-body text-lg italic leading-relaxed text-parchment-dim">
          Nothing has been unearthed yet.
        </p>
        <p className="mt-2 text-sm text-sand">Merchandise will surface here in time.</p>
      </Reveal>
    </section>
  )
}
