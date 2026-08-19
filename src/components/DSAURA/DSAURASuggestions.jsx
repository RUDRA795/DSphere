import React from 'react'
import { Sparkles } from 'lucide-react'

export default function DSAURASuggestions({ currentRoute = '/', onSelectPrompt }) {
  const getContextPrompts = (route) => {
    if (route.startsWith('/events/dataforge')) {
      return [
        'What is the DataForge evaluation rubric?',
        'What are the 4 focus tracks in DataForge?',
        'How do I register for DataForge?',
      ]
    }
    if (route.startsWith('/events/dataduals')) {
      return [
        'What are the debate topics in DataDuals?',
        'Is DataDuals free to participate?',
        'What is the team size for DataDuals?',
      ]
    }
    if (route.startsWith('/events/datamodelling')) {
      return [
        'Which 3D CAD software are allowed?',
        'What is the entry fee for DataModelling?',
        'What are the submission requirements?',
      ]
    }
    if (route.startsWith('/schedule')) {
      return [
        'What happens at 10:00 AM?',
        'When does the ML hackathon start?',
        'What time is the prize distribution?',
      ]
    }
    if (route.startsWith('/rules')) {
      return [
        'What is the reporting time?',
        'Who is eligible to participate?',
        'What causes disqualification?',
      ]
    }
    return [
      'What are the 3 flagship events?',
      'What are the registration fees?',
      'Show me the full schedule',
      'Where is TGPCET campus located?',
    ]
  }

  const prompts = getContextPrompts(currentRoute)

  return (
    <div className="px-4 py-2.5 border-t border-white/5 flex flex-col gap-1.5">
      <div className="flex items-center gap-1 text-[10.5px] font-mono text-slate-400">
        <Sparkles size={11} className="text-[#00C2FF]" />
        <span>Suggested Questions:</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {prompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectPrompt(prompt)}
            className="px-2.5 py-1 rounded-full text-[11px] font-mono border transition-all text-left bg-white/5 border-white/10 hover:border-[#00C2FF]/40 text-slate-300 hover:text-white cursor-pointer hover:scale-102"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}
