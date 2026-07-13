import { useState } from 'react'
import { sfx } from '../audio.js'

// מערכת רמזים: נר 🕯️ שנפתח בהדרגה - ההבדל בין אתגר לתסכול
export default function HintBox({ hints }) {
  const [shown, setShown] = useState(0)

  if (!hints?.length) return null

  return (
    <div className="mt-4">
      {shown > 0 && (
        <div className="space-y-2 mb-3">
          {hints.slice(0, shown).map((h, i) => (
            <p key={i} className="bg-amber-400/15 border border-amber-300/40 rounded-2xl px-4 py-2 text-amber-200 font-bold animate-pop">
              🕯️ {h}
            </p>
          ))}
        </div>
      )}
      {shown < hints.length && (
        <button
          onClick={() => { sfx.tap(); setShown((n) => n + 1) }}
          className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white/80 font-bold active:scale-95 transition-transform"
        >
          {shown === 0 ? 'צריך רמז? 🕯️' : 'עוד רמז 🕯️'}
        </button>
      )}
    </div>
  )
}
