// מלאי בתחתית המסך - בוחרים חפץ ומשתמשים בו על הסצנה
export default function Inventory({ items, inv, selected, onTap }) {
  return (
    <div className="mt-3 bg-black/30 backdrop-blur rounded-3xl p-2.5 flex items-center gap-2 min-h-[74px] border border-white/10">
      <span className="text-white/50 font-bold text-sm px-1 shrink-0">🎒 המלאי:</span>
      {inv.length === 0 && (
        <span className="text-white/35 font-bold text-sm">עוד אין חפצים - חפשו בסצנה!</span>
      )}
      <div className="flex gap-2 flex-wrap" dir="ltr">
        {inv.map((id) => {
          const it = items[id]
          const sel = selected === id
          return (
            <button
              key={id}
              onClick={() => onTap(id)}
              className={`w-14 h-14 rounded-2xl ${it.emoji.length > 3 ? 'text-lg' : 'text-3xl'} flex items-center justify-center transition-all active:scale-90 animate-pop ${
                sel
                  ? 'bg-yellow-400/30 ring-4 ring-yellow-300 animate-glowpulse'
                  : 'bg-white/10 border border-white/20'
              }`}
              aria-label={it.he}
            >
              {it.emoji}
            </button>
          )
        })}
      </div>
      {selected && (
        <span className="text-yellow-200 font-bold text-sm mr-auto pl-1 animate-pop">
          עכשיו לחצו איפה להשתמש!
        </span>
      )}
    </div>
  )
}
