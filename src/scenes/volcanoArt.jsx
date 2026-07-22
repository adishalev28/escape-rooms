// האמנות של הר הגעש - 4 מבטים: מדרון הגעש, מערת הלבה, מקדש האש, לוע הגעש
import Brawler from '../components/Brawler.jsx'
import { HEROES } from '../data/heroes.js'

const hit = (fx, id, anim) => (fx?.id === id ? `tb ${anim}` : '')

const GEM_POOL = [
  { x: 160, y: 560, c: '#f472b6' }, { x: 560, y: 590, c: '#38bdf8' }, { x: 350, y: 620, c: '#4ade80' },
  { x: 470, y: 545, c: '#a78bfa' }, { x: 240, y: 630, c: '#fbbf24' }, { x: 630, y: 540, c: '#38bdf8' },
]
const SAL_POOL = [
  { x: 130, y: 600 }, { x: 590, y: 630 }, { x: 320, y: 655 }, { x: 480, y: 600 }, { x: 220, y: 560 },
]
const FLAME_POOL = [
  { x: 110, y: 420 }, { x: 610, y: 380 }, { x: 360, y: 300 }, { x: 500, y: 460 },
]

function VolcDefs({ p }) {
  return (
    <defs>
      <linearGradient id={`${p}Sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#450a0a" />
        <stop offset="1" stopColor="#1c0a0a" />
      </linearGradient>
      <linearGradient id={`${p}Rock`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#44403c" />
        <stop offset="1" stopColor="#1c1917" />
      </linearGradient>
      <linearGradient id={`${p}Lava`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fbbf24" />
        <stop offset="1" stopColor="#dc2626" />
      </linearGradient>
      <radialGradient id={`${p}Glow`}>
        <stop offset="0" stopColor="#fb923c" stopOpacity="0.5" />
        <stop offset="1" stopColor="#fb923c" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${p}Vin`}>
        <stop offset="0.55" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.55" />
      </radialGradient>
    </defs>
  )
}

function VolcBg({ p, lavaFloor = true }) {
  return (
    <g>
      <rect x="0" y="0" width="720" height="560" fill={`url(#${p}Sky)`} />
      {/* ניצוצות באוויר */}
      {[[120, 120], [400, 80], [620, 160], [250, 200]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#fb923c" className={i % 2 ? 'anim-bob' : 'anim-swim'} opacity="0.8" />
      ))}
      <rect x="0" y="560" width="720" height="140" fill={`url(#${p}Rock)`} />
      {lavaFloor && (
        <g>
          <path d="M0 690 Q180 672 360 690 Q540 706 720 686 L720 700 L0 700 Z" fill={`url(#${p}Lava)`} className="anim-flicker" />
          <circle cx="200" cy="690" r="6" fill="#fde68a" className="anim-bob" opacity="0.8" />
          <circle cx="520" cy="692" r="5" fill="#fde68a" className="anim-swim" opacity="0.7" />
        </g>
      )}
    </g>
  )
}

function Salamander({ x, y, s = 1, cls = '' }) {
  return (
    <g className={cls}>
      <path d={`M${x - 24 * s} ${y} Q${x - 36 * s} ${y - 8 * s} ${x - 40 * s} ${y + 4 * s}`} stroke="#fb923c" strokeWidth={5 * s} fill="none" strokeLinecap="round" />
      <ellipse cx={x} cy={y} rx={22 * s} ry={10 * s} fill="#f97316" stroke="#9a3412" strokeWidth="2.5" />
      <circle cx={x + 20 * s} cy={y - 4 * s} r={8 * s} fill="#f97316" stroke="#9a3412" strokeWidth="2.5" />
      <circle cx={x + 23 * s} cy={y - 6 * s} r={2 * s} fill="#1c1917" />
      {[-10, 2].map((dx) => (
        <g key={dx}>
          <line x1={x + dx} y1={y + 8 * s} x2={x + dx - 4} y2={y + 15 * s} stroke="#9a3412" strokeWidth={3 * s} strokeLinecap="round" />
        </g>
      ))}
      <path d={`M${x - 14 * s} ${y - 8 * s} L${x - 8 * s} ${y - 14 * s} L${x - 2 * s} ${y - 8 * s}`} fill="#fbbf24" stroke="#9a3412" strokeWidth="2" />
    </g>
  )
}

function Flame({ x, y, s = 1 }) {
  return (
    <g className="anim-flicker">
      <path d={`M${x - 12 * s} ${y} Q${x - 16 * s} ${y - 26 * s} ${x} ${y - 38 * s} Q${x + 16 * s} ${y - 26 * s} ${x + 12 * s} ${y} Q${x} ${y + 8 * s} ${x - 12 * s} ${y} Z`} fill="#f97316" stroke="#9a3412" strokeWidth="2.5" />
      <path d={`M${x - 5 * s} ${y - 2 * s} Q${x - 7 * s} ${y - 16 * s} ${x} ${y - 22 * s} Q${x + 7 * s} ${y - 16 * s} ${x + 5 * s} ${y - 2 * s} Z`} fill="#fde68a" />
    </g>
  )
}

