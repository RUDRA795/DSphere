import React from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Users, Building2, MapPin, ArrowRight, Layers, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import EventCard from '../components/EventCard'
import { EVENTS, FESTIVAL_STATS } from '../data/events'
import { DEPARTMENT_INFO } from '../data/department'

const STAT_ICONS = {
  Layers: Layers,
  Trophy: Trophy,
  Users: Users,
  Building2: Building2,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function Home({ onOpenRegister }) {
  return (
    <div className="space-y-16">
      {/* 1. Hero Section */}
      <Hero onOpenRegister={onOpenRegister} />

      {/* 2. Key Numbers Bar */}
      <section className="container-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {FESTIVAL_STATS.map((stat, i) => {
            const Icon = STAT_ICONS[stat.icon] || Trophy
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="glass-panel p-5 rounded-xl border border-white/10 flex items-center justify-between"
              >
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">
                    {stat.label}
                  </div>
                  <div className="font-display font-bold text-2xl text-white mt-1">
                    {stat.value}
                    <span className="text-[#00C2FF] text-lg font-normal">{stat.suffix}</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#00C2FF]">
                  <Icon size={16} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* 3. Flagship Events */}
      <section className="container-max">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Flagship Events
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              4 specialized competitions across Machine Learning, Debate, Softwares, and Esports.
            </p>
          </div>

          <Link
            to="/events"
            className="text-xs font-mono text-[#00C2FF] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>All details</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {EVENTS.map((event, idx) => (
            <EventCard
              key={event.slug}
              event={event}
              onOpenRegister={onOpenRegister}
              index={idx}
            />
          ))}
        </motion.div>
      </section>

      {/* 4. About Department Overview */}
      <section className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4"
        >
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
            About DSphere 2026
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
            DSphere is the annual national technical convergence hosted by the Department of Computer Science & Engineering (Data Science) at Tulsiramji Gaikwad-Patil College of Engineering & Technology (TGPCET), Nagpur. The event provides a competitive platform for undergraduate and diploma students to demonstrate skills in AI/ML, critical debate, 3D engineering modeling, and esports.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-[#030915] p-3.5 rounded-xl border border-white/5">
              <div className="text-xs font-bold text-white">Host Institution</div>
              <div className="text-xs text-slate-400 mt-1">TGPCET Nagpur (Autonomous, NAAC A+)</div>
            </div>
            <div className="bg-[#030915] p-3.5 rounded-xl border border-white/5">
              <div className="text-xs font-bold text-white">Department</div>
              <div className="text-xs text-slate-400 mt-1">CSE — Data Science</div>
            </div>
            <div className="bg-[#030915] p-3.5 rounded-xl border border-white/5">
              <div className="text-xs font-bold text-white">Dates & Venue</div>
              <div className="text-xs text-slate-400 mt-1">21 — 22 August 2026 · Wardha Road Campus</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. Campus Location & Directions */}
      <section className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <MapPin size={16} className="text-[#00FF9D]" />
                <span>Venue & Campus Location</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {DEPARTMENT_INFO.location.address}
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=TGPCET+Nagpur"
              target="_blank"
              rel="noreferrer"
              className="btn-cyber-outline py-2 px-3.5 rounded-lg text-xs font-mono flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>Google Maps</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
