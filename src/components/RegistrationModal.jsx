import React, { useState } from 'react'
import { X, ExternalLink, Copy, Check } from 'lucide-react'
import { EVENTS } from '../data/events'

export default function RegistrationModal({ isOpen, onClose, preselectedSlug = 'dataforge' }) {
  const [selectedSlug, setSelectedSlug] = useState(preselectedSlug)
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const currentEvent = EVENTS.find((e) => e.slug === selectedSlug) || EVENTS[0]

  const handleCopy = () => {
    navigator.clipboard.writeText(currentEvent.registration)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#040914]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl glass-panel bg-[#071124] rounded-2xl border border-white/15 p-6 z-10 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h2 className="text-lg font-display font-bold text-white">Event Registration</h2>
            <p className="text-xs text-slate-400 font-mono">DSphere 2k26 · TGPCET Nagpur</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Track Selector */}
        <div>
          <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
            Select Track:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {EVENTS.map((ev) => {
              const isSelected = ev.slug === selectedSlug
              return (
                <button
                  key={ev.slug}
                  onClick={() => setSelectedSlug(ev.slug)}
                  className={`p-2 rounded-xl text-left border text-xs transition-all ${
                    isSelected
                      ? 'border-[#00C2FF] bg-[#00C2FF]/10 text-[#00C2FF] font-bold'
                      : 'border-white/10 bg-[#030915] text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div>{ev.name}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{ev.day}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-[#030915] rounded-xl p-4 border border-white/5 space-y-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div>
              <div className="font-bold text-sm text-white">{currentEvent.name}</div>
              <div className="text-xs text-slate-400">{currentEvent.category}</div>
            </div>
            <div className="text-xs font-mono text-amber-300 font-semibold">
              {currentEvent.prizePool}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">DATE</span>
              <span className="text-slate-200">{currentEvent.date}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">TEAM SIZE</span>
              <span className="text-slate-200">{currentEvent.teamSize}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">ENTRY FEE</span>
              <span className="text-[#00FF9D]">{currentEvent.entryFee}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            {currentEvent.shortDesc}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <a
            href={currentEvent.registration}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-cyber-cyan py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-center cursor-pointer"
          >
            <span>OPEN GOOGLE FORM</span>
            <ExternalLink size={14} />
          </a>

          <button
            onClick={handleCopy}
            className="px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={13} className="text-[#00FF9D]" />
                <span className="text-[#00FF9D]">COPIED</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>COPY LINK</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
