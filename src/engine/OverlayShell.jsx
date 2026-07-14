// חלון מיני-חידה מעל הסצנה
export default function OverlayShell({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-amber-400/40 rounded-3xl p-5 w-full max-w-md shadow-2xl animate-bigpop max-h-[92dvh] overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-yellow-300 text-xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="bg-white/10 rounded-full w-9 h-9 text-white/80 font-bold active:scale-90 transition-transform"
            aria-label="סגירה"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
