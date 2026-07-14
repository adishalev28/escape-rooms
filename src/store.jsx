import { createContext, useContext, useEffect, useState } from 'react'

const KEY = 'escape-rooms-save-v1'

const DEFAULT = {
  treasures: [],   // אוצרות שנאספו: { roomId, emoji, name }
  best: {},        // שיא זמן לכל חדר (שניות) - רק משתפר
  completed: {},   // roomId -> כמה פעמים ברחו
  rescued: [],     // לוחמים שניצלו במסע (hero ids)
  medals: {},      // roomId -> [medal ids]
  words: {},       // wordId -> כמה פעמים נשמעה ופעלו לפיה
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT
    const s = { ...DEFAULT, ...JSON.parse(raw) }
    // מי שכבר ברח מספינת הפיראטים בגרסה 1 - הקפטן שלו ניצל רטרואקטיבית
    if (s.completed['pirate-ship'] && !s.rescued.includes('captain')) {
      s.rescued = [...s.rescued, 'captain']
      s.medals = { ...s.medals, 'pirate-ship': [...new Set([...(s.medals['pirate-ship'] || []), 'escaped'])] }
    }
    return s
  } catch {
    return DEFAULT
  }
}

const Ctx = createContext(null)

export function GameProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  // סיום חדר: אוצר, שיא, מדליות, ולוחם שניצל
  function finishRoom(room, seconds, newMedals = ['escaped'], rescuedId = null) {
    setState((s) => {
      const hasTreasure = s.treasures.some((t) => t.roomId === room.id)
      const prevBest = s.best[room.id]
      return {
        ...s,
        treasures: hasTreasure
          ? s.treasures
          : [...s.treasures, { roomId: room.id, ...room.treasure }],
        best: { ...s.best, [room.id]: prevBest ? Math.min(prevBest, seconds) : seconds },
        completed: { ...s.completed, [room.id]: (s.completed[room.id] || 0) + 1 },
        medals: { ...s.medals, [room.id]: [...new Set([...(s.medals[room.id] || []), ...newMedals])] },
        rescued: rescuedId && !s.rescued.includes(rescuedId) ? [...s.rescued, rescuedId] : s.rescued,
      }
    })
  }

  // מילה באנגלית שנשמעה ופעלו לפיה נכון - נאספת לאלבום
  function learnWord(id) {
    if (!id) return
    setState((s) => ({ ...s, words: { ...s.words, [id]: (s.words[id] || 0) + 1 } }))
  }

  return (
    <Ctx.Provider value={{ ...state, finishRoom, learnWord }}>
      {children}
    </Ctx.Provider>
  )
}

export function useGame() {
  return useContext(Ctx)
}
