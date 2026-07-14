// האמנות של ספינת הפיראטים - 3 מבטים מצוירים בשכבות SVG
// כל סצנה מקבלת flags (מצב החדר) ו-fx (אנימציה רגעית של נקודת לחיצה)

// class לאנימציה רגעית - רק כשהאלמנט הזה נלחץ
const hit = (fx, id, anim) => (fx?.id === id ? `tb ${anim}` : '')

// נקודות של כוכב מחומש
function starPts(cx, cy, R, r) {
  const pts = []
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? R : r
    const a = (Math.PI / 5) * i - Math.PI / 2
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`)
  }
  return pts.join(' ')
}

// קיר קורות עץ + רצפה - הבסיס של כל מבט
function Walls({ p }) {
  return (
    <g>
      <rect x="0" y="0" width="720" height="520" fill={`url(#${p}Wood)`} />
      {[65, 130, 195, 260, 325, 390, 455].map((y) => (
        <g key={y}>
          <line x1="0" y1={y} x2="720" y2={y} stroke="#2e1c0a" strokeWidth="4" opacity="0.55" />
          <line x1="0" y1={y + 3} x2="720" y2={y + 3} stroke="#8a5a2e" strokeWidth="1.5" opacity="0.35" />
          <circle cx={y % 130 === 0 ? 90 : 620} cy={y - 32} r="3" fill="#241505" opacity="0.7" />
        </g>
      ))}
      <rect x="0" y="520" width="720" height="180" fill={`url(#${p}Floor)`} />
      <rect x="0" y="516" width="720" height="8" fill="#241505" opacity="0.8" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={i * 145 - 20} y1="700" x2={60 + i * 122} y2="520" stroke="#3a240e" strokeWidth="3" opacity="0.4" />
      ))}
      <rect x="0" y="0" width="26" height="520" fill="#33200d" />
      <rect x="694" y="0" width="26" height="520" fill="#33200d" />
    </g>
  )
}

function Vignette({ p }) {
  return <rect x="0" y="0" width="720" height="700" fill={`url(#${p}Vin)`} pointerEvents="none" />
}

