import React from 'react'
import SectionHeader from '../components/SectionHeader.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import ContributionCard from '../components/ContributionCard.jsx'
import DonationCard from '../components/DonationCard.jsx'
import { contributePage } from '../data/siteContent.js'

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

    </>
  )
}
