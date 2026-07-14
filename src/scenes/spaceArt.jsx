// האמנות של תחנת החלל - 3 מבטים: חדר הפיקוד, חדר המנועים, תא היציאה
// setup = האקראיות של המשחק הזה (כמה כוכבי לכת/שביטים/חייזרים)
import Brawler from '../components/Brawler.jsx'
import { HEROES } from '../data/heroes.js'

const hit = (fx, id, anim) => (fx?.id === id ? `tb ${anim}` : '')

// מאגרי מיקומים - חותכים לפי הספירה האקראית
const PLANET_POOL = [
  { x: 240, y: 170, r: 34, c: '#e07a3f', ring: true },
  { x: 420, y: 130, r: 24, c: '#4fc3f7' },
  { x: 510, y: 230, r: 29, c: '#ab47bc' },
  { x: 320, y: 260, r: 19, c: '#8bc34a' },
]
const COMET_POOL = [
  { x: 95, y: 130 }, { x: 175, y: 185 }, { x: 120, y: 235 }, { x: 200, y: 110 }, { x: 155, y: 285 },
]
const ALIEN_POOL = [
  { x: 105, y: 225 }, { x: 160, y: 255 }, { x: 130, y: 285 }, { x: 185, y: 215 }, { x: 90, y: 275 }, { x: 150, y: 320 },
]

// קיר מתכת + רצפה - הבסיס של התחנה
function MetalWalls({ p, power }) {
  return (
    <g>
      <rect x="0" y="0" width="720" height="520" fill={`url(#${p}Metal)`} />
      {[130, 260, 390].map((y) => (
        <line key={y} x1="0" y1={y} x2="720" y2={y} stroke="#1b2430" strokeWidth="5" opacity="0.8" />
      ))}
      {[120, 300, 480, 660].map((x) => (
        <g key={x}>
          <circle cx={x} cy="70" r="4" fill="#101820" />
          <circle cx={x - 60} cy="200" r="4" fill="#101820" />
          <circle cx={x} cy="330" r="4" fill="#101820" />
        </g>
      ))}
      {/* פס תאורה - אדום בלי חשמל, טורקיז עם חשמל */}
      <rect x="0" y="440" width="720" height="14" fill={power ? '#22d3ee' : '#7f1d1d'} opacity="0.85" className={power ? '' : 'anim-flicker'} />
      <rect x="0" y="440" width="720" height="14" fill={power ? '#22d3ee' : '#ef4444'} opacity="0.35" filter="blur(6px)" />
      <rect x="0" y="520" width="720" height="180" fill={`url(#${p}Floor)`} />
      <rect x="0" y="516" width="720" height="8" fill="#101820" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={i * 145 - 20} y1="700" x2={60 + i * 122} y2="520" stroke="#1b2430" strokeWidth="3" opacity="0.5" />
      ))}
    </g>
  )
}

function SpaceDefs({ p }) {
  return (
    <defs>
      <linearGradient id={`${p}Metal`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3a4a5e" />
        <stop offset="1" stopColor="#242f3d" />
      </linearGradient>
      <linearGradient id={`${p}Floor`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#46586e" />
        <stop offset="1" stopColor="#2a3542" />
      </linearGradient>
      <linearGradient id={`${p}Space`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0a1030" />
        <stop offset="1" stopColor="#1a1147" />
      </linearGradient>
      <radialGradient id={`${p}Vin`}>
        <stop offset="0.55" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.45" />
      </radialGradient>
    </defs>
  )
}

function SpaceWindowStars({ seed = 0 }) {
  const pts = [[60, 60], [130, 40], [210, 90], [290, 50], [360, 95], [430, 45], [500, 80], [90, 110], [250, 130], [400, 140]]
  return (
    <g>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x + seed} cy={y} r={i % 3 === 0 ? 2.5 : 1.6} fill="#e8f4ff" opacity="0.8"
          style={{ animation: `twinkle ${2 + (i % 3)}s ease-in-out ${i * 0.3}s infinite` }} />
      ))}
    </g>
  )
}

