import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, MapPin, Calendar, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SCHEDULE_DAYS } from '../data/schedule'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
}

export default function Schedule() {
  const [filter, setFilter] = useState('ALL')
  const dayData = SCHEDULE_DAYS[0]

  const filterOptions = [
    { id: 'ALL', label: 'Full Schedule' },
    { id: 'COMPETITIONS', label: 'Competitions' },
    { id: 'CEREMONY', label: 'Inauguration & Valedictory' },
  ]

  const filteredTimeline = dayData.timeline.filter((item) => {
    if (filter === 'COMPETITIONS') {
      return item.eventSlug || item.tag === 'Live Competition' || item.tag === 'Pitching'
    }
    if (filter === 'CEREMONY') {
      return item.tag === 'Ceremony' || item.tag === 'Valedictory' || item.tag === 'Onboarding'
    }
    return true
  })

  return (
    <div className="pt-28 sm:pt-32 pb-20 container-max space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6"
      >
        <div className="space-y-2">
          <span className="section-tag">MASTER TIMELINE</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
            Event Schedule
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            One-day synchronized schedule for DSphere 2026 at TGPCET Nagpur campus.
          </p>
        </div>

        <div className="glass-panel-1 px-4 py-2 rounded-xl border border-[#00C2FF]/30 text-xs font-mono text-[#00C2FF] flex items-center gap-2 self-start sm:self-auto shadow-[0_0_15px_-3px_rgba(0,194,255,0.2)]">
          <Calendar size={14} />
          <span className="font-bold">Saturday, 22 August 2026</span>
        </div>
      </motion.div>

      {/* Date Banner & Filters Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 glass-panel-2 p-4 sm:p-5 rounded-2xl border border-white/10 shadow-lg"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#00C2FF]/10 border border-[#00C2FF]/30 flex items-center justify-center text-[#00C2FF] shadow-[0_0_15px_rgba(0,194,255,0.2)] shrink-0">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="text-[10.5px] font-mono font-bold text-[#00C2FF] tracking-wider uppercase">ONE-DAY MEGA CONVERGENCE</div>
            <div className="font-display font-bold text-base sm:text-lg text-white">22 August 2026 · 09:30 AM to 04:00 PM</div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
          {filterOptions.map((opt) => {
            const isSelected = filter === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => setFilter(opt.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'text-[#040914] font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="scheduleActivePill"
                    className="absolute inset-0 bg-[#00C2FF] rounded-xl shadow-[0_0_15px_rgba(0,194,255,0.4)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{opt.label}</span>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Cinematic Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#00C2FF]/30 space-y-5 py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-4"
          >
            {filteredTimeline.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 3, transition: { duration: 0.2 } }}
                className="relative group"
              >
                {/* Timeline Milestone Node Point */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-3.5 h-3.5 rounded-full bg-[#040914] border-2 border-[#00C2FF] group-hover:bg-[#00C2FF] group-hover:scale-125 transition-all shadow-[0_0_10px_#00C2FF]" />

                <div className="glass-panel-2 p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-[#00C2FF]/30 transition-all flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 shadow-md">
                  {/* Time badge */}
                  <div className="sm:w-40 shrink-0 font-mono text-xs font-bold text-[#00C2FF] flex items-center gap-2 bg-[#00C2FF]/10 px-3 py-1.5 rounded-xl border border-[#00C2FF]/20 self-start">
                    <Clock size={13} className="text-[#00FF9D]" />
                    <span>{item.time}</span>
                  </div>

                  {/* Content details */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-[#00C2FF] transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10 font-semibold uppercase">
                        {item.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between gap-4 pt-2 text-xs font-mono text-slate-400 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-[#00FF9D]" />
                        <span>{item.venue}</span>
                      </div>

                      {item.eventSlug && (
                        <Link
                          to={`/events/${item.eventSlug}`}
                          className="text-[#00C2FF] hover:underline text-xs font-bold flex items-center gap-1"
                        >
                          <span>View Track Details</span>
                          <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

