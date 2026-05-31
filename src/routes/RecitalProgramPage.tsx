import { useState, useMemo } from 'react'
import type { ReactElement } from 'react'
import { Link } from 'react-router'
import { Helmet } from 'react-helmet-async'
import { SeniorSpotlight } from '@components/SeniorSpotlight'
import recital from '@data/recital'
import recitalProgram from '@data/recitalProgram'
import type { PerformanceEntry, ProgramEntry, SectionEntry } from '@data/recitalProgram'
import { classes } from '@data/classes'

export default function RecitalProgramPage(): ReactElement {
  const [activeShowIndex, setActiveShowIndex] = useState(0)
  const [search, setSearch] = useState('')
  const [activeStyle, setActiveStyle] = useState('all')

  const { title, shows } = recitalProgram
  const activeShow = shows?.[activeShowIndex] ?? null

  // Unique styles present across all shows, in class order
  const availableStyles = useMemo(() => {
    if (!shows) return []
    const usedIds = new Set<string>()
    for (const show of shows) {
      for (const entry of show.entries) {
        if (entry.type === 'performance') usedIds.add(entry.styleId)
      }
    }
    return classes.filter((c) => usedIds.has(c.id))
  }, [shows])

  const isFiltering = search.trim().length > 0 || activeStyle !== 'all'

  // Single filtered list — structural entries always pass, performances are filtered
  const visibleEntries = useMemo<ProgramEntry[]>(() => {
    if (!activeShow) return []
    if (!isFiltering) return activeShow.entries

    const q = search.trim().toLowerCase()

    return activeShow.entries.filter((entry) => {
      if (entry.type === 'intermission' || entry.type === 'section') return false

      const styleMatch = activeStyle === 'all' || entry.styleId === activeStyle
      if (!styleMatch) return false

      if (!q) return true

      return (
        entry.title.toLowerCase().includes(q) ||
        (entry.group?.toLowerCase().includes(q) ?? false) ||
        (entry.dancers?.some((d) => d.toLowerCase().includes(q)) ?? false)
      )
    })
  }, [activeShow, isFiltering, search, activeStyle])

  const hasResults = visibleEntries.some((e) => e.type === 'performance')

  function handleShowChange(index: number) {
    setActiveShowIndex(index)
    setSearch('')
    setActiveStyle('all')
  }

  return (
    <>
      <Helmet>
        <title>Recital Program — Next Step Dance Studio</title>
        <meta
          name="description"
          content={`${title} — full performance program for Next Step Dance Studio.`}
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-studio-purple px-6 pt-10 pb-12 text-center">
        <Link
          to="/recital"
          className="inline-flex items-center gap-1.5 text-purple-400 text-sm hover:text-purple-200 transition-colors mb-6"
        >
          ← Recital Overview
        </Link>
        <h1 className="font-serif text-4xl sm:text-5xl text-white font-semibold mb-2">{title}</h1>
        <p className="text-purple-400 text-sm">Full Performance Program</p>

        {/* Show tabs */}
        {shows && shows.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-7">
            {shows.map((show, i) => (
              <button
                key={show.id}
                onClick={() => handleShowChange(i)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeShowIndex === i
                    ? 'bg-white text-studio-purple'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                {show.label}
              </button>
            ))}
          </div>
        )}
      </section>

      <div className="bg-studio-lavender py-14 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">

          {/* Coming soon state */}
          {!shows && (
            <div className="text-center py-20">
              <div className="text-studio-pink text-4xl mb-5">✦</div>
              <h2 className="font-serif text-2xl text-studio-purple font-semibold mb-3">
                Program Coming Soon
              </h2>
              <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                The full performance lineup will be published closer to recital day. Check back
                here!
              </p>
            </div>
          )}

          {/* Active show */}
          {activeShow && (
            <>
              {/* Search & filter */}
              <section className="flex flex-col gap-3">
                <div className="relative">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by dancer name, song, or class..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 rounded-xl border border-purple-100 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-studio-purple-mid placeholder-gray-400 shadow-sm"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {availableStyles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <StylePill
                      label="All"
                      active={activeStyle === 'all'}
                      onClick={() => setActiveStyle('all')}
                    />
                    {availableStyles.map((cls) => (
                      <StylePill
                        key={cls.id}
                        label={cls.title}
                        active={activeStyle === cls.id}
                        onClick={() => setActiveStyle(cls.id)}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* Program list */}
              <section>
                {isFiltering && !hasResults ? (
                  <div className="text-center py-14 text-gray-400">
                    <p className="text-sm">No performances matched your search.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {visibleEntries.map((entry, i) => {
                      if (entry.type === 'section') {
                        return <SectionDivider key={`section-${entry.label}`} entry={entry} />
                      }
                      if (entry.type === 'intermission') {
                        return <IntermissionRow key={`intermission-${i}`} />
                      }
                      return <PerformanceRow key={entry.number} entry={entry} />
                    })}
                  </div>
                )}
              </section>
            </>
          )}

          {/* Senior Spotlight */}
          <SeniorSpotlight seniors={recital.seniors} />

        </div>
      </div>
    </>
  )
}

function StylePill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}): ReactElement {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
        active
          ? 'bg-studio-purple text-white'
          : 'bg-white text-studio-purple border border-purple-200 hover:border-studio-purple-mid'
      }`}
    >
      {label}
    </button>
  )
}

function SectionDivider({ entry }: { entry: SectionEntry }): ReactElement {
  return (
    <div className="flex items-center gap-4 mt-6 mb-1 first:mt-0">
      <div className="h-px flex-1 bg-purple-200" />
      <span className="font-serif text-studio-purple font-semibold text-lg whitespace-nowrap">
        {entry.label}
      </span>
      <div className="h-px flex-1 bg-purple-200" />
    </div>
  )
}

function IntermissionRow(): ReactElement {
  return (
    <div className="flex items-center gap-4 my-4">
      <div className="h-px flex-1 bg-studio-purple/20" />
      <span className="text-studio-purple-mid font-semibold tracking-widest text-xs uppercase shrink-0">
        ✦ Intermission ✦
      </span>
      <div className="h-px flex-1 bg-studio-purple/20" />
    </div>
  )
}

function PerformanceRow({ entry }: { entry: PerformanceEntry }): ReactElement {
  const styleLabel = classes.find((c) => c.id === entry.styleId)?.title

  return (
    <div className="bg-white rounded-xl px-5 py-4 flex gap-4 items-start shadow-sm border border-purple-50">
      <span className="font-serif text-2xl font-bold text-studio-purple-mid w-9 flex-shrink-0 text-right leading-tight pt-0.5">
        {String(entry.number).padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <h3 className="font-semibold text-studio-purple">{entry.title}</h3>
          {styleLabel && (
            <span className="text-xs bg-studio-purple-light text-studio-purple-mid font-semibold px-2.5 py-0.5 rounded-full">
              {styleLabel}
            </span>
          )}
        </div>
        {entry.group && <p className="text-sm text-gray-500 mt-0.5">{entry.group}</p>}
        {entry.dancers && entry.dancers.length > 0 && (
          <p className="text-sm text-gray-400 mt-1">{entry.dancers.join(', ')}</p>
        )}
        {entry.description && (
          <p className="text-sm text-gray-400 mt-1.5 italic leading-relaxed">{entry.description}</p>
        )}
      </div>
    </div>
  )
}
