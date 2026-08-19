import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      {
        name: 'dsaura-api-server',
        configureServer(server) {
          server.middlewares.use('/api/dsaura', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end(JSON.stringify({ error: 'Method Not Allowed' }))
              return
            }

            let body = ''
            req.on('data', (chunk) => {
              body += chunk
            })

            req.on('end', async () => {
              try {
                const data = JSON.parse(body || '{}')
                const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || ''

                if (!apiKey) {
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({
                    error: 'API Key not configured on server',
                    useLocalFallback: true,
                  }))
                  return
                }

                // Authoritative System Prompt
                const systemPrompt = `You are DSAURA, the official AI Event Intelligence Assistant for DSphere 2026 at TGPCET Nagpur.
Rules:
- Give concise, accurate, helpful answers based on DSphere 2026.
- Competitions: DataForge (₹150/team, 1-3 members, ML Hackathon), DataDuals (Free entry, 2 members, Tech Debate), DataModelling (₹100/team, 1-2 members, 3D CAD Challenge).
- Date: 22 August 2026 at TGPCET Nagpur.
- To trigger actions, append <<<ACTION:{"type":"openEvent","eventId":"dataforge"}>>>, <<<ACTION:{"type":"openSchedule"}>>>, <<<ACTION:{"type":"openRules"}>>>, or <<<ACTION:{"type":"openRegistration","eventId":"dataforge"}>>>.`

                const contents = []
                if (data.history && Array.isArray(data.history)) {
                  data.history.slice(-4).forEach(h => {
                    contents.push({
                      role: h.sender === 'user' ? 'user' : 'model',
                      parts: [{ text: h.text }]
                    })
                  })
                }

                const userParts = []
                if (data.audioBase64) {
                  userParts.push({
                    inline_data: {
                      mime_type: data.audioMimeType || 'audio/webm',
                      data: data.audioBase64,
                    }
                  })
                }
                userParts.push({ text: `[Route: ${data.currentRoute || '/'}] User: ${data.message || ''}` })

                contents.push({
                  role: 'user',
                  parts: userParts,
                })

                // Try gemini-3.6-flash, then gemini-3.5-flash, then gemini-2.5-flash
                const candidateModels = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-2.5-flash']
                let replyText = ''
                let lastError = null

                for (const model of candidateModels) {
                  try {
                    const geminiRes = await fetch(
                      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                      {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          system_instruction: { parts: [{ text: systemPrompt }] },
                          contents,
                        }),
                      }
                    )

                    if (geminiRes.ok) {
                      const geminiData = await geminiRes.json()
                      replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || ''
                      if (replyText) break
                    } else {
                      lastError = await geminiRes.text()
                    }
                  } catch (e) {
                    lastError = e.message
                  }
                }

                if (replyText) {
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ text: replyText, isOnline: true }))
                } else {
                  res.statusCode = 502
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: 'All Gemini models failed', details: lastError }))
                }
              } catch (err) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: err.message }))
              }
            })
          })
        }
      }
    ],
    server: {
      port: 5173,
      host: true,
    }
  }
})
