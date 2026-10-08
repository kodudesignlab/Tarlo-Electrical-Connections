'use client'
/* eslint-disable @next/next/no-img-element */

import type {Service} from '@/lib/content'
import {ExternalLink} from './Icons'

export const SERVICE_EVENT = 'tarlo:service'

const ICONS = new Set(['sliders', 'plug', 'fan', 'alarm', 'power-off', 'house-wifi', 'ev'])

// Clicking a service jumps to the form with that service pre-selected.
export default function Services({services}: {services: Service[]}) {
  return (
    <div className="services" data-reveal>
      {services.map((s, i) => (
        <a
          key={`${s.name}-${i}`}
          className="service"
          href="#contact"
          onClick={() => window.dispatchEvent(new CustomEvent(SERVICE_EVENT, {detail: s.name}))}
        >
          <div className="service__top">
            <img src={`/assets/icons/${ICONS.has(s.icon) ? s.icon : 'plug'}.svg`} width={26} height={26} alt="" />
            <span className="service__num">{String(i + 1).padStart(2, '0')}</span>
          </div>
          <div className="service__bottom">
            <p className="service__name">{s.name}</p>
            <ExternalLink className="service__go" />
          </div>
        </a>
      ))}
    </div>
  )
}
