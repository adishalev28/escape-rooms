// האמנות של ממלכת הממתקים - 4 מבטים: שער הסוכריות, מפעל השוקולד, אולם העוגות, צינוק הסוכר
import Brawler from '../components/Brawler.jsx'
import { HEROES } from '../data/heroes.js'

const hit = (fx, id, anim) => (fx?.id === id ? `tb ${anim}` : '')

const LOLLI_POOL = [
  { x: 110, y: 300, c: '#f472b6' }, { x: 620, y: 260, c: '#38bdf8' }, { x: 250, y: 200, c: '#a78bfa' },
  { x: 500, y: 180, c: '#4ade80' }, { x: 660, y: 420, c: '#fb923c' },
]
const GUMMY_POOL = [
  { x: 90, y: 600, c: '#ef4444' }, { x: 620, y: 620, c: '#22c55e' }, { x: 300, y: 640, c: '#eab308' },
  { x: 500, y: 590, c: '#f472b6' }, { x: 170, y: 640, c: '#38bdf8' }, { x: 560, y: 660, c: '#a78bfa' },
]
const CUPCAKE_POOL = [
  { x: 100, y: 250 }, { x: 620, y: 230 }, { x: 660, y: 560 }, { x: 90, y: 480 },
]

function CandyDefs({ p }) {
  return (
    <defs>
      <linearGradient id={`${p}Sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fbcfe8" />
        <stop offset="1" stopColor="#f9a8d4" />
      </linearGradient>
      <linearGradient id={`${p}Ground`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fde68a" />
        <stop offset="1" stopColor="#fbbf24" />
      </linearGradient>
      <linearGradient id={`${p}Choco`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8a5a2e" />
        <stop offset="1" stopColor="#5b3a21" />
      </linearGradient>
      <radialGradient id={`${p}Vin`}>
        <stop offset="0.6" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#7c2d5e" stopOpacity="0.25" />
      </radialGradient>
    </defs>
  )
}

function CandyGround({ p }) {
  return (
    <g>
      <rect x="0" y="0" width="720" height="520" fill={`url(#${p}Sky)`} />
      {/* עננים של צמר גפן מתוק */}
      <g opacity="0.85">
        <ellipse cx="130" cy="80" rx="60" ry="26" fill="#fff" />
        <ellipse cx="180" cy="70" rx="45" ry="22" fill="#fdf2f8" />
        <ellipse cx="560" cy="110" rx="70" ry="28" fill="#fff" />
        <ellipse cx="610" cy="95" rx="40" ry="20" fill="#fdf2f8" />
      </g>
      <rect x="0" y="520" width="720" height="180" fill={`url(#${p}Ground)`} />
      <path d="M0 520 Q180 505 360 520 Q540 535 720 520 L720 532 L0 532 Z" fill="#f59e0b" />
    </g>
  )
}

// סוכרייה על מקל
function Lollipop({ x, y, c, s = 1 }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y + 85 * s} stroke="#fff" strokeWidth={8 * s} strokeLinecap="round" />
      <circle cx={x} cy={y} r={30 * s} fill={c} stroke="#00000022" strokeWidth="3" />
      <path d={`M${x} ${y} m-${20 * s} 0 a${20 * s} ${20 * s} 0 0 1 ${40 * s} 0 a${12 * s} ${12 * s} 0 0 1 -${24 * s} 0 a${6 * s} ${6 * s} 0 0 1 ${12 * s} 0`} fill="none" stroke="#ffffffcc" strokeWidth={5 * s} strokeLinecap="round" />
    </g>
  )
}

// דובון גומי
function Gummy({ x, y, c, s = 1, cls = '' }) {
  return (
    <g className={cls} opacity="0.95">
      <ellipse cx={x} cy={y} rx={20 * s} ry={24 * s} fill={c} stroke="#00000033" strokeWidth="3" />
      <circle cx={x} cy={y - 26 * s} r={14 * s} fill={c} stroke="#00000033" strokeWidth="3" />
      <circle cx={x - 10 * s} cy={y - 38 * s} r={5 * s} fill={c} />
      <circle cx={x + 10 * s} cy={y - 38 * s} r={5 * s} fill={c} />
      <circle cx={x - 5 * s} cy={y - 28 * s} r={2.2 * s} fill="#00000066" />
      <circle cx={x + 5 * s} cy={y - 28 * s} r={2.2 * s} fill="#00000066" />
      <ellipse cx={x - 14 * s} cy={y + 2 * s} rx={7 * s} ry={11 * s} fill={c} stroke="#00000022" strokeWidth="2" />
      <ellipse cx={x + 14 * s} cy={y + 2 * s} rx={7 * s} ry={11 * s} fill={c} stroke="#00000022" strokeWidth="2" />
      <circle cx={x - 7 * s} cy={y - 8 * s} r={4 * s} fill="#ffffff55" />
    </g>
  )
}

