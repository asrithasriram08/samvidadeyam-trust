import React, { useState } from 'react'

function PlusIcon() {
  return (
    <svg className="accordion-item__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  )
}

export function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="accordion-item" data-open={open}>
      <button
        className="accordion-item__trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{title}</span>
        <PlusIcon />
      </button>
      <div className="accordion-item__panel">
        <div className="accordion-item__panel-inner">{children}</div>
      </div>
    </div>
  )
}

export default function Accordion({ children }) {
  return <div className="accordion">{children}</div>
}
