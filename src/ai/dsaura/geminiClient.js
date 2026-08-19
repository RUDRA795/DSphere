import { getSystemInstruction } from './systemPrompt'
import { getDeterministicFallback } from './fallback'

export async function queryDSAURA({ message, history = [], currentRoute = '/', audioBlob = null }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''

  const parseAction = (text) => {
    let cleanText = text
    let action = null
    const actionMatch = text.match(/<<<ACTION:(.*?)>>>/)
    if (actionMatch) {
      try {
        action = JSON.parse(actionMatch[1])
        cleanText = text.replace(/<<<ACTION:(.*?)>>>/g, '').trim()
      } catch (e) {
        // ignore JSON parse error
      }
    }
    return { cleanText, action }
  }

  const getVisualState = (text, action) => {
    if (action?.type === 'openRegistration') return 'SUCCESS'
    if (action?.eventId === 'dataforge' || /dataforge/i.test(text)) return 'DATAFORGE'
    if (action?.eventId === 'dataduals' || /dataduals/i.test(text)) return 'DATADUALS'
    if (action?.eventId === 'datamodelling' || /datamodelling/i.test(text)) return 'CAD'
    if (/rule|disqualif|caution/i.test(text)) return 'WARNING'
    return 'RESPONDING'
  }

  // 1. Try Backend Proxy /api/dsaura
  try {
    const payload = {
      message: message || '',
      history: history.slice(-6),
      currentRoute,
    }

    if (audioBlob) {
      const reader = new FileReader()
      const base64Promise = new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result.split(',')[1])
        reader.readAsDataURL(audioBlob)
      })
      payload.audioBase64 = await base64Promise
      payload.audioMimeType = audioBlob.type || 'audio/webm'
    }

    const response = await fetch('/api/dsaura', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      const data = await response.json()
      if (data.text) {
        const { cleanText, action } = parseAction(data.text)
        return {
          text: cleanText,
          action: action || data.action || null,
          visualState: getVisualState(cleanText, action || data.action),
          isOffline: false,
        }
      }
    }
  } catch (err) {
    console.warn('[DSAURA] Server endpoint failed, trying direct Gemini API...', err)
  }

  // 2. Direct Browser-side Gemini API (trying gemini-3.6-flash, then gemini-3.5-flash, then gemini-2.5-flash)
  if (apiKey) {
    const candidateModels = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-2.5-flash']
    const systemInstruction = getSystemInstruction()
    const contents = []

    history.slice(-4).forEach((h) => {
      contents.push({
        role: h.sender === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }],
      })
    })

    const userParts = []
    if (audioBlob) {
      const reader = new FileReader()
      const base64Promise = new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result.split(',')[1])
        reader.readAsDataURL(audioBlob)
      })
      const audioBase64 = await base64Promise
      userParts.push({
        inline_data: {
          mime_type: audioBlob.type || 'audio/webm',
          data: audioBase64,
        }
      })
    }
    userParts.push({ text: `[Current Page Context: ${currentRoute}]
User Query: ${message || 'Voice Query'}` })

    contents.push({
      role: 'user',
      parts: userParts,
    })

    for (const model of candidateModels) {
      try {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
        const directRes = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: systemInstruction }],
            },
            contents,
          }),
        })

        if (directRes.ok) {
          const directData = await directRes.json()
          const rawText = directData.candidates?.[0]?.content?.parts?.[0]?.text || ''
          if (rawText) {
            const { cleanText, action } = parseAction(rawText)
            return {
              text: cleanText,
              action,
              visualState: getVisualState(cleanText, action),
              isOffline: false,
            }
          }
        }
      } catch (e) {
        // try next candidate model
      }
    }
  }

  // 3. Fallback to deterministic local knowledge
  return getDeterministicFallback(message, currentRoute)
}
