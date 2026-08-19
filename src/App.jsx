import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import { ThemeProvider, useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SplashGlobe from './components/SplashGlobe'
import NeuralBackground from './components/NeuralBackground'
import Section3DBackground from './components/Section3DBackground'
import RegistrationModal from './components/RegistrationModal'
import DSAURA from './components/DSAURA'

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

function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#00C2FF] via-[#00FF9D] to-[#8B5CF6] transition-all duration-75 ease-out shadow-[0_0_10px_#00C2FF]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(true)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [preselectedSlug, setPreselectedSlug] = useState('dataforge')
  const location = useLocation()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

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
    <div className="min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-700">
      <ScrollToTop />
      <ScrollProgressBar />

      {/* 1. 3D Satellite Globe Intro Splash */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#02050D]"
          >
            <SplashGlobe onEnterPortal={handleEnterPortal} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layer 01: Ambient Light Fields (Atmospheric Depth) */}
      <div
        className={`fixed top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full blur-[140px] pointer-events-none z-0 transition-all duration-1000 ${
          isDark
            ? 'bg-gradient-to-br from-[#00C2FF]/15 to-transparent'
            : 'bg-gradient-to-br from-[#38BDF8]/20 to-transparent'
        }`}
      />
      <div
        className={`fixed bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full blur-[140px] pointer-events-none z-0 transition-all duration-1000 ${
          isDark
            ? 'bg-gradient-to-tl from-[#8B5CF6]/15 to-transparent'
            : 'bg-gradient-to-tl from-[#818CF8]/18 to-transparent'
        }`}
      />

      {/* Layer 02: Cyber Technical Grid */}
      <div className="fixed inset-0 cyber-grid-bg pointer-events-none z-0" />

      {/* Layer 03: Unified Section 3D Background Engine */}
      <Section3DBackground />

      {/* Layer 04: Neural Particle Field */}
      <NeuralBackground />

      {/* 3. Navigation Bar (with Theme Toggle capsule) */}
      <Navbar onOpenRegister={() => handleOpenRegister('dataforge')} />

      {/* 4. Page Routes with Smooth Animated Transition */}
      <div className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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

      {/* 7. DSAURA AI Robot Event Intelligence Assistant (Floating Overlay Only) */}
      <DSAURA onOpenRegister={handleOpenRegister} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}



