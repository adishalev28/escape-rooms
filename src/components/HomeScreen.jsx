import { ROOMS } from '../data/rooms.js'
import { useGame } from '../store.jsx'
import { HEROES } from '../data/heroes.js'
import { MEDALS, MEDAL_ORDER } from '../data/medals.js'
import { WORDS } from '../data/words.js'
import Starfield from './Starfield.jsx'
import Brawler from './Brawler.jsx'
import { sfx } from '../audio.js'

function fmt(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

// מפת המסע: חדר פותח חדר, לוחמים ניצלים, מדליות נאספות
export default function HomeScreen({ onPlay, onAlbum }) {
  const { treasures, best, completed, rescued, medals, words } = useGame()
  const learnedCount = WORDS.filter((w) => words[w.id] > 0).length

  return (
    <div className="relative min-h-dvh bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 pb-10">
      <Starfield />
      <div className="relative max-w-2xl mx-auto px-4 pt-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white text-center drop-shadow-lg">🗺️ מסע הבריחה הגדול</h1>
        <p className="text-center text-white/90 text-xl font-bold mt-2">היי אריאל! הצל את הלוחמים וברח מכל החדרים! 🕵️</p>

        {/* אלבום המילים */}
        <button
          onClick={() => { sfx.tap(); onAlbum() }}
          className="mt-4 w-full bg-emerald-400/15 border border-emerald-300/40 rounded-3xl p-3 flex items-center justify-between active:scale-95 transition-transform"
        >
          <span className="text-white text-lg font-bold">📖 אלבום המילים שלי</span>
          <span className="text-emerald-200 font-bold">{learnedCount} / {WORDS.length} מילים ➡️</span>
        </button>

        {/* מפת המסע */}
        <div className="mt-5 space-y-1">
          {ROOMS.map((room, idx) => {
            const done = completed[room.id]
            const prevDone = idx === 0 || completed[ROOMS[idx - 1].id]
            const locked = room.comingSoon || !prevDone
            const roomMedals = medals[room.id] || []
            const hero = Object.values(HEROES).find((h) => h.trappedIn === room.id)

            return (
              <div key={room.id}>
                {idx > 0 && <div className="w-1.5 h-6 bg-white/15 rounded-full mx-auto" />}
                {locked ? (
                  <div className="bg-white/5 rounded-3xl p-4 flex items-center gap-4 opacity-55 border border-white/5">
                    <div className="text-5xl grayscale">{room.emoji}</div>
                    <div className="flex-1">
                      <div className="text-white/70 text-xl font-bold">{room.title}</div>
                      <div className="text-white/40 font-bold text-sm">
                        {room.comingSoon ? '🔜 בקרוב...' : '🔒 קודם לברוח מהחדר הקודם!'}
                      </div>
                    </div>
                    <div className="text-3xl">🔒</div>
                  </div>
                ) : (
                  <button
                    onClick={() => { sfx.tap(); onPlay(room) }}
                    className={`w-full bg-gradient-to-br ${room.bg} rounded-3xl p-4 flex items-center gap-3 shadow-lg shadow-black/40 active:scale-95 transition-transform border-2 ${done ? 'border-yellow-300/50' : 'border-white/15 animate-glowpulse'}`}
                  >
                    <div className="text-5xl animate-floaty">{room.emoji}</div>
                    <div className="flex-1 text-right">
                      <div className="text-white text-xl font-bold">{room.title}</div>
                      <div className="text-white/80 font-bold text-sm">
                        {done ? `ברחתם ${done} ${done === 1 ? 'פעם' : 'פעמים'} ✅` : '▶️ החדר הבא שלכם!'}
                        {best[room.id] && <span className="text-yellow-300"> · ⏱️ <span dir="ltr">{fmt(best[room.id])}</span></span>}
                      </div>
                      {/* מדליות החדר */}
                      <div className="flex gap-1 mt-1 justify-end" dir="ltr">
                        {MEDAL_ORDER.map((m) => (
                          <span key={m} className={`text-lg ${roomMedals.includes(m) ? '' : 'opacity-25 grayscale'}`} title={MEDALS[m].name}>
                            {MEDALS[m].icon}
                          </span>
                        ))}
                      </div>
                    </div>
                    {hero && (
                      <div className="text-center shrink-0">
                        <Brawler b={hero} className="w-12 h-12" dimmed={!rescued.includes(hero.id)} />
                        <div className={`text-xs font-bold ${rescued.includes(hero.id) ? 'text-emerald-300' : 'text-white/50'}`}>
                          {rescued.includes(hero.id) ? 'ניצל! ✅' : 'לכוד! 🆘'}
                        </div>
                      </div>
                    )}
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* הצוות שלי */}
        <h2 className="mt-7 text-2xl font-bold text-white drop-shadow">🦸 הצוות שלי ({rescued.length})</h2>
        {rescued.length === 0 ? (
          <p className="text-white/60 font-bold mt-2">הלוחמים מזירת האנגלית נלכדו בחדרים - הצילו אותם והם יעזרו לכם!</p>
        ) : (
          <div className="mt-3 grid grid-cols-3 gap-3">
            {rescued.map((id) => {
              const h = HEROES[id]
              if (!h) return null
              return (
                <div key={id} className="bg-indigo-400/10 backdrop-blur rounded-3xl p-3 text-center border border-indigo-300/30">
                  <Brawler b={h} className="w-16 h-16 mx-auto animate-floaty" />
                  <div className="text-white font-bold text-sm mt-1">{h.he}</div>
                  <div className="text-indigo-200/80 font-bold text-xs">{h.power.icon} {h.power.name}</div>
                </div>
              )
            })}
          </div>
        )}

        {/* מדף האוצרות */}
        {treasures.length > 0 && (
          <>
            <h2 className="mt-6 text-2xl font-bold text-white drop-shadow">🏆 האוצרות שלי ({treasures.length})</h2>
            <div className="mt-3 flex gap-3 flex-wrap">
              {treasures.map((t) => (
                <div key={t.roomId} className="bg-white/10 backdrop-blur rounded-3xl px-4 py-2 flex items-center gap-2 border border-yellow-300/30">
                  <span className="text-3xl animate-floaty">{t.emoji}</span>
                  <span className="text-white font-bold text-sm">{t.name}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <p className="text-center text-white/50 font-bold text-sm mt-8">
          💡 הכי כיף לברוח ביחד - שחקו עם אמא או אבא!
        </p>
        {/* מספר גרסה - כדי לדעת בשנייה אם הדפדפן מציג גרסה ישנה */}
        <p className="text-center text-white/25 font-bold text-xs mt-2" dir="ltr">v10</p>
      </div>
    </div>
  )
}
