import React from 'react'
import { gallery } from '../data/siteContent.js'

function CameraScene() {
  return (
    <div className="camera-scene">
      <div className="photo-fan">
        {gallery.items.map((item) => (
          <a href="#gallery-destinations" className="photo-strip" key={item.title}>
            <img src={item.image} alt={item.title} />
            <span className="strip-label">{item.title}</span>
          </a>
        ))}
      </div>
      <div className="camera-body" aria-hidden="true">
        <svg viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="28" width="220" height="118" rx="14" fill="var(--indigo-2)" />
          <rect x="36" y="14" width="68" height="24" rx="7" fill="var(--indigo-2)" />
          <circle cx="128" cy="92" r="44" fill="#1a1410" />
          <circle cx="128" cy="92" r="36" fill="#222" />
          <circle cx="128" cy="92" r="28" fill="#111" />
          <circle cx="128" cy="92" r="18" fill="#1a1410" />
          <circle cx="120" cy="84" r="5" fill="var(--sky)" opacity=".55" />
          <circle cx="133" cy="99" r="2" fill="var(--sky)" opacity=".35" />
          <circle cx="192" cy="46" r="9" fill="var(--rose)" />
          <circle cx="192" cy="46" r="6" fill="var(--gold)" />
          <circle cx="60" cy="46" r="12" fill="#333" />
          <circle cx="60" cy="46" r="8" fill="#444" />
          <rect x="46" y="18" width="28" height="10" rx="3" fill="#555" />
          <rect x="148" y="18" width="36" height="16" rx="3" fill="#333" />
          <rect x="36" y="48" width="34" height="6" rx="2" fill="var(--sky)" opacity=".2" />
          <rect x="36" y="58" width="22" height="4" rx="2" fill="var(--sky)" opacity=".12" />
          <ellipse cx="54" cy="152" rx="42" ry="22" fill="var(--gold-soft)" />
          <rect x="14" y="138" width="80" height="28" rx="12" fill="var(--gold-soft)" />
          <ellipse cx="28" cy="128" rx="12" ry="8" fill="var(--gold-soft)" transform="rotate(-20 28 128)" />
          <ellipse cx="206" cy="152" rx="42" ry="22" fill="var(--gold-soft)" />
          <rect x="166" y="138" width="80" height="28" rx="12" fill="var(--gold-soft)" />
          <ellipse cx="232" cy="128" rx="12" ry="8" fill="var(--gold-soft)" transform="rotate(20 232 128)" />
          <path d="M30 146 Q40 140 54 143 Q68 140 78 146M182 146 Q196 140 210 143 Q224 140 234 146" stroke="var(--gold)" strokeOpacity=".4" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  )
}

export default function Gallery() {
  return (
    <>
      <section className="page-hero gallery-hero">
        <div className="container">
          <span className="eyebrow">{gallery.eyebrow}</span>
          <h1 style={{ marginTop: '0.85rem' }}>{gallery.title}</h1>
          <p>{gallery.body}</p>
          <CameraScene />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-grid" id="gallery-destinations">
            {gallery.items.map((item) => (
              <article className="gallery-card gallery-card--text" key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="gallery-manifesto" aria-label="A message about conscious giving">
        <div className="gallery-manifesto__track">श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding ·</div>
      </div>
    </>
  )
}
