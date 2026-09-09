import { useState } from "react"
import { NavLink } from "react-router-dom"
import AmbientToggle from "./AmbientToggle"

const links = [
  { to: "/music", label: "Music" },
  { to: "/lore", label: "Lore" },
  { to: "/band", label: "Band" },
  { to: "/media", label: "Media" },
  { to: "/merch", label: "Merch" },
  { to: "/contact", label: "Contact" },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-stone/60 bg-void/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/images/symbol.png" alt="" className="h-9 w-9 object-contain" aria-hidden="true" />
          <span className="font-heading text-sm tracking-[0.25em] text-parchment sm:text-base">
            OBELISK'S TORMENTOR
          </span>
        </NavLink>

        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `text-sm tracking-[0.2em] uppercase outline-none transition-colors ${
                      isActive ? "text-gold" : "text-parchment-dim hover:text-gold"
                    } focus-visible:text-gold focus-visible:underline underline-offset-4`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <AmbientToggle />

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-parchment md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-6 -translate-y-1/2 bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 bottom-0 h-px w-6 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-stone/60 md:hidden">
          <ul className="flex flex-col px-5 py-4">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-3 text-sm tracking-[0.2em] uppercase ${
                      isActive ? "text-gold" : "text-parchment-dim"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
