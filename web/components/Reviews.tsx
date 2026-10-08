'use client'

import {useEffect, useRef, useState} from 'react'
import type {Review} from '@/lib/content'
import {ArrowLeft, ArrowRight, QuoteMark} from './Icons'

const pad = (n: number) => String(n).padStart(2, '0')

export default function Reviews({reviews}: {reviews: Review[]}) {
  const [current, setCurrent] = useState(0)
  const [shown, setShown] = useState(0)
  const [swapping, setSwapping] = useState(false)
  const rowRef = useRef<HTMLOListElement>(null)
  const touch = useRef({x: 0, y: 0})
  const n = reviews.length

  const go = (i: number) => setCurrent(((i % n) + n) % n)

  // Fade the quote out, swap it, fade back in
  useEffect(() => {
    if (current === shown) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setSwapping(true)
    const t = setTimeout(() => {
      setShown(current)
      setSwapping(false)
    }, reduce ? 0 : 220)
    return () => clearTimeout(t)
  }, [current, shown])

  // Keep the active name in view when the names are a horizontal swiper (mobile)
  useEffect(() => {
    const row = rowRef.current
    if (!row || row.scrollWidth <= row.clientWidth) return
    const li = row.children[current] as HTMLElement | undefined
    if (!li) return
    const padL = parseFloat(getComputedStyle(row).paddingLeft) || 0
    row.scrollTo({left: li.offsetLeft - row.offsetLeft - padL, behavior: 'smooth'})
  }, [current])

  if (!n) return null
  const r = reviews[shown] ?? reviews[0]

  return (
    <div className="reviews" data-reveal>
      <figure
        className={`review-feature${swapping ? ' is-swapping' : ''}`}
        onTouchStart={(e) => (touch.current = {x: e.touches[0].clientX, y: e.touches[0].clientY})}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touch.current.x
          const dy = e.changedTouches[0].clientY - touch.current.y
          if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) go(current + (dx < 0 ? 1 : -1))
        }}
      >
        <div>
          <QuoteMark />
          <blockquote aria-live="polite">{r.quote}</blockquote>
        </div>
        <div className="review-feature__foot">
          <figcaption>
            <strong>{r.name}</strong>{' '}
            <span className="review-feature__meta">— {[r.suburb, r.job].filter(Boolean).join(' · ')}</span>
          </figcaption>
          {n > 1 && (
            <div className="review-feature__controls">
              <span className="review-feature__count">
                {pad(current + 1)} / {pad(n)}
              </span>
              <button className="pill pill--ghost pill--icon" type="button" aria-label="Previous review" onClick={() => go(current - 1)}>
                <ArrowLeft />
              </button>
              <button className="pill pill--icon" type="button" aria-label="Next review" onClick={() => go(current + 1)}>
                <ArrowRight />
              </button>
            </div>
          )}
        </div>
      </figure>
      {n > 1 && (
        <ol className="review-index" role="tablist" aria-label="Reviews" ref={rowRef}>
          {reviews.map((rev, i) => (
            <li key={i}>
              <button
                className="review-tab"
                type="button"
                role="tab"
                aria-selected={i === current}
                onClick={() => go(i)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(current + 1) }
                  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(current - 1) }
                }}
              >
                <span className="review-tab__num">{pad(i + 1)}</span>
                <span className="review-tab__name">{rev.name}</span>
                <span className="review-tab__meta">{rev.suburb}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
