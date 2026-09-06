import React from 'react'
import { NavLink } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import LineageThread from '../components/LineageThread.jsx'
import WordCycle from '../components/WordCycle.jsx'
import MissionCard from '../components/MissionCard.jsx'
import ActivityCard from '../components/ActivityCard.jsx'
import BrandMark from '../components/BrandMark.jsx'
import { hero, essence, vision, mission, vedicChanting, activities, inAction, whyItMatters, getInvolved, media } from '../data/siteContent.js'

export default function Home() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="eyebrow hero__eyebrow">{hero.eyebrow}</span>
            <h1 className="hero__headline">{hero.headline}</h1>
            <p className="hero__subhead">{hero.subhead}</p>
            <p className="hero__body">{hero.body}</p>
            <div className="hero__actions">
              <NavLink to={hero.ctaPrimary.to} className="btn btn--primary">{hero.ctaPrimary.label}</NavLink>
              <NavLink to={hero.ctaSecondary.to} className="btn btn--outline">{hero.ctaSecondary.label}</NavLink>
            </div>
            <WordCycle wordsA={hero.wordCycleA} wordsB={hero.wordCycleB} />
          </div>

          <div className="hero__visual">
            <LineageThread variant="hero" className="hero__thread" />
            <BrandMark size="lg" className="hero__mark" alt="Samvidadeyam Trust emblem" />
          </div>
        </div>
      </section>

      {/* ---------------- Essence ---------------- */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader eyebrow={essence.eyebrow} title={essence.title} />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="grid grid--2" style={{ maxWidth: 920 }}>
              {essence.paragraphs.map((p, i) => (
                <p key={i} className="lede" style={{ maxWidth: 'none' }}>{p}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------------- Vision and sacred mission ---------------- */}
      <section className="section section--tint">
        <div className="container">
          <ScrollReveal>
            <SectionHeader title="OUR VISION AND SACRED MISSION" center className="section-header--single-line" />
          </ScrollReveal>
          <div className="vision-mission-layout">
            <ScrollReveal className="vision-mission-layout__vision">
              <p className="lede">{vision.body}</p>
              <ul className="list-plain" style={{ marginTop: '1.5rem' }}>
                {vision.pillars.slice(0, 2).map((p) => (
                  <li key={p.title}><strong>{p.title}</strong> — {p.note}</li>
                ))}
              </ul>
            </ScrollReveal>
            <div className="vision-mission-layout__mission">
              <div className="vision-mission-layout__cards">
                {mission.pillars.map((m, i) => (
                  <ScrollReveal key={m.title} delay={i * 80}>
                    <MissionCard title={m.title} body={m.body} />
                  </ScrollReveal>
                ))}
                <ScrollReveal delay={160}>
                  <div className="mission-card vedic-chanting">
                  <h3>{vedicChanting.title}</h3>
                  <p className="vedic-chanting__subtitle sanskrit">{vedicChanting.subtitle}</p>
                  {vedicChanting.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Focus areas preview ---------------- */}
      <section className="section section--tint">
        <div className="container">
          <ScrollReveal>
            <SectionHeader eyebrow={activities.eyebrow} title={activities.title} />
          </ScrollReveal>
          <div className="grid grid--3">
            {activities.items.slice(0, 3).map((a, i) => (
              <ScrollReveal key={a.id} delay={i * 70}>
                <ActivityCard {...a} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={200}>
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <NavLink to="/activities" className="btn btn--outline">See all activities</NavLink>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------------- In Action / trust markers ---------------- */}
      <section className="section section--dark">
        <div className="container">
          <div className="split">
            <ScrollReveal>
              <span className="eyebrow">{inAction.eyebrow}</span>
              <h2 style={{ margin: '0.85rem 0 1.5rem' }}>{inAction.title}</h2>
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

      {/* ---------------- Why it matters ---------------- */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader eyebrow={whyItMatters.eyebrow} title={whyItMatters.title} body={whyItMatters.body} center className="section-header--single-line why-it-matters-header" />
          </ScrollReveal>
          <div className="grid grid--3">
            {whyItMatters.points.map((pt, i) => (
              <ScrollReveal key={pt} delay={i * 80}>
                <div className="card" style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)' }}>{pt}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Get involved ---------------- */}
      <section className="section section--tint">
        <div className="container">
          <ScrollReveal>
            <SectionHeader eyebrow={getInvolved.eyebrow} title={getInvolved.title} body={getInvolved.intro} />
          </ScrollReveal>
          <div className="grid grid--3">
            {getInvolved.paths.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 80}>
                <div className="card">
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{p.title}</h3>
                  <p style={{ color: 'var(--text-soft)', lineHeight: 1.6, marginBottom: '1.25rem' }}>{p.body}</p>
                  <NavLink to={p.cta.to} className="btn btn--outline btn--sm">{p.cta.label}</NavLink>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Contribute CTA ---------------- */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="cta-banner">
              <div>
                <h3>Ready to give with understanding?</h3>
                <p>See every way to contribute, and the Trust's bank details for direct donation.</p>
              </div>
              <div className="cta-banner__actions">
                <NavLink to="/contribute" className="btn btn--gold">Go to Contribute</NavLink>
                <NavLink to="/contact" className="btn btn--ghost-dark">Contact us</NavLink>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------------- YouTube ---------------- */}
      <section className="section section--tint">
        <div className="container">
          <ScrollReveal>
            <div className="media-panel">
              <div>
                <span className="eyebrow">{media.eyebrow}</span>
                <h3 style={{ color: 'var(--text-on-dark)', margin: '0.85rem 0 1rem' }}>{media.title}</h3>
                <p style={{ color: 'var(--text-on-dark-soft)', lineHeight: 1.65, marginBottom: '1.5rem' }}>{media.body}</p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href={media.youtubeUrl} target="_blank" rel="noreferrer noopener" className="btn btn--gold">
                    Visit YouTube Channel
                  </a>
                  <a href={media.playlistsUrl} target="_blank" rel="noreferrer noopener" className="btn btn--ghost-dark">
                    Browse Playlists
                  </a>
                </div>
              </div>
              <a href={media.youtubeUrl} target="_blank" rel="noreferrer noopener" className="media-panel__screen" aria-label="Open YouTube channel">
                <span className="media-panel__play" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
