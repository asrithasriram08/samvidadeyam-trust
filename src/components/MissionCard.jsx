import React from 'react'

export default function MissionCard({ title, body }) {
  return (
    <div className="mission-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  )
}
