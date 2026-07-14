// הלוחמים מזירת האנגלית שנלכדו בחדרים - הצלה שלהם = כוח אמיתי במסע
import { BRAWLERS } from './brawlers.js'

// כוחות: reveal = מראה איפה הצעד הבא, slow = השמעה איטית במנעולי הקשבה, xray = כל נקודות הלחיצה זוהרות
export const HEROES = {
  captain: {
    ...BRAWLERS.find((b) => b.id === 'captain'),
    power: { id: 'reveal', icon: '🧭', name: 'מצפן הקפטן', desc: 'מראה איפה הצעד הבא' },
    trappedIn: 'pirate-ship',
  },
  robo: {
    ...BRAWLERS.find((b) => b.id === 'robo'),
    power: { id: 'slow', icon: '🐢', name: 'אוזן ביונית', desc: 'משמיע מילים לאט-לאט במנעולי הקשבה' },
    trappedIn: 'space-station',
  },
  luna: {
    ...BRAWLERS.find((b) => b.id === 'luna'),
    female: true,
    power: { id: 'xray', icon: '🌙', name: 'זוהר הירח', desc: 'מאיר את כל המקומות שאפשר ללחוץ עליהם' },
    trappedIn: 'wizard-tower',
  },
}

export const heroList = Object.values(HEROES)
