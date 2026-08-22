import type { ReactElement } from 'react'
import { Link } from 'react-router'
import { recitalVisible } from '@/data/recitalVisibility'

export const Footer = (): ReactElement => {
  return (
    <footer className="bg-studio-purple text-purple-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-3">
        {/* Brand */}
        <div>
          <p className="font-serif text-xl text-white font-semibold mb-1">Next Step</p>
          <p className="text-xs uppercase tracking-widest text-pink-300 font-semibold mb-3">
            Dance Studio
          </p>
          <p className="text-sm text-purple-300 leading-relaxed">
            Building confident dancers with a foundation that lasts a lifetime — on and off the dance
            floor.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-white font-semibold text-sm uppercase tracking-widest mb-3">
            Quick Links
          </h2>
          <ul className="flex flex-col gap-1.5 text-sm">
            {[
              { to: '/classes', label: 'Classes' },
              { to: '/staff', label: 'Our Staff' },
              ...(recitalVisible ? [{ to: '/recital', label: 'Recital' }] : []),
              { to: '/registration', label: 'Register' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-purple-300 hover:text-studio-pink transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-white font-semibold text-sm uppercase tracking-widest mb-3">
            Contact Us
          </h2>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-purple-300">Birdsboro, PA</p>
            <a href="tel:6105822111" className="text-purple-300 hover:text-studio-pink transition-colors">
              (610) 582-2111
            </a>
            <a
              href="mailto:missy@thenextstepdance.com"
              className="text-purple-300 hover:text-studio-pink transition-colors break-all"
            >
              missy@thenextstepdance.com
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-purple-800 px-6 py-4">
        <p className="text-center text-xs text-purple-400">
          &copy; {new Date().getFullYear()} Next Step Dance Studio. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
