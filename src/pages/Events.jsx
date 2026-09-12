import React, { useEffect, useState } from 'react'

const chantEventImages = Array.from(
  { length: 4 },
  (_, index) => `/assets/gallery/vedic-chant-events/vedic-chant-events-${index + 1}.jpg`,
)

export default function Events() {
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    if (!selectedImage) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedImage(null)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Events</span>
          <h1 style={{ marginTop: '0.85rem' }}>Upcoming gatherings and Vedic learning events</h1>
          <p>
            Samvidadeyam hosts and supports events that deepen understanding, strengthen community,
            and keep Vedic teaching alive in practice.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--3 events-grid">
            <article className="card card--plain">
              <h3>Vedic Practice Session</h3>
              <p>Regular weekend chanting sessions for continuous learning.</p>
            </article>
            <button
              id="vedic-chant-events"
              className="card card--plain events-gallery-card"
              type="button"
              aria-haspopup="dialog"
              onClick={() => setSelectedImage({ images: chantEventImages, index: null })}
            >
              <h3>Vedic Chant Events</h3>
              <p>Participate in Vedic Pāṭaśhāla chanting on special occasions.</p>
            </button>
            <article className="card card--plain">
              <h3>Trust Programmes</h3>
              <p>Programmes for the welfare of Pāṭaśhālas and member families.</p>
            </article>
          </div>
        </div>
      </section>
      {selectedImage && (
        <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
          <div
            className="gallery-modal__content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chant-events-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="gallery-modal__header">
              <h2 id="chant-events-modal-title">Vedic Chant Events</h2>
              <button
                className="gallery-modal__close"
                type="button"
                aria-label="Close Vedic Chant Events gallery"
                onClick={() => setSelectedImage(null)}
              >
                &times;
              </button>
            </div>
            <div className="gallery-photo-grid">
              {selectedImage.images.map((image, index) => (
                <button
                  className="gallery-photo-button"
                  type="button"
                  key={image}
                  aria-label={`View Vedic Chant Events photo ${index + 1}`}
                  onClick={() => setSelectedImage({ images: chantEventImages, index })}
                >
                  <img src={image} alt={`Vedic Chant Events ${index + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {selectedImage && selectedImage.index !== null && (
        <div className="gallery-lightbox" onClick={() => setSelectedImage({ images: chantEventImages, index: null })}>
          <div
            className="gallery-lightbox__content"
            role="dialog"
            aria-modal="true"
            aria-label={`Vedic Chant Events photo ${selectedImage.index + 1}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="gallery-modal__close gallery-lightbox__close"
              type="button"
              aria-label="Close photo"
              onClick={() => setSelectedImage({ images: chantEventImages, index: null })}
            >
              &times;
            </button>
            <img
              src={selectedImage.images[selectedImage.index]}
              alt={`Vedic Chant Events ${selectedImage.index + 1}`}
            />
          </div>
        </div>
      )}
    </>
  )
}
