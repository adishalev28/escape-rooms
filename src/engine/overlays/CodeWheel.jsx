import { useState } from 'react'
import { sfx } from '../../audio.js'

// גלגל קוד אמיתי על התיבה - 3 גלגלים עם חיצים, כמו במשחקי הרפתקאות
export default function CodeWheel({ config, api }) {
  const [vals, setVals] = useState(config.answer.map(() => 0))
  const [status, setStatus] = useState('idle') // idle | wrong | open

  function turn(i, dir) {
    if (status === 'open') return
    sfx.tap()
    setStatus('idle')
    setVals((v) => v.map((x, j) => (j === i ? (x + dir + 10) % 10 : x)))
  }

  function tryOpen() {
    if (status === 'open') return
    if (vals.every((v, i) => v === config.answer[i])) {
      setStatus('open')
      sfx.unlock()
      setTimeout(() => config.onSolved(api), 900)
    } else {
      setStatus('wrong')
      sfx.locked()
    }
  }

  return (
    <div className="text-center">
      <p className="text-white/85 font-bold mb-4 leading-relaxed">{config.text}</p>

      <div className={`flex justify-center gap-3 ${status === 'wrong' ? 'animate-shake' : ''}`} dir="ltr">
        {config.icons.map((icon, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div className="text-3xl">{icon}</div>
            <button
              onClick={() => turn(i, 1)}
              className="bg-white/10 border border-white/20 rounded-xl w-16 py-1 text-white text-xl font-bold active:scale-90 transition-transform"
              aria-label="למעלה"
            >
              ▲
            </button>
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-4xl font-bold border-2 ${
                status === 'open'
                  ? 'bg-green-500/30 border-green-400 text-green-200'
                  : 'bg-gradient-to-b from-amber-800 to-amber-950 border-amber-500/60 text-amber-100'
              }`}
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {vals[i]}
            </div>
            <button
              onClick={() => turn(i, -1)}
              className="bg-white/10 border border-white/20 rounded-xl w-16 py-1 text-white text-xl font-bold active:scale-90 transition-transform"
              aria-label="למטה"
            >
              ▼
            </button>
          </div>
        ))}
      </div>

      {status === 'wrong' && (
        <p className="text-rose-300 font-bold mt-3 animate-pop">עוד לא... ספרו שוב בחדרים! 🔍</p>
      )}
      {status === 'open' && (
        <p className="text-green-300 text-xl font-bold mt-3 animate-bigpop">התיבה נפתחת!!! 🎉</p>
      )}

      <button
        onClick={tryOpen}
        className="mt-5 bg-gradient-to-br from-amber-400 to-orange-600 text-white text-xl font-bold rounded-2xl px-8 py-3 active:scale-95 transition-transform shadow-lg"
      >
        לפתוח! 🔓
      </button>
    </div>
  )
}
