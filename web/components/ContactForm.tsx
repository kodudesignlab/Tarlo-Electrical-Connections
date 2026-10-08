'use client'

import {useEffect, useRef, useState} from 'react'
import {ArrowUpRight} from './Icons'
import {SERVICE_EVENT} from './Services'

// Not wired to a backend yet: hook up Formspree / a route handler + Resend before launch.
export default function ContactForm({services}: {services: string[]}) {
  const options = [...services, 'Something else']
  const [picked, setPicked] = useState<Set<string>>(new Set())
  const [note, setNote] = useState('No call-out fee for quoted work.')
  const formRef = useRef<HTMLFormElement>(null)

  // A service card was clicked: pre-select it
  useEffect(() => {
    const onPick = (e: Event) => {
      const name = (e as CustomEvent<string>).detail
      setPicked((prev) => new Set(prev).add(name))
    }
    window.addEventListener(SERVICE_EVENT, onPick)
    return () => window.removeEventListener(SERVICE_EVENT, onPick)
  }, [])

  const toggle = (name: string) =>
    setPicked((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = formRef.current!
    if (!form.checkValidity()) {
      setNote('Please add your name and phone number.')
      form.reportValidity()
      return
    }
    setNote('Thanks — Harry will be in touch the same day.')
    form.reset()
    setPicked(new Set())
  }

  return (
    <form ref={formRef} className="split__b form" noValidate onSubmit={onSubmit}>
      <fieldset className="form__full">
        <legend>
          What do you need? <span>Pick any</span>
        </legend>
        <div className="chips">
          {options.map((name) => (
            <button key={name} className="chip" type="button" aria-pressed={picked.has(name)} onClick={() => toggle(name)}>
              {name}
            </button>
          ))}
        </div>
        <input type="hidden" name="services" value={[...picked].join(', ')} />
      </fieldset>
      <label className="field">
        Name
        <input type="text" name="name" autoComplete="name" required />
      </label>
      <label className="field">
        Phone
        <input type="tel" name="phone" autoComplete="tel" required />
      </label>
      <label className="field">
        Email
        <input type="email" name="email" autoComplete="email" />
      </label>
      <label className="field">
        Suburb
        <input type="text" name="suburb" autoComplete="address-level2" />
      </label>
      <label className="field form__full">
        About the job
        <textarea name="message" rows={5} />
      </label>
      <div className="form__full form__foot">
        <span className="form__note" aria-live="polite">
          {note}
        </span>
        <button className="pill pill--lg pill--dark" type="submit">
          Send enquiry <ArrowUpRight />
        </button>
      </div>
    </form>
  )
}
