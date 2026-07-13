import { useState } from 'react'
import { shuffle } from '../utils.js'
import { sfx } from '../audio.js'
import HintBox from '../components/HintBox.jsx'

// חידת חיפוש: מוצאים חפצים מוסתרים בסצנה - התבוננות והתמדה
export default function FindPuzzle({ puzzle, onSolved }) {
  const [items] = useState(() => shuffle(puzzle.items.map((it, i) => ({ ...it, key: i }))))
  const [searched, setSearched] = useState({}) // key -> 'empty' | 'found'
  const found = Object.values(searched).filter((v) => v === 'found').length

  function search(it) {
    if (searched[it.key]) return
    if (it.has) {
      sfx.star()
      const next = { ...searched, [it.key]: 'found' }
      setSearched(next)
      if (Object.values(next).filter((v) => v === 'found').length >= puzzle.targets) {
        setTimeout(onSolved, 900)
      }
    } else {
      sfx.tap()
      setSearched({ ...searched, [it.key]: 'empty' })
    }
  }

  return (
    <div>
      <div className="flex justify-center gap-2 mb-4 text-3xl">
        {Array.from({ length: puzzle.targets }, (_, i) => (
          <span key={i} className={i < found ? 'animate-bigpop' : 'opacity-25 grayscale'}>🗝️</span>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {items.map((it) => {
          const state = searched[it.key]
          return (
            <button
              key={it.key}
              onClick={() => search(it)}
              className={`relative aspect-square rounded-3xl text-4xl sm:text-5xl flex items-center justify-center transition-all active:scale-90 ${
                state === 'found'
                  ? 'bg-yellow-400/25 ring-2 ring-yellow-300'
                  : state === 'empty'
                    ? 'bg-white/5 opacity-45 anim-searched'
                    : 'bg-white/15 backdrop-blur'
              }`}
            >
              {state === 'found' ? <span className="anim-foundkey">🗝️</span> : it.emoji}
            </button>
          )
        })}
      </div>
      <HintBox hints={puzzle.hints} />
    </div>
  )
}
