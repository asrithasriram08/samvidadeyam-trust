import React, { useMemo, useState } from 'react'
import SectionHeader from '../components/SectionHeader.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import Tabs from '../components/Tabs.jsx'
import ActivityCard from '../components/ActivityCard.jsx'
import MissionCard from '../components/MissionCard.jsx'
import { activities, mission, inAction } from '../data/siteContent.js'

export default function Activities() {
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return activities.items
    return activities.items.filter((a) => a.category === filter)
  }, [filter])

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Activities</span>
          <h1 style={{ marginTop: '0.85rem' }}>Mission, focus areas &amp; approach</h1>
          <p>
            Three commitments guide everything Samvidadeyam does — and five focus areas put those
            commitments into practice.
          </p>
        </div>
      </section>

      {/* Mission pillars */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader eyebrow={mission.eyebrow} title={mission.title} />
          </ScrollReveal>
          <div className="grid grid--3">
            {mission.pillars.map((m, i) => (
              <ScrollReveal key={m.title} delay={i * 80}>
                <MissionCard title={m.title} body={m.body} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Focus areas with filter */}
      <section className="section section--tint">
        <div className="container">
          <ScrollReveal>
            <SectionHeader eyebrow={activities.eyebrow} title={activities.title} />
          </ScrollReveal>

          <Tabs options={activities.filters} active={filter} onChange={setFilter} />

          <div className="grid grid--3">
            {filtered.map((a) => (
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
