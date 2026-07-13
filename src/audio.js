// אפקטים קוליים מסונתזים - אין קבצי אודיו
let ctx = null

function ac() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(freq, dur = 0.15, type = 'sine', when = 0, vol = 0.22) {
  try {
    const c = ac()
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = type
    o.frequency.value = freq
    const t = c.currentTime + when
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(vol, t + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g)
    g.connect(c.destination)
    o.start(t)
    o.stop(t + dur + 0.05)
  } catch {
    // אין תמיכה באודיו
  }
}

// תו בודד למנגינות (חידת הסימון של התוכי)
export const note = (freq, dur = 0.35) => tone(freq, dur, 'triangle', 0, 0.3)

export const sfx = {
  tap: () => tone(620, 0.07, 'triangle'),
  good: () => {
    tone(523, 0.12)
    tone(659, 0.12, 'sine', 0.09)
    tone(784, 0.2, 'sine', 0.18)
  },
  bad: () => tone(150, 0.3, 'sawtooth', 0, 0.12),
  win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.18, 'triangle', i * 0.13, 0.28)),
  star: () => {
    tone(880, 0.1, 'triangle')
    tone(1175, 0.15, 'triangle', 0.08)
  },
}
