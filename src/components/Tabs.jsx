import React from 'react'

export default function Tabs({ options, active, onChange }) {
  return (
    <div className="tabs" role="tablist" aria-label="Filter activities">
      {options.map((opt) => (
        <button
          key={opt.key}
          role="tab"
          aria-selected={active === opt.key}
          className={`tabs__btn${active === opt.key ? ' tabs__btn--active' : ''}`}
          onClick={() => onChange(opt.key)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
