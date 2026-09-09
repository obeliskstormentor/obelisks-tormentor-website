import { useContext } from "react"
import { AmbientAudioContext } from "./AmbientAudioContext"

export function useAmbientAudio() {
  const ctx = useContext(AmbientAudioContext)
  if (!ctx) throw new Error("useAmbientAudio must be used within AmbientAudioProvider")
  return ctx
}
