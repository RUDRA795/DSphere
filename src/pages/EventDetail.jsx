import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Award,
  ExternalLink,
  Phone,
  Mail,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Layers,
  FileCheck,
  Cpu,
  Target
} from 'lucide-react'
import { EVENTS } from '../data/events'

export default function EventDetail({ onOpenRegister }) {
  const { slug } = useParams()
  const event = EVENTS.find((e) => e.slug === slug)
  const [activeTab, setActiveTab] = useState('overview')
  const [copied, setCopied] = useState(false)

  if (!event) {
    return (
      <div className="pt-32 pb-20 container-max text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Event Not Found</h1>
        <Link to="/events" className="btn-cyber-cyan px-4 py-2 rounded-lg inline-block text-xs font-bold">
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
    <div className="pt-24 sm:pt-28 pb-16 container-max space-y-6">
      {/* Back Link */}
      <Link
        to="/events"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={13} />
        <span>Back to Events</span>
      </Link>

      {/* Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-mono text-[#00C2FF] uppercase font-semibold">
              {event.category}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
              {event.name}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-slate-300 mt-0.5">
              {event.tagline}
            </p>
          </div>

          <div className="glass-panel px-4 py-2 rounded-xl border border-amber-400/20 text-right self-start sm:self-auto">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Rewards</span>
            <span className="font-display font-bold text-sm sm:text-base text-amber-300 flex items-center gap-1.5 justify-end">
              <Award size={14} className="text-amber-400" />
              <span>{event.prizePool}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-[#00C2FF]" />
            <span>{event.date} ({event.day})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-[#00FF9D]" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-slate-400" />
            <span>{event.venue}</span>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Tab buttons */}
          <div className="flex items-center gap-1.5 border-b border-white/10 pb-2 overflow-x-auto no-scrollbar">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === t.id
                    ? 'bg-[#00C2FF] text-[#040914] font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="glass-panel p-5 sm:p-6 rounded-xl border border-white/10 space-y-3">
                <h3 className="font-display text-base font-bold text-white">Event Overview</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>

              {event.objectives && (
                <div className="glass-panel p-5 sm:p-6 rounded-xl border border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <Target size={16} className="text-[#00C2FF]" />
                    <h3 className="font-display text-base font-bold text-white">Core Objectives</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {event.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 size={14} className="text-[#00FF9D] shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.tracks && (
                <div className="glass-panel p-5 sm:p-6 rounded-xl border border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-[#00C2FF]" />
                    <h3 className="font-display text-base font-bold text-white">Focus Domains & Themes</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {event.tracks.map((tr, i) => (
                      <div key={i} className="bg-[#030915] p-3.5 rounded-lg border border-white/5 space-y-1">
                        <div className="text-xs font-bold text-white">{tr.title}</div>
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
            <div className="space-y-4">
              <div className="glass-panel p-5 sm:p-6 rounded-xl border border-white/10 space-y-3">
                <h3 className="font-display text-base font-bold text-white">Rules & Guidelines</h3>
                <ol className="space-y-2.5 list-decimal ml-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {event.rules.map((rule, idx) => (
                    <li key={idx} className="pl-1.5">{rule}</li>
                  ))}
                </ol>
              </div>

              {event.importantNote && (
                <div className="glass-panel p-4 rounded-xl border border-amber-400/30 bg-amber-950/15 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-mono font-bold">
                    <AlertTriangle size={14} />
                    <span>IMPORTANT PARTICIPANT DIRECTIVE</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {event.importantNote}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab: Supported Software (for CAD/3D) */}
          {activeTab === 'software' && event.supportedSoftware && (
            <div className="space-y-4">
              <div className="glass-panel p-5 sm:p-6 rounded-xl border border-white/10 space-y-4">
                <div>
                  <h3 className="font-display text-base font-bold text-white">Supported Software & Tools</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Participants can use any of the following recommended tools according to their engineering domain:
                  </p>
                </div>

                <div className="space-y-3">
                  {event.supportedSoftware.map((group, idx) => (
                    <div key={idx} className="bg-[#030915] p-4 rounded-xl border border-white/5 space-y-2">
                      <div className="text-xs font-bold text-white font-mono">{group.domain}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {group.tools.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-[#00C2FF]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-400 italic bg-white/5 p-3 rounded-lg border border-white/5">
                  Note: The above list is provided as recommended software support. Participants may use another professional 3D modelling/CAD tool if it is suitable for their project and approved by the organizers.
                </div>
              </div>
            </div>
          )}

          {/* Tab: Submission Specs */}
          {activeTab === 'submission' && (
            <div className="space-y-4">
              {event.submissionRequirements && (
                <div className="glass-panel p-5 sm:p-6 rounded-xl border border-white/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <FileCheck size={16} className="text-[#00FF9D]" />
                    <h3 className="font-display text-base font-bold text-white">Submission Requirements</h3>
                  </div>

                  <div className="space-y-3">
                    {event.submissionRequirements.map((req, idx) => (
                      <div key={idx} className="bg-[#030915] p-3.5 rounded-lg border border-white/5 space-y-1">
                        <div className="text-xs font-bold text-white font-mono">{req.title}</div>
                        <p className="text-xs text-slate-300 leading-relaxed">{req.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {event.submissionChecklist && (
                <div className="glass-panel p-5 sm:p-6 rounded-xl border border-white/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <FileCheck size={16} className="text-[#00C2FF]" />
                    <h3 className="font-display text-base font-bold text-white">Submission Checklist</h3>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {event.submissionChecklist.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#030915] border border-white/5">
                        <CheckCircle2 size={14} className="text-[#00FF9D] shrink-0" />
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
            <div className="glass-panel p-5 sm:p-6 rounded-xl border border-white/10 space-y-4">
              <h3 className="font-display text-base font-bold text-white">Judging & Evaluation Criteria</h3>
              <div className="space-y-2">
                {event.evaluationRubric?.map((rubric, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-lg bg-[#030915] border border-white/5 text-xs sm:text-sm"
                  >
                    <span className="text-slate-200">{rubric.criteria}</span>
                    <span className="font-mono font-bold text-[#00C2FF] shrink-0 ml-3">
                      {rubric.weight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Sidebar (4 cols) */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="glass-panel p-5 rounded-xl border border-white/10 space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">REGISTRATION FEE</span>
              <div className="text-xl font-bold text-white mt-0.5">{event.entryFee}</div>
              <span className="text-xs text-slate-400 font-mono">Team: {event.teamSize}</span>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-500">Date:</span>
                <span className="text-white">{event.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-500">Prizes:</span>
                <span className="text-amber-300 font-semibold">{event.prizePool}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-500">Venue:</span>
                <span className="text-white truncate max-w-[160px]">{event.venue.split(',')[0]}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href={event.registration}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-cyber-cyan py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 text-center cursor-pointer"
              >
                <span>Open Google Form</span>
                <ExternalLink size={13} />
              </a>

              <button
                onClick={handleCopyLink}
                className="w-full py-2 px-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-[#00FF9D]" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
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
