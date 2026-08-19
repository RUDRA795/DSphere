import React, { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function NeuralBackground() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 160,
      active: false,
    }

    // Adaptive particle count for ultra-smooth 60fps performance across devices
    const isMobile = width < 768
    const particleCount = isMobile
      ? Math.min(18, Math.floor((width * height) / 34000))
      : Math.min(34, Math.floor((width * height) / 26000))

    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.3 + 0.8,
        alpha: Math.random() * 0.4 + 0.2,
      })
    }

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize, { passive: true })

    const particleColor = isDark ? '0, 194, 255' : '2, 132, 199'
    const highlightColor = isDark ? '0, 255, 157' : '124, 58, 237'

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Smooth mouse damping
      mouse.x += (mouse.targetX - mouse.x) * 0.06
      mouse.y += (mouse.targetY - mouse.y) * 0.06

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // Bounce from boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Mouse interaction (gentle attraction / repulsion)
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 0.35
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor}, ${p.alpha * (isDark ? 0.65 : 0.45)})`
        ctx.fill()
      }

      // Inter-particle connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          const maxDist = isMobile ? 90 : 125
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * (isDark ? 0.14 : 0.08)
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${particleColor}, ${lineAlpha})`
            ctx.lineWidth = 0.65
            ctx.stroke()
          }
        }

        // Cursor proximity connections
        if (mouse.active) {
          const p = particles[i]
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouse.radius) {
            const lineAlpha = (1 - dist / mouse.radius) * (isDark ? 0.25 : 0.14)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(${highlightColor}, ${lineAlpha})`
            ctx.lineWidth = 0.75
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [isDark])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700"
      style={{ opacity: isDark ? 0.45 : 0.28 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}


