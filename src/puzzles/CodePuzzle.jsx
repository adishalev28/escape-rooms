import { useState } from 'react'
import { shuffle } from '../utils.js'
import { sfx } from '../audio.js'
import HintBox from '../components/HintBox.jsx'

// חידת קוד: סופרים חפצים בתמונה ומקלידים את המספרים
export default function CodePuzzle({ puzzle, onSolved }) {
  const [scene] = useState(() => shuffle(puzzle.scene))
  const [entered, setEntered] = useState([])
  const [wrong, setWrong] = useState(false)
  const code = puzzle.digits.map((d) => d.count)

  function press(n) {
    if (entered.length >= code.length) return
    sfx.tap()
    const next = [...entered, n]
    setEntered(next)
    if (next.length === code.length) {
      if (next.every((v, i) => v === code[i])) {
        sfx.win()
        setTimeout(onSolved, 700)
      } else {
        sfx.bad()
        setWrong(true)
        setTimeout(() => { setEntered([]); setWrong(false) }, 900)
      }
    }
  }

  return (
    <div>
      {/* הסצנה שסופרים בה */}
      <div className="bg-white/10 backdrop-blur rounded-3xl p-4 mb-4 flex flex-wrap justify-center gap-3 text-4xl">
        {scene.map((e, i) => (
          <span key={i} className="animate-floaty" style={{ animationDelay: `${(i % 5) * 0.3}s` }}>{e}</span>
        ))}
      </div>

      {/* תצוגת הקוד */}
      <div className={`flex justify-center gap-3 mb-4 ${wrong ? 'animate-shake' : ''}`}>
        {puzzle.digits.map((d, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl">{d.emoji}</div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-bold mt-1 ${
              entered[i] !== undefined
                ? wrong ? 'bg-red-400/40 text-white' : 'bg-yellow-400/30 text-yellow-200'
                : 'bg-white/10 text-white/30'
            }`}>
              {entered[i] !== undefined ? entered[i] : '?'}
            </div>
          </div>
        ))}
      </div>

      {/* מקלדת */}
      <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
          <button
            key={n}
            onClick={() => press(n)}
            className="aspect-square rounded-2xl bg-white/15 backdrop-blur text-white text-2xl font-bold active:scale-90 transition-transform"
          >
            {n}
          </button>
        ))}
      </div>
      <HintBox hints={puzzle.hints} />
    </div>
  )
}