function SceneDefs({ p }) {
  return (
    <defs>
      <linearGradient id={`${p}Wood`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6b4423" />
        <stop offset="1" stopColor="#452a10" />
      </linearGradient>
      <linearGradient id={`${p}Floor`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8a5a2e" />
        <stop offset="1" stopColor="#5e3a18" />
      </linearGradient>
      <linearGradient id={`${p}Barrel`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#5a3315" />
        <stop offset="0.5" stopColor="#8a5a2e" />
        <stop offset="1" stopColor="#5a3315" />
      </linearGradient>
      <linearGradient id={`${p}Gold`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffd54a" />
        <stop offset="1" stopColor="#c9930a" />
      </linearGradient>
      <radialGradient id={`${p}Glow`}>
        <stop offset="0" stopColor="#ffd58a" stopOpacity="0.5" />
        <stop offset="1" stopColor="#ffd58a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${p}Vin`}>
        <stop offset="0.55" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.42" />
      </radialGradient>
    </defs>
  )
}

/* ============ מבט 1: המחסן ============ */
export function HoldScene({ flags, fx }) {
  return (
    <g>
      <SceneDefs p="h" />
      <Walls p="h" />

      {/* פנס תלוי + הילה חמה */}
      <circle cx="120" cy="100" r="130" fill="url(#hGlow)" className="anim-flicker" />
      <g className={hit(fx, 'lantern', 'anim-wiggle')}>
        <line x1="120" y1="0" x2="120" y2="58" stroke="#2b2b33" strokeWidth="5" />
        <rect x="96" y="58" width="48" height="68" rx="10" fill="#2b2b33" />
        <rect x="104" y="68" width="32" height="48" rx="6" fill="#ffb84d" />
        <ellipse cx="120" cy="98" rx="8" ry="13" fill="#ffdf6b" className="anim-flicker" />
      </g>

      {/* דגל פיראטים חמוד על הקיר */}
      <g className={hit(fx, 'flag', 'anim-wiggle')}>
        <path d="M250 88 Q290 78 330 88 Q370 98 405 88 L400 196 Q360 208 320 198 Q285 190 253 198 Z" fill="#23232c" stroke="#141419" strokeWidth="4" />
        <circle cx="327" cy="136" r="21" fill="#f5f0e6" />
        <circle cx="319" cy="131" r="4.5" fill="#23232c" />
        <circle cx="335" cy="131" r="4.5" fill="#23232c" />
        <path d="M318 145 Q327 152 336 145" stroke="#23232c" strokeWidth="3" fill="none" strokeLinecap="round" />
        <line x1="299" y1="168" x2="355" y2="176" stroke="#f5f0e6" strokeWidth="7" strokeLinecap="round" />
        <line x1="355" y1="168" x2="299" y2="176" stroke="#f5f0e6" strokeWidth="7" strokeLinecap="round" />
      </g>

      {/* גליל חבל על הקיר */}
      <g className={hit(fx, 'rope', 'anim-wiggle')}>
        <line x1="600" y1="118" x2="600" y2="150" stroke="#2b2b33" strokeWidth="5" />
        <circle cx="600" cy="185" r="36" fill="none" stroke="#b98a4e" strokeWidth="15" />
        <circle cx="600" cy="185" r="17" fill="none" stroke="#9c7038" strokeWidth="9" />
      </g>

      {/* ארגזים מאחור */}
      <g>
        <rect x="556" y="258" width="128" height="102" fill="url(#hBarrel)" stroke="#33200d" strokeWidth="4" rx="4" />
        <line x1="556" y1="309" x2="684" y2="309" stroke="#33200d" strokeWidth="3" opacity="0.6" />
        <line x1="620" y1="258" x2="620" y2="360" stroke="#33200d" strokeWidth="3" opacity="0.6" />
        <rect x="576" y="168" width="92" height="90" fill="url(#hBarrel)" stroke="#33200d" strokeWidth="4" rx="4" />
        <line x1="576" y1="213" x2="668" y2="213" stroke="#33200d" strokeWidth="3" opacity="0.6" />
      </g>

      {/* חבית גדולה מימין */}
      <g className={hit(fx, 'barrel', 'anim-wiggle')}>
        <rect x="470" y="378" width="164" height="200" rx="26" fill="url(#hBarrel)" stroke="#33200d" strokeWidth="4" />
        {[500, 552, 604].map((x) => (
          <line key={x} x1={x} y1="380" x2={x} y2="576" stroke="#33200d" strokeWidth="2.5" opacity="0.5" />
        ))}
        <rect x="466" y="408" width="172" height="14" rx="7" fill="#3f3f46" />
        <rect x="466" y="532" width="172" height="14" rx="7" fill="#3f3f46" />
      </g>

      {/* חבית התפוחים - בדיוק 4 תפוחים! */}
      <g className={hit(fx, 'apples', 'anim-wiggle')}>
        <rect x="62" y="402" width="152" height="166" rx="22" fill="url(#hBarrel)" stroke="#33200d" strokeWidth="4" />
        {[96, 138, 180].map((x) => (
          <line key={x} x1={x} y1="410" x2={x} y2="566" stroke="#33200d" strokeWidth="2.5" opacity="0.5" />
        ))}
        <rect x="58" y="428" width="160" height="13" rx="6" fill="#3f3f46" />
        <rect x="58" y="524" width="160" height="13" rx="6" fill="#3f3f46" />
        <ellipse cx="138" cy="404" rx="76" ry="20" fill="#241505" />
        {[[104, 398], [142, 392], [176, 400], [122, 410]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="19" fill="#d63a2f" stroke="#9c2318" strokeWidth="2.5" />
            <circle cx={x - 6} cy={y - 6} r="5" fill="#ff8a7a" opacity="0.8" />
            <path d={`M${x} ${y - 18} Q${x + 3} ${y - 26} ${x + 9} ${y - 24}`} stroke="#2f7d3a" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        ))}
      </g>

      {/* המגף - המפתח מציץ ממנו עד שלוקחים */}
      <g className={hit(fx, 'boot', 'anim-wiggle')}>
        <rect x="308" y="552" width="58" height="78" rx="12" fill="#5b3a21" stroke="#33200d" strokeWidth="4" />
        <path d="M308 606 L308 648 Q308 664 326 664 L398 664 Q414 664 410 648 Q404 622 366 616 L366 606 Z" fill="#5b3a21" stroke="#33200d" strokeWidth="4" />
        <rect x="304" y="648" width="112" height="14" rx="7" fill="#2e1c0a" />
        <line x1="318" y1="568" x2="356" y2="578" stroke="#c9a04e" strokeWidth="3" />
        <line x1="356" y1="566" x2="318" y2="580" stroke="#c9a04e" strokeWidth="3" />
        {!flags.gotKey && (
          <g>
            <circle cx="338" cy="546" r="8" fill="none" stroke="url(#hGold)" strokeWidth="5" style={{ animation: 'twinkle 1.6s ease-in-out infinite' }} />
            <rect x="344" y="542" width="16" height="7" fill="#ffd54a" style={{ animation: 'twinkle 1.6s ease-in-out infinite' }} />
          </g>
        )}
      </g>

      {/* הקופסה הקטנה - נפתחת עם המפתח, בפנים בננה */}
      <g className={hit(fx, 'box', 'anim-wiggle')}>
        <rect x="482" y="592" width="156" height="86" rx="8" fill="#6b4423" stroke="#33200d" strokeWidth="4" />
        <line x1="482" y1="634" x2="638" y2="634" stroke="#33200d" strokeWidth="3" opacity="0.6" />
        <line x1="560" y1="592" x2="560" y2="678" stroke="#33200d" strokeWidth="3" opacity="0.6" />
        {!flags.boxOpen && (
          <g>
            <rect x="474" y="578" width="172" height="22" rx="7" fill="#54331a" stroke="#33200d" strokeWidth="4" />
            <path d="M548 592 Q548 576 560 576 Q572 576 572 592" fill="none" stroke="#8d6b34" strokeWidth="6" />
            <rect x="542" y="592" width="36" height="30" rx="7" fill="url(#hGold)" stroke="#8d6b34" strokeWidth="3" />
            <circle cx="560" cy="604" r="4" fill="#54331a" />
          </g>
        )}
        {flags.boxOpen && (
          <g>
            <rect x="474" y="578" width="172" height="22" rx="7" fill="#54331a" stroke="#33200d" strokeWidth="4" transform="rotate(-42 482 592)" />
            <rect x="492" y="600" width="136" height="24" rx="6" fill="#1f1206" />
            {!flags.gotBanana && (
              <path d="M520 618 Q558 588 598 616 Q560 636 520 618 Z" fill="#ffd23f" stroke="#c99a1e" strokeWidth="3.5" className="anim-risepop" />
            )}
          </g>
        )}
      </g>

      {/* עכברוש */}
      <g className={fx?.id === 'rat' ? 'anim-ratrun' : ''}>
        <path d="M84 652 Q60 632 46 646" stroke="#8b8b94" strokeWidth="5" fill="none" strokeLinecap="round" />
        <ellipse cx="112" cy="646" rx="28" ry="15" fill="#8b8b94" stroke="#5d5d66" strokeWidth="3" />
        <circle cx="140" cy="640" r="11" fill="#8b8b94" stroke="#5d5d66" strokeWidth="3" />
        <circle cx="137" cy="629" r="5.5" fill="#a8a8b2" stroke="#5d5d66" strokeWidth="2" />
        <circle cx="147" cy="631" r="5.5" fill="#a8a8b2" stroke="#5d5d66" strokeWidth="2" />
        <circle cx="144" cy="639" r="2" fill="#1f1206" />
        <circle cx="151" cy="643" r="2.5" fill="#e88" />
      </g>

      {/* קורי עכביש בפינה */}
      <g stroke="#ffffff" strokeWidth="1.5" opacity="0.18" fill="none">
        <path d="M720 0 Q640 30 620 100" />
        <path d="M720 0 Q680 60 700 130" />
        <path d="M660 20 Q680 55 665 95" />
      </g>

      <Vignette p="h" />
    </g>
  )
}

/* ============ מבט 2: פינת התוכי ============ */
export function ParrotScene({ flags, fx }) {
  return (
    <g>
      <SceneDefs p="c" />
      <defs>
        <linearGradient id="cSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a86bd" />
          <stop offset="1" stopColor="#0b3a5e" />
        </linearGradient>
        <radialGradient id="cGoldGlow">
          <stop offset="0" stopColor="#ffe27a" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffe27a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <Walls p="c" />

      {/* צוהר עם דגים - בדיוק 3 דגים! */}
      <g className={hit(fx, 'porthole', 'anim-wiggle')}>
        <circle cx="175" cy="200" r="102" fill="#8d6b34" stroke="#5e4620" strokeWidth="6" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <circle
            key={a}
            cx={175 + 91 * Math.cos((a * Math.PI) / 180)}
            cy={200 + 91 * Math.sin((a * Math.PI) / 180)}
            r="5"
            fill="#5e4620"
          />
        ))}
        <circle cx="175" cy="200" r="78" fill="url(#cSea)" stroke="#5e4620" strokeWidth="4" />
        {[['anim-swim', 130, 172, 1], ['anim-swim-b', 205, 210, -1], ['anim-swim-c', 152, 242, 1]].map(([cls, x, y, dir], i) => (
          <g key={i} className={cls} transform={dir === -1 ? `translate(${2 * x} 0) scale(-1 1)` : undefined}>
            <ellipse cx={x} cy={y} rx="17" ry="9.5" fill="#ff9438" stroke="#c96a1a" strokeWidth="2.5" />
            <path d={`M${x - 15} ${y} L${x - 27} ${y - 8} L${x - 27} ${y + 8} Z`} fill="#ff9438" stroke="#c96a1a" strokeWidth="2.5" />
            <circle cx={x + 9} cy={y - 2} r="2.2" fill="#1f1206" />
          </g>
        ))}
        <circle cx="120" cy="158" r="4" fill="#cfeefc" opacity="0.6" />
        <circle cx="228" cy="168" r="3" fill="#cfeefc" opacity="0.5" />
        <circle cx="212" cy="258" r="3.5" fill="#cfeefc" opacity="0.5" />
        <path d="M120 142 Q170 118 226 148" stroke="#fff" strokeWidth="7" opacity="0.14" fill="none" />
      </g>

      {/* מפה על הקיר */}
      <g className={hit(fx, 'map', 'anim-wiggle')} transform="rotate(3 555 155)">
        <rect x="470" y="92" width="172" height="128" rx="6" fill="#e8d5a8" stroke="#b39257" strokeWidth="4" />
        <path d="M496 190 Q530 150 566 166 Q598 178 616 132" stroke="#8a5a2e" strokeWidth="3.5" strokeDasharray="8 7" fill="none" />
        <line x1="608" y1="124" x2="626" y2="142" stroke="#c0392b" strokeWidth="5" strokeLinecap="round" />
        <line x1="626" y1="124" x2="608" y2="142" stroke="#c0392b" strokeWidth="5" strokeLinecap="round" />
        <circle cx="497" cy="190" r="5" fill="#2f7d3a" />
        <path d="M520 116 L534 108 L534 124 Z" fill="#8a5a2e" opacity="0.6" />
      </g>

      {/* נר על ארגז */}
      <g className={hit(fx, 'candle', 'anim-wiggle')}>
        <circle cx="112" cy="470" r="80" fill="url(#cGlow)" className="anim-flicker" />
        <rect x="58" y="540" width="112" height="112" fill="url(#cBarrel)" stroke="#33200d" strokeWidth="4" rx="5" />
        <line x1="58" y1="596" x2="170" y2="596" stroke="#33200d" strokeWidth="3" opacity="0.6" />
        <rect x="100" y="482" width="24" height="60" rx="6" fill="#f5f0e6" stroke="#cfc6b0" strokeWidth="2" />
        <ellipse cx="112" cy="470" rx="7" ry="13" fill="#ffdf6b" className="anim-flicker" />
      </g>

      {/* עמוד ומוט של התוכי */}
      <rect x="528" y="284" width="16" height="376" rx="6" fill="#4a2c12" stroke="#33200d" strokeWidth="3" />
      <ellipse cx="536" cy="658" rx="52" ry="14" fill="#4a2c12" stroke="#33200d" strokeWidth="3" />
      <rect x="452" y="272" width="170" height="14" rx="7" fill="#5b3a21" stroke="#33200d" strokeWidth="3" />

      {/* התוכי - המדריך שלנו! */}
      <g className={`anim-bob ${fx?.id === 'parrot' ? 'anim-wiggle tb' : ''}`}>
        <path d="M524 258 L524 232 M548 258 L548 232" stroke="#e6a23c" strokeWidth="5" strokeLinecap="round" />
        <path d="M528 250 Q510 300 522 312 M540 250 Q548 302 534 314" stroke="#2456a8" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M534 252 Q528 306 528 316" stroke="#e33e3e" strokeWidth="9" strokeLinecap="round" fill="none" />
        <ellipse cx="537" cy="196" rx="35" ry="44" fill="#2fae5b" stroke="#1d7a3c" strokeWidth="3.5" />
        <ellipse cx="519" cy="202" rx="15" ry="28" fill="#e33e3e" stroke="#a82626" strokeWidth="3" transform="rotate(-12 519 202)" />
        <circle cx="549" cy="150" r="26" fill="#2fae5b" stroke="#1d7a3c" strokeWidth="3.5" />
        <circle cx="557" cy="152" r="14" fill="#f2f2e9" />
        <circle cx="558" cy="149" r="4.5" fill="#1f1206" />
        <path d="M570 146 Q590 148 584 160 Q578 170 566 162 Z" fill="#e6a23c" stroke="#b87f22" strokeWidth="2.5" />
        <path d="M544 128 Q552 118 560 128" stroke="#e33e3e" strokeWidth="6" strokeLinecap="round" fill="none" />
        {flags.parrotFed && (
          <text x="588" y="120" fontSize="30" fill="#ffe066" className="animate-floaty">♪</text>
        )}
      </g>

      {/* התיבה הגדולה של הקפטן */}
      <g className={hit(fx, 'chest', 'anim-wiggle')}>
        {flags.chestOpen && (
          <g>
            <path d="M232 468 L244 352 Q380 296 516 352 L528 468 Q380 428 232 468 Z" fill="#54331a" stroke="#33200d" strokeWidth="5" />
            <ellipse cx="380" cy="470" rx="150" ry="42" fill="url(#cGoldGlow)" className="anim-glowfade" />
          </g>
        )}
        <rect x="228" y="500" width="304" height="158" rx="12" fill="url(#cBarrel)" stroke="#33200d" strokeWidth="5" />
        {!flags.chestOpen && (
          <path d="M228 502 L228 486 Q380 402 532 486 L532 502 Z" fill="#8a5a2e" stroke="#33200d" strokeWidth="5" />
        )}
        {flags.chestOpen && <rect x="240" y="472" width="280" height="42" rx="8" fill="#1f1206" />}
        {[264, 356, 468].map((x) => (
          <rect key={x} x={x} y={flags.chestOpen ? 500 : 430} width="20" height={flags.chestOpen ? 158 : 228} fill="#c9a04e" stroke="#8d6b34" strokeWidth="3" rx="4" />
        ))}
        {/* לוחית הקוד: תפוח, דג, כוכב */}
        <rect x="342" y="520" width="88" height="66" rx="9" fill="#d9b05e" stroke="#8d6b34" strokeWidth="4" />
        {/* אייקונים חרוטים - בצבע זהב אחיד, שלא ייספרו בטעות כחפצים אמיתיים */}
        <circle cx="364" cy="542" r="9" fill="#3a240e" />
        <circle cx="364" cy="542" r="5" fill="#e8c87a" />
        <circle cx="388" cy="542" r="9" fill="#3a240e" />
        <ellipse cx="388" cy="542" rx="6" ry="3.5" fill="#e8c87a" />
        <circle cx="412" cy="542" r="9" fill="#3a240e" />
        <polygon points={starPts(412, 542, 6, 2.6)} fill="#e8c87a" />
        <rect x="356" y="558" width="60" height="16" rx="4" fill="#3a240e" opacity="0.7" />
        {/* מפתח הזהב בפנים */}
        {flags.chestOpen && !flags.gotGoldKey && (
          <g className="animate-floaty">
            <circle cx="342" cy="472" r="15" fill="none" stroke="url(#cGold)" strokeWidth="9" />
            <rect x="354" y="466" width="62" height="12" rx="4" fill="#ffd54a" stroke="#b8860b" strokeWidth="2" />
            <rect x="400" y="476" width="9" height="14" fill="#ffd54a" stroke="#b8860b" strokeWidth="2" />
            <rect x="384" y="476" width="9" height="10" fill="#ffd54a" stroke="#b8860b" strokeWidth="2" />
          </g>
        )}
      </g>

      <Vignette p="c" />
    </g>
  )
}

