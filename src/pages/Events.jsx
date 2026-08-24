import React from 'react'

export default function Events() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Events</span>
          <h1 style={{ marginTop: '0.85rem' }}>Upcoming gatherings and Vedic learning events</h1>
          <p>
            Samvidadeyam hosts and supports events that deepen understanding, strengthen community,
            and keep Vedic teaching alive in practice.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            <article className="card card--plain">
              <span className="eyebrow">Coming soon</span>
              <h3>Community Satsang</h3>
              <p>Gatherings for reflection, scriptural learning, and shared practice.</p>
            </article>
            <article className="card card--plain">
              <span className="eyebrow">Coming soon</span>
              <h3>Vedic Chant Events</h3>
              <p>Listening sessions and recitation events rooted in oral tradition.</p>
            </article>
            <article className="card card--plain">
              <span className="eyebrow">Coming soon</span>
              <h3>Trust Programmes</h3>
              <p>Partner-led programmes that support students, scholars, and communities.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
