import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ActivityCard({ number, title, body, note, link, filled = true }) {
  return (
    <div className="activity-card">
      <span className="activity-card__number">{number}</span>
      <h3>{title}</h3>
      <p>{body}</p>
      {!filled && note && <p className="activity-card__note">{note}</p>}
      {link && <NavLink className="activity-card__link" to={link.to}>{link.label}</NavLink>}
    </div>
  )
}
