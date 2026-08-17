import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  ExternalLink,
  Phone,
  Mail,
  Copy,
  Check,
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
    { id: 'evaluation', label: 'Evaluation' },
    { id: 'rules', label: 'Rules' },
    { id: 'prizes', label: 'Prizes' },
    { id: 'contacts', label: 'Coordinators & FAQs' },
  ]

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
            <span className="text-[10px] font-mono text-slate-400 block">PRIZE POOL</span>
            <span className="font-display font-bold text-lg text-amber-300">{event.prizePool}</span>
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
                <h3 className="font-display text-base font-bold text-white">Event Description</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>

              {event.tracks && (
                <div className="glass-panel p-5 sm:p-6 rounded-xl border border-white/10 space-y-3">
                  <h3 className="font-display text-base font-bold text-white">Focus Tracks</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {event.tracks.map((tr, i) => (
                      <div key={i} className="bg-[#030915] p-3 rounded-lg border border-white/5 space-y-1">
                        <div className="text-xs font-bold text-white">{tr.title}</div>
                        <p className="text-slate-400 text-xs">{tr.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Evaluation */}
          {activeTab === 'evaluation' && (
            <div className="glass-panel p-5 sm:p-6 rounded-xl border border-white/10 space-y-4">
              <h3 className="font-display text-base font-bold text-white">Judging Criteria</h3>
              <div className="space-y-2">
                {event.evaluationRubric?.map((rubric, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#030915] border border-white/5 text-xs"
                  >
                    <span className="text-slate-200">{rubric.criteria}</span>
                    <span className="font-mono font-bold text-[#00C2FF] shrink-0 ml-2">
                      {rubric.weight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Rules */}
          {activeTab === 'rules' && (
            <div className="glass-panel p-5 sm:p-6 rounded-xl border border-white/10 space-y-3">
              <h3 className="font-display text-base font-bold text-white">Rules & Guidelines</h3>
              <ol className="space-y-2 list-decimal ml-4 text-xs text-slate-300 leading-relaxed">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="pl-1">{rule}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Tab 4: Prizes */}
          {activeTab === 'prizes' && (
            <div className="glass-panel p-5 sm:p-6 rounded-xl border border-white/10 space-y-3">
              <h3 className="font-display text-base font-bold text-white">Prizes & Awards</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {event.prizes?.map((prize, idx) => (
                  <div key={idx} className="bg-[#030915] p-3.5 rounded-lg border border-amber-400/20 space-y-1">
                    <div className="text-xs font-mono font-semibold text-amber-300">{prize.position}</div>
                    <div className="text-xs font-bold text-white">{prize.reward}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Contacts */}
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <div className="glass-panel p-5 sm:p-6 rounded-xl border border-white/10 space-y-3">
                <h3 className="font-display text-base font-bold text-white">Coordinators</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {event.coordinators?.map((c, idx) => (
                    <div key={idx} className="bg-[#030915] p-3 rounded-lg border border-white/5 space-y-1 font-mono">
                      <div className="font-bold text-white">{c.name}</div>
                      <div className="text-slate-400 text-[11px]">{c.role}</div>
                      <div className="pt-1 text-slate-300 text-[11px]">
                        <a href={`tel:${c.phone}`} className="hover:underline">{c.phone}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {event.faqs && (
                <div className="glass-panel p-5 sm:p-6 rounded-xl border border-white/10 space-y-3">
                  <h3 className="font-display text-base font-bold text-white">FAQs</h3>
                  <div className="space-y-2 text-xs">
                    {event.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-[#030915] p-3 rounded-lg border border-white/5 space-y-1">
                        <div className="font-bold text-white">Q: {faq.q}</div>
                        <div className="text-slate-300">A: {faq.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sticky Sidebar (4 cols) */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="glass-panel p-5 rounded-xl border border-white/10 space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-mono text-slate-400 block">REGISTRATION FEE</span>
              <div className="text-xl font-bold text-white mt-0.5">{event.entryFee}</div>
              <span className="text-xs text-slate-400 font-mono">Team: {event.teamSize}</span>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-500">Date:</span>
                <span className="text-white">{event.date}</span>
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
