import { createContext, useEffect, useRef, useState, type ReactNode } from "react"

interface AmbientAudioValue {
  enabled: boolean
  enable: () => void
  disable: () => void
  toggle: () => void
}

export const AmbientAudioContext = createContext<AmbientAudioValue | null>(null)

/**
 * Single shared ambient-audio player for the whole site. Never autoplays on
 * load — every session starts silent, and sound only ever begins from a
 * real click (the header speaker toggle, or the homepage "Listen" button),
 * per the site brief's "never autoplay music" rule.
 *
 * Source file: /public/audio/ambience.mp3
 */
export function AmbientAudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    return () => {
      audio?.pause()
    }
  }, [])

  const enable = () => {
    const audio = audioRef.current
    if (!audio || enabled) return
    audio.volume = 0.35
    audio
      .play()
      .then(() => setEnabled(true))
      .catch(() => {
        // File missing or playback blocked — stays off, no error shown.
      })
  }

  const disable = () => {
    audioRef.current?.pause()
    setEnabled(false)
  }

  const toggle = () => (enabled ? disable() : enable())

  return (
    <AmbientAudioContext.Provider value={{ enabled, enable, disable, toggle }}>
      <audio ref={audioRef} src="/audio/ambience.mp3" loop preload="none" />
      {children}
    </AmbientAudioContext.Provider>
  )
}
