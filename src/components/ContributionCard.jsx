import React from 'react'

export default function ContributionCard({ number, title, body }) {
  return (
    <div className="contribution-card">
      <span className="contribution-card__number">{number}</span>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  )
}
