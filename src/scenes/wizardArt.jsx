// האמנות של מגדל הקוסם - 3 מבטים: ספריית הלחשים, חדר השיקויים, פסגת המגדל
import Brawler from '../components/Brawler.jsx'
import { HEROES } from '../data/heroes.js'

const hit = (fx, id, anim) => (fx?.id === id ? `tb ${anim}` : '')

function starPts(cx, cy, R, r) {
  const pts = []
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? R : r
    const a = (Math.PI / 5) * i - Math.PI / 2
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`)
  }
  return pts.join(' ')
}

// קיר אבנים של מגדל
function StoneWalls({ p }) {
  return (
    <g>
      <rect x="0" y="0" width="720" height="520" fill={`url(#${p}Stone)`} />
      {[0, 1, 2, 3, 4, 5, 6].map((row) => (
        <g key={row}>
          <line x1="0" y1={row * 75} x2="720" y2={row * 75} stroke="#241b2e" strokeWidth="5" opacity="0.7" />
          {[0, 1, 2, 3, 4].map((c) => (
            <line
              key={c}
              x1={(row % 2 ? 80 : 150) + c * 160}
              y1={row * 75}
              x2={(row % 2 ? 80 : 150) + c * 160}
              y2={row * 75 + 75}
              stroke="#241b2e"
              strokeWidth="4"
              opacity="0.55"
            />
          ))}
        </g>
      ))}
      <rect x="0" y="520" width="720" height="180" fill={`url(#${p}Floor)`} />
      <rect x="0" y="516" width="720" height="8" fill="#1a1322" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={i * 145 - 20} y1="700" x2={60 + i * 122} y2="520" stroke="#241b2e" strokeWidth="3" opacity="0.5" />
      ))}
    </g>
  )
}

