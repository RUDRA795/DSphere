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

                // Candidate models
                const candidateModels = [
                  'gemini-3.5-flash',
                  'gemini-3.6-flash',
                  'gemini-flash-latest',
                ]
                let replyText = ''

                if (apiKey) {
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
                      }
                    } catch (e) {
                      // try next
                    }
                  }
                }

                res.setHeader('Content-Type', 'application/json')
                if (replyText) {
                  res.end(JSON.stringify({ text: replyText, isOnline: true }))
                } else {
                  // Instant intelligent response from knowledge base when quota cooling down
                  res.end(JSON.stringify({
                    useLocalFallback: true,
                    isOnline: true,
                  }))
                }
              } catch (err) {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ useLocalFallback: true, isOnline: true }))
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
