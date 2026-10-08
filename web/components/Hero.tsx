'use client'
/* eslint-disable @next/next/no-img-element */

import {useRef, useState} from 'react'
import {ExternalLink, telHref} from './Icons'

type Props = {eyebrow: string; heading: string; intro: string; phone: string; avatar: string}

// Dot grid revealed around the mouse. Touch devices keep the soft static glow.
export default function Hero({eyebrow, heading, intro, phone, avatar}: Props) {
  const ref = useRef<HTMLElement>(null)
  const raf = useRef(0)
  const [active, setActive] = useState(false)

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    if (!active) setActive(true)
    if (raf.current) return
    raf.current = requestAnimationFrame(() => {
      raf.current = 0
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
    })
  }

  return (
    <section
      ref={ref}
      id="top"
      className={`hero${active ? ' is-active' : ''}`}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setActive(false)}
    >
      <div className="hero__bg hero__dots hero__dots--base" aria-hidden="true" />
      <div className="hero__bg hero__dots hero__dots--glow" aria-hidden="true" />
      <div className="hero__bg hero__fade" aria-hidden="true" />
      <div className="container hero__content">
        <p className="eyebrow" data-hero-in="1">
          {eyebrow}
        </p>
        <h1 data-hero-in="2">{heading}</h1>
        <div className="hero__foot" data-hero-in="3">
          <div className="hero__intro">
            <img className="avatar" src={avatar} alt="Harry Betts" width={64} height={64} />
            <p>{intro}</p>
          </div>
          <div className="actions">
            <a className="pill pill--lg" href="#contact">
              Get a free quote <ExternalLink />
            </a>
            <a className="pill pill--lg pill--ghost" href={telHref(phone)}>
              Call {phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
