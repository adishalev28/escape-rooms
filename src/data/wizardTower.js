// חדר 3: מגדל הקוסם 🧙 - הרמה הקשה
// 3 משימות איסוף במקביל (חלב/ביצה/לחם), מטאטא רב-שימושי, מתכון לפי סדר שמיעה.
// לונה הפכה לאבן - רק שיקוי הקסם ישחרר אותה!
import { LibraryScene, PotionScene, TowerTopScene } from '../scenes/wizardArt.jsx'

export default {
  id: 'wizard-tower',
  type: 'scene',
  title: 'מגדל הקוסם',
  emoji: '🧙',
  guideEmoji: '🦉',
  rescue: 'luna',
  parTime: 540,
  bg: 'from-slate-950 via-purple-950 to-indigo-950',
  intro: [
    'טיפסתם למגדל של הקוסם הזקן... והשער נטרק מאחוריכם! 🧙',
    'למעלה, בפסגה, מצאתם את לונה - הלוחמת מזירת האנגלית - הפוכה לפסל אבן! 😨',
    'הינשוף של הקוסם יעזור לכם - אבל הוא מדבר רק אנגלית! 🦉',
    'רק שיקוי קסם ישחרר את לונה ויפתח את הדלת. קדימה! 🍀',
  ],
  treasure: { emoji: '🪄', name: 'שרביט הכוכבים', desc: 'שרביט שמאיר את הדרך בחושך' },
  outro: 'השיקוי עבד! לונה חזרה לחיים, הבריקה את הדלת הקסומה בקרן ירח - וברחתם יחד על המטאטא! 🧹',

  items: {
    broom: { emoji: '🧹', en: 'Broom', he: 'מטאטא (שימושי להרבה דברים!)' },
    coin: { emoji: '🪙', en: 'Coin', he: 'מטבע זהב' },
    keySmall: { emoji: '🗝️', en: 'Key', he: 'מפתח קטן', word: 'key' },
    milk: { emoji: '🥛', en: 'Milk', he: 'חלב', word: 'milk' },
    egg: { emoji: '🥚', en: 'Egg', he: 'ביצה', word: 'egg' },
    bread: { emoji: '🍞', en: 'Bread', he: 'לחם', word: 'bread' },
    recipe: { emoji: '📜', en: 'Recipe', he: 'המתכון של הקוסם', view: 'recipe' },
    potion: { emoji: '🧪', en: 'Potion', he: 'שיקוי הקסם!' },
  },

  scenes: [
    {
      id: 'library',
      name: 'ספריית הלחשים',
      Art: LibraryScene,
      hotspots: [
        {
          id: 'book',
          area: { x: 295, y: 275, w: 175, h: 115 },
          onTap(api) {
            if (!api.has('bookOpen')) api.openOverlay('bookLock')
            else {
              api.sfx.good()
              api.pulse('book')
            }
          },
        },
        {
          id: 'broom',
          area: { x: 600, y: 370, w: 100, h: 300 },
          onTap(api) {
            if (!api.has('gotBroom')) {
              api.set('gotBroom')
              api.addItem('broom')
            } else api.sfx.tap()
          },
        },
        {
          id: 'fireplace',
          area: { x: 480, y: 450, w: 165, h: 215 },
          onTap(api) {
            if (api.has('coinOut') && !api.has('gotCoin')) {
              api.set('gotCoin')
              api.addItem('coin')
            } else {
              api.sfx.creak()
              api.pulse('fireplace')
            }
          },
          onItem(item, api) {
            if (item === 'broom' && !api.has('coinOut')) {
              api.set('coinOut')
              api.sfx.pickup()
              api.sayHe('משהו נוצץ קפץ מהאפר!')
              api.pulse('fireplace')
              return true
            }
            return false
          },
        },
        {
          id: 'cat',
          area: { x: 85, y: 585, w: 140, h: 90 },
          onTap(api) {
            api.sfx.blub()
            api.sayHe('פררר... החתול ישן')
            api.pulse('cat')
          },
        },
        {
          id: 'moonWindow',
          area: { x: 535, y: 55, w: 155, h: 185 },
          onTap(api) {
            api.say('Moon!')
            api.learnWord('moon')
            api.pulse('moonWindow')
          },
        },
      ],
    },
    {
      id: 'potion',
      name: 'חדר השיקויים',
      Art: PotionScene,
      hotspots: [
        {
          id: 'cauldron',
          area: { x: 110, y: 460, w: 240, h: 215 },
          onTap(api) {
            if (api.has('potionDone')) {
              api.sfx.blub()
              api.pulse('cauldron')
              return
            }
            const missing = ['milk', 'egg', 'bread'].filter((i) => !api.hasItem(i))
            if (missing.length) {
              api.parrot('Find the ' + missing.map((m) => m.toUpperCase()).join(', the ') + '!', 'עוד חסרים מרכיבים לשיקוי!')
              api.pulse('cauldron')
            } else {
              api.openOverlay('brewing')
            }
          },
        },
        {
          id: 'cupboard',
          area: { x: 420, y: 320, w: 210, h: 180 },
          onTap(api) {
            if (api.has('cupboardOpen') && !api.has('gotMilk')) {
              api.set('gotMilk')
              api.addItem('milk')
            } else {
              api.sfx.locked()
              api.pulse('cupboard')
            }
          },
          onItem(item, api) {
            if (item === 'keySmall' && !api.has('cupboardOpen')) {
              api.set('cupboardOpen')
              api.removeItem('keySmall')
              api.sfx.unlock()
              api.pulse('cupboard')
              return true
            }
            return false
          },
        },
        {
          id: 'shelf',
          area: { x: 415, y: 90, w: 265, h: 120 },
          onTap(api) {
            api.sayHe('גבוה מדי! צריך משהו ארוך...')
            api.pulse('shelf')
          },
          onItem(item, api) {
            if (item === 'broom' && !api.has('breadDown')) {
              api.set('breadDown')
              api.sfx.thud()
              api.sayHe('הלחם נפל!')
              api.pulse('shelf')
              return true
            }
            return false
          },
        },
        {
          id: 'breadFloor',
          area: { x: 505, y: 605, w: 115, h: 70 },
          onTap(api) {
            if (api.has('breadDown') && !api.has('gotBread')) {
              api.set('gotBread')
              api.addItem('bread')
            } else api.sfx.tap()
          },
        },
        {
          id: 'jars',
          area: { x: 60, y: 150, w: 175, h: 90 },
          onTap(api) {
            api.sfx.star()
            api.pulse('jars')
          },
        },
        {
          id: 'mousehole',
          area: { x: 50, y: 620, w: 90, h: 55 },
          onTap(api) {
            api.sfx.squeak()
            api.pulse('mousehole')
          },
        },
      ],
    },
    {
      id: 'top',
      name: 'פסגת המגדל',
      Art: TowerTopScene,
      hotspots: [
        {
          id: 'flowerpot',
          area: { x: 85, y: 545, w: 145, h: 125 },
          onTap(api) {
            if (!api.has('potMoved')) {
              api.set('potMoved')
              api.sfx.creak()
              api.sayHe('העציץ זז... יש משהו מתחת!')
              api.pulse('flowerpot')
            } else if (!api.has('gotKeySmall')) {
              api.set('gotKeySmall')
              api.addItem('keySmall')
            } else {
              api.sfx.tap()
              api.pulse('flowerpot')
            }
          },
        },
        {
          id: 'nest',
          area: { x: 55, y: 195, w: 165, h: 115 },
          onTap(api) {
            if (api.has('ravenGone') && !api.has('gotEgg')) {
              api.set('gotEgg')
              api.addItem('egg')
            } else if (!api.has('ravenGone')) {
              api.sfx.squeak()
              api.sayHe('העורב שומר על הביצה! אולי הוא אוהב דברים נוצצים?')
              api.pulse('nest')
            } else api.sfx.tap()
          },
          onItem(item, api) {
            if (item === 'coin' && !api.has('ravenGone')) {
              api.set('ravenGone')
              api.removeItem('coin')
              api.sfx.good()
              api.sayHe('העורב חטף את המטבע ועף! הביצה שלכם!')
              api.pulse('nest')
              return true
            }
            return false
          },
        },
        {
          id: 'statue',
          area: { x: 270, y: 430, w: 180, h: 200 },
          onTap(api) {
            api.sfx.thud()
            api.sayHe('לונה קפואה באבן... צריך שיקוי קסם!')
            api.pulse('statue')
          },
          onItem(item, api) {
            if (item === 'potion' && !api.has('lunaFreed')) {
              api.set('lunaFreed')
              api.removeItem('potion')
              api.sfx.win()
              api.pulse('statue')
              return true
            }
            return false
          },
        },
        {
          id: 'magicDoor',
          area: { x: 535, y: 315, w: 170, h: 355 },
          onTap(api) {
            if (api.has('lunaFreed') && !api.has('doorOpen')) {
              api.set('doorOpen')
              api.sfx.unlock()
              api.later(() => api.sfx.win(), 500)
            } else if (!api.has('lunaFreed')) {
              api.sfx.locked()
              api.parrot('First free LUNA!', 'הרונות כבויות... קודם לשחרר את לונה!')
              api.pulse('magicDoor')
            }
          },
        },
        {
          id: 'telescope',
          area: { x: 400, y: 280, w: 110, h: 190 },
          onTap(api) {
            api.say('Moon!')
            api.learnWord('moon')
            api.sayHe('רואים את הירח ענק!')
            api.pulse('telescope')
          },
        },
      ],
    },
  ],

  overlays: {
    bookLock: {
      type: 'listen',
      title: '📖 ספר הלחשים',
      text: 'הספר נעול בלחש חיות! הינשוף אומר חיה באנגלית - לחצו על החיה הנכונה!',
      prompt: 'הקשיבו... איזו חיה הינשוף אמר?',
      options: [
        { id: 'rabbit', en: 'Rabbit', he: 'ארנב', emoji: '🐰' },
        { id: 'cat', en: 'Cat', he: 'חתול', emoji: '🐱' },
        { id: 'duck', en: 'Duck', he: 'ברווז', emoji: '🦆' },
        { id: 'horse', en: 'Horse', he: 'סוס', emoji: '🐴' },
        { id: 'dog', en: 'Dog', he: 'כלב', emoji: '🐶' },
        { id: 'bird', en: 'Bird', he: 'ציפור', emoji: '🐦' },
      ],
      rounds: [
        { id: 'rabbit', en: 'Rabbit' },
        { id: 'cat', en: 'Cat' },
        { id: 'duck', en: 'Duck' },
        { id: 'horse', en: 'Horse' },
      ],
      onSolved(api) {
        api.set('bookOpen')
        api.closeOverlay()
        api.later(() => api.addItem('recipe'), 500)
      },
    },
    recipe: {
      type: 'note',
      title: '📜 מתכון שיקוי ההתעוררות',
      heading: 'שיקוי ההתעוררות של הקוסם',
      lines: [{ emoji: '🥛' }, { emoji: '🥚' }, { emoji: '🍞' }],
      footer: 'אספו את שלושת המרכיבים והביאו לקדירה - הינשוף יגיד באיזה סדר!',
    },
    brewing: {
      type: 'listen',
      title: '🧪 מבשלים את השיקוי!',
      text: 'הינשוף אומר איזה מרכיב להכניס לקדירה - בסדר הנכון! טעות מקלקלת את השיקוי...',
      prompt: 'הקשיבו... מה מכניסים עכשיו?',
      options: [
        { id: 'milk', en: 'Milk', he: 'חלב', emoji: '🥛' },
        { id: 'egg', en: 'Egg', he: 'ביצה', emoji: '🥚' },
        { id: 'bread', en: 'Bread', he: 'לחם', emoji: '🍞' },
        { id: 'cheese', en: 'Cheese', he: 'גבינה', emoji: '🧀' },
        { id: 'apple', en: 'Apple', he: 'תפוח', emoji: '🍎' },
        { id: 'fish', en: 'Fish', he: 'דג', emoji: '🐟' },
      ],
      rounds: [
        { id: 'milk', en: 'Milk' },
        { id: 'egg', en: 'Egg' },
        { id: 'bread', en: 'Bread' },
      ],
      onSolved(api) {
        ;['milk', 'egg', 'bread'].forEach((i) => api.removeItem(i))
        api.set('potionDone')
        api.closeOverlay()
        api.later(() => api.addItem('potion'), 600)
      },
    },
  },

  guide(f) {
    if (!f.bookOpen) return { en: 'Hoo hoo! Open the BOOK! Listen to the ANIMALS!', he: 'פתחו את ספר הלחשים - הקשיבו לחיות!' }
    if (!f.gotBroom) return { en: 'Take the BROOM!', he: 'קחו את המטאטא - הוא יעזור להרבה דברים!' }
    if (!f.gotMilk) return { en: 'Find the MILK!', he: 'מצאו את החלב לשיקוי!' }
    if (!f.gotEgg) return { en: 'Find the EGG!', he: 'מצאו את הביצה לשיקוי!' }
    if (!f.gotBread) return { en: 'Find the BREAD!', he: 'מצאו את הלחם לשיקוי!' }
    if (!f.potionDone) return { en: 'Go to the pot! Listen: MILK, EGG, BREAD!', he: 'לקדירה! הכניסו את המרכיבים לפי הסדר שהינשוף אומר!' }
    if (!f.lunaFreed) return { en: 'Use the potion! Free LUNA!', he: 'שפכו את השיקוי על הפסל של לונה!' }
    if (!f.doorOpen) return { en: 'Open the magic DOOR!', he: 'לונה חופשייה! פתחו את הדלת הקסומה!' }
    return { en: 'YES! Fly away, friends!', he: 'עפים מפה על המטאטא!' }
  },

  hints(f) {
    if (!f.bookOpen) return [
      'הספר הסגול הזוהר בספרייה - לחצו עליו!',
      'הינשוף אומר חיה באנגלית - RABBIT=ארנב, CAT=חתול, DUCK=ברווז, HORSE=סוס',
    ]
    if (!f.gotBroom) return ['BROOM זה מטאטא! 🧹 הוא נשען על הקיר בספרייה']
    if (!f.gotMilk) return [
      'MILK זה חלב! 🥛 הוא בארונית הנעולה בחדר השיקויים',
      'הארונית צריכה מפתח קטן... אולי מוסתר מתחת למשהו בפסגה?',
      'לחצו על העציץ בפסגת המגדל - ואז קחו את המפתח ופתחו את הארונית!',
    ]
    if (!f.gotEgg) return [
      'EGG זה ביצה! 🥚 היא בקן של העורב בפסגת המגדל',
      'העורב לא זז... אבל עורבים אוהבים דברים נוצצים! ✨',
      'גרפו את האפר באח עם המטאטא - יש שם מטבע! תנו אותו לעורב',
    ]
    if (!f.gotBread) return [
      'BREAD זה לחם! 🍞 הוא על המדף הגבוה בחדר השיקויים',
      'בחרו את המטאטא ולחצו על המדף - והלחם יפול! אל תשכחו להרים אותו',
    ]
    if (!f.potionDone) return [
      'יש לכם הכל! לחצו על הקדירה הירוקה 🧪',
      'הינשוף אומר את הסדר: MILK=חלב, EGG=ביצה, BREAD=לחם',
    ]
    if (!f.lunaFreed) return ['בחרו את השיקוי במלאי ולחצו על הפסל של לונה! 🧪']
    if (!f.doorOpen) return ['הרונות על הדלת זוהרות עכשיו - לחצו על הדלת הקסומה! 🚪']
    return []
  },

  focus(f) {
    if (!f.bookOpen) return { scene: 'library', hotspot: 'book' }
    if (!f.gotBroom) return { scene: 'library', hotspot: 'broom' }
    if (!f.gotMilk) {
      if (!f.gotKeySmall) return { scene: 'top', hotspot: 'flowerpot' }
      return { scene: 'potion', hotspot: 'cupboard' }
    }
    if (!f.gotEgg) {
      if (!f.gotCoin) return { scene: 'library', hotspot: 'fireplace' }
      return { scene: 'top', hotspot: 'nest' }
    }
    if (!f.gotBread) return { scene: 'potion', hotspot: f.breadDown ? 'breadFloor' : 'shelf' }
    if (!f.potionDone) return { scene: 'potion', hotspot: 'cauldron' }
    if (!f.lunaFreed) return { scene: 'top', hotspot: 'statue' }
    return { scene: 'top', hotspot: 'magicDoor' }
  },

  isWon: (f) => !!f.doorOpen,
}
