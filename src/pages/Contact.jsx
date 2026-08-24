import React, { useState } from 'react'
import { contact } from '../data/siteContent.js'

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.4 2.1L8 9.9a16 16 0 006 6l1.4-1.4a2 2 0 012.1-.4c.9.3 1.8.5 2.7.6a2 2 0 011.8 2.1z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder only — wire this up to the Trust's actual email service
    // or form backend before publishing. See README, "Connecting the
    // contact form".
    setSubmitted(true)
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{contact.eyebrow}</span>
          <h1 style={{ marginTop: '0.85rem' }}>{contact.title}</h1>
          <p>{contact.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <div className="contact-detail">
              <span className="contact-detail__icon"><MailIcon /></span>
              <div>
                <h4>Email</h4>
                {contact.email ? (
                  <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                ) : (
                  <p className="contact-detail__pending">To be added — see src/data/siteContent.js</p>
                )}
              </div>
            </div>
            <div className="contact-detail">
              <span className="contact-detail__icon"><PhoneIcon /></span>
              <div>
                <h4>Mobile</h4>
                {contact.mobile ? (
                  <p><a href={`tel:${contact.mobile}`}>{contact.mobile}</a></p>
                ) : (
                  <p className="contact-detail__pending">To be added — see src/data/siteContent.js</p>
                )}
              </div>
            </div>

            <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-faint)', lineHeight: 1.6 }}>
              {contact.formNote}
            </p>
          </div>

          <div className="card">
            {submitted ? (
              <div role="status">
                <h3 style={{ marginBottom: '0.75rem' }}>Message ready</h3>
                <p style={{ color: 'var(--text-soft)', lineHeight: 1.6 }}>
                  This form isn't yet wired to a live backend, so nothing was actually sent. Once the
                  Trust connects an email service (see README), messages submitted here will reach the
                  Trust directly.
                </p>
                <button className="btn btn--outline btn--sm" style={{ marginTop: '1.25rem' }} onClick={() => setSubmitted(false)}>
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required autoComplete="name" />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="form-field">
                  <label htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" type="text" />
                </div>
                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" required />
                </div>
                <button type="submit" className="btn btn--primary btn--block">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
