import React, { useState } from 'react'
import { Search, Award, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import EventCard from '../components/EventCard'
import { EVENTS } from '../data/events'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export default function Events({ onOpenRegister }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  const categories = [
    { id: 'ALL', label: 'All Tracks' },
    { id: 'ML', label: 'Machine Learning' },
    { id: 'DEBATE', label: 'Tech Debate' },
    { id: 'CAD', label: '3D CAD' },
  ]

  const filteredEvents = EVENTS.filter((ev) => {
    const matchesSearch =
      ev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.category.toLowerCase().includes(searchQuery.toLowerCase())

    let matchesCategory = true
    if (selectedCategory === 'ML') matchesCategory = ev.slug === 'dataforge'
    if (selectedCategory === 'DEBATE') matchesCategory = ev.slug === 'dataduals'
    if (selectedCategory === 'CAD') matchesCategory = ev.slug === 'datamodelling'

    return matchesSearch && matchesCategory
  })

  return (
    <div className="pt-28 sm:pt-32 pb-20 container-max space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6"
      >
        <div className="space-y-2">
          <span className="section-tag">COMPETITION DOSSIERS</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
            Competitions & Tracks
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            3 flagship events scheduled for 22 August 2026 at TGPCET Nagpur.
          </p>
        </div>

        <div className="glass-panel-1 px-4 py-2 rounded-xl border border-amber-400/30 bg-amber-950/10 text-xs font-mono text-amber-300 flex items-center gap-2 self-start sm:self-auto shadow-sm">
          <Award size={14} className="text-amber-400" />
          <span className="font-bold">Exciting Prizes & Rewards</span>
        </div>
      </motion.div>

      {/* Filters & Search Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 glass-panel-1 p-2.5 sm:p-3 rounded-2xl border border-white/10"
      >
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'text-[#040914] font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="categoryActivePill"
                    className="absolute inset-0 bg-[#00C2FF] rounded-xl shadow-[0_0_15px_rgba(0,194,255,0.4)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tracks, tools, rules..."
            className="w-full bg-[#030915]/90 border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all font-mono"
          />
        </div>
      </motion.div>

      {/* Grid of Event Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory + searchQuery}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {filteredEvents.map((event, idx) => (
            <EventCard
              key={event.slug}
              event={event}
              onOpenRegister={onOpenRegister}
              index={idx}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

