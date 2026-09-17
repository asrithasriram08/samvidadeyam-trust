import React, { useEffect, useState } from 'react'

export default function NewsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetch('/api/content')
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load news')))
      .then((data) => {
        if (!active) return
        setItems(Array.isArray(data.news) ? data.news : [])
      })
      .catch(() => {
        if (active) setItems([])
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [])

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">News & updates</span>
          <h1 style={{ marginTop: '0.85rem' }}>Latest updates from the Trust</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <p>Loading updates...</p>
          ) : items.length === 0 ? (
            <div className="card card--plain">
              <p>No public updates have been published yet.</p>
            </div>
          ) : (
            <div className="news-list">
              {items.map((item) => (
                <article className="card card--plain news-item" key={item.id}>
                  {item.image && <img src={item.image} alt={item.title} className="news-item__image" loading="lazy" />}
                  <div className="news-item__body">
                    <p className="news-item__date">{new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
