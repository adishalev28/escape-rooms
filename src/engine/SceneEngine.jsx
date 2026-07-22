import { useEffect, useRef, useState } from 'react'
import { useGame } from '../store.jsx'
import { sfx } from '../audio.js'
import { say, sayHe } from '../speech.js'
import Starfield from '../components/Starfield.jsx'
import Confetti from '../components/Confetti.jsx'
import HintBox from '../components/HintBox.jsx'
import Brawler from '../components/Brawler.jsx'
import { HEROES } from '../data/heroes.js'
import { MEDALS } from '../data/medals.js'
import Inventory from './Inventory.jsx'
import GuideBubble from './GuideBubble.jsx'
import ItemToast from './ItemToast.jsx'
import OverlayShell from './OverlayShell.jsx'
import SimonOverlay from './overlays/SimonOverlay.jsx'
import CodeWheel from './overlays/CodeWheel.jsx'
import ListenLock from './overlays/ListenLock.jsx'
import NoteView from './overlays/NoteView.jsx'
import Keypad from './overlays/Keypad.jsx'

const OVERLAY_COMPS = { simon: SimonOverlay, code: CodeWheel, listen: ListenLock, note: NoteView, keypad: Keypad }
const POWER_COOLDOWN = 45000

function fmt(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

// מנוע point-and-click: סצנות SVG, נקודות לחיצה, מלאי, מדריך שמדבר אנגלית,
// כוחות של לוחמים שניצלו, מדליות ואלבום מילים
export default function SceneEngine({ room, onExit }) {
  const { best, rescued, finishRoom, learnWord } = useGame()
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
  const [sparkle, setSparkle] = useState(null) // כוח המצפן - נקודה זוהרת
  const [xray, setXray] = useState(false)      // כוח זוהר הירח
  const [powerCd, setPowerCd] = useState({})   // powerId -> timestamp שבו נגמר הקירור
  const [setup] = useState(() => (room.setup ? room.setup() : null)) // אקראיות למשחק חוזר
  const [earnedMedals, setEarnedMedals] = useState([])
  const [frozenUntil, setFrozenUntil] = useState(0) // כוח הקפאת הזמן של בולט
  const frozenRef = useRef(0)
  const secondsRef = useRef(0)
  const hintsRef = useRef(0)
  const mistakesRef = useRef(0)
  const wonRef = useRef(false)
  const timers = useRef([])
  // חום האש של בלייז: השעון קפוא כשחלון מיני-חידה פתוח
  const overlayRef = useRef(null)
  overlayRef.current = overlay
  const blazeHeat = rescued.includes('blaze') && room.rescue !== 'blaze'

  function later(fn, ms) {
    timers.current.push(setTimeout(fn, ms))
  }
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // סטופר עדין - לא מעניש, רק לשבירת שיאים
  useEffect(() => {
    if (stage !== 'scene') return
    const iv = setInterval(() => {
      if (Date.now() < frozenRef.current) return // הזמן קפוא!
      if (blazeHeat && overlayRef.current) return // חום האש - חידות בנחת
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
    setup,
    has: (f) => !!flags[f],
    set: (f) => setFlags((s) => (s[f] ? s : { ...s, [f]: true })),
    hasItem: (id) => inv.includes(id),
    addItem(id) {
      const it = room.items[id]
      setInv((v) => (v.includes(id) ? v : [...v, id]))
      sfx.pickup()
      say(it.en)
      if (it.word) learnWord(it.word)
      setToast({ ...it, key: Date.now() })
      later(() => setToast(null), 1900)
    },
    removeItem: (id) => setInv((v) => v.filter((x) => x !== id)),
    deselect: () => setSelected(null),
    say,
    sayHe,
    sfx,
    learnWord,
    mistake: () => { mistakesRef.current += 1 },
    // כוח האוזן הביונית - זמין בתוך מנעולי הקשבה אם רובו ניצל
    slow: rescued.includes('robo'),
    // כוכב הנינג'ה - מעלים תשובות שגויות במנעולי הקשבה
    ninja: rescued.includes('ninja') && room.rescue !== 'ninja',
    parrot(en, he) {
      setBubble({ en, he, key: Date.now() })
      say(en)
    },
    repeat() {
      const g = room.guide(flags, setup)
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

  // המדריך - הוראה באנגלית לפי ההתקדמות
  const guide = stage === 'scene' ? room.guide(flags, setup) : null
  const guideKey = guide ? guide.en : null
  useEffect(() => {
    if (!guide) return
    setBubble({ ...guide, key: Date.now() })
    say(guide.en)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guideKey, stage])

  // ניצחון - חישוב מדליות והצלת הלוחם
  useEffect(() => {
    if (stage !== 'scene' || wonRef.current || !room.isWon(flags)) return
    wonRef.current = true
    later(() => {
      sfx.win()
      const t = secondsRef.current
      const prevBest = best[room.id]
      const medals = ['escaped']
      // חוכמת האבן של רוקי: הרמז הראשון חינם
      const freeHints = rescued.includes('rocky') && room.rescue !== 'rocky' ? 1 : 0
      if (hintsRef.current <= freeHints) medals.push('sharp')
      // חנינה מלכותית של קינג: טעות הקשבה ראשונה נסלחת
      const forgiven = rescued.includes('king') && room.rescue !== 'king' ? 1 : 0
      if (mistakesRef.current <= forgiven) medals.push('ear')
      if (prevBest ? t < prevBest : room.parTime && t <= room.parTime) medals.push('fast')
      setFinalTime(t)
      setEarnedMedals(medals)
      finishRoom(room, t, medals, room.rescue || null)
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
    if (selected) {
      if (h.onItem) {
        const used = h.onItem(selected, api)
        setSelected(null)
        if (used) return
        // חפץ לא מתאים - נדנוד עדין, והלחיצה הבאה תעבוד רגיל
        sfx.locked()
        api.pulse(h.id)
        return
      }
      // אין כאן שימוש בחפצים - מבטלים את הבחירה וממשיכים ללחיצה רגילה,
      // כדי שדלת/חידה לא "ייתקעו" רק כי חפץ נשאר מסומן במלאי
      setSelected(null)
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
    // שילוב שני חפצים מהמלאי (חלקי כרטיס וכו')
    if (selected && selected !== id) {
      const combo = it.combineWith?.[selected] || room.items[selected].combineWith?.[id]
      if (combo) {
        setInv((v) => [...v.filter((x) => x !== id && x !== selected), combo])
        setSelected(null)
        const res = room.items[combo]
        sfx.pickup()
        say(res.en)
        setToast({ ...res, key: Date.now() })
        later(() => setToast(null), 1900)
        return
      }
    }
    sfx.tap()
    setSelected((s) => (s === id ? null : id))
  }

  // כוחות הלוחמים שניצלו
  const myHeroes = Object.values(HEROES).filter((h) => rescued.includes(h.id) && h.trappedIn !== room.id)
  function usePower(hero) {
    const now = Date.now()
    if ((powerCd[hero.power.id] || 0) > now) return
    sfx.star()
    // הקפאה נמשכת דקה - קירור ארוך יותר שלא יהיה זמן קפוא תמידי
    setPowerCd((c) => ({ ...c, [hero.power.id]: now + (hero.power.id === 'freeze' ? 150000 : POWER_COOLDOWN) }))
    if (hero.power.id === 'freeze') {
      frozenRef.current = now + 60000
      setFrozenUntil(now + 60000)
    }
    if (hero.power.id === 'reveal') {
      const focus = room.focus?.(flags, setup)
      if (!focus) return
      const idx = room.scenes.findIndex((s) => s.id === focus.scene)
      if (idx >= 0) setSceneIdx(idx)
      later(() => {
        setSparkle({ id: focus.hotspot, key: Date.now() })
        later(() => setSparkle(null), 3200)
      }, 350)
    }
    if (hero.power.id === 'xray') {
      setXray(true)
      later(() => setXray(false), 3200)
    }
    // לחישת הצל - הרמז הראשון בקול, בלי לפגוע במדליית "בלי רמזים"
    if (hero.power.id === 'whisper') {
      const hs = room.hints(flags, setup)
      if (hs?.length) sayHe(hs[0])
    }
  }

  const prevBest = best[room.id]
  const rawOverlayCfg = overlay ? room.overlays[overlay] : null
  const overlayCfg = typeof rawOverlayCfg === 'function' ? rawOverlayCfg(api) : rawOverlayCfg
  const OverlayComp = overlayCfg ? OVERLAY_COMPS[overlayCfg.type] : null
  const Art = scene.Art
  const rescueHero = room.rescue ? HEROES[room.rescue] : null

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
          <div className={`backdrop-blur rounded-full px-4 py-2 font-bold min-w-20 text-center ${Date.now() < frozenUntil ? 'bg-cyan-400/30 text-cyan-100' : 'bg-white/15 text-white/90'}`} dir="ltr">
            {Date.now() < frozenUntil ? '❄️' : '⏱️'} {fmt(seconds)}
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
            <GuideBubble bubble={bubble} emoji={room.guideEmoji} />

            {/* הסצנה - תמונה חיה עם נקודות לחיצה */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border-4 border-amber-950/70 mt-2">
              <svg viewBox="0 0 720 700" className="w-full block select-none">
                <Art flags={flags} fx={fx} setup={setup} />
                {scene.hotspots.map((h) => h.active && !h.active(api) ? null : (
                  <rect
                    key={h.id}
                    x={h.area.x}
                    y={h.area.y}
                    width={h.area.w}
                    height={h.area.h}
                    rx="18"
                    fill="transparent"
                    stroke={xray ? '#ffe066' : 'none'}
                    strokeWidth="5"
                    strokeDasharray="14 10"
                    className={`cursor-pointer ${xray ? 'anim-glowfade' : ''}`}
                    onClick={() => tapHotspot(h)}
                  />
                ))}
                {/* כוח המצפן - נקודה זוהרת על הצעד הבא */}
                {sparkle && (() => {
                  const h = scene.hotspots.find((x) => x.id === sparkle.id)
                  if (!h) return null
                  const cx = h.area.x + h.area.w / 2
                  const cy = h.area.y + h.area.h / 2
                  return (
                    <g key={sparkle.key} pointerEvents="none">
                      <circle cx={cx} cy={cy} r="52" fill="none" stroke="#ffe066" strokeWidth="7" className="anim-glowfade" />
                      <text x={cx} y={cy - 60} fontSize="40" textAnchor="middle">✨</text>
                    </g>
                  )
                })()}
              </svg>

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

              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/45 backdrop-blur rounded-full px-4 py-1 text-white/90 font-bold text-sm">
                {scene.name}
              </div>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {room.scenes.map((_, i) => (
                  <span key={i} className={`w-2 h-2 rounded-full ${i === sceneIdx ? 'bg-white' : 'bg-white/35'}`} />
                ))}
              </div>

              {toast && <ItemToast toast={toast} />}
            </div>

            {/* כוחות הצוות - לוחמים שניצלו בחדרים קודמים */}
            {myHeroes.length > 0 && (
              <div className="mt-2 flex gap-2 justify-center">
                {myHeroes.map((hero) => {
                  const onCd = (powerCd[hero.power.id] || 0) > Date.now()
                  // כוחות פסיביים + כוחות שחיים בתוך מנעולי הקשבה (צב/כוכב) - תג הסבר בלבד
                  if (hero.power.passive || hero.power.id === 'slow' || hero.power.id === 'shuriken') {
                    // כוח פסיבי - תג בלבד, לחיצה מסבירה
                    return (
                      <button
                        key={hero.id}
                        onClick={() => { sfx.star(); sayHe(hero.power.desc) }}
                        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-bold text-sm bg-yellow-400/15 border border-yellow-300/40 text-yellow-100 active:scale-95 transition-transform"
                        title={hero.power.desc}
                      >
                        <Brawler b={hero} className="w-7 h-7" />
                        {hero.power.icon} {hero.power.name}
                      </button>
                    )
                  }
                  return (
                    <button
                      key={hero.id}
                      onClick={() => usePower(hero)}
                      disabled={onCd}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-bold text-sm transition-all active:scale-95 ${
                        onCd ? 'bg-white/5 text-white/30 grayscale' : 'bg-indigo-400/20 border border-indigo-300/40 text-white'
                      }`}
                      title={hero.power.desc}
                    >
                      <Brawler b={hero} className="w-7 h-7" dimmed={onCd} />
                      {hero.power.icon} {hero.power.name}
                    </button>
                  )
                })}
              </div>
            )}

            <Inventory items={room.items} inv={inv} selected={selected} onTap={tapItem} />

            <div className="text-center">
              <HintBox key={guideKey} hints={room.hints(flags, setup)} onReveal={() => { hintsRef.current += 1 }} />
            </div>
          </div>
        )}

        {stage === 'outro' && (
          <div className="text-center mt-6">
            <Confetti />
            <div className="text-7xl anim-dooropen inline-block">🚪</div>
            <h2 className="text-4xl font-bold text-yellow-300 mt-2 animate-bigpop">ברחתם!!! 🎉</h2>
            <p className="text-white text-lg font-bold mt-2 max-w-md mx-auto">{room.outro}</p>

            {/* הלוחם שניצל מצטרף לצוות! */}
            {rescueHero && (
              <div className="mt-4 bg-indigo-400/15 border border-indigo-300/40 rounded-3xl p-4 max-w-sm mx-auto animate-bigpop">
                <div className="flex items-center justify-center gap-3">
                  <Brawler b={rescueHero} className="w-20 h-20 animate-floaty" />
                  <div className="text-right">
                    <p className="text-indigo-200 text-xl font-bold">{rescueHero.he} {rescueHero.female ? 'ניצלה' : 'ניצל'}! 🎊</p>
                    <p className="text-white/80 font-bold text-sm">{rescueHero.female ? 'היא מצטרפת' : 'הוא מצטרף'} לצוות שלכם!</p>
                    <p className="text-yellow-200 font-bold text-sm mt-1">{rescueHero.power.icon} {rescueHero.power.name}: {rescueHero.power.desc}</p>
                  </div>
                </div>
              </div>
            )}

            {/* מדליות הריצה הזו */}
            <div className="mt-3 flex justify-center gap-2">
              {earnedMedals.map((m) => (
                <div key={m} className="bg-yellow-400/15 border border-yellow-400/40 rounded-2xl px-3 py-2 animate-bigpop">
                  <div className="text-3xl">{MEDALS[m].icon}</div>
                  <div className="text-yellow-200 font-bold text-xs">{MEDALS[m].name}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 bg-yellow-400/15 border border-yellow-400/40 rounded-3xl p-4 max-w-sm mx-auto">
              <p className="text-yellow-300 font-bold">🏆 האוצר: <span className="text-2xl align-middle">{room.treasure.emoji}</span> {room.treasure.name}</p>
            </div>

            <div className="mt-3 text-white font-bold text-lg">
              ⏱️ הזמן שלכם: <span dir="ltr">{fmt(finalTime)}</span>
              {prevBest && finalTime < prevBest && <span className="text-yellow-300"> - שיא חדש! 🌟</span>}
            </div>

            <button
              onClick={() => { sfx.tap(); onExit() }}
              className="mt-5 bg-gradient-to-br from-indigo-400 to-purple-600 text-white text-2xl font-bold rounded-3xl px-10 py-4 active:scale-95 transition-transform shadow-lg"
            >
              חזרה למפה 🗺️
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
