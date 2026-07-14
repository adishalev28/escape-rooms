import { ROOMS } from '../data/rooms.js'
import { useGame } from '../store.jsx'
import Starfield from './Starfield.jsx'
import { sfx } from '../audio.js'

function fmt(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function HomeScreen({ onPlay }) {
  const { treasures, best, completed } = useGame()

  return (
    <div className="relative min-h-dvh bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 pb-10">
      <Starfield />
      <div className="relative max-w-2xl mx-auto px-4 pt-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white text-center drop-shadow-lg">🔐 חדר הבריחה</h1>
        <p className="text-center text-white/90 text-xl font-bold mt-2">היי אריאל! מוכן לברוח? 🕵️</p>

        {/* החדרים */}
        <div className="mt-6 space-y-4">
          {ROOMS.map((room) => {
            const done = completed[room.id]
            if (room.comingSoon) {
              return (
                <div key={room.id} className="bg-white/5 rounded-3xl p-5 flex items-center gap-4 opacity-55 border border-white/5">
                  <div className="text-5xl grayscale">{room.emoji}</div>
                  <div className="flex-1">
                    <div className="text-white/70 text-xl font-bold">{room.title}</div>
                    <div className="text-white/40 font-bold text-sm">🔜 בקרוב...</div>
                  </div>
                  <div className="text-3xl">🔒</div>
                </div>
              )
            }
            return (
              <button
                key={room.id}
                onClick={() => { sfx.tap(); onPlay(room) }}
                className={`w-full bg-gradient-to-br ${room.bg} rounded-3xl p-5 flex items-center gap-4 shadow-lg shadow-black/40 active:scale-95 transition-transform border-2 ${done ? 'border-yellow-300/50' : 'border-white/15'}`}
              >
                <div className="text-6xl animate-floaty">{room.emoji}</div>
                <div className="flex-1 text-right">
                  <div className="text-white text-2xl font-bold">{room.title}</div>
                  <div className="text-white/80 font-bold text-sm">
                    {room.type === 'scene' ? 'הרפתקת חקירה 🔍' : `${room.puzzles.length} חידות`}
                    {done ? ` · ברחתם ${done} ${done === 1 ? 'פעם' : 'פעמים'} ✅` : ' · עוד לא ברחתם!'}
                  </div>
                  {best[room.id] && (
                    <div className="text-yellow-300 font-bold text-sm">
                      ⏱️ השיא שלכם: <span dir="ltr">{fmt(best[room.id])}</span> - אפשר לשבור?
                    </div>
                  )}
                </div>
                <div className="text-3xl">{done ? '🔁' : '▶️'}</div>
              </button>
            )
          })}
        </div>

        {/* מדף האוצרות */}
        <h2 className="mt-8 text-2xl font-bold text-white drop-shadow">🏆 האוצרות שלי ({treasures.length})</h2>
        {treasures.length === 0 ? (
          <p className="text-white/60 font-bold mt-2">ברחו מחדר כדי לזכות באוצר הראשון!</p>
        ) : (
          <div className="mt-3 grid grid-cols-3 gap-3">
            {treasures.map((t) => (
              <div key={t.roomId} className="bg-white/10 backdrop-blur rounded-3xl p-3 text-center border border-yellow-300/30">
                <div className="text-5xl animate-floaty">{t.emoji}</div>
                <div className="text-white font-bold text-sm mt-1">{t.name}</div>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-white/50 font-bold text-sm mt-8">
          💡 הכי כיף לברוח ביחד - שחקו עם אמא או אבא!
        </p>
      </div>
    </div>
  )
}
