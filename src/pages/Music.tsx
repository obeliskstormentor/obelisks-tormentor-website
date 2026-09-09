import ComingSoonCard from "../components/ComingSoonCard"
import DustParticles from "../components/DustParticles"
import Reveal from "../components/Reveal"
import ReleaseCard from "../components/ReleaseCard"
import { releases } from "../data/releases"

export default function Music() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-8">
      <DustParticles count={18} />
      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <h1 className="text-3xl sm:text-4xl">Music</h1>
          <p className="mt-4 max-w-xl text-parchment-dim">
            The full record, as it stands.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3">
          {releases.map((r, i) => (
            <Reveal key={r.id} delay={i * 80}>
              <ReleaseCard release={r} index={i} />
            </Reveal>
          ))}
          <Reveal delay={releases.length * 80}>
            <ComingSoonCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
