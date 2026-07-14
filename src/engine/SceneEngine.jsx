import { useEffect, useRef, useState } from 'react'
import { useGame } from '../store.jsx'
import { sfx } from '../audio.js'
import { say, sayHe } from '../speech.js'
import Starfield from '../components/Starfield.jsx'
import Confetti from '../components/Confetti.jsx'
import HintBox from '../components/HintBox.jsx'
import Inventory from './Inventory.jsx'
import GuideBubble from './GuideBubble.jsx'
import ItemToast from './ItemToast.jsx'
import OverlayShell from './OverlayShell.jsx'
import SimonOverlay from './overlays/SimonOverlay.jsx'
import CodeWheel from './overlays/CodeWheel.jsx'
import ListenLock from './overlays/ListenLock.jsx'
import NoteView from './overlays/NoteView.jsx'

const OVERLAY_COMPS = { simon: SimonOverlay, code: CodeWheel, listen: ListenLock, note: NoteView }

function fmt(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

// מנוע point-and-click: סצנות SVG, נקודות לחיצה, מלאי, תוכי מדריך שמדבר אנגלית
export default function SceneEngine({ room, onExit }) {
  const { best, finishRoom } = useGame()
  const [stage, setStage] = useState('intro') // intro | scene | outro
  const [introPage, setIntroPage] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [finalTime, setFinalTime] = useState(null)
  const [sceneIdx, setSceneIdx] = useState(0)
  const [flags, setFlags] = useState({})
  const [inv, setInv] = useState([])
  const [selected, setSelected] = useState(null)
  const [overlay, setOverlay] = useState(null)
  const [bubble, setBubble] = useState(null)
  const [toast, setToast] = useState(null)
  const [fx, setFx] = useState(null)
  const secondsRef = useRef(0)
  const wonRef = useRef(false)
  const timers = useRef([])

  function later(fn, ms) {
    timers.current.push(setTimeout(fn, ms))
  }
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // סטופר עדין - לא מעניש, רק לשבירת שיאים
  useEffect(() => {
    if (stage !== 'scene') return
    const iv = setInterval(() => {
      setSeconds((s) => {
        secondsRef.current = s + 1
        return s + 1
      })
    }, 1000)
    return () => clearInterval(iv)
  }, [stage])

  // ה-API שקובץ החדר מקבל - כל הלוגיקה של החדר יושבת בנתונים
  const api = {
    flags,
    has: (f) => !!flags[f],
    set: (f) => setFlags((s) => (s[f] ? s : { ...s, [f]: true })),
    hasItem: (id) => inv.includes(id),
    addItem(id) {
      const it = room.items[id]
      setInv((v) => (v.includes(id) ? v : [...v, id]))
      sfx.pickup()
      say(it.en)
      setToast({ ...it, key: Date.now() })
      later(() => setToast(null), 1900)
    },
    removeItem: (id) => setInv((v) => v.filter((x) => x !== id)),
    deselect: () => setSelected(null),
    say,
    sayHe,
    sfx,
    parrot(en, he) {
      setBubble({ en, he, key: Date.now() })
      say(en)
    },
    // התוכי חוזר על ההוראה הנוכחית
    repeat() {
      const g = room.guide(flags)
      if (!g) return
      setBubble({ ...g, key: Date.now() })
      say(g.en)
    },
    pulse(id) {
      setFx({ id, key: Date.now() })
      later(() => setFx(null), 900)
    },
    openOverlay: (id) => setOverlay(id),
    closeOverlay: () => setOverlay(null),
    later,
  }

  // התוכי המדריך - הוראה באנגלית לפי ההתקדמות
  const guide = stage === 'scene' ? room.guide(flags) : null
  const guideKey = guide ? guide.en : null
  useEffect(() => {
    if (!guide) return
    setBubble({ ...guide, key: Date.now() })
    say(guide.en)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guideKey, stage])

  // ניצחון - הדלת נפתחה
  useEffect(() => {
    if (stage !== 'scene' || wonRef.current || !room.isWon(flags)) return
    wonRef.current = true
    later(() => {
      sfx.win()
      const t = secondsRef.current
      setFinalTime(t)
      finishRoom(room, t)
      setStage('outro')
    }, 1900)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flags, stage])

  const scene = room.scenes[sceneIdx]

  function nextIntro() {
    sfx.tap()
    if (introPage + 1 < room.intro.length) setIntroPage((p) => p + 1)
    else setStage('scene')
  }

  function moveScene(dir) {
    sfx.tap()
    setSelected(null)
    setSceneIdx((i) => (i + dir + room.scenes.length) % room.scenes.length)
  }

  function tapHotspot(h) {
    if (selected && h.onItem) {
      const used = h.onItem(selected, api)
      if (used) {
        setSelected(null)
        return
      }
    }
    if (selected && !h.onItem) {
      // חפץ לא מתאים כאן - נדנוד עדין, בלי עונש
      sfx.locked()
      api.pulse(h.id)
      return
    }
    if (h.onTap) h.onTap(api)
    else sfx.tap()
  }

  function tapItem(id) {
    const it = room.items[id]
    say(it.en)
    if (it.view) {
      setOverlay(it.view)
      return
    }
    sfx.tap()
    setSelected((s) => (s === id ? null : id))
  }

  const prevBest = best[room.id]
  const overlayCfg = overlay ? room.overlays[overlay] : null
  const OverlayComp = overlayCfg ? OVERLAY_COMPS[overlayCfg.type] : null
  const Art = scene.Art

  return (
    <div className={`relative min-h-dvh bg-gradient-to-b ${room.bg} pb-8`}>
      <Starfield />
      <div className="relative max-w-2xl mx-auto px-3 pt-3">
        <header className="flex items-center justify-between mb-2">
          <button
            onClick={() => { sfx.tap(); onExit() }}
            className="bg-white/15 backdrop-blur rounded-full px-4 py-2 text-white text-lg font-bold active:scale-90 transition-transform"
          >
            🏠 יציאה
          </button>
          <h1 className="text-lg sm:text-2xl font-bold text-white drop-shadow">{room.emoji} {room.title}</h1>
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

        {stage === 'scene' && (
          <div>
            <GuideBubble bubble={bubble} />

            {/* הסצנה - תמונה חיה עם נקודות לחיצה */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border-4 border-amber-950/70 mt-2">
              <svg viewBox="0 0 720 700" className="w-full block select-none">
                <Art flags={flags} fx={fx} />
                {scene.hotspots.map((h) => (
                  <rect
                    key={h.id}
                    x={h.area.x}
                    y={h.area.y}
                    width={h.area.w}
                    height={h.area.h}
                    fill="transparent"
                    className="cursor-pointer"
                    onClick={() => tapHotspot(h)}
                  />
                ))}
              </svg>

              {/* חצים לעבור בין המבטים */}
              <button
                onClick={() => moveScene(1)}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/45 backdrop-blur rounded-full w-11 h-11 text-white text-2xl font-bold active:scale-90 transition-transform"
                aria-label="ימינה"
              >
                ›
              </button>
              <button
                onClick={() => moveScene(-1)}
                className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/45 backdrop-blur rounded-full w-11 h-11 text-white text-2xl font-bold active:scale-90 transition-transform"
                aria-label="שמאלה"
              >
                ‹
              </button>

              {/* שם המבט */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/45 backdrop-blur rounded-full px-4 py-1 text-white/90 font-bold text-sm">
                {scene.name}
              </div>

              {/* נקודות המבטים */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {room.scenes.map((_, i) => (
                  <span key={i} className={`w-2 h-2 rounded-full ${i === sceneIdx ? 'bg-white' : 'bg-white/35'}`} />
                ))}
              </div>

              {toast && <ItemToast toast={toast} />}
            </div>

            <Inventory items={room.items} inv={inv} selected={selected} onTap={tapItem} />

            <div className="text-center">
              <HintBox key={guideKey} hints={room.hints(flags)} />
            </div>
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

      {overlayCfg && (
        <OverlayShell title={overlayCfg.title} onClose={() => { sfx.tap(); setOverlay(null) }}>
          <OverlayComp config={overlayCfg} api={api} />
        </OverlayShell>
      )}
    </div>
  )
}
