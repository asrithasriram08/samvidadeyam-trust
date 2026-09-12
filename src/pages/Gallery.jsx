import React, { useEffect, useState } from 'react'
import { gallery } from '../data/siteContent.js'

function galleryTargetId(title) {
  return `gallery-${title.toLowerCase().replace(/\s+/g, '-')}`
}

function CameraScene({ onSelect }) {
  const uploadedItems = [
    gallery.items.find((item) => item.title === 'Vedic Practice Session'),
    gallery.items.find((item) => item.title === 'Vedic chant events'),
    gallery.items.find((item) => item.title === 'Photo archive'),
    gallery.items.find((item) => item.title === 'Field reports'),
  ].filter(Boolean)

  return (
    <div className="camera-scene">
      <div className="photo-fan">
        {uploadedItems.map((item) => (
          <a
            href={`#${galleryTargetId(item.title)}`}
            className="photo-strip"
            key={item.title}
            onClick={(event) => {
              event.preventDefault()
              onSelect(item.title)
            }}
          >
            <img src={item.main || item.images[0]} alt={item.title} />
            <span className="strip-label">{item.title}</span>
          </a>
        ))}
      </div>
      <div className="camera-body" aria-hidden="true">
        <svg viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="28" width="220" height="118" rx="14" fill="#4B3025" />
          <rect x="36" y="14" width="68" height="24" rx="7" fill="#4B3025" />
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
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [highlightedGalleryTitle, setHighlightedGalleryTitle] = useState(null)
  const uploadedItems = gallery.items.filter((item) => item.images?.length > 0)

  const selectGalleryItem = (title) => {
    const target = document.getElementById(galleryTargetId(title))
    if (!target) return

    target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setHighlightedGalleryTitle(title)
    window.setTimeout(() => setHighlightedGalleryTitle(null), 1800)
  }

  useEffect(() => {
    if (!selectedGalleryItem) return undefined

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return
      if (selectedImage) {
        setSelectedImage(null)
      } else {
        setSelectedGalleryItem(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedGalleryItem, selectedImage])

  return (
    <>
      <section className="page-hero gallery-hero">
        <div className="container">
          <span className="eyebrow">{gallery.eyebrow}</span>
          <h1 style={{ marginTop: '0.85rem' }}>{gallery.title}</h1>
          <p>{gallery.body}</p>
          <CameraScene onSelect={selectGalleryItem} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-grid" id="gallery-destinations">
            {gallery.items.map((item) => (
              <div
                className={`gallery-destination${highlightedGalleryTitle === item.title ? ' is-highlighted' : ''}`}
                id={galleryTargetId(item.title)}
                key={item.title}
              >
                <button
                  className="gallery-card gallery-card--text"
                  type="button"
                  aria-haspopup={item.images?.length > 0 ? 'dialog' : undefined}
                  onClick={() => item.images?.length > 0 && setSelectedGalleryItem(item)}
                >
                  <h2>{item.title}</h2>
                  <p>{item.note}</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {selectedGalleryItem && (
        <div
          className="gallery-modal"
          role="presentation"
          onClick={() => setSelectedGalleryItem(null)}
        >
          <div
            className="gallery-modal__content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="gallery-modal__header">
              <h2 id="gallery-modal-title">{selectedGalleryItem.title}</h2>
              <button
                className="gallery-modal__close"
                type="button"
                aria-label="Close gallery"
                onClick={() => setSelectedGalleryItem(null)}
              >
                &times;
              </button>
            </div>
            <div className="gallery-photo-grid">
              {selectedGalleryItem.images.map((image, index) => (
                <button
                  key={image}
                  className="gallery-photo-button"
                  type="button"
                  aria-label={`View ${selectedGalleryItem.title} photo ${index + 1}`}
                  onClick={() => setSelectedImage({ image, index })}
                >
                  <img
                    src={image}
                    alt={`${selectedGalleryItem.title} ${index + 1}`}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {selectedImage && selectedGalleryItem && (
        <div className="gallery-lightbox" onClick={() => setSelectedImage(null)}>
          <div
            className="gallery-lightbox__content"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedGalleryItem.title} photo ${selectedImage.index + 1}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="gallery-modal__close gallery-lightbox__close"
              type="button"
              aria-label="Close photo"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img
              src={selectedImage.image}
              alt={`${selectedGalleryItem.title} ${selectedImage.index + 1}`}
            />
          </div>
        </div>
      )}
      <div className="gallery-manifesto" aria-label="A message about conscious giving">
        <div className="gallery-manifesto__track">श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding · श्रद्धया देयम् · संविदा देयम् · Give with understanding ·</div>
      </div>
    </>
  )
}
