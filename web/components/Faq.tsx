'use client'
/* eslint-disable @next/next/no-img-element */

import {useId, useState} from 'react'
import type {Faq as FaqItem} from '@/lib/content'

// One answer open at a time; the second question starts open.
export default function Faq({faqs}: {faqs: FaqItem[]}) {
  const [open, setOpen] = useState(faqs.length > 1 ? 1 : 0)
  const id = useId()

  return (
    <div className="split__b faq" data-reveal>
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={i} className={`faq__item${isOpen ? ' is-open' : ''}`}>
            <h3 style={{margin: 0}}>
              <button
                className="faq__q"
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="faq__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq__text">{f.question}</span>
                <span className="faq__icon">
                  <img src="/assets/icons/plus.svg" width={44} height={44} alt="" />
                </span>
              </button>
            </h3>
            <div className="faq__panel" id={`${id}-${i}`} role="region">
              <div>
                <p>{f.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
