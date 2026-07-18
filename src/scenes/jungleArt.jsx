// האמנות של מקדש הג'ונגל - 4 מבטים: שביל הג'ונגל, עצי הקופים, חצר המקדש, אולם האוצר
import Brawler from '../components/Brawler.jsx'
import { HEROES } from '../data/heroes.js'

const hit = (fx, id, anim) => (fx?.id === id ? `tb ${anim}` : '')

const BFLY_POOL = [
  { x: 150, y: 150, c: '#f472b6' }, { x: 420, y: 100, c: '#38bdf8' }, { x: 580, y: 190, c: '#fbbf24' },
  { x: 280, y: 220, c: '#a78bfa' }, { x: 640, y: 90, c: '#fb923c' },
]
const MONKEY_POOL = [
  { x: 130, y: 210 }, { x: 420, y: 150 }, { x: 600, y: 250 }, { x: 280, y: 120 }, { x: 530, y: 330 },
]
const FLOWER_POOL = [
  { x: 90, y: 620, c: '#f472b6' }, { x: 620, y: 640, c: '#fb923c' }, { x: 300, y: 655, c: '#a78bfa' },
  { x: 500, y: 625, c: '#f472b6' }, { x: 180, y: 650, c: '#fbbf24' }, { x: 660, y: 600, c: '#ef4444' },
]

function JungleDefs({ p }) {
  return (
    <defs>
      <linearGradient id={`${p}Sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#84cc16" stopOpacity="0.35" />
        <stop offset="1" stopColor="#166534" />
      </linearGradient>
      <linearGradient id={`${p}Ground`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4d7c0f" />
        <stop offset="1" stopColor="#2c4a12" />
      </linearGradient>
      <linearGradient id={`${p}Stone`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#a8a29e" />
        <stop offset="1" stopColor="#57534e" />
      </linearGradient>
      <radialGradient id={`${p}SunGlow`}>
        <stop offset="0" stopColor="#fde68a" stopOpacity="0.6" />
        <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${p}Vin`}>
        <stop offset="0.55" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#052e16" stopOpacity="0.45" />
      </radialGradient>
    </defs>
  )
}

function JungleBg({ p }) {
  return (
    <g>
      <rect x="0" y="0" width="720" height="520" fill={`url(#${p}Sky)`} />
      {/* עלווה */}
      {[[60, 60, 90], [220, 30, 70], [400, 55, 95], [580, 25, 80], [700, 70, 85]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? '#15803d' : '#166534'} opacity="0.85" />
      ))}
      {/* גפנים תלויות */}
      {[140, 360, 560].map((x, i) => (
        <path key={x} d={`M${x} 0 Q${x - 14} 90 ${x + 8} 170`} stroke="#15803d" strokeWidth="7" fill="none" strokeLinecap="round" className={i === 1 ? 'anim-swim' : ''} />
      ))}
      <rect x="0" y="520" width="720" height="180" fill={`url(#${p}Ground)`} />
      <path d="M0 520 Q180 508 360 522 Q540 536 720 518 L720 530 L0 530 Z" fill="#1c3309" />
    </g>
  )
}

function Butterfly({ x, y, c, cls }) {
  return (
    <g className={cls}>
      <ellipse cx={x - 8} cy={y - 4} rx="9" ry="12" fill={c} stroke="#00000033" strokeWidth="2" transform={`rotate(-24 ${x - 8} ${y - 4})`} />
      <ellipse cx={x + 8} cy={y - 4} rx="9" ry="12" fill={c} stroke="#00000033" strokeWidth="2" transform={`rotate(24 ${x + 8} ${y - 4})`} />
      <rect x={x - 2.5} y={y - 10} width="5" height="20" rx="2.5" fill="#3f3f46" />
    </g>
  )
}

