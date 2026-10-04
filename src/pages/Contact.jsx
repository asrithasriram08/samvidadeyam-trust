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

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch (e) {
      // Clipboard API can fail without a secure context / permission.
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button type="button" className={`copy-btn copy-btn--contact${copied ? ' copy-btn--done' : ''}`} onClick={handleCopy}>
      {copied ? 'Copied ✓' : `Copy ${label}`}
    </button>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const values = Object.fromEntries(formData.entries())
    const nextErrors = {}

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = 'Invalid email.'
    }
    if (!values.subject.trim()) {
      nextErrors.subject = 'Subject is empty.'
    }
    setErrors(nextErrors)
    setServerError('')
    if (Object.keys(nextErrors).length > 0) return

    setSending(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const result = await response.json()
      if (!response.ok) {
        if (result.field) setErrors({ [result.field]: result.message })
        else setServerError(result.message || 'Unable to send the message right now.')
        return
      }
      form.reset()
      setSubmitted(true)
    } catch (error) {
      setServerError('Unable to send the message right now.')
    } finally {
      setSending(false)
    }
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
                  <div className="contact-detail__value">
                    <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                    <CopyButton value={contact.email} label="Email" />
                  </div>
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
                  <div className="contact-detail__value">
                    <p><a href={`tel:${contact.mobile}`}>{contact.mobile}</a></p>
                    <CopyButton value={contact.mobile} label="Mobile" />
                  </div>
                ) : (
                  <p className="contact-detail__pending">To be added — see src/data/siteContent.js</p>
                )}
              </div>
            </div>
          </div>

          <div className="card">
            {submitted ? (
              <div role="status">
                <h3 style={{ marginBottom: '0.75rem' }}>Message sent</h3>
                <p style={{ color: 'var(--text-soft)', lineHeight: 1.6 }}>
                  Your message has been sent to the Trust.
                </p>
                <button className="btn btn--outline btn--sm" style={{ marginTop: '1.25rem' }} onClick={() => setSubmitted(false)}>
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required autoComplete="name" />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                  {errors.email && <p id="email-error" className="form-error">{errors.email}</p>}
                </div>
                <div className="form-field">
                  <label htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" type="text" aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined} />
                  {errors.subject && <p id="subject-error" className="form-error">{errors.subject}</p>}
                </div>
                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" required />
                </div>
                {serverError && <p className="form-error form-error--summary" role="alert">{serverError}</p>}
                <button type="submit" className="btn btn--primary btn--block" disabled={sending}>
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
