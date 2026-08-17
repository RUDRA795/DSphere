import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'

export default function Navbar({ onOpenRegister }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#040914]/90 backdrop-blur-md border-b border-white/10 py-3'
          : 'bg-[#040914]/60 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="container-max flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#00C2FF]/20 to-[#6366F1]/20 border border-[#00C2FF]/30 flex items-center justify-center">
            <span className="font-display font-extrabold text-base text-white">
              D<span className="text-[#00C2FF]">S</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-white leading-tight">
              DSPHERE <span className="text-[#00C2FF]">2K26</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Department of CSE~Data Science, TGPCET
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-[#081326]/60 border border-white/10 rounded-full px-4 py-1.5">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                  isActive
                    ? 'text-[#00C2FF] bg-[#00C2FF]/10'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => onOpenRegister()}
            className="btn-cyber-cyan px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles size={13} />
            <span>REGISTER</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-white/10 text-slate-200"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#040914] px-6 py-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-xs font-semibold ${
                  isActive ? 'bg-[#00C2FF]/10 text-[#00C2FF]' : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenRegister()
              }}
              className="btn-cyber-cyan w-full py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={13} />
              <span>REGISTER</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
