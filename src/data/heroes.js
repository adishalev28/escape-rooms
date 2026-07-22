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
  bolt: {
    ...BRAWLERS.find((b) => b.id === 'bolt'),
    power: { id: 'freeze', icon: '❄️', name: 'הקפאת זמן', desc: 'מקפיא את השעון לדקה שלמה - לציידי שיאים!' },
    trappedIn: 'dragon-cave',
  },
  shadow: {
    ...BRAWLERS.find((b) => b.id === 'shadow'),
    power: { id: 'whisper', icon: '🌑', name: 'לחישת הצל', desc: 'לוחש רמז בקול - בלי לשרוף את מדליית "בלי רמזים"!' },
    trappedIn: 'ghost-castle',
  },
  king: {
    ...BRAWLERS.find((b) => b.id === 'king'),
    female: false,
    power: { id: 'pardon', icon: '👑', name: 'חנינה מלכותית', desc: 'טעות ההקשבה הראשונה נסלחת - מדליית "אוזן מושלמת" נשארת! (אוטומטי)', passive: true },
    trappedIn: 'candy-kingdom',
  },
  rocky: {
    ...BRAWLERS.find((b) => b.id === 'rocky'),
    power: { id: 'stonehint', icon: '🪨', name: 'חוכמת האבן', desc: 'הרמז הראשון בכל חדר חינם - מדליית "בלי רמזים" נשארת! (אוטומטי)', passive: true },
    trappedIn: 'jungle-temple',
  },
  ninja: {
    ...BRAWLERS.find((b) => b.id === 'ninja'),
    power: { id: 'shuriken', icon: '✴️', name: 'כוכב הנינג\'ה', desc: 'מעלים 2 תשובות שגויות במנעולי הקשבה - פעם אחת בכל מנעול' },
    trappedIn: 'undersea-city',
  },
  blaze: {
    ...BRAWLERS.find((b) => b.id === 'blaze'),
    power: { id: 'heat', icon: '🔥', name: 'חום האש', desc: 'השעון קפוא בזמן מיני-חידות - פותרים בנחת בלי לאבד שיאים! (אוטומטי)', passive: true },
    trappedIn: 'volcano',
  },
}

export const heroList = Object.values(HEROES)
