// האמנות של העיר שמתחת לים - 4 מבטים: שונית האלמוגים, רחוב העיר, ארמון הפנינה, מערת הרשת
import Brawler from '../components/Brawler.jsx'
import { HEROES } from '../data/heroes.js'

const hit = (fx, id, anim) => (fx?.id === id ? `tb ${anim}` : '')

const CLOWN_POOL = [
  { x: 150, y: 180 }, { x: 480, y: 130 }, { x: 610, y: 250 }, { x: 300, y: 100 }, { x: 550, y: 380 },
]
const SHELL_POOL = [
  { x: 100, y: 640 }, { x: 620, y: 620 }, { x: 300, y: 660 }, { x: 480, y: 645 }, { x: 190, y: 615 }, { x: 660, y: 665 },
]
const STARFISH_POOL = [
  { x: 130, y: 590, c: '#fb923c' }, { x: 600, y: 560, c: '#f472b6' }, { x: 360, y: 610, c: '#fbbf24' }, { x: 500, y: 580, c: '#ef4444' },
]

function starPts(cx, cy, R, r) {
  const pts = []
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? R : r
    const a = (Math.PI / 5) * i - Math.PI / 2
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`)
  }
  return pts.join(' ')
}

function SeaDefs({ p }) {
  return (
    <defs>
      <linearGradient id={`${p}Water`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0ea5e9" stopOpacity="0.55" />
        <stop offset="1" stopColor="#0c4a6e" />
      </linearGradient>
      <linearGradient id={`${p}Sand`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fcd34d" stopOpacity="0.75" />
        <stop offset="1" stopColor="#b48a3c" />
      </linearGradient>
      <radialGradient id={`${p}PearlGlow`}>
        <stop offset="0" stopColor="#f0f9ff" stopOpacity="0.8" />
        <stop offset="1" stopColor="#f0f9ff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${p}Vin`}>
        <stop offset="0.55" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#082f49" stopOpacity="0.5" />
      </radialGradient>
    </defs>
  )
}

function SeaBg({ p }) {
  return (
    <g>
      <rect x="0" y="0" width="720" height="560" fill={`url(#${p}Water)`} />
      {/* קרני אור */}
      <polygon points="120,0 220,0 160,400" fill="#e0f2fe" opacity="0.1" />
      <polygon points="420,0 540,0 460,420" fill="#e0f2fe" opacity="0.08" />
      {/* בועות */}
      {[[80, 300, 8], [110, 200, 5], [640, 350, 9], [670, 220, 6], [380, 160, 5]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="none" stroke="#e0f2fe" strokeWidth="2.5" opacity="0.5" className={i % 2 ? 'anim-bob' : 'anim-swim'} />
      ))}
      <rect x="0" y="560" width="720" height="140" fill={`url(#${p}Sand)`} />
      <path d="M0 560 Q180 548 360 562 Q540 576 720 556 L720 570 L0 570 Z" fill="#8a6a2c" opacity="0.6" />
    </g>
  )
}

function ClownFish({ x, y, cls }) {
  return (
    <g className={cls}>
      <ellipse cx={x} cy={y} rx="22" ry="13" fill="#fb923c" stroke="#c2410c" strokeWidth="2.5" />
      <path d={`M${x - 20} ${y} L${x - 34} ${y - 10} L${x - 34} ${y + 10} Z`} fill="#fb923c" stroke="#c2410c" strokeWidth="2.5" />
      <rect x={x - 7} y={y - 13} width="7" height="26" rx="3" fill="#fff" stroke="#c2410c" strokeWidth="1.5" />
      <rect x={x + 8} y={y - 11} width="6" height="22" rx="3" fill="#fff" stroke="#c2410c" strokeWidth="1.5" />
      <circle cx={x + 14} cy={y - 3} r="2.5" fill="#1c1917" />
    </g>
  )
}

