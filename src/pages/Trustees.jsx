import React from 'react'

export default function Trustees() {
  const trusteeImage = '/assets/trustees/example-image.jpg'

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About the Trust</span>
          <h1 style={{ marginTop: '0.85rem' }}>Trustees</h1>
          <p>
            Stewarding the mission with guidance and care.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            <article className="card card--plain">
              <img className="trustee-card__image" src={trusteeImage} alt="Ramanathan" />
              <h3>Ramanathan</h3>
              <span className="eyebrow">President</span>
              <p className="trustee-card__bio">bbb</p>
            </article>
            <article className="card card--plain">
              <img className="trustee-card__image" src="/assets/trustees/sriram-image.jpg" alt="Sriram Agoram" />
              <h3>Sriram Agoram</h3>
              <span className="eyebrow">Secretary</span>
              <p className="trustee-card__bio">Master&apos;s in Computer Applications with three decades of extensive experience in corporate technology, consulting and systems integration, and committed to preserving, practicing and propagating the Vedas.</p>
            </article>
            <article className="card card--plain">
              <img className="trustee-card__image" src="/assets/trustees/ramakrishnan-image.jpg" alt="N. Ramakrishnan" />
              <h3>N. Ramakrishnan</h3>
              <span className="eyebrow">Treasurer</span>
              <p className="trustee-card__bio">Chartered Accountant &amp; Company Secretary with four decades of Corporate experience as CFO/Controller of reputed companies.</p>
            </article>
            <article className="card card--plain">
              <img className="trustee-card__image" src="/assets/trustees/ga-sarma-image.jpg" alt="G.A. Sreevatsadhara Sarma" />
              <h3>G.A. Sreevatsadhara Sarma</h3>
              <span className="eyebrow">Executive Trustee</span>
              <p className="trustee-card__bio">An engineer and MBA by education, and a keen student of vedas, puranas, upanishads, dharma sastras and literature.</p>
            </article>
            <article className="card card--plain">
              <img className="trustee-card__image" src={trusteeImage} alt="Venkatraman E." />
              <h3>Venkatraman E.</h3>
              <span className="eyebrow">Executive Trustee</span>
              <p className="trustee-card__bio">A Chartered Accountant with 2 decades of Corporate experience and a professional working in tax and corporate matters, with an interest in Indian culture and spirituality.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
