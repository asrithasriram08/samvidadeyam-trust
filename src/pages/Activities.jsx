import React from 'react'
import SectionHeader from '../components/SectionHeader.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import ActivityCard from '../components/ActivityCard.jsx'
import { activities, inAction } from '../data/siteContent.js'

export default function Activities() {
  const visibleActivities = activities.items.filter(
    (activity) => activity.id !== 'cultural-preservation',
  )

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Activities</span>
          <h1 style={{ marginTop: '0.85rem' }}>Mission, focus areas &amp; approach</h1>
          <p>
            Our commitments guide everything Samvidadeyam does — and four focus areas put those
            commitments into practice.
          </p>
        </div>
      </section>

      {/* Focus areas */}
      <section className="section section--tint">
        <div className="container">
          <ScrollReveal>
            <SectionHeader eyebrow={activities.eyebrow} title={activities.title} />
          </ScrollReveal>

          <div className="grid grid--3">
            {visibleActivities.map((a) => (
              <ActivityCard key={a.id} {...a} />
            ))}
          </div>
        </div>
      </section>

      {/* Approach / trust markers */}
      <section className="section section--dark">
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow">{inAction.eyebrow}</span>
            <h2 style={{ margin: '0.85rem 0 1.5rem', maxWidth: '24ch' }}>{inAction.title}</h2>
          </ScrollReveal>

          <div className="split">
            <ScrollReveal>
              <ul className="list-plain">
                {inAction.beliefs.map((b, i) => (
                  <li key={i} style={{ color: 'var(--text-on-dark-soft)' }}>{b}</li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="marker-row">
                {inAction.markers.map((m) => (
                  <div className="marker" key={m.title}>
                    <h4>{m.title}</h4>
                    <p>{m.body}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
