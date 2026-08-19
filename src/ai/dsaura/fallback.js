import { getAuthoritativeKnowledge } from './knowledgeAdapter'

export function getDeterministicFallback(query, currentRoute = '/') {
  const q = (query || '').toLowerCase().trim()
  const k = getAuthoritativeKnowledge()

  // 0. Greetings & Friendly Small Talk
  if (/^(hi|hello|hey|greetings|namaste|good morning|good afternoon|good evening|yo|sup|who are you|what is your name)\b/i.test(q)) {
    return {
      text: "Hello! I am **DSAURA**, the official AI Event Intelligence Assistant for **DSphere 2026** at TGPCET Nagpur.\n\nI can help you with registration, competition details (DataForge, DataDuals, DataModelling), schedules, fees, and campus rules. What would you like to know?",
      visualState: 'RESPONDING',
      isOffline: true,
      chips: [
        { label: '3 Flagship Events', action: { type: 'openEvent', eventId: 'dataforge' } },
        { label: 'Event Schedule', action: { type: 'openSchedule' } },
        { label: 'Registration Fees', action: { type: 'query', text: 'What are the registration fees?' } },
      ]
    }
  }

  // 1. Safe Action Intents (Offline capable)
  if (/^(open|show|go to|view) (schedule|timeline)/.test(q)) {
    return {
      text: "Navigating to the official DSphere 2026 event schedule.",
      action: { type: 'openSchedule' },
      visualState: 'SUCCESS',
      isOffline: true,
      chips: [{ label: 'View Schedule', action: { type: 'openSchedule' } }]
    }
  }

  if (/^(open|show|go to|view) (rules|guidelines)/.test(q)) {
    return {
      text: "Opening the official DSphere 2026 rules and eligibility book.",
      action: { type: 'openRules' },
      visualState: 'WARNING',
      isOffline: true,
      chips: [{ label: 'Read Rules', action: { type: 'openRules' } }]
    }
  }

  if (/^(open|show|go to|view) (about|department|college|tgpcet)/.test(q)) {
    return {
      text: "Opening Department of CSE (Data Science) institutional dossier.",
      action: { type: 'openAbout' },
      visualState: 'SUCCESS',
      isOffline: true,
      chips: [{ label: 'About CSE-DS', action: { type: 'openAbout' } }]
    }
  }

  if (/^(open|show|go to|view) (dataforge|hackathon|ml)/.test(q)) {
    return {
      text: "Opening DataForge — Machine Learning & AI Hackathon track page.",
      action: { type: 'openEvent', eventId: 'dataforge' },
      visualState: 'DATAFORGE',
      isOffline: true,
      chips: [
        { label: 'Open DataForge', action: { type: 'openEvent', eventId: 'dataforge' } },
        { label: 'Register', action: { type: 'openRegistration', eventId: 'dataforge' } }
      ]
    }
  }

  if (/^(open|show|go to|view) (dataduals|debate)/.test(q)) {
    return {
      text: "Opening DataDuals — Technology Debate Championship track page.",
      action: { type: 'openEvent', eventId: 'dataduals' },
      visualState: 'DATADUALS',
      isOffline: true,
      chips: [
        { label: 'Open DataDuals', action: { type: 'openEvent', eventId: 'dataduals' } },
        { label: 'Register', action: { type: 'openRegistration', eventId: 'dataduals' } }
      ]
    }
  }

  if (/^(open|show|go to|view) (datamodelling|cad|3d)/.test(q)) {
    return {
      text: "Opening DataModelling — 3D CAD & Digital Twin Challenge track page.",
      action: { type: 'openEvent', eventId: 'datamodelling' },
      visualState: 'CAD',
      isOffline: true,
      chips: [
        { label: 'Open DataModelling', action: { type: 'openEvent', eventId: 'datamodelling' } },
        { label: 'Register', action: { type: 'openRegistration', eventId: 'datamodelling' } }
      ]
    }
  }

  // 2. Direct Registration Requests
  if (/register.*(dataforge|ml|hackathon)/.test(q) || (q.includes('dataforge') && q.includes('register'))) {
    return {
      text: "Opening DataForge registration (₹150/team, 1–3 members).",
      action: { type: 'openRegistration', eventId: 'dataforge' },
      visualState: 'SUCCESS',
      isOffline: true,
      chips: [{ label: 'Register DataForge', action: { type: 'openRegistration', eventId: 'dataforge' } }]
    }
  }

  if (/register.*(dataduals|debate)/.test(q) || (q.includes('dataduals') && q.includes('register'))) {
    return {
      text: "Opening DataDuals registration (Free entry, 2 members).",
      action: { type: 'openRegistration', eventId: 'dataduals' },
      visualState: 'SUCCESS',
      isOffline: true,
      chips: [{ label: 'Register DataDuals', action: { type: 'openRegistration', eventId: 'dataduals' } }]
    }
  }

  if (/register.*(datamodelling|cad|3d)/.test(q) || (q.includes('datamodelling') && q.includes('register'))) {
    return {
      text: "Opening DataModelling registration (₹100/team, 1–2 members).",
      action: { type: 'openRegistration', eventId: 'datamodelling' },
      visualState: 'SUCCESS',
      isOffline: true,
      chips: [{ label: 'Register DataModelling', action: { type: 'openRegistration', eventId: 'datamodelling' } }]
    }
  }

  // 3. Questions about Fees
  if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('kitni hai') || q.includes('kitna hai')) {
    if (q.includes('dataforge')) {
      return {
        text: "**DataForge** entry fee is **₹150 per team** (1 to 3 members).",
        visualState: 'DATAFORGE',
        isOffline: true,
        chips: [
          { label: 'Open DataForge', action: { type: 'openEvent', eventId: 'dataforge' } },
          { label: 'Register Now', action: { type: 'openRegistration', eventId: 'dataforge' } }
        ]
      }
    }
    if (q.includes('dataduals') || q.includes('debate') || q.includes('free')) {
      return {
        text: "**DataDuals** has **Free Entry** (₹0 entry fee) for teams of exactly 2 members.",
        visualState: 'DATADUALS',
        isOffline: true,
        chips: [
          { label: 'Open DataDuals', action: { type: 'openEvent', eventId: 'dataduals' } },
          { label: 'Register Free', action: { type: 'openRegistration', eventId: 'dataduals' } }
        ]
      }
    }
    if (q.includes('datamodelling') || q.includes('cad') || q.includes('3d')) {
      return {
        text: "**DataModelling** entry fee is **₹100 per team** (1 to 2 members).",
        visualState: 'CAD',
        isOffline: true,
        chips: [
          { label: 'Open DataModelling', action: { type: 'openEvent', eventId: 'datamodelling' } },
          { label: 'Register Now', action: { type: 'openRegistration', eventId: 'datamodelling' } }
        ]
      }
    }
    return {
      text: "**DSphere 2026 Registration Fees**:\n• **DataForge** (ML Hackathon): ₹150 / team (1–3 members)\n• **DataDuals** (Tech Debate): **Free Entry** (2 members)\n• **DataModelling** (3D CAD): ₹100 / team (1–2 members)",
      visualState: 'NORMAL',
      isOffline: true,
      chips: [
        { label: 'Register for Events', action: { type: 'openRegistration', eventId: 'dataforge' } },
        { label: 'View Events', action: { type: 'openEvent', eventId: 'dataforge' } }
      ]
    }
  }

  // 4. Questions about Team Sizes
  if (q.includes('team') || q.includes('member') || q.includes('members') || q.includes('log') || q.includes('size')) {
    if (q.includes('dataforge')) {
      return {
        text: "**DataForge** allows **1 to 3 members** per team.",
        visualState: 'DATAFORGE',
        isOffline: true,
        chips: [{ label: 'Open DataForge', action: { type: 'openEvent', eventId: 'dataforge' } }]
      }
    }
    if (q.includes('dataduals') || q.includes('debate')) {
      return {
        text: "**DataDuals** requires **exactly 2 members** (Speaker 1 + Speaker 2).",
        visualState: 'DATADUALS',
        isOffline: true,
        chips: [{ label: 'Open DataDuals', action: { type: 'openEvent', eventId: 'dataduals' } }]
      }
    }
    if (q.includes('datamodelling') || q.includes('cad')) {
      return {
        text: "**DataModelling** allows **1 to 2 members** per team.",
        visualState: 'CAD',
        isOffline: true,
        chips: [{ label: 'Open DataModelling', action: { type: 'openEvent', eventId: 'datamodelling' } }]
      }
    }
  }

  // 5. Schedule & Timing Questions
  if (q.includes('schedule') || q.includes('time') || q.includes('timing') || q.includes('kab') || q.includes('when') || q.includes('date')) {
    if (q.includes('dataforge')) {
      return {
        text: "**DataForge** starts at **10:30 AM onwards** on Saturday, 22 August 2026 in the **Advanced AI & Data Science Lab, TGPCET**.",
        visualState: 'DATAFORGE',
        isOffline: true,
        chips: [{ label: 'View Schedule', action: { type: 'openSchedule' } }]
      }
    }
    if (q.includes('dataduals') || q.includes('debate')) {
      return {
        text: "**DataDuals** commences at **01:00 PM onwards** on 22 August 2026 in **Seminar Hall 1, TGPCET**.",
        visualState: 'DATADUALS',
        isOffline: true,
        chips: [{ label: 'View Schedule', action: { type: 'openSchedule' } }]
      }
    }
    if (q.includes('datamodelling') || q.includes('cad')) {
      return {
        text: "**DataModelling** begins at **12:00 PM onwards** on 22 August 2026 in the **CAD Centre, Mech Block, TGPCET**.",
        visualState: 'CAD',
        isOffline: true,
        chips: [{ label: 'View Schedule', action: { type: 'openSchedule' } }]
      }
    }
    return {
      text: "**DSphere 2026 Event Day Timeline (22 Aug 2026)**:\n• 09:30 AM — Reporting & Kit Distribution\n• 10:00 AM — Grand Inauguration Ceremony\n• 10:30 AM — DataForge ML Hackathon\n• 11:00 AM — Keynote Guest Lecture\n• 12:00 PM — DataModelling CAD Challenge\n• 01:00 PM — DataDuals Tech Debate\n• 03:00 PM — Final Judging & Demos\n• 04:00 PM — Valedictory & Prize Distribution",
      visualState: 'NORMAL',
      isOffline: true,
      chips: [{ label: 'Open Schedule', action: { type: 'openSchedule' } }]
    }
  }

  // 6. Rules & Eligibility
  if (q.includes('rule') || q.includes('eligib') || q.includes('disqualif') || q.includes('who can participate') || q.includes('college id')) {
    return {
      text: "**DSphere 2026 Eligibility & Rules**:\n• Open to all bona fide UG, PG, and Diploma engineering students from recognized institutions.\n• Mandatory valid college ID card required on event day.\n• Reporting time: 45 minutes before track start time (late entry beyond 15 mins forfeits slot).\n• Plagiarism / pre-built copied submissions result in immediate disqualification.",
      visualState: 'WARNING',
      isOffline: true,
      chips: [{ label: 'View Rulebook', action: { type: 'openRules' } }]
    }
  }

  // 7. General Fallback
  return {
    text: "I am ready to help with DSphere 2026! Ask me about competition fees, team limits, schedules, venues, rules, or select an option below:",
    visualState: 'NORMAL',
    isOffline: true,
    chips: [
      { label: 'Flagship Events', action: { type: 'openEvent', eventId: 'dataforge' } },
      { label: 'Event Schedule', action: { type: 'openSchedule' } },
      { label: 'Rules & Eligibility', action: { type: 'openRules' } },
    ]
  }
}