function Cupcake({ x, y, s = 1 }) {
  return (
    <g>
      <polygon points={`${x - 22 * s},${y} ${x + 22 * s},${y} ${x + 15 * s},${y + 26 * s} ${x - 15 * s},${y + 26 * s}`} fill="#d97706" stroke="#92400e" strokeWidth="2.5" />
      <path d={`M${x - 24 * s} ${y} Q${x - 20 * s} ${y - 26 * s} ${x} ${y - 24 * s} Q${x + 20 * s} ${y - 26 * s} ${x + 24 * s} ${y} Z`} fill="#fdf2f8" stroke="#f472b6" strokeWidth="2.5" />
      <circle cx={x} cy={y - 26 * s} r={5 * s} fill="#ef4444" />
    </g>
  )
}

/* ============ מבט 1: שער הסוכריות ============ */
export function CandyGateScene({ flags, fx, setup }) {
  return (
    <g>
      <CandyDefs p="cg" />
      <CandyGround p="cg" />

      {/* שער קני סוכר */}
      <g>
        {[210, 510].map((x) => (
          <g key={x}>
            <rect x={x - 14} y="180" width="28" height="345" rx="14" fill="#fff" stroke="#fecdd3" strokeWidth="3" />
            {[200, 250, 300, 350, 400, 450, 500].map((y) => (
              <rect key={y} x={x - 14} y={y} width="28" height="22" rx="8" fill="#ef4444" opacity="0.9" />
            ))}
          </g>
        ))}
        <path d="M196 190 Q360 90 524 190" fill="none" stroke="#fff" strokeWidth="26" strokeLinecap="round" />
        <path d="M196 190 Q360 90 524 190" fill="none" stroke="#ef4444" strokeWidth="26" strokeLinecap="round" strokeDasharray="24 24" />
        <text x="360" y="158" fontSize="26" textAnchor="middle" fill="#9d174d" fontWeight="bold">🍬 ממלכת הממתקים 🍬</text>
      </g>

      {/* סוכריות על מקל - לספור! */}
      <g className={hit(fx, 'lollis', 'anim-wiggle')}>
        {LOLLI_POOL.slice(0, setup.lollipops).map((l, i) => (
          <Lollipop key={i} x={l.x} y={l.y} c={l.c} s={0.9} />
        ))}
      </g>

      {/* שלולית הקרמל עם הפטיש */}
      <g className={hit(fx, 'caramel', 'anim-wiggle')}>
        <ellipse cx="360" cy="600" rx="120" ry="34" fill={flags.caramelMelted ? '#c2841f' : '#92400e'} stroke="#78350f" strokeWidth="4" />
        {!flags.caramelMelted && (
          <g>
            <line x1="360" y1="588" x2="400" y2="490" stroke="#b98a4e" strokeWidth="11" strokeLinecap="round" />
            <rect x="368" y="462" width="72" height="40" rx="10" fill="#64748b" stroke="#334155" strokeWidth="4" transform="rotate(22 404 482)" />
            <text x="300" y="575" fontSize="18" textAnchor="middle" fill="#78350f" fontWeight="bold">תקוע!</text>
          </g>
        )}
        {flags.caramelMelted && !flags.gotHammer && (
          <g className="anim-risepop">
            <line x1="360" y1="600" x2="400" y2="510" stroke="#b98a4e" strokeWidth="11" strokeLinecap="round" style={{ animation: 'twinkle 1.5s ease-in-out infinite' }} />
            <rect x="370" y="482" width="72" height="40" rx="10" fill="#64748b" stroke="#334155" strokeWidth="4" transform="rotate(22 406 502)" />
          </g>
        )}
      </g>

      {/* נהר שוקולד קטן */}
      <path d="M0 660 Q180 640 360 662 Q540 682 720 658 L720 700 L0 700 Z" fill="url(#cgChoco)" />
      <path d="M40 668 Q100 662 160 670 M520 672 Q580 664 660 672" stroke="#b98a4e" strokeWidth="4" fill="none" opacity="0.6" />

      <rect x="0" y="0" width="720" height="700" fill="url(#cgVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 2: מפעל השוקולד ============ */
export function FactoryScene({ flags, fx, setup }) {
  return (
    <g>
      <CandyDefs p="cf" />
      <CandyGround p="cf" />

      {/* דובוני גומי - לספור! */}
      <g className={hit(fx, 'gummies', 'anim-wiggle')}>
        {GUMMY_POOL.slice(0, setup.gummies).map((g2, i) => (
          <Gummy key={i} x={g2.x} y={g2.y} c={g2.c} s={0.85} cls={i % 2 ? 'anim-bob' : ''} />
        ))}
      </g>

      {/* מסוע עם כוסות קקאו */}
      <g className={hit(fx, 'conveyor', 'anim-wiggle')}>
        <rect x="70" y="380" width="290" height="26" rx="13" fill="#57606f" stroke="#2a3040" strokeWidth="4" />
        <circle cx="100" cy="393" r="9" fill="#2a3040" />
        <circle cx="330" cy="393" r="9" fill="#2a3040" />
        {!flags.gotCocoa && (
          <g style={{ animation: 'twinkle 1.8s ease-in-out infinite' }}>
            <path d="M170 378 L200 378 L195 340 L175 340 Z" fill="#fdf2f8" stroke="#f472b6" strokeWidth="3" />
            <path d="M200 352 Q214 352 210 368 Q206 374 198 372" fill="none" stroke="#f472b6" strokeWidth="4" />
            <ellipse cx="185" cy="342" rx="10" ry="4" fill="#8a5a2e" />
            <path d="M180 330 Q182 322 186 330 M190 328 Q192 320 196 328" stroke="#b98a4e" strokeWidth="2.5" fill="none" opacity="0.7" />
          </g>
        )}
        <path d="M250 378 L280 378 L276 350 L254 350 Z" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="3" />
      </g>

      {/* מכונת ערבוב הצבעים */}
      <g className={hit(fx, 'mixer', 'anim-wiggle')}>
        <rect x="420" y="260" width="240" height="270" rx="20" fill="#c084fc" stroke="#7c3aed" strokeWidth="5" />
        <rect x="445" y="290" width="190" height="80" rx="12" fill="#2e1065" />
        {!flags.mixDone ? (
          <text x="540" y="340" fontSize="30" textAnchor="middle" fill="#f0abfc" fontWeight="bold" className="anim-glowfade">🎨 ?</text>
        ) : (
          <text x="540" y="340" fontSize="30" textAnchor="middle" fill="#86efac" fontWeight="bold">✓ 🍭</text>
        )}
        {/* כפתורי צבע */}
        {[['#fb923c', 470], ['#f472b6', 520], ['#a78bfa', 570], ['#fff', 620]].map(([c, x]) => (
          <circle key={x} cx={x} cy="410" r="21" fill={c} stroke="#7c3aed" strokeWidth="4" />
        ))}
        <rect x="500" y="450" width="80" height="56" rx="10" fill="#2e1065" />
        {flags.mixDone && !flags.gotRainbow && (
          <g className="anim-risepop" style={{ animation: 'twinkle 1.5s ease-in-out infinite' }}>
            <line x1="540" y1="505" x2="540" y2="472" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
            <circle cx="540" cy="470" r="17" fill="#f472b6" />
            <circle cx="540" cy="470" r="11" fill="#fb923c" />
            <circle cx="540" cy="470" r="6" fill="#a78bfa" />
          </g>
        )}
        {/* צינורות */}
        <rect x="480" y="220" width="24" height="46" rx="10" fill="#7c3aed" />
        <rect x="560" y="230" width="24" height="36" rx="10" fill="#7c3aed" />
        <circle cx="492" cy="212" r="10" fill="#f0abfc" className="anim-bob" />
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#cfVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 3: אולם העוגות ============ */
export function CakeHallScene({ flags, fx, setup }) {
  return (
    <g>
      <CandyDefs p="ck" />
      <CandyGround p="ck" />

      {/* קאפקייקס - לספור! */}
      <g className={hit(fx, 'cupcakes', 'anim-wiggle')}>
        {CUPCAKE_POOL.slice(0, setup.cupcakes).map((c, i) => (
          <Cupcake key={i} x={c.x} y={c.y} s={1} />
        ))}
      </g>

      {/* העוגה הענקית - נבנית בשכבות */}
      <g className={hit(fx, 'bigCake', 'anim-wiggle')}>
        <ellipse cx="360" cy="600" rx="170" ry="30" fill="#fdf2f8" stroke="#f472b6" strokeWidth="4" />
        <rect x="220" y="490" width="280" height="110" rx="14" fill="#f9a8d4" stroke="#db2777" strokeWidth="4" />
        <path d="M220 500 Q250 528 280 500 Q310 528 340 500 Q370 528 400 500 Q430 528 460 500 Q490 528 500 505" fill="none" stroke="#fdf2f8" strokeWidth="10" strokeLinecap="round" />
        {flags.cakeDone && (
          <g className="animate-pop">
            <rect x="265" y="400" width="190" height="90" rx="12" fill="#c084fc" stroke="#7c3aed" strokeWidth="4" />
            <rect x="300" y="330" width="120" height="70" rx="10" fill="#fbbf24" stroke="#d97706" strokeWidth="4" />
            <rect x="352" y="292" width="16" height="40" rx="6" fill="#fff" />
            <ellipse cx="360" cy="288" rx="8" ry="13" fill="#ffdf6b" className="anim-flicker" />
            {!flags.gotCaneKey && (
              <g style={{ animation: 'twinkle 1.5s ease-in-out infinite' }}>
                <circle cx="330" cy="440" r="10" fill="none" stroke="#fff" strokeWidth="6" />
                <rect x="338" y="436" width="26" height="8" rx="3" fill="#fff" />
              </g>
            )}
          </g>
        )}
        {!flags.cakeDone && (
          <text x="360" y="460" fontSize="26" textAnchor="middle" fill="#9d174d" fontWeight="bold" className="anim-glowfade">🎂 חסרות שכבות...</text>
        )}
      </g>

      {/* תנור */}
      <g className={hit(fx, 'oven', 'anim-wiggle')}>
        <rect x="570" y="380" width="130" height="180" rx="14" fill="#94a3b8" stroke="#475569" strokeWidth="5" />
        <rect x="585" y="410" width="100" height="90" rx="10" fill="#1e293b" />
        <circle cx="600" cy="392" r="6" fill="#ef4444" />
        <circle cx="622" cy="392" r="6" fill="#fbbf24" />
        <path d="M600 450 Q620 435 640 452 Q655 465 668 450" stroke="#f97316" strokeWidth="5" fill="none" className="anim-flicker" />
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#ckVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 4: צינוק הסוכר ============ */
export function DungeonScene({ flags, fx, setup }) {
  const king = HEROES.king
  return (
    <g>
      <CandyDefs p="cd" />
      {/* צינוק - ורוד כהה */}
      <rect x="0" y="0" width="720" height="520" fill="#4a1d3f" />
      {[0, 1, 2, 3, 4, 5, 6].map((row) => (
        <line key={row} x1="0" y1={row * 78} x2="720" y2={row * 78} stroke="#2e1129" strokeWidth="4" opacity="0.7" />
      ))}
      <rect x="0" y="520" width="720" height="180" fill="#5b2450" />
      <rect x="0" y="516" width="720" height="8" fill="#2e1129" />

      {/* דלת השוקולד הגדולה - הכספת עם גלגלי הספירה */}
      <g className={hit(fx, 'vault', 'anim-wiggle')}>
        {!flags.vaultOpen && (
          <g>
            <path d="M430 660 L430 320 Q430 230 555 230 Q680 230 680 320 L680 660 Z" fill="url(#cdChoco)" stroke="#3a2812" strokeWidth="6" />
            {[300, 380, 460, 540].map((y) => (
              <line key={y} x1="436" y1={y} x2="674" y2={y} stroke="#3a2812" strokeWidth="4" opacity="0.6" />
            ))}
            <rect x="505" y="420" width="100" height="72" rx="10" fill="#d9b05e" stroke="#8d6b34" strokeWidth="4" />
            <text x="555" y="466" fontSize="20" textAnchor="middle">🍭🧸🧁</text>
          </g>
        )}
        {flags.vaultOpen && (
          <g className="animate-pop">
            <path d="M430 660 L430 320 Q430 230 555 230 Q680 230 680 320 L680 660 Z" fill="#fef3c7" stroke="#3a2812" strokeWidth="6" />
            <path d="M430 660 L430 320 Q430 230 555 230 Q680 230 680 320 L680 660 Z" fill="#f472b6" opacity="0.2" className="anim-glowfade" />
            <circle cx="555" cy="360" r="30" fill="#ffdf6b" opacity="0.9" />
          </g>
        )}
      </g>

      {/* הכלוב של קינג - סורגי קני סוכר */}
      <g className={hit(fx, 'cage', 'anim-wiggle')}>
        <rect x="70" y="250" width="220" height="24" rx="10" fill="#fff" stroke="#fecdd3" strokeWidth="3" />
        <rect x="70" y="440" width="220" height="24" rx="10" fill="#fff" stroke="#fecdd3" strokeWidth="3" />
        {!flags.barsBroken && [100, 140, 180, 220, 260].map((x) => (
          <g key={x}>
            <rect x={x - 8} y="270" width="16" height="172" rx="7" fill="#fff" stroke="#fecdd3" strokeWidth="2.5" />
            {[290, 330, 370, 410].map((y) => (
              <rect key={y} x={x - 8} y={y} width="16" height="14" rx="5" fill="#ef4444" opacity="0.9" />
            ))}
          </g>
        ))}
        {flags.barsBroken && (
          <g>
            <rect x="88" y="270" width="16" height="60" rx="7" fill="#fff" stroke="#fecdd3" strokeWidth="2.5" transform="rotate(-24 96 300)" />
            <rect x="240" y="380" width="16" height="70" rx="7" fill="#fff" stroke="#fecdd3" strokeWidth="2.5" transform="rotate(28 248 415)" />
          </g>
        )}
        <svg x="130" y="300" width="100" height="100" viewBox="0 0 100 100">
          <Brawler b={king} dimmed={!flags.kingFreed} />
        </svg>
        {!flags.kingFreed && (
          <g>
            {/* שרשרת סוכריות עם מנעול */}
            <path d="M130 420 Q180 442 230 420" stroke="#94a3b8" strokeWidth="7" fill="none" strokeDasharray="10 6" />
            <path d="M170 432 Q170 420 180 420 Q190 420 190 432" fill="none" stroke="#8d6b34" strokeWidth="5" />
            <rect x="164" y="432" width="32" height="26" rx="6" fill="#fbbf24" stroke="#b45309" strokeWidth="3" />
            <text x="180" y="490" fontSize="17" textAnchor="middle" fill="#fbbf24" fontWeight="bold">HELP!</text>
          </g>
        )}
        {flags.kingFreed && <text x="180" y="280" fontSize="28" textAnchor="middle" className="animate-bigpop">👑✨</text>}
      </g>

      {/* דובון הגומי השומר */}
      {!flags.guardMoved && (
        <g className={hit(fx, 'guard', 'anim-wiggle')}>
          <Gummy x={555} y={560} c="#22c55e" s={2.2} cls="anim-bob" />
          <text x="555" y="660" fontSize="17" textAnchor="middle" fill="#fdf2f8" fontWeight="bold">שומר הצינוק 🛑</text>
        </g>
      )}
      {flags.guardMoved && (
        <g className={hit(fx, 'guard', 'anim-wiggle')}>
          <Gummy x={120} y={620} c="#22c55e" s={1.4} cls="anim-bob" />
          <text x="120" y="668" fontSize="15" textAnchor="middle" fill="#fdf2f8">מלקק בשמחה 🍭</text>
        </g>
      )}

      <rect x="0" y="0" width="720" height="700" fill="url(#cdVin)" pointerEvents="none" />
    </g>
  )
}
