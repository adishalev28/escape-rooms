import { useState } from 'react'
import { shuffle } from '../utils.js'
import { sfx } from '../audio.js'
import HintBox from '../components/HintBox.jsx'

// חידת היגיון: בוחרים את התשובה הנכונה לחידה
export default function RiddlePuzzle({ puzzle, onSolved }) {
  const [options] = useState(() => shuffle(puzzle.options.map((o, i) => ({ ...o, correct: i === puzzle.answer }))))
  const [picked, setPicked] = useState(null)
  const [solved, setSolved] = useState(false)

  function choose(o, idx) {
    if (solved) return
    setPicked(idx)
    if (o.correct) {
      sfx.win()
      setSolved(true)
      setTimeout(onSolved, 900)
    } else {
      sfx.bad()
      setTimeout(() => setPicked(null), 800)
    }
  }

  return (
    <div className="text-center">
      <div className="text-6xl mb-4 animate-floaty">🐙</div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((o, idx) => (
          <button
            key={idx}
            onClick={() => choose(o, idx)}
            className={`rounded-3xl p-4 transition-all active:scale-95 backdrop-blur ${
              picked === idx
                ? o.correct ? 'bg-green-400/80 ring-4 ring-white' : 'bg-red-400/60 animate-shake'
                : 'bg-white/15'
            }`}
          >
            <div className="text-5xl">{o.emoji}</div>
            <div className="text-white font-bold text-lg mt-1">{o.label}</div>
          </button>
        ))}
      </div>
      <HintBox hints={puzzle.hints} />
    </div>
  )
}