/* ============ מבט 3: הדלת ============ */
export function DoorScene({ flags, fx }) {
  return (
    <g>
      <SceneDefs p="d" />
      <defs>
        <linearGradient id="dNight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1e3a" />
          <stop offset="1" stopColor="#152c52" />
        </linearGradient>
        <linearGradient id="dOut" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fe3f5" />
          <stop offset="0.62" stopColor="#d8f4fb" />
          <stop offset="0.63" stopColor="#2e9ab0" />
          <stop offset="1" stopColor="#1d7a90" />
        </linearGradient>
      </defs>
      <Walls p="d" />

      {/* חלון עם סורגים - בדיוק 5 כוכבים! */}
      <g className={hit(fx, 'stars', 'anim-wiggle')}>
        <rect x="64" y="186" width="140" height="150" rx="14" fill="#241505" />
        <rect x="72" y="194" width="124" height="134" rx="10" fill="url(#dNight)" />
        {[[100, 226, 0], [138, 214, 0.7], [172, 240, 1.4], [116, 276, 0.4], [156, 296, 1.1]].map(([x, y, d], i) => (
          <polygon key={i} points={starPts(x, y, 9, 3.8)} fill="#ffe066" style={{ animation: `twinkle 2.1s ease-in-out ${d}s infinite` }} />
        ))}
        {[104, 134, 164].map((x) => (
          <rect key={x} x={x} y="192" width="9" height="138" rx="4" fill="#2b2b33" />
        ))}
      </g>

      {/* השלט עם מנעול התמונות - מעל הדלת */}
      <g className={hit(fx, 'sign', 'anim-wiggle')}>
        <line x1="290" y1="0" x2="296" y2="76" stroke="#b98a4e" strokeWidth="5" />
        <line x1="430" y1="0" x2="424" y2="76" stroke="#b98a4e" strokeWidth="5" />
        <rect x="248" y="74" width="224" height="96" rx="12" fill="#8a5a2e" stroke="#3a240e" strokeWidth="5" />
        {/* קרן שמשמיעה - הרמז שזה מנעול של שמיעה */}
        <polygon points="264,116 282,104 282,140 264,128" fill="#c9a04e" stroke="#8d6b34" strokeWidth="3" />
        <path d="M288 110 Q298 122 288 134 M296 102 Q312 122 296 142" stroke="#c9a04e" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* 4 ציורים מגולפים: בננה, ציפור, קופסה, כלב */}
        <g fill="none" stroke="#3f2a10" strokeWidth="3.5" strokeLinecap="round">
          <rect x="314" y="92" width="34" height="34" rx="6" opacity="0.5" />
          <path d="M322 116 Q330 100 342 102 Q332 114 322 116 Z" fill="#3f2a10" opacity="0.85" />
          <rect x="352" y="92" width="34" height="34" rx="6" opacity="0.5" />
          <circle cx="367" cy="107" r="8" />
          <path d="M375 105 L382 102 M360 110 Q354 114 358 118" />
          <rect x="390" y="92" width="34" height="34" rx="6" opacity="0.5" />
          <rect x="397" y="101" width="20" height="17" />
          <line x1="397" y1="107" x2="417" y2="107" />
          <rect x="428" y="92" width="34" height="34" rx="6" opacity="0.5" />
          <circle cx="444" cy="110" r="9" />
          <path d="M436 103 L433 96 M452 103 L455 96 M441 113 Q444 116 447 113" />
        </g>
        <g fill="none" stroke="#3f2a10" strokeWidth="3.5" strokeLinecap="round">
          <rect x="314" y="132" width="148" height="26" rx="6" opacity="0.4" />
          <circle cx="336" cy="145" r="6" />
          <circle cx="366" cy="145" r="6" />
          <circle cx="396" cy="145" r="6" />
        </g>
        {!flags.listenDone && (
          <rect x="248" y="74" width="224" height="96" rx="12" fill="#ffe066" opacity="0.3" className="anim-glowfade" />
        )}
        {flags.listenDone && (
          <g className="animate-bigpop">
            <circle cx="460" cy="84" r="17" fill="#22c55e" stroke="#15803d" strokeWidth="3" />
            <path d="M452 84 L458 91 L469 77" stroke="#fff" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </g>

      {/* הדלת */}
      <g className={hit(fx, 'door', 'anim-wiggle')}>
        <path d="M240 660 L240 330 Q240 200 360 200 Q480 200 480 330 L480 660 Z" fill="#33200d" stroke="#241505" strokeWidth="6" />
        {!flags.doorOpen && (
          <g>
            <path d="M254 660 L254 334 Q254 214 360 214 Q466 214 466 334 L466 660 Z" fill={`url(#dWood)`} stroke="#2e1c0a" strokeWidth="4" />
            <line x1="308" y1="228" x2="308" y2="660" stroke="#2e1c0a" strokeWidth="3.5" opacity="0.6" />
            <line x1="360" y1="214" x2="360" y2="660" stroke="#2e1c0a" strokeWidth="3.5" opacity="0.6" />
            <line x1="412" y1="228" x2="412" y2="660" stroke="#2e1c0a" strokeWidth="3.5" opacity="0.6" />
            {/* צירים */}
            <g fill="#2b2b33" stroke="#17171c" strokeWidth="2.5">
              <rect x="256" y="356" width="64" height="17" rx="5" />
              <rect x="256" y="520" width="64" height="17" rx="5" />
              <circle cx="270" cy="364" r="3.5" fill="#4b4b55" />
              <circle cx="270" cy="528" r="3.5" fill="#4b4b55" />
            </g>
            {/* ידית טבעת */}
            <circle cx="330" cy="452" r="8" fill="#2b2b33" />
            <circle cx="330" cy="472" r="17" fill="none" stroke="#2b2b33" strokeWidth="7" />
          </g>
        )}
        {flags.doorOpen && (
          <g className="animate-pop">
            <path d="M254 660 L254 334 Q254 214 360 214 Q466 214 466 334 L466 660 Z" fill="url(#dOut)" />
            <circle cx="330" cy="286" r="30" fill="#ffdf6b" opacity="0.95" />
            <path d="M388 262 Q397 252 406 262 M406 262 Q415 252 424 262" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M280 500 Q310 490 340 500 Q370 510 400 500" stroke="#d8f4fb" strokeWidth="5" fill="none" opacity="0.7" />
            <polygon points="254,660 254,334 250,332 214,368 214,690 254,660" fill="#452a10" stroke="#241505" strokeWidth="4" />
          </g>
        )}
      </g>

      {/* המנעול הגדול - נפתח עם מפתח הזהב */}
      {!flags.doorOpen && !flags.unlocked && (
        <g className={hit(fx, 'padlock', 'anim-wiggle')}>
          <rect x="428" y="428" width="42" height="26" rx="6" fill="#2b2b33" stroke="#17171c" strokeWidth="3" />
          <path d="M428 428 Q428 392 452 392 Q476 392 476 428" fill="none" stroke="#8d6b34" strokeWidth="10" />
          <rect x="420" y="428" width="64" height="66" rx="12" fill="url(#dGold)" stroke="#8d6b34" strokeWidth="4" />
          <circle cx="452" cy="454" r="8" fill="#54331a" />
          <rect x="448" y="454" width="8" height="18" rx="3" fill="#54331a" />
        </g>
      )}
      {!flags.doorOpen && flags.unlocked && (
        <g transform="translate(510 622) rotate(55)" className="animate-pop">
          <rect x="0" y="0" width="56" height="58" rx="11" fill="url(#dGold)" stroke="#8d6b34" strokeWidth="4" />
          <path d="M6 0 Q6 -32 28 -32 Q50 -32 50 0" fill="none" stroke="#8d6b34" strokeWidth="9" transform="rotate(28 28 0)" />
        </g>
      )}

      {/* פתח עם זרוע תמנון סקרנית */}
      <g className={fx?.id === 'tentacle' ? 'anim-tentacle' : ''}>
        <path d="M96 662 Q84 616 108 592 Q128 572 122 548 Q118 530 100 528" fill="none" stroke="#9b6bb8" strokeWidth="17" strokeLinecap="round" />
        <circle cx="104" cy="612" r="4" fill="#c9a2e0" />
        <circle cx="114" cy="584" r="4" fill="#c9a2e0" />
        <circle cx="118" cy="556" r="4" fill="#c9a2e0" />
      </g>
      <ellipse cx="104" cy="664" rx="56" ry="15" fill="#1f1206" stroke="#33200d" strokeWidth="4" />

      {/* דלי ומגב בפינה */}
      <g className={hit(fx, 'bucket', 'anim-wiggle')}>
        <line x1="640" y1="452" x2="596" y2="640" stroke="#8a5a2e" strokeWidth="9" strokeLinecap="round" />
        <path d="M628 452 Q640 436 652 452 Q660 464 646 468 Q632 470 628 452" fill="#cfc6b0" stroke="#9a917e" strokeWidth="3" />
        <polygon points="576,586 648,586 638,652 586,652" fill="#6e6e78" stroke="#4b4b55" strokeWidth="4" />
        <path d="M580 586 Q612 552 644 586" fill="none" stroke="#4b4b55" strokeWidth="5" />
      </g>

      <Vignette p="d" />
    </g>
  )
}
