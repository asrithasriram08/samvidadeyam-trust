import React from 'react'
import SectionHeader from '../components/SectionHeader.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import LineageThread from '../components/LineageThread.jsx'
import { AccordionItem } from '../components/Accordion.jsx'
import { essence, coreBelief, trustees, vision, lineage } from '../data/siteContent.js'

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

      {/* Essence */}
      <section className="section">
        <div className="container">
          <div className="split">
            <ScrollReveal>
              <span className="eyebrow">{essence.eyebrow}</span>
              <h2 style={{ margin: '0.85rem 0 1.25rem' }}>{essence.title}</h2>
              {essence.paragraphs.map((p, i) => (
                <p key={i} className="lede" style={{ marginBottom: '1rem' }}>{p}</p>
              ))}
            </ScrollReveal>
            <ScrollReveal delay={100} className="split__visual">
              <div className="essence-gallery">
                {essence.images.map((image) => (
                  <figure key={image.src} className="essence-gallery__item">
                    <img src={image.src} alt={image.alt} loading="lazy" />
                    <figcaption>{image.title}</figcaption>
                  </figure>
                ))}
              </div>
            </ScrollReveal>
          </div>
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

      {/* Vision */}
      <section className="section">
        <div className="container">
          <div className="split split--reverse">
            <ScrollReveal className="split__visual">
              <div className="editorial-figure">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g stroke="var(--sky)" strokeOpacity="0.55" strokeWidth="1">
                    <circle cx="100" cy="100" r="82" />
                    <circle cx="100" cy="100" r="60" />
                    <circle cx="100" cy="100" r="38" />
                  </g>
                  <circle cx="100" cy="18" r="4" fill="var(--gold)" />
                  <circle cx="182" cy="100" r="4" fill="var(--gold)" />
                  <circle cx="100" cy="182" r="4" fill="var(--gold)" />
                  <circle cx="18" cy="100" r="4" fill="var(--gold)" />
                </svg>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <span className="eyebrow">{vision.eyebrow}</span>
              <h2 style={{ margin: '0.85rem 0 1.25rem' }}>{vision.title}</h2>
              <p className="lede" style={{ marginBottom: '1.5rem' }}>{vision.body}</p>
              <ul className="list-plain">
                {vision.pillars.map((p) => (
                  <li key={p.title}><strong>{p.title}</strong> — {p.note}</li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Knowledge lineage — signature element, second and final use */}
      <section className="section section--dark">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <span className="eyebrow">{lineage.eyebrow}</span>
            <h2 style={{ margin: '0.85rem auto 1rem', maxWidth: '30ch' }}>{lineage.title}</h2>
            <p className="lede" style={{ margin: '0 auto 2rem' }}>{lineage.body}</p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="lineage">
              <LineageThread variant="panel" />
              <div className="lineage__nodes">
                {lineage.nodes.map((n) => (
                  <div className="lineage__node" key={n}>
                    <span className="lineage__dot" aria-hidden="true" />
                    <span className="lineage__label">{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
