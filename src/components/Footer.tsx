import { Link } from "react-router-dom"
import SocialLinks from "./SocialLinks"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-stone/60 bg-charcoal">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-heading text-sm tracking-[0.3em] text-parchment">
              OBELISK'S TORMENTOR
            </p>
            <p className="mt-2 text-sm text-sand">Semarang, Indonesia</p>
          </div>
          <SocialLinks />
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs tracking-wide text-sand/70">
            &copy; {year} OBELISK'S TORMENTOR. All rights reserved.
          </p>
          <Link to="/epk" className="text-xs uppercase tracking-widest text-sand hover:text-gold">
            Press Kit
          </Link>
        </div>
      </div>
    </footer>
  )
}
