import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, Search, CheckCircle2, AlertTriangle, Cpu, Box, FileCheck, ArrowRight, Sparkles } from 'lucide-react'
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
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
    <div className="pt-28 sm:pt-32 pb-20 container-max space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6"
      >
        <div className="space-y-2">
          <span className="section-tag">OFFICIAL CODE & DIRECTIVES</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
            Rules & Guidelines
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            General code of conduct, eligibility terms, and event-specific rules for DSphere 2026.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[260px] self-start sm:self-auto">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all directives..."
            className="w-full bg-[#030915]/90 border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] font-mono transition-all"
          />
        </div>
      </motion.div>

      {/* General Directives */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="section-tag">GENERAL DIRECTIVES</span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
            Eligibility & Festival Regulations
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {filteredGuidelines.map((guide, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-panel-2 p-6 rounded-2xl border border-white/10 space-y-3 shadow-md hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                <h3 className="font-display text-base font-bold text-white">
                  {guide.title}
                </h3>
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                  SEC 0{idx + 1}
                </span>
              </div>

              <ul className="space-y-2 text-xs text-slate-300">
                {guide.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 size={14} className="text-[#00FF9D] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Disqualification Directives Caution Panel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="glass-panel-2 p-6 sm:p-7 rounded-2xl border border-red-500/30 bg-red-950/20 space-y-3 shadow-[0_0_30px_-5px_rgba(239,68,68,0.15)]"
      >
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400">
          <AlertTriangle size={16} />
          <span>DISQUALIFICATION PROTOCOLS & INTEGRITY POLICY</span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          {DISQUALIFICATION_POLICY.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 bg-[#030915]/60 p-3 rounded-xl border border-red-500/15">
              <span className="text-red-400 font-bold">✕</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Track Rulebooks Accordions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="section-tag">COMPETITION DOSSIERS</span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
            Track-Specific Rulebooks
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {EVENTS.map((ev) => {
            const isOpen = openEventSlug === ev.slug

            return (
              <motion.div
                key={ev.slug}
                variants={itemVariants}
                className="glass-panel-2 rounded-2xl border border-white/10 overflow-hidden shadow-lg"
              >
                <button
                  onClick={() => toggleAccordion(ev.slug)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-display text-lg font-bold text-white">{ev.name}</h3>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/20 font-semibold">
                        {ev.category}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-400">{ev.day} · {ev.time} · {ev.venue.split(',')[0]}</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                    {isOpen ? <ChevronUp size={18} className="text-[#00C2FF]" /> : <ChevronDown size={18} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 pt-2 border-t border-white/5 space-y-5 text-xs sm:text-sm text-slate-300"
                    >
                      {/* Rules list */}
                      <div>
                        <h4 className="font-mono text-xs text-[#00C2FF] uppercase tracking-wider mb-2.5 font-bold flex items-center gap-1.5">
                          <Sparkles size={13} />
                          <span>Official Event Rules</span>
                        </h4>
                        <ol className="space-y-2 list-decimal ml-4 leading-relaxed">
                          {ev.rules.map((r, rIdx) => (
                            <li key={rIdx} className="pl-2">{r}</li>
                          ))}
                        </ol>
                      </div>

                      {/* Important Directive */}
                      {ev.importantNote && (
                        <div className="p-4 rounded-xl border border-amber-400/30 bg-amber-950/20 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-amber-300 text-xs font-mono font-bold">
                            <AlertTriangle size={14} />
                            <span>IMPORTANT DIRECTIVE</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {ev.importantNote}
                          </p>
                        </div>
                      )}

                      {/* Supported Software */}
                      {ev.supportedSoftware && (
                        <div className="space-y-2 pt-1">
                          <h4 className="font-mono text-xs text-slate-300 uppercase tracking-wider font-semibold">
                            💻 Supported Software Suite
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {ev.supportedSoftware.map((group, gIdx) => (
                              <div key={gIdx} className="bg-[#030915]/80 p-3.5 rounded-xl border border-white/5 space-y-1.5">
                                <div className="text-xs font-bold text-white font-mono">{group.domain}</div>
                                <div className="flex flex-wrap gap-1.5">
                                  {group.tools.map((t, tIdx) => (
                                    <span key={tIdx} className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-[#00C2FF]">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Submission Requirements */}
                      {ev.submissionRequirements && (
                        <div className="space-y-2 pt-1">
                          <h4 className="font-mono text-xs text-slate-300 uppercase tracking-wider font-semibold">
                            📦 Submission Deliverables
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {ev.submissionRequirements.map((req, rIdx) => (
                              <div key={rIdx} className="bg-[#030915]/80 p-3.5 rounded-xl border border-white/5 space-y-1">
                                <div className="text-xs font-bold text-white font-mono">{req.title}</div>
                                <p className="text-xs text-slate-400">{req.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Track footer bar */}
                      <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                        <div>Team: <span className="text-white font-bold">{ev.teamSize}</span> | Fee: <span className="text-[#00FF9D] font-bold">{ev.entryFee}</span> | Prizes: <span className="text-amber-300 font-bold">{ev.prizePool}</span></div>
                        <Link to={`/events/${ev.slug}`} className="text-[#00C2FF] font-bold hover:underline flex items-center gap-1.5 self-start sm:self-auto">
                          <span>View Full Track Dossier</span>
                          <ArrowRight size={13} />
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

