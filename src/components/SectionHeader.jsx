import React from 'react'

export default function SectionHeader({ eyebrow, title, body, center = false, dark = false, className = '' }) {
  return (
    <div className={`section-header${center ? ' section-header--center' : ''}${className ? ` ${className}` : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h2>{title}</h2>}
      {body && <p className={dark ? 'lede' : 'lede'}>{body}</p>}
    </div>
  )
}
