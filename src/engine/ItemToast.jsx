// הכרזה על חפץ שנאסף - האנגלית בגדול, עברית קטנה
export default function ItemToast({ toast }) {
  return (
    <div
      key={toast.key}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="bg-black/70 backdrop-blur rounded-3xl px-8 py-5 text-center animate-bigpop border-2 border-yellow-300/60">
        <div className="text-6xl">{toast.emoji}</div>
        <div className="text-yellow-300 text-3xl font-bold mt-1" dir="ltr">{toast.en.toUpperCase()}!</div>
        <div className="text-white/80 font-bold">{toast.he}</div>
      </div>
    </div>
  )
}
