import { useEffect, useRef, useState } from 'react'
import { sfx } from '../../audio.js'
import { say } from '../../speech.js'
import { shuffle } from '../../utils.js'

// מנעול הקשבה: שומעים מילה באנגלית ולוחצים על הציור הנכון.
// בלי אותיות ובלי קריאה - הכל באוזניים!
export default function ListenLock({ config, api }) {
  const [round, setRound] = useState(0)
  const [opts, setOpts] = useState(() => shuffle(config.options))
  const [status, setStatus] = useState('idle') // idle | wrong | roundwin | done
  const timers = useRef([])

  function later(fn, ms) {
    timers.current.push(setTimeout(fn, ms))
  }
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const word = config.rounds[round]

  // משמיעים את המילה בתחילת כל סיבוב
  useEffect(() => {
    later(() => say(word.en), 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round])

  function press(opt) {
    if (status === 'done' || status === 'roundwin') return
    if (opt.id === word.id) {
      api.learnWord?.(word.word || word.id)
      if (round + 1 === config.rounds.length) {
        setStatus('done')
        sfx.unlock()
        later(() => config.onSolved(api), 1000)
      } else {
        setStatus('roundwin')
        sfx.good()
        later(() => {
          setOpts(shuffle(config.options))
          setStatus('idle')
          setRound((r) => r + 1)
        }, 1100)
      }
    } else {
      setStatus('wrong')
      sfx.bad()
      api.mistake?.()
      later(() => {
        setStatus('idle')
        say(word.en)
      }, 900)
    }
  }

  return (
    <div className="text-center">
      <p className="text-white/85 font-bold mb-3 leading-relaxed">{config.text}</p>

      {/* התקדמות */}
      <div className="flex justify-center gap-2 mb-4 text-xl">
        {config.rounds.map((_, i) => (
          <span key={i} className={i < round || status === 'done' ? '' : 'opacity-30 grayscale'}>
            {i < round || status === 'done' ? '🔓' : '🔒'}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => { sfx.tap(); say(word.en) }}
          className="bg-gradient-to-br from-sky-400 to-blue-600 rounded-full w-20 h-20 text-4xl shadow-lg active:scale-90 transition-transform animate-glowpulse"
          aria-label="השמע"
        >
          🔊
        </button>
        {/* כוח האוזן הביונית של רובו - השמעה איטית */}
        {api.slow && (
          <button
            onClick={() => { sfx.tap(); say(word.en, 0.5) }}
            className="bg-gradient-to-br from-cyan-500 to-teal-700 rounded-full w-14 h-14 text-2xl shadow-lg active:scale-90 transition-transform"
            aria-label="לאט"
          >
            🐢
          </button>
        )}
      </div>
      <p className="text-white/60 font-bold text-sm mt-2 mb-4">{config.prompt || 'הקשיבו... על מה המדריך מדבר?'}</p>

      <div className={`grid ${opts.length > 4 ? 'grid-cols-3 max-w-sm' : 'grid-cols-2 max-w-xs'} gap-3 mx-auto ${status === 'wrong' ? 'animate-shake' : ''}`}>
        {opts.map((opt) => (
          <button
            key={opt.id}
            onClick={() => press(opt)}
            className="aspect-square rounded-3xl bg-white/10 border-2 border-white/20 text-6xl flex items-center justify-center shadow-lg active:scale-90 transition-transform"
            aria-label={opt.he}
          >
            {opt.emoji}
          </button>
        ))}
      </div>

      <p className="min-h-7 mt-3 font-bold">
        {status === 'wrong' && <span className="text-rose-300 animate-pop">כמעט! הקשיבו שוב 👂</span>}
        {status === 'roundwin' && <span className="text-green-300 animate-pop">נכון!!! 🎉</span>}
        {status === 'done' && <span className="text-green-300 text-xl animate-bigpop">המנעול נפתח!!! 🔓</span>}
      </p>
    </div>
  )
}
