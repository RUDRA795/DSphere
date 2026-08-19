import React from 'react'
import { MapPin, Mail, ExternalLink, Phone, Award, Sparkles, Building2, UserCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { DEPARTMENT_INFO } from '../data/department'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 container-max space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-white/10 pb-6"
      >
        <div className="space-y-2">
          <span className="section-tag">INSTITUTIONAL PROFILE</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
            About CSE (Data Science)
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Department profile, leadership, and campus hub at TGPCET Nagpur.
          </p>
        </div>
      </motion.div>

      {/* College Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="glass-panel-2 p-6 sm:p-9 rounded-3xl border border-white/10 space-y-4 relative overflow-hidden shadow-xl"
      >
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="section-tag">HOST INSTITUTION</span>
          <span className="text-xs font-mono text-[#00C2FF] bg-[#00C2FF]/10 px-3 py-1 rounded-full border border-[#00C2FF]/30 font-bold">
            ESTABLISHED {DEPARTMENT_INFO.establishedYear}
          </span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
          {DEPARTMENT_INFO.collegeName}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-mono">
          {DEPARTMENT_INFO.collegeAccreditation}
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1 max-w-4xl font-normal">
          The Department of Computer Science & Engineering (Data Science) was established to prepare engineers for modern computing challenges across machine learning, artificial intelligence, and big data systems.
        </p>
      </motion.div>

      {/* HOD Message Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="glass-panel-2 p-6 sm:p-9 rounded-3xl border border-white/10 space-y-4 relative overflow-hidden shadow-xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="section-tag">LEADERSHIP MESSAGE</span>
            <div className="font-display text-xl sm:text-2xl font-bold text-white mt-1">{DEPARTMENT_INFO.hod.name}</div>
            <div className="text-xs font-mono text-[#00C2FF]">{DEPARTMENT_INFO.hod.designation} · {DEPARTMENT_INFO.hod.department}</div>
          </div>
          <a
            href={`mailto:${DEPARTMENT_INFO.hod.email}`}
            className="text-xs font-mono text-[#00C2FF] hover:underline flex items-center gap-1.5 bg-[#00C2FF]/10 px-3 py-1.5 rounded-xl border border-[#00C2FF]/20 self-start sm:self-auto font-semibold"
          >
            <Mail size={13} />
            <span>{DEPARTMENT_INFO.hod.email}</span>
          </a>
        </div>
        <blockquote className="text-slate-300 text-xs sm:text-sm leading-relaxed italic pt-1 border-l-2 border-[#00C2FF] pl-4">
          "{DEPARTMENT_INFO.hod.message}"
        </blockquote>
      </motion.div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="glass-panel-2 p-6 sm:p-7 rounded-2xl border border-white/10 space-y-3 shadow-md"
        >
          <div className="section-tag">ACADEMIC CHARTER</div>
          <h3 className="font-display text-lg font-bold text-white">Department Vision</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {DEPARTMENT_INFO.vision}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="glass-panel-2 p-6 sm:p-7 rounded-2xl border border-white/10 space-y-3 shadow-md"
        >
          <div className="section-tag">STRATEGIC GOALS</div>
          <h3 className="font-display text-lg font-bold text-white">Department Mission</h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {DEPARTMENT_INFO.mission.map((m, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <span className="text-[#00C2FF] font-bold text-sm leading-none">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Faculty Committee */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="section-tag">ADVISORY BOARD</span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">Faculty Advisory Leads</h3>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {DEPARTMENT_INFO.facultyLeads.map((f, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-panel-2 p-5 rounded-2xl border border-white/10 space-y-2 shadow-md hover:border-[#00C2FF]/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00C2FF]">
                <UserCheck size={16} />
              </div>
              <div className="font-bold text-white text-sm pt-1">{f.name}</div>
              <div className="text-[#00C2FF] text-xs font-mono font-semibold">{f.role}</div>
              <div className="text-slate-400 text-xs">{f.specialization}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Student Leads */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="section-tag">STUDENT ORGANIZING FORUM</span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">Student Core Committee</h3>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono"
        >
          {DEPARTMENT_INFO.studentCoreCommittee.map((s, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-panel-2 p-5 rounded-2xl border border-white/10 space-y-1.5 shadow-md hover:border-[#00FF9D]/30 transition-colors"
            >
              <div className="font-bold text-white text-sm">{s.name}</div>
              <div className="text-[#00C2FF] text-xs font-semibold">{s.role}</div>
              <div className="text-slate-400 text-[11px]">{s.year}</div>
              <div className="pt-2 text-[#00FF9D] text-xs flex items-center gap-1.5 font-bold">
                <Phone size={11} />
                <a href={`tel:${s.contact}`} className="hover:underline">{s.contact}</a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Campus Location & Map */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="glass-panel-2 p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5 shadow-2xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="section-tag">VENUE COORDINATES</span>
            <h3 className="font-display text-xl font-bold text-white flex items-center gap-2 mt-1">
              <MapPin size={17} className="text-[#00FF9D]" />
              <span>TGPCET Campus Location</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {DEPARTMENT_INFO.location.address} (GPS: {DEPARTMENT_INFO.location.coordinates})
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-2.5 text-xs font-mono">
            {DEPARTMENT_INFO.location.transit.map((t, idx) => (
              <div key={idx} className="bg-[#030915]/80 p-3 rounded-xl border border-white/5 text-slate-300">
                <strong className="text-[#00C2FF] block text-xs mb-0.5">{t.mode}</strong>
                <span className="text-slate-400 text-xs">{t.detail}</span>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 h-72 rounded-2xl overflow-hidden border border-white/10 shadow-inner">
            <iframe
              title="TGPCET Campus Map"
              src="https://maps.google.com/maps?q=Tulsiramji+Gaikwad-Patil+College+of+Engineering+and+Technology+Nagpur&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 grayscale opacity-85 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

