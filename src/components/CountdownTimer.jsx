import React, { useState, useEffect } from 'react'

const EVENT_TARGET_DATE = new Date('2026-08-22T09:00:00+05:30').getTime()

export default function CountdownTimer() {
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
    <div className="glass-panel p-4 rounded-xl border border-white/10">
      <div className="text-[11px] font-mono text-slate-400 mb-2.5">
        EVENT COMMENCES IN
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        {timeBlocks.map((block, idx) => (
          <div
            key={idx}
            className="bg-[#030915] border border-white/5 rounded-lg p-2.5"
          >
            <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
              {block.value}
            </div>
            <div className="text-[9px] font-mono text-slate-400 font-medium mt-0.5">
              {block.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
