import { useEffect, useRef, useState } from 'react'
import { useGame } from '../store.jsx'
import { sfx } from '../audio.js'
import { sayHe } from '../speech.js'
import Starfield from './Starfield.jsx'
import Confetti from './Confetti.jsx'
import FindPuzzle from '../puzzles/FindPuzzle.jsx'
import CodePuzzle from '../puzzles/CodePuzzle.jsx'
import SequencePuzzle from '../puzzles/SequencePuzzle.jsx'
import WordPuzzle from '../puzzles/WordPuzzle.jsx'
import RiddlePuzzle from '../puzzles/RiddlePuzzle.jsx'

const PUZZLE_COMPS = {
  find: FindPuzzle,
  code: CodePuzzle,
  sequence: SequencePuzzle,
  word: WordPuzzle,
  riddle: RiddlePuzzle,
}

function fmt(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

// המנוע: מריץ חדר שלם - פתיחה → חידות עם גשרי סיפור → בריחה
export default function RoomPlayer({ room, onExit }) {
  const { best, finishRoom } = useGame()
  const [stage, setStage] = useState('intro') // intro | puzzle | bridge | outro
  const [introPage, setIntroPage] = useState(0)
  const [pIndex, setPIndex] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [finalTime, setFinalTime] = useState(null)
  const running = useRef(false)

  // סטופר עדין - רץ מהחידה הראשונה עד הבריחה (לא מעניש, רק לשבירת שיאים)
  useEffect(() => {
    running.current = stage === 'puzzle' || stage === 'bridge'
    if (!running.current) return
    const iv = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(iv)
  }, [stage])

  const puzzle = room.puzzles[pIndex]

  function nextIntro() {
    sfx.tap()
    if (introPage + 1 < room.intro.length) setIntroPage((p) => p + 1)
    else setStage('puzzle')
  }

  function solved() {
    setStage('bridge')
  }

  function nextPuzzle() {
    sfx.tap()
    if (pIndex + 1 < room.puzzles.length) {
      setPIndex((i) => i + 1)
      setStage('puzzle')
    } else {
      sfx.win()
      setFinalTime(seconds)
      finishRoom(room, seconds)
      setStage('outro')
    }
  }

  const prevBest = best[room.id]

  return (
    <div className={`relative min-h-dvh bg-gradient-to-b ${room.bg} pb-10`}>
      <Starfield />
      <div className="relative max-w-2xl mx-auto px-4 pt-4">
        <header className="flex items-center justify-between mb-4">
          <button
            onClick={() => { sfx.tap(); onExit() }}
            className="bg-white/15 backdrop-blur rounded-full px-4 py-2 text-white text-lg font-bold active:scale-90 transition-transform"
          >
            🏠 יציאה
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow">{room.emoji} {room.title}</h1>
          <div className="bg-white/15 backdrop-blur rounded-full px-4 py-2 text-white/90 font-bold min-w-20 text-center" dir="ltr">
            ⏱️ {fmt(seconds)}
          </div>
        </header>

        {stage === 'intro' && (
          <div className="text-center mt-10">
            <div className="text-8xl animate-floaty">{room.emoji}</div>
            <div className="bg-white/15 backdrop-blur rounded-3xl p-6 mt-6 max-w-md mx-auto">
              <p className="text-white text-2xl font-bold leading-relaxed animate-pop" key={introPage}>
                {room.intro[introPage]}
              </p>
              <button
                onClick={() => sayHe(room.intro[introPage])}
                className="mt-3 bg-white/15 rounded-full px-4 py-1.5 text-lg active:scale-90 transition-transform"
                aria-label="הקרא"
              >
                🔊
              </button>
            </div>
            <button
              onClick={nextIntro}
              className="mt-6 bg-gradient-to-br from-amber-400 to-orange-600 text-white text-2xl font-bold rounded-3xl px-10 py-4 active:scale-95 transition-transform shadow-lg"
            >
              {introPage + 1 < room.intro.length ? 'ממשיכים ➡️' : 'מתחילים! 🔓'}
            </button>
          </div>
        )}

        {stage === 'puzzle' && (() => {
          const Comp = PUZZLE_COMPS[puzzle.type]
          return (
            <div>
              {/* התקדמות מנעולים */}
              <div className="flex justify-center gap-2 mb-3 text-2xl">
                {room.puzzles.map((_, i) => (
                  <span key={i} className={i < pIndex ? '' : 'opacity-30 grayscale'}>
                    {i < pIndex ? '🔓' : '🔒'}
                  </span>
                ))}
              </div>
              <div className="bg-black/25 backdrop-blur rounded-3xl p-4 mb-4 text-center">
                <h2 className="text-yellow-300 text-2xl font-bold">{puzzle.title}</h2>
                <p className="text-white/90 font-bold mt-1 leading-relaxed">
                  {puzzle.text}
                  <button
                    onClick={() => sayHe(puzzle.text)}
                    className="mr-2 bg-white/15 rounded-full px-2 py-0.5 text-sm active:scale-90 transition-transform"
                    aria-label="הקרא"
                  >
                    🔊
                  </button>
                </p>
              </div>
              <Comp key={pIndex} puzzle={puzzle} onSolved={solved} />
            </div>
          )
        })()}

        {stage === 'bridge' && (
          <div className="text-center mt-14">
            <Confetti />
            <div className="text-7xl animate-bigpop">🔓</div>
            <div className="bg-white/15 backdrop-blur rounded-3xl p-6 mt-5 max-w-md mx-auto">
              <p className="text-white text-2xl font-bold leading-relaxed">{puzzle.success}</p>
            </div>
            <button
              onClick={nextPuzzle}
              className="mt-6 bg-gradient-to-br from-green-400 to-emerald-600 text-white text-2xl font-bold rounded-3xl px-10 py-4 active:scale-95 transition-transform shadow-lg animate-bigpop"
            >
              {pIndex + 1 < room.puzzles.length ? 'לחידה הבאה ➡️' : 'לדלת! 🚪'}
            </button>
          </div>
        )}

        {stage === 'outro' && (
          <div className="text-center mt-10">
            <Confetti />
            <div className="text-8xl anim-dooropen inline-block">🚪</div>
            <h2 className="text-4xl font-bold text-yellow-300 mt-3 animate-bigpop">ברחתם!!! 🎉</h2>
            <p className="text-white text-xl font-bold mt-2 max-w-md mx-auto">{room.outro}</p>

            <div className="mt-5 bg-yellow-400/15 border border-yellow-400/40 rounded-3xl p-5 max-w-sm mx-auto animate-bigpop">
              <p className="text-yellow-300 text-lg font-bold">🏆 האוצר שלכם:</p>
              <div className="text-7xl mt-2 animate-floaty">{room.treasure.emoji}</div>
              <p className="text-white text-2xl font-bold mt-1">{room.treasure.name}</p>
              <p className="text-white/70 font-bold">{room.treasure.desc}</p>
            </div>

            <div className="mt-4 text-white font-bold text-lg">
              ⏱️ הזמן שלכם: <span dir="ltr">{fmt(finalTime)}</span>
              {prevBest && finalTime < prevBest && <span className="text-yellow-300"> - שיא חדש! 🌟</span>}
            </div>

            <button
              onClick={() => { sfx.tap(); onExit() }}
              className="mt-6 bg-gradient-to-br from-indigo-400 to-purple-600 text-white text-2xl font-bold rounded-3xl px-10 py-4 active:scale-95 transition-transform shadow-lg"
            >
              הביתה 🏠
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
