import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DSAURARobot from './DSAURARobot'
import { useTheme } from '../../context/ThemeContext'

export default function DSAURAOrb({ onClick, state = 'IDLE' }) {
  const [isHovered, setIsHovered] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="relative group select-none">
      {/* Floating Glass Tooltip on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -12, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-full mr-3.5 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border shadow-xl backdrop-blur-xl whitespace-nowrap z-50 ${
              isDark
                ? 'bg-[#040914]/95 border-[#00C2FF]/40 text-white shadow-[0_8px_30px_rgba(0,194,255,0.25)]'
                : 'bg-white/95 border-[#CBD5E1] text-[#0F172A] shadow-[0_8px_25px_rgba(15,23,42,0.12)]'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-[#00FF9D] animate-ping" />
            <span className="font-mono text-xs font-bold tracking-wide">
              DSAURA <span className="text-[#00C2FF]">AI ROBOT</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button with Ambient Orbit */}
      <motion.button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open DSAURA AI Event Guide"
        className={`relative w-15 h-15 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer shadow-2xl transition-all duration-300 ${
          isDark
            ? 'bg-[#040914]/90 border border-white/20 hover:border-[#00C2FF]/70 shadow-[0_10px_35px_rgba(0,194,255,0.35)]'
            : 'bg-white/95 border border-[#CBD5E1] hover:border-[#0284C7]/70 shadow-[0_10px_30px_rgba(15,23,42,0.15)]'
        }`}
      >
        <DSAURARobot state={state} size={56} />
      </motion.button>
    </div>
  )
}
