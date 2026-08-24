import React from 'react'
import { media } from '../data/siteContent.js'

export default function Youtube() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{media.eyebrow}</span>
          <h1 style={{ marginTop: '0.85rem' }}>{media.title}</h1>
          <p>{media.body}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card card--plain">
            <p className="lede">Visit the official YouTube channel for current videos and future updates.</p>
            <a href={media.youtubeUrl} target="_blank" rel="noreferrer" className="btn btn--primary">
              Open YouTube Channel
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
