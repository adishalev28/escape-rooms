// האמנות של טירת הרוחות - 4 מבטים: אולם הכניסה, הספרייה, המטבח, חדר המראות
import Brawler from '../components/Brawler.jsx'
import { HEROES } from '../data/heroes.js'

const hit = (fx, id, anim) => (fx?.id === id ? `tb ${anim}` : '')

export const BOOK_COLORS = {
  purple: '#8e44ad', white: '#e8e8f0', black: '#1e1e28', brown: '#8a5a2e', red: '#c0392b', green: '#27ae60',
}

function CastleWalls({ p }) {
  return (
    <g>
      <rect x="0" y="0" width="720" height="520" fill={`url(#${p}Wall)`} />
      {[0, 1, 2, 3, 4, 5, 6].map((row) => (
        <g key={row}>
          <line x1="0" y1={row * 78} x2="720" y2={row * 78} stroke="#141824" strokeWidth="4" opacity="0.6" />
          {[0, 1, 2, 3, 4].map((c) => (
            <line key={c} x1={(row % 2 ? 90 : 170) + c * 160} y1={row * 78} x2={(row % 2 ? 90 : 170) + c * 160} y2={row * 78 + 78} stroke="#141824" strokeWidth="3" opacity="0.45" />
          ))}
        </g>
      ))}
      <rect x="0" y="520" width="720" height="180" fill={`url(#${p}Floor)`} />
      <rect x="0" y="516" width="720" height="8" fill="#0d1018" />
      {/* אריחי שחמט */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) =>
        [0, 1].map((j) => (
          <polygon
            key={`${i}${j}`}
            points={`${i * 95 - 30 + j * 45},${700 - j * 90} ${i * 95 + 15 + j * 45},${700 - j * 90} ${i * 95 + 32 + j * 40},${610 - j * 45} ${i * 95 - 8 + j * 40},${610 - j * 45}`}
            fill={(i + j) % 2 ? '#1a1f2e' : '#2a3040'}
            opacity="0.7"
          />
        ))
      )}
    </g>
  )
}

