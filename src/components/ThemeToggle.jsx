import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center p-1 rounded-full border transition-all duration-300 cursor-pointer select-none group ${
        isDark
          ? 'bg-[#040914]/90 border-white/15 hover:border-[#00C2FF]/40 shadow-inner'
          : 'bg-[#E2ECF7]/90 border-[#0284C7]/25 hover:border-[#0284C7]/50 shadow-sm'
      } ${className}`}
      style={{ width: '68px', height: '32px' }}
    >
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none text-xs">
        <Sun
          size={13}
          className={`transition-colors duration-300 ${
            !isDark ? 'text-[#0284C7] opacity-0' : 'text-slate-400 opacity-80'
          }`}
        />
        <Moon
          size={13}
          className={`transition-colors duration-300 ${
            isDark ? 'text-[#00C2FF] opacity-0' : 'text-slate-400 opacity-80'
          }`}
        />
      </div>

      {/* Sliding Pill Thumb */}
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 32,
        }}
        className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-md ${
          isDark
            ? 'ml-auto bg-gradient-to-tr from-[#00C2FF] to-[#00FF9D] text-[#02050D] shadow-[0_0_12px_rgba(0,194,255,0.6)]'
            : 'mr-auto bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] text-white shadow-[0_0_10px_rgba(2,132,199,0.4)]'
        }`}
      >
        {isDark ? (
          <Moon size={13} className="fill-current" />
        ) : (
          <Sun size={13} className="fill-current" />
        )}
      </motion.div>
    </button>
  )
}
