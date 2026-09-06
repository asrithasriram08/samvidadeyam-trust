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
              <img className="trustee-card__image" src="/assets/trustees/ramakrishnan-image.jpg" alt="N. Ramakrishnan" />
              <h3>N. Ramakrishnan</h3>
              <span className="eyebrow">Samvi Role</span>
              <p className="trustee-card__bio">Chartered Accountant &amp; Company Secretary with four decades of Corporate experience as CFO/Controller of reputed companies.</p>
            </article>
            <article className="card card--plain">
              <img className="trustee-card__image" src={trusteeImage} alt="Ramanathan" />
              <h3>Ramanathan</h3>
              <span className="eyebrow">Samvi Role</span>
              <p className="trustee-card__bio">bbb</p>
            </article>
            <article className="card card--plain">
              <img className="trustee-card__image" src={trusteeImage} alt="Sriram Agoram" />
              <h3>Sriram Agoram</h3>
              <span className="eyebrow">Samvi Role</span>
              <p className="trustee-card__bio">ccc</p>
            </article>
            <article className="card card--plain">
              <img className="trustee-card__image" src={trusteeImage} alt="Sreevatsadhara Sharma" />
              <h3>Sreevatsadhara Sharma</h3>
              <span className="eyebrow">Samvi Role</span>
              <p className="trustee-card__bio">ddd</p>
            </article>
            <article className="card card--plain">
              <img className="trustee-card__image" src={trusteeImage} alt="Venkat Hari" />
              <h3>Venkat Hari</h3>
              <span className="eyebrow">Samvi Role</span>
              <p className="trustee-card__bio">eee</p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
