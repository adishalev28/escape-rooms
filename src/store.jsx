import { createContext, useContext, useEffect, useState } from 'react'

const KEY = 'escape-rooms-save-v1'

const DEFAULT = {
  treasures: [],   // אוצרות שנאספו: { roomId, emoji, name }
  best: {},        // שיא זמן לכל חדר (שניות) - רק משתפר
  completed: {},   // roomId -> כמה פעמים ברחו
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT
    return { ...DEFAULT, ...JSON.parse(raw) }
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

  function finishRoom(room, seconds) {
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
      }
    })
  }

  return (
    <Ctx.Provider value={{ ...state, finishRoom }}>
      {children}
    </Ctx.Provider>
  )
}

export function useGame() {
  return useContext(Ctx)
}
