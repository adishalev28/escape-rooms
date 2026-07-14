// לוחם מצויר - SVG מקורי בסגנון זירה
export default function Brawler({ b, className = '', dimmed = false }) {
  const { color, skin, style, hair } = b

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={dimmed ? { filter: 'grayscale(1)', opacity: 0.4 } : undefined}
    >
      <circle cx="50" cy="50" r="48" fill={color} />
      <circle cx="50" cy="50" r="48" fill="white" opacity="0.12" />

      {/* ברדס (מאחורי הפנים) */}
      {style === 'hood' && (
        <path d="M18 78 Q14 30 50 20 Q86 30 82 78 Q66 68 50 70 Q34 68 18 78 Z" fill={hair} />
      )}

      {/* אוזניים */}
      <circle cx="23" cy="57" r="5.5" fill={skin} />
      <circle cx="77" cy="57" r="5.5" fill={skin} />

      {/* פנים */}
      <circle cx="50" cy="56" r="27" fill={skin} />

      {/* תוספות לפי סגנון */}
      {style === 'mohawk' && (
        <>
          <path d="M40 34 L44 12 L50 30 L56 12 L60 34 Q55 30 50 30 Q45 30 40 34 Z" fill={hair} />
          <path d="M23 56 A27 27 0 0 1 77 56 L77 50 Q66 42 50 42 Q34 42 23 50 Z" fill={hair} opacity="0.35" />
        </>
      )}
      {style === 'fire' && (
        <>
          <path d="M30 38 Q28 20 38 26 Q36 12 48 20 Q50 8 58 18 Q66 12 64 26 Q74 22 70 38 Q60 30 50 32 Q40 30 30 38 Z" fill={hair} />
          <path d="M23 56 A27 27 0 0 1 77 56 L77 49 Q66 41 50 41 Q34 41 23 49 Z" fill="#ef4444" />
        </>
      )}
      {style === 'ninja' && (
        <>
          <path d="M23 56 A27 27 0 0 1 77 56 L77 44 Q66 34 50 34 Q34 34 23 44 Z" fill={hair} />
          <rect x="26" y="47" width="48" height="14" rx="7" fill={hair} />
          <circle cx="40" cy="54" r="4" fill="white" />
          <circle cx="60" cy="54" r="4" fill="white" />
          <circle cx="40" cy="54" r="2.2" fill="#111" />
          <circle cx="60" cy="54" r="2.2" fill="#111" />
          <path d="M74 50 L88 42 L86 52 Z" fill={hair} />
        </>
      )}
      {style === 'robot' && (
        <>
          <line x1="50" y1="18" x2="50" y2="30" stroke="#64748b" strokeWidth="3" />
          <circle cx="50" cy="15" r="4.5" fill="#f43f5e" />
          <path d="M23 56 A27 27 0 0 1 77 56 L77 48 Q66 40 50 40 Q34 40 23 48 Z" fill={hair} />
          <rect x="33" y="49" width="14" height="10" rx="2.5" fill="#0ea5e9" />
          <rect x="53" y="49" width="14" height="10" rx="2.5" fill="#0ea5e9" />
          <line x1="47" y1="54" x2="53" y2="54" stroke="#334155" strokeWidth="2.5" />
        </>
      )}
      {style === 'pirate' && (
        <>
          <path d="M20 46 Q24 22 50 22 Q76 22 80 46 L20 46 Z" fill={hair} />
          <circle cx="50" cy="30" r="5" fill="white" opacity="0.85" />
          <circle cx="40" cy="54" r="7" fill="#1f2937" />
          <line x1="30" y1="46" x2="52" y2="42" stroke="#1f2937" strokeWidth="3" />
        </>
      )}
      {style === 'luna' && (
        <>
          <path d="M23 56 A27 27 0 0 1 77 56 L77 48 Q66 40 50 40 Q34 40 23 48 Z" fill={hair} />
          <path d="M60 22 Q50 24 52 34 Q60 32 60 22 Z" fill="#fef08a" />
          <circle cx="34" cy="30" r="2.2" fill="#fef08a" />
          <circle cx="70" cy="34" r="1.8" fill="#fef08a" />
        </>
      )}
      {style === 'goggles' && (
        <>
          <path d="M23 56 A27 27 0 0 1 77 56 L77 47 Q66 39 50 39 Q34 39 23 47 Z" fill={hair} />
          <rect x="28" y="47" width="44" height="13" rx="6.5" fill="#facc15" stroke="#a16207" strokeWidth="2" />
          <circle cx="40" cy="53.5" r="4.5" fill="#7dd3fc" />
          <circle cx="60" cy="53.5" r="4.5" fill="#7dd3fc" />
          <path d="M80 24 L72 36 L78 36 L70 48" stroke="#fef08a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      )}
      {style === 'horns' && (
        <>
          <path d="M28 42 Q20 26 30 18 Q32 32 38 38 Z" fill={hair} />
          <path d="M72 42 Q80 26 70 18 Q68 32 62 38 Z" fill={hair} />
          <path d="M23 56 A27 27 0 0 1 77 56 L77 49 Q66 41 50 41 Q34 41 23 49 Z" fill={hair} />
        </>
      )}
      {style === 'crown' && (
        <>
          <path d="M30 36 L30 20 L38 30 L50 16 L62 30 L70 20 L70 36 Z" fill="#facc15" stroke="#a16207" strokeWidth="2" />
          <circle cx="50" cy="24" r="2.5" fill="#ef4444" />
          <path d="M23 56 A27 27 0 0 1 77 56 L77 49 Q66 41 50 41 Q34 41 23 49 Z" fill={hair} />
        </>
      )}
      {style === 'hood' && (
        <path d="M23 58 A27 27 0 0 1 77 58 L77 46 Q66 36 50 36 Q34 36 23 46 Z" fill={hair} />
      )}

      {/* עיניים (לנינג'ה ולרובוט כבר יש) */}
      {style !== 'ninja' && style !== 'robot' && (
        <>
          <circle cx="40" cy="54" r="3.4" fill="#1f2937" />
          {style !== 'pirate' && <circle cx="60" cy="54" r="3.4" fill="#1f2937" />}
          {style === 'pirate' ? null : <circle cx="61.2" cy="52.8" r="1.1" fill="white" />}
          <circle cx="41.2" cy="52.8" r="1.1" fill="white" />
          {/* גבות נחושות */}
          <line x1="35" y1="47" x2="45" y2="49" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
          {style !== 'pirate' && (
            <line x1="65" y1="47" x2="55" y2="49" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
          )}
        </>
      )}

      {/* חיוך בטוח */}
      {style !== 'ninja' && (
        <path d="M43 67 Q50 73 57 67" stroke="#7a4a32" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      )}
    </svg>
  )
}
