// דיבור וזיהוי דיבור - הכל מובנה בדפדפן, בלי שירותים חיצוניים

let voice = null

function pickVoice() {
  try {
    const vs = window.speechSynthesis.getVoices().filter((v) => v.lang && v.lang.startsWith('en'))
    voice =
      vs.find((v) => /google us english/i.test(v.name)) ||
      vs.find((v) => v.lang === 'en-US' && /natural|online/i.test(v.name)) ||
      vs.find((v) => v.lang === 'en-US') ||
      vs[0] ||
      null
  } catch {
    voice = null
  }
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  pickVoice()
  window.speechSynthesis.onvoiceschanged = pickVoice
}

// הגייה איטית וברורה - מותאם ללומד מתחיל
export function say(text, rate = 0.8) {
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    if (voice) u.voice = voice
    u.lang = 'en-US'
    u.rate = rate
    u.pitch = 1.05
    window.speechSynthesis.speak(u)
  } catch {
    // אין תמיכה בקריין - ממשיכים בשקט
  }
}

// קריין עברי לסיפור ולחידות - אם יש קול עברי במכשיר
export function sayHe(text) {
  try {
    const vs = window.speechSynthesis.getVoices().filter((v) => v.lang && v.lang.startsWith('he'))
    if (!vs.length) return false
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.voice = vs[0]
    u.lang = 'he-IL'
    u.rate = 0.95
    window.speechSynthesis.speak(u)
    return true
  } catch {
    return false
  }
}

export function canListen() {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}

// מאזין למיקרופון ובודק אם נאמרה המילה המצופה (או אחת מהצורות המקובלות)
export function listenFor(expectedList, { timeoutMs = 6000 } = {}) {
  return new Promise((resolve) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return resolve({ supported: false, ok: false })

    const rec = new SR()
    rec.lang = 'en-US'
    rec.interimResults = false
    rec.maxAlternatives = 5

    let done = false
    const finish = (result) => {
      if (done) return
      done = true
      try { rec.abort() } catch { /* כבר נסגר */ }
      clearTimeout(timer)
      resolve(result)
    }

    const expected = expectedList.map((e) => e.toLowerCase())

    rec.onresult = (e) => {
      const heardAlts = [...e.results[0]].map((a) => a.transcript.toLowerCase().trim())
      const ok = heardAlts.some((t) => expected.some((exp) => t === exp || t.includes(exp)))
      finish({ supported: true, ok, heard: heardAlts[0] || '' })
    }
    rec.onerror = (e) => finish({ supported: true, ok: false, error: e.error, heard: '' })
    rec.onend = () => finish({ supported: true, ok: false, heard: '' })

    const timer = setTimeout(() => finish({ supported: true, ok: false, timeout: true, heard: '' }), timeoutMs)
    try {
      rec.start()
    } catch {
      finish({ supported: true, ok: false, error: 'start-failed', heard: '' })
    }
  })
}
