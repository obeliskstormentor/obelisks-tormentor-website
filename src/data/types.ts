export interface Track {
  number: number
  title: string
  duration: string
  /** Short preview clip (public, web-safe). Undefined until one is generated — never the full master. */
  previewClip?: string
}

export type ReleaseStatus = "released" | "upcoming" | "draft"

export interface ReleaseLinks {
  bandcamp?: string
  spotify?: string
  youtube?: string
}

export interface Release {
  id: string
  title: string
  type: "album" | "single" | "ep"
  status: ReleaseStatus
  year: string
  releaseDate?: string
  artwork: string
  tracks: Track[]
  description?: string
  lore?: string
  credits: string[]
  lyrics?: string
  links: ReleaseLinks
}

export interface Member {
  name: string
  role: string
  image?: string
  bio?: string
}

export interface BandLinks {
  instagram?: string
  youtube?: string
  spotify?: string
  bandcamp?: string
}

export interface BandInfo {
  name: string
  location: string
  founded: string
  genre: string
  bio: string
  members: Member[]
  links: BandLinks
  contactEmail?: string
}
