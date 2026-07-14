// חדר 1: ספינת הפיראטים 🏴‍☠️ - גרסה 2: point-and-click אמיתי!
// 3 מבטים, מלאי, והתוכי מדריך באנגלית - הכל באוזניים, כלום בעיניים.
// שרשרת: מפתח במגף → קופסה עם בננה → מאכילים את התוכי → שיר → פתק ספירה
//         → קוד על התיבה (4 תפוחים, 3 דגים, 5 כוכבים) → מפתח זהב → מנעול הקשבה → הדלת!
import { HoldScene, ParrotScene, DoorScene } from '../scenes/pirateArt.jsx'

export default {
  id: 'pirate-ship',
  type: 'scene',
  title: 'ספינת הפיראטים',
  emoji: '🏴‍☠️',
  guideEmoji: '🦜',
  rescue: 'captain',
  parTime: 420,
  bg: 'from-slate-900 via-blue-950 to-cyan-950',
  intro: [
    'אוי לא! נרדמתם בתוך מחסן של ספינת פיראטים! 😱',
    'הדלת נעולה, והקפטן חוזר עוד מעט מהאי...',
    'התוכי של הספינה יעזור לכם - אבל הוא מדבר רק אנגלית! 🦜',
    'הסתובבו עם החצים, לחצו על חפצים, ותברחו! 🍀',
  ],
  treasure: { emoji: '🧭', name: 'מצפן הזהב', desc: 'המצפן שתמיד מוצא את הדרך הביתה' },
  outro: 'הדלת נפתחת... ומאחוריה תא נוסף - קפטן, הלוחם מזירת האנגלית, היה כלוא שם! קפצתם יחד לסירה וברחתם! 🚣',

  items: {
    rustyKey: { emoji: '🗝️', en: 'Key', he: 'מפתח', word: 'key' },
    banana: { emoji: '🍌', en: 'Banana', he: 'בננה', word: 'banana' },
    note: { emoji: '📜', en: 'Note', he: 'הפתק של התוכי', view: 'note' },
    goldKey: { emoji: '🔑', en: 'Gold key', he: 'מפתח הזהב', word: 'gold' },
  },

  scenes: [
    {
      id: 'hold',
      name: 'המחסן',
      Art: HoldScene,
      hotspots: [
        {
          id: 'boot',
          area: { x: 290, y: 530, w: 140, h: 145 },
          onTap(api) {
            if (!api.has('gotKey')) {
              api.set('gotKey')
              api.addItem('rustyKey')
            } else {
              api.sfx.thud()
              api.pulse('boot')
            }
          },
        },
        {
          id: 'box',
          area: { x: 465, y: 560, w: 190, h: 125 },
          onTap(api) {
            if (api.has('boxOpen') && !api.has('gotBanana')) {
              api.set('gotBanana')
              api.addItem('banana')
            } else {
              api.sfx.locked()
              api.pulse('box')
            }
          },
          onItem(item, api) {
            if (item === 'rustyKey' && !api.has('boxOpen')) {
              api.set('boxOpen')
              api.removeItem('rustyKey')
              api.sfx.unlock()
              api.pulse('box')
              return true
            }
            return false
          },
        },
        {
          id: 'apples',
          area: { x: 50, y: 370, w: 175, h: 205 },
          onTap(api) {
            api.say('Apple!')
            api.learnWord('apple')
            api.pulse('apples')
          },
        },
        {
          id: 'rat',
          area: { x: 40, y: 615, w: 130, h: 60 },
          onTap(api) {
            api.sfx.squeak()
            api.pulse('rat')
          },
        },
        {
          id: 'barrel',
          area: { x: 460, y: 370, w: 185, h: 185 },
          onTap(api) {
            api.sfx.thud()
            api.pulse('barrel')
          },
        },
        {
          id: 'rope',
          area: { x: 555, y: 140, w: 90, h: 90 },
          onTap(api) {
            api.sfx.creak()
            api.pulse('rope')
          },
        },
        {
          id: 'flag',
          area: { x: 245, y: 80, w: 165, h: 125 },
          onTap(api) {
            api.sfx.creak()
            api.pulse('flag')
          },
        },
        {
          id: 'lantern',
          area: { x: 85, y: 50, w: 70, h: 85 },
          onTap(api) {
            api.sfx.tap()
            api.pulse('lantern')
          },
        },
      ],
    },
    {
      id: 'parrot',
      name: 'פינת התוכי',
      Art: ParrotScene,
      hotspots: [
        {
          id: 'parrot',
          area: { x: 480, y: 110, w: 130, h: 180 },
          onTap(api) {
            // לחיצה על התוכי - הוא חוזר על ההוראה הנוכחית
            api.pulse('parrot')
            api.repeat()
          },
          onItem(item, api) {
            if (item === 'banana' && !api.has('parrotFed')) {
              api.set('parrotFed')
              api.removeItem('banana')
              api.pulse('parrot')
              api.say('Yum yum! Banana!')
              api.later(() => api.openOverlay('simon'), 1600)
              return true
            }
            return false
          },
        },
        {
          id: 'chest',
          area: { x: 215, y: 400, w: 330, h: 270 },
          onTap(api) {
            if (api.has('chestOpen') && !api.has('gotGoldKey')) {
              api.set('gotGoldKey')
              api.addItem('goldKey')
            } else if (!api.has('chestOpen')) {
              api.openOverlay('code')
            } else {
              api.sfx.thud()
              api.pulse('chest')
            }
          },
        },
        {
          id: 'porthole',
          area: { x: 75, y: 100, w: 200, h: 200 },
          onTap(api) {
            api.say('Fish!')
            api.learnWord('fish')
            api.sfx.blub()
            api.pulse('porthole')
          },
        },
        {
          id: 'map',
          area: { x: 460, y: 85, w: 190, h: 145 },
          onTap(api) {
            api.sayHe('מפה של אי האוצר!')
            api.pulse('map')
          },
        },
        {
          id: 'candle',
          area: { x: 50, y: 455, w: 130, h: 200 },
          onTap(api) {
            api.sfx.tap()
            api.pulse('candle')
          },
        },
      ],
    },
    {
      id: 'door',
      name: 'הדלת',
      Art: DoorScene,
      hotspots: [
        {
          id: 'sign',
          area: { x: 240, y: 65, w: 240, h: 115 },
          onTap(api) {
            if (!api.has('listenDone')) api.openOverlay('listen')
            else {
              api.sfx.good()
              api.pulse('sign')
            }
          },
        },
        {
          id: 'padlock',
          area: { x: 408, y: 382, w: 90, h: 120 },
          onTap(api) {
            api.sfx.locked()
            api.pulse('padlock')
          },
          onItem(item, api) {
            if (item !== 'goldKey') return false
            if (!api.has('listenDone')) {
              api.parrot('Listen first!', 'קודם פתחו את מנעול התמונות שמעל הדלת!')
              api.pulse('sign')
              return true
            }
            api.set('unlocked')
            api.removeItem('goldKey')
            api.sfx.unlock()
            api.later(() => {
              api.sfx.creak()
              api.set('doorOpen')
            }, 900)
            return true
          },
        },
        {
          id: 'door',
          area: { x: 240, y: 200, w: 165, h: 460 },
          onTap(api) {
            api.sfx.thud()
            api.pulse('door')
          },
        },
        {
          id: 'stars',
          area: { x: 60, y: 180, w: 150, h: 160 },
          onTap(api) {
            api.say('Star!')
            api.learnWord('star')
            api.pulse('stars')
          },
        },
        {
          id: 'tentacle',
          area: { x: 60, y: 520, w: 110, h: 155 },
          onTap(api) {
            api.sfx.blub()
            api.pulse('tentacle')
          },
        },
        {
          id: 'bucket',
          area: { x: 565, y: 560, w: 100, h: 110 },
          onTap(api) {
            api.sfx.thud()
            api.pulse('bucket')
          },
        },
      ],
    },
  ],

  overlays: {
    simon: {
      type: 'simon',
      title: '🦜 השיר של התוכי',
      pads: [
        { emoji: '🥁', tone: 262, color: 'from-red-400 to-rose-600' },
        { emoji: '🎺', tone: 330, color: 'from-amber-400 to-orange-600' },
        { emoji: '🔔', tone: 392, color: 'from-emerald-400 to-green-600' },
        { emoji: '🪕', tone: 523, color: 'from-sky-400 to-blue-600' },
      ],
      rounds: [2, 3, 4],
      onSolved(api) {
        api.set('simonDone')
        api.closeOverlay()
        api.later(() => api.addItem('note'), 500)
      },
    },
    note: {
      type: 'note',
      title: '📜 הפתק של התוכי',
      heading: 'ספרו וגלו את הקוד!',
      lines: [{ emoji: '🍎' }, { emoji: '🐟' }, { emoji: '⭐' }],
      footer: 'חפשו בכל המבטים... המספרים פותחים את התיבה!',
    },
    code: {
      type: 'code',
      title: '🔐 התיבה של הקפטן',
      text: 'מנעול עם 3 גלגלים... ליד כל גלגל יש ציור. כמה יש מכל דבר בספינה?',
      icons: ['🍎', '🐟', '⭐'],
      answer: [4, 3, 5],
      onSolved(api) {
        api.set('chestOpen')
        api.later(() => api.closeOverlay(), 400)
      },
    },
    listen: {
      type: 'listen',
      title: '👂 מנעול התמונות',
      text: 'התוכי אומר מילה באנגלית - לחצו על הציור הנכון!',
      options: [
        { id: 'banana', en: 'Banana', he: 'בננה', emoji: '🍌' },
        { id: 'bird', en: 'Bird', he: 'ציפור', emoji: '🐦' },
        { id: 'box', en: 'Box', he: 'קופסה', emoji: '📦' },
        { id: 'dog', en: 'Dog', he: 'כלב', emoji: '🐶' },
      ],
      rounds: [
        { id: 'banana', en: 'Banana' },
        { id: 'bird', en: 'Bird' },
        { id: 'dog', en: 'Dog' },
      ],
      onSolved(api) {
        api.set('listenDone')
        api.closeOverlay()
      },
    },
  },

  // התוכי המדריך - ההוראה הנוכחית לפי ההתקדמות (אנגלית בקול, עברית קטנה)
  guide(f) {
    if (!f.gotKey) return { en: 'Ahoy! Find the KEY!', he: 'מצאו את המפתח!' }
    if (!f.boxOpen) return { en: 'Open the BOX!', he: 'פתחו את הקופסה עם המפתח!' }
    if (!f.gotBanana) return { en: 'Take the BANANA!', he: 'קחו את הבננה!' }
    if (!f.parrotFed) return { en: 'Give me the BANANA! Yum yum!', he: 'תנו לתוכי את הבננה!' }
    if (!f.simonDone) return { en: 'Listen and repeat my song!', he: 'הקשיבו לשיר של התוכי וחזרו עליו!' }
    if (!f.chestOpen) return { en: 'Count the APPLES, the FISH and the STARS!', he: 'ספרו לפי הפתק - ופתחו את התיבה!' }
    if (!f.gotGoldKey) return { en: 'Take the GOLD KEY!', he: 'קחו את מפתח הזהב!' }
    if (!f.listenDone) return { en: 'Go to the DOOR! Listen!', he: 'לכו לדלת ופתחו את מנעול התמונות!' }
    if (!f.doorOpen) return { en: 'Open the DOOR with the GOLD KEY!', he: 'פתחו את המנעול עם מפתח הזהב!' }
    return { en: 'YES! Goodbye, friends!', he: 'ברחתם! להתראות!' }
  },

  // רמזים הדרגתיים בעברית - לפי השלב הנוכחי
  hints(f) {
    if (!f.gotKey) return [
      'KEY זה מפתח! 🗝️ התוכי רוצה שתמצאו אותו',
      'חפשו במחסן, במשהו שנועלים על הרגל...',
      'המפתח בתוך המגף! לחצו על המגף 👢',
    ]
    if (!f.boxOpen) return [
      'BOX זה קופסה! 📦 יש אחת קטנה במחסן',
      'לחצו על המפתח במלאי, ואז על הקופסה הנעולה',
      'המפתח פותח את הקופסה שליד החבית הגדולה!',
    ]
    if (!f.gotBanana) return ['BANANA זה בננה! 🍌 היא בתוך הקופסה הפתוחה - לחצו עליה!']
    if (!f.parrotFed) return [
      'התוכי רעב! 🦜 הוא נמצא במבט אחר - הסתובבו עם החצים',
      'לחצו על הבננה במלאי, ואז על התוכי!',
    ]
    if (!f.simonDone) return ['הקשיבו לשיר של התוכי וחזרו עליו בדיוק באותו סדר 🎵']
    if (!f.chestOpen) return [
      'לחצו על הפתק במלאי - מה צריך לספור? 📜',
      'תפוחים יש במחסן, דגים בצוהר, כוכבים בחלון שליד הדלת!',
      'הקוד: 4 תפוחים, 3 דגים, 5 כוכבים - לחצו על התיבה!',
    ]
    if (!f.gotGoldKey) return ['GOLD KEY זה מפתח זהב! ✨ הוא בתוך התיבה הפתוחה - קחו אותו!']
    if (!f.listenDone) return [
      'ליד הדלת יש שלט עם ציורים - זה מנעול של הקשבה! 👂',
      'לחצו על השלט שמעל הדלת, הקשיבו למילה ובחרו את הציור הנכון',
    ]
    if (!f.doorOpen) return ['לחצו על מפתח הזהב במלאי, ואז על המנעול הגדול שעל הדלת! 🔑']
    return []
  },

  isWon: (f) => !!f.doorOpen,
}
