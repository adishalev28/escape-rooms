// האמנות של מערת הדרקון - 4 מבטים: פתח המערה, אולם הגבישים, אוצר הדרקון, שער האבן
// setup = אקראיות (כמה עטלפים/גבישים/ערימות זהב, סדר המפתחות בשער)
import Brawler from '../components/Brawler.jsx'
import { HEROES } from '../data/heroes.js'

const hit = (fx, id, anim) => (fx?.id === id ? `tb ${anim}` : '')

const KEY_COLORS = { red: '#ef4444', blue: '#3b82f6', green: '#22c55e', yellow: '#eab308' }

// מאגרי מיקומים - נחתכים לפי הספירה האקראית
const BAT_POOL = [
  { x: 180, y: 90 }, { x: 320, y: 60 }, { x: 470, y: 100 }, { x: 250, y: 140 }, { x: 550, y: 70 },
]
const GEM_POOL = [
  { x: 90, y: 600, c: '#f472b6' }, { x: 620, y: 580, c: '#38bdf8' }, { x: 300, y: 630, c: '#4ade80' },
  { x: 500, y: 640, c: '#f472b6' }, { x: 170, y: 560, c: '#38bdf8' }, { x: 660, y: 400, c: '#4ade80' },
]
const GOLD_POOL = [
  { x: 120, y: 620 }, { x: 610, y: 640 }, { x: 350, y: 660 }, { x: 500, y: 600 },
]
const MUSHROOM_POOL = [
  { x: 560, y: 520 }, { x: 592, y: 506 }, { x: 618, y: 524 }, { x: 545, y: 496 }, { x: 640, y: 500 },
]

// מפתח צבעוני - מצויר, לא אימוג'י
function ColorKey({ x, y, color, sparkle = true }) {
  return (
    <g style={sparkle ? { animation: 'twinkle 1.6s ease-in-out infinite' } : undefined}>
      <circle cx={x} cy={y} r="10" fill="none" stroke={KEY_COLORS[color]} strokeWidth="6" />
      <rect x={x + 8} y={y - 4} width="26" height="8" rx="3" fill={KEY_COLORS[color]} />
      <rect x={x + 26} y={y + 2} width="6" height="9" fill={KEY_COLORS[color]} />
    </g>
  )
}

// עטלף חמוד
function Bat({ x, y, cls }) {
  return (
    <g className={cls}>
      <path d={`M${x - 30} ${y} Q${x - 20} ${y - 14} ${x - 8} ${y - 4} Q${x - 4} ${y - 8} ${x} ${y - 8}`} fill="#4c1d95" stroke="#2e1065" strokeWidth="2.5" />
      <path d={`M${x + 30} ${y} Q${x + 20} ${y - 14} ${x + 8} ${y - 4} Q${x + 4} ${y - 8} ${x} ${y - 8}`} fill="#4c1d95" stroke="#2e1065" strokeWidth="2.5" />
      <ellipse cx={x} cy={y} rx="10" ry="12" fill="#5b21b6" stroke="#2e1065" strokeWidth="2.5" />
      <path d={`M${x - 6} ${y - 10} L${x - 8} ${y - 18} L${x - 2} ${y - 12} M${x + 6} ${y - 10} L${x + 8} ${y - 18} L${x + 2} ${y - 12}`} stroke="#2e1065" strokeWidth="2.5" fill="#5b21b6" />
      <circle cx={x - 3.5} cy={y - 3} r="2.2" fill="#fbbf24" />
      <circle cx={x + 3.5} cy={y - 3} r="2.2" fill="#fbbf24" />
    </g>
  )
}

function CaveWalls({ p }) {
  return (
    <g>
      <rect x="0" y="0" width="720" height="700" fill={`url(#${p}Rock)`} />
      {/* נטיפים */}
      {[[60, 85], [150, 60], [260, 95], [390, 70], [520, 90], [640, 65]].map(([x, h], i) => (
        <polygon key={i} points={`${x - 22},0 ${x + 22},0 ${x},${h}`} fill="#241b2e" opacity="0.9" />
      ))}
      <rect x="0" y="520" width="720" height="180" fill={`url(#${p}Floor)`} />
      <path d="M0 520 Q180 505 360 520 Q540 535 720 520 L720 530 L0 530 Z" fill="#1a1322" />
    </g>
  )
}

