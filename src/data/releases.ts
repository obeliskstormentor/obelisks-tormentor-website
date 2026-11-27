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
  {
    id: "forged-beyond-death",
    title: "Forged Beyond Death",
    type: "album",
    status: "released",
    year: "2026",
    releaseDate: "2026-11-29",
    artwork: "/images/cover-forged-beyond-death.jpg",
    tracks: [
      { number: 1, title: "Dualitas", duration: "4:24" },
      { number: 2, title: "Inventia Hominum", duration: "3:54" },
      { number: 3, title: "Savior Complex", duration: "4:39" },
      { number: 4, title: "Abyssal Despair", duration: "4:09" },
      { number: 5, title: "Lucid", duration: "4:05" },
      { number: 6, title: "Reminisce", duration: "4:06" },
      { number: 7, title: "Blood Oath", duration: "4:11" },
      { number: 8, title: "The Pyre's Embrace", duration: "3:50" },
      { number: 9, title: "Bionic Flesh", duration: "4:07" },
      { number: 10, title: "Stubborn Damnation", duration: "3:51" },
    ],
    description:
      "Artifact II. Released 29 November 2026 via Atlas Records. Ten tracks, opening with Dualitas, and including the album masters of the singles Inventia Hominum and Savior Complex.",
    lyrics: "I. DUALITAS\n\nRasa perih mengoyak, siksa neraka meronta\nTeriakan jiwa-jiwa, terperangkap dalam dosa\nBayangan gelap slimuti, langkah tlah terhenti\nDalam dunia ini, neraka tlah bersemi\n\nNeraka dan surga, nyata dalam jiwa\nNeraka dan surga, tercipta di dunia\n\nCahaya dan gelap, beradu segan tuk henti\nJiwa terpecah, antara dua realiti\nDi persimpangan ini, pilihlah jalan mu\nNeraka. Tau surga. Dalam kehidupan\n\nNeraka dan surga, nyata dalam jiwa\nNeraka dan surga, tercipta di dunia\n\nDarah mengalir deras, ilusi surga iringi\nDosa dan pahala, bertarung dalam ilusi\nSetiap keputusan, mengukir takdir abadi\nDalam dunia ini, surga hadir di sini\n\nDarah mengalir deras, ilusi surga iringi\nDosa dan pahala, bertarung dalam ilusi\nSetiap keputusan, mengukir takdir abadi\nDalam dunia ini, surga hadir di sini\n\n\nII. INVENTIA HOMINUM\n\nFac Fixum Volatile et Volatile Fixum\n\nOne must broke down to recreate the stronger one\n\nFac Fixum Volatile et Volatile Fixum\n\nOne must broke down to recreate again\n\nBlazing night, Friday the 13th\nNewborn fall into this world\n\nNow he realized that he was born into a literal hell\nWrongly expected, this life fucked him over and over and over\nFar beyond his estimation\nImmense temptation; twice he tried.\nOne falls, thousands rise up\nINVENTIA HOMINUM\n\nTried to rebuild his world not long ago\nTook the attempt to kill his alter ego\n\nOne after one, death after death\nSlowly, his world reconstructed again\n\nCompletely cleansing all the past psychic trauma\nLife is starting to reveal its meaning\nTotally awaken from a paralyzed, dogmatized brain\nEnrich the power, as above so below\n\nI'm a god to myself\n\nI'm a god to myself\n\nI'm a god to myself\n\nI'm a god\n\nRESILIENT AB INFERNO\n\n\nIII. SAVIOR COMPLEX\n\nEmbrace the divinity, become your deity\nYour own savior in life grand tapestry\n\nWatch as the birds falls from the sky\nThe loose their capability to fly\nCommon sense keeps us sane\nFacing the adversity, is sanity that we confide\n\nAll i see is you suffocate to death\nAll i see is you drowned in your own pain and suffer\n\nNo. You're not wearing the crown of thorns\nI don't see you hanging on the crucifixion\n\nUncertain prevails, a truth we can't strip\nI used to think that afterlife, will pay the redemption\nNo! We must redeem it all away while we are still breathing\n\n\nIV. ABYSSAL DESPAIR\n\nTrapped in a void, a desolate sphere\nDarkness consumes, fear reigns supreme\nA mind shattered, a soul torn apart\nLost in the depths of a desperate\n\nAbyssal despair, a haunting embrace\nA suffocating grip, a desolate space\nConsumed by sorrow, a victim of fate\nBound to this darkness, eternal hate\n\nHaunted by demons, tormented by night\nA constant battle, a ceaseless fight\n\nLost in the shadows, a prisoner of mind\nA shattered existence, a soul confined\n\nAbyssal despair, a haunting embrace\nA suffocating grip, a desolate space\nConsumed by sorrow, a victim of fate\nBound to this darkness, eternal hate\n\nCan't escape the void, trapped in this hell\nA never-ending cycle, a living death spell\nYearning for release, a merciful end\nBut forever trapped, a prisoner of mind\n\nAbyssal despair, a haunting embrace\nA suffocating grip, desolate space\nConsumed by sorrow, a victim of fate\nBound to this darkness, eternal hate\n\n\nV. LUCID\n\nBoiling blood, sweat runs cold, my body goes numb, and paralyzed\nTerror prowls each shadowed night, digging deep inside my mind\nSharp eyes pierce through the dark, staring straight into my soul\nSummoning, unraveling me, I'm losing all control\n\nThe surreal projected vision, a multi-dimensional figure of me\nFragments of my shadow drift, dissolving into eternity\nAm i awake or losing my consciousness between dream and reality?\n\nHypnotized, take total control of a being.\nParalyzed brain, and logic madness\nNo sanity remains, it's just a shattered soul\n\nI push so hard to wake up. (Wake up! Wake the fuck up!)\nI pushed so hard to get away. (You can't run! You can't run away)\n\nHypnotized, take total control of a being.\nParalyzed brain, and logic madness\nNo sanity remains, it's just a shattered soul\n\nNo sanity remains. A shattered soul trapped in the abyss\nI see no beacon of light, I see no savior, I see no god.\n\n\nVI. REMINISCE\n\nEvery time I wake up\nI stare for hours, realizing\nI'm still carrying all these problems.\nLike an empty shell\nWaking up, drained, thinking 'bout my mistakes, regrets, all I've done\nSurrounded by sins.\nBlood-soaked.\n\nConstantly asking myself\nAm I a fucking mistake?\nBlaming myself for always failing,\nI should not have been born. I should not exist.\n\nFighting my demon... for eternity,\nBut this demon overtakes my head.\nI can't win this war. No, I can't.\n\nMemories of my childhood\nFlashing in front of my eyes.\nI was okay, I was fine.\nNo burden to carry, no problem to face.\n\nPromise me that I'll be okay...\nPromise me one more time,\nThat life will be just fine.\nI'm scared.\n\n\nVII. BLOOD OATH\n\nEternity!\nAdored by all, pursued in strife,\nA goddess, fierce and bright,\nWho beckons me to Valhalla's light.\n\nThrough endless dust, I do not fall,\nFor faith in you sustains my soul;\nYour presence weaves the celestial grace,\nA glimpse of heaven in your face.\n\nVeiled in shadows, a secret untold,\nI wander far, my heart grown bold,\nTo grasp your hand, to touch the skies,\nTo know eternity through your eyes.\n\nWe dance like wind, untamed, unknown,\nA wayward course, yet fate is sewn;\nBeneath the stars, our gaze aligned,\nRemember well— a glorious end we find.\n\nBeneath the veil of time we soar,\nTwo souls entwined forevermore.\nIn every whisper, every glance,\nWe drift through realms in sacred dance.\n\nFor though the winds may change their way,\nOur hearts, unshaken, never stray.\nAn endless journey, night and day,\nToward the dawn where our dreams will stay.\n\n\nVIII. THE PYRE'S EMBRACE\n\nA symphony of darkness, an ode to their demise. A hymn of grace, a celebration of death\n\nI put your father met his tragic fate, 6 feet down, sealed in a tale of hate.\nThe fourth-dimension bows, as I wield the time, sinister flow, an eternity to devour.\n\nGod's feeble reign crumbled, beneath my relentless might,\nWith my hands raised high, I shattered the divine light.\n\nKerosene-laden air, an infernal reality unfolds, the flames dance as your family's story unfolds.\n\nA symphony of darkness, an ode to their demise. A hymn of grace, a celebration of death.\n\nBehold the carnage, a cesspool of despair, a cacophony in the smoky air.\nNo escape and no respite, their destiny now sealed, in the pyre's embrace, their anguish is now revealed.\n\nBut amidst this blood-soaked stage, a song shall arise\n\n\nIX. BIONIC FLESH\n\nA fighting survival sequence\nFull of living human, struggling to live\nTrapped in a constant system\nDecades of oath, for the need to fill up the stomach\n\nI've told you before, that the world we live in is the absolute literal hell\nWe suffocate, we are drowned\nTrying to escape the rope and tide\nBut, no! It's getting tighter\n\nA normatic dilemma\nWill we be okay to suffer and survive?\nOr avoid the torture, to get another form of torture?\n\nWe're just the victim of our curse\nOh, such a bionic flesh\nThe machine for the rich\nWorking endlessly\n\n\nX. STUBBORN DAMNATION\n\nPray for your soul\nTho we know it can't be cured and decided\nPray for your soul\nIt's rotten already, soaked in scum of sin\n\nYou seek for a rescue in the false entity\nA whole schizophrenic product of the untruth\nFor you know it's a take from a liar's tongue\nHave I ever told you that you're god for yourself?\nHave I ever told you that you're a savior for yourself?\n\nHow it feels like to fall into the cesspool of failure?\nPlease, take as much time as you need\nTo finally wake up from this paradigm of lies\nYou're blinded in a scheme of religious dogma\nYou're also numbed by a radical lined elegy\n\nPray for your soul\nTho we know it can't be cured and decided\nPray for your soul\nIt's rotten already, soaked in scum of sin\n\nPost hoc ergo propter hoc\nIs your fucking brain even work\nA Logical Fallacy\nWhere the hell is your common sense\nPost hoc ergo propter hoc\nA Logical Fallacy\n\nYou're blinded in a scheme of religious dogma\nYou're also numbed by a radical lined elegy\n\nPray for your soul\nPray for your soul",
    credits: [
      "Recorded at Vengeance Record",
      "Mixed by Vengeance Record",
      "Mastered by Vengeance Record",
      "Artwork by OBELISK'S TORMENTOR",
    ],
    links: {
      spotify: "https://open.spotify.com/album/0qOCageU6V5lAjWV2BVMVy",
      bandcamp: "https://obeliskstormentor.bandcamp.com/album/forged-beyond-death",
    },
  },
]

export function getReleaseById(id: string): Release | undefined {
  return releases.find((r) => r.id === id)
}

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]

/**
 * The band's designation for a release: albums are numbered Artifacts, anything
 * shorter is an unnumbered Fragment.
 *
 * Numbering counts albums only, and deliberately NOT the position in this array.
 * The singles are folded into the album that collects them and then drop off the
 * site, so an index-based numeral would silently renumber every earlier release
 * and make old posts and screenshots wrong. "Fragment" also comes from the Lore
 * page's own wording ("Fragments remain"), so a single being absorbed later
 * reads as intended rather than as deletion.
 */
export function releaseLabel(release: Release): string {
  if (release.type !== "album") return "Fragment"
  const n = releases.filter((r) => r.type === "album").findIndex((r) => r.id === release.id)
  return `Artifact ${numerals[n] ?? n + 1}`
}
