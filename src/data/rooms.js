// רישום החדרים - חדר = קובץ נתונים + קובץ אמנות, המנוע מריץ הכל
// הסדר כאן = מפת המסע: חדר נפתח רק אחרי שבורחים מהקודם
import pirateShip from './pirateShip.js'
import spaceStation from './spaceStation.js'
import wizardTower from './wizardTower.js'
import dragonCave from './dragonCave.js'
import ghostCastle from './ghostCastle.js'
import candyKingdom from './candyKingdom.js'

export const ROOMS = [
  pirateShip,
  spaceStation,
  wizardTower,
  dragonCave,
  ghostCastle,
  candyKingdom,
  // התחנה הבאה במסע - מוצגת נעולה
  { id: 'jungle-temple', title: 'מקדש הג\'ונגל', emoji: '🐒', comingSoon: true },
]
