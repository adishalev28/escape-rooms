// רישום החדרים - חדר = קובץ נתונים בלבד, המנוע מריץ הכל
// להוסיף חדר חדש: ליצור קובץ ב-data/ ולהוסיף אותו כאן
import pirateShip from './pirateShip.js'

export const ROOMS = [
  pirateShip,
  // חדרים עתידיים - מוצגים נעולים עם "בקרוב"
  { id: 'space-station', title: 'תחנת החלל', emoji: '🚀', comingSoon: true },
  { id: 'wizard-tower', title: 'מגדל הקוסם', emoji: '🧙', comingSoon: true },
]
