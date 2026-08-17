import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe, ExternalLink } from 'lucide-react'
import { DEPARTMENT_INFO } from '../data/department'
import { EVENTS } from '../data/events'

export default function Footer({ onOpenRegister }) {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#030814] text-slate-400">
      <div className="container-max py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand & Address */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-white">
                DSPHERE <span className="text-[#00C2FF]">2026</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Department of Computer Science & Engineering (Data Science)
              <br />
              Tulsiramji Gaikwad-Patil College of Engineering & Technology, Nagpur
            </p>
            <div className="text-xs font-mono text-slate-400 space-y-1 pt-1">
              <div className="flex items-start gap-1.5">
                <MapPin size={13} className="text-[#00C2FF] shrink-0 mt-0.5" />
                <span>{DEPARTMENT_INFO.location.address}</span>
              </div>
              <div className="pl-4 text-[11px] text-slate-500">
                GPS: {DEPARTMENT_INFO.location.coordinates}
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Links
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-white transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-white transition-colors">
                  Rules
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About CSE-DS
                </Link>
              </li>
            </ul>
          </div>

          {/* Events */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Events
            </h4>
            <ul className="space-y-1.5 text-xs">
              {EVENTS.map((ev) => (
                <li key={ev.slug}>
                  <Link
                    to={`/events/${ev.slug}`}
                    className="hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>{ev.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">{ev.day}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Contact
            </h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-[#00C2FF]" />
                <a href="mailto:dsphere2026@tgpcet.com" className="hover:text-white">
                  dsphere2026@tgpcet.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-[#00FF9D]" />
                <a href="tel:+918765432109" className="hover:text-white">
                  +91 87654 32109
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={13} className="text-[#8B5CF6]" />
                <a href="https://tgpcet.com" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  tgpcet.com <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
          <div>© 2026 DSphere · Department of CSE (Data Science), TGPCET Nagpur</div>
          <div className="mt-2 sm:mt-0">21 — 22 August 2026</div>
        </div>
      </div>
    </footer>
  )
}
