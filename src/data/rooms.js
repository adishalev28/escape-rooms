// רישום החדרים - חדר = קובץ נתונים + קובץ אמנות, המנוע מריץ הכל
// הסדר כאן = מפת המסע: חדר נפתח רק אחרי שבורחים מהקודם
import pirateShip from './pirateShip.js'
import spaceStation from './spaceStation.js'
import wizardTower from './wizardTower.js'
import dragonCave from './dragonCave.js'
import ghostCastle from './ghostCastle.js'
import candyKingdom from './candyKingdom.js'
import jungleTemple from './jungleTemple.js'
import underseaCity from './underseaCity.js'
import volcano from './volcano.js'

export const ROOMS = [
  pirateShip,
  spaceStation,
  wizardTower,
  dragonCave,
  ghostCastle,
  candyKingdom,
  jungleTemple,
  underseaCity,
  volcano,
  // התחנה האחרונה במסע - מוצגת נעולה
  { id: 'thorn-island', title: 'אי הקוצים', emoji: '🌵', comingSoon: true },
]
