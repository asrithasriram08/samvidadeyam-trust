import React from 'react'
import SectionHeader from '../components/SectionHeader.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import ContributionCard from '../components/ContributionCard.jsx'
import DonationCard from '../components/DonationCard.jsx'
import { contributePage, getInvolved } from '../data/siteContent.js'

export default function Contribute() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{contributePage.eyebrow}</span>
          <h1 style={{ marginTop: '0.85rem' }}>{contributePage.headline}</h1>
          <p>{contributePage.supporting}</p>
        </div>
      </section>

      {/* Ways to contribute */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader eyebrow="Ways to Contribute" title="Four ways to give" />
          </ScrollReveal>
          <div className="grid grid--2">
            {contributePage.ways.map((w, i) => (
              <ScrollReveal key={w.title} delay={i * 60}>
                <ContributionCard {...w} />
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* Donation details */}
      <section className="section section--tint" id="donate">
        <div className="container">
          <div className="grid grid--2" style={{ alignItems: 'start' }}>
            <ScrollReveal>
              <span className="eyebrow">Donate Now</span>
              <h2 style={{ margin: '0.85rem 0 1.25rem' }}>Support the cause directly</h2>
              <p className="lede" style={{ marginBottom: '1.5rem' }}>
                Use the bank details alongside for a direct bank transfer. Account details are
                copyable — tap the copy buttons on the panel to avoid mistyping any digits.
              </p>
              <p style={{ color: 'var(--text-faint)', fontSize: '0.9rem' }}>
                For any method beyond direct bank transfer, please <a href="/contact" style={{ color: 'var(--indigo)', textDecoration: 'underline' }}>get in touch</a> directly.
              </p>
              <img className="contribute-upi-image" src="/assets/contribute/upi-image.jpg" alt="UPI payment information" />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <DonationCard />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Beyond donating */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader eyebrow="Beyond Donating" title="Volunteer or partner with us" body={getInvolved.intro} />
          </ScrollReveal>
          <div className="grid grid--2">
            {getInvolved.paths.slice(1).map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 80}>
                <div className="card">
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{p.title}</h3>
                  <p style={{ color: 'var(--text-soft)', lineHeight: 1.6, marginBottom: '1.25rem' }}>{p.body}</p>
                  <a href={p.cta.to} className="btn btn--outline btn--sm">{p.cta.label}</a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
