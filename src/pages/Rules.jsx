import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, Search, CheckCircle2, AlertTriangle, Cpu, Box, FileCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { GENERAL_GUIDELINES, DISQUALIFICATION_POLICY } from '../data/rules'
import { EVENTS } from '../data/events'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export default function Rules() {
  const [openEventSlug, setOpenEventSlug] = useState('dataforge')
  const [searchQuery, setSearchQuery] = useState('')

  const toggleAccordion = (slug) => {
    setOpenEventSlug(openEventSlug === slug ? null : slug)
  }

  const filteredGuidelines = GENERAL_GUIDELINES.filter((g) => {
    if (!searchQuery) return true
    return (
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.points.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

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
          Rules & Guidelines
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          General code of conduct, eligibility terms, and event-specific rules for DSphere 2026.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="relative max-w-sm"
      >
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search rules..."
          className="w-full bg-[#030915] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00C2FF]"
        />
      </motion.div>

      {/* General Directives */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold text-white">
          General Guidelines
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {filteredGuidelines.map((guide, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-panel p-5 rounded-xl border border-white/10 space-y-2.5"
            >
              <h3 className="font-display text-sm font-bold text-white">
                {guide.title}
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {guide.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-[#00FF9D] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Disqualification Directives */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-5 rounded-xl border border-red-500/20 bg-red-950/10 space-y-2"
      >
        <div className="text-xs font-mono font-bold text-red-400">
          DISQUALIFICATION CRITERIA
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
          {DISQUALIFICATION_POLICY.map((item, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-red-400 font-bold">✕</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Event Rulebooks */}
      <div className="space-y-3">
        <h2 className="font-display text-xl font-bold text-white">
          Track-Specific Rules
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {EVENTS.map((ev) => {
            const isOpen = openEventSlug === ev.slug

            return (
              <motion.div
                key={ev.slug}
                variants={itemVariants}
                className="glass-panel rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(ev.slug)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-base font-bold text-white">{ev.name}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/20">
                        {ev.category}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-400">{ev.day} · {ev.time} · {ev.venue.split(',')[0]}</p>
                  </div>
                  {isOpen ? <ChevronUp size={18} className="text-[#00C2FF]" /> : <ChevronDown size={18} className="text-slate-400" />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 pt-2 border-t border-white/5 space-y-4 text-xs sm:text-sm text-slate-300"
                    >
                      {/* Rules list */}
                      <div>
                        <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                          📋 Official Event Rules
                        </h4>
                        <ol className="space-y-2 list-decimal ml-4 leading-relaxed">
                          {ev.rules.map((r, rIdx) => (
                            <li key={rIdx} className="pl-1.5">{r}</li>
                          ))}
                        </ol>
                      </div>

                      {/* Important Directive if any */}
                      {ev.importantNote && (
                        <div className="p-3.5 rounded-lg border border-amber-400/30 bg-amber-950/15 space-y-1">
                          <div className="flex items-center gap-1.5 text-amber-300 text-xs font-mono font-bold">
                            <AlertTriangle size={13} />
                            <span>IMPORTANT NOTE</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {ev.importantNote}
                          </p>
                        </div>
                      )}

                      {/* Supported Software if any */}
                      {ev.supportedSoftware && (
                        <div className="space-y-2 pt-1">
                          <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
                            💻 Supported Software
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {ev.supportedSoftware.map((group, gIdx) => (
                              <div key={gIdx} className="bg-[#030915] p-3 rounded-lg border border-white/5 space-y-1.5">
                                <div className="text-xs font-bold text-white font-mono">{group.domain}</div>
                                <div className="flex flex-wrap gap-1">
                                  {group.tools.map((t, tIdx) => (
                                    <span key={tIdx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-[#00C2FF]">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Submission Requirements if any */}
                      {ev.submissionRequirements && (
                        <div className="space-y-2 pt-1">
                          <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
                            📦 Submission Requirements
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {ev.submissionRequirements.map((req, rIdx) => (
                              <div key={rIdx} className="bg-[#030915] p-3 rounded-lg border border-white/5 space-y-0.5">
                                <div className="text-xs font-bold text-white font-mono">{req.title}</div>
                                <p className="text-xs text-slate-400">{req.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Submission Checklist if any */}
                      {ev.submissionChecklist && (
                        <div className="space-y-2 pt-1">
                          <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
                            📦 Submission Checklist
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {ev.submissionChecklist.map((item, cIdx) => (
                              <div key={cIdx} className="bg-[#030915] p-2.5 rounded-lg border border-white/5 flex items-center gap-2 text-xs">
                                <CheckCircle2 size={13} className="text-[#00FF9D] shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Track footer bar */}
                      <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
                        <div>Team: <span className="text-white">{ev.teamSize}</span> | Fee: <span className="text-[#00FF9D]">{ev.entryFee}</span> | Prizes: <span className="text-amber-300">{ev.prizePool}</span></div>
                        <Link to={`/events/${ev.slug}`} className="text-[#00C2FF] hover:underline flex items-center gap-1 self-start sm:self-auto">
                          <span>View Full Track Details</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
