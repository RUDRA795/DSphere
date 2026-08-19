import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, ExternalLink, Sparkles } from 'lucide-react'
import { DEPARTMENT_INFO } from '../data/department'
import { EVENTS } from '../data/events'

export default function Footer({ onOpenRegister }) {
  return (
    <footer className="relative border-t border-white/10 bg-[#02050D] pt-16 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-t from-[#00C2FF]/10 via-[#6366F1]/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="container-max space-y-12 relative z-10">
        {/* Monumental Closing Callout Banner */}
        <div className="glass-panel-2 p-8 sm:p-10 rounded-3xl border border-white/10 text-center space-y-4 relative overflow-hidden shadow-2xl">
          <span className="section-tag">NATIONAL TECHNICAL CONVERGENCE</span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            SEE YOU AT <span className="text-shimmer">DSPHERE 2026</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto font-mono">
            22 AUGUST 2026 · TGPCET CAMPUS, WARDHA ROAD, NAGPUR
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenRegister()}
              className="btn-cyber-cyan px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-[0_0_25px_-5px_rgba(0,194,255,0.5)]"
            >
              REGISTER FOR DSPHERE 2026
            </button>
          </div>
        </div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          {/* Brand & Department */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00C2FF] to-[#00FF9D] p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#040914] rounded-lg flex items-center justify-center">
                  <span className="font-display font-black text-white text-xs">DS</span>
                </div>
              </div>
              <span className="font-display font-black text-white text-base tracking-tight">
                DSPHERE <span className="text-[#00C2FF]">2026</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed font-normal">
              National Technical Convergence organized by the Department of Computer Science & Engineering (Data Science).
            </p>
            <div className="text-[11px] font-mono text-slate-500">
              TGPCET Nagpur (Autonomous, NAAC A+)
            </div>
          </div>

          {/* Competitions */}
          <div className="space-y-3 font-mono">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Tracks & Arenas</div>
            <ul className="space-y-2">
              {EVENTS.map((ev) => (
                <li key={ev.slug}>
                  <Link
                    to={`/events/${ev.slug}`}
                    className="text-slate-400 hover:text-[#00C2FF] transition-colors flex items-center gap-1.5"
                  >
                    <span>{ev.name}</span>
                    <span className="text-[10px] text-slate-600">({ev.category})</span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onOpenRegister()}
                  className="text-[#00FF9D] hover:underline font-bold cursor-pointer"
                >
                  + Direct Registration
                </button>
              </li>
            </ul>
          </div>

          {/* Portal Navigation */}
          <div className="space-y-3 font-mono">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Navigation</div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home Portal</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">Competition Tracks</Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-white transition-colors">Event Schedule</Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-white transition-colors">Rules & Guidelines</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About TGPCET CSE(DS)</Link>
              </li>
            </ul>
          </div>

          {/* Campus Location & Contacts */}
          <div className="space-y-3 font-mono">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Campus Contact</div>
            <div className="space-y-2 text-slate-400 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-[#00FF9D] shrink-0 mt-0.5" />
                <span>Wardha Road, Mohgaon, Nagpur, MH 441108</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-[#00C2FF] shrink-0" />
                <a href={`mailto:${DEPARTMENT_INFO.hod.email}`} className="hover:underline text-slate-300">
                  {DEPARTMENT_INFO.hod.email}
                </a>
              </div>
              <div className="pt-1 text-[11px] text-slate-500">
                Coordinators: <a href="tel:9699147514" className="text-[#00C2FF] hover:underline">9699147514</a> / <a href="tel:7350720492" className="text-[#00C2FF] hover:underline">7350720492</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
          <div>
            © 2026 DSphere · Department of CSE (Data Science), TGPCET Nagpur.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted for TGPCET National Technical Convergence</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
