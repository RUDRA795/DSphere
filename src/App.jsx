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

      {/* Layer 01: Ambient Light Fields (Atmospheric Multi-Color Depth) */}
      {isDark ? (
        <>
          <div className="fixed top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full blur-[140px] pointer-events-none z-0 bg-gradient-to-br from-[#00C2FF]/15 to-transparent transition-all duration-1000" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full blur-[140px] pointer-events-none z-0 bg-gradient-to-tl from-[#8B5CF6]/15 to-transparent transition-all duration-1000" />
        </>
      ) : (
        <>
          {/* Light Mode Multi-Chromatic Aurora Mesh: Blue, Red/Coral, Amber/Yellow, Emerald/Green, Violet */}
          <div className="fixed top-[-12%] left-[-10%] w-[58vw] h-[58vw] rounded-full blur-[140px] pointer-events-none z-0 bg-gradient-to-br from-[#0284C7]/28 via-[#38BDF8]/20 to-transparent transition-all duration-1000 animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="fixed top-[4%] right-[-12%] w-[52vw] h-[52vw] rounded-full blur-[140px] pointer-events-none z-0 bg-gradient-to-bl from-[#F43F5E]/22 via-[#FB7185]/16 to-transparent transition-all duration-1000 animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="fixed top-[35%] left-[20%] w-[48vw] h-[48vw] rounded-full blur-[150px] pointer-events-none z-0 bg-gradient-to-tr from-[#F59E0B]/20 via-[#FBBF24]/14 to-transparent transition-all duration-1000" />
          <div className="fixed bottom-[12%] left-[-10%] w-[52vw] h-[52vw] rounded-full blur-[140px] pointer-events-none z-0 bg-gradient-to-tr from-[#10B981]/24 via-[#34D399]/18 to-transparent transition-all duration-1000 animate-pulse" style={{ animationDuration: '9s' }} />
          <div className="fixed bottom-[-10%] right-[-10%] w-[56vw] h-[56vw] rounded-full blur-[140px] pointer-events-none z-0 bg-gradient-to-tl from-[#8B5CF6]/22 via-[#6366F1]/18 to-transparent transition-all duration-1000" />
        </>
      )}

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



