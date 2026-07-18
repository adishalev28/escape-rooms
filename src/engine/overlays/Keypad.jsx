import { useEffect, useRef, useState } from 'react'
import { sfx } from '../../audio.js'
import { say } from '../../speech.js'

const DIGIT_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
const DIGIT_IDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

// מנעול מספרים: המדריך אומר את הקוד באנגלית - מקישים את הספרות הנכונות.
// הקשבה למספרים בלי אף ספרה כתובה מראש!
export default function Keypad({ config, api }) {
  const code = config.code // מערך ספרות, למשל [3,1,4]
  const [entered, setEntered] = useState([])
  const [status, setStatus] = useState('idle') // idle | wrong | done
  const timers = useRef([])

  function later(fn, ms) {
    timers.current.push(setTimeout(fn, ms))
  }
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // מרווח גדול בין מספר למספר - כל say מבטל את הקודם, ובקולות איטיים
  // מרווח צפוף גורם לחצאי מילים ("Se--Ni--Se")
  function speakCode() {
    code.forEach((d, i) => later(() => say(DIGIT_WORDS[d], 0.75), 400 + i * 1800))
  }

  // המדריך אומר את הקוד כשנפתח החלון
  useEffect(() => {
    speakCode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function press(d) {
    // בלי הקראת הספרה שנלחצה - ילדים מבינים את ההד כהוראה הבאה ומתבלבלים
    if (status === 'done' || status === 'wrong') return
    sfx.tap()
    const next = [...entered, d]
    if (code[next.length - 1] !== d) {
      setStatus('wrong')
      sfx.bad()
      api.mistake?.()
      setEntered([])
      later(() => {
        setStatus('idle')
        speakCode()
      }, 1300)
      return
    }
    setEntered(next)
    if (next.length === code.length) {
      setStatus('done')
      sfx.unlock()
      code.forEach((d2) => api.learnWord?.(DIGIT_IDS[d2]))
      later(() => config.onSolved(api), 1000)
    }
  }

  return (
    <div className="text-center">
      <p className="text-white/85 font-bold mb-3 leading-relaxed">{config.text}</p>

      {/* חיוויים - כמה ספרות הוקשו */}
      <div className="flex justify-center gap-2 mb-3" dir="ltr">
        {code.map((_, i) => (
          <div
            key={i}
            className={`w-10 h-12 rounded-xl border-2 flex items-center justify-center text-2xl font-bold ${
              i < entered.length
                ? 'bg-green-500/25 border-green-400 text-green-200'
                : 'bg-black/40 border-white/20 text-white/30'
            }`}
          >
            {i < entered.length ? entered[i] : '•'}
          </div>
        ))}
      </div>

      <button
        onClick={() => { sfx.tap(); speakCode() }}
        className="bg-gradient-to-br from-sky-400 to-blue-600 rounded-full px-5 py-2 text-white font-bold shadow-lg active:scale-90 transition-transform animate-glowpulse mb-4"
      >
        🔊 תגיד שוב!
      </button>

      <div className={`grid grid-cols-3 gap-2 max-w-56 mx-auto ${status === 'wrong' ? 'animate-shake' : ''}`} dir="ltr">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d) => (
          <button
            key={d}
            onClick={() => press(d)}
            className={`h-14 rounded-2xl bg-white/10 border-2 border-white/20 text-white text-2xl font-bold shadow active:scale-90 transition-transform ${d === 0 ? 'col-start-2' : ''}`}
          >
            {d}
          </button>
        ))}
      </div>

      <p className="min-h-7 mt-3 font-bold">
        {status === 'wrong' && <span className="text-rose-300 animate-pop">אופס! הקשיבו שוב 👂</span>}
        {status === 'done' && <span className="text-green-300 text-xl animate-bigpop">הקוד נכון!!! 🔓</span>}
      </p>
    </div>
  )
}
