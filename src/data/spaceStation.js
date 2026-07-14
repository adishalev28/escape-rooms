// חדר 2: תחנת החלל 🚀 - רמה בינונית
// חדש כאן: שני חוטים במקביל (חשמל + כרטיס), ספירות אקראיות בכל משחק,
// מנעול צבעים מדבר, ולוח מקשים שמקשיב למספרים באנגלית. רובו לכוד בתא ההקפאה!
import { ControlScene, EngineScene, AirlockScene } from '../scenes/spaceArt.jsx'

const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1))

export default {
  id: 'space-station',
  type: 'scene',
  title: 'תחנת החלל',
  emoji: '🚀',
  guideEmoji: '🤖',
  rescue: 'robo',
  parTime: 480,
  bg: 'from-slate-950 via-indigo-950 to-blue-950',
  intro: [
    'טיסת החלל השתבשה - נתקעתם בתחנת חלל נטושה! 🚀',
    'החשמל כבוי, הדלתות נעולות... ומישהו קורא לעזרה!',
    'זה רובו - הלוחם מזירת האנגלית! הוא קפוא בתא ההקפאה! 🥶',
    'מחשב התחנה ידבר איתכם באנגלית. הצילו את רובו וברחו! 🍀',
  ],
  treasure: { emoji: '🛸', name: 'צלחת הכסף', desc: 'חללית קטנה שתמיד חוזרת אליכם' },
  outro: 'תא ההקפאה נפתח - רובו חופשי! קפצתם יחד לחללית הבריחה ועפתם הביתה! 🚀',

  // אקראיות: הספירות והקוד שונים בכל משחק - אי אפשר לשנן!
  setup() {
    return {
      planets: r(2, 4),
      comets: r(2, 5),
      aliens: r(2, 6),
      code: [r(1, 5), r(1, 5), r(1, 5)],
    }
  },

  items: {
    screwdriver: { emoji: '🪛', en: 'Screwdriver', he: 'מברג' },
    battery: { emoji: '🔋', en: 'Battery', he: 'סוללה', word: 'battery' },
    card: { emoji: '💳', en: 'Card', he: 'כרטיס', word: 'card' },
  },

  scenes: [
    {
      id: 'control',
      name: 'חדר הפיקוד',
      Art: ControlScene,
      hotspots: [
        {
          id: 'drawer',
          area: { x: 275, y: 530, w: 170, h: 70 },
          onTap(api) {
            if (!api.has('gotScrewdriver')) {
              api.set('gotScrewdriver')
              api.addItem('screwdriver')
            } else {
              api.sfx.thud()
              api.pulse('drawer')
            }
          },
        },
        {
          id: 'console',
          area: { x: 165, y: 370, w: 390, h: 120 },
          onTap(api) {
            if (!api.has('power')) {
              api.parrot('No power! Find the BATTERY!', 'אין חשמל! המסך כבוי')
              api.pulse('console')
            } else if (!api.has('consoleDone')) {
              api.openOverlay('consoleCode')
            } else {
              api.sfx.good()
              api.pulse('console')
            }
          },
        },
        {
          id: 'window',
          area: { x: 130, y: 70, w: 460, h: 290 },
          onTap(api) {
            if (api.has('power')) api.parrot('Look! Count the PLANETS!', 'כמה כוכבי לכת יש בחלון?')
            else api.sfx.thud()
            api.pulse('window')
          },
        },
        {
          id: 'drone',
          area: { x: 580, y: 115, w: 105, h: 125 },
          onTap(api) {
            api.pulse('drone')
            api.repeat()
          },
        },
      ],
    },
    {
      id: 'engine',
      name: 'חדר המנועים',
      Art: EngineScene,
      hotspots: [
        {
          id: 'vent',
          area: { x: 245, y: 545, w: 160, h: 115 },
          onTap(api) {
            if (api.has('ventOpen') && !api.has('gotBattery')) {
              api.set('gotBattery')
              api.addItem('battery')
            } else {
              api.sfx.locked()
              api.pulse('vent')
            }
          },
          onItem(item, api) {
            if (item === 'screwdriver' && !api.has('ventOpen')) {
              api.set('ventOpen')
              api.removeItem('screwdriver')
              api.sfx.unlock()
              api.pulse('vent')
              return true
            }
            return false
          },
        },
        {
          id: 'engine',
          area: { x: 420, y: 300, w: 245, h: 325 },
          onTap(api) {
            api.sfx.thud()
            api.pulse('engine')
          },
          onItem(item, api) {
            if (item === 'battery' && !api.has('power')) {
              api.set('power')
              api.removeItem('battery')
              api.sfx.unlock()
              api.later(() => api.sfx.win(), 500)
              api.pulse('engine')
              return true
            }
            return false
          },
        },
        {
          id: 'locker',
          area: { x: 55, y: 325, w: 165, h: 300 },
          onTap(api) {
            if (api.has('lockerOpen') && !api.has('gotCard')) {
              api.set('gotCard')
              api.addItem('card')
            } else if (!api.has('lockerOpen')) {
              api.openOverlay('lockerSimon')
            } else {
              api.sfx.thud()
              api.pulse('locker')
            }
          },
        },
        {
          id: 'comets',
          area: { x: 55, y: 80, w: 215, h: 215 },
          onTap(api) {
            api.sfx.blub()
            api.pulse('comets')
          },
        },
        {
          id: 'pipes',
          area: { x: 300, y: 50, w: 330, h: 90 },
          onTap(api) {
            api.sfx.creak()
            api.pulse('pipes')
          },
        },
      ],
    },
    {
      id: 'airlock',
      name: 'תא היציאה',
      Art: AirlockScene,
      hotspots: [
        {
          id: 'keypadPanel',
          area: { x: 320, y: 548, w: 115, h: 135 },
          onTap(api) {
            if (api.has('innerOpen')) {
              api.sfx.good()
              api.pulse('keypadPanel')
            } else if (!api.has('consoleDone')) {
              api.parrot('First count on the SCREEN!', 'קודם פתרו את מסך הספירה בחדר הפיקוד!')
              api.pulse('keypadPanel')
            } else {
              api.openOverlay('airlockKeypad')
            }
          },
        },
        {
          id: 'pod',
          area: { x: 80, y: 410, w: 210, h: 265 },
          onTap(api) {
            api.sfx.locked()
            api.pulse('pod')
          },
          onItem(item, api) {
            if (item !== 'card') return false
            if (!api.has('innerOpen')) {
              api.parrot('First open the DOOR! Listen to the numbers!', 'קודם פתחו את הדלת העגולה עם הקוד!')
              api.pulse('keypadPanel')
              return true
            }
            api.set('roboFreed')
            api.removeItem('card')
            api.sfx.unlock()
            api.later(() => api.sfx.win(), 600)
            api.pulse('pod')
            return true
          },
        },
        {
          id: 'aliens',
          area: { x: 55, y: 150, w: 230, h: 230 },
          onTap(api) {
            api.sfx.squeak()
            api.pulse('aliens')
          },
        },
        {
          id: 'airlockDoor',
          area: { x: 340, y: 240, w: 330, h: 330 },
          onTap(api) {
            api.sfx.thud()
            api.pulse('airlockDoor')
          },
        },
        {
          id: 'helmet',
          area: { x: 600, y: 95, w: 95, h: 95 },
          onTap(api) {
            api.sfx.blub()
            api.pulse('helmet')
          },
        },
      ],
    },
  ],

  overlays: {
    lockerSimon: {
      type: 'simon',
      title: '🎨 מנעול הצבעים',
      pads: [
        { emoji: '🔴', tone: 262, color: 'from-red-400 to-rose-700', word: 'Red' },
        { emoji: '🔵', tone: 330, color: 'from-blue-400 to-indigo-700', word: 'Blue' },
        { emoji: '🟢', tone: 392, color: 'from-emerald-400 to-green-700', word: 'Green' },
        { emoji: '🟡', tone: 523, color: 'from-amber-300 to-yellow-600', word: 'Yellow' },
      ],
      rounds: [2, 3, 4],
      onSolved(api) {
        ;['red', 'blue', 'green', 'yellow'].forEach((w) => api.learnWord(w))
        api.set('lockerOpen')
        api.closeOverlay()
      },
    },
    consoleCode: (api) => ({
      type: 'code',
      title: '🖥️ מסך הספירה',
      text: 'המחשב רוצה לדעת כמה יש מכל דבר בתחנה! חפשו בחלונות...',
      icons: ['🪐', '☄️', '👽'],
      answer: [api.setup.planets, api.setup.comets, api.setup.aliens],
      onSolved(a) {
        a.set('consoleDone')
        a.later(() => a.closeOverlay(), 400)
      },
    }),
    airlockKeypad: (api) => ({
      type: 'keypad',
      title: '🔢 קוד תא היציאה',
      text: 'המחשב אומר את הקוד באנגלית - הקישו את המספרים הנכונים!',
      code: api.setup.code,
      onSolved(a) {
        a.set('innerOpen')
        a.later(() => a.closeOverlay(), 400)
      },
    }),
  },

  guide(f) {
    if (!f.gotScrewdriver) return { en: 'Beep beep! Find the tool! Open the DRAWER!', he: 'מצאו את הכלי! פתחו את המגירה שמתחת למסך' }
    if (!f.ventOpen) return { en: 'Open the VENT with the SCREWDRIVER!', he: 'פתחו את פתח האוורור בחדר המנועים עם המברג' }
    if (!f.gotBattery) return { en: 'Take the BATTERY!', he: 'קחו את הסוללה!' }
    if (!f.power) return { en: 'Put the BATTERY in the engine!', he: 'שימו את הסוללה במנוע!' }
    if (!f.lockerOpen) return { en: 'Open the LOCKER! Listen to the COLORS!', he: 'פתחו את הלוקר - הקשיבו לשיר הצבעים!' }
    if (!f.gotCard) return { en: 'Take the CARD!', he: 'קחו את הכרטיס!' }
    if (!f.consoleDone) return { en: 'Count the PLANETS, the COMETS and the ALIENS!', he: 'ספרו בחלונות ופתרו את המסך בחדר הפיקוד!' }
    if (!f.innerOpen) return { en: 'Go to the round door! Listen to the NUMBERS!', he: 'לדלת העגולה! הקשיבו למספרים באנגלית!' }
    if (!f.roboFreed) return { en: 'Use the CARD! Free ROBO!', he: 'העבירו את הכרטיס בתא ההקפאה של רובו!' }
    return { en: 'YES! Robo is free! Let\'s fly!', he: 'רובו חופשי! עפים הביתה!' }
  },

  hints(f) {
    if (!f.gotScrewdriver) return [
      'DRAWER זה מגירה! היא בחדר הפיקוד',
      'מתחת למסך הגדול יש מגירה עם ידית - לחצו עליה!',
    ]
    if (!f.ventOpen) return [
      'VENT זה פתח אוורור - עם פסים, ליד הרצפה בחדר המנועים',
      'בחרו את המברג במלאי ולחצו על הפתח עם הפסים',
    ]
    if (!f.gotBattery) return ['BATTERY זה סוללה! 🔋 היא בתוך פתח האוורור הפתוח - לחצו עליה!']
    if (!f.power) return [
      'הסוללה נותנת חשמל! איפה חסר חשמל?',
      'בחרו את הסוללה ולחצו על השקע במנוע הגדול 🔌',
    ]
    if (!f.lockerOpen) return [
      'הלוקר עם העיגולים הצבעוניים בחדר המנועים - לחצו עליו',
      'המחשב מנגן צבעים ואומר אותם באנגלית - חזרו באותו סדר!',
    ]
    if (!f.gotCard) return ['CARD זה כרטיס! 💳 הוא זוהר בתוך הלוקר הפתוח']
    if (!f.consoleDone) return [
      'עכשיו יש חשמל - החלון הגדול נפתח! 🪐',
      'ספרו: כוכבי לכת בחלון הפיקוד, שביטים בצוהר המנועים, חייזרים בחלון תא היציאה',
      'לחצו על המסך בחדר הפיקוד וסובבו את הגלגלים למספרים שספרתם',
    ]
    if (!f.innerOpen) return [
      'לוח המקשים ליד הדלת העגולה בתא היציאה',
      'המחשב אומר מספרים באנגלית: ONE=1, TWO=2, THREE=3, FOUR=4, FIVE=5',
    ]
    if (!f.roboFreed) return ['בחרו את הכרטיס במלאי ולחצו על תא ההקפאה של רובו! 💳']
    return []
  },

  // כוח המצפן של קפטן - איפה הצעד הבא
  focus(f) {
    if (!f.gotScrewdriver) return { scene: 'control', hotspot: 'drawer' }
    if (!f.ventOpen || !f.gotBattery) return { scene: 'engine', hotspot: 'vent' }
    if (!f.power) return { scene: 'engine', hotspot: 'engine' }
    if (!f.lockerOpen || !f.gotCard) return { scene: 'engine', hotspot: 'locker' }
    if (!f.consoleDone) return { scene: 'control', hotspot: 'console' }
    if (!f.innerOpen) return { scene: 'airlock', hotspot: 'keypadPanel' }
    return { scene: 'airlock', hotspot: 'pod' }
  },

  isWon: (f) => !!f.roboFreed,
}
