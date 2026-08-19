import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

export default function DSAURARobot({
  state = 'IDLE',
  size = 56,
  className = '',
  audioLevel = 0,
  interactive = true,
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  useEffect(() => {
    if (!interactive) return
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = (e.clientX - centerX) / (window.innerWidth / 2)
      const dy = (e.clientY - centerY) / (window.innerHeight / 2)
      setMouseOffset({
        x: Math.max(-1, Math.min(1, dx)) * 6,
        y: Math.max(-1, Math.min(1, dy)) * 6,
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [interactive])

  // Realistic Color & Emissive Profiles per State
  const getStateVisuals = () => {
    switch (state) {
      case 'LISTENING':
        return {
          coreGlow: 'radial-gradient(circle, #00FF9D 0%, #00C2FF 60%, transparent 80%)',
          rimColor: '#00FF9D',
          eyeColor: '#00FF9D',
          auraColor: 'rgba(0, 255, 157, 0.45)',
          ringSpeed: 3,
          bloomIntensity: 1.4,
        }
      case 'THINKING':
        return {
          coreGlow: 'radial-gradient(circle, #00C2FF 0%, #8B5CF6 70%, transparent 85%)',
          rimColor: '#8B5CF6',
          eyeColor: '#00C2FF',
          auraColor: 'rgba(0, 194, 255, 0.55)',
          ringSpeed: 1.8,
          bloomIntensity: 1.6,
        }
      case 'DATAFORGE':
        return {
          coreGlow: 'radial-gradient(circle, #00C2FF 0%, #0284C7 70%, transparent 85%)',
          rimColor: '#00C2FF',
          eyeColor: '#38BDF8',
          auraColor: 'rgba(0, 194, 255, 0.5)',
          ringSpeed: 6,
          bloomIntensity: 1.3,
        }
      case 'DATADUALS':
        return {
          coreGlow: 'radial-gradient(circle, #8B5CF6 0%, #6D28D9 70%, transparent 85%)',
          rimColor: '#8B5CF6',
          eyeColor: '#C084FC',
          auraColor: 'rgba(139, 92, 246, 0.5)',
          ringSpeed: 6,
          bloomIntensity: 1.3,
        }
      case 'CAD':
        return {
          coreGlow: 'radial-gradient(circle, #00FF9D 0%, #059669 70%, transparent 85%)',
          rimColor: '#00FF9D',
          eyeColor: '#34D399',
          auraColor: 'rgba(0, 255, 157, 0.5)',
          ringSpeed: 6,
          bloomIntensity: 1.3,
        }
      case 'SUCCESS':
        return {
          coreGlow: 'radial-gradient(circle, #00FF9D 0%, #00C2FF 70%, transparent 85%)',
          rimColor: '#00FF9D',
          eyeColor: '#00FF9D',
          auraColor: 'rgba(0, 255, 157, 0.6)',
          ringSpeed: 4,
          bloomIntensity: 1.5,
        }
      case 'WARNING':
        return {
          coreGlow: 'radial-gradient(circle, #F59E0B 0%, #D97706 70%, transparent 85%)',
          rimColor: '#F59E0B',
          eyeColor: '#FBBF24',
          auraColor: 'rgba(245, 158, 11, 0.5)',
          ringSpeed: 8,
          bloomIntensity: 1.2,
        }
      case 'ERROR':
        return {
          coreGlow: 'radial-gradient(circle, #EF4444 0%, #DC2626 70%, transparent 85%)',
          rimColor: '#EF4444',
          eyeColor: '#F87171',
          auraColor: 'rgba(239, 68, 68, 0.45)',
          ringSpeed: 10,
          bloomIntensity: 1.1,
        }
      default:
        // IDLE / RESPONDING
        return {
          coreGlow: isDark
            ? 'radial-gradient(circle, #00C2FF 0%, #8B5CF6 75%, transparent 85%)'
            : 'radial-gradient(circle, #0284C7 0%, #38BDF8 70%, transparent 85%)',
          rimColor: isDark ? '#00C2FF' : '#0284C7',
          eyeColor: isDark ? '#00FF9D' : '#0284C7',
          auraColor: isDark ? 'rgba(0, 194, 255, 0.35)' : 'rgba(2, 132, 199, 0.22)',
          ringSpeed: 10,
          bloomIntensity: 1.0,
        }
    }
  }

  const v = getStateVisuals()

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* 1. Deep Atmospheric Soft Bloom Aura */}
      <motion.div
        animate={{
          scale: state === 'LISTENING' ? [1, 1.35 + audioLevel * 0.3, 1] : state === 'THINKING' ? [1, 1.25, 1] : [1, 1.12, 1],
          opacity: state === 'THINKING' ? [0.5, 0.85, 0.5] : [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: state === 'LISTENING' ? 0.8 : state === 'THINKING' ? 1.4 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-[-20%] rounded-full blur-2xl pointer-events-none"
        style={{ backgroundColor: v.auraColor }}
      />

      {/* 2. Precision Robotic Outer Gimbal Ring (CAD Precision) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: v.ringSpeed,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          border: `1.5px dashed ${v.rimColor}`,
          opacity: isDark ? 0.65 : 0.45,
          boxShadow: `0 0 10px ${v.auraColor}`,
        }}
      />

      {/* 3. Counter-Rotating Inner Gyro Ring */}
      <motion.div
        animate={{ rotate: -360, rotateX: 65 }}
        transition={{
          duration: v.ringSpeed * 1.4,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-1.5 rounded-full pointer-events-none"
        style={{
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.25)' : 'rgba(15,23,42,0.2)'}`,
          borderTopColor: v.rimColor,
          opacity: 0.7,
        }}
      />

      {/* 4. Realistic Glass Robotic Shell with Specular Highlights & Cursor Tilt */}
      <motion.div
        animate={{
          x: mouseOffset.x,
          y: mouseOffset.y,
          scale: state === 'THINKING' ? [0.96, 1.04, 0.96] : [1, 1.02, 1],
        }}
        transition={{
          x: { type: 'spring', stiffness: 200, damping: 20 },
          y: { type: 'spring', stiffness: 200, damping: 20 },
          scale: { duration: state === 'THINKING' ? 0.8 : 2.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="relative rounded-full flex items-center justify-center shadow-xl backdrop-blur-md overflow-hidden"
        style={{
          width: `${size * 0.72}px`,
          height: `${size * 0.72}px`,
          background: isDark
            ? 'radial-gradient(circle at 35% 35%, rgba(15, 23, 42, 0.9) 0%, rgba(4, 9, 20, 0.98) 100%)'
            : 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.98) 0%, rgba(226, 238, 250, 0.95) 100%)',
          border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(203,213,225,0.8)'}`,
          boxShadow: isDark
            ? `0 6px 20px rgba(0,0,0,0.6), inset 0 0 14px ${v.auraColor}`
            : `0 6px 20px rgba(15,23,42,0.12), inset 0 0 10px rgba(2,132,199,0.15)`,
        }}
      >
        {/* Internal Emissive Core Glow */}
        <div
          className="absolute inset-1 rounded-full opacity-60 pointer-events-none blur-sm"
          style={{ background: v.coreGlow }}
        />

        {/* Specular Light Reflection (Glass Curvature) */}
        <div
          className="absolute top-1 left-2 w-1/3 h-1/4 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
            transform: 'rotate(-25deg)',
          }}
        />

        {/* Two Expressive Robotic Optical Eye Sensors */}
        <div className="flex items-center gap-1.5 sm:gap-2 relative z-10">
          {/* Left Eye */}
          <motion.div
            animate={{
              scaleY: state === 'THINKING' ? [1, 0.2, 1] : [1, 1, 0.08, 1],
              scaleX: state === 'LISTENING' ? [1, 1.4, 1] : 1,
            }}
            transition={{
              duration: state === 'THINKING' ? 0.6 : 4,
              repeat: Infinity,
              times: state === 'THINKING' ? [0, 0.5, 1] : [0, 0.88, 0.92, 1],
            }}
            className="rounded-full shadow-md"
            style={{
              width: `${Math.max(3.5, size * 0.11)}px`,
              height: `${Math.max(4.5, size * 0.15)}px`,
              backgroundColor: v.eyeColor,
              boxShadow: `0 0 10px ${v.eyeColor}, 0 0 3px #FFFFFF`,
            }}
          />

          {/* Right Eye */}
          <motion.div
            animate={{
              scaleY: state === 'THINKING' ? [1, 0.2, 1] : [1, 1, 0.08, 1],
              scaleX: state === 'LISTENING' ? [1, 1.4, 1] : 1,
            }}
            transition={{
              duration: state === 'THINKING' ? 0.6 : 4,
              repeat: Infinity,
              times: state === 'THINKING' ? [0, 0.5, 1] : [0, 0.88, 0.92, 1],
            }}
            className="rounded-full shadow-md"
            style={{
              width: `${Math.max(3.5, size * 0.11)}px`,
              height: `${Math.max(4.5, size * 0.15)}px`,
              backgroundColor: v.eyeColor,
              boxShadow: `0 0 10px ${v.eyeColor}, 0 0 3px #FFFFFF`,
            }}
          />
        </div>

        {/* Micro Quantum Core Center Crystal */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1 w-1.5 h-1.5 rounded-full shadow-sm"
          style={{
            backgroundColor: v.rimColor,
            boxShadow: `0 0 6px ${v.rimColor}`,
          }}
        />
      </motion.div>

      {/* 5. Orbiting Data Packet Particles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full -translate-x-1/2 shadow-sm"
          style={{
            backgroundColor: v.rimColor,
            boxShadow: `0 0 8px ${v.rimColor}`,
          }}
        />
      </motion.div>
    </div>
  )
}
