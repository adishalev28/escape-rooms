import { say } from '../speech.js'
import { sfx } from '../audio.js'

// בועת התוכי המדריך - אנגלית גדולה בקול, עברית קטנה מתחת
export default function GuideBubble({ bubble }) {
  if (!bubble) return null
  return (
    <div className="flex items-center gap-2.5" key={bubble.key}>
      <div className="text-4xl animate-floaty shrink-0">🦜</div>
      <div className="relative flex-1 bg-emerald-400/15 border border-emerald-300/40 rounded-2xl rounded-br-sm px-4 py-2 animate-pop">
        <p className="text-white text-lg sm:text-xl font-bold" dir="ltr">
          {bubble.en}
          <button
            onClick={() => { sfx.tap(); say(bubble.en) }}
            className="ml-2 bg-white/15 rounded-full px-2 py-0.5 text-sm align-middle active:scale-90 transition-transform"
            aria-label="השמע שוב"
          >
            🔊
          </button>
        </p>
        <p className="text-emerald-200/80 font-bold text-sm">{bubble.he}</p>
      </div>
    </div>
  )
}