function WizDefs({ p }) {
  return (
    <defs>
      <linearGradient id={`${p}Stone`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#514063" />
        <stop offset="1" stopColor="#352844" />
      </linearGradient>
      <linearGradient id={`${p}Floor`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5d4a72" />
        <stop offset="1" stopColor="#3d2f4e" />
      </linearGradient>
      <linearGradient id={`${p}Wood`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6b4423" />
        <stop offset="1" stopColor="#452a10" />
      </linearGradient>
      <linearGradient id={`${p}Night`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0b1e3a" />
        <stop offset="1" stopColor="#1e1147" />
      </linearGradient>
      <radialGradient id={`${p}Glow`}>
        <stop offset="0" stopColor="#c084fc" stopOpacity="0.6" />
        <stop offset="1" stopColor="#c084fc" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${p}Vin`}>
        <stop offset="0.55" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.45" />
      </radialGradient>
    </defs>
  )
}

/* ============ מבט 1: ספריית הלחשים ============ */
export function LibraryScene({ flags, fx }) {
  return (
    <g>
      <WizDefs p="wl" />
      <StoneWalls p="wl" />

      {/* חלון עם ירח */}
      <g className={hit(fx, 'moonWindow', 'anim-wiggle')}>
        <path d="M540 70 L540 230 L680 230 L680 70 Q610 30 540 70 Z" fill="#1a1322" />
        <path d="M550 80 L550 220 L670 220 L670 80 Q610 46 550 80 Z" fill="url(#wlNight)" />
        <circle cx="628" cy="120" r="26" fill="#fef3c7" />
        <circle cx="618" cy="112" r="5" fill="#fde68a" opacity="0.7" />
        <circle cx="580" cy="170" r="2.5" fill="#fff" style={{ animation: 'twinkle 2.2s ease-in-out infinite' }} />
        <circle cx="650" cy="185" r="2" fill="#fff" style={{ animation: 'twinkle 2.8s ease-in-out 0.8s infinite' }} />
      </g>

      {/* מדפי ספרים */}
      <g>
        <rect x="52" y="66" width="220" height="330" rx="8" fill="url(#wlWood)" stroke="#241b2e" strokeWidth="5" />
        {[130, 230, 330].map((y) => (
          <rect key={y} x="60" y={y} width="204" height="10" fill="#241b2e" />
        ))}
        {[[70, 88, '#c0392b'], [100, 82, '#2e86c1'], [128, 92, '#27ae60'], [160, 84, '#8e44ad'], [192, 90, '#d68910'], [224, 86, '#c0392b'],
          [70, 188, '#27ae60'], [102, 182, '#d68910'], [134, 192, '#2e86c1'], [168, 184, '#c0392b'], [200, 190, '#8e44ad'],
          [70, 288, '#8e44ad'], [104, 282, '#c0392b'], [138, 292, '#27ae60'], [172, 284, '#2e86c1'], [206, 290, '#d68910']].map(([x, y, c], i) => (
          <rect key={i} x={x} y={y} width="26" height={130 - (y % 100)} rx="3" fill={c} stroke="#241b2e" strokeWidth="2.5" opacity="0.9" />
        ))}
      </g>

      {/* ספר הלחשים על מעמד */}
      <g className={hit(fx, 'book', 'anim-wiggle')}>
        <ellipse cx="380" cy="380" rx="90" ry="60" fill="url(#wlGlow)" className="anim-glowfade" />
        <rect x="360" y="360" width="40" height="150" fill="url(#wlWood)" stroke="#241b2e" strokeWidth="4" />
        <ellipse cx="380" cy="512" rx="55" ry="14" fill="url(#wlWood)" stroke="#241b2e" strokeWidth="3" />
        {!flags.bookOpen && (
          <g transform="rotate(-8 380 330)">
            <rect x="308" y="290" width="144" height="86" rx="10" fill="#7c3aed" stroke="#4c1d95" strokeWidth="5" />
            <rect x="322" y="304" width="116" height="58" rx="6" fill="none" stroke="#fbbf24" strokeWidth="3.5" />
            {/* חריטות חיות על הכריכה */}
            <circle cx="352" cy="333" r="11" fill="none" stroke="#fbbf24" strokeWidth="3" />
            <path d="M346 325 L343 316 M358 325 L361 316" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
            <path d="M394 340 Q404 322 416 332 Q408 342 394 340 Z" fill="#fbbf24" opacity="0.9" />
            <circle cx="380" cy="333" r="4" fill="#fbbf24" style={{ animation: 'twinkle 1.4s ease-in-out infinite' }} />
          </g>
        )}
        {flags.bookOpen && (
          <g transform="rotate(-8 380 330)" className="animate-pop">
            <path d="M306 300 Q380 274 454 300 L454 366 Q380 342 306 366 Z" fill="#fef3c7" stroke="#b39257" strokeWidth="4" />
            <line x1="380" y1="282" x2="380" y2="352" stroke="#b39257" strokeWidth="3" />
            <text x="345" y="330" fontSize="22" textAnchor="middle">🐰</text>
            <text x="415" y="330" fontSize="22" textAnchor="middle">🦆</text>
          </g>
        )}
      </g>

      {/* האח עם המטבע באפר */}
      <g className={hit(fx, 'fireplace', 'anim-wiggle')}>
        <path d="M480 660 L480 480 Q560 440 640 480 L640 660 Z" fill="#3d2f4e" stroke="#241b2e" strokeWidth="5" />
        <path d="M498 660 L498 500 Q560 468 622 500 L622 660 Z" fill="#1a1322" />
        <ellipse cx="560" cy="648" rx="55" ry="12" fill="#4b4b55" />
        <path d="M530 640 Q524 600 548 588 Q542 616 560 620 Q556 596 576 590 Q590 612 578 640 Q560 652 530 640 Z" fill="#f97316" className="anim-flicker" />
        <path d="M544 636 Q542 614 558 606 Q566 622 558 636 Q550 642 544 636 Z" fill="#fbbf24" className="anim-flicker" />
        {flags.coinOut && !flags.gotCoin && (
          <g className="anim-risepop">
            <circle cx="606" cy="636" r="13" fill="#fbbf24" stroke="#b45309" strokeWidth="3.5" style={{ animation: 'twinkle 1.5s ease-in-out infinite' }} />
            <text x="606" y="642" fontSize="14" textAnchor="middle" fill="#b45309" fontWeight="bold">★</text>
          </g>
        )}
      </g>

      {/* המטאטא בפינה */}
      {!flags.gotBroom && (
        <g className={hit(fx, 'broom', 'anim-wiggle')}>
          <line x1="670" y1="380" x2="640" y2="600" stroke="#b98a4e" strokeWidth="9" strokeLinecap="round" />
          <path d="M640 600 L610 668 L668 668 Z" fill="#d68910" stroke="#92600a" strokeWidth="3" />
          {[622, 634, 646, 658].map((x) => (
            <line key={x} x1={x + 6} y1="614" x2={x} y2="666" stroke="#92600a" strokeWidth="3" />
          ))}
        </g>
      )}

      {/* חתול ישן - סתם חמוד */}
      <g className={hit(fx, 'cat', 'anim-wiggle')}>
        <ellipse cx="150" cy="640" rx="52" ry="26" fill="#334155" stroke="#1e293b" strokeWidth="3.5" />
        <circle cx="190" cy="622" r="20" fill="#334155" stroke="#1e293b" strokeWidth="3.5" />
        <path d="M178 608 L173 594 L186 601 Z" fill="#334155" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M198 606 L204 592 L209 604 Z" fill="#334155" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M182 622 Q186 626 190 622 M196 622 Q200 626 204 622" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M98 648 Q76 660 92 672" stroke="#334155" strokeWidth="8" fill="none" strokeLinecap="round" />
        <text x="222" y="590" fontSize="17" fill="#94a3b8" opacity="0.8">💤</text>
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#wlVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 2: חדר השיקויים ============ */
export function PotionScene({ flags, fx }) {
  return (
    <g>
      <WizDefs p="wp" />
      <StoneWalls p="wp" />

      {/* מדף גבוה עם הלחם */}
      <g className={hit(fx, 'shelf', 'anim-wiggle')}>
        <rect x="420" y="150" width="250" height="14" rx="6" fill="url(#wpWood)" stroke="#241b2e" strokeWidth="3.5" />
        <path d="M440 164 L460 200 M650 164 L630 200" stroke="#452a10" strokeWidth="7" strokeLinecap="round" />
        {!flags.breadDown && (
          <g>
            <ellipse cx="510" cy="134" rx="38" ry="20" fill="#d68910" stroke="#92600a" strokeWidth="3.5" />
            <path d="M482 128 Q510 116 538 128" stroke="#fde68a" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        )}
        <rect x="580" y="106" width="34" height="44" rx="6" fill="#7c3aed" opacity="0.85" stroke="#4c1d95" strokeWidth="3" />
        <rect x="624" y="114" width="28" height="36" rx="6" fill="#0891b2" opacity="0.85" stroke="#155e75" strokeWidth="3" />
      </g>

      {/* הלחם על הרצפה אחרי שהופל */}
      {flags.breadDown && !flags.gotBread && (
        <g className={`anim-risepop ${hit(fx, 'breadFloor', 'anim-wiggle')}`}>
          <ellipse cx="560" cy="640" rx="40" ry="21" fill="#d68910" stroke="#92600a" strokeWidth="3.5" />
          <path d="M530 634 Q560 620 590 634" stroke="#fde68a" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      )}

      {/* הקדירה המבעבעת */}
      <g className={hit(fx, 'cauldron', 'anim-wiggle')}>
        <ellipse cx="230" cy="560" rx="130" ry="30" fill="url(#wpGlow)" className="anim-glowfade" />
        <path d="M120 480 Q120 620 230 620 Q340 620 340 480 Q300 500 230 500 Q160 500 120 480 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="5" />
        <ellipse cx="230" cy="484" rx="110" ry="26" fill={flags.potionDone ? '#c084fc' : '#4ade80'} stroke="#0f172a" strokeWidth="4" />
        <circle cx="190" cy="478" r="9" fill="#fff" opacity="0.5" className="anim-bob" />
        <circle cx="252" cy="482" r="6" fill="#fff" opacity="0.4" className="anim-bob" />
        <circle cx="282" cy="476" r="7" fill="#fff" opacity="0.45" className="anim-swim" />
        <path d="M150 620 L136 668 M310 620 L324 668" stroke="#0f172a" strokeWidth="9" strokeLinecap="round" />
      </g>

      {/* הארונית הנעולה עם החלב */}
      <g className={hit(fx, 'cupboard', 'anim-wiggle')}>
        <rect x="430" y="330" width="190" height="160" rx="10" fill="url(#wpWood)" stroke="#241b2e" strokeWidth="5" />
        {!flags.cupboardOpen && (
          <g>
            <line x1="525" y1="336" x2="525" y2="484" stroke="#241b2e" strokeWidth="4" />
            <path d="M512 400 Q512 388 525 388 Q538 388 538 400" fill="none" stroke="#8d6b34" strokeWidth="5" />
            <rect x="508" y="400" width="34" height="28" rx="6" fill="#fbbf24" stroke="#8d6b34" strokeWidth="3" />
            <circle cx="525" cy="411" r="3.5" fill="#54331a" />
          </g>
        )}
        {flags.cupboardOpen && (
          <g>
            <rect x="440" y="340" width="170" height="140" rx="6" fill="#1a1322" />
            <rect x="614" y="330" width="16" height="160" rx="5" fill="#54331a" stroke="#241b2e" strokeWidth="3" />
            {!flags.gotMilk && (
              <g className="anim-risepop">
                <rect x="500" y="386" width="42" height="70" rx="9" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3.5" />
                <rect x="508" y="372" width="26" height="18" rx="5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
                <rect x="506" y="410" width="30" height="22" rx="4" fill="#3b82f6" />
              </g>
            )}
          </g>
        )}
      </g>

      {/* צנצנות קסם */}
      <g className={hit(fx, 'jars', 'anim-wiggle')}>
        <rect x="66" y="220" width="160" height="12" rx="5" fill="url(#wpWood)" stroke="#241b2e" strokeWidth="3" />
        <ellipse cx="100" cy="192" rx="20" ry="28" fill="#4ade80" opacity="0.75" stroke="#166534" strokeWidth="3" />
        <ellipse cx="150" cy="188" rx="16" ry="32" fill="#f472b6" opacity="0.75" stroke="#9d174d" strokeWidth="3" />
        <ellipse cx="196" cy="194" rx="18" ry="26" fill="#38bdf8" opacity="0.75" stroke="#075985" strokeWidth="3" />
        <circle cx="150" cy="180" r="4" fill="#fff" opacity="0.7" style={{ animation: 'twinkle 1.8s ease-in-out infinite' }} />
      </g>

      {/* חור של עכבר */}
      <g className={hit(fx, 'mousehole', 'anim-wiggle')}>
        <path d="M60 668 Q60 630 92 630 Q124 630 124 668 Z" fill="#1a1322" stroke="#241b2e" strokeWidth="4" />
        <circle cx="92" cy="656" r="3" fill="#fbbf24" style={{ animation: 'twinkle 2.4s ease-in-out infinite' }} />
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#wpVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 3: פסגת המגדל ============ */
export function TowerTopScene({ flags, fx }) {
  const luna = HEROES.luna
  return (
    <g>
      <WizDefs p="wt" />
      {/* שמי לילה פתוחים */}
      <rect x="0" y="0" width="720" height="520" fill="url(#wtNight)" />
      <circle cx="600" cy="110" r="44" fill="#fef3c7" />
      <circle cx="584" cy="98" r="9" fill="#fde68a" opacity="0.7" />
      <circle cx="612" cy="126" r="6" fill="#fde68a" opacity="0.6" />
      {[[80, 60], [180, 100], [300, 50], [420, 90], [500, 40], [120, 160], [260, 140], [380, 170], [480, 150]].map(([x, y], i) => (
        <polygon key={i} points={starPts(x, y, 6, 2.5)} fill="#fde68a" style={{ animation: `twinkle ${2 + (i % 3) * 0.6}s ease-in-out ${i * 0.25}s infinite` }} />
      ))}
      {/* מעקה המגדל */}
      <rect x="0" y="430" width="720" height="26" fill="#514063" stroke="#241b2e" strokeWidth="4" />
      {[40, 140, 240, 340, 440, 540, 640].map((x) => (
        <rect key={x} x={x} y="380" width="34" height="56" fill="#514063" stroke="#241b2e" strokeWidth="4" />
      ))}
      <rect x="0" y="456" width="720" height="64" fill="#3d2f4e" />
      <rect x="0" y="520" width="720" height="180" fill="url(#wtFloor)" />
      <rect x="0" y="516" width="720" height="8" fill="#1a1322" />

      {/* הדלת הקסומה */}
      <g className={hit(fx, 'magicDoor', 'anim-wiggle')}>
        <path d="M540 690 L540 400 Q540 320 620 320 Q700 320 700 400 L700 690 Z" fill="#241b2e" stroke="#1a1322" strokeWidth="5" />
        {!flags.doorOpen && (
          <g>
            <path d="M552 690 L552 405 Q552 334 620 334 Q688 334 688 405 L688 690 Z" fill="url(#wtWood)" stroke="#241b2e" strokeWidth="4" />
            {/* רונות זוהרות */}
            <g fill="none" stroke={flags.lunaFreed ? '#c084fc' : '#4c1d95'} strokeWidth="3.5" strokeLinecap="round" className={flags.lunaFreed ? 'anim-glowfade' : ''}>
              <circle cx="620" cy="420" r="26" />
              <path d="M620 394 L620 446 M600 408 L640 434 M640 408 L600 434" />
              <path d="M578 500 Q590 486 602 500 M638 500 Q650 486 662 500" />
              <circle cx="620" cy="560" r="12" />
            </g>
          </g>
        )}
        {flags.doorOpen && (
          <g className="animate-pop">
            <path d="M552 690 L552 405 Q552 334 620 334 Q688 334 688 405 L688 690 Z" fill="#fef3c7" />
            <path d="M552 690 L552 405 Q552 334 620 334 Q688 334 688 405 L688 690 Z" fill="#c084fc" opacity="0.35" className="anim-glowfade" />
            <polygon points={starPts(620, 470, 22, 9)} fill="#a855f7" opacity="0.8" />
          </g>
        )}
      </g>

      {/* פסל האבן של לונה */}
      <g className={hit(fx, 'statue', 'anim-wiggle')}>
        <rect x="270" y="560" width="180" height="46" rx="10" fill="#514063" stroke="#241b2e" strokeWidth="4" />
        <rect x="292" y="596" width="136" height="30" rx="8" fill="#3d2f4e" stroke="#241b2e" strokeWidth="4" />
        {!flags.lunaFreed && (
          <g>
            <svg x="300" y="440" width="120" height="120" viewBox="0 0 100 100">
              <Brawler b={luna} dimmed />
            </svg>
            <text x="360" y="430" fontSize="17" textAnchor="middle" fill="#c4b5fd" fontWeight="bold">😨 אבן!</text>
          </g>
        )}
        {flags.lunaFreed && (
          <g className="animate-bigpop">
            <polygon points={starPts(320, 500, 14, 6)} fill="#c084fc" style={{ animation: 'twinkle 1.2s ease-in-out infinite' }} />
            <polygon points={starPts(400, 480, 11, 4.5)} fill="#f0abfc" style={{ animation: 'twinkle 1.5s ease-in-out 0.4s infinite' }} />
            <polygon points={starPts(360, 530, 9, 4)} fill="#fde68a" style={{ animation: 'twinkle 1.8s ease-in-out 0.7s infinite' }} />
            <text x="360" y="510" fontSize="20" textAnchor="middle" fill="#e9d5ff" fontWeight="bold">✨ חופשייה! ✨</text>
          </g>
        )}
      </g>

      {/* קן העורב עם הביצה */}
      <g className={hit(fx, 'nest', 'anim-wiggle')}>
        <rect x="60" y="290" width="150" height="16" rx="7" fill="url(#wtWood)" stroke="#241b2e" strokeWidth="3.5" />
        <path d="M92 290 Q100 258 135 258 Q170 258 178 290 Z" fill="#8a5a2e" stroke="#54331a" strokeWidth="4" />
        <path d="M96 280 L120 270 M150 268 L174 280 M110 286 L160 284" stroke="#54331a" strokeWidth="3" strokeLinecap="round" />
        {!flags.gotEgg && (
          <ellipse cx="135" cy="266" rx="15" ry="19" fill="#fef9e7" stroke="#d5c9a8" strokeWidth="3" />
        )}
        {!flags.ravenGone && (
          <g className="anim-bob">
            <ellipse cx="135" cy="228" rx="26" ry="20" fill="#1e1b2e" stroke="#0f0d1a" strokeWidth="3.5" />
            <circle cx="158" cy="214" r="13" fill="#1e1b2e" stroke="#0f0d1a" strokeWidth="3" />
            <path d="M168 212 L184 216 L168 222 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            <circle cx="160" cy="210" r="3.5" fill="#fbbf24" />
            <path d="M112 226 Q102 210 116 204" stroke="#0f0d1a" strokeWidth="4" fill="none" />
          </g>
        )}
      </g>

      {/* עציץ עם המפתח מתחתיו */}
      <g className={hit(fx, 'flowerpot', 'anim-wiggle')}>
        <g transform={flags.potMoved ? 'rotate(-24 130 640)' : undefined}>
          <polygon points="96,596 164,596 152,662 108,662" fill="#c2410c" stroke="#7c2d12" strokeWidth="4" />
          <path d="M118 596 Q112 570 130 562 M130 596 Q130 566 130 560 M142 596 Q148 570 132 562" stroke="#22c55e" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="130" cy="556" r="10" fill="#f472b6" stroke="#9d174d" strokeWidth="3" />
        </g>
        {flags.potMoved && !flags.gotKeySmall && (
          <g className="anim-risepop">
            <circle cx="188" cy="650" r="9" fill="none" stroke="#fbbf24" strokeWidth="5" style={{ animation: 'twinkle 1.5s ease-in-out infinite' }} />
            <rect x="196" y="646" width="20" height="7" fill="#fbbf24" style={{ animation: 'twinkle 1.5s ease-in-out infinite' }} />
          </g>
        )}
      </g>

      {/* טלסקופ - סתם כיף */}
      <g className={hit(fx, 'telescope', 'anim-wiggle')}>
        <line x1="430" y1="380" x2="480" y2="300" stroke="#8d6b34" strokeWidth="14" strokeLinecap="round" />
        <line x1="476" y1="306" x2="496" y2="276" stroke="#5e4620" strokeWidth="10" strokeLinecap="round" />
        <path d="M415 460 L430 380 L448 460" stroke="#54331a" strokeWidth="7" fill="none" strokeLinecap="round" />
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#wtVin)" pointerEvents="none" />
    </g>
  )
}
