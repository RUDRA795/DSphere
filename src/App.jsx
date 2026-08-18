import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SplashGlobe from './components/SplashGlobe'
import NeuralBackground from './components/NeuralBackground'
import RegistrationModal from './components/RegistrationModal'

import Home from './pages/Home'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Schedule from './pages/Schedule'
import Rules from './pages/Rules'
import About from './pages/About'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [preselectedSlug, setPreselectedSlug] = useState('dataforge')
  const location = useLocation()

  const handleOpenRegister = (slug = 'dataforge') => {
    setPreselectedSlug(slug)
    setIsRegisterOpen(true)
  }

  const handleCloseRegister = () => {
    setIsRegisterOpen(false)
  }

  const handleEnterPortal = () => {
    setShowSplash(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#040914] text-slate-100 relative selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      <ScrollToTop />

      {/* 1. 3D Satellite Globe Intro Splash (3s spin + viral earth zoom into TGPCET Nagpur) */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-[#030814]"
          >
            <SplashGlobe onEnterPortal={handleEnterPortal} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Cursor Interactive Neural Background */}
      <NeuralBackground />

      {/* 3. Navigation Bar */}
      <Navbar onOpenRegister={() => handleOpenRegister('dataforge')} />

      {/* 4. Page Routes with Smooth Animated Transition on Route Change */}
      <div className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={<Home onOpenRegister={handleOpenRegister} />}
              />
              <Route
                path="/events"
                element={<Events onOpenRegister={handleOpenRegister} />}
              />
              <Route
                path="/events/:slug"
                element={<EventDetail onOpenRegister={handleOpenRegister} />}
              />
              <Route
                path="/schedule"
                element={<Schedule />}
              />
              <Route
                path="/rules"
                element={<Rules />}
              />
              <Route
                path="/about"
                element={<About />}
              />
            </Routes>
          </motion.main>
        </AnimatePresence>
      </div>

      {/* 5. Footer */}
      <Footer onOpenRegister={() => handleOpenRegister('dataforge')} />

      {/* 6. Registration Modal */}
      <RegistrationModal
        key={preselectedSlug}
        isOpen={isRegisterOpen}
        onClose={handleCloseRegister}
        preselectedSlug={preselectedSlug}
      />
    </div>
  )
}
