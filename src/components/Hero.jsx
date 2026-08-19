import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, MapPin, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import CountdownTimer from './CountdownTimer'

export default function Hero({ onOpenRegister }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 overflow-hidden">
      {/* Central Ambient Glow Behind Title */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] blur-[120px] rounded-full pointer-events-none z-0 transition-all duration-700 ${
          isDark
            ? 'bg-gradient-to-tr from-[#00C2FF]/15 via-[#6366F1]/10 to-[#00FF9D]/10'
            : 'bg-gradient-to-tr from-[#38BDF8]/25 via-[#818CF8]/15 to-[#34D399]/15'
        }`}
      />

      <div className="container-max max-w-4xl mx-auto text-center space-y-8 relative z-10">
        {/* Date & Dept Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono shadow-sm backdrop-blur-md border transition-colors ${
            isDark
              ? 'bg-[#08152e]/80 border-[#00C2FF]/30 text-slate-200 shadow-[0_0_20px_-3px_rgba(0,194,255,0.2)]'
              : 'bg-white border-[#0284C7]/30 text-slate-800 shadow-[0_2px_10px_rgba(15,23,42,0.06)]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
          <span className={`font-bold ${isDark ? 'text-[#00C2FF]' : 'text-[#0284C7]'}`}>22 AUGUST 2026</span>
          <span className={isDark ? 'text-slate-600' : 'text-slate-400'}>·</span>
          <span>TGPCET NAGPUR</span>
        </motion.div>

        {/* Main Monumental Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className={`font-display text-5xl sm:text-7xl font-black tracking-tight leading-[1.05] ${
            isDark ? 'text-white' : 'text-[#0F172A]'
          }`}>
            DSPHERE <span className="text-shimmer">2026</span>
          </h1>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            National Technical Convergence organized by the Department of Computer Science & Engineering (Data Science) at TGPCET Nagpur.
          </p>
        </motion.div>

        {/* Fast Specs / Metric Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono pt-1"
        >
          <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 shadow-sm ${
            isDark
              ? 'glass-panel-1 border-amber-400/30 bg-amber-950/10 text-amber-300'
              : 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
          }`}>
            <Award size={14} className={isDark ? 'text-amber-400' : 'text-[#D97706]'} />
            <span className="font-bold">Exciting Prizes & Rewards</span>
          </div>

          <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${
            isDark
              ? 'glass-panel-1 border-white/10 text-slate-300'
              : 'bg-white border-[#E2E8F0] text-slate-700 shadow-sm'
          }`}>
            <MapPin size={14} className={isDark ? 'text-[#00FF9D]' : 'text-[#059669]'} />
            <span>TGPCET Campus, Wardha Road</span>
          </div>

          <div className={`px-4 py-2 rounded-xl border font-bold ${
            isDark
              ? 'glass-panel-1 border-[#00C2FF]/30 text-[#00C2FF]'
              : 'bg-white border-[#0284C7]/30 text-[#0284C7] shadow-sm'
          }`}>
            <span>3 Flagship Events</span>
          </div>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          <button
            onClick={() => onOpenRegister()}
            className="btn-cyber-cyan px-8 py-3.5 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2.5 cursor-pointer uppercase group"
          >
            <span>REGISTER NOW</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <Link
            to="/events"
            className="btn-cyber-outline px-7 py-3.5 rounded-xl text-xs font-bold tracking-wider cursor-pointer uppercase"
          >
            VIEW 3 EVENTS
          </Link>
        </motion.div>

        {/* Live Mission Countdown Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="pt-4 max-w-lg mx-auto"
        >
          <CountdownTimer />
        </motion.div>
      </div>
    </section>
  )
}


