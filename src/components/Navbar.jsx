import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../context/ThemeContext'

export default function Navbar({ onOpenRegister }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Rules', path: '/rules' },
    { name: 'About CSE-DS', path: '/about' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-panel-2 border-b py-2.5 shadow-lg'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-max flex items-center justify-between">
        {/* Brand Identity */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00C2FF]/20 via-[#6366F1]/20 to-[#00FF9D]/10 border border-[#00C2FF]/40 flex items-center justify-center shadow-[0_0_15px_-3px_rgba(0,194,255,0.3)] group-hover:border-[#00C2FF] transition-colors">
            <span className="font-display font-extrabold text-sm tracking-tighter text-white">
              D<span className="text-[#00C2FF]">S</span>
            </span>
            <div className="absolute -inset-0.5 rounded-xl bg-[#00C2FF]/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex flex-col">
            <span className="font-display font-black text-base sm:text-lg leading-tight tracking-tight flex items-center gap-1.5">
              <span>DSPHERE</span>
              <span className="text-[#00C2FF] font-mono text-xs px-1.5 py-0.2 rounded bg-[#00C2FF]/10 border border-[#00C2FF]/30">2K26</span>
            </span>
            <span className="text-[9.5px] text-slate-400 font-mono tracking-wide">
              Dept. of CSE (Data Science) · TGPCET
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Pill */}
        <div className="hidden md:flex items-center gap-1 glass-panel-1 rounded-full px-3 py-1.5 shadow-sm">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-[#00C2FF] font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-[#00C2FF]/15 border border-[#00C2FF]/30 rounded-full shadow-[0_0_12px_rgba(0,194,255,0.25)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            )
          })}
        </div>

        {/* Desktop Action & Theme Switcher */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={() => onOpenRegister()}
            className="btn-cyber-cyan px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 tracking-wider uppercase cursor-pointer"
          >
            <Sparkles size={13} className="text-[#040914] animate-pulse" />
            <span>REGISTER</span>
          </button>
        </div>

        {/* Mobile Header Controls (Theme Toggle + Hamburger) */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:text-white hover:border-[#00C2FF]/40 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} className="text-[#00C2FF]" /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-t border-white/10 glass-panel-3 px-6 py-5 space-y-2 overflow-hidden shadow-2xl"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#00C2FF]/15 text-[#00C2FF] border border-[#00C2FF]/30 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight size={13} className={isActive ? 'text-[#00C2FF]' : 'text-slate-500'} />
                </Link>
              )
            })}
            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenRegister()
                }}
                className="btn-cyber-cyan w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
              >
                <Sparkles size={14} className="text-[#040914]" />
                <span>REGISTER NOW</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}