/* ============ מבט 1: מדרון הגעש ============ */
export function SlopeScene({ flags, fx, setup }) {
  return (
    <g>
      <VolcDefs p="vs" />
      <VolcBg p="vs" />

      {/* ההר ברקע */}
      <polygon points="140,560 360,120 580,560" fill="url(#vsRock)" stroke="#0c0a09" strokeWidth="5" />
      <path d="M330 140 Q360 120 390 140 L375 190 Q360 178 345 190 Z" fill="url(#vsLava)" className="anim-flicker" />
      <circle cx="360" cy="130" r="70" fill="url(#vsGlow)" className="anim-flicker" />

      {/* לפידי להבה - לספור! */}
      <g className={hit(fx, 'flames', 'anim-wiggle')}>
        {FLAME_POOL.slice(0, setup.flames).map((f, i) => (
          <g key={i}>
            <rect x={f.x - 5} y={f.y} width="10" height="46" rx="4" fill="#57534e" stroke="#292524" strokeWidth="2.5" />
            <Flame x={f.x} y={f.y} s={0.9} />
          </g>
        ))}
      </g>

      {/* המגן קבור בסלע */}
      <g className={hit(fx, 'shieldRock', 'anim-wiggle')}>
        <path d="M90 670 Q80 590 150 580 Q225 572 235 645 Q240 678 190 682 Z" fill="#44403c" stroke="#1c1917" strokeWidth="4" />
        {!flags.gotShield && (
          <g transform={flags.dig2 ? 'rotate(-10 160 620)' : flags.dig1 ? 'rotate(-5 160 620)' : undefined}>
            <path d="M130 618 Q130 585 160 582 Q190 585 190 618 Q190 645 160 652 Q130 645 130 618 Z" fill="#38bdf8" stroke="#0c4a6e" strokeWidth="4" />
            <path d="M160 590 L160 645 M138 615 L182 615" stroke="#0c4a6e" strokeWidth="4" />
          </g>
        )}
      </g>

      {/* תיבת הספירה */}
      <g className={hit(fx, 'countChest', 'anim-wiggle')}>
        <rect x="500" y="590" width="160" height="90" rx="10" fill="url(#vsRock)" stroke="#0c0a09" strokeWidth="4" />
        {!flags.chestOpen && <path d="M500 594 L500 580 Q580 548 660 580 L660 594 Z" fill="#57534e" stroke="#0c0a09" strokeWidth="4" />}
        {flags.chestOpen && (
          <g>
            <path d="M504 574 L512 530 Q580 502 648 530 L656 574 Q580 552 504 574 Z" fill="#44403c" stroke="#0c0a09" strokeWidth="4" />
            {!flags.gotLavaGem && (
              <polygon points="580,556 596,572 588,592 572,592 564,572" fill="#f472b6" stroke="#9d174d" strokeWidth="3" style={{ animation: 'twinkle 1.5s ease-in-out infinite' }} />
            )}
          </g>
        )}
        <rect x="536" y="612" width="88" height="46" rx="7" fill="#78716c" stroke="#0c0a09" strokeWidth="3" />
        <text x="580" y="642" fontSize="17" textAnchor="middle">💎🦎🔥</text>
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#vsVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 2: מערת הלבה ============ */
export function LavaCaveScene({ flags, fx, setup }) {
  return (
    <g>
      <VolcDefs p="vc" />
      <VolcBg p="vc" lavaFloor={false} />
      <rect x="0" y="0" width="720" height="700" fill="#1c0a0a" opacity="0.35" />
      {/* נטיפי בזלת */}
      {[[100, 90], [260, 70], [430, 100], [590, 80]].map(([x, h], i) => (
        <polygon key={i} points={`${x - 20},0 ${x + 20},0 ${x},${h}`} fill="#1c1917" />
      ))}

      {/* וילון הניצוצות בכניסה - נחסם עם המגן */}
      <g className={hit(fx, 'sparks', 'anim-wiggle')}>
        {!flags.sparksOff && (
          <g>
            {[200, 260, 320, 380, 440, 500].map((x, i) => (
              <g key={x} className={i % 2 ? 'anim-bob' : 'anim-swim'}>
                <circle cx={x} cy={220 + (i % 3) * 60} r="7" fill="#fb923c" className="anim-flicker" />
                <circle cx={x + 20} cy={300 + (i % 2) * 80} r="5" fill="#fde68a" className="anim-flicker" />
              </g>
            ))}
            <text x="360" y="160" fontSize="22" textAnchor="middle" fill="#fde68a" fontWeight="bold">🔥 ניצוצות חמים!</text>
          </g>
        )}
        {flags.sparksOff && (
          <g className="animate-pop">
            <path d="M300 240 Q300 200 360 196 Q420 200 420 240 Q420 290 360 300 Q300 290 300 240 Z" fill="#38bdf8" stroke="#0c4a6e" strokeWidth="5" />
            <path d="M360 205 L360 292 M310 245 L410 245" stroke="#0c4a6e" strokeWidth="4" />
            <text x="360" y="340" fontSize="15" textAnchor="middle" fill="#bae6fd">המגן חוסם את הניצוצות!</text>
          </g>
        )}
      </g>

      {/* יהלומי הלבה - לספור! (נראים כשהמגן במקום) */}
      {flags.sparksOff && (
        <g className={`animate-pop ${hit(fx, 'gems', 'anim-wiggle')}`}>
          {GEM_POOL.slice(0, setup.gems).map((g2, i) => (
            <g key={i} style={{ animation: `twinkle ${2 + (i % 3) * 0.5}s ease-in-out ${i * 0.3}s infinite` }}>
              <polygon points={`${g2.x},${g2.y - 18} ${g2.x + 13},${g2.y - 5} ${g2.x + 8},${g2.y + 11} ${g2.x - 8},${g2.y + 11} ${g2.x - 13},${g2.y - 5}`} fill={g2.c} stroke="#00000044" strokeWidth="2.5" />
              <polygon points={`${g2.x},${g2.y - 18} ${g2.x + 4},${g2.y - 5} ${g2.x - 4},${g2.y - 5}`} fill="#ffffff66" />
            </g>
          ))}
        </g>
      )}

      {/* נהר לבה קטן */}
      <path d="M0 660 Q180 645 360 662 Q540 678 720 655 L720 700 L0 700 Z" fill="url(#vcLava)" className="anim-flicker" />

      <rect x="0" y="0" width="720" height="700" fill="url(#vcVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 3: מקדש האש ============ */
export function FireTempleScene({ flags, fx }) {
  return (
    <g>
      <VolcDefs p="vt" />
      <VolcBg p="vt" lavaFloor={false} />
      {/* חשכת מקדש עד שהמדורה דולקת */}
      {!flags.brazierLit && <rect x="0" y="0" width="720" height="700" fill="#0c0505" opacity="0.6" />}

      {/* עמודי המקדש */}
      {[130, 590].map((x) => (
        <g key={x}>
          <rect x={x - 26} y="180" width="52" height="420" rx="8" fill="url(#vtRock)" stroke="#0c0a09" strokeWidth="4" />
          <rect x={x - 36} y="160" width="72" height="26" rx="6" fill="#57534e" stroke="#0c0a09" strokeWidth="4" />
        </g>
      ))}
      <rect x="80" y="120" width="560" height="44" rx="10" fill="#44403c" stroke="#0c0a09" strokeWidth="5" />

      {/* המדורה עם מנעול מילות הגיימרים */}
      <g className={hit(fx, 'brazier', 'anim-wiggle')}>
        <path d="M280 480 Q280 450 360 450 Q440 450 440 480 L425 520 L295 520 Z" fill="#57534e" stroke="#0c0a09" strokeWidth="4.5" />
        <rect x="345" y="520" width="30" height="40" fill="#44403c" stroke="#0c0a09" strokeWidth="3.5" />
        {!flags.brazierLit && (
          <g>
            <rect x="300" y="400" width="120" height="38" rx="9" fill="#1c1917" stroke="#fb923c" strokeWidth="3" className="anim-glowfade" />
            <text x="360" y="426" fontSize="19" textAnchor="middle">⚡🛡️🗺️🏆</text>
          </g>
        )}
        {flags.brazierLit && (
          <g className="animate-pop">
            <circle cx="360" cy="420" r="110" fill="url(#vtGlow)" className="anim-flicker" />
            <Flame x={360} y={452} s={1.8} />
          </g>
        )}
      </g>

      {/* כספת הלבה עם לוח המקשים */}
      <g className={hit(fx, 'vault', 'anim-wiggle')}>
        <rect x="510" y="380" width="150" height="200" rx="14" fill="url(#vtRock)" stroke="#0c0a09" strokeWidth="5" />
        {!flags.vaultOpen && (
          <g>
            <rect x="540" y="430" width="90" height="100" rx="10" fill="#1c1917" stroke="#57534e" strokeWidth="4" />
            {[0, 1, 2].map((r2) =>
              [0, 1, 2].map((c) => (
                <rect key={`${r2}${c}`} x={552 + c * 24} y={442 + r2 * 24} width="17" height="17" rx="4" fill={flags.brazierLit ? '#7c2d12' : '#292524'} stroke="#0c0a09" strokeWidth="2" />
              ))
            )}
          </g>
        )}
        {flags.vaultOpen && (
          <g className="animate-pop">
            <rect x="524" y="396" width="122" height="168" rx="10" fill="#0c0505" />
            {!flags.gotFireKey && (
              <g style={{ animation: 'twinkle 1.5s ease-in-out infinite' }}>
                <circle cx="565" cy="480" r="11" fill="none" stroke="#f97316" strokeWidth="6" />
                <rect x="574" y="475" width="28" height="9" rx="4" fill="#f97316" />
              </g>
            )}
          </g>
        )}
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#vtVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 4: לוע הגעש ============ */
export function CraterScene({ flags, fx, setup }) {
  const blaze = HEROES.blaze
  return (
    <g>
      <VolcDefs p="vr" />
      <VolcBg p="vr" />

      {/* אגם לבה */}
      <ellipse cx="360" cy="640" rx="330" ry="55" fill="url(#vrLava)" className="anim-flicker" />
      <circle cx="250" cy="635" r="7" fill="#fde68a" className="anim-bob" />
      <circle cx="480" cy="645" r="6" fill="#fde68a" className="anim-swim" />

      {/* סלמנדרות - לספור! */}
      <g className={hit(fx, 'sals', 'anim-wiggle')}>
        {SAL_POOL.slice(0, setup.salamanders).map((s, i) => (
          <Salamander key={i} x={s.x} y={s.y - 60} s={0.95} cls={i % 2 ? 'anim-bob' : ''} />
        ))}
      </g>

      {/* הגביש השחור עם בלייז */}
      <g className={hit(fx, 'crystal', 'anim-wiggle')}>
        <ellipse cx="360" cy="480" rx="120" ry="20" fill="#1c1917" />
        {!flags.blazeFreed && (
          <g>
            <polygon points="360,180 460,300 435,470 285,470 260,300" fill="#312e81" opacity="0.8" stroke="#1e1b4b" strokeWidth="5" />
            <polygon points="360,180 400,300 360,270 320,300" fill="#e0e7ff" opacity="0.3" />
            {/* שני מנעולים: חור מפתח + שקע יהלום */}
            <circle cx="322" cy="430" r="12" fill={flags.keySet ? '#f97316' : '#0c0a09'} stroke="#f97316" strokeWidth="3.5" className={flags.keySet ? '' : 'anim-glowfade'} />
            <polygon points="398,418 410,430 398,446 386,430" fill={flags.gemSet ? '#f472b6' : '#0c0a09'} stroke="#f472b6" strokeWidth="3" className={flags.gemSet ? '' : 'anim-glowfade'} />
          </g>
        )}
        <svg x="305" y="290" width="110" height="110" viewBox="0 0 100 100">
          <Brawler b={blaze} dimmed={!flags.blazeFreed} />
        </svg>
        {!flags.blazeFreed && <text x="360" y="520" fontSize="16" textAnchor="middle" fill="#fde68a" fontWeight="bold">HELP!</text>}
        {flags.blazeFreed && <text x="360" y="270" fontSize="30" textAnchor="middle" className="animate-bigpop">🔥💪</text>}
      </g>

      {/* גשר סלעי הלבה - היציאה */}
      <g className={hit(fx, 'bridge', 'anim-wiggle')}>
        {flags.blazeFreed && !flags.doorOpen && (
          <g>
            <rect x="540" y="470" width="160" height="180" rx="16" fill="none" stroke="#ffe066" strokeWidth="6" className="anim-glowfade" />
            <text x="620" y="455" fontSize="26" textAnchor="middle" className="animate-floaty">⬇️</text>
          </g>
        )}
        {!flags.doorOpen && [560, 610, 660].map((x, i) => (
          <ellipse key={x} cx={x} cy={600 + i * 14} rx="30" ry="12" fill="#44403c" stroke="#1c1917" strokeWidth="3.5" />
        ))}
        {flags.doorOpen && (
          <g className="animate-pop">
            {[540, 585, 630, 675].map((x, i) => (
              <ellipse key={x} cx={x} cy={590 + i * 10} rx="34" ry="13" fill="#78716c" stroke="#1c1917" strokeWidth="3.5" />
            ))}
            <path d="M660 520 Q690 460 720 480 L720 560 Q690 560 660 560 Z" fill="#fde047" opacity="0.5" className="anim-glowfade" />
          </g>
        )}
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#vrVin)" pointerEvents="none" />
    </g>
  )
}
