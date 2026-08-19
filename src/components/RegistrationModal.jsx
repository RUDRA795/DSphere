import React, { useState, useEffect } from 'react'
import { X, ExternalLink, Copy, Check, Sparkles, Award } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { EVENTS } from '../data/events'

export default function RegistrationModal({ isOpen, onClose, preselectedSlug = 'dataforge' }) {
  const [selectedSlug, setSelectedSlug] = useState(preselectedSlug)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (preselectedSlug) {
      setSelectedSlug(preselectedSlug)
    }
    setCopied(false)
  }, [preselectedSlug, isOpen])

  if (!isOpen) return null

  const currentEvent = EVENTS.find((e) => e.slug === selectedSlug) || EVENTS[0]

  const handleCopy = () => {
    navigator.clipboard.writeText(currentEvent.registration)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTrackChange = (slug) => {
    setSelectedSlug(slug)
    setCopied(false)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-[#02050D]/85 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl glass-panel-3 rounded-3xl border border-[#00C2FF]/30 p-6 sm:p-7 z-10 space-y-5 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="space-y-0.5">
              <span className="section-tag">OFFICIAL REGISTRATION</span>
              <h2 className="text-xl sm:text-2xl font-display font-black text-white">Event Registration</h2>
              <p className="text-xs text-slate-400 font-mono">DSphere 2K26 · TGPCET Nagpur</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5"
            >
              <X size={18} />
            </button>
          </div>

          {/* Track Selector */}
          <div>
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
              Select Competition Track:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {EVENTS.map((ev) => {
                const isSelected = ev.slug === selectedSlug
                return (
                  <button
                    key={ev.slug}
                    onClick={() => handleTrackChange(ev.slug)}
                    className={`p-3 rounded-2xl text-left border text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#00C2FF] bg-[#00C2FF]/15 text-[#00C2FF] font-bold shadow-[0_0_15px_rgba(0,194,255,0.2)]'
                        : 'border-white/10 bg-[#030915]/80 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold text-sm text-white">{ev.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">{ev.day}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Track Dossier Specs Card */}
          <div className="bg-[#030915]/90 rounded-2xl p-5 border border-white/10 space-y-3.5 shadow-inner">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div>
                <div className="font-bold text-base text-white">{currentEvent.name}</div>
                <div className="text-xs text-[#00C2FF] font-mono">{currentEvent.category}</div>
              </div>
              <div className="text-xs font-mono text-amber-300 font-bold bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20 flex items-center gap-1">
                <Award size={12} className="text-amber-400" />
                <span>{currentEvent.prizePool}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                <span className="text-slate-500 block text-[9.5px] uppercase font-bold">DATE</span>
                <span className="text-slate-200">{currentEvent.date}</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                <span className="text-slate-500 block text-[9.5px] uppercase font-bold">TEAM SIZE</span>
                <span className="text-slate-200">{currentEvent.teamSize}</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                <span className="text-slate-500 block text-[9.5px] uppercase font-bold">ENTRY FEE</span>
                <span className="text-[#00FF9D] font-bold">{currentEvent.entryFee}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {currentEvent.shortDesc}
            </p>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={currentEvent.registration}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-cyber-cyan py-3 px-5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-center uppercase tracking-wider cursor-pointer shadow-lg"
            >
              <span>OPEN GOOGLE FORM</span>
              <ExternalLink size={14} />
            </a>

            <button
              onClick={handleCopy}
              className="px-4 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-[#00FF9D]" />
                  <span className="text-[#00FF9D] font-bold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>COPY LINK</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

