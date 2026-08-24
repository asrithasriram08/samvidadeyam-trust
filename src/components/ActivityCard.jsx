import React from 'react'

export default function ActivityCard({ number, title, body, note, filled = true }) {
  return (
    <div className="activity-card">
      <span className="activity-card__number">{number}</span>
      <h3>{title}</h3>
      <p>{body}</p>
      {!filled && note && <p className="activity-card__note">{note}</p>}
    </div>
  )
}
