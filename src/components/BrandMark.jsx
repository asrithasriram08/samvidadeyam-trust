import React from 'react'
import { brand } from '../data/siteContent.js'

export default function BrandMark({ size = 'md', className = '', alt = `${brand.name} emblem` }) {
  const classes = ['brand-mark', `brand-mark--${size}`, className].filter(Boolean).join(' ')

  return (
    <span className={classes} aria-hidden={alt === ''}>
      <span className="brand-mark__halo" aria-hidden="true" />
      <img src={brand.logo} alt={alt} className="brand-mark__image" />
    </span>
  )
}