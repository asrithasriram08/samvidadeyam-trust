import React from 'react'
import { NavLink } from 'react-router-dom'
import { brand, nav, footer, media } from '../data/siteContent.js'
import BrandMark from './BrandMark.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <div className="footer__brand">
              <BrandMark size="sm" alt={`${brand.name} emblem`} />
              <span>{brand.name}</span>
            </div>
            <p style={{ maxWidth: '38ch', lineHeight: 1.65, fontSize: '0.92rem' }}>{footer.about}</p>
          </div>

          <div>
            <h5>Navigate</h5>
            <div className="footer__links">
              {nav.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/'}>{item.label}</NavLink>
              ))}
            </div>
          </div>

          <div>
            <h5>Connect</h5>
            <div className="footer__links">
              <a href={media.youtubeUrl} target="_blank" rel="noreferrer noopener">YouTube Channel</a>
              <NavLink to="/contact">Contact</NavLink>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>{footer.copyright}</span>
          <span style={{ opacity: 0.7 }}>Give with Understanding</span>
        </div>
      </div>
    </footer>
  )
}
