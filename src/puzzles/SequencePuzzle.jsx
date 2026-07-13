import { useEffect, useRef, useState } from 'react'
import { rand } from '../utils.js'
import { sfx, note } from '../audio.js'
import HintBox from '../components/HintBox.jsx'

// חידת סימון: התוכי מנגן רצף - חוזרים עליו. זיכרון עבודה טהור!
export default function SequencePuzzle({ puzzle, onSolved }) {
  const [round, setRound] = useState(0) // אינדקס ב-puzzle.rounds
  const [seq, setSeq] = useState(() => Array.from({ length: puzzle.rounds[0] }, () => rand(puzzle.pads.length)))
  const [flashing, setFlashing] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [pos, setPos] = useState(0) // איפה השחקן ברצף
  const [status, setStatus] = useState('idle') // idle | your-turn | wrong | roundwin
  const timers = useRef([])

  function later(fn, ms) {
    timers.current.push(setTimeout(fn, ms))
  }
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // הבהוב עם כיבוי אחרי 450ms - כדי שגם תו שחוזר פעמיים ברצף יהבהב פעמיים
  function flash(padIdx) {
    setFlashing({ pad: padIdx, key: Date.now() })
    later(() => setFlashing(null), 450)
  }

  function playSeq(s = seq) {
    setPlaying(true)
    setStatus('idle')
    setPos(0)
    s.forEach((padIdx, i) => {
      later(() => {
        flash(padIdx)
        note(puzzle.pads[padIdx].tone)
      }, 600 + i * 750)
    })
    later(() => {
      setFlashing(null)
      setPlaying(false)
      setStatus('your-turn')
    }, 600 + s.length * 750)
  }

  // מנגן את הרצף בתחילת כל סיבוב
  useEffect(() => {
    playSeq()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round])

  function press(padIdx) {
    if (playing || status !== 'your-turn') return
    note(puzzle.pads[padIdx].tone)
    flash(padIdx)
    if (padIdx === seq[pos]) {
      const nextPos = pos + 1
      setPos(nextPos)
      if (nextPos === seq.length) {
        if (round + 1 === puzzle.rounds.length) {
          sfx.win()
          later(onSolved, 800)
        } else {
          sfx.good()
          setStatus('roundwin')
          later(() => {
            const nextLen = puzzle.rounds[round + 1]
            setSeq(Array.from({ length: nextLen }, () => rand(puzzle.pads.length)))
            setRound((r) => r + 1)
          }, 1300)
        }
      }
    } else {
      sfx.bad()
      setStatus('wrong')
      later(() => playSeq(), 1200)
    }
  }

  return (
    <div className="text-center">
      <div className="text-6xl mb-1 animate-floaty">🦜</div>
      <p className="text-white font-bold text-lg mb-3 min-h-7">
        {playing && 'התוכי מנגן... תקשיבו! 👂'}
        {status === 'your-turn' && `עכשיו אתם! (${pos}/${seq.length})`}
        {status === 'wrong' && 'אופס! התוכי מנגן שוב - תקשיבו טוב 🦜'}
        {status === 'roundwin' && 'יפה מאוד! עכשיו שיר ארוך יותר... 🎶'}
      </p>
      <div className="flex justify-center gap-2 mb-4 text-sm font-bold text-white/70">
        {puzzle.rounds.map((_, i) => (
          <span key={i} className={`rounded-full px-3 py-1 ${i < round ? 'bg-green-500/40 text-green-200' : i === round ? 'bg-yellow-400/30 text-yellow-200' : 'bg-white/10'}`}>
            שיר {i + 1}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
        {puzzle.pads.map((p, i) => (
          <button
            key={i}
            onClick={() => press(i)}
            className={`aspect-square rounded-3xl bg-gradient-to-br ${p.color} text-5xl flex items-center justify-center shadow-lg active:scale-90 transition-transform ${
              flashing?.pad === i ? 'anim-padflash' : ''
            } ${playing ? 'opacity-80' : ''}`}
          >
            {p.emoji}
          </button>
        ))}
      </div>
      <button
        onClick={() => { if (!playing) { sfx.tap(); playSeq() } }}
        className="mt-4 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white/80 font-bold active:scale-95 transition-transform"
      >
        🔁 נגן שוב
      </button>
      <HintBox hints={puzzle.hints} />
    </div>
  )
}
