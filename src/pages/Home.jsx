import React from 'react'
import { Link } from 'react-router-dom'
import { Award, Users, Building2, MapPin, ArrowRight, Layers, ExternalLink, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import EventCard from '../components/EventCard'
import { EVENTS, FESTIVAL_STATS } from '../data/events'
import { DEPARTMENT_INFO } from '../data/department'

const STAT_ICONS = {
  Layers: Layers,
  Award: Award,
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

export default function Home({ onOpenRegister }) {
  return (
    <div className="space-y-20 sm:space-y-28 pb-12">
      {/* 1. Hero Section */}
      <Hero onOpenRegister={onOpenRegister} />

      {/* 2. Key Numbers Data Console */}
      <section className="container-max">
        <div className="mb-3 flex items-center justify-between">
          <span className="section-tag">FESTIVAL TELEMETRY</span>
          <span className="text-[10px] font-mono text-slate-500 uppercase">SYNCHRONIZED METRICS</span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {FESTIVAL_STATS.map((stat, i) => {
            const Icon = STAT_ICONS[stat.icon] || Award
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="glass-panel-2 p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-[#00C2FF]/30 transition-all shadow-lg"
              >
                {/* Ambient Card Corner Glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C2FF]/5 rounded-full blur-xl group-hover:bg-[#00C2FF]/10 transition-colors" />

                <div className="flex items-center justify-between mb-3 relative z-10">
                  <span className="text-[10.5px] font-mono text-slate-400 uppercase font-semibold tracking-wider">
                    {stat.label}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00C2FF] group-hover:border-[#00C2FF]/40 transition-colors">
                    <Icon size={15} />
                  </div>
                </div>

                <div className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight relative z-10">
                  <span>{stat.value}</span>
                  <span className="text-[#00C2FF] text-lg sm:text-xl font-normal ml-0.5">{stat.suffix}</span>
                </div>

                {/* Sub-line Signal Indicator */}
                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D]" />
                  <span className="text-[9.5px] font-mono text-slate-400">Live Active Track</span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* 3. Flagship Events with Sticky Storytelling */}
      <section className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sticky Editorial Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
            <div className="space-y-2">
              <span className="section-tag">01 // ARENAS</span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                THREE ARENAS.<br />
                <span className="text-shimmer">ONE CONVERGENCE.</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pt-1">
                3 specialized competitions across Machine Learning, Tech Debate, and 3D Modelling scheduled for 22 August 2026 at TGPCET Nagpur.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#00C2FF] font-bold hover:underline"
              >
                <span>Explore all event dossiers</span>
                <ArrowRight size={14} />
              </Link>

              <div className="glass-panel-1 p-3.5 rounded-xl border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">PRIZE HIGHLIGHT</div>
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Award size={13} className="text-amber-400" />
                  <span>Gold Medals + Tech Hampers + Certificates</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Event Cards Feed */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-6"
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
          </div>
        </div>
      </section>

      {/* 4. About Department Overview */}
      <section className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="glass-panel-2 p-6 sm:p-9 rounded-2xl border border-white/10 space-y-5 relative overflow-hidden shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="section-tag">ABOUT THE HOSTS</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                About DSphere 2026
              </h2>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/30 text-xs font-mono text-[#00C2FF] self-start sm:self-auto">
              AUTONOMOUS · NAAC 'A+'
            </div>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl font-normal">
            DSphere is the annual national technical convergence hosted by the Department of Computer Science & Engineering (Data Science) at Tulsiramji Gaikwad-Patil College of Engineering & Technology (TGPCET), Nagpur. The event provides a competitive platform for undergraduate and diploma students to demonstrate skills in AI/ML, critical debate, and 3D engineering modeling.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            <div className="bg-[#030915]/80 p-4 rounded-xl border border-white/10 space-y-1">
              <div className="text-xs font-bold text-white">Host Institution</div>
              <div className="text-xs text-slate-400">TGPCET Nagpur (Autonomous, NAAC A+)</div>
            </div>
            <div className="bg-[#030915]/80 p-4 rounded-xl border border-white/10 space-y-1">
              <div className="text-xs font-bold text-white">Department</div>
              <div className="text-xs text-slate-400">CSE — Data Science</div>
            </div>
            <div className="bg-[#030915]/80 p-4 rounded-xl border border-white/10 space-y-1">
              <div className="text-xs font-bold text-white">Dates & Venue</div>
              <div className="text-xs text-slate-400">22 August 2026 · Wardha Road Campus</div>
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
          className="glass-panel-2 p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="section-tag">CAMPUS NAVIGATION</span>
              <h3 className="font-display text-xl font-bold text-white flex items-center gap-2 mt-1">
                <MapPin size={17} className="text-[#00FF9D]" />
                <span>Venue & Campus Location</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                {DEPARTMENT_INFO.location.address}
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=TGPCET+Nagpur"
              target="_blank"
              rel="noreferrer"
              className="btn-cyber-outline py-2.5 px-4 rounded-xl text-xs font-mono flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <span>Open in Google Maps</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

