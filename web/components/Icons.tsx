/* eslint-disable @next/next/no-img-element */

export const ExternalLink = ({className}: {className?: string}) => (
  <img className={className} src="/assets/icons/external-link.svg" width={14} height={14} alt="" />
)

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

export const ArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </svg>
)

export const ArrowUpRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
)

export const QuoteMark = () => (
  <svg width="56" height="44" viewBox="0 0 56 44" aria-hidden="true">
    <path
      d="M0 44V24C0 10 7 2 22 0v8c-7 2-10 6-10 14h10v22H0Zm34 0V24c0-14 7-22 22-24v8c-7 2-10 6-10 14h10v22H34Z"
      fill="#FEC20E"
    />
  </svg>
)

/** "0412 345 678" -> "tel:0412345678" */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '') || phone}`
