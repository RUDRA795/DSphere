import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, MapPin } from 'lucide-react'
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
  const [activeDay, setActiveDay] = useState('day1')
  const currentDayData = SCHEDULE_DAYS.find((d) => d.dayId === activeDay) || SCHEDULE_DAYS[0]

  return (
    <div className="pt-24 sm:pt-28 pb-16 container-max space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-white/10 pb-4"
      >
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
          Event Schedule
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          2-Day schedule for DSphere 2026 at TGPCET Nagpur campus.
        </p>
      </motion.div>

      {/* Day Selector */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="grid grid-cols-2 gap-3 max-w-md"
      >
        {SCHEDULE_DAYS.map((day) => {
          const isSelected = activeDay === day.dayId
          return (
            <button
              key={day.dayId}
              onClick={() => setActiveDay(day.dayId)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#00C2FF] bg-[#00C2FF]/10 text-white'
                  : 'glass-panel text-slate-300 hover:border-white/20'
              }`}
            >
              <div className="text-xs font-mono font-bold text-[#00C2FF]">{day.dayLabel}</div>
              <div className="font-display font-bold text-sm sm:text-base mt-0.5">{day.date.split(',')[0]}</div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">{day.focus.split('&')[0]}</div>
            </button>
          )
        })}
      </motion.div>

      {/* Timeline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="space-y-3"
        >
          {currentDayData.timeline.map((item, index) => (
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