function JMonkey({ x, y, s = 1, cls = '' }) {
  return (
    <g className={cls}>
      <ellipse cx={x} cy={y} rx={16 * s} ry={19 * s} fill="#92400e" stroke="#5b2c0e" strokeWidth="3" />
      <circle cx={x} cy={y - 22 * s} r={12 * s} fill="#92400e" stroke="#5b2c0e" strokeWidth="3" />
      <circle cx={x - 11 * s} cy={y - 27 * s} r={5 * s} fill="#d97706" />
      <circle cx={x + 11 * s} cy={y - 27 * s} r={5 * s} fill="#d97706" />
      <ellipse cx={x} cy={y - 20 * s} rx={7 * s} ry={8 * s} fill="#fbd7a5" />
      <circle cx={x - 3 * s} cy={y - 23 * s} r={1.8 * s} fill="#1c1917" />
      <circle cx={x + 3 * s} cy={y - 23 * s} r={1.8 * s} fill="#1c1917" />
      <path d={`M${x - 2 * s} ${y - 16 * s} Q${x} ${y - 14 * s} ${x + 2 * s} ${y - 16 * s}`} stroke="#1c1917" strokeWidth="1.8" fill="none" />
      <path d={`M${x + 14 * s} ${y + 5 * s} Q${x + 30 * s} ${y - 5 * s} ${x + 26 * s} ${y - 22 * s}`} stroke="#92400e" strokeWidth={5 * s} fill="none" strokeLinecap="round" />
    </g>
  )
}

function Flower({ x, y, c }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y - 22} stroke="#15803d" strokeWidth="4" />
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={x + 9 * Math.cos((a * Math.PI) / 180)} cy={y - 22 + 9 * Math.sin((a * Math.PI) / 180)} rx="7" ry="5" fill={c} transform={`rotate(${a} ${x + 9 * Math.cos((a * Math.PI) / 180)} ${y - 22 + 9 * Math.sin((a * Math.PI) / 180)})`} />
      ))}
      <circle cx={x} cy={y - 22} r="5" fill="#fde68a" />
    </g>
  )
}

