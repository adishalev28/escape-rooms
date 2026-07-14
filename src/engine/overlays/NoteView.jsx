// הפתק של התוכי - מגילה עם מה שצריך לספור
export default function NoteView({ config }) {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-b from-amber-100 to-amber-200 rounded-2xl p-5 mx-auto max-w-xs shadow-inner border-4 border-amber-700/40">
        <p className="text-amber-900 text-lg font-bold mb-3">{config.heading}</p>
        <div className="space-y-2" dir="ltr">
          {config.lines.map((line, i) => (
            <div key={i} className="flex items-center justify-center gap-3 bg-amber-50/70 rounded-xl py-2">
              <span className="text-4xl">{line.emoji}</span>
              <span className="text-amber-900 text-3xl font-bold">= ?</span>
            </div>
          ))}
        </div>
        <p className="text-amber-800/80 font-bold text-sm mt-3">{config.footer}</p>
      </div>
    </div>
  )
}
