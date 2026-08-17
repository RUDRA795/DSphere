import React, { useState } from 'react'
import { Search, Trophy } from 'lucide-react'
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
    { id: 'ESPORTS', label: 'Esports' },
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
    if (selectedCategory === 'ESPORTS') matchesCategory = ev.slug === 'dataarena'

    return matchesSearch && matchesCategory
  })

  return (
    <div className="pt-24 sm:pt-28 pb-16 container-max space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4"
      >
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Competitions & Tracks
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            4 events scheduled across Day 1 (21 Aug) and Day 2 (22 Aug 2026).
          </p>
        </div>

        <div className="glass-panel px-3.5 py-1.5 rounded-lg border border-amber-400/20 text-xs font-mono text-amber-300 flex items-center gap-2 self-start sm:self-auto">
          <Trophy size={14} />
          <span>Total Prize Pool: ₹50,000+</span>
        </div>
      </motion.div>

      {/* Filters & Search */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
      >
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#00C2FF] text-[#040914] font-bold'
                    : 'glass-panel text-slate-300 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="w-full bg-[#030915] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00C2FF]"
          />
        </div>
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory + searchQuery}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
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
