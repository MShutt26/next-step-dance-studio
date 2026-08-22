import announcementContent from '../content/announcement.json'

export type Announcement = {
  enabled: boolean
  headline: string
  subtext: string | null
  buttonLabel: string | null
  buttonLink: string | null
}

// Convert empty strings from CMS to null so the banner can drop optional pieces
function nullIfEmpty(val: string | null | undefined): string | null {
  if (!val || val.trim() === '') return null
  return val
}

const raw = announcementContent as Announcement

const announcement: Announcement = {
  ...raw,
  subtext: nullIfEmpty(raw.subtext),
  buttonLabel: nullIfEmpty(raw.buttonLabel),
  buttonLink: nullIfEmpty(raw.buttonLink),
}

/** CMS links may point off-site (e.g. an external registration portal). */
export function isExternalLink(link: string): boolean {
  return /^https?:\/\//i.test(link)
}

export default announcement
