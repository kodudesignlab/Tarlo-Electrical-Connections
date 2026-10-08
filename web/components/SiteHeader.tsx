'use client'
/* eslint-disable @next/next/no-img-element */

import {useEffect, useState} from 'react'
import {ExternalLink} from './Icons'

const LINKS = [
  ['#services', 'Services'],
  ['#about', 'About'],
  ['#process', 'How we work'],
  ['#reviews', 'Reviews'],
  ['#faq', 'FAQ'],
] as const

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll while the mobile menu is open; Escape closes it
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <a className="brand" href="#top" aria-label="Tarlo Electrical Connections, home">
          <img src="/assets/tarlo-logo-black.svg" alt="Tarlo" width={168} height={30} />
          <span className="brand__tag">
            Electrical
            <br />
            Connections
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
        </button>
        <nav
          className={`nav${open ? ' is-open' : ''}`}
          id="nav"
          aria-label="Main"
          onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}
        >
          {LINKS.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          <a className="pill" href="#contact">
            Get a quote <ExternalLink />
          </a>
        </nav>
      </div>
    </header>
  )
}
