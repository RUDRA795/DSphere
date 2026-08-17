import React from 'react'
import { MapPin, Mail, ExternalLink } from 'lucide-react'
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export default function About() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 container-max space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-white/10 pb-4"
      >
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
          About CSE (Data Science)
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Department profile, leadership, and campus hub at TGPCET Nagpur.
        </p>
      </motion.div>

      {/* College Info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-3"
      >
        <div className="text-xs font-mono text-[#00C2FF]">HOST INSTITUTION</div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
          {DEPARTMENT_INFO.collegeName}
        </h2>
        <p className="text-xs text-slate-400 font-mono">
          {DEPARTMENT_INFO.collegeAccreditation}
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
          The Department of Computer Science & Engineering (Data Science) was established to prepare engineers for modern computing challenges across machine learning, artificial intelligence, and big data systems.
        </p>
      </motion.div>

      {/* HOD Message */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-3"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
          <div>
            <span className="text-[11px] font-mono text-slate-400">HEAD OF DEPARTMENT</span>
            <div className="font-display text-lg font-bold text-white">{DEPARTMENT_INFO.hod.name}</div>
            <div className="text-xs font-mono text-slate-400">{DEPARTMENT_INFO.hod.department}</div>
          </div>
          <a
            href={`mailto:${DEPARTMENT_INFO.hod.email}`}
            className="text-xs font-mono text-[#00C2FF] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <Mail size={12} />
            <span>{DEPARTMENT_INFO.hod.email}</span>
          </a>
        </div>
        <blockquote className="text-slate-300 text-xs sm:text-sm leading-relaxed italic pt-1">
          "{DEPARTMENT_INFO.hod.message}"
        </blockquote>
      </motion.div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="glass-panel p-5 rounded-xl border border-white/10 space-y-2"
        >
          <div className="text-xs font-mono text-[#00C2FF] font-bold">DEPARTMENT VISION</div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {DEPARTMENT_INFO.vision}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="glass-panel p-5 rounded-xl border border-white/10 space-y-2"
        >
          <div className="text-xs font-mono text-[#00C2FF] font-bold">DEPARTMENT MISSION</div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {DEPARTMENT_INFO.mission.map((m, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#00C2FF]">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Faculty Committee */}
      <div className="space-y-3">
        <h3 className="font-display text-lg font-bold text-white">Faculty Advisory Leads</h3>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs"
        >
          {DEPARTMENT_INFO.facultyLeads.map((f, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-[#030915] p-3.5 rounded-xl border border-white/5 space-y-1"
            >
              <div className="font-bold text-white">{f.name}</div>
              <div className="text-[#00C2FF] text-[11px] font-mono">{f.role}</div>
              <div className="text-slate-400 text-[11px]">{f.specialization}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Student Leads */}
      <div className="space-y-3">
        <h3 className="font-display text-lg font-bold text-white">Student Organizing Committee</h3>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono"
        >
          {DEPARTMENT_INFO.studentCoreCommittee.map((s, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-[#030915] p-3.5 rounded-xl border border-white/5 space-y-1"
            >
              <div className="font-bold text-white">{s.name}</div>
              <div className="text-slate-400 text-[11px]">{s.role}</div>
              <div className="text-slate-500 text-[11px]">{s.year}</div>
              <div className="pt-1 text-[#00FF9D] text-[11px]">
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
        className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
          <div>
            <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
              <MapPin size={15} className="text-[#00FF9D]" />
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
            className="btn-cyber-outline py-1.5 px-3 rounded-lg text-xs font-mono flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>Google Maps</span>
            <ExternalLink size={12} />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div className="lg:col-span-5 space-y-2 text-xs font-mono">
            {DEPARTMENT_INFO.location.transit.map((t, idx) => (
              <div key={idx} className="bg-[#030915] p-2.5 rounded-lg border border-white/5 text-slate-300">
                <strong className="text-white block text-[11px]">{t.mode}</strong>
                <span className="text-slate-400 text-[11px]">{t.detail}</span>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 h-64 rounded-xl overflow-hidden border border-white/10">
            <iframe
              title="TGPCET Campus Map"
              src="https://maps.google.com/maps?q=Tulsiramji+Gaikwad-Patil+College+of+Engineering+and+Technology+Nagpur&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 grayscale opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
