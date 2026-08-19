import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Users, ArrowRight, Award, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function EventCard({ event, onOpenRegister, index = 0 }) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Accent styling based on event slug
  const getThemeAccents = (slug) => {
    if (slug === 'dataduals') {
      return {
        badgeBg: isDark ? 'bg-[#8B5CF6]/15 border-[#8B5CF6]/30 text-[#8B5CF6]' : 'bg-[#F5F3FF] border-[#DDD6FE] text-[#7C3AED]',
        glow: isDark ? 'hover:shadow-[0_16px_40px_-5px_rgba(139,92,246,0.25)]' : 'hover:shadow-[0_16px_30px_-5px_rgba(124,58,237,0.15)]',
        border: isDark ? 'hover:border-[#8B5CF6]/40' : 'hover:border-[#7C3AED]/40',
        tagColor: isDark ? 'text-[#8B5CF6]' : 'text-[#7C3AED]',
      }
    }
    if (slug === 'datamodelling') {
      return {
        badgeBg: isDark ? 'bg-[#00FF9D]/15 border-[#00FF9D]/30 text-[#00FF9D]' : 'bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]',
        glow: isDark ? 'hover:shadow-[0_16px_40px_-5px_rgba(0,255,157,0.25)]' : 'hover:shadow-[0_16px_30px_-5px_rgba(5,150,105,0.15)]',
        border: isDark ? 'hover:border-[#00FF9D]/40' : 'hover:border-[#059669]/40',
        tagColor: isDark ? 'text-[#00FF9D]' : 'text-[#059669]',
      }
    }
    // Default DataForge
    return {
      badgeBg: isDark ? 'bg-[#00C2FF]/15 border-[#00C2FF]/30 text-[#00C2FF]' : 'bg-[#EFF6FF] border-[#BAE6FD] text-[#0284C7]',
      glow: isDark ? 'hover:shadow-[0_16px_40px_-5px_rgba(0,194,255,0.25)]' : 'hover:shadow-[0_16px_30px_-5px_rgba(2,132,199,0.15)]',
      border: isDark ? 'hover:border-[#00C2FF]/40' : 'hover:border-[#0284C7]/40',
      tagColor: isDark ? 'text-[#00C2FF]' : 'text-[#0284C7]',
    }
  }

  const accents = getThemeAccents(event.slug)
  const trackNumber = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className={`rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between border transition-all duration-300 ${
        isDark
          ? 'glass-panel-2 border-white/10'
          : 'bg-white/95 backdrop-blur-xl border-[#CBD5E1] shadow-[0_12px_35px_-5px_rgba(15,23,42,0.09),0_1px_3px_rgba(0,0,0,0.05)]'
      } ${accents.glow} ${accents.border}`}
    >
      {/* Light Mode Top Iridescent Chromatic Accent Strip */}
      {!isDark && (
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0284C7] via-[#F43F5E] via-[#F59E0B] to-[#10B981]" />
      )}

      {/* Cursor-Following Radial Highlight */}
      {isHovered && (
        <div
          className="absolute pointer-events-none rounded-full blur-2xl opacity-20 transition-opacity duration-300"
          style={{
            width: '240px',
            height: '240px',
            left: `${mousePos.x - 120}px`,
            top: `${mousePos.y - 120}px`,
            background: isDark
              ? 'radial-gradient(circle, rgba(0, 194, 255, 0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(2, 132, 199, 0.35) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Top Track Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className={`font-mono text-xs font-bold tracking-wider ${isDark ? 'text-slate-500' : 'text-[#0284C7]'}`}>
              TRACK {trackNumber}
            </span>
            <span className={isDark ? 'text-slate-700' : 'text-slate-300'}>·</span>
            <span className={`text-[10.5px] font-mono uppercase font-semibold px-2.5 py-0.5 rounded-full border ${accents.badgeBg}`}>
              {event.category}
            </span>
          </div>

          <div className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-semibold border flex items-center gap-1 ${
            isDark
              ? 'bg-amber-400/10 text-amber-300 border-amber-400/20'
              : 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A] shadow-sm'
          }`}>
            <Award size={12} className={isDark ? 'text-amber-400' : 'text-[#D97706]'} />
            <span className="truncate max-w-[120px]">{event.prizePool}</span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className={`text-2xl font-display font-black tracking-tight leading-snug ${
          isDark ? 'text-white' : 'text-[#0F172A]'
        }`}>
          {event.name}
        </h3>
        <p className={`text-xs font-mono font-semibold mt-1 ${accents.tagColor}`}>
          {event.tagline}
        </p>

        {/* Short Description */}
        <p className={`text-xs sm:text-sm mt-3.5 leading-relaxed font-normal line-clamp-3 ${
          isDark ? 'text-slate-300' : 'text-[#334155]'
        }`}>
          {event.shortDesc}
        </p>

        {/* Fast Details Specs Bar */}
        <div className={`grid grid-cols-2 gap-2.5 mt-5 pt-3.5 border-t text-xs font-mono p-2.5 rounded-xl ${
          isDark
            ? 'border-white/5 text-slate-300 bg-[#030915]/50'
            : 'border-[#CBD5E1] text-[#1E293B] bg-[#F1F5F9]/90 shadow-sm'
        }`}>
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className={`shrink-0 ${isDark ? 'text-[#00C2FF]' : 'text-[#0284C7]'}`} />
            <span className="truncate font-semibold">{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <Users size={13} className={`shrink-0 ${isDark ? 'text-[#00FF9D]' : 'text-[#059669]'}`} />
            <span className="truncate font-semibold">Team: {event.teamSize}</span>
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className={`mt-6 pt-3.5 border-t flex items-center gap-3 relative z-10 ${
        isDark ? 'border-white/10' : 'border-[#E2E8F0]'
      }`}>
        <Link
          to={`/events/${event.slug}`}
          className={`flex-1 py-2.5 px-3.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer group ${
            isDark
              ? 'border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-slate-200'
              : 'border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#0F172A] shadow-sm hover:border-[#0284C7]'
          }`}
        >
          <span>View Details</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        <button
          onClick={() => {
            if (onOpenRegister) onOpenRegister(event.slug)
          }}
          className="py-2.5 px-4 rounded-xl btn-cyber-cyan text-xs font-bold flex items-center justify-center gap-1 uppercase tracking-wider cursor-pointer shadow-md"
        >
          <Sparkles size={12} className={isDark ? 'text-[#040914]' : 'text-white'} />
          <span>Register</span>
        </button>
      </div>
    </motion.div>
  )
}



