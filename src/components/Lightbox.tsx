import { useEffect } from "react"

export default function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string
  alt: string
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 p-6"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 text-3xl leading-none text-parchment hover:text-gold"
      >
        &times;
      </button>
      <img
        src={src}
        alt={alt}
        className="max-h-[85vh] max-w-full border border-stone/60 object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
