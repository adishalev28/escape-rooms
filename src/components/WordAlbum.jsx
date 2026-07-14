import { useGame } from '../store.jsx'
import { WORDS, WORD_PACKS } from '../data/words.js'
import { say } from '../speech.js'
import { sfx } from '../audio.js'
import Starfield from './Starfield.jsx'

// אלבום המילים: כל מילה באנגלית שאריאל שמע ופעל לפיה - נאספת.
// לחיצה על מילה שנאספה משמיעה אותה שוב.
export default function WordAlbum({ onBack }) {
  const { words } = useGame()
  const learned = WORDS.filter((w) => words[w.id] > 0).length

  return (
    <div className="relative min-h-dvh bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 pb-10">
      <Starfield />
      <div className="relative max-w-2xl mx-auto px-4 pt-6">
        <header className="flex items-center justify-between mb-4">
          <button
            onClick={() => { sfx.tap(); onBack() }}
            className="bg-white/15 backdrop-blur rounded-full px-4 py-2 text-white text-lg font-bold active:scale-90 transition-transform"
          >
            🗺️ למפה
          </button>
          <h1 className="text-2xl font-bold text-white drop-shadow">📖 אלבום המילים</h1>
          <div className="bg-emerald-400/20 rounded-full px-4 py-2 text-emerald-200 font-bold" dir="ltr">
            {learned}/{WORDS.length}
          </div>
        </header>

        <p className="text-white/70 font-bold text-center text-sm mb-4">
          כל מילה שהבנתם באוזניים במסע נאספת לכאן. לחצו על מילה כדי לשמוע אותה שוב! 🔊
        </p>

        {WORD_PACKS.map((pack) => {
          const packWords = WORDS.filter((w) => w.pack === pack.id)
          const packLearned = packWords.filter((w) => words[w.id] > 0).length
          return (
            <div key={pack.id} className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">
                {pack.emoji} {pack.name}
                <span className="text-white/50 text-sm"> · {packLearned}/{packWords.length}</span>
                {packLearned === packWords.length && <span className="text-yellow-300"> 🌟 הושלם!</span>}
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {packWords.map((w) => {
                  const got = words[w.id] > 0
                  return (
                    <button
                      key={w.id}
                      onClick={() => { if (got) say(w.en); else sfx.locked() }}
                      className={`rounded-2xl p-2.5 text-center border transition-transform active:scale-90 ${
                        got
                          ? 'bg-emerald-400/15 border-emerald-300/40'
                          : 'bg-white/5 border-white/10 opacity-45'
                      }`}
                    >
                      <div className={`text-3xl ${got ? '' : 'grayscale'}`}>{w.emoji}</div>
                      {got ? (
                        <>
                          <div className="text-white font-bold text-sm" dir="ltr">{w.en}</div>
                          <div className="text-emerald-200/70 font-bold text-xs">{w.he}</div>
                        </>
                      ) : (
                        <div className="text-white/40 font-bold text-lg">?</div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
