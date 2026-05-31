import rawData from '../content/recitalProgram.json'

export type PerformanceEntry = {
  type: 'performance'
  number: number
  title: string
  /** Must match a class `id` from src/data/classes.ts */
  styleId: string
  /** The performing class or group, e.g. "Junior Jazz", "Teen Tap Company" */
  group?: string
  /** Dancer names shown below the group name */
  dancers?: string[]
  /** Optional short description displayed beneath the dancer names */
  description?: string
}

export type IntermissionEntry = {
  type: 'intermission'
}

export type SectionEntry = {
  type: 'section'
  label: string
}

export type ProgramEntry = PerformanceEntry | IntermissionEntry | SectionEntry

export type Show = {
  id: string
  /** Shown on the tab button, e.g. "Show 1 — 10:00 AM" */
  label: string
  entries: ProgramEntry[]
}

export type RecitalProgram = {
  title: string
  season: string
  /** null = display "Program coming soon" */
  shows: Show[] | null
}

const { title, season, shows: rawShows } = rawData as {
  title: string
  season: string
  shows: Show[]
}

const recitalProgram: RecitalProgram = {
  title,
  season,
  shows: rawShows.length > 0 ? rawShows : null,
}

export default recitalProgram
