import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'

import DSAURAOrb from './DSAURAOrb'
import DSAURAHeader from './DSAURAHeader'
import DSAURAMessage from './DSAURAMessage'
import DSAURAInput from './DSAURAInput'
import DSAURASuggestions from './DSAURASuggestions'

import { queryDSAURA } from '../../ai/dsaura/geminiClient'
import { useTheme } from '../../context/ThemeContext'

const INITIAL_WELCOME = {
  id: 'welcome',
  sender: 'dsaura',
  text: "Hello! I am **DSAURA**, the official AI Event Intelligence Assistant for **DSphere 2026** at TGPCET Nagpur. Ask me anything about our 3 flagship competitions, schedule, fees, or rules!",
  chips: [
    { label: '3 Flagship Events', action: { type: 'openEvent', eventId: 'dataforge' } },
    { label: 'Event Schedule', action: { type: 'openSchedule' } },
    { label: 'Registration Fees', action: { type: 'query', text: 'What are the registration fees for all events?' } },
  ],
}

export default function DSAURA({ onOpenRegister }) {
  const [isOpen, setIsOpen] = useState(false)
  const [robotState, setRobotState] = useState('IDLE')
  const [isOffline, setIsOffline] = useState(false)
  const [messages, setMessages] = useState([INITIAL_WELCOME])
  const [hasStartedConversation, setHasStartedConversation] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)

  const messagesEndRef = useRef(null)
  const dragControls = useDragControls()
  const location = useLocation()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen, robotState])

  // Execute Predefined Safe Actions
  const executeSafeAction = (action) => {
    if (!action) return

    switch (action.type) {
      case 'openEvent':
        setRobotState(action.eventId === 'dataduals' ? 'DATADUALS' : action.eventId === 'datamodelling' ? 'CAD' : 'DATAFORGE')
        navigate(`/events/${action.eventId || 'dataforge'}`)
        break

      case 'openSchedule':
        setRobotState('SUCCESS')
        navigate('/schedule')
        break

      case 'openRules':
        setRobotState('WARNING')
        navigate('/rules')
        break

      case 'openAbout':
        setRobotState('SUCCESS')
        navigate('/about')
        break

      case 'openRegistration':
        setRobotState('SUCCESS')
        if (onOpenRegister) {
          onOpenRegister(action.eventId || 'dataforge')
        }
        break

      case 'closeAssistant':
        handleClose()
        break

      case 'query':
        if (action.text) {
          handleSendMessage(action.text)
        }
        break

      default:
        break
    }
  }

  const handleSendMessage = async (text) => {
    if (!text.trim()) return

    setHasStartedConversation(true)
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
    }

    setMessages((prev) => [...prev, userMsg])
    setRobotState('THINKING')

    try {
      const response = await queryDSAURA({
        message: text.trim(),
        history: messages,
        currentRoute: location.pathname,
      })

      setIsOffline(response.isOffline || false)
      setRobotState(response.visualState || 'RESPONDING')

      const assistantMsg = {
        id: `dsaura-${Date.now()}`,
        sender: 'dsaura',
        text: response.text,
        chips: response.chips || null,
        action: response.action || null,
      }

      setMessages((prev) => [...prev, assistantMsg])

      if (response.action) {
        setTimeout(() => {
          executeSafeAction(response.action)
        }, 600)
      }

      setTimeout(() => {
        setRobotState('IDLE')
      }, 3000)
    } catch (err) {
      console.error('[DSAURA]', err)
      setRobotState('ERROR')
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'dsaura',
          text: "I encountered an error connecting to Gemini 3.6 Flash. Switching to local offline knowledge mode.",
        },
      ])
      setTimeout(() => setRobotState('IDLE'), 3000)
    }
  }

  const handleVoiceInput = async (audioBlob) => {
    setHasStartedConversation(true)
    setRobotState('LISTENING')
    const userMsg = {
      id: `voice-${Date.now()}`,
      sender: 'user',
      text: '🎙 [Voice Query]',
    }
    setMessages((prev) => [...prev, userMsg])

    try {
      const response = await queryDSAURA({
        message: 'Voice query captured',
        audioBlob,
        history: messages,
        currentRoute: location.pathname,
      })

      setRobotState(response.visualState || 'RESPONDING')
      setMessages((prev) => [
        ...prev,
        {
          id: `dsaura-${Date.now()}`,
          sender: 'dsaura',
          text: response.text,
          chips: response.chips || null,
        },
      ])

      if (response.action) {
        executeSafeAction(response.action)
      }

      setTimeout(() => setRobotState('IDLE'), 3000)
    } catch (e) {
      setRobotState('ERROR')
    }
  }

  // Reset to New Chat
  const handleNewChat = () => {
    setMessages([INITIAL_WELCOME])
    setHasStartedConversation(false)
    setRobotState('IDLE')
  }

  // Close and reset position to bottom-right
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex flex-col items-end pointer-events-none">
      {/* 1. Closed State: Floating Realistic AI Robot Orb */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="pointer-events-auto"
          >
            <DSAURAOrb
              onClick={() => setIsOpen(true)}
              state={robotState}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Open State: Freely Movable Floating Glass AI Console */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragConstraints={{
              top: -window.innerHeight + 620,
              bottom: 0,
              left: -window.innerWidth + 440,
              right: 0,
            }}
            whileDrag={{ scale: 1.01, boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
            initial={{ opacity: 0, scale: 0.85, y: 30, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-auto w-[92vw] sm:w-[410px] h-[580px] max-h-[84vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl border backdrop-blur-2xl transition-colors ${
              isDark
                ? 'bg-[#040914]/95 border-white/15 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.85)]'
                : 'bg-white/95 border-[#E2E8F0] shadow-[0_20px_50px_-10px_rgba(15,23,42,0.2)]'
            }`}
          >
            {/* Header / Movable Drag Bar */}
            <div onPointerDown={(e) => dragControls.start(e)}>
              <DSAURAHeader
                state={robotState}
                isOffline={isOffline}
                onClose={handleClose}
                onNewChat={handleNewChat}
              />
            </div>

            {/* Conversation Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
              {messages.map((msg) => (
                <DSAURAMessage
                  key={msg.id}
                  message={msg}
                  onAction={executeSafeAction}
                />
              ))}

              {/* Robot Thinking Activity Bar */}
              {robotState === 'THINKING' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 my-2 p-2.5 rounded-xl bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-xs font-mono text-[#00C2FF] w-fit"
                >
                  <div className="w-2 h-2 rounded-full bg-[#00C2FF] animate-ping" />
                  <span>DSAURA THINKING...</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Onboarding Starter Suggestions (Shown ONLY before conversation begins) */}
            {!hasStartedConversation && (
              <DSAURASuggestions
                currentRoute={location.pathname}
                onSelectPrompt={handleSendMessage}
              />
            )}

            {/* Input & Voice Controls */}
            <DSAURAInput
              onSend={handleSendMessage}
              onVoiceInput={handleVoiceInput}
              disabled={robotState === 'THINKING'}
              onListeningChange={(listening) => setRobotState(listening ? 'LISTENING' : 'IDLE')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