/* ============ מבט 1: חדר הפיקוד ============ */
export function ControlScene({ flags, fx, setup }) {
  return (
    <g>
      <SpaceDefs p="sc" />
      <MetalWalls p="sc" power={flags.power} />

      {/* החלון הגדול - תריס סגור בלי חשמל, חלל עם כוכבי לכת עם חשמל */}
      <g className={hit(fx, 'window', 'anim-wiggle')}>
        <rect x="130" y="70" width="460" height="290" rx="26" fill="#101820" />
        {!flags.power && (
          <g>
            <rect x="142" y="82" width="436" height="266" rx="18" fill="#2a3542" />
            {[120, 158, 196, 234, 272, 310].map((y) => (
              <line key={y} x1="146" y1={y} x2="574" y2={y} stroke="#1b2430" strokeWidth="6" />
            ))}
            <text x="360" y="230" fontSize="26" textAnchor="middle" fill="#64748b" fontWeight="bold">⚠️</text>
          </g>
        )}
        {flags.power && (
          <g className="animate-pop">
            <rect x="142" y="82" width="436" height="266" rx="18" fill="url(#scSpace)" />
            <g transform="translate(142 82)">
              <SpaceWindowStars />
              {PLANET_POOL.slice(0, setup.planets).map((pl, i) => (
                <g key={i}>
                  <circle cx={pl.x - 142} cy={pl.y - 82 + 60} r={pl.r} fill={pl.c} stroke="#00000044" strokeWidth="3" />
                  <circle cx={pl.x - 142 - pl.r / 3} cy={pl.y - 82 + 60 - pl.r / 3} r={pl.r / 3.2} fill="#ffffff33" />
                  {pl.ring && <ellipse cx={pl.x - 142} cy={pl.y - 82 + 60} rx={pl.r + 16} ry={7} fill="none" stroke="#ffd54a" strokeWidth="4" opacity="0.8" />}
                </g>
              ))}
            </g>
          </g>
        )}
      </g>

      {/* הקונסולה עם המסך, גלגלי הקוד והמגירה */}
      <g className={hit(fx, 'console', 'anim-wiggle')}>
        <rect x="150" y="470" width="420" height="60" rx="10" fill="#46586e" stroke="#101820" strokeWidth="4" />
        <rect x="180" y="380" width="360" height="100" rx="12" fill="#101820" stroke="#0a0f16" strokeWidth="4" />
        {!flags.power && <rect x="192" y="392" width="336" height="76" rx="8" fill="#1b2430" />}
        {flags.power && (
          <g>
            <rect x="192" y="392" width="336" height="76" rx="8" fill="#0e2a38" />
            {!flags.consoleDone ? (
              <text x="360" y="440" fontSize="30" textAnchor="middle" fill="#22d3ee" fontWeight="bold">🪐? ☄️? 👽?</text>
            ) : (
              <text x="360" y="442" fontSize="34" textAnchor="middle" fill="#4ade80" fontWeight="bold">✓ ✓ ✓</text>
            )}
          </g>
        )}
      </g>

      {/* המגירה - המברג בפנים */}
      <g className={hit(fx, 'drawer', 'anim-wiggle')}>
        <rect x="290" y="540" width="140" height="44" rx="8" fill={flags.gotScrewdriver ? '#2a3542' : '#46586e'} stroke="#101820" strokeWidth="4" />
        <rect x="335" y="556" width="50" height="10" rx="5" fill="#101820" />
        {!flags.gotScrewdriver && (
          <rect x="330" y="548" width="60" height="6" rx="3" fill="#f59e0b" style={{ animation: 'twinkle 1.6s ease-in-out infinite' }} />
        )}
      </g>

      {/* הרובוט המרחף - המדריך */}
      <g className={`anim-bob ${fx?.id === 'drone' ? 'tb anim-wiggle' : ''}`}>
        <line x1="632" y1="150" x2="632" y2="128" stroke="#94a3b8" strokeWidth="4" />
        <circle cx="632" cy="122" r="6" fill="#ef4444" className="anim-flicker" />
        <rect x="592" y="150" width="80" height="66" rx="20" fill="#94a3b8" stroke="#475569" strokeWidth="4" />
        <rect x="604" y="164" width="56" height="28" rx="12" fill="#0e2a38" />
        <circle cx="632" cy="178" r="9" fill="#22d3ee" className="anim-flicker" />
        <circle cx="612" cy="226" r="7" fill="#475569" />
        <circle cx="652" cy="226" r="7" fill="#475569" />
      </g>

      {/* כיסא הטייס */}
      <g>
        <rect x="52" y="450" width="110" height="26" rx="10" fill="#334155" stroke="#101820" strokeWidth="3" />
        <rect x="60" y="330" width="94" height="130" rx="16" fill="#475569" stroke="#101820" strokeWidth="4" />
        <rect x="72" y="345" width="70" height="60" rx="10" fill="#334155" />
        <rect x="80" y="476" width="16" height="90" fill="#334155" />
        <rect x="118" y="476" width="16" height="90" fill="#334155" />
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#scVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 2: חדר המנועים ============ */
export function EngineScene({ flags, fx, setup }) {
  const COLORS = [['#ef4444', '#7f1d1d'], ['#3b82f6', '#1e3a8a'], ['#22c55e', '#14532d'], ['#eab308', '#713f12']]
  return (
    <g>
      <SpaceDefs p="se" />
      <MetalWalls p="se" power={flags.power} />

      {/* צוהר עם שביטים - לספור! */}
      <g className={hit(fx, 'comets', 'anim-wiggle')}>
        <circle cx="160" cy="185" r="105" fill="#101820" />
        <circle cx="160" cy="185" r="88" fill="url(#seSpace)" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={a} cx={160 + 97 * Math.cos((a * Math.PI) / 180)} cy={185 + 97 * Math.sin((a * Math.PI) / 180)} r="5" fill="#46586e" />
        ))}
        {COMET_POOL.slice(0, setup.comets).map((c, i) => (
          <g key={i} className={i % 2 ? 'anim-swim' : 'anim-swim-b'}>
            <line x1={c.x - 26} y1={c.y + 12} x2={c.x} y2={c.y} stroke="#7dd3fc" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
            <circle cx={c.x} cy={c.y} r="8" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="3" />
          </g>
        ))}
      </g>

      {/* הלוקר עם מנעול הצבעים */}
      <g className={hit(fx, 'locker', 'anim-wiggle')}>
        <rect x="60" y="330" width="150" height="290" rx="12" fill="#3f5068" stroke="#101820" strokeWidth="5" />
        {!flags.lockerOpen && (
          <g>
            <line x1="135" y1="335" x2="135" y2="615" stroke="#101820" strokeWidth="4" />
            {COLORS.map(([c, dark], i) => (
              <circle key={i} cx={102 + (i % 2) * 66} cy={420 + Math.floor(i / 2) * 66} r="20" fill={c} stroke={dark} strokeWidth="5" />
            ))}
            <rect x="88" y="530" width="94" height="26" rx="8" fill="#101820" opacity="0.6" />
          </g>
        )}
        {flags.lockerOpen && (
          <g>
            <rect x="70" y="340" width="130" height="270" rx="8" fill="#141c26" />
            <rect x="196" y="330" width="20" height="290" rx="6" fill="#2a3542" stroke="#101820" strokeWidth="3" />
            {!flags.gotCard && (
              <rect x="102" y="450" width="66" height="42" rx="8" fill="#f8fafc" stroke="#0ea5e9" strokeWidth="4" className="anim-risepop" style={{ animation: 'twinkle 1.6s ease-in-out infinite' }} />
            )}
          </g>
        )}
      </g>

      {/* המנוע הגדול עם שקע הסוללה */}
      <g className={hit(fx, 'engine', 'anim-wiggle')}>
        <rect x="420" y="300" width="240" height="320" rx="24" fill="#3f5068" stroke="#101820" strokeWidth="5" />
        <circle cx="540" cy="390" r="52" fill="#141c26" stroke="#101820" strokeWidth="4" />
        <circle cx="540" cy="390" r="34" fill={flags.power ? '#22d3ee' : '#1b2430'} className={flags.power ? 'anim-flicker' : ''} />
        {flags.power && <circle cx="540" cy="390" r="52" fill="#22d3ee" opacity="0.2" filter="blur(8px)" />}
        {/* שקע הסוללה */}
        <rect x="490" y="480" width="100" height="70" rx="10" fill="#141c26" stroke="#101820" strokeWidth="4" />
        {!flags.power && <text x="540" y="525" fontSize="30" textAnchor="middle" fill="#64748b">🔌</text>}
        {flags.power && (
          <g className="animate-pop">
            <rect x="502" y="492" width="76" height="46" rx="6" fill="#22c55e" stroke="#14532d" strokeWidth="4" />
            <rect x="576" y="506" width="10" height="18" rx="3" fill="#14532d" />
          </g>
        )}
        {[330, 585].map((y) => (
          <line key={y} x1="428" y1={y} x2="652" y2={y} stroke="#101820" strokeWidth="3" opacity="0.6" />
        ))}
      </g>

      {/* פתח האוורור - הסוללה מוסתרת בפנים */}
      <g className={hit(fx, 'vent', 'anim-wiggle')}>
        {!flags.ventOpen && (
          <g>
            <rect x="260" y="560" width="130" height="90" rx="10" fill="#2a3542" stroke="#101820" strokeWidth="4" />
            {[582, 604, 626].map((y) => (
              <line key={y} x1="272" y1={y} x2="378" y2={y} stroke="#101820" strokeWidth="6" strokeLinecap="round" />
            ))}
            <circle cx="272" cy="572" r="4" fill="#94a3b8" />
            <circle cx="378" cy="572" r="4" fill="#94a3b8" />
            <circle cx="272" cy="638" r="4" fill="#94a3b8" />
            <circle cx="378" cy="638" r="4" fill="#94a3b8" />
          </g>
        )}
        {flags.ventOpen && (
          <g>
            <rect x="260" y="560" width="130" height="90" rx="10" fill="#0a0f16" stroke="#101820" strokeWidth="4" />
            <rect x="255" y="548" width="140" height="16" rx="6" fill="#2a3542" transform="rotate(-24 260 560)" />
            {!flags.gotBattery && (
              <g className="anim-risepop">
                <rect x="292" y="588" width="62" height="38" rx="6" fill="#22c55e" stroke="#14532d" strokeWidth="4" />
                <rect x="352" y="599" width="9" height="16" rx="3" fill="#14532d" />
                <text x="322" y="615" fontSize="18" textAnchor="middle" fill="#dcfce7" fontWeight="bold">⚡</text>
              </g>
            )}
          </g>
        )}
      </g>

      {/* צינורות עם קיטור */}
      <g className={hit(fx, 'pipes', 'anim-wiggle')}>
        <rect x="300" y="60" width="330" height="26" rx="13" fill="#46586e" stroke="#101820" strokeWidth="4" />
        <rect x="600" y="60" width="26" height="180" rx="13" fill="#46586e" stroke="#101820" strokeWidth="4" />
        <circle cx="420" cy="100" r="12" fill="#cbd5e1" opacity="0.25" className="anim-bob" />
        <circle cx="452" cy="112" r="8" fill="#cbd5e1" opacity="0.2" className="anim-bob" />
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#seVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 3: תא היציאה ============ */
export function AirlockScene({ flags, fx, setup }) {
  const robo = HEROES.robo
  return (
    <g>
      <SpaceDefs p="sa" />
      <MetalWalls p="sa" power={flags.power} />

      {/* חלון עם חייזרים סקרנים - לספור! */}
      <g className={hit(fx, 'aliens', 'anim-wiggle')}>
        <rect x="55" y="150" width="230" height="230" rx="20" fill="#101820" />
        <rect x="67" y="162" width="206" height="206" rx="14" fill="url(#saSpace)" />
        <g transform="translate(-30 60)">
          <SpaceWindowStars seed={10} />
        </g>
        {ALIEN_POOL.slice(0, setup.aliens).map((a, i) => (
          <g key={i} className={i % 2 ? 'anim-bob' : 'anim-swim'}>
            <ellipse cx={a.x + 60} cy={a.y} rx="16" ry="19" fill="#4ade80" stroke="#14532d" strokeWidth="3" />
            <circle cx={a.x + 54} cy={a.y - 4} r="4.5" fill="#0a0f16" />
            <circle cx={a.x + 67} cy={a.y - 4} r="4.5" fill="#0a0f16" />
            <path d={`M${a.x + 54} ${a.y + 7} Q${a.x + 60} ${a.y + 11} ${a.x + 66} ${a.y + 7}`} stroke="#0a0f16" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <line x1={a.x + 60} y1={a.y - 19} x2={a.x + 60} y2={a.y - 28} stroke="#14532d" strokeWidth="3" />
            <circle cx={a.x + 60} cy={a.y - 30} r="3.5" fill="#4ade80" />
          </g>
        ))}
      </g>

      {/* תא ההקפאה של רובו */}
      <g className={hit(fx, 'pod', 'anim-wiggle')}>
        <rect x="88" y="420" width="170" height="250" rx="26" fill="#3f5068" stroke="#101820" strokeWidth="5" />
        <rect x="102" y="436" width="142" height="180" rx="20" fill={flags.roboFreed ? '#141c26' : '#a5d8e6'} stroke="#101820" strokeWidth="4" opacity={flags.roboFreed ? 1 : 0.9} />
        {!flags.roboFreed && (
          <g>
            <svg x="123" y="456" width="100" height="100" viewBox="0 0 100 100">
              <Brawler b={robo} dimmed />
            </svg>
            <path d="M110 450 L150 490 M170 440 L130 500 M200 460 L170 520" stroke="#e0f7ff" strokeWidth="5" opacity="0.55" strokeLinecap="round" />
            <text x="173" y="600" fontSize="17" textAnchor="middle" fill="#0e2a38" fontWeight="bold">HELP!</text>
          </g>
        )}
        {/* קורא הכרטיסים */}
        <rect x="252" y="500" width="26" height="60" rx="6" fill="#141c26" stroke="#101820" strokeWidth="3" />
        <rect x="258" y="514" width="14" height="4" rx="2" fill={flags.roboFreed ? '#4ade80' : '#ef4444'} className="anim-flicker" />
      </g>

      {/* דלת תא היציאה עם לוח המקשים */}
      <g className={hit(fx, 'airlockDoor', 'anim-wiggle')}>
        <circle cx="500" cy="400" r="168" fill="#3f5068" stroke="#101820" strokeWidth="6" />
        {!flags.innerOpen && (
          <g>
            <circle cx="500" cy="400" r="126" fill="#2a3542" stroke="#101820" strokeWidth="5" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <circle key={a} cx={500 + 147 * Math.cos((a * Math.PI) / 180)} cy={400 + 147 * Math.sin((a * Math.PI) / 180)} r="7" fill="#101820" />
            ))}
            <circle cx="500" cy="400" r="34" fill="#46586e" stroke="#101820" strokeWidth="5" />
            <line x1="500" y1="374" x2="500" y2="426" stroke="#101820" strokeWidth="7" strokeLinecap="round" />
            <line x1="474" y1="400" x2="526" y2="400" stroke="#101820" strokeWidth="7" strokeLinecap="round" />
          </g>
        )}
        {flags.innerOpen && (
          <g className="animate-pop">
            <circle cx="500" cy="400" r="126" fill="url(#saSpace)" />
            <circle cx="500" cy="400" r="126" fill="#22d3ee" opacity="0.12" />
            {/* חללית הבריחה מחכה בפנים */}
            <ellipse cx="500" cy="410" rx="62" ry="40" fill="#e2e8f0" stroke="#64748b" strokeWidth="4" />
            <ellipse cx="500" cy="392" rx="30" ry="20" fill="#7dd3fc" stroke="#64748b" strokeWidth="3" />
            <circle cx="466" cy="440" r="9" fill="#f59e0b" className="anim-flicker" />
            <circle cx="534" cy="440" r="9" fill="#f59e0b" className="anim-flicker" />
          </g>
        )}
      </g>

      {/* לוח המקשים ליד הדלת */}
      <g className={hit(fx, 'keypadPanel', 'anim-wiggle')}>
        <rect x="332" y="560" width="90" height="110" rx="12" fill="#141c26" stroke="#101820" strokeWidth="4" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={`${r}${c}`} x={344 + c * 24} y={572 + r * 24} width="18" height="18" rx="4" fill={flags.innerOpen ? '#134e4a' : '#2a3542'} stroke="#101820" strokeWidth="2" />
          ))
        )}
        <rect x="344" y="644" width="66" height="14" rx="4" fill={flags.innerOpen ? '#4ade80' : flags.consoleDone ? '#f59e0b' : '#7f1d1d'} className={flags.innerOpen ? '' : 'anim-glowfade'} />
      </g>

      {/* קסדה מרחפת - סתם כיף */}
      <g className={hit(fx, 'helmet', 'anim-wiggle')}>
        <g className="anim-bob">
          <circle cx="646" cy="140" r="34" fill="#e2e8f0" stroke="#64748b" strokeWidth="4" />
          <path d="M620 132 A34 34 0 0 1 672 132 L672 152 A34 34 0 0 1 620 152 Z" fill="#7dd3fc" opacity="0.85" />
        </g>
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#saVin)" pointerEvents="none" />
    </g>
  )
}
