import React, { useEffect, useMemo, useState } from 'react'

const initialNews = { title: '', description: '', date: '', image: '', published: true }
const initialEvent = { title: '', description: '', date: '', time: '', location: '', image: '', published: true }

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      })
      const data = await response.json()
      if (!response.ok || !data.success) throw new Error(data.message || 'Login failed.')
      onLogin(data.admin)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-shell">
      <div className="admin-login">
        <div className="admin-login__header">
          <span className="eyebrow">Trust administration</span>
          <h1>Samvida Deyam Trust</h1>
        </div>
        <form onSubmit={handleSubmit} className="admin-form">
          <label>
            Username
            <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="trustee" required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" required />
          </label>
          {error && <p className="form-message form-message--error">{error}</p>}
          <button className="btn btn--primary" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

function AdminDashboard({ admin, onLogout }) {
  const [news, setNews] = useState([])
  const [events, setEvents] = useState([])
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [newsForm, setNewsForm] = useState(initialNews)
  const [eventForm, setEventForm] = useState(initialEvent)
  const [editNewsId, setEditNewsId] = useState(null)
  const [editEventId, setEditEventId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [galleryForm, setGalleryForm] = useState({ title: '', caption: '', album: 'General', image: '' })

  const loadData = async () => {
    setLoading(true)
    try {
      const [newsRes, eventsRes, galleryRes] = await Promise.all([
        fetch('/api/admin/news', { credentials: 'include' }),
        fetch('/api/admin/events', { credentials: 'include' }),
        fetch('/api/admin/gallery', { credentials: 'include' }),
      ])

      const newsData = await newsRes.json()
      const eventsData = await eventsRes.json()
      const galleryData = await galleryRes.json()

      if (!newsRes.ok || !eventsRes.ok || !galleryRes.ok) {
        throw new Error(newsData.message || eventsData.message || galleryData.message || 'Unable to load dashboard data.')
      }

      setNews(Array.isArray(newsData.items) ? newsData.items : [])
      setEvents(Array.isArray(eventsData.items) ? eventsData.items : [])
      setGallery(Array.isArray(galleryData.items) ? galleryData.items : [])
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const saveNews = async (event) => {
    event.preventDefault()
    const payload = { ...newsForm }
    const endpoint = editNewsId ? `/api/admin/news/${editNewsId}` : '/api/admin/news'
    const method = editNewsId ? 'PUT' : 'POST'

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok || !data.success) throw new Error(data.message || 'Unable to save news item.')
      setStatus({ type: 'success', message: editNewsId ? 'News item updated.' : 'News item created.' })
      setNewsForm(initialNews)
      setEditNewsId(null)
      await loadData()
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    }
  }

  const deleteNews = async (id) => {
    if (!window.confirm('Delete this update?')) return
    try {
      const response = await fetch(`/api/admin/news/${id}`, { method: 'DELETE', credentials: 'include' })
      const data = await response.json()
      if (!response.ok || !data.success) throw new Error(data.message || 'Unable to delete news item.')
      setStatus({ type: 'success', message: 'News item deleted.' })
      await loadData()
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    }
  }

  const saveEvent = async (event) => {
    event.preventDefault()
    const payload = { ...eventForm }
    const endpoint = editEventId ? `/api/admin/events/${editEventId}` : '/api/admin/events'
    const method = editEventId ? 'PUT' : 'POST'

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok || !data.success) throw new Error(data.message || 'Unable to save event.')
      setStatus({ type: 'success', message: editEventId ? 'Event updated.' : 'Event created.' })
      setEventForm(initialEvent)
      setEditEventId(null)
      await loadData()
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    }
  }

  const deleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return
    try {
      const response = await fetch(`/api/admin/events/${id}`, { method: 'DELETE', credentials: 'include' })
      const data = await response.json()
      if (!response.ok || !data.success) throw new Error(data.message || 'Unable to delete event.')
      setStatus({ type: 'success', message: 'Event deleted.' })
      await loadData()
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    }
  }

  const handleGalleryUpload = async (event) => {
    event.preventDefault()
    const file = event.target.elements.image.files[0]
    if (!file) {
      setStatus({ type: 'error', message: 'Please select a photo first.' })
      return
    }

    const formData = new FormData()
    formData.append('image', file)
    formData.append('title', galleryForm.title || file.name)
    formData.append('caption', galleryForm.caption || '')
    formData.append('album', galleryForm.album || 'General')

    setUploading(true)
    try {
      const response = await fetch('/api/admin/gallery/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      const data = await response.json()
      if (!response.ok || !data.success) throw new Error(data.message || 'Photo upload failed.')
      setStatus({ type: 'success', message: 'Photo uploaded successfully.' })
      setGalleryForm({ title: '', caption: '', album: 'General', image: '' })
      event.target.reset()
      await loadData()
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setUploading(false)
    }
  }

  const deleteGalleryItem = async (id) => {
    if (!window.confirm('Delete this photo permanently?')) return
    try {
      const response = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE', credentials: 'include' })
      const data = await response.json()
      if (!response.ok || !data.success) throw new Error(data.message || 'Unable to delete photo.')
      setStatus({ type: 'success', message: 'Photo deleted.' })
      await loadData()
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' })
      onLogout()
    } catch (_error) {
      onLogout()
    }
  }

  const adminSummary = useMemo(() => [
    { label: 'News', value: news.length },
    { label: 'Events', value: events.length },
    { label: 'Photos', value: gallery.length },
  ], [news.length, events.length, gallery.length])

  return (
    <div className="admin-shell">
      <div className="admin-dashboard">
        <header className="admin-dashboard__header">
          <div>
            <span className="eyebrow">Dashboard</span>
            <h1>Samvida Deyam Trust</h1>
          </div>
          <button className="btn btn--ghost" type="button" onClick={logout}>Logout</button>
        </header>

        <section className="admin-summary">
          {adminSummary.map((item) => (
            <div className="admin-summary__card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </section>

        {status.message && <p className={`form-message form-message--${status.type || 'info'}`}>{status.message}</p>}

        <div className="admin-grid">
          <section className="admin-panel">
            <h2>News & updates</h2>
            <form className="admin-form" onSubmit={saveNews}>
              <label>
                Title
                <input value={newsForm.title} onChange={(event) => setNewsForm({ ...newsForm, title: event.target.value })} required />
              </label>
              <label>
                Date
                <input type="date" value={newsForm.date} onChange={(event) => setNewsForm({ ...newsForm, date: event.target.value })} required />
              </label>
              <label>
                Image URL (optional)
                <input value={newsForm.image} onChange={(event) => setNewsForm({ ...newsForm, image: event.target.value })} placeholder="https://... or /uploads/..." />
              </label>
              <label>
                Description
                <textarea value={newsForm.description} onChange={(event) => setNewsForm({ ...newsForm, description: event.target.value })} rows="5" required />
              </label>
              <label className="checkbox-row">
                <input type="checkbox" checked={newsForm.published} onChange={(event) => setNewsForm({ ...newsForm, published: event.target.checked })} />
                Publish now
              </label>
              <button className="btn btn--primary" type="submit">{editNewsId ? 'Update news' : 'Add news'}</button>
              {editNewsId && <button className="btn btn--ghost" type="button" onClick={() => { setEditNewsId(null); setNewsForm(initialNews) }}>Cancel</button>}
            </form>
            <div className="admin-list">
              {loading ? <p>Loading...</p> : news.length === 0 ? <p>No updates yet.</p> : news.map((item) => (
                <div className="admin-list__item" key={item.id}>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                  <div className="admin-actions">
                    <button className="btn btn--ghost" type="button" onClick={() => { setEditNewsId(item.id); setNewsForm({ title: item.title, description: item.description, date: item.date, image: item.image || '', published: Number(item.published) === 1 }) }}>Edit</button>
                    <button className="btn btn--ghost danger" type="button" onClick={() => deleteNews(item.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="admin-panel">
            <h2>Events</h2>
            <form className="admin-form" onSubmit={saveEvent}>
              <label>
                Title
                <input value={eventForm.title} onChange={(event) => setEventForm({ ...eventForm, title: event.target.value })} required />
              </label>
              <label>
                Date
                <input type="date" value={eventForm.date} onChange={(event) => setEventForm({ ...eventForm, date: event.target.value })} required />
              </label>
              <label>
                Time (optional)
                <input value={eventForm.time} onChange={(event) => setEventForm({ ...eventForm, time: event.target.value })} />
              </label>
              <label>
                Location (optional)
                <input value={eventForm.location} onChange={(event) => setEventForm({ ...eventForm, location: event.target.value })} />
              </label>
              <label>
                Image URL (optional)
                <input value={eventForm.image} onChange={(event) => setEventForm({ ...eventForm, image: event.target.value })} />
              </label>
              <label>
                Description
                <textarea value={eventForm.description} onChange={(event) => setEventForm({ ...eventForm, description: event.target.value })} rows="5" required />
              </label>
              <label className="checkbox-row">
                <input type="checkbox" checked={eventForm.published} onChange={(event) => setEventForm({ ...eventForm, published: event.target.checked })} />
                Publish now
              </label>
              <button className="btn btn--primary" type="submit">{editEventId ? 'Update event' : 'Add event'}</button>
              {editEventId && <button className="btn btn--ghost" type="button" onClick={() => { setEditEventId(null); setEventForm(initialEvent) }}>Cancel</button>}
            </form>
            <div className="admin-list">
              {events.length === 0 ? <p>No events yet.</p> : events.map((item) => (
                <div className="admin-list__item" key={item.id}>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                  <div className="admin-actions">
                    <button className="btn btn--ghost" type="button" onClick={() => { setEditEventId(item.id); setEventForm({ title: item.title, description: item.description, date: item.date, time: item.time || '', location: item.location || '', image: item.image || '', published: Number(item.published) === 1 }) }}>Edit</button>
                    <button className="btn btn--ghost danger" type="button" onClick={() => deleteEvent(item.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="admin-panel">
            <h2>Gallery</h2>
            <form className="admin-form" onSubmit={handleGalleryUpload}>
              <label>
                Photo title
                <input value={galleryForm.title} onChange={(event) => setGalleryForm({ ...galleryForm, title: event.target.value })} placeholder="e.g. Vedic practice session" />
              </label>
              <label>
                Caption (optional)
                <input value={galleryForm.caption} onChange={(event) => setGalleryForm({ ...galleryForm, caption: event.target.value })} />
              </label>
              <label>
                Album
                <input value={galleryForm.album} onChange={(event) => setGalleryForm({ ...galleryForm, album: event.target.value })} />
              </label>
              <label>
                Select photo
                <input type="file" accept="image/*" name="image" onChange={(event) => setGalleryForm({ ...galleryForm, image: event.target.files[0] ? event.target.files[0].name : '' })} required />
              </label>
              <button className="btn btn--primary" type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload photo'}</button>
            </form>
            <div className="admin-gallery">
              {gallery.length === 0 ? <p>No photos yet.</p> : gallery.map((item) => (
                <div className="admin-gallery__card" key={item.id}>
                  {item.image && <img src={item.image} alt={item.title} loading="lazy" />}
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.album}</p>
                  </div>
                  <button className="btn btn--ghost danger" type="button" onClick={() => deleteGalleryItem(item.id)}>Delete</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/session', { credentials: 'include' })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Session expired')))
      .then((data) => {
        if (data.success) {
          setAdmin(data.admin)
          setIsAuthenticated(true)
        }
      })
      .catch(() => {
        setIsAuthenticated(false)
        setAdmin(null)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="admin-shell"><div className="admin-loading">Checking session...</div></div>
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={(user) => { setAdmin(user); setIsAuthenticated(true) }} />
  }

  return <AdminDashboard admin={admin} onLogout={() => { setAdmin(null); setIsAuthenticated(false) }} />
}
