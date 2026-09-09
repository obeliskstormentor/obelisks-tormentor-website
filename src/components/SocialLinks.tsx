import { band } from "../data/band"

const items: { key: keyof typeof band.links; label: string }[] = [
  { key: "bandcamp", label: "Bandcamp" },
  { key: "spotify", label: "Spotify" },
  { key: "youtube", label: "YouTube" },
  { key: "instagram", label: "Instagram" },
]

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {items.map(({ key, label }) => {
        const href = band.links[key]
        if (!href) return null
        return (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm tracking-[0.15em] uppercase text-parchment-dim hover:text-gold focus-visible:text-gold outline-none focus-visible:underline underline-offset-4"
            >
              {label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
