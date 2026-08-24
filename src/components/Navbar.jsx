import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { brand, nav } from '../data/siteContent.js'
import BrandMark from './BrandMark.jsx'

function CloseIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const renderNavItem = (item, mobile = false) => {
    if (item.children) {
      if (mobile) {
        return (
          <div key={item.to} className="navbar__mobile-group">
            <NavLink to={item.to} onClick={() => setOpen(false)} end={item.to === '/'}>
              {item.label}
            </NavLink>
            {item.children.map((child) => (
              <NavLink key={child.to} to={child.to} onClick={() => setOpen(false)} className="navbar__mobile-subitem">
                {child.label}
              </NavLink>
            ))}
          </div>
        )
      }

      return (
        <div key={item.to} className="navbar__dropdown">
          <NavLink
            to={item.to}
            className={({ isActive }) => 'navbar__link' + (isActive ? ' navbar__link--active' : '')}
            end={item.to === '/'}
          >
            {item.label}
          </NavLink>
          <div className="navbar__dropdown-menu">
            {item.children.map((child) => (
              <NavLink key={child.to} to={child.to} onClick={() => setOpen(false)}>
                {child.label}
              </NavLink>
            ))}
          </div>
        </div>
      )
    }

    return (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) => 'navbar__link' + (isActive ? ' navbar__link--active' : '')}
        end={item.to === '/'}
      >
        {item.label}
      </NavLink>
    )
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__row">
        <NavLink to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <BrandMark size="sm" alt={`${brand.name} emblem`} />
          <span>{brand.name}</span>
        </NavLink>

        <nav className="navbar__links" aria-label="Primary">
          {nav.map((item) => renderNavItem(item))}
        </nav>

        <div className="navbar__actions">
          <NavLink to="/contribute" className="btn btn--primary btn--sm">Contribute</NavLink>
          <button
            className="navbar__hamburger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="navbar__mobile" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="navbar__mobile-head">
            <div className="navbar__brand">
              <BrandMark size="sm" alt="" />
              <span>{brand.name}</span>
            </div>
            <button className="navbar__hamburger" aria-label="Close menu" onClick={() => setOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <div className="navbar__mobile-links">
            {nav.map((item) => renderNavItem(item, true))}
          </div>
          <div className="navbar__mobile-actions">
            <NavLink to="/contribute" className="btn btn--primary btn--block" onClick={() => setOpen(false)}>
              Contribute
            </NavLink>
          </div>
        </div>
      )}
    </header>
  )
}
