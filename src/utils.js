export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const rand = (n) => Math.floor(Math.random() * n)

export const pick = (arr) => arr[rand(arr.length)]

// בוחר מילה לתרגול: עדיפות למילים חלשות (קופסה נמוכה), בלי לחזור על האחרונות
export function pickForPractice(pool, boxes, recentIds, count) {
  const scored = shuffle(pool).map((w) => ({
    w,
    score: (boxes[w.id] || 0) * 2 + (recentIds.includes(w.id) ? 10 : 0) + Math.random(),
  }))
  scored.sort((a, b) => a.score - b.score)
  return scored.slice(0, count).map((s) => s.w)
}
