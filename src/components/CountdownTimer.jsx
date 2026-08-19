import React, { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const EVENT_TARGET_DATE = new Date('2026-08-22T09:00:00+05:30').getTime()

export default function CountdownTimer() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime()
      const difference = EVENT_TARGET_DATE - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const timeBlocks = [
    { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINS', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SECS', value: String(timeLeft.seconds).padStart(2, '0') },
  ]

  return (
    <div className={`rounded-2xl p-5 border relative overflow-hidden transition-colors ${
      isDark
        ? 'glass-panel-2 border-white/10 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)]'
        : 'bg-white border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)]'
    }`}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-[#00C2FF]' : 'bg-[#0284C7]'}`} />
          <span className={`text-[11px] font-mono font-semibold tracking-wider uppercase ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            EVENT COMMENCES IN
          </span>
        </div>
        <div className={`flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded border ${
          isDark
            ? 'text-[#00FF9D] bg-[#00FF9D]/10 border-[#00FF9D]/20'
            : 'text-[#059669] bg-[#ECFDF5] border-[#A7F3D0]'
        }`}>
          <Clock size={11} />
          <span>22 AUG 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 text-center">
        {timeBlocks.map((block, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-3 sm:p-3.5 relative group border transition-all ${
              isDark
                ? 'bg-[#030915]/80 border-white/10 hover:border-[#00C2FF]/40 shadow-inner'
                : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#0284C7]/40 shadow-sm'
            }`}
          >
            <div className={`font-mono text-2xl sm:text-3xl font-black tracking-tight leading-none transition-colors ${
              isDark
                ? 'text-white group-hover:text-[#00C2FF]'
                : 'text-[#0F172A] group-hover:text-[#0284C7]'
            }`}>
              {block.value}
            </div>
            <div className={`text-[9.5px] font-mono font-semibold mt-1.5 uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {block.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


