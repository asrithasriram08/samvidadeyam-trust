import React from 'react'
import { NavLink } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import { AccordionItem } from '../components/Accordion.jsx'
import { coreBelief, trustees, lineage } from '../data/siteContent.js'

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About the Trust</span>
          <h1 style={{ marginTop: '0.85rem' }}>Rooted in Sanātana Dharma</h1>
          <p>
            Samvidadeyam is dedicated to the preservation, propagation, and living practice of Vedic
            knowledge, with a special focus on nurturing and supporting Veda Pāṭaśhālas — the
            traditional centres of Vedic learning.
          </p>
        </div>
      </section>

      {/* Core Belief */}
      <section className="section section--tint">
        <div className="container">
          <ScrollReveal>
            <SectionHeader eyebrow={coreBelief.eyebrow} title={coreBelief.title} />
          </ScrollReveal>

          <div className="grid grid--2" style={{ alignItems: 'start' }}>
            <ScrollReveal>
              <div className="sanskrit-block">
                <p style={{ marginBottom: '0.75rem', color: 'var(--text-on-dark-soft)' }}>{coreBelief.intro}</p>
                <p className="sanskrit-block__verse sanskrit">{coreBelief.sanskrit}</p>
                <p className="sanskrit-block__translation">{coreBelief.translation}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <AccordionItem title="What does “Samvidadeyam” mean?" defaultOpen>
                <p>{coreBelief.reveal}</p>
              </AccordionItem>
              <AccordionItem title={trustees.title}>
                <p>{trustees.intro}</p>
                <p>{trustees.note}</p>
                <NavLink to="/trustees" className="btn btn--outline btn--sm">View Trustees</NavLink>
              </AccordionItem>
              <AccordionItem title="Why does this teaching guide the Trust?">
                <p>
                  Each phrase in the verse describes a quality of giving — faith, generosity,
                  humility, dharma-consciousness. Samvidadeyam takes the last of these,
                  <em> understanding</em>, as its name and its discipline: every contribution the
                  Trust channels is meant to be made — and received — with awareness.
                </p>
              </AccordionItem>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Knowledge lineage */}
      <section className="section section--dark">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <span className="eyebrow">{lineage.eyebrow}</span>
            <h2 className="lineage-title" style={{ margin: '0.85rem auto 1rem' }}>{lineage.title}</h2>
          </ScrollReveal>
        </div>
      </section>

    </>
  )
}