/* ============ מבט 1: שביל הג'ונגל ============ */
export function PathScene({ flags, fx, setup }) {
  return (
    <g>
      <JungleDefs p="jp" />
      <JungleBg p="jp" />

      {/* פרפרים - לספור! */}
      <g className={hit(fx, 'bflies', 'anim-wiggle')}>
        {BFLY_POOL.slice(0, setup.butterflies).map((b, i) => (
          <Butterfly key={i} x={b.x} y={b.y} c={b.c} cls={i % 2 ? 'anim-bob' : 'anim-swim'} />
        ))}
      </g>

      {/* שביל אבנים */}
      {[[300, 690], [370, 650], [330, 610], [390, 572], [350, 540]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={40 - i * 3} ry={13 - i} fill="#78716c" stroke="#44403c" strokeWidth="3" />
      ))}

      {/* תיבת האבן עם גלגלי הספירה */}
      <g className={hit(fx, 'stoneChest', 'anim-wiggle')}>
        <rect x="80" y="420" width="180" height="120" rx="12" fill="url(#jpStone)" stroke="#44403c" strokeWidth="5" />
        {!flags.chestOpen && <path d="M80 424 L80 410 Q170 372 260 410 L260 424 Z" fill="#78716c" stroke="#44403c" strokeWidth="4" />}
        {flags.chestOpen && (
          <g>
            <path d="M84 404 L92 352 Q170 320 248 352 L256 404 Q170 380 84 404 Z" fill="#57534e" stroke="#44403c" strokeWidth="4" />
            <rect x="94" y="408" width="152" height="22" rx="6" fill="#1c1917" />
            {!flags.gotTempleKey && (
              <g style={{ animation: 'twinkle 1.6s ease-in-out infinite' }}>
                <circle cx="150" cy="419" r="9" fill="none" stroke="#fbbf24" strokeWidth="5" />
                <rect x="157" y="415" width="24" height="7" rx="3" fill="#fbbf24" />
              </g>
            )}
          </g>
        )}
        <rect x="128" y="452" width="84" height="56" rx="8" fill="#a8a29e" stroke="#44403c" strokeWidth="3.5" />
        <text x="170" y="488" fontSize="18" textAnchor="middle">🦋🐵🌺</text>
      </g>

      {/* צפרדע - סתם כיף */}
      <g className={hit(fx, 'frog', 'anim-wiggle')}>
        <ellipse cx="560" cy="590" rx="26" ry="17" fill="#4d7c0f" stroke="#1a2e05" strokeWidth="3" />
        <circle cx="548" cy="574" r="8" fill="#4d7c0f" stroke="#1a2e05" strokeWidth="2.5" />
        <circle cx="572" cy="574" r="8" fill="#4d7c0f" stroke="#1a2e05" strokeWidth="2.5" />
        <circle cx="548" cy="572" r="3" fill="#1c1917" />
        <circle cx="572" cy="572" r="3" fill="#1c1917" />
        <path d="M550 592 Q560 598 570 592" stroke="#1a2e05" strokeWidth="2.5" fill="none" />
      </g>

      {/* פרחים לקישוט קטן (לא לספירה - הספירה בחצר המקדש) */}
      <Flower x={660} y={670} c="#38bdf8" />

      <rect x="0" y="0" width="720" height="700" fill="url(#jpVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 2: עצי הקופים ============ */
export function CanopyScene({ flags, fx, setup }) {
  return (
    <g>
      <JungleDefs p="jc" />
      <JungleBg p="jc" />

      {/* עץ הבננות הגדול */}
      <g className={hit(fx, 'bananaTree', 'anim-wiggle')}>
        <path d="M330 700 L340 380 Q342 340 360 340 Q378 340 380 380 L390 700 Z" fill="#92400e" stroke="#5b2c0e" strokeWidth="4" />
        <g transform={flags.shake2 ? 'rotate(-3 360 360)' : flags.shake1 ? 'rotate(2 360 360)' : undefined}>
          {[[-80, -30], [0, -55], [80, -30], [-45, -60], [45, -60]].map(([dx, dy], i) => (
            <ellipse key={i} cx={360 + dx} cy={340 + dy} rx="75" ry="34" fill="#16a34a" stroke="#166534" strokeWidth="3" transform={`rotate(${dx / 4} ${360 + dx} ${340 + dy})`} />
          ))}
          {!flags.gotBanana && (
            <g style={{ animation: 'twinkle 2s ease-in-out infinite' }}>
              <path d="M340 390 Q360 370 384 388 Q362 402 340 390 Z" fill="#ffd23f" stroke="#c99a1e" strokeWidth="3" />
              <path d="M352 404 Q372 386 394 402 Q374 415 352 404 Z" fill="#ffd23f" stroke="#c99a1e" strokeWidth="3" />
            </g>
          )}
        </g>
      </g>

      {/* קופים על העצים - לספור! */}
      <g className={hit(fx, 'monkeys', 'anim-wiggle')}>
        {MONKEY_POOL.slice(0, setup.monkeys).map((m, i) => (
          <JMonkey key={i} x={m.x} y={m.y} s={0.9} cls={i % 2 ? 'anim-bob' : ''} />
        ))}
      </g>

      {/* ענפים */}
      <path d="M0 260 Q120 240 240 270" stroke="#92400e" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M720 200 Q600 190 490 225" stroke="#92400e" strokeWidth="12" fill="none" strokeLinecap="round" />

      <rect x="0" y="0" width="720" height="700" fill="url(#jcVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 3: חצר המקדש ============ */
export function TempleCourtScene({ flags, fx, setup }) {
  return (
    <g>
      <JungleDefs p="jt" />
      <JungleBg p="jt" />

      {/* חזית המקדש */}
      <g>
        <polygon points="180,300 360,180 540,300" fill="url(#jtStone)" stroke="#44403c" strokeWidth="5" />
        <rect x="200" y="300" width="320" height="240" fill="url(#jtStone)" stroke="#44403c" strokeWidth="5" />
        <path d="M280 540 L280 400 Q280 350 360 350 Q440 350 440 400 L440 540 Z" fill="#1c1917" />
        {/* חריטת שמש בגמלון */}
        <circle cx="360" cy="255" r="26" fill="none" stroke="#fbbf24" strokeWidth="5" className={flags.sunLit ? 'anim-glowfade' : ''} opacity={flags.sunLit ? 1 : 0.5} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line key={a} x1={360 + 32 * Math.cos((a * Math.PI) / 180)} y1={255 + 32 * Math.sin((a * Math.PI) / 180)} x2={360 + 42 * Math.cos((a * Math.PI) / 180)} y2={255 + 42 * Math.sin((a * Math.PI) / 180)} stroke="#fbbf24" strokeWidth="4" opacity={flags.sunLit ? 1 : 0.5} />
        ))}
      </g>

      {/* התופים - והקוף הגדול שיושב עליהם */}
      <g className={hit(fx, 'drums', 'anim-wiggle')}>
        {[100, 170].map((x, i) => (
          <g key={x}>
            <rect x={x - 32} y={560 + i * 8} width="64" height="80" rx="10" fill="#92400e" stroke="#5b2c0e" strokeWidth="4" />
            <ellipse cx={x} cy={560 + i * 8} rx="32" ry="12" fill="#fbd7a5" stroke="#5b2c0e" strokeWidth="3.5" />
            <path d={`M${x - 28} ${580 + i * 8} L${x + 28} ${600 + i * 8} M${x + 28} ${580 + i * 8} L${x - 28} ${600 + i * 8}`} stroke="#5b2c0e" strokeWidth="3" opacity="0.6" />
          </g>
        ))}
        {flags.drumsDone && <text x="135" y="540" fontSize="24" textAnchor="middle" className="animate-floaty">🥁✨</text>}
      </g>
      {!flags.monkeyMoved && (
        <g className={hit(fx, 'bigMonkey', 'anim-wiggle')}>
          <JMonkey x={135} y={505} s={2} cls="anim-bob" />
          <text x="135" y="435" fontSize="15" textAnchor="middle" fill="#fef3c7" fontWeight="bold">רעב... 🍌</text>
        </g>
      )}
      {flags.monkeyMoved && (
        <g className={hit(fx, 'bigMonkey', 'anim-wiggle')}>
          <JMonkey x={640} y={520} s={1.4} cls="anim-bob" />
          <text x="640" y="565" fontSize="20" textAnchor="middle">🍌😋</text>
        </g>
      )}

      {/* הטוטם - פה שנפתח אחרי התופים */}
      <g className={hit(fx, 'totem', 'anim-wiggle')}>
        <rect x="580" y="330" width="90" height="210" rx="12" fill="#78716c" stroke="#44403c" strokeWidth="5" />
        <circle cx="608" cy="375" r="9" fill="#1c1917" />
        <circle cx="642" cy="375" r="9" fill="#1c1917" />
        <path d="M595 340 L610 320 L625 340 M625 340 L640 320 L655 340" stroke="#44403c" strokeWidth="4" fill="none" />
        {!flags.drumsDone && <rect x="600" y="420" width="50" height="18" rx="8" fill="#1c1917" />}
        {flags.drumsDone && (
          <g>
            <ellipse cx="625" cy="435" rx="30" ry="22" fill="#1c1917" className="animate-pop" />
            {!flags.gotSunStone && (
              <circle cx="625" cy="435" r="14" fill="#fbbf24" stroke="#d97706" strokeWidth="3.5" style={{ animation: 'twinkle 1.5s ease-in-out infinite' }} />
            )}
          </g>
        )}
      </g>

      {/* פרחים - לספור! */}
      <g className={hit(fx, 'flowers', 'anim-wiggle')}>
        {FLOWER_POOL.slice(0, setup.flowers).map((f, i) => (
          <Flower key={i} x={f.x} y={f.y} c={f.c} />
        ))}
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#jtVin)" pointerEvents="none" />
    </g>
  )
}

