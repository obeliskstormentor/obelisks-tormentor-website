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
        <p className="mt-10 text-xs tracking-wide text-sand/70">
          &copy; {year} OBELISK'S TORMENTOR. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
