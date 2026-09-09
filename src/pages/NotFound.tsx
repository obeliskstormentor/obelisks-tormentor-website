import { Link } from "react-router-dom"
import DustParticles from "../components/DustParticles"

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <DustParticles count={16} />
      <p className="relative font-heading text-sm tracking-[0.4em] text-sand">404</p>
      <h1 className="relative mt-4 max-w-md text-2xl italic leading-relaxed sm:text-3xl">
        The stone has no record of this place.
      </h1>
      <Link
        to="/"
        className="relative mt-10 border border-gold/60 px-6 py-2.5 text-sm uppercase tracking-[0.2em] hover:bg-gold/10 hover:text-gold"
      >
        Return
      </Link>
    </section>
  )
}