/* ============ מבט 4: אולם האוצר ============ */
export function InnerTempleScene({ flags, fx }) {
  const rocky = HEROES.rocky
  return (
    <g>
      <JungleDefs p="ji" />
      {/* אולם אבן */}
      <rect x="0" y="0" width="720" height="520" fill="#3f3a36" />
      {[0, 1, 2, 3, 4, 5, 6].map((row) => (
        <line key={row} x1="0" y1={row * 78} x2="720" y2={row * 78} stroke="#292420" strokeWidth="4" opacity="0.7" />
      ))}
      <rect x="0" y="520" width="720" height="180" fill="#4a443f" />
      <rect x="0" y="516" width="720" height="8" fill="#1c1917" />

      {/* חושך עד שאבן השמש במקומה */}
      {!flags.sunLit && <rect x="0" y="0" width="720" height="700" fill="#0a0805" opacity="0.72" />}

      {/* הכן של אבן השמש */}
      <g className={hit(fx, 'pedestal', 'anim-wiggle')}>
        <rect x="90" y="430" width="120" height="180" rx="10" fill="url(#jiStone)" stroke="#292420" strokeWidth="5" />
        <ellipse cx="150" cy="430" rx="60" ry="16" fill="#78716c" stroke="#292420" strokeWidth="4" />
        {!flags.sunLit && (
          <circle cx="150" cy="424" r="15" fill="none" stroke="#fbbf24" strokeWidth="4" strokeDasharray="8 6" className="anim-glowfade" />
        )}
        {flags.sunLit && (
          <g className="animate-pop">
            <circle cx="150" cy="420" r="15" fill="#fbbf24" stroke="#d97706" strokeWidth="3.5" />
            <circle cx="150" cy="400" r="110" fill="url(#jiSunGlow)" className="anim-flicker" />
            <path d="M162 410 L400 300" stroke="#fde68a" strokeWidth="8" opacity="0.4" strokeLinecap="round" />
          </g>
        )}
      </g>

      {/* כלוב האבן של רוקי */}
      <g className={hit(fx, 'cage', 'anim-wiggle')}>
        <rect x="330" y="250" width="230" height="290" rx="16" fill="none" stroke="#78716c" strokeWidth="9" />
        {!flags.rockyFreed && [375, 420, 465, 510].map((x) => (
          <line key={x} x1={x} y1="256" x2={x} y2="534" stroke="#78716c" strokeWidth="8" />
        ))}
        <svg x="395" y="340" width="110" height="110" viewBox="0 0 100 100">
          <Brawler b={rocky} dimmed={!flags.rockyFreed} />
        </svg>
        {flags.sunLit && !flags.rockyFreed && (
          <g>
            {/* חריטות החיות - מנעול השירה */}
            <rect x="342" y="262" width="206" height="44" rx="8" fill="#292420" opacity="0.85" />
            <text x="445" y="292" fontSize="24" textAnchor="middle" className={flags.chantDone ? '' : 'anim-glowfade'}>
              {flags.chantDone ? '✓ ✓ ✓ ✓' : '🦁🐵🐘🐮'}
            </text>
            {/* מנעול המפתח */}
            {flags.chantDone && (
              <g className="animate-pop">
                <path d="M435 545 Q435 531 445 531 Q455 531 455 545" fill="none" stroke="#8d6b34" strokeWidth="5" />
                <rect x="428" y="545" width="34" height="28" rx="7" fill="#fbbf24" stroke="#b45309" strokeWidth="3.5" className="anim-glowfade" />
              </g>
            )}
            <text x="445" y="590" fontSize="16" textAnchor="middle" fill="#fbbf24" fontWeight="bold">HELP!</text>
          </g>
        )}
        {flags.rockyFreed && <text x="445" y="235" fontSize="28" textAnchor="middle" className="animate-bigpop">🪨💪</text>}
      </g>

      {/* הקיר הסדוק - היציאה */}
      <g className={hit(fx, 'wall', 'anim-wiggle')}>
        {!flags.doorOpen && (
          <g>
            <path d="M600 240 L640 300 L615 360 L655 430 L625 500 L650 560" stroke="#1c1917" strokeWidth="7" fill="none" strokeLinecap="round" />
            {flags.rockyFreed && (
              <g>
                <rect x="580" y="220" width="110" height="360" rx="14" fill="none" stroke="#ffe066" strokeWidth="7" className="anim-glowfade" />
                <text x="635" y="205" fontSize="28" textAnchor="middle" className="animate-floaty">⬇️</text>
              </g>
            )}
          </g>
        )}
        {flags.doorOpen && (
          <g className="animate-pop">
            <path d="M585 580 L595 260 Q640 220 690 260 L695 580 Z" fill="#84cc16" opacity="0.9" />
            <path d="M585 580 L595 260 Q640 220 690 260 L695 580 Z" fill="#fde68a" opacity="0.5" className="anim-glowfade" />
            <circle cx="645" cy="300" r="22" fill="#fde047" />
          </g>
        )}
      </g>

      <rect x="0" y="0" width="720" height="700" fill="url(#jiVin)" pointerEvents="none" />
    </g>
  )
}