function CaveDefs({ p }) {
  return (
    <defs>
      <radialGradient id={`${p}Rock`} cx="0.5" cy="0.35">
        <stop offset="0" stopColor="#4a3a5c" />
        <stop offset="1" stopColor="#221930" />
      </radialGradient>
      <linearGradient id={`${p}Floor`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#453552" />
        <stop offset="1" stopColor="#2a2038" />
      </linearGradient>
      <radialGradient id={`${p}Fire`}>
        <stop offset="0" stopColor="#fbbf24" stopOpacity="0.55" />
        <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${p}Vin`}>
        <stop offset="0.5" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.5" />
      </radialGradient>
    </defs>
  )
}

function Gem({ x, y, c, s = 1 }) {
  return (
    <g style={{ animation: `twinkle ${2 + (x % 3)}s ease-in-out ${(y % 10) / 10}s infinite` }}>
      <polygon points={`${x},${y - 20 * s} ${x + 14 * s},${y - 6 * s} ${x + 8 * s},${y + 12 * s} ${x - 8 * s},${y + 12 * s} ${x - 14 * s},${y - 6 * s}`} fill={c} stroke="#00000055" strokeWidth="2.5" />
      <polygon points={`${x},${y - 20 * s} ${x + 5 * s},${y - 6 * s} ${x - 5 * s},${y - 6 * s}`} fill="#ffffff66" />
    </g>
  )
}

/* ============ מבט 1: פתח המערה ============ */
export function EntranceScene({ flags, fx, setup }) {
  return (
    <g>
      <CaveDefs p="de" />
      <CaveWalls p="de" />

      {/* פתח המערה - אור ירח נשפך פנימה */}
      <path d="M240 520 Q230 300 360 280 Q490 300 480 520 Z" fill="#0b1e3a" />
      <path d="M255 520 Q248 315 360 296 Q472 315 465 520 Z" fill="#152c52" />
      <circle cx="395" cy="350" r="20" fill="#fef3c7" opacity="0.9" />
      <path d="M255 520 L465 520 L500 560 L220 560 Z" fill="#94a3b8" opacity="0.12" />

      {/* עטלפים - לספור! */}
      <g className={hit(fx, 'bats', 'anim-wiggle')}>
        {BAT_POOL.slice(0, setup.bats).map((b, i) => (
          <Bat key={i} x={b.x} y={b.y + 90} cls={i % 2 ? 'anim-bob' : 'anim-swim'} />
        ))}
      </g>

      {/* הנר על מדף סלע */}
      <g className={hit(fx, 'candle', 'anim-wiggle')}>
        <rect x="80" y="330" width="110" height="14" rx="6" fill="#241b2e" />
        {!flags.gotCandle && (
          <g>
            <rect x="118" y="272" width="26" height="60" rx="7" fill="#f5f0e6" stroke="#cfc6b0" strokeWidth="3" />
            <line x1="131" y1="272" x2="131" y2="262" stroke="#94a3b8" strokeWidth="3" />
          </g>
        )}
      </g>

      {/* המעדר תקוע בסלע - צריך לנדנד */}
      <g className={hit(fx, 'pickrock', 'anim-wiggle')}>
        <path d="M520 660 Q505 570 570 555 Q640 545 655 620 Q665 668 620 672 Z" fill="#453552" stroke="#241b2e" strokeWidth="4" />
        {!flags.gotPickaxe && (
          <g transform={flags.rockW2 ? 'rotate(-14 590 590)' : flags.rockW1 ? 'rotate(-7 590 590)' : undefined}>
            <line x1="590" y1="590" x2="630" y2="470" stroke="#b98a4e" strokeWidth="10" strokeLinecap="round" />
            <path d="M596 478 Q630 442 668 478 Q636 462 596 478 Z" fill="#64748b" stroke="#334155" strokeWidth="4" />
          </g>
        )}
      </g>

      {/* חבית הדגים הישנה */}
      <g className={hit(fx, 'fishBarrel', 'anim-wiggle')}>
        <rect x="70" y="560" width="120" height="115" rx="16" fill="#5a3315" stroke="#33200d" strokeWidth="4" />
        <rect x="66" y="580" width="128" height="11" rx="5" fill="#3f3f46" />
        <rect x="66" y="640" width="128" height="11" rx="5" fill="#3f3f46" />
        <ellipse cx="130" cy="562" rx="60" ry="15" fill="#241505" />
        {!flags.gotFish && (
          <g>
            <ellipse cx="130" cy="556" rx="20" ry="10" fill="#ff9438" stroke="#c96a1a" strokeWidth="2.5" />
            <path d="M112 556 L100 548 L100 564 Z" fill="#ff9438" stroke="#c96a1a" strokeWidth="2.5" />
            <circle cx="140" cy="553" r="2.2" fill="#1f1206" />
          </g>
        )}
      </g>

      {/* אבני ההד - 4 אבנים זוהרות */}
      <g className={hit(fx, 'echo', 'anim-wiggle')}>
        {[[280, 620, '#ef4444'], [340, 645, '#3b82f6'], [400, 620, '#22c55e'], [460, 645, '#eab308']].map(([x, y, c], i) => (
          <g key={i}>
            <ellipse cx={x} cy={y} rx="26" ry="18" fill="#453552" stroke="#241b2e" strokeWidth="3.5" />
            <circle cx={x} cy={y - 4} r="7" fill={c} className={flags.echoDone ? '' : 'anim-glowfade'} />
          </g>
        ))}
      </g>

      {/* המפתח הירוק נופל מהמדף אחרי חידת ההד */}
      {flags.echoDone && !flags.gotGreenKey && (
        <g className={`anim-risepop ${hit(fx, 'greenKey', 'anim-wiggle')}`}>
          <ColorKey x={370} y={585} color="green" />
        </g>
      )}

      <rect x="0" y="0" width="720" height="700" fill="url(#deVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 2: אולם הגבישים ============ */
export function CrystalScene({ flags, fx, setup }) {
  return (
    <g>
      <CaveDefs p="dc" />
      <CaveWalls p="dc" />

      {/* גבישים - לספור! */}
      <g className={hit(fx, 'gems', 'anim-wiggle')}>
        {GEM_POOL.slice(0, setup.gems).map((g2, i) => (
          <Gem key={i} x={g2.x} y={g2.y} c={g2.c} s={1.2} />
        ))}
      </g>

      {/* פטריות זוהרות - לספור! */}
      <g className={hit(fx, 'mushrooms', 'anim-wiggle')}>
        {MUSHROOM_POOL.slice(0, setup.mushrooms).map((m, i) => (
          <g key={i}>
            <rect x={m.x - 4} y={m.y - 14} width="8" height="16" rx="3" fill="#d9f99d" />
            <ellipse cx={m.x} cy={m.y - 16} rx="14" ry="9" fill="#f472b6" className="anim-glowfade" />
            <circle cx={m.x - 4} cy={m.y - 18} r="2.5" fill="#fdf2f8" />
            <circle cx={m.x + 5} cy={m.y - 14} r="2" fill="#fdf2f8" />
          </g>
        ))}
      </g>

      {/* הגביש הכחול הענק - המפתח הכחול כלוא בתוכו */}
      <g className={hit(fx, 'bigCrystal', 'anim-wiggle')}>
        {!flags.crystalBroken && (
          <g>
            <polygon points="400,250 480,320 460,480 340,480 320,320" fill="#38bdf8" opacity="0.75" stroke="#075985" strokeWidth="5" />
            <polygon points="400,250 440,320 400,300 360,320" fill="#e0f2fe" opacity="0.6" />
            <ColorKey x={385} y={400} color="blue" sparkle={false} />
          </g>
        )}
        {flags.crystalBroken && (
          <g>
            <polygon points="340,480 380,430 360,480" fill="#38bdf8" opacity="0.7" stroke="#075985" strokeWidth="3" />
            <polygon points="420,480 450,420 460,480" fill="#38bdf8" opacity="0.7" stroke="#075985" strokeWidth="3" />
            <polygon points="380,470 400,440 420,470" fill="#7dd3fc" opacity="0.6" />
            {!flags.gotBlueKey && <ColorKey x={385} y={455} color="blue" />}
          </g>
        )}
      </g>

      {/* הגומחה החשוכה - נר דולק מגלה את המפתח האדום */}
      <g className={hit(fx, 'alcove', 'anim-wiggle')}>
        <path d="M80 460 Q75 340 160 335 Q245 340 240 460 Q160 475 80 460 Z" fill={flags.alcoveLit ? '#453552' : '#0d0913'} stroke="#241b2e" strokeWidth="5" />
        {!flags.alcoveLit && <text x="160" y="405" fontSize="30" textAnchor="middle" fill="#4a3a5c">❓</text>}
        {flags.alcoveLit && (
          <g className="animate-pop">
            <circle cx="160" cy="395" r="70" fill="url(#dcFire)" className="anim-flicker" />
            <ellipse cx="128" cy="440" rx="10" ry="14" fill="#fbbf24" className="anim-flicker" />
            <rect x="120" y="450" width="17" height="18" rx="4" fill="#f5f0e6" />
            {!flags.gotRedKey && <ColorKey x={175} y={410} color="red" />}
          </g>
        )}
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#dcVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 3: אוצר הדרקון ============ */
export function HoardScene({ flags, fx, setup }) {
  return (
    <g>
      <CaveDefs p="dh" />
      <CaveWalls p="dh" />

      {/* ערימות זהב - לספור! */}
      <g className={hit(fx, 'gold', 'anim-wiggle')}>
        {GOLD_POOL.slice(0, setup.gold).map((g2, i) => (
          <g key={i}>
            <path d={`M${g2.x - 45} ${g2.y + 20} Q${g2.x} ${g2.y - 30} ${g2.x + 45} ${g2.y + 20} Z`} fill="#fbbf24" stroke="#b45309" strokeWidth="3.5" />
            <circle cx={g2.x - 15} cy={g2.y + 8} r="7" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
            <circle cx={g2.x + 12} cy={g2.y + 4} r="7" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
            <circle cx={g2.x} cy={g2.y + 14} r="7" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
          </g>
        ))}
      </g>

      {/* קערת האש - להדליק את הנר */}
      <g className={hit(fx, 'fireBowl', 'anim-wiggle')}>
        <circle cx="120" cy="360" r="75" fill="url(#dhFire)" className="anim-flicker" />
        <path d="M75 400 Q75 370 120 370 Q165 370 165 400 L155 425 L85 425 Z" fill="#334155" stroke="#0f172a" strokeWidth="4" />
        <rect x="108" y="425" width="24" height="30" fill="#334155" stroke="#0f172a" strokeWidth="3" />
        <path d="M95 385 Q90 345 112 336 Q106 362 120 366 Q116 340 138 336 Q148 360 138 385 Q120 396 95 385 Z" fill="#f97316" className="anim-flicker" />
        <path d="M108 380 Q106 360 120 354 Q128 368 120 380 Q114 385 108 380 Z" fill="#fbbf24" className="anim-flicker" />
      </g>

      {/* הדרקון הישן - ישן על המפתח הצהוב */}
      <g className={hit(fx, 'dragon', 'anim-wiggle')}>
        <g className="anim-bob">
          {/* גוף */}
          <ellipse cx="470" cy="420" rx="150" ry="80" fill="#166534" stroke="#052e16" strokeWidth="5" />
          {/* קוצים על הגב */}
          {[360, 420, 480, 540].map((x, i) => (
            <polygon key={i} points={`${x},${352 - i % 2 * 6} ${x + 18},${330 - i % 2 * 6} ${x + 36},${352 - i % 2 * 6}`} fill="#22c55e" stroke="#052e16" strokeWidth="3" />
          ))}
          {/* ראש */}
          <ellipse cx="330" cy="450" rx="65" ry="45" fill="#15803d" stroke="#052e16" strokeWidth="5" />
          <path d="M270 445 Q255 450 268 462" stroke="#052e16" strokeWidth="4" fill="none" />
          {/* עיניים עצומות */}
          <path d="M300 435 Q312 442 324 435 M340 432 Q352 439 364 432" stroke="#052e16" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* נחיריים עם עשן */}
          <circle cx="278" cy="458" r="4" fill="#052e16" />
          <circle cx="290" cy="464" r="4" fill="#052e16" />
          <circle cx="262" cy="440" r="9" fill="#cbd5e1" opacity="0.35" className="anim-bob" />
          <circle cx="250" cy="420" r="6" fill="#cbd5e1" opacity="0.28" className="anim-swim" />
          {/* זנב */}
          <path d="M610 430 Q670 410 660 360 Q690 380 685 340" stroke="#166534" strokeWidth="18" fill="none" strokeLinecap="round" />
          <polygon points="676,328 700,336 684,352" fill="#22c55e" stroke="#052e16" strokeWidth="3" />
        </g>
        {flags.dragonFed && <text x="380" y="330" fontSize="26" className="animate-floaty">💤❤️</text>}
      </g>

      {/* המפתח הצהוב - מתגלה כשהדרקון זז */}
      {flags.dragonFed && !flags.gotYellowKey && (
        <g className={`anim-risepop ${hit(fx, 'yellowKey', 'anim-wiggle')}`}>
          <ColorKey x={430} y={530} color="yellow" />
        </g>
      )}

      {/* תיבת האוצר עם גלגלי הקוד */}
      <g className={hit(fx, 'chest', 'anim-wiggle')}>
        <rect x="560" y="540" width="140" height="90" rx="10" fill="#5a3315" stroke="#33200d" strokeWidth="4" />
        {!flags.chestOpen && <path d="M560 542 L560 532 Q630 496 700 532 L700 542 Z" fill="#7a4a22" stroke="#33200d" strokeWidth="4" />}
        {flags.chestOpen && (
          <g>
            <path d="M560 528 L566 470 Q630 442 694 470 L700 528 Q630 505 560 528 Z" fill="#54331a" stroke="#33200d" strokeWidth="4" />
            <rect x="570" y="524" width="120" height="20" rx="5" fill="#1f1206" />
            {!flags.gotCageKey && (
              <g style={{ animation: 'twinkle 1.6s ease-in-out infinite' }}>
                <circle cx="605" cy="532" r="8" fill="none" stroke="#e2e8f0" strokeWidth="5" />
                <rect x="611" y="528" width="22" height="7" rx="3" fill="#e2e8f0" />
              </g>
            )}
          </g>
        )}
        <rect x="596" y="558" width="68" height="48" rx="7" fill="#d9b05e" stroke="#8d6b34" strokeWidth="3.5" />
        <text x="630" y="588" fontSize="17" textAnchor="middle">🦇🍄🪙</text>
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#dhVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 4: שער האבן ============ */
export function GateScene({ flags, fx, setup }) {
  const bolt = HEROES.bolt
  return (
    <g>
      <CaveDefs p="dg" />
      <CaveWalls p="dg" />

      {/* שער האבן הענק עם 4 מנעולים צבעוניים */}
      <g className={hit(fx, 'gate', 'anim-wiggle')}>
        <path d="M200 660 L200 300 Q200 180 360 180 Q520 180 520 300 L520 660 Z" fill="#241b2e" stroke="#1a1322" strokeWidth="6" />
        {!flags.doorOpen && (
          <g>
            <path d="M216 660 L216 306 Q216 196 360 196 Q504 196 504 306 L504 660 Z" fill="#453552" stroke="#241b2e" strokeWidth="4" />
            {[248, 320, 392, 464].map((y, i) => (
              <line key={i} x1="220" y1={y} x2="500" y2={y} stroke="#241b2e" strokeWidth="3.5" opacity="0.7" />
            ))}
            {/* 4 חורי מנעול צבעוניים */}
            {['red', 'blue', 'green', 'yellow'].map((c, i) => (
              <g key={c}>
                <circle cx={288 + i * 48} cy="420" r="20" fill="#1a1322" stroke={KEY_COLORS[c]} strokeWidth="5" className={flags.gateSolved ? '' : 'anim-glowfade'} />
                <rect x={284 + i * 48} y="420" width="8" height="16" rx="3" fill={KEY_COLORS[c]} />
              </g>
            ))}
            {/* חריטת דרקון */}
            <path d="M310 280 Q340 250 380 265 Q420 250 430 285 Q400 275 380 288 Q345 272 310 280 Z" fill="none" stroke="#8b7aa3" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}
        {flags.doorOpen && (
          <g className="animate-pop">
            <path d="M216 660 L216 306 Q216 196 360 196 Q504 196 504 306 L504 660 Z" fill="#fef3c7" />
            <path d="M216 660 L216 306 Q216 196 360 196 Q504 196 504 306 L504 660 Z" fill="#4ade80" opacity="0.25" className="anim-glowfade" />
            <circle cx="360" cy="330" r="34" fill="#fbbf24" opacity="0.9" />
            <path d="M280 560 Q320 540 360 560 Q400 580 440 560" stroke="#86efac" strokeWidth="6" fill="none" opacity="0.7" />
          </g>
        )}
      </g>

      {/* הכלוב של בולט */}
      <g className={hit(fx, 'cage', 'anim-wiggle')}>
        <line x1="110" y1="200" x2="110" y2="240" stroke="#334155" strokeWidth="6" />
        <path d="M40 260 Q40 236 110 236 Q180 236 180 260 L180 420 Q110 440 40 420 Z" fill="none" stroke="#334155" strokeWidth="7" />
        {[62, 86, 110, 134, 158].map((x) => (
          <line key={x} x1={x} y1="242" x2={x} y2="428" stroke={flags.boltFreed ? '#33415555' : '#334155'} strokeWidth="6" />
        ))}
        {!flags.boltFreed && (
          <g>
            <svg x="60" y="290" width="100" height="100" viewBox="0 0 100 100">
              <Brawler b={bolt} dimmed />
            </svg>
            <text x="110" y="470" fontSize="17" textAnchor="middle" fill="#fbbf24" fontWeight="bold">HELP!</text>
          </g>
        )}
        {flags.boltFreed && (
          <g className="animate-bigpop">
            <svg x="60" y="290" width="100" height="100" viewBox="0 0 100 100">
              <Brawler b={bolt} />
            </svg>
            <text x="110" y="280" fontSize="26" textAnchor="middle">⚡</text>
          </g>
        )}
        {/* מנעול הכלוב */}
        {!flags.boltFreed && (
          <g>
            <path d="M100 430 Q100 418 110 418 Q120 418 120 430" fill="none" stroke="#8d6b34" strokeWidth="5" />
            <rect x="94" y="430" width="32" height="26" rx="6" fill="#e2e8f0" stroke="#64748b" strokeWidth="3" />
            <circle cx="110" cy="440" r="3.5" fill="#334155" />
          </g>
        )}
      </g>

      {/* דרקון קטן - המדריך! */}
      <g className={`anim-bob ${fx?.id === 'babyDragon' ? 'tb anim-wiggle' : ''}`}>
        <ellipse cx="620" cy="470" rx="45" ry="34" fill="#22c55e" stroke="#052e16" strokeWidth="4" />
        <circle cx="585" cy="435" r="26" fill="#4ade80" stroke="#052e16" strokeWidth="4" />
        <circle cx="577" cy="429" r="5" fill="#052e16" />
        <path d="M562 442 Q554 446 560 452" stroke="#052e16" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <polygon points="596,412 604,396 614,414" fill="#86efac" stroke="#052e16" strokeWidth="3" />
        <path d="M660 460 Q690 445 685 420" stroke="#22c55e" strokeWidth="11" fill="none" strokeLinecap="round" />
        <polygon points="678,410 696,414 684,428" fill="#86efac" stroke="#052e16" strokeWidth="2.5" />
        <ellipse cx="600" cy="502" rx="12" ry="6" fill="#166534" />
        <ellipse cx="640" cy="502" rx="12" ry="6" fill="#166534" />
      </g>

      {/* גבישים לקישוט */}
      <Gem x={60} y={560} c="#f472b6" s={1.1} />
      <Gem x={680} y={600} c="#38bdf8" s={0.9} />

      <rect x="0" y="0" width="720" height="700" fill="url(#dgVin)" pointerEvents="none" />
    </g>
  )
}
