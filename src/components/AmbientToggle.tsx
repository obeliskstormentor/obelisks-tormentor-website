import { useAmbientAudio } from "../context/useAmbientAudio"

export default function AmbientToggle() {
  const { enabled, toggle } = useAmbientAudio()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute ambient sound" : "Enable ambient sound"}
      title={enabled ? "Mute ambient sound" : "Enable ambient sound"}
      className="flex h-9 w-9 shrink-0 items-center justify-center text-parchment-dim transition-colors hover:text-gold"
    >
      {enabled ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 9v6h4l5 5V4L8 9H4Z" strokeLinejoin="round" />
          <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a9 9 0 0 1 0 12" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 9v6h4l5 5V4L8 9H4Z" strokeLinejoin="round" />
          <path d="M16 9l5 6M21 9l-5 6" strokeLinecap="round" />
        </svg>
      )}
    </button>
  )
}
