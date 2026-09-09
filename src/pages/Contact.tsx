import DustParticles from "../components/DustParticles"
import Reveal from "../components/Reveal"
import SocialLinks from "../components/SocialLinks"
import { band } from "../data/band"

export default function Contact() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:px-8">
      <DustParticles count={16} />
      <Reveal className="relative mx-auto max-w-xl">
        <h1 className="text-3xl sm:text-4xl">Contact</h1>
        {band.contactEmail && (
          <a
            href={`mailto:${band.contactEmail}`}
            className="mt-8 inline-block font-body text-lg text-parchment-dim underline-offset-8 hover:text-gold hover:underline"
          >
            {band.contactEmail}
          </a>
        )}
        <div className="mt-12">
          <SocialLinks className="justify-center" />
        </div>
      </Reveal>
    </section>
  )
}
