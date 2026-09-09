import type { BandInfo } from "./types"

/**
 * Mirrors ../../../../band/*.md — update by hand if those change.
 * Every field here is either user-confirmed or verified from the official
 * Spotify/Bandcamp pages. Nothing here is invented.
 */
export const band: BandInfo = {
  name: "OBELISK'S TORMENTOR",
  location: "Semarang, Indonesia",
  founded: "2019",
  genre: "Deathcore",

  // Final approved inscription-style bio — see band/bio.md. Do not edit without
  // the user's explicit approval of the change.
  bio: `Born from the shadows of an ancient world, where human kneel before stone and raise idols in the place of God.

An unnamed executioner walks among the ruins.

He does not speak.
He does not seek glory.
He comes only to destroy those who worship the Obelisk.

Death. Judgement. Destruction.

The story remains buried beneath the stones.

The Obelisk must fall.

Fac Fixum Volatile et Volatile Fixum.`,

  // Instruments confirmed via the official Spotify bio. Photos supplied by user 2026-09-08.
  // Full last names and individual bios still not supplied — do not invent them.
  members: [
    { name: "Difa", role: "Vocals", image: "/images/member-difa.jpg" },
    { name: "Denis", role: "Guitar", image: "/images/member-denis.jpg" },
    { name: "Topan", role: "Guitar", image: "/images/member-topan.jpg" },
    { name: "Alan", role: "Drums", image: "/images/member-alan.jpg" },
  ],

  links: {
    instagram: "https://www.instagram.com/obeliskstormentor/",
    youtube: "https://youtube.com/@obeliskstormentor",
    spotify: "https://open.spotify.com/artist/3cYkWigkeOLWXW1zumT5Ys",
    bandcamp: "https://obeliskstormentor.bandcamp.com",
  },

  contactEmail: "obeliskstormentordc666@gmail.com",
}
