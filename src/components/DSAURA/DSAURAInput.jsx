import React, { useState, useRef, useEffect } from 'react'
import { Send, Mic, MicOff, Square } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

export default function DSAURAInput({ onSend, onVoiceInput, disabled = false, onListeningChange }) {
  const [inputText, setInputText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const recognitionRef = useRef(null)

  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-IN'

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript
        if (transcript) {
          setInputText(transcript)
          onSend(transcript)
        }
        setIsRecording(false)
        if (onListeningChange) onListeningChange(false)
      }

      recognition.onerror = () => {
        setIsRecording(false)
        if (onListeningChange) onListeningChange(false)
      }

      recognition.onend = () => {
        setIsRecording(false)
        if (onListeningChange) onListeningChange(false)
      }

      recognitionRef.current = recognition
    }
  }, [onSend, onListeningChange])

  const handleStartRecording = async () => {
    if (recognitionRef.current) {
      try {
        setIsRecording(true)
        if (onListeningChange) onListeningChange(true)
        recognitionRef.current.start()
        return
      } catch (e) {
        // Fallback to MediaRecorder
      }
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Microphone access is not supported by your browser.')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setIsRecording(true)
      if (onListeningChange) onListeningChange(true)
      audioChunksRef.current = []

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        stream.getTracks().forEach((track) => track.stop())
        if (onVoiceInput) {
          onVoiceInput(audioBlob)
        }
      }

      mediaRecorder.start()
    } catch (err) {
      console.warn('[DSAURA Mic Error]', err)
      setIsRecording(false)
      if (onListeningChange) onListeningChange(false)
      alert('Microphone permission denied or unavailable.')
    }
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    if (onListeningChange) onListeningChange(false)
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (e) {
        // ignore
      }
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputText.trim() || disabled) return
    onSend(inputText.trim())
    setInputText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div
      className={`p-3 border-t relative transition-colors ${
        isDark ? 'bg-[#040914]/95 border-white/10' : 'bg-[#F8FAFC]/95 border-[#E2E8F0]'
      }`}
    >
      {/* Active Recording State Banner */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-10 left-3 right-3 py-1.5 px-3 rounded-xl bg-gradient-to-r from-red-500/20 via-[#00C2FF]/20 to-red-500/20 border border-red-500/40 backdrop-blur-md flex items-center justify-between text-xs z-20"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-mono text-red-400 font-bold tracking-wider uppercase">LISTENING...</span>
            </div>
            <button
              type="button"
              onClick={handleStopRecording}
              className="text-[11px] font-mono text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Square size={10} className="fill-current text-red-400" />
              <span>Stop</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button
          type="button"
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          aria-label={isRecording ? 'Stop voice recording' : 'Start voice input'}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
            isRecording
              ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
              : isDark
              ? 'bg-white/5 border-white/10 text-slate-300 hover:text-[#00C2FF] hover:border-[#00C2FF]/40'
              : 'bg-white border-[#E2E8F0] text-slate-600 hover:text-[#0284C7] hover:border-[#0284C7]/40 shadow-sm'
          }`}
        >
          {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={isRecording ? 'Listening to voice...' : 'Ask DSAURA (e.g. DataForge fee)...'}
          className={`flex-1 px-3.5 py-2.5 rounded-xl text-xs outline-none transition-all ${
            isDark
              ? 'bg-[#071124] border border-white/10 text-white placeholder-slate-500 focus:border-[#00C2FF]/50'
              : 'bg-white border border-[#CBD5E1] text-[#0F172A] placeholder-slate-400 focus:border-[#0284C7]'
          }`}
        />

        <button
          type="submit"
          disabled={!inputText.trim() || disabled}
          aria-label="Send message"
          className="p-2.5 rounded-xl btn-cyber-cyan text-xs font-bold flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 shadow-md"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  )
}
