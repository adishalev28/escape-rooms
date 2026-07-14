// רישום החדרים - חדר = קובץ נתונים + קובץ אמנות, המנוע מריץ הכל
// הסדר כאן = מפת המסע: חדר נפתח רק אחרי שבורחים מהקודם
import pirateShip from './pirateShip.js'
import spaceStation from './spaceStation.js'
import wizardTower from './wizardTower.js'

export const ROOMS = [
  pirateShip,
  spaceStation,
  wizardTower,
  // התחנה הבאה במסע - מוצגת נעולה
  { id: 'dragon-cave', title: 'מערת הדרקון', emoji: '🐉', comingSoon: true },
]
