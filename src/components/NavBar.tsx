import type { ReactElement } from 'react'
import { useState } from 'react'
import { NavBarItem } from './NavBarItem'
import { recitalVisible } from '@/data/recitalVisibility'

const navLinks: { path: string; label: string }[] = [
  { path: '/', label: 'Home' },
  { path: '/classes', label: 'Classes' },
  { path: '/staff', label: 'Staff' },
  { path: '/gallery', label: 'Gallery' },
  ...(recitalVisible ? [{ path: '/recital', label: 'Recital' }] : []),
  { path: '/registration', label: 'Register' },
  { path: '/contact', label: 'Contact' },
]

export const NavBar = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false)
  const close = (): void => setIsOpen(false)

  return (
    <nav className="bg-studio-purple sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between px-6">
        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 py-1">
          {navLinks.map(({ path, label }) => (
            <NavBarItem key={path} path={path} onClick={close}>{label}</NavBarItem>
          ))}
        </ul>

        {/* Mobile: logo placeholder + hamburger */}
        <div className="md:hidden flex items-center justify-between w-full py-2">
          <img src="/logo.png" alt="The Next Step Dance Studio" className="h-8 w-auto invert brightness-200" />
          <button
            aria-label="Toggle navigation menu"
            onClick={(): void => setIsOpen(!isOpen)}
            className="text-white p-3"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-purple-800">
          <ul className="flex flex-col divide-y divide-purple-800/50">
            {navLinks.map(({ path, label }) => (
              <NavBarItem key={path} path={path} onClick={close}>{label}</NavBarItem>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
