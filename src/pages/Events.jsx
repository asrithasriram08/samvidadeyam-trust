import React from 'react'
import { NavLink } from 'react-router-dom'

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
          <div className="grid grid--3 events-grid">
            <article className="card card--plain">
              <h3>Vedic Practice Session</h3>
              <p>Regular weekend chanting sessions for continuous learning.</p>
              <NavLink to="/gallery#gallery-vedic-practice-session" className="btn btn--outline btn--sm">View gallery</NavLink>
            </article>
            <article className="card card--plain">
              <h3>Vedic Chant Events</h3>
              <p>Participate in Vedic Pāṭaśhāla chanting on special occasions.</p>
              <NavLink to="/gallery#gallery-vedic-chant-events" className="btn btn--outline btn--sm">View gallery</NavLink>
            </article>
            <article className="card card--plain">
              <h3>Trust Programmes</h3>
              <p>Programmes for the welfare of Pāṭaśhālas and member families.</p>
              <NavLink to="/gallery#gallery-field-reports" className="btn btn--outline btn--sm">View gallery</NavLink>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
