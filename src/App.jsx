import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Ticker from './components/Ticker.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Activities from './pages/Activities.jsx'
import Events from './pages/Events.jsx'
import Gallery from './pages/Gallery.jsx'
import News from './pages/News.jsx'
import Socials from './pages/Socials.jsx'
import Trustees from './pages/Trustees.jsx'
import FoundingMembers from './pages/FoundingMembers.jsx'
import Youtube from './pages/Youtube.jsx'
import Contribute from './pages/Contribute.jsx'
import Contact from './pages/Contact.jsx'
import Admin from './pages/Admin.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  const isAdminRoute = window.location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Ticker />
        <Navbar />
        <ScrollToTop />
      </>}
      <main id="main-content" className={isAdminRoute ? 'admin-main' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/news" element={<News />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/socials" element={<Socials />} />
          <Route path="/trustees" element={<Trustees />} />
          <Route path="/founding-members" element={<FoundingMembers />} />
          <Route path="/youtube" element={<Youtube />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  )
}
