import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, MapPin, Calendar, Sparkles } from 'lucide-react'
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
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
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
    <div className="pt-24 sm:pt-28 pb-16 container-max space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4"
      >
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Event Schedule
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            One-day synchronized schedule for DSphere 2026 at TGPCET Nagpur campus.
          </p>
        </div>

        <div className="glass-panel px-3.5 py-1.5 rounded-lg border border-[#00C2FF]/30 text-xs font-mono text-[#00C2FF] flex items-center gap-2 self-start sm:self-auto">
          <Calendar size={14} />
          <span>Saturday, 22 August 2026</span>
        </div>
      </motion.div>

      {/* Date Banner & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="glass-panel p-4 rounded-xl border border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF]">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-[#00C2FF]">ONE-DAY MEGA CONVERGENCE</div>
            <div className="font-display font-bold text-sm sm:text-base text-white">22 August 2026 · 09:30 AM to 04:00 PM</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {filterOptions.map((opt) => {
            const isSelected = filter === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => setFilter(opt.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#00C2FF] text-[#040914] font-bold'
                    : 'glass-panel text-slate-300 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Timeline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="space-y-3"
        >
          {filteredTimeline.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 2, transition: { duration: 0.2 } }}
              className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 glass-panel p-4 sm:p-5 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="sm:w-44 shrink-0 font-mono text-xs font-semibold text-[#00C2FF] flex items-center gap-1.5">
                <Clock size={13} />
                <span>{item.time}</span>
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-sm sm:text-base font-bold text-white">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                    {item.tag}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-4 pt-1 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} className="text-[#00FF9D]" />
                    <span>{item.venue}</span>
                  </div>
                  {item.eventSlug && (
                    <Link
                      to={`/events/${item.eventSlug}`}
                      className="text-[#00C2FF] hover:underline text-[11px]"
                    >
                      View Details →
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
