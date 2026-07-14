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
  // צלילי סצנה - point-and-click
  squeak: () => { tone(1400, 0.08, 'triangle', 0, 0.18); tone(1750, 0.1, 'triangle', 0.09, 0.18) },
  thud: () => tone(95, 0.18, 'sine', 0, 0.3),
  locked: () => { tone(480, 0.06, 'square', 0, 0.1); tone(420, 0.08, 'square', 0.09, 0.1) },
  unlock: () => { tone(520, 0.07, 'triangle', 0, 0.22); tone(700, 0.07, 'triangle', 0.1, 0.22); tone(920, 0.14, 'triangle', 0.2, 0.25) },
  blub: () => { tone(300, 0.1, 'sine', 0, 0.2); tone(420, 0.12, 'sine', 0.1, 0.16) },
  creak: () => { tone(180, 0.25, 'sawtooth', 0, 0.07); tone(150, 0.3, 'sawtooth', 0.18, 0.06) },
  pickup: () => { tone(660, 0.09, 'triangle', 0, 0.24); tone(880, 0.09, 'triangle', 0.08, 0.24); tone(1320, 0.16, 'triangle', 0.16, 0.26) },
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
