// רישום החדרים - חדר = קובץ נתונים + קובץ אמנות, המנוע מריץ הכל
// הסדר כאן = מפת המסע: חדר נפתח רק אחרי שבורחים מהקודם
import pirateShip from './pirateShip.js'
import spaceStation from './spaceStation.js'
import wizardTower from './wizardTower.js'
import dragonCave from './dragonCave.js'

export const ROOMS = [
  pirateShip,
  spaceStation,
  wizardTower,
  dragonCave,
  // התחנה הבאה במסע - מוצגת נעולה
  { id: 'ghost-castle', title: 'טירת הרוחות', emoji: '🏰', comingSoon: true },
]
