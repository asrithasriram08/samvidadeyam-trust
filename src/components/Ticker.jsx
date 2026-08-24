import React from 'react'
import { ticker } from '../data/siteContent.js'

export default function Ticker() {
  const groups = Array.from({ length: 8 }, (_, groupIndex) => (
    ticker.items.map((item, itemIndex) => (
      <span className="ticker__item" key={`${groupIndex}-${item}-${itemIndex}`}>{item}</span>
    ))
  ))

  return (
    <div className="ticker" role="marquee" aria-label="Announcements">
      <div className="ticker__track">
        {groups.map((group, groupIndex) => (
          <div className="ticker__group" key={groupIndex} aria-hidden={groupIndex > 0}>
            {group}
          </div>
        ))}
      </div>
    </div>
  )
}
