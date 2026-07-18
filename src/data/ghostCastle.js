// חדר 5: טירת הרוחות 🏰
// חדש כאן: חידת הקשבה בתוך הסצנה (מצאו את הספר בצבע הנכון - בלי חלון!),
// שעון עם קוד מספרים גדולים (6-9), חדר חשוך שנדלק, ושאדו כלוא בתוך מראה!
import { HallScene, GhostLibraryScene, KitchenScene, MirrorScene } from '../scenes/ghostArt.jsx'

const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1))
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

const BOOK_ORDER = ['purple', 'white', 'black', 'brown', 'red', 'green']
const COLOR_HE = { purple: 'סגול', white: 'לבן', black: 'שחור', brown: 'חום', red: 'אדום', green: 'ירוק' }

export default {
  id: 'ghost-castle',
  type: 'scene',
  title: 'טירת הרוחות',
  emoji: '🏰',
  guideEmoji: '👻',
  rescue: 'shadow',
  parTime: 600,
  bg: 'from-slate-950 via-indigo-950 to-slate-900',
  intro: [
    'הסתתרתם מהגשם בטירה ישנה... והשער ננעל מאחוריכם! 🏰',
    'הטירה מלאה רוחות - אבל אל דאגה, הן דווקא נחמדות! 👻',
    'בחדר המראות כלוא שאדו - הלוחם מזירת האנגלית - בתוך מראה מכושפת! 🌑',
    'רוח קטנה תדריך אתכם באנגלית. פתרו את סודות הטירה ושחררו אותו! 🍀',
  ],
  treasure: { emoji: '🕯️', name: 'נר הנצח', desc: 'נר שאף רוח לא יכולה לכבות' },
  outro: 'המראה נסדקה באלף רסיסי אור - שאדו זינק החוצה! הרוחות נופפו לשלום כשברחתם אל הלילה... 🌙',

  // הקוד של השעון וצבע הספר הסודי - אקראיים בכל משחק
  setup() {
    return {
      clockCode: [r(6, 9), r(6, 9), r(6, 9)],
      bookColor: pick(['purple', 'white', 'black', 'brown']),
    }
  },

  items: {
    brassKey: { emoji: '🗝️', en: 'Key', he: 'מפתח פליז', word: 'key' },
    cheese: { emoji: '🧀', en: 'Cheese', he: 'גבינה', word: 'cheese' },
    ring: { emoji: '💍', en: 'Ring', he: 'טבעת קסומה' },
    brush: { emoji: '🖌️', en: 'Brush', he: 'מברשת קסמים' },
  },

  scenes: [
    {
      id: 'hall',
      name: 'אולם הכניסה',
      Art: HallScene,
      hotspots: [
        {
          id: 'clock',
          area: { x: 75, y: 185, w: 165, h: 430 },
          onTap(api) {
            if (api.has('clockOpen') && !api.has('gotBrassKey')) {
              api.set('gotBrassKey')
              api.addItem('brassKey')
            } else if (!api.has('clockOpen')) {
              api.openOverlay('clockLock')
            } else {
              api.sfx.tap()
              api.pulse('clock')
            }
          },
        },
        {
          id: 'portrait',
          area: { x: 295, y: 155, w: 130, h: 160 },
          onTap(api) {
            api.sfx.squeak()
            api.sayHe('העיניים של הציור עוקבות אחריכם... 👀')
            api.pulse('portrait')
          },
        },
        {
          id: 'armor',
          area: { x: 505, y: 370, w: 130, h: 290 },
          onTap(api) {
            api.sfx.thud()
            api.sayHe('השריון ריק... או שלא?')
            api.pulse('armor')
          },
        },
        {
          id: 'chandelier',
          area: { x: 285, y: 40, w: 150, h: 75 },
          onTap(api) {
            api.sfx.creak()
            api.pulse('chandelier')
          },
        },
      ],
    },
    {
      id: 'library',
      name: 'הספרייה',
      Art: GhostLibraryScene,
      hotspots: [
        // 6 הספרים הצבעוניים - חידת הקשבה בתוך הסצנה!
        ...BOOK_ORDER.map((color, i) => ({
          id: 'book-' + color,
          area: { x: 178 + i * 62, y: 330, w: 48, h: 92 },
          onTap(api) {
            if (api.has('bookFound')) {
              api.sfx.tap()
              return
            }
            if (!api.has('gotRing')) {
              // הרמז לספר מגיע רק אחרי הטבעת - קודם שומעים את ההוראה
              api.repeat()
              api.pulse('book-' + color)
              return
            }
            if (color === api.setup.bookColor) {
              api.set('bookFound')
              api.sfx.unlock()
              api.learnWord(color)
              api.learnWord('book')
              api.sayHe('הספר ה' + COLOR_HE[color] + ' זז... תא סודי נפתח!')
            } else {
              api.sfx.locked()
              api.pulse('book-' + color)
              api.repeat()
            }
          },
        })),
        {
          id: 'niche',
          area: { x: 295, y: 435, w: 130, h: 70 },
          onTap(api) {
            if (api.has('bookFound') && !api.has('gotBrush')) {
              api.set('gotBrush')
              api.addItem('brush')
            } else api.sfx.tap()
          },
        },
        {
          id: 'piano',
          area: { x: 60, y: 510, w: 250, h: 150 },
          onTap(api) {
            if (!api.has('pianoDone')) api.openOverlay('pianoGhost')
            else {
              api.sfx.good()
              api.pulse('piano')
            }
          },
        },
        {
          id: 'mouse',
          area: { x: 570, y: 615, w: 120, h: 65 },
          onTap(api) {
            if (api.has('mouseFed') && !api.has('gotRing')) {
              api.set('gotRing')
              api.addItem('ring')
            } else if (!api.has('mouseFed')) {
              api.sfx.squeak()
              api.sayHe('העכבר רעב ולא זז... מה עכברים אוהבים?')
              api.pulse('mouse')
            } else api.sfx.tap()
          },
          onItem(item, api) {
            if (item === 'cheese' && !api.has('mouseFed')) {
              api.set('mouseFed')
              api.removeItem('cheese')
              api.sfx.good()
              api.sayHe('העכבר חטף את הגבינה ורץ... ומגלגל החוצה טבעת נוצצת!')
              api.pulse('mouse')
              return true
            }
            return false
          },
        },
      ],
    },
    {
      id: 'kitchen',
      name: 'המטבח',
      Art: KitchenScene,
      hotspots: [
        {
          id: 'cupboard',
          area: { x: 430, y: 320, w: 220, h: 190 },
          onTap(api) {
            if (api.has('cupboardOpen') && !api.has('gotCheese')) {
              api.set('gotCheese')
              api.addItem('cheese')
            } else {
              api.sfx.locked()
              api.pulse('cupboard')
            }
          },
          onItem(item, api) {
            if (item === 'brassKey' && !api.has('cupboardOpen')) {
              api.set('cupboardOpen')
              api.removeItem('brassKey')
              api.sfx.unlock()
              api.pulse('cupboard')
              return true
            }
            return false
          },
        },
        {
          id: 'stove',
          area: { x: 80, y: 400, w: 180, h: 265 },
          onTap(api) {
            api.sfx.blub()
            api.sayHe('משהו מבעבע בקדירה של הרוחות... איכס!')
            api.pulse('stove')
          },
        },
        {
          id: 'pots',
          area: { x: 320, y: 520, w: 320, h: 90 },
          onTap(api) {
            api.sfx.thud()
            api.pulse('pots')
          },
        },
      ],
    },
    {
      id: 'mirror',
      name: 'חדר המראות',
      Art: MirrorScene,
      hotspots: [
        {
          id: 'mirror',
          area: { x: 245, y: 165, w: 230, h: 480 },
          onTap(api) {
            if (!api.has('pianoDone')) {
              api.sayHe('חשוך מדי... משהו בטירה צריך להדליק את הנרות!')
              api.pulse('mirror')
            } else if (!api.has('mirrorClean')) {
              api.sayHe('המראה מאובקת לגמרי... צריך לנקות אותה!')
              api.pulse('mirror')
            } else if (!api.has('shadowFreed')) {
              api.sayHe('שאדו כלוא בפנים! בחרו את הטבעת במלאי ולחצו על המראה')
              api.pulse('mirror')
            } else if (!api.has('doorOpen')) {
              // הילד לוחץ על המראה כדי לברוח? הגיוני! שאדו מפוצץ את הדלת מבפנים
              api.set('doorOpen')
              api.sfx.unlock()
              api.later(() => api.sfx.creak(), 400)
            }
          },
          onItem(item, api) {
            if (item === 'brush' && api.has('pianoDone') && !api.has('mirrorClean')) {
              api.set('mirrorClean')
              api.removeItem('brush')
              api.sfx.good()
              api.sayHe('האבק יורד... יש מישהו בתוך המראה!')
              api.pulse('mirror')
              return true
            }
            if (item === 'brush' && !api.has('pianoDone')) {
              api.parrot('Too dark! I need LIGHT!', 'חשוך מדי לנקות... צריך אור בחדר!')
              return true
            }
            if (item === 'ring' && api.has('mirrorClean') && !api.has('shadowFreed')) {
              api.set('shadowFreed')
              api.removeItem('ring')
              api.sfx.unlock()
              api.later(() => api.sfx.win(), 600)
              api.pulse('mirror')
              return true
            }
            if (item === 'ring' && !api.has('mirrorClean')) {
              api.parrot('Clean the MIRROR first!', 'קודם לנקות את המראה!')
              return true
            }
            return false
          },
        },
        {
          id: 'exitDoor',
          area: { x: 550, y: 420, w: 150, h: 255 },
          onTap(api) {
            if (api.has('shadowFreed') && !api.has('doorOpen')) {
              api.set('doorOpen')
              api.sfx.unlock()
              api.later(() => api.sfx.creak(), 400)
            } else if (!api.has('shadowFreed')) {
              api.sfx.locked()
              api.parrot('First free SHADOW!', 'הדלת מכושפת... קודם לשחרר את שאדו מהמראה!')
              api.pulse('exitDoor')
            }
          },
        },
      ],
    },
  ],

  overlays: {
    clockLock: (api) => ({
      type: 'keypad',
      title: '🕰️ שעון הסבא המכושף',
      text: 'השעון עצר לפני מאה שנה! הרוח לוחשת את הקוד באנגלית - מספרים גדולים!',
      code: api.setup.clockCode,
      onSolved(a) {
        a.set('clockOpen')
        a.later(() => a.closeOverlay(), 400)
      },
    }),
    pianoGhost: {
      type: 'simon',
      title: '🎹 הפסנתר הרדוף',
      pads: [
        { emoji: '👻', tone: 220, color: 'from-slate-400 to-slate-700' },
        { emoji: '🕯️', tone: 294, color: 'from-amber-300 to-orange-600' },
        { emoji: '🦉', tone: 370, color: 'from-violet-400 to-purple-700' },
        { emoji: '🌙', tone: 466, color: 'from-sky-400 to-indigo-700' },
      ],
      rounds: [3, 4, 4],
      onSolved(api) {
        api.set('pianoDone')
        api.closeOverlay()
        api.later(() => api.sayHe('הנברשות בכל הטירה נדלקות!'), 600)
      },
    },
  },

  guide(f, setup) {
    if (!f.clockOpen) return { en: 'Boo! The clock is stuck! Listen to the NUMBERS!', he: 'שעון הסבא תקוע - הקשיבו למספרים הגדולים!' }
    if (!f.gotBrassKey) return { en: 'Take the KEY!', he: 'קחו את המפתח מתוך השעון!' }
    if (!f.gotCheese) return { en: 'Open the cupboard! Find the CHEESE!', he: 'פתחו את הארונית במטבח עם המפתח!' }
    if (!f.mouseFed) return { en: 'Give the CHEESE to the mouse!', he: 'תנו את הגבינה לעכבר בספרייה!' }
    if (!f.gotRing) return { en: 'Take the RING!', he: 'קחו את הטבעת שהעכבר גלגל!' }
    if (!f.bookFound) return { en: `Find the ${setup.bookColor.toUpperCase()} BOOK!`, he: 'מצאו את הספר בצבע הנכון במדף התחתון!' }
    if (!f.gotBrush) return { en: 'Take the BRUSH!', he: 'קחו את המברשת מהתא הסודי!' }
    if (!f.pianoDone) return { en: 'Play the ghost piano! Listen and repeat!', he: 'נגנו בפסנתר הרדוף - חזרו על השיר!' }
    if (!f.mirrorClean) return { en: 'Clean the MIRROR with the BRUSH!', he: 'נקו את המראה הגדולה עם המברשת!' }
    if (!f.shadowFreed) return { en: 'Put the RING in the mirror! Free SHADOW!', he: 'שימו את הטבעת בחריץ הזוהר - שחררו את שאדו!' }
    if (!f.doorOpen) return { en: 'Open the DOOR! Run!', he: 'שאדו חופשי! פתחו את הדלת וברחו!' }
    return { en: 'YES! Goodbye, ghosts!', he: 'ברחתם! להתראות רוחות!' }
  },

  hints(f, setup) {
    if (!f.clockOpen) return [
      'שעון הסבא הגדול באולם הכניסה - לחצו עליו!',
      'הרוח אומרת מספרים גדולים: SIX=6, SEVEN=7, EIGHT=8, NINE=9',
    ]
    if (!f.gotBrassKey) return ['המפתח נוצץ בתוך ארון השעון הפתוח!']
    if (!f.gotCheese) return [
      'CHEESE זה גבינה! 🧀 היא בארונית הנעולה במטבח',
      'בחרו את המפתח במלאי ולחצו על הארונית עם המנעול העגול',
    ]
    if (!f.mouseFed) return ['יש עכבר קטן בפינת הספרייה - עכברים מתים על גבינה! 🐭']
    if (!f.gotRing) return ['הטבעת שהעכבר גלגל נוצצת ליד החור שלו!']
    if (!f.bookFound) return [
      'הספרים הגדולים במדף התחתון של הספרייה - אחד מהם מזיז קיר!',
      'הרוח אומרת צבע באנגלית: PURPLE=סגול, WHITE=לבן, BLACK=שחור, BROWN=חום',
      'הצבע הנכון הפעם: ' + setup.bookColor.toUpperCase() + ' = ' + COLOR_HE[setup.bookColor] + '!',
    ]
    if (!f.gotBrush) return ['המברשת בתא הסודי שנפתח מתחת לספרים!']
    if (!f.pianoDone) return ['הפסנתר בספרייה זוהר - נגנו וחזרו על השיר של הרוחות 🎹']
    if (!f.mirrorClean) return [
      'עכשיו יש אור בחדר המראות! ✨',
      'בחרו את המברשת ולחצו על המראה הגדולה המאובקת',
    ]
    if (!f.shadowFreed) return ['רואים את שאדו במראה! שימו את הטבעת בחריץ הזהב הזוהר למטה 💍']
    if (!f.doorOpen) return ['לחצו על דלת היציאה - היא כבר לא מכושפת! 🚪']
    return []
  },

  focus(f) {
    if (!f.clockOpen || !f.gotBrassKey) return { scene: 'hall', hotspot: 'clock' }
    if (!f.gotCheese) return { scene: 'kitchen', hotspot: 'cupboard' }
    if (!f.mouseFed || !f.gotRing) return { scene: 'library', hotspot: 'mouse' }
    if (!f.bookFound) return { scene: 'library', hotspot: 'book-purple' }
    if (!f.gotBrush) return { scene: 'library', hotspot: 'niche' }
    if (!f.pianoDone) return { scene: 'library', hotspot: 'piano' }
    if (!f.mirrorClean || !f.shadowFreed) return { scene: 'mirror', hotspot: 'mirror' }
    return { scene: 'mirror', hotspot: 'exitDoor' }
  },

  isWon: (f) => !!f.doorOpen,
}
