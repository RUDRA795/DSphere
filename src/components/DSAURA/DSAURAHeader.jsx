import React from 'react'
import { Minus, X, RotateCcw, GripHorizontal } from 'lucide-react'
import DSAURARobot from './DSAURARobot'
import { useTheme } from '../../context/ThemeContext'

export default function DSAURAHeader({
  isOffline = false,
  state = 'IDLE',
  onClose,
  onNewChat,
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const getStatusLabel = () => {
    if (isOffline) {
      return { text: 'OFFLINE MODE (Local Knowledge)', dot: 'bg-amber-400' }
    }
    switch (state) {
      case 'LISTENING':
        return { text: 'LISTENING...', dot: 'bg-[#00FF9D] animate-ping' }
      case 'THINKING':
        return { text: 'THINKING...', dot: 'bg-[#00C2FF] animate-pulse' }
      case 'SUCCESS':
        return { text: 'ACTION COMPLETE', dot: 'bg-[#00FF9D]' }
      default:
        return { text: 'ONLINE · GEMINI 3.6 FLASH', dot: 'bg-[#00FF9D] animate-pulse' }
    }
  }

  const status = getStatusLabel()

  return (
    <div
      className={`px-4 py-3 flex items-center justify-between border-b select-none cursor-grab active:cursor-grabbing transition-colors ${
        isDark
          ? 'bg-[#071124]/95 border-white/10'
          : 'bg-[#F8FAFC]/95 border-[#E2E8F0]'
      }`}
    >
      {/* Robot Mini Profile & Status */}
      <div className="flex items-center gap-2.5 pointer-events-none">
        <DSAURARobot state={state} size={34} interactive={false} />

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-display font-black text-sm tracking-tight ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
              DSAURA
            </span>
            <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#00C2FF]/15 text-[#00C2FF] border border-[#00C2FF]/30">
              AI 3.0
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono">
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
              {status.text}
            </span>
          </div>
        </div>
      </div>

      {/* Movable Drag Grip Icon Indicator */}
      <div className="hidden sm:flex items-center text-slate-400 opacity-40 hover:opacity-100 transition-opacity">
        <GripHorizontal size={16} />
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-1">
        {/* New Chat Reset Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            if (onNewChat) onNewChat()
          }}
          title="Start New Chat"
          aria-label="Start New Chat"
          className="p-1.5 rounded-lg text-slate-400 hover:text-[#00C2FF] hover:bg-white/10 transition-all cursor-pointer"
        >
          <RotateCcw size={14} />
        </button>

        {/* Minimize Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            if (onClose) onClose()
          }}
          title="Minimize Assistant"
          aria-label="Minimize Assistant"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-all cursor-pointer"
        >
          <Minus size={15} />
        </button>

        {/* Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            if (onClose) onClose()
          }}
          title="Close Assistant"
          aria-label="Close Assistant"
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
