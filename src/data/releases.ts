import type { Release } from "./types"

// Mirrors the release.yaml files under ../../../../releases/<id>/ — update by
// hand if those change. Bandcamp URLs verified live 2026-09-06. previewClip is
// left undefined until short public preview clips are generated from the
// masters — never ship the full private WAV files here.
export const releases: Release[] = [
  {
    id: "glyph",
    title: "Glyph",
    type: "album",
    status: "released",
    year: "2019",
    releaseDate: "2019-11-10",
    artwork: "/images/cover-glyph.jpg",
    tracks: [
      { number: 1, title: "Intro", duration: "0:53" },
      { number: 2, title: "Apithano", duration: "3:49" },
      { number: 3, title: "Undead Knox", duration: "4:20" },
      { number: 4, title: "Urethekau", duration: "3:46" },
      { number: 5, title: "Gaspille", duration: "4:00" },
      { number: 6, title: "Plats For Visdom", duration: "3:27" },
      { number: 7, title: "Eno The Huracan", duration: "3:28" },
      { number: 8, title: "Old Goptic", duration: "4:44" },
      { number: 9, title: "Neverhore", duration: "2:35" },
      { number: 10, title: "Neftida", duration: "3:43" },
      { number: 11, title: "Wunder Trager", duration: "3:45" },
      { number: 12, title: "Solve Coagula", duration: "4:25" },
      { number: 13, title: "Final Gale", duration: "4:49" },
    ],
    credits: [
      "Recorded at Vengeance Record",
      "Mixed by Vengeance Record",
      "Mastered by Vengeance Record",
      "Artwork by OBELISK'S TORMENTOR",
    ],
    links: {
      bandcamp: "https://obeliskstormentor.bandcamp.com/album/glyph-3",
    },
  },
  {
    id: "inventia-hominum",
    title: "Inventia Hominum",
    type: "single",
    status: "released",
    year: "2023",
    releaseDate: "2023-07-21",
    artwork: "/images/cover-inventia-hominum.jpg",
    tracks: [{ number: 1, title: "Inventia Hominum", duration: "3:52" }],
    description:
      "A brief story of our vocalist life. Surviving from suicidal attempt, twice, and short after, he got a revelation about how to live a life",
    lyrics: `Fac Fixum Volatile et Volatile Fixum

One must broke down to recreate the stronger one

Fac Fixum Volatile et Volatile Fixum

One must broke down to recreate again

Blazing night, Friday the 13th
Newborn fall into this world

Now he realized that he was born into a literal hell
Wrongly expected, this life fucked him over and over and over
Far beyond his estimation
Immense temptation; twice he tried.
One falls, thousands rise up
INVENTIA HOMINUM

Tried to rebuild his world not long ago
Took the attempt to kill his alter ego

One after one, death after death
Slowly, his world reconstructed again

Completely cleansing all the past psychic trauma
Life is starting to reveal its meaning
Totally awaken from a paralyzed, dogmatized brain
Enrich the power, as above so below

I'm a god to myself

I'm a god to myself

I'm a god to myself

I'm a god

RESILIENT AB INFERNO`,
    credits: [
      "Recorded at Vengeance Record",
      "Mixed by Vengeance Record",
      "Mastered by Vengeance Record",
      "Artwork by OBELISK'S TORMENTOR",
    ],
    links: {
      bandcamp: "https://obeliskstormentor.bandcamp.com/track/inventia-hominum",
    },
  },
  {
    id: "savior-complex",
    title: "Savior Complex",
    type: "single",
    status: "released",
    year: "2024",
    releaseDate: "2024-02-06",
    artwork: "/images/cover-savior-complex.jpg",
    tracks: [{ number: 1, title: "Savior Complex", duration: "4:38" }],
    credits: [
      "Recorded at Vengeance Record",
      "Mixed by Vengeance Record",
      "Mastered by Vengeance Record",
      "Artwork by OBELISK'S TORMENTOR",
    ],
    links: {
      bandcamp: "https://obeliskstormentor.bandcamp.com/track/savior-complex",
    },
  },
]

export function getReleaseById(id: string): Release | undefined {
  return releases.find((r) => r.id === id)
}
