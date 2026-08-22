import recitalContent from '../content/recital.json'

export type Senior = {
  name: string
  photo?: string | null
  bio?: string | null
  quote?: string | null
  classOf?: number
  yearsAtStudio?: number
  styles?: string[]
}

type RecitalData = {
  /** false hides the Recital pages and their nav/footer links site-wide */
  visible: boolean
  season: string
  showTimes: string | null
  eventDate: string | null
  venue: string | null
  venueMapLink: string | null
  tickets: {
    generalAdmission: string | null
    reservedSeating: string | null
    salesOpenDateTime: string | null
    ticketLink: string | null
  }
  seniors: Senior[] | null
}

// Convert empty strings from CMS to null for "coming soon" handling
function nullIfEmpty(val: string | null | undefined): string | null {
  if (!val || val.trim() === '') return null
  return val
}

const raw = recitalContent as RecitalData

const recital: RecitalData = {
  ...raw,
  // Default to visible so content saved before this flag existed still renders
  visible: raw.visible !== false,
  showTimes: nullIfEmpty(raw.showTimes),
  eventDate: nullIfEmpty(raw.eventDate),
  venue: nullIfEmpty(raw.venue),
  venueMapLink: nullIfEmpty(raw.venueMapLink),
  tickets: {
    generalAdmission: nullIfEmpty(raw.tickets.generalAdmission),
    reservedSeating: nullIfEmpty(raw.tickets.reservedSeating),
    salesOpenDateTime: nullIfEmpty(raw.tickets.salesOpenDateTime),
    ticketLink: nullIfEmpty(raw.tickets.ticketLink),
  },
}

export default recital
