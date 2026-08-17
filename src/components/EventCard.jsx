import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Users, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function EventCard({ event, onOpenRegister, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/10 hover:border-white/20 transition-colors"
    >
      <div>
        {/* Header: Category & Prize */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            {event.category}
          </span>
          <div className="px-2.5 py-0.5 rounded-md bg-amber-400/10 text-amber-300 text-xs font-mono font-semibold border border-amber-400/20">
            {event.prizePool}
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl font-display font-bold text-white">
          {event.name}
        </h3>
        <p className="text-xs font-mono text-[#00C2FF] mt-0.5">
          {event.tagline}
        </p>

        {/* Short Description */}
        <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
          {event.shortDesc}
        </p>

        {/* Fast Details */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-slate-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <Users size={13} className="text-slate-400" />
            <span>Team: {event.teamSize}</span>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-3">
        <Link
          to={`/events/${event.slug}`}
          className="flex-1 py-2 px-3 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight size={13} />
        </Link>

        <button
          onClick={() => {
            if (onOpenRegister) onOpenRegister(event.slug)
          }}
          className="py-2 px-4 rounded-lg btn-cyber-cyan text-xs font-bold flex items-center justify-center cursor-pointer"
        >
          <span>Register</span>
        </button>
      </div>
    </motion.div>
  )
}
