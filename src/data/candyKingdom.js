// חדר 6: ממלכת הממתקים 🍭
// חדש כאן: צבעים חדשים (כתום/ורוד/סגול), מתכון עוגה משוגע לפי סדר שמיעה,
// דובון שומר שמשתחד בסוכרייה, וקינג כלוא בצינוק הסוכר! חנינה מלכותית = הכוח שלו.
import { CandyGateScene, FactoryScene, CakeHallScene, DungeonScene } from '../scenes/candyArt.jsx'

const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1))
const shuffleArr = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default {
  id: 'candy-kingdom',
  type: 'scene',
  title: 'ממלכת הממתקים',
  emoji: '🍭',
  guideEmoji: '🧸',
  rescue: 'king',
  parTime: 600,
  bg: 'from-pink-950 via-fuchsia-900 to-rose-950',
  intro: [
    'עקבתם אחרי ריח שוקולד מתוק... ונפלתם דרך פטרייה ענקית לממלכת הממתקים! 🍭',
    'הכל כאן עשוי סוכר - אבל השער נסגר, ומלכת הסוכר לא אוהבת אורחים!',
    'בצינוק הסוכר כלוא קינג - הלוחם מזירת האנגלית - קשור בשרשרת סוכריות! 👑',
    'דובון גומי מתוק ידריך אתכם באנגלית. שחררו את קינג וברחו דרך דלת השוקולד! 🍀',
  ],
  treasure: { emoji: '🍬', name: 'סוכריית האינסוף', desc: 'סוכרייה שלא נגמרת אף פעם. אף פעם!' },
  outro: 'דלת השוקולד נמסה לאט... קינג הרים אתכם על הכתפיים ורצתם החוצה, מתוקים ומנצחים! 🍫',

  // הספירות וסדרי המתכונים - אקראיים בכל משחק
  setup() {
    return {
      lollipops: r(2, 5),
      gummies: r(2, 6),
      cupcakes: r(2, 4),
      mixOrder: shuffleArr(['orange', 'pink', 'purple']),
      cakeOrder: shuffleArr(['cookie', 'icecream', 'pizza']),
    }
  },

  items: {
    cocoa: { emoji: '☕', en: 'Hot chocolate', he: 'שוקו חם ומהביל' },
    hammer: { emoji: '🔨', en: 'Hammer', he: 'פטיש סוכריות' },
    rainbow: { emoji: '🍭', en: 'Rainbow lollipop', he: 'סוכריית הקשת - יצירת המכונה!' },
    caneKey: { emoji: '🗝️', en: 'Key', he: 'מפתח הסוכר מהעוגה', word: 'key' },
  },

  scenes: [
    {
      id: 'gate',
      name: 'שער הסוכריות',
      Art: CandyGateScene,
      hotspots: [
        {
          id: 'caramel',
          area: { x: 235, y: 455, w: 250, h: 190 },
          onTap(api) {
            if (api.has('caramelMelted') && !api.has('gotHammer')) {
              api.set('gotHammer')
              api.addItem('hammer')
            } else if (!api.has('caramelMelted')) {
              api.sfx.locked()
              api.sayHe('הפטיש תקוע בקרמל קשה כמו אבן... אולי משהו חם ימיס אותו?')
              api.pulse('caramel')
            } else api.sfx.tap()
          },
          onItem(item, api) {
            if (item === 'cocoa' && !api.has('caramelMelted')) {
              api.set('caramelMelted')
              api.removeItem('cocoa')
              api.sfx.blub()
              api.sayHe('השוקו החם ממיס את הקרמל... הפטיש משתחרר!')
              api.pulse('caramel')
              return true
            }
            return false
          },
        },
        {
          id: 'lollis',
          area: { x: 60, y: 150, w: 620, h: 300 },
          onTap(api) {
            api.sfx.star()
            api.pulse('lollis')
          },
        },
      ],
    },
    {
      id: 'factory',
      name: 'מפעל השוקולד',
      Art: FactoryScene,
      hotspots: [
        {
          id: 'conveyor',
          area: { x: 60, y: 330, w: 310, h: 90 },
          onTap(api) {
            if (!api.has('gotCocoa')) {
              api.set('gotCocoa')
              api.addItem('cocoa')
            } else {
              api.sfx.tap()
              api.pulse('conveyor')
            }
          },
        },
        {
          id: 'mixer',
          area: { x: 410, y: 250, w: 260, h: 290 },
          onTap(api) {
            if (api.has('mixDone') && !api.has('gotRainbow')) {
              api.set('gotRainbow')
              api.addItem('rainbow')
            } else if (!api.has('mixDone')) {
              api.openOverlay('colorMix')
            } else {
              api.sfx.tap()
              api.pulse('mixer')
            }
          },
        },
        {
          id: 'gummies',
          area: { x: 55, y: 540, w: 610, h: 140 },
          onTap(api) {
            api.sfx.blub()
            api.pulse('gummies')
          },
        },
      ],
    },
    {
      id: 'cakes',
      name: 'אולם העוגות',
      Art: CakeHallScene,
      hotspots: [
        {
          id: 'bigCake',
          area: { x: 200, y: 280, w: 320, h: 350 },
          onTap(api) {
            if (api.has('cakeDone') && !api.has('gotCaneKey')) {
              api.set('gotCaneKey')
              api.addItem('caneKey')
            } else if (!api.has('cakeDone')) {
              api.openOverlay('cakeBuild')
            } else {
              api.say('Cake!')
              api.learnWord('cake')
              api.pulse('bigCake')
            }
          },
        },
        {
          id: 'oven',
          area: { x: 560, y: 370, w: 150, h: 200 },
          onTap(api) {
            api.sfx.creak()
            api.sayHe('התנור אופה משהו... מריח מדהים!')
            api.pulse('oven')
          },
        },
        {
          id: 'cupcakes',
          area: { x: 55, y: 200, w: 130, h: 330 },
          onTap(api) {
            api.sfx.star()
            api.pulse('cupcakes')
          },
        },
      ],
    },
    {
      id: 'dungeon',
      name: 'צינוק הסוכר',
      Art: DungeonScene,
      hotspots: [
        {
          id: 'cage',
          area: { x: 60, y: 240, w: 240, h: 240 },
          onTap(api) {
            api.sfx.locked()
            if (!api.has('barsBroken')) api.sayHe('סורגים מקני סוכר קשים! צריך משהו כבד לשבור אותם...')
            else if (!api.has('kingFreed')) api.sayHe('הסורגים שבורים - אבל קינג עוד קשור בשרשרת עם מנעול!')
            api.pulse('cage')
          },
          onItem(item, api) {
            if (item === 'hammer' && !api.has('barsBroken')) {
              api.set('barsBroken')
              api.sfx.thud()
              api.later(() => api.sfx.good(), 400)
              api.sayHe('טראח! קני הסוכר מתנפצים לרסיסים מתוקים!')
              api.pulse('cage')
              return true
            }
            if (item === 'caneKey' && api.has('barsBroken') && !api.has('kingFreed')) {
              api.set('kingFreed')
              api.removeItem('caneKey')
              api.removeItem('hammer')
              api.sfx.unlock()
              api.later(() => api.sfx.win(), 500)
              api.pulse('cage')
              return true
            }
            if (item === 'caneKey' && !api.has('barsBroken')) {
              api.parrot('Break the bars first!', 'קודם לשבור את הסורגים עם הפטיש!')
              return true
            }
            return false
          },
        },
        {
          id: 'vault',
          area: { x: 420, y: 220, w: 270, h: 450 },
          onTap(api) {
            if (api.has('vaultOpen')) return
            if (!api.has('guardMoved')) {
              api.sfx.locked()
              api.parrot('The guard is in the way!', 'השומר חוסם את הדרך לדלת!')
              api.pulse('guard')
            } else if (!api.has('kingFreed')) {
              api.parrot('First free KING!', 'קודם לשחרר את קינג מהכלוב!')
              api.pulse('cage')
            } else {
              api.openOverlay('vaultCode')
            }
          },
        },
        // השומר אחרון ברשימה = מעל דלת השוקולד, אחרת הדלת בולעת את הלחיצות עליו.
        // אחרי שהוא זז - נקודת הלחיצה נעלמת והדלת חופשייה.
        {
          id: 'guard',
          area: { x: 470, y: 430, w: 175, h: 240 },
          active: (api) => !api.has('guardMoved'),
          onTap(api) {
            api.sfx.thud()
            api.parrot('I want something SWEET and BIG!', 'השומר רוצה משהו מתוק וגדול במיוחד...')
            api.pulse('guard')
          },
          onItem(item, api) {
            if (item === 'rainbow' && !api.has('guardMoved')) {
              api.set('guardMoved')
              api.removeItem('rainbow')
              api.sfx.good()
              api.sayHe('הדובון חוטף את סוכריית הקשת וזז הצידה בריקוד!')
              api.pulse('guard')
              return true
            }
            return false
          },
        },
      ],
    },
  ],

  overlays: {
    colorMix: (api) => ({
      type: 'listen',
      title: '🎨 מכונת ערבוב הצבעים',
      text: 'המכונה מכינה סוכריית קשת! הדובון אומר צבע באנגלית - לחצו על הכפתור הנכון!',
      prompt: 'הקשיבו... איזה צבע עכשיו?',
      options: [
        { id: 'orange', en: 'Orange', he: 'כתום', emoji: '🟠' },
        { id: 'pink', en: 'Pink', he: 'ורוד', emoji: '🩷' },
        { id: 'purple', en: 'Purple', he: 'סגול', emoji: '🟣' },
        { id: 'white', en: 'White', he: 'לבן', emoji: '⚪' },
      ],
      rounds: api.setup.mixOrder.map((c) => ({ id: c, en: c[0].toUpperCase() + c.slice(1) })),
      onSolved(a) {
        a.set('mixDone')
        a.closeOverlay()
      },
    }),
    cakeBuild: (api) => ({
      type: 'listen',
      title: '🎂 העוגה המשוגעת',
      text: 'העוגה של המלכה חסרה שכבות! הדובון אומר מה להוסיף - בסדר הנכון (כן, גם פיצה. אל תשאלו)!',
      prompt: 'הקשיבו... מה מוסיפים לעוגה?',
      options: [
        { id: 'cookie', en: 'Cookie', he: 'עוגייה', emoji: '🍪' },
        { id: 'icecream', en: 'Ice cream', he: 'גלידה', emoji: '🍦' },
        { id: 'pizza', en: 'Pizza', he: 'פיצה', emoji: '🍕' },
        { id: 'cake', en: 'Cake', he: 'עוגה', emoji: '🎂' },
        { id: 'apple', en: 'Apple', he: 'תפוח', emoji: '🍎' },
        { id: 'banana', en: 'Banana', he: 'בננה', emoji: '🍌' },
      ],
      rounds: api.setup.cakeOrder.map((c) => ({
        id: c,
        en: c === 'icecream' ? 'Ice cream' : c[0].toUpperCase() + c.slice(1),
      })),
      onSolved(a) {
        a.set('cakeDone')
        a.closeOverlay()
        a.later(() => a.sayHe('העוגה מוכנה... ומשהו נוצץ בתוך השכבה התחתונה!'), 700)
      },
    }),
    vaultCode: (api) => ({
      type: 'code',
      title: '🍫 דלת השוקולד',
      text: 'על המנעול חרוטים סוכרייה, דובון וקאפקייק. כמה יש מכל אחד בממלכה?',
      icons: ['🍭', '🧸', '🧁'],
      answer: [api.setup.lollipops, api.setup.gummies, api.setup.cupcakes],
      onSolved(a) {
        a.set('vaultOpen')
        a.later(() => a.closeOverlay(), 400)
      },
    }),
  },

  guide(f) {
    if (!f.gotCocoa) return { en: 'Yummy! Find the HOT CHOCOLATE!', he: 'קחו את כוס השוקו החם מהמסוע במפעל!' }
    if (!f.caramelMelted) return { en: 'Melt the caramel! Use the HOT CHOCOLATE!', he: 'שפכו את השוקו החם על הקרמל בשער!' }
    if (!f.gotHammer) return { en: 'Take the HAMMER!', he: 'קחו את הפטיש!' }
    if (!f.mixDone) return { en: 'Make a rainbow! Listen to the COLORS!', he: 'למכונת הצבעים במפעל - הקשיבו לצבעים!' }
    if (!f.gotRainbow) return { en: 'Take the RAINBOW LOLLIPOP!', he: 'קחו את סוכריית הקשת מהמכונה!' }
    if (!f.guardMoved) return { en: 'The guard wants something sweet...', he: 'תנו לדובון השומר את סוכריית הקשת!' }
    if (!f.cakeDone) return { en: 'Fix the cake! Listen to the FOOD!', he: 'לעוגה הענקית - הקשיבו איזו שכבה להוסיף!' }
    if (!f.gotCaneKey) return { en: 'Take the KEY from the cake!', he: 'קחו את המפתח מהעוגה!' }
    if (!f.barsBroken) return { en: 'Break the bars with the HAMMER!', he: 'שברו את סורגי הסוכר עם הפטיש!' }
    if (!f.kingFreed) return { en: 'Use the KEY! Free KING!', he: 'פתחו את מנעול השרשרת - שחררו את קינג!' }
    if (!f.vaultOpen) return { en: 'Count the CANDY! Open the chocolate door!', he: 'ספרו בממלכה ופתחו את דלת השוקולד!' }
    return { en: 'YES! Sweet freedom!', he: 'ברחתם! חופש מתוק!' }
  },

  hints(f) {
    if (!f.gotCocoa) return ['כוס השוקו המהבילה על המסוע במפעל השוקולד - קחו אותה! ☕']
    if (!f.caramelMelted) return [
      'הפטיש תקוע בשלולית קרמל קשה בשער הסוכריות',
      'שוקו חם ממיס קרמל! בחרו את הכוס ולחצו על השלולית',
    ]
    if (!f.gotHammer) return ['הפטיש השתחרר - לחצו עליו! 🔨']
    if (!f.mixDone) return [
      'המכונה הסגולה במפעל - לחצו עליה!',
      'הדובון אומר צבעים: ORANGE=כתום, PINK=ורוד, PURPLE=סגול, WHITE=לבן',
    ]
    if (!f.gotRainbow) return ['סוכריית הקשת יצאה מהמכונה - קחו אותה! 🍭']
    if (!f.guardMoved) return ['דובון הגומי הענק שומר על הצינוק... תנו לו את סוכריית הקשת!']
    if (!f.cakeDone) return [
      'העוגה הוורודה הענקית באולם העוגות - לחצו עליה!',
      'שכבות משוגעות: COOKIE=עוגייה, ICE CREAM=גלידה, PIZZA=פיצה 🤪',
    ]
    if (!f.gotCaneKey) return ['מפתח נוצץ בתוך השכבה התחתונה של העוגה!']
    if (!f.barsBroken) return ['בחרו את הפטיש ולחצו על כלוב קני הסוכר של קינג! 🔨']
    if (!f.kingFreed) return ['עכשיו המנעול: בחרו את המפתח מהעוגה ולחצו על הכלוב! 🗝️']
    if (!f.vaultOpen) return [
      'דלת השוקולד עם הגלגלים בצינוק',
      'ספרו: סוכריות על מקל בשער, דובוני גומי במפעל, קאפקייקס באולם העוגות',
    ]
    return []
  },

  focus(f) {
    if (!f.gotCocoa) return { scene: 'factory', hotspot: 'conveyor' }
    if (!f.caramelMelted || !f.gotHammer) return { scene: 'gate', hotspot: 'caramel' }
    if (!f.mixDone || !f.gotRainbow) return { scene: 'factory', hotspot: 'mixer' }
    if (!f.guardMoved) return { scene: 'dungeon', hotspot: 'guard' }
    if (!f.cakeDone || !f.gotCaneKey) return { scene: 'cakes', hotspot: 'bigCake' }
    if (!f.barsBroken || !f.kingFreed) return { scene: 'dungeon', hotspot: 'cage' }
    return { scene: 'dungeon', hotspot: 'vault' }
  },

  isWon: (f) => !!f.vaultOpen,
}
