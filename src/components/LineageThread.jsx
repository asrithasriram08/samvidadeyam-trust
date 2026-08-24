import React from 'react'

/**
 * The site's one signature visual: a flowing, hand-drawn-feeling thread with
 * small nodes — standing in for the guru-śiṣya paramparā (the person-to-person
 * transmission of Vedic knowledge). Used sparingly: once in the hero as an
 * ambient backdrop, once in the "Knowledge Lineage" section on the About page.
 */
export default function LineageThread({ variant = 'hero', className = '' }) {
  if (variant === 'hero') {
    return null
  }

  // 'panel' variant — used inside the dark Knowledge Lineage section
  return (
    <svg
      className={className}
      viewBox="0 0 800 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 80 C 140 20, 220 140, 340 80 S 540 20, 660 80 S 760 140, 780 80"
        stroke="var(--sky)"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
    </svg>
  )
}
