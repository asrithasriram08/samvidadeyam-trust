import React, { useState } from 'react'
import { donation } from '../data/siteContent.js'

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch (e) {
      // Clipboard API can fail without a secure context / permission —
      // the button still gives visual feedback either way.
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button className={`copy-btn${copied ? ' copy-btn--done' : ''}`} onClick={handleCopy}>
      {copied ? 'Copied ✓' : `Copy ${label}`}
    </button>
  )
}

export default function DonationCard() {
  return (
    <div className="donation-card">
      <h3 style={{ marginBottom: '0.75rem' }}>{donation.title}</h3>
      <p style={{ color: 'var(--text-on-dark-soft)', lineHeight: 1.65, marginBottom: '1.75rem' }}>
        {donation.intro}
      </p>

      <div className="donation-card__row">
        <div>
          <div className="donation-card__label">Account Name</div>
          <div className="donation-card__value">{donation.accountName}</div>
        </div>
      </div>

      <div className="donation-card__row">
        <div>
          <div className="donation-card__label">Account Number</div>
          <div className="donation-card__value">{donation.accountNumber}</div>
        </div>
        <CopyButton value={donation.accountNumber} label="Account No." />
      </div>

      <div className="donation-card__row">
        <div>
          <div className="donation-card__label">IFSC Code</div>
          <div className="donation-card__value">{donation.ifsc}</div>
        </div>
        <CopyButton value={donation.ifsc} label="IFSC" />
      </div>

      <div className="donation-card__row">
        <div>
          <div className="donation-card__label">Bank</div>
          <div className="donation-card__value">{donation.bank}</div>
        </div>
      </div>

      <p style={{ marginTop: '1.75rem', fontSize: '0.85rem', color: 'var(--text-on-dark-soft)', lineHeight: 1.6 }}>
        {donation.registeredNote}
      </p>
    </div>
  )
}
