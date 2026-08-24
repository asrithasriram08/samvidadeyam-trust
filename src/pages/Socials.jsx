import React from 'react'
import { media } from '../data/siteContent.js'

export default function Socials() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Socials</span>
          <h1 style={{ marginTop: '0.85rem' }}>Follow the Trust online</h1>
          <p>
            Stay connected with updates, educational content, and glimpses of Vedic learning and
            community activity across our channels.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--2">
            <article className="card card--plain">
              <span className="eyebrow">Platform</span>
              <h3>YouTube</h3>
              <p>{media.body}</p>
              <a href={media.youtubeUrl} target="_blank" rel="noreferrer" className="btn btn--outline" style={{ marginTop:'1rem' }}>
                Visit YouTube
              </a>
            </article>
            <article className="card card--plain">
              <span className="eyebrow">More soon</span>
              <h3>Additional channels</h3>
              <p>Other social channels will be added here as the Trust expands its digital presence.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