function GhostDefs({ p }) {
  return (
    <defs>
      <linearGradient id={`${p}Wall`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2e3448" />
        <stop offset="1" stopColor="#1a1f2e" />
      </linearGradient>
      <linearGradient id={`${p}Floor`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#343b52" />
        <stop offset="1" stopColor="#20263a" />
      </linearGradient>
      <linearGradient id={`${p}Wood`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5b4023" />
        <stop offset="1" stopColor="#3a2812" />
      </linearGradient>
      <radialGradient id={`${p}Candle`}>
        <stop offset="0" stopColor="#ffd58a" stopOpacity="0.45" />
        <stop offset="1" stopColor="#ffd58a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${p}Vin`}>
        <stop offset="0.5" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.5" />
      </radialGradient>
    </defs>
  )
}

// רוח קטנה ידידותית
function Ghost({ x, y, s = 1, cls = '' }) {
  return (
    <g className={cls} opacity="0.92">
      <path d={`M${x - 30 * s} ${y + 25 * s} Q${x - 32 * s} ${y - 30 * s} ${x} ${y - 32 * s} Q${x + 32 * s} ${y - 30 * s} ${x + 30 * s} ${y + 25 * s} L${x + 20 * s} ${y + 16 * s} L${x + 10 * s} ${y + 26 * s} L${x} ${y + 16 * s} L${x - 10 * s} ${y + 26 * s} L${x - 20 * s} ${y + 16 * s} Z`} fill="#dfe6f5" stroke="#aab4cc" strokeWidth="3" />
      <circle cx={x - 9 * s} cy={y - 8 * s} r={4 * s} fill="#20263a" />
      <circle cx={x + 9 * s} cy={y - 8 * s} r={4 * s} fill="#20263a" />
      <path d={`M${x - 5 * s} ${y + 3 * s} Q${x} ${y + 8 * s} ${x + 5 * s} ${y + 3 * s}`} stroke="#20263a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  )
}

/* ============ מבט 1: אולם הכניסה ============ */
export function HallScene({ flags, fx }) {
  return (
    <g>
      <GhostDefs p="gh" />
      <CastleWalls p="gh" />

      {/* נברשת */}
      <g className={hit(fx, 'chandelier', 'anim-wiggle')}>
        <line x1="360" y1="0" x2="360" y2="55" stroke="#2b2b33" strokeWidth="5" />
        <path d="M290 85 Q360 55 430 85 Q400 105 360 105 Q320 105 290 85" fill="#3a3a46" stroke="#22222c" strokeWidth="3.5" />
        {[300, 330, 360, 390, 420].map((x) => (
          <g key={x}>
            <rect x={x - 4} y="62" width="8" height="16" rx="3" fill="#f5f0e6" />
            <ellipse cx={x} cy="58" rx="4.5" ry="7" fill="#ffdf6b" className="anim-flicker" />
          </g>
        ))}
        <circle cx="360" cy="70" r="90" fill="url(#ghCandle)" className="anim-flicker" />
      </g>

      {/* שעון הסבא - לוח מקשים קסום */}
      <g className={hit(fx, 'clock', 'anim-wiggle')}>
        <rect x="80" y="190" width="150" height="420" rx="14" fill="url(#ghWood)" stroke="#241505" strokeWidth="5" />
        <circle cx="155" cy="272" r="56" fill="#f5f0e6" stroke="#241505" strokeWidth="5" />
        {[0, 90, 180, 270].map((a) => (
          <circle key={a} cx={155 + 44 * Math.cos((a * Math.PI) / 180)} cy={272 + 44 * Math.sin((a * Math.PI) / 180)} r="3.5" fill="#3a2812" />
        ))}
        <line x1="155" y1="272" x2="155" y2="238" stroke="#3a2812" strokeWidth="5" strokeLinecap="round" transform="rotate(137 155 272)" />
        <line x1="155" y1="272" x2="182" y2="272" stroke="#3a2812" strokeWidth="4" strokeLinecap="round" transform="rotate(65 155 272)" />
        {!flags.clockOpen && (
          <g>
            <rect x="108" y="360" width="94" height="200" rx="10" fill="#241505" />
            <line x1="155" y1="380" x2="155" y2="480" stroke="#8d6b34" strokeWidth="6" strokeLinecap="round" className="anim-bob" />
            <circle cx="155" cy="490" r="16" fill="#c9a04e" stroke="#8d6b34" strokeWidth="4" className="anim-bob" />
            <rect x="122" y="524" width="66" height="22" rx="6" fill="#c9a04e" opacity="0.85" className="anim-glowfade" />
            <text x="155" y="540" fontSize="14" textAnchor="middle" fill="#3a2812" fontWeight="bold">? ? ?</text>
          </g>
        )}
        {flags.clockOpen && (
          <g>
            <rect x="108" y="360" width="94" height="200" rx="10" fill="#0d0a06" />
            <rect x="196" y="360" width="14" height="200" rx="5" fill="#3a2812" transform="rotate(6 200 360)" />
            {!flags.gotBrassKey && (
              <g className="anim-risepop" style={{ animation: 'twinkle 1.6s ease-in-out infinite' }}>
                <circle cx="140" cy="470" r="9" fill="none" stroke="#c9a04e" strokeWidth="5" />
                <rect x="147" y="466" width="24" height="7" rx="3" fill="#c9a04e" />
              </g>
            )}
          </g>
        )}
      </g>

      {/* דיוקנאות עם עיניים */}
      <g className={hit(fx, 'portrait', 'anim-wiggle')}>
        <rect x="300" y="160" width="120" height="150" rx="6" fill="#3a2812" stroke="#c9a04e" strokeWidth="6" />
        <rect x="312" y="172" width="96" height="126" fill="#4a3550" />
        <circle cx="360" cy="215" r="26" fill="#d9c2a8" />
        <circle cx="351" cy="210" r="4" fill="#20263a" className="anim-swim" />
        <circle cx="369" cy="210" r="4" fill="#20263a" className="anim-swim" />
        <path d="M352 226 Q360 231 368 226" stroke="#8a6f57" strokeWidth="2.5" fill="none" />
        <rect x="330" y="245" width="60" height="50" rx="8" fill="#5b2333" />
      </g>

      {/* שריון אביר */}
      <g className={hit(fx, 'armor', 'anim-wiggle')}>
        <ellipse cx="560" cy="655" rx="62" ry="14" fill="#141824" />
        <rect x="530" y="440" width="60" height="130" rx="18" fill="#8b95ab" stroke="#4b5568" strokeWidth="4" />
        <circle cx="560" cy="405" r="32" fill="#8b95ab" stroke="#4b5568" strokeWidth="4" />
        <rect x="536" y="398" width="48" height="10" rx="4" fill="#4b5568" />
        <path d="M560 373 L560 352 L576 362 Z" fill="#c0392b" stroke="#7c2d12" strokeWidth="2.5" />
        <rect x="514" y="450" width="18" height="90" rx="8" fill="#8b95ab" stroke="#4b5568" strokeWidth="3.5" />
        <rect x="588" y="450" width="18" height="90" rx="8" fill="#8b95ab" stroke="#4b5568" strokeWidth="3.5" />
        <rect x="538" y="568" width="18" height="80" rx="7" fill="#8b95ab" stroke="#4b5568" strokeWidth="3.5" />
        <rect x="564" y="568" width="18" height="80" rx="7" fill="#8b95ab" stroke="#4b5568" strokeWidth="3.5" />
        <line x1="620" y1="380" x2="620" y2="620" stroke="#4b5568" strokeWidth="7" strokeLinecap="round" />
        <polygon points="620,355 610,385 630,385" fill="#c8d2e8" stroke="#4b5568" strokeWidth="3" />
      </g>

      {/* הרוח המדריכה מרחפת */}
      <Ghost x={420} y={430} s={1.1} cls="anim-bob" />

      <rect x="0" y="0" width="720" height="700" fill="url(#ghVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 2: הספרייה ============ */
export function GhostLibraryScene({ flags, fx, setup }) {
  const bookOrder = ['purple', 'white', 'black', 'brown', 'red', 'green']
  return (
    <g>
      <GhostDefs p="gl" />
      <CastleWalls p="gl" />

      {/* ספרים מרחפים */}
      <g>
        <g className="anim-bob"><rect x="180" y="120" width="52" height="14" rx="4" fill="#8e44ad" transform="rotate(-8 200 127)" /></g>
        <g className="anim-swim"><rect x="470" y="90" width="46" height="13" rx="4" fill="#27ae60" transform="rotate(6 490 97)" /></g>
        <g className="anim-bob"><rect x="580" y="150" width="50" height="14" rx="4" fill="#c0392b" transform="rotate(-5 600 157)" /></g>
      </g>

      {/* כוננית הספרים הצבעוניים - חידת ההקשבה! */}
      <g>
        <rect x="150" y="200" width="420" height="230" rx="10" fill="url(#glWood)" stroke="#241505" strokeWidth="5" />
        <rect x="165" y="222" width="390" height="14" fill="#241505" opacity="0.6" />
        {/* מדף עליון - ספרי נוי */}
        {[180, 225, 270, 315, 360, 405, 450, 495].map((x, i) => (
          <rect key={i} x={x} y="240" width="34" height="70" rx="4" fill={['#57606f', '#6d5a48', '#4a3550', '#5b4a68'][i % 4]} stroke="#241505" strokeWidth="2.5" />
        ))}
        <rect x="165" y="312" width="390" height="14" fill="#241505" opacity="0.6" />
        {/* המדף התחתון - 6 הספרים הצבעוניים הגדולים */}
        {bookOrder.map((c, i) => (
          <g key={c} className={hit(fx, 'book-' + c, 'anim-wiggle')}>
            <rect x={178 + i * 62} y="330" width="48" height="92" rx="5" fill={BOOK_COLORS[c]} stroke="#141824" strokeWidth="3.5"
              className={flags.bookFound && setup.bookColor === c ? 'anim-glowfade' : ''} />
            <line x1={186 + i * 62} y1="344" x2={218 + i * 62} y2="344" stroke={c === 'black' ? '#4a4a5a' : '#141824'} strokeWidth="3" opacity="0.6" />
          </g>
        ))}
      </g>

      {/* התא הסודי עם המברשת */}
      {flags.bookFound && (
        <g className={`animate-pop ${hit(fx, 'niche', 'anim-wiggle')}`}>
          <rect x="300" y="440" width="120" height="60" rx="8" fill="#0d0a06" stroke="#c9a04e" strokeWidth="4" />
          {!flags.gotBrush && (
            <g style={{ animation: 'twinkle 1.6s ease-in-out infinite' }}>
              <line x1="330" y1="482" x2="380" y2="462" stroke="#8d6b34" strokeWidth="7" strokeLinecap="round" />
              <path d="M380 462 L398 454 L394 470 Z" fill="#e6a23c" stroke="#8d6b34" strokeWidth="2.5" />
            </g>
          )}
        </g>
      )}

      {/* הפסנתר הרדוף */}
      <g className={hit(fx, 'piano', 'anim-wiggle')}>
        <rect x="70" y="520" width="230" height="130" rx="12" fill="#1e1e28" stroke="#0d0a06" strokeWidth="5" />
        <rect x="82" y="538" width="206" height="34" rx="5" fill="#f5f0e6" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <rect key={i} x={92 + i * 22} y="538" width="12" height="20" fill="#1e1e28" />
        ))}
        {flags.pianoDone && <text x="185" y="512" fontSize="24" textAnchor="middle" fill="#ffe066" className="animate-floaty">♪ ♫</text>}
        {!flags.pianoDone && <circle cx="185" cy="555" r="46" fill="#dfe6f5" opacity="0.12" className="anim-glowfade" />}
      </g>

      {/* חור העכבר */}
      <g className={hit(fx, 'mouse', 'anim-wiggle')}>
        <path d="M600 668 Q600 628 636 628 Q672 628 672 668 Z" fill="#0d0a06" stroke="#141824" strokeWidth="4" />
        {!flags.mouseFed && (
          <g className="anim-bob">
            <circle cx="628" cy="652" r="9" fill="#8b8b94" stroke="#5d5d66" strokeWidth="2.5" />
            <circle cx="622" cy="644" r="4" fill="#a8a8b2" stroke="#5d5d66" strokeWidth="2" />
            <circle cx="633" cy="644" r="4" fill="#a8a8b2" stroke="#5d5d66" strokeWidth="2" />
            <circle cx="626" cy="650" r="1.8" fill="#0d0a06" />
            <circle cx="631" cy="650" r="1.8" fill="#0d0a06" />
          </g>
        )}
        {flags.mouseFed && !flags.gotRing && (
          <g className="anim-risepop" style={{ animation: 'twinkle 1.5s ease-in-out infinite' }}>
            <circle cx="590" cy="655" r="11" fill="none" stroke="#c9a04e" strokeWidth="5" />
            <circle cx="590" cy="641" r="5" fill="#7dd3fc" stroke="#0284c7" strokeWidth="2" />
          </g>
        )}
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#glVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 3: המטבח ============ */
export function KitchenScene({ flags, fx }) {
  return (
    <g>
      <GhostDefs p="gk" />
      <CastleWalls p="gk" />

      {/* אח בישול עם קדירה */}
      <g className={hit(fx, 'stove', 'anim-wiggle')}>
        <path d="M90 660 L90 420 Q170 380 250 420 L250 660 Z" fill="#20263a" stroke="#141824" strokeWidth="5" />
        <path d="M108 660 L108 440 Q170 405 232 440 L232 660 Z" fill="#0d0a06" />
        <path d="M140 630 Q135 595 155 585 Q150 610 170 614 Q166 592 186 588 Q198 610 186 632 Q166 644 140 630 Z" fill="#f97316" className="anim-flicker" />
        <ellipse cx="170" cy="588" rx="46" ry="14" fill="#1e1e28" stroke="#0d0a06" strokeWidth="4" />
        <path d="M128 588 Q128 556 170 556 Q212 556 212 588" fill="#2a3040" stroke="#0d0a06" strokeWidth="4" />
        <circle cx="152" cy="548" r="7" fill="#cbd5e1" opacity="0.3" className="anim-bob" />
        <circle cx="182" cy="540" r="5" fill="#cbd5e1" opacity="0.25" className="anim-swim" />
      </g>

      {/* הארונית הנעולה - הגבינה בפנים */}
      <g className={hit(fx, 'cupboard', 'anim-wiggle')}>
        <rect x="440" y="330" width="200" height="170" rx="10" fill="url(#gkWood)" stroke="#241505" strokeWidth="5" />
        {!flags.cupboardOpen && (
          <g>
            <line x1="540" y1="336" x2="540" y2="494" stroke="#241505" strokeWidth="4" />
            <circle cx="540" cy="412" r="15" fill="#c9a04e" stroke="#8d6b34" strokeWidth="4" />
            <circle cx="540" cy="412" r="5" fill="#241505" />
          </g>
        )}
        {flags.cupboardOpen && (
          <g>
            <rect x="450" y="340" width="180" height="150" rx="6" fill="#0d0a06" />
            <rect x="634" y="330" width="16" height="170" rx="5" fill="#3a2812" stroke="#241505" strokeWidth="3" />
            {!flags.gotCheese && (
              <g className="anim-risepop">
                <path d="M505 430 L575 430 L575 400 Q540 386 505 402 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="3.5" />
                <circle cx="525" cy="415" r="5" fill="#d97706" />
                <circle cx="552" cy="410" r="4" fill="#d97706" />
              </g>
            )}
          </g>
        )}
      </g>

      {/* שולחן עם סירים */}
      <g className={hit(fx, 'pots', 'anim-wiggle')}>
        <rect x="330" y="560" width="300" height="20" rx="8" fill="url(#gkWood)" stroke="#241505" strokeWidth="4" />
        <rect x="350" y="580" width="20" height="90" fill="#3a2812" />
        <rect x="590" y="580" width="20" height="90" fill="#3a2812" />
        <path d="M380 560 Q380 526 425 526 Q470 526 470 560" fill="#57606f" stroke="#2a3040" strokeWidth="4" />
        <ellipse cx="425" cy="560" rx="45" ry="10" fill="#2a3040" />
        <path d="M500 560 Q500 536 535 536 Q570 536 570 560" fill="#8b95ab" stroke="#4b5568" strokeWidth="4" />
      </g>

      {/* חלון ירח */}
      <g>
        <path d="M300 80 L300 200 L420 200 L420 80 Q360 48 300 80 Z" fill="#141824" />
        <path d="M310 88 L310 190 L410 190 L410 88 Q360 60 310 88 Z" fill="#0b1e3a" />
        <circle cx="386" cy="118" r="20" fill="#fef3c7" />
        <circle cx="330" cy="150" r="2.5" fill="#fff" style={{ animation: 'twinkle 2.4s ease-in-out infinite' }} />
      </g>

      <Ghost x={640} y={200} s={0.8} cls="anim-swim" />

      <rect x="0" y="0" width="720" height="700" fill="url(#gkVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 4: חדר המראות ============ */
export function MirrorScene({ flags, fx }) {
  const shadow = HEROES.shadow
  const lit = flags.pianoDone
  return (
    <g>
      <GhostDefs p="gm" />
      <CastleWalls p="gm" />

      {/* חושך עד שהפסנתר מדליק את הנרות */}
      {!lit && <rect x="0" y="0" width="720" height="700" fill="#05060c" opacity="0.68" />}

      {/* נרות דולקים כשיש אור */}
      {lit && (
        <g className="animate-pop">
          {[[90, 300], [630, 300]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y - 20} r="65" fill="url(#gmCandle)" className="anim-flicker" />
              <rect x={x - 10} y={y} width="20" height="52" rx="6" fill="#f5f0e6" stroke="#cfc6b0" strokeWidth="2.5" />
              <ellipse cx={x} cy={y - 10} rx="6" ry="11" fill="#ffdf6b" className="anim-flicker" />
              <rect x={x - 18} y={y + 50} width="36" height="12" rx="5" fill="#c9a04e" />
            </g>
          ))}
        </g>
      )}

      {/* המראה הגדולה - שאדו כלוא בפנים! */}
      <g className={hit(fx, 'mirror', 'anim-wiggle')}>
        <path d="M250 640 L250 260 Q250 170 360 170 Q470 170 470 260 L470 640 Z" fill="#c9a04e" stroke="#8d6b34" strokeWidth="6" />
        <path d="M266 624 L266 266 Q266 186 360 186 Q454 186 454 266 L454 624 Z" fill={flags.mirrorClean ? '#2c3e5e' : '#3d4152'} stroke="#8d6b34" strokeWidth="3" />
        {!flags.mirrorClean && (
          <g>
            <path d="M280 300 Q330 260 380 310 Q420 350 440 320" stroke="#57606f" strokeWidth="14" fill="none" opacity="0.7" strokeLinecap="round" />
            <path d="M290 450 Q350 410 430 470" stroke="#57606f" strokeWidth="18" fill="none" opacity="0.6" strokeLinecap="round" />
            <path d="M300 560 Q360 530 420 570" stroke="#57606f" strokeWidth="12" fill="none" opacity="0.65" strokeLinecap="round" />
            {lit && <text x="360" y="420" fontSize="26" textAnchor="middle" fill="#aab4cc" opacity="0.8">🫧 מאובק...</text>}
          </g>
        )}
        {flags.mirrorClean && !flags.shadowFreed && (
          <g className="animate-pop">
            <path d="M300 230 L420 610 M330 210 L440 560" stroke="#dfe6f5" strokeWidth="4" opacity="0.25" />
            <svg x="300" y="330" width="120" height="120" viewBox="0 0 100 100">
              <Brawler b={shadow} dimmed={!flags.shadowFreed} />
            </svg>
            <text x="360" y="480" fontSize="16" textAnchor="middle" fill="#c4b5fd" fontWeight="bold">!HELP</text>
            {/* חריץ הטבעת */}
            <circle cx="360" cy="560" r="17" fill="none" stroke="#c9a04e" strokeWidth="5" className="anim-glowfade" />
          </g>
        )}
        {flags.shadowFreed && (
          <g className="animate-bigpop">
            <path d="M266 624 L266 266 Q266 186 360 186 Q454 186 454 266 L454 624 Z" fill="#8e7cc3" opacity="0.35" className="anim-glowfade" />
            <svg x="290" y="330" width="140" height="140" viewBox="0 0 100 100">
              <Brawler b={shadow} />
            </svg>
            <text x="360" y="300" fontSize="30" textAnchor="middle">🌑✨</text>
          </g>
        )}
      </g>

      {/* דלת היציאה */}
      <g className={hit(fx, 'exitDoor', 'anim-wiggle')}>
        {!flags.doorOpen && (
          <g>
            <rect x="560" y="430" width="130" height="240" rx="10" fill="url(#gmWood)" stroke="#241505" strokeWidth="5" />
            <circle cx="585" cy="550" r="9" fill="#c9a04e" stroke="#8d6b34" strokeWidth="3" />
            <line x1="603" y1="436" x2="603" y2="666" stroke="#241505" strokeWidth="3" opacity="0.5" />
          </g>
        )}
        {flags.doorOpen && (
          <g className="animate-pop">
            <rect x="560" y="430" width="130" height="240" rx="10" fill="#fef3c7" stroke="#241505" strokeWidth="5" />
            <rect x="560" y="430" width="130" height="240" rx="10" fill="#c084fc" opacity="0.2" className="anim-glowfade" />
            <circle cx="625" cy="500" r="22" fill="#ffdf6b" opacity="0.9" />
          </g>
        )}
      </g>

      <Ghost x={140} y={480} s={0.9} cls="anim-bob" />

      <rect x="0" y="0" width="720" height="700" fill="url(#gmVin)" pointerEvents="none" />
    </g>
  )
}
