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
        {/* Labels only -- the address and number stay off the page by request.
            They are still in the link targets, which is unavoidable for a link
            that opens the mail app or WhatsApp. */}
        <div className="mt-10 flex items-center justify-center gap-10">
          {band.contactEmail && (
            <a
              href={`mailto:${band.contactEmail}`}
              className="font-heading text-sm uppercase tracking-[0.3em] text-parchment-dim underline-offset-8 transition-colors hover:text-gold hover:underline"
            >
              Email
            </a>
          )}
          {band.contactWhatsApp && (
            <a
              href={`https://wa.me/${band.contactWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-sm uppercase tracking-[0.3em] text-parchment-dim underline-offset-8 transition-colors hover:text-gold hover:underline"
            >
              WhatsApp
            </a>
          )}
        </div>
        <div className="mt-12">
          <SocialLinks className="justify-center" />
        </div>
      </Reveal>
    </section>
  )
}
