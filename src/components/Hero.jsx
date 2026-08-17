import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, MapPin, Calendar } from 'lucide-react'
import CountdownTimer from './CountdownTimer'

export default function Hero({ onOpenRegister }) {
  return (
    <section className="relative pt-28 sm:pt-36 pb-12 overflow-hidden">
      <div className="container-max max-w-4xl mx-auto text-center space-y-6">
        {/* Date & Dept Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
          <Calendar size={13} className="text-[#00C2FF]" />
          <span>22 AUGUST 2026</span>
          <span className="text-slate-600">·</span>
          <span>TGPCET NAGPUR</span>
        </div>

        {/* Main Title */}
        <div className="space-y-3">
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            DSPHERE <span className="text-[#00C2FF]">2026</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            National Technical Convergence organized by the Department of Computer Science & Engineering (Data Science) at TGPCET Nagpur.
          </p>
        </div>

        {/* Fast Specs */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-300 pt-1">
          <div className="glass-panel px-3.5 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
            <Award size={14} className="text-amber-400" />
            <span className="text-amber-300 font-bold">Exciting Prizes & Rewards</span>
          </div>
          <div className="glass-panel px-3.5 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
            <MapPin size={14} className="text-[#00FF9D]" />
            <span>TGPCET Campus, Wardha Road</span>
          </div>
          <div className="glass-panel px-3.5 py-1.5 rounded-lg border border-white/10">
            <span>3 Flagship Events</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onOpenRegister()}
            className="btn-cyber-cyan px-7 py-3 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 cursor-pointer"
          >
            <span>REGISTER NOW</span>
            <ArrowRight size={14} />
          </button>

          <Link
            to="/events"
            className="btn-cyber-outline px-6 py-3 rounded-xl text-xs font-bold tracking-wide cursor-pointer"
          >
            VIEW 3 EVENTS
          </Link>
        </div>

        {/* Live Countdown */}
        <div className="pt-6 max-w-lg mx-auto">
          <CountdownTimer />
        </div>
      </div>
    </section>
  )
}
