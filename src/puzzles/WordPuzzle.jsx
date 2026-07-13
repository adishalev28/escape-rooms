import { useState } from 'react'
import { shuffle } from '../utils.js'
import { sfx } from '../audio.js'
import { say } from '../speech.js'
import HintBox from '../components/HintBox.jsx'

// חידת מילה: מאייתים מילה באנגלית מאותיות - החיבור לזירת האנגלית!
export default function WordPuzzle({ puzzle, onSolved }) {
  const answer = puzzle.answer.toUpperCase()
  const [tiles] = useState(() =>
    shuffle([...answer + (puzzle.extraLetters || '').toUpperCase()].map((ch, i) => ({ ch, key: i })))
  )
  const [used, setUsed] = useState([]) // מפתחות האריחים שנבחרו, לפי הסדר
  const [wrong, setWrong] = useState(false)
  const word = used.map((k) => tiles.find((t) => t.key === k).ch).join('')

  function pressTile(t) {
    if (used.includes(t.key) || used.length >= answer.length || wrong) return
    sfx.tap()
    const next = [...used, t.key]
    setUsed(next)
    const w = next.map((k) => tiles.find((x) => x.key === k).ch).join('')
    if (w.length === answer.length) {
      if (w === answer) {
        sfx.win()
        say(answer.toLowerCase())
        setTimeout(onSolved, 1000)
      } else {
        sfx.bad()
        setWrong(true)
        setTimeout(() => { setUsed([]); setWrong(false) }, 900)
      }
    }
  }

  function backspace() {
    if (!used.length || wrong) return
    sfx.tap()
    setUsed(used.slice(0, -1))
  }

  return (
    <div className="text-center">
      <div className="text-7xl mb-3 animate-floaty">{puzzle.emoji}</div>

      {/* חריצי המילה */}
      <div className={`flex justify-center gap-2 mb-4 ${wrong ? 'animate-shake' : ''}`} dir="ltr">
        {[...answer].map((_, i) => (
          <div key={i} className={`w-12 h-14 rounded-2xl flex items-center justify-center text-3xl font-bold ${
            word[i] ? (wrong ? 'bg-red-400/40 text-white' : 'bg-yellow-400/30 text-yellow-200') : 'bg-white/10 text-white/25'
          }`}>
            {word[i] || '_'}
          </div>
        ))}
      </div>

      {/* אריחי אותיות */}
      <div className="flex flex-wrap justify-center gap-2" dir="ltr">
        {tiles.map((t) => (
          <button
            key={t.key}
            onClick={() => pressTile(t)}
            className={`w-14 h-14 rounded-2xl text-2xl font-bold transition-all active:scale-90 ${
              used.includes(t.key) ? 'bg-white/5 text-white/20' : 'bg-white/20 backdrop-blur text-white'
            }`}
          >
            {t.ch}
          </button>
        ))}
      </div>

      <button
        onClick={backspace}
        className="mt-4 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white/80 font-bold active:scale-95 transition-transform"
      >
        ⌫ מחק אות
      </button>
      <HintBox hints={puzzle.hints} />
    </div>
  )
}
