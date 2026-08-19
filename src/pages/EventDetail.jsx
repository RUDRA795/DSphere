import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Layers,
  FileCheck,
  Target,
  Sparkles
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { EVENTS } from '../data/events'

export default function EventDetail({ onOpenRegister }) {
  const { slug } = useParams()
  const event = EVENTS.find((e) => e.slug === slug)
  const [activeTab, setActiveTab] = useState('overview')
  const [copied, setCopied] = useState(false)

  if (!event) {
    return (
      <div className="pt-36 pb-24 container-max text-center space-y-4">
        <h1 className="text-3xl font-display font-bold text-white">Event Not Found</h1>
        <Link to="/events" className="btn-cyber-cyan px-5 py-2.5 rounded-xl inline-block text-xs font-bold uppercase">
          ← Back to Events
        </Link>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'rules', label: 'Rules & Guidelines' },
    { id: 'software', label: event.supportedSoftware ? 'Supported Software' : null },
    { id: 'submission', label: (event.submissionRequirements || event.submissionChecklist) ? 'Submission Specs' : null },
    { id: 'evaluation', label: 'Evaluation' },
  ].filter(t => t.label !== null)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(event.registration)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="pt-28 sm:pt-32 pb-20 container-max space-y-8">
      {/* Back Link */}
      <Link
        to="/events"
        className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#00C2FF] transition-colors group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span>BACK TO ALL COMPETITIONS</span>
      </Link>

      {/* Header Dossier Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="glass-panel-2 p-6 sm:p-9 rounded-3xl border border-white/10 space-y-5 relative overflow-hidden shadow-2xl"
      >
        {/* Corner Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#00C2FF]/10 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <span className="section-tag">{event.category}</span>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {event.name}
            </h1>
            <p className="text-sm sm:text-base font-mono text-[#00C2FF] font-semibold">
              {event.tagline}
            </p>
          </div>
        </div>

        {/* Quick Specs Bar */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-slate-300 pt-4 border-t border-white/10 relative z-10">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-[#00C2FF]" />
            <span>{event.date} ({event.day})</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-[#00FF9D]" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-slate-400" />
            <span>{event.venue}</span>
          </div>
        </div>
      </motion.div>

      {/* Main Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tab buttons */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
            {tabs.map((t) => {
              const isTabActive = activeTab === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                    isTabActive
                      ? 'text-[#040914] font-bold shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isTabActive && (
                    <motion.div
                      layoutId="eventDetailTabActive"
                      className="absolute inset-0 bg-[#00C2FF] rounded-xl shadow-[0_0_15px_rgba(0,194,255,0.4)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="glass-panel-2 p-6 sm:p-7 rounded-2xl border border-white/10 space-y-3">
                    <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                      <Sparkles size={16} className="text-[#00C2FF]" />
                      <span>Event Overview</span>
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {event.objectives && (
                    <div className="glass-panel-2 p-6 sm:p-7 rounded-2xl border border-white/10 space-y-4">
                      <div className="flex items-center gap-2">
                        <Target size={17} className="text-[#00C2FF]" />
                        <h3 className="font-display text-lg font-bold text-white">Core Objectives</h3>
                      </div>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                        {event.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-3 bg-[#030915]/60 p-3 rounded-xl border border-white/5">
                            <CheckCircle2 size={15} className="text-[#00FF9D] shrink-0 mt-0.5" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {event.tracks && (
                    <div className="glass-panel-2 p-6 sm:p-7 rounded-2xl border border-white/10 space-y-4">
                      <div className="flex items-center gap-2">
                        <Layers size={17} className="text-[#00C2FF]" />
                        <h3 className="font-display text-lg font-bold text-white">Focus Domains & Themes</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {event.tracks.map((tr, i) => (
                          <div key={i} className="bg-[#030915]/80 p-4 rounded-xl border border-white/5 space-y-1.5 hover:border-[#00C2FF]/30 transition-colors">
                            <div className="text-xs font-bold text-white font-mono">{tr.title}</div>
                            <p className="text-slate-400 text-xs leading-relaxed">{tr.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Rules & Guidelines */}
              {activeTab === 'rules' && (
                <div className="space-y-6">
                  <div className="glass-panel-2 p-6 sm:p-7 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="font-display text-lg font-bold text-white">Rules & Guidelines</h3>
                    <ol className="space-y-3 list-decimal ml-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {event.rules.map((rule, idx) => (
                        <li key={idx} className="pl-2">{rule}</li>
                      ))}
                    </ol>
                  </div>

                  {event.importantNote && (
                    <div className="glass-panel-2 p-5 rounded-2xl border border-amber-400/30 bg-amber-950/20 space-y-2">
                      <div className="flex items-center gap-2 text-amber-300 text-xs font-mono font-bold">
                        <AlertTriangle size={15} />
                        <span>IMPORTANT PARTICIPANT DIRECTIVE</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {event.importantNote}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Supported Software */}
              {activeTab === 'software' && event.supportedSoftware && (
                <div className="space-y-6">
                  <div className="glass-panel-2 p-6 sm:p-7 rounded-2xl border border-white/10 space-y-5">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">Supported Software & Tools</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Participants can use any of the following recommended tools according to their engineering domain:
                      </p>
                    </div>

                    <div className="space-y-3.5">
                      {event.supportedSoftware.map((group, idx) => (
                        <div key={idx} className="bg-[#030915]/80 p-4 rounded-xl border border-white/5 space-y-2.5">
                          <div className="text-xs font-bold text-white font-mono">{group.domain}</div>
                          <div className="flex flex-wrap gap-2">
                            {group.tools.map((tool, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#00C2FF] font-semibold"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-slate-400 italic bg-white/5 p-4 rounded-xl border border-white/5">
                      Note: The above list is provided as recommended software support. Participants may use another professional 3D modelling/CAD tool if it is suitable for their project and approved by the organizers.
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Submission Specs */}
              {activeTab === 'submission' && (
                <div className="space-y-6">
                  {event.submissionRequirements && (
                    <div className="glass-panel-2 p-6 sm:p-7 rounded-2xl border border-white/10 space-y-4">
                      <div className="flex items-center gap-2">
                        <FileCheck size={17} className="text-[#00FF9D]" />
                        <h3 className="font-display text-lg font-bold text-white">Submission Requirements</h3>
                      </div>

                      <div className="space-y-3">
                        {event.submissionRequirements.map((req, idx) => (
                          <div key={idx} className="bg-[#030915]/80 p-4 rounded-xl border border-white/5 space-y-1">
                            <div className="text-xs font-bold text-white font-mono">{req.title}</div>
                            <p className="text-xs text-slate-300 leading-relaxed">{req.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {event.submissionChecklist && (
                    <div className="glass-panel-2 p-6 sm:p-7 rounded-2xl border border-white/10 space-y-4">
                      <div className="flex items-center gap-2">
                        <FileCheck size={17} className="text-[#00C2FF]" />
                        <h3 className="font-display text-lg font-bold text-white">Submission Checklist</h3>
                      </div>

                      <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                        {event.submissionChecklist.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[#030915]/80 border border-white/5">
                            <CheckCircle2 size={15} className="text-[#00FF9D] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Evaluation */}
              {activeTab === 'evaluation' && (
                <div className="glass-panel-2 p-6 sm:p-7 rounded-2xl border border-white/10 space-y-5">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Judging & Evaluation Criteria</h3>
                    <p className="text-xs text-slate-400 mt-1">Weighted scoring rubric applied by the jury panel:</p>
                  </div>

                  <div className="space-y-3">
                    {event.evaluationRubric?.map((rubric, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#030915]/80 border border-white/5 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-slate-200 font-semibold">{rubric.criteria}</span>
                          <span className="font-mono font-bold text-[#00C2FF] shrink-0 ml-3">
                            {rubric.weight}
                          </span>
                        </div>
                        {/* Visual Progress Bar */}
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#00C2FF] to-[#00FF9D] rounded-full"
                            style={{ width: rubric.weight }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sticky Action Console Sidebar (4 cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="glass-panel-3 p-6 rounded-3xl border border-[#00C2FF]/30 space-y-5 shadow-2xl">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider font-semibold">
                REGISTRATION SPECIFICATION
              </span>
              <div className="text-2xl font-display font-black text-white mt-1">{event.entryFee}</div>
              <span className="text-xs text-[#00FF9D] font-mono font-bold block mt-0.5">Team: {event.teamSize}</span>
            </div>

            <div className="space-y-2.5 text-xs font-mono text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-500">Event Date:</span>
                <span className="text-white font-semibold">{event.date}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-500">Venue:</span>
                <span className="text-white truncate max-w-[160px]">{event.venue.split(',')[0]}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={event.registration}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-cyber-cyan py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-center uppercase tracking-wider cursor-pointer shadow-lg"
              >
                <span>Open Google Form</span>
                <ExternalLink size={14} />
              </a>

              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-[#00FF9D]" />
                    <span className="text-[#00FF9D] font-bold">Registration Link Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Form Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