function Shell({ x, y }) {
  return (
    <g>
      <path d={`M${x - 16} ${y} Q${x} ${y - 24} ${x + 16} ${y} Q${x} ${y + 8} ${x - 16} ${y} Z`} fill="#fda4af" stroke="#be123c" strokeWidth="2.5" />
      <path d={`M${x} ${y - 20} L${x} ${y + 2} M${x - 9} ${y - 14} L${x - 4} ${y + 2} M${x + 9} ${y - 14} L${x + 4} ${y + 2}`} stroke="#be123c" strokeWidth="1.8" />
    </g>
  )
}

/* ============ מבט 1: שונית האלמוגים ============ */
export function ReefScene({ flags, fx, setup }) {
  return (
    <g>
      <SeaDefs p="sr" />
      <SeaBg p="sr" />

      {/* אלמוגים */}
      <g>
        <path d="M60 560 Q55 480 85 470 Q80 520 100 515 Q95 470 120 465 Q125 520 110 560 Z" fill="#f472b6" stroke="#9d174d" strokeWidth="3.5" />
        <path d="M620 560 Q610 490 640 480 Q638 525 660 515 Q658 480 685 485 Q690 530 670 560 Z" fill="#a78bfa" stroke="#6d28d9" strokeWidth="3.5" />
        {[540, 570, 596].map((x, i) => (
          <line key={x} x1={x} y1="560" x2={x + (i - 1) * 10} y2={505 - i * 8} stroke="#22d3ee" strokeWidth="7" strokeLinecap="round" className={i === 1 ? 'anim-swim' : ''} />
        ))}
      </g>

      {/* דגי הליצן - לספור! */}
      <g className={hit(fx, 'clowns', 'anim-wiggle')}>
        {CLOWN_POOL.slice(0, setup.clownfish).map((c, i) => (
          <ClownFish key={i} x={c.x} y={c.y} cls={i % 2 ? 'anim-swim' : 'anim-swim-b'} />
        ))}
      </g>

      {/* הקלשון תקוע בסלע */}
      <g className={hit(fx, 'tridentRock', 'anim-wiggle')}>
        <path d="M280 660 Q265 580 330 568 Q400 560 410 630 Q415 668 370 672 Z" fill="#57534e" stroke="#292524" strokeWidth="4" />
        {!flags.gotTrident && (
          <g transform={flags.pull2 ? 'rotate(-12 340 600)' : flags.pull1 ? 'rotate(-6 340 600)' : undefined}>
            <line x1="340" y1="600" x2="370" y2="470" stroke="#c9a04e" strokeWidth="9" strokeLinecap="round" />
            <path d="M352 480 L352 448 M370 474 L370 442 M388 480 L388 448 M352 462 Q370 452 388 462" stroke="#c9a04e" strokeWidth="7" fill="none" strokeLinecap="round" />
          </g>
        )}
      </g>

      {/* שושנת ים - הפרח של הים */}
      <g className={hit(fx, 'anemone', 'anim-wiggle')}>
        {[0, 30, 60, 90, 120, 150, 180].map((a) => (
          <line key={a} x1="170" y1="555" x2={170 + 32 * Math.cos(((a + 180) * Math.PI) / 180)} y2={555 + 32 * Math.sin(((a + 180) * Math.PI) / 180)} stroke="#f472b6" strokeWidth="6" strokeLinecap="round" className="anim-swim" />
        ))}
        <circle cx="170" cy="555" r="13" fill="#fbbf24" stroke="#b45309" strokeWidth="3" />
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#srVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 2: רחוב העיר ============ */
export function StreetScene({ flags, fx, setup }) {
  return (
    <g>
      <SeaDefs p="ss" />
      <SeaBg p="ss" />

      {/* בתי דגים - אמפורות */}
      <g className={hit(fx, 'houses', 'anim-wiggle')}>
        {[[110, 470, '#0891b2'], [240, 450, '#7c3aed'], [600, 460, '#0d9488']].map(([x, y, c], i) => (
          <g key={i}>
            <path d={`M${x - 45} 560 Q${x - 50} ${y} ${x} ${y - 20} Q${x + 50} ${y} ${x + 45} 560 Z`} fill={c} stroke="#083344" strokeWidth="4" opacity="0.9" />
            <circle cx={x} cy={y + 40} r="16" fill="#082f49" />
            <circle cx={x - 22} cy={y + 75} r="8" fill="#082f49" />
          </g>
        ))}
      </g>

      {/* המכונית השקועה */}
      <g className={hit(fx, 'car', 'anim-wiggle')}>
        <g transform="rotate(-8 430 600)">
          <rect x="360" y="580" width="150" height="42" rx="14" fill="#dc2626" stroke="#7f1d1d" strokeWidth="4" />
          <path d="M385 580 Q395 550 425 550 Q465 550 475 580 Z" fill="#dc2626" stroke="#7f1d1d" strokeWidth="4" />
          <rect x="400" y="556" width="28" height="22" rx="5" fill="#bae6fd" stroke="#7f1d1d" strokeWidth="2.5" />
          <circle cx="390" cy="624" r="14" fill="#292524" stroke="#0c0a09" strokeWidth="3" />
          <circle cx="480" cy="624" r="14" fill="#292524" stroke="#0c0a09" strokeWidth="3" />
          <path d="M368 596 Q356 588 360 578" stroke="#7dd3fc" strokeWidth="3" fill="none" opacity="0.7" />
        </g>
      </g>

      {/* מזרקת הזרמים - מנעול הספירה. כשהיא עובדת, הזרם במערת הרשת נעצר */}
      <g className={hit(fx, 'fountain', 'anim-wiggle')}>
        <ellipse cx="360" cy="470" rx="85" ry="20" fill="#57534e" stroke="#292524" strokeWidth="4" />
        <rect x="330" y="360" width="60" height="100" rx="10" fill="#78716c" stroke="#292524" strokeWidth="4" />
        <rect x="322" y="398" width="76" height="34" rx="7" fill="#a8a29e" stroke="#292524" strokeWidth="3" />
        <text x="360" y="422" fontSize="17" textAnchor="middle">🐠🐚⭐</text>
        {!flags.currentOff && <circle cx="360" cy="380" r="15" fill="#1c1917" stroke="#7dd3fc" strokeWidth="3.5" className="anim-glowfade" />}
        {flags.currentOff && (
          <g className="animate-pop">
            <path d="M360 360 Q340 300 360 260 Q380 300 360 360" fill="#7dd3fc" opacity="0.7" className="anim-glowfade" />
            <circle cx="360" cy="250" r="10" fill="#e0f2fe" opacity="0.8" className="anim-bob" />
          </g>
        )}
      </g>

      {/* צדפים - לספור! */}
      <g className={hit(fx, 'shells', 'anim-wiggle')}>
        {SHELL_POOL.slice(0, setup.shells).map((s, i) => (
          <Shell key={i} x={s.x} y={s.y} />
        ))}
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#ssVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 3: ארמון הפנינה ============ */
export function PalaceScene({ flags, fx, setup }) {
  return (
    <g>
      <SeaDefs p="sp" />
      <SeaBg p="sp" />

      {/* הארמון */}
      <g>
        <rect x="180" y="240" width="360" height="200" rx="14" fill="#67e8f9" opacity="0.35" stroke="#0e7490" strokeWidth="5" />
        {[240, 360, 480].map((x) => (
          <g key={x}>
            <rect x={x - 16} y="140" width="32" height="110" rx="8" fill="#67e8f9" opacity="0.5" stroke="#0e7490" strokeWidth="4" />
            <path d={`M${x - 24} 140 L${x} 108 L${x + 24} 140 Z`} fill="#f0abfc" stroke="#a21caf" strokeWidth="3.5" />
          </g>
        ))}
      </g>

      {/* הצדפה הענקית עם הפנינה */}
      <g className={hit(fx, 'clam', 'anim-wiggle')}>
        <path d="M240 620 Q240 560 320 555 Q400 560 400 620 Q320 645 240 620 Z" fill="#f9a8d4" stroke="#9d174d" strokeWidth="4.5" />
        {!flags.clamOpen && (
          <path d="M240 618 Q240 560 320 552 Q400 560 400 618 Q320 570 240 618 Z" fill="#fda4af" stroke="#9d174d" strokeWidth="4.5" />
        )}
        {flags.clamOpen && (
          <g className="animate-pop">
            <path d="M244 600 Q230 520 320 505 Q410 520 396 600 Q320 560 244 600 Z" fill="#fda4af" stroke="#9d174d" strokeWidth="4.5" />
            {!flags.gotPearl && (
              <g>
                <circle cx="320" cy="595" r="45" fill="url(#spPearlGlow)" className="anim-glowfade" />
                <circle cx="320" cy="598" r="18" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="3" style={{ animation: 'twinkle 1.6s ease-in-out infinite' }} />
              </g>
            )}
          </g>
        )}
      </g>

      {/* עוגב האלמוגים */}
      <g className={hit(fx, 'organ', 'anim-wiggle')}>
        <rect x="480" y="420" width="180" height="160" rx="12" fill="#7c3aed" opacity="0.85" stroke="#4c1d95" strokeWidth="4.5" />
        {[500, 530, 560, 590, 620].map((x, i) => (
          <rect key={x} x={x} y={355 - i % 3 * 18} width="22" height={70 + (i % 3) * 18} rx="9" fill="#a78bfa" stroke="#4c1d95" strokeWidth="3.5" />
        ))}
        {flags.organDone && <text x="570" y="340" fontSize="24" textAnchor="middle" className="animate-floaty">🎶🫧</text>}
        {!flags.organDone && <circle cx="570" cy="500" r="40" fill="#e0f2fe" opacity="0.15" className="anim-glowfade" />}
        {/* אבן הלב - מתגלה כשהעוגב מנגן */}
        {flags.organDone && !flags.gotHeart && (
          <path d="M570 470 c-8,-14 -28,-8 -28,6 c0,12 28,26 28,26 c0,0 28,-14 28,-26 c0,-14 -20,-20 -28,-6" fill="#ef4444" stroke="#fda4af" strokeWidth="4" className="anim-risepop" style={{ animation: 'twinkle 1.5s ease-in-out infinite' }} />
        )}
      </g>

      {/* כוכבי ים - לספור! */}
      <g className={hit(fx, 'stars', 'anim-wiggle')}>
        {STARFISH_POOL.slice(0, setup.starfish).map((s, i) => (
          <polygon key={i} points={starPts(s.x, s.y, 20, 9)} fill={s.c} stroke="#00000033" strokeWidth="2.5" />
        ))}
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#spVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 4: מערת הרשת ============ */
export function NetCaveScene({ flags, fx }) {
  const ninja = HEROES.ninja
  return (
    <g>
      <SeaDefs p="sn" />
      <SeaBg p="sn" />
      {/* כהות מערה */}
      <rect x="0" y="0" width="720" height="700" fill="#082f49" opacity="0.45" />
      <path d="M0 0 Q60 200 0 420 Z" fill="#0c4a6e" />
      <path d="M720 0 Q660 220 720 460 Z" fill="#0c4a6e" />

      {/* זרם המערבולת שחוסם - נעלם כשהמזרקה עובדת */}
      {!flags.currentOff && (
        <g className={hit(fx, 'current', 'anim-wiggle')}>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${160 + i * 40} 100 Q${240 + i * 40} 250 ${160 + i * 40} 420 Q${100 + i * 40} 540 ${180 + i * 40} 660`} stroke="#7dd3fc" strokeWidth="13" fill="none" opacity="0.55" strokeLinecap="round" className={i === 1 ? 'anim-swim' : 'anim-swim-b'} />
          ))}
          <text x="240" y="80" fontSize="22" textAnchor="middle" fill="#bae6fd" fontWeight="bold">🌀 זרם חזק!</text>
        </g>
      )}

      {/* הרשת עם נינג'ה */}
      <g className={hit(fx, 'net', 'anim-wiggle')} opacity={flags.currentOff ? 1 : 0.45}>
        <line x1="440" y1="60" x2="440" y2="180" stroke="#a8a29e" strokeWidth="5" />
        <ellipse cx="440" cy="330" rx="140" ry="155" fill="none" stroke="#d6d3d1" strokeWidth="4" opacity={flags.ninjaFreed ? 0.25 : 1} />
        {!flags.ninjaFreed && (
          <g>
            {[-100, -50, 0, 50, 100].map((dx) => (
              <path key={dx} d={`M${440 + dx} 185 Q${440 + dx * 1.15} 330 ${440 + dx} 478`} stroke="#d6d3d1" strokeWidth="3" fill="none" />
            ))}
            {[230, 290, 350, 410].map((y) => (
              <path key={y} d={`M310 ${y} Q440 ${y + 25} 570 ${y}`} stroke="#d6d3d1" strokeWidth="3" fill="none" />
            ))}
            {/* קשר המילים */}
            <circle cx="440" cy="490" r="26" fill="#78716c" stroke="#44403c" strokeWidth="4" className={flags.knotDone ? '' : 'anim-glowfade'} />
            <text x="440" y="499" fontSize="20" textAnchor="middle">{flags.knotDone ? '✓' : '🪢'}</text>
            {/* מנעול שני האוצרות - פנינה ולב */}
            {flags.knotDone && (
              <g className="animate-pop">
                <rect x="392" y="520" width="96" height="40" rx="10" fill="#0e7490" stroke="#083344" strokeWidth="4" />
                <circle cx="418" cy="540" r="11" fill={flags.pearlSet ? '#f0f9ff' : '#1c1917'} stroke="#e0f2fe" strokeWidth="3" className={flags.pearlSet ? '' : 'anim-glowfade'} />
                <path d="M462 533 c-3,-6 -12,-3 -12,3 c0,5 12,11 12,11 c0,0 12,-6 12,-11 c0,-6 -9,-9 -12,-3" fill={flags.heartSet ? '#ef4444' : '#1c1917'} stroke="#fda4af" strokeWidth="2.5" className={flags.heartSet ? '' : 'anim-glowfade'} />
              </g>
            )}
          </g>
        )}
        <svg x="385" y="270" width="110" height="110" viewBox="0 0 100 100">
          <Brawler b={ninja} dimmed={!flags.ninjaFreed} />
        </svg>
        {!flags.ninjaFreed && flags.currentOff && <text x="440" y="240" fontSize="16" textAnchor="middle" fill="#bae6fd" fontWeight="bold">HELP!</text>}
        {flags.ninjaFreed && <text x="440" y="230" fontSize="28" textAnchor="middle" className="animate-bigpop">✴️💨</text>}
      </g>

      {/* הסרטן החותך - חבר */}
      <g className={hit(fx, 'crab', 'anim-wiggle')}>
        <ellipse cx="620" cy="620" rx="30" ry="20" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3.5" />
        <circle cx="610" cy="602" r="5" fill="#fff" /><circle cx="610" cy="602" r="2.5" fill="#1c1917" />
        <circle cx="630" cy="602" r="5" fill="#fff" /><circle cx="630" cy="602" r="2.5" fill="#1c1917" />
        <path d="M592 612 Q570 600 574 584 M578 594 L586 588" stroke="#7f1d1d" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M648 612 Q670 600 666 584 M662 594 L654 588" stroke="#7f1d1d" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>

      {/* מערבולת היציאה */}
      <g className={hit(fx, 'whirlpool', 'anim-wiggle')}>
        {flags.ninjaFreed && !flags.doorOpen && (
          <g>
            <rect x="70" y="440" width="150" height="220" rx="16" fill="none" stroke="#ffe066" strokeWidth="6" className="anim-glowfade" />
            <text x="145" y="425" fontSize="26" textAnchor="middle" className="animate-floaty">⬇️</text>
          </g>
        )}
        <g className="anim-bob">
          <path d="M100 640 Q90 560 145 545 Q205 535 200 600 Q196 650 145 655 Q112 656 108 620 Q106 590 140 588 Q165 588 162 615" fill="none" stroke={flags.doorOpen ? '#fde047' : '#7dd3fc'} strokeWidth="10" strokeLinecap="round" opacity="0.85" />
        </g>
        {flags.doorOpen && <circle cx="148" cy="600" r="55" fill="#fde047" opacity="0.35" className="anim-glowfade" />}
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#snVin)" pointerEvents="none" />
    </g>
  )
}
