import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function DSAURAMessage({ message, onAction }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const isUser = message.sender === 'user'

  const formatContent = (text) => {
    if (!text) return null

    return text.split('\n').map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className={isDark ? 'text-[#00C2FF] font-bold' : 'text-[#0284C7] font-bold'}>
              {part.slice(2, -2)}
            </strong>
          )
        }
        return part
      })

      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={idx} className="flex items-start gap-1.5 my-1 pl-1">
            <span className="text-[#00C2FF] shrink-0 font-bold">•</span>
            <span>{parts}</span>
          </div>
        )
      }

      return (
        <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>
          {parts}
        </p>
      )
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} my-2.5`}
    >
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed transition-all ${
          isUser
            ? 'bg-gradient-to-tr from-[#00C2FF] to-[#0284C7] text-white font-medium shadow-[0_4px_15px_rgba(0,194,255,0.25)] rounded-br-none'
            : isDark
            ? 'bg-[#0B1736]/90 border border-white/10 text-slate-200 rounded-bl-none shadow-sm'
            : 'bg-white border border-[#E2E8F0] text-[#0F172A] rounded-bl-none shadow-sm'
        }`}
      >
        {formatContent(message.text)}
      </div>

      {/* Action Chips */}
      {message.chips && message.chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {message.chips.map((chip, cIdx) => (
            <button
              key={cIdx}
              type="button"
              onClick={() => onAction && onAction(chip.action)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#00C2FF]/10 border border-[#00C2FF]/30 text-[#00C2FF] hover:bg-[#00C2FF]/20 transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <span>{chip.label}</span>
              <ArrowRight size={11} />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}
