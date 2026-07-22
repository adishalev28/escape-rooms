// חדר 9: הר הגעש 🌋
// מילים של גיימרים (POWER, SHIELD, MAP, TROPHY...), מגן שחוסם ניצוצות,
// כספת עם קוד מוקרא, ובלייז - לוחם האש - קפוא דווקא בתוך גביש! חום האש = הכוח שלו.
import { SlopeScene, LavaCaveScene, FireTempleScene, CraterScene } from '../scenes/volcanoArt.jsx'

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
  id: 'volcano',
  type: 'scene',
  title: 'הר הגעש',
  emoji: '🌋',
  guideEmoji: '🦎',
  rescue: 'blaze',
  parTime: 600,
  bg: 'from-red-950 via-orange-950 to-stone-950',
  intro: [
    'טיפסתם על הר מעשן... והאדמה קרסה - נפלתם לתוך הר הגעש! 🌋',
    'בפנים חם, זוהר ומבעבע - והיציאה היחידה היא גשר סלעים מעל אגם הלבה!',
    'בלוע הגעש קפוא בלייז - לוחם האש מזירת האנגלית - בתוך גביש קסום! איזו בושה לאיש אש... 🔥',
    'סלמנדרה קטנה ולוהטת תדריך אתכם באנגלית - עם מילים של גיימרים אמיתיים! 🎮',
  ],
  treasure: { emoji: '🌋', name: 'אבן הלבה', desc: 'אבן שתמיד חמימה - כמו לב של חבר' },
  outro: 'הגביש נמס! בלייז התעורר עם פיצוץ להבות, בנה גשר סלעים בעצמו - ורצתם יחד החוצה אל האוויר הקריר! 🌄',

  setup() {
    return {
      gems: r(2, 6),
      salamanders: r(2, 5),
      flames: r(2, 4),
      code: [r(1, 9), r(1, 9), r(1, 9)],
      brazier: shuffleArr(['power', 'shield', 'map', 'trophy']),
    }
  },

  items: {
    shield: { emoji: '🛡️', en: 'Shield', he: 'מגן קרח עתיק', word: 'shield' },
    fireKey: { emoji: '🗝️', en: 'Key', he: 'מפתח האש', word: 'key' },
    lavaGem: { emoji: '💎', en: 'Gem', he: 'יהלום הלבה', word: 'gem' },
  },

  scenes: [
    {
      id: 'slope',
      name: 'מדרון הגעש',
      Art: SlopeScene,
      hotspots: [
        {
          id: 'shieldRock',
          area: { x: 75, y: 560, w: 175, h: 125 },
          onTap(api) {
            if (api.has('gotShield')) {
              api.sfx.thud()
              api.pulse('shieldRock')
            } else if (!api.has('dig1')) {
              api.set('dig1')
              api.sfx.creak()
              api.sayHe('משהו כחול קבור בסלע... חפרו שוב!')
              api.pulse('shieldRock')
            } else if (!api.has('dig2')) {
              api.set('dig2')
              api.sfx.creak()
              api.sayHe('זה מגן! עוד משיכה אחת!')
              api.pulse('shieldRock')
            } else {
              api.set('gotShield')
              api.addItem('shield')
            }
          },
        },
        {
          id: 'countChest',
          area: { x: 485, y: 540, w: 190, h: 150 },
          onTap(api) {
            if (api.has('chestOpen') && !api.has('gotLavaGem')) {
              api.set('gotLavaGem')
              api.addItem('lavaGem')
            } else if (!api.has('chestOpen')) {
              api.openOverlay('lavaCount')
            } else {
              api.sfx.thud()
              api.pulse('countChest')
            }
          },
        },
        {
          id: 'flames',
          area: { x: 80, y: 260, w: 560, h: 250 },
          onTap(api) {
            api.say('Fire!')
            api.learnWord('fire')
            api.pulse('flames')
          },
        },
      ],
    },
    {
      id: 'cave',
      name: 'מערת הלבה',
      Art: LavaCaveScene,
      hotspots: [
        {
          id: 'sparks',
          area: { x: 180, y: 150, w: 360, h: 280 },
          onTap(api) {
            if (!api.has('sparksOff')) {
              api.sfx.locked()
              api.sayHe('הניצוצות חמים מדי! צריך משהו לחסום אותם...')
              api.pulse('sparks')
            } else api.sfx.tap()
          },
          onItem(item, api) {
            if (item === 'shield' && !api.has('sparksOff')) {
              api.set('sparksOff')
              api.removeItem('shield')
              api.sfx.good()
              api.sayHe('המגן חוסם את הניצוצות - ופתאום רואים יהלומים בכל המערה!')
              api.pulse('sparks')
              return true
            }
            return false
          },
        },
        {
          id: 'gems',
          area: { x: 90, y: 510, w: 570, h: 140 },
          onTap(api) {
            api.say('Gem!')
            api.learnWord('gem')
            api.sfx.star()
            api.pulse('gems')
          },
        },
      ],
    },
    {
      id: 'temple',
      name: 'מקדש האש',
      Art: FireTempleScene,
      hotspots: [
        {
          id: 'brazier',
          area: { x: 265, y: 385, w: 190, h: 180 },
          onTap(api) {
            if (!api.has('brazierLit')) api.openOverlay('gamerLock')
            else {
              api.sfx.good()
              api.pulse('brazier')
            }
          },
        },
        {
          id: 'vault',
          area: { x: 495, y: 370, w: 180, h: 220 },
          onTap(api) {
            if (api.has('vaultOpen') && !api.has('gotFireKey')) {
              api.set('gotFireKey')
              api.addItem('fireKey')
            } else if (!api.has('brazierLit')) {
              api.sfx.locked()
              api.parrot('Too dark! Light the FIRE first!', 'חשוך מדי - קודם להדליק את המדורה!')
              api.pulse('brazier')
            } else if (!api.has('vaultOpen')) {
              api.openOverlay('lavaVault')
            } else {
              api.sfx.thud()
              api.pulse('vault')
            }
          },
        },
      ],
    },
    {
      id: 'crater',
      name: 'לוע הגעש',
      Art: CraterScene,
      hotspots: [
        {
          id: 'crystal',
          area: { x: 250, y: 170, w: 220, h: 330 },
          onTap(api) {
            if (api.has('blazeFreed') && !api.has('doorOpen')) {
              // לחיצה על בלייז המשוחרר = הוא בונה את הגשר! (סיום סלחני)
              api.set('doorOpen')
              api.sfx.thud()
              api.later(() => api.sfx.win(), 400)
            } else if (!api.has('blazeFreed')) {
              api.sfx.locked()
              api.sayHe('בלייז קפוא בגביש! יש בו חור מפתח ושקע יהלום...')
              api.pulse('crystal')
            }
          },
          onItem(item, api) {
            if (item === 'fireKey' && !api.has('keySet')) {
              api.set('keySet')
              api.removeItem('fireKey')
              api.sfx.good()
              api.pulse('crystal')
              if (api.has('gemSet')) api.later(() => { api.set('blazeFreed'); api.sfx.win() }, 600)
              return true
            }
            if (item === 'lavaGem' && !api.has('gemSet')) {
              api.set('gemSet')
              api.removeItem('lavaGem')
              api.sfx.good()
              api.pulse('crystal')
              if (api.has('keySet')) api.later(() => { api.set('blazeFreed'); api.sfx.win() }, 600)
              return true
            }
            return false
          },
        },
        {
          id: 'bridge',
          area: { x: 530, y: 460, w: 180, h: 200 },
          onTap(api) {
            if (api.has('blazeFreed') && !api.has('doorOpen')) {
              api.set('doorOpen')
              api.sfx.thud()
              api.later(() => api.sfx.win(), 400)
            } else {
              api.sfx.blub()
              if (!api.has('blazeFreed')) api.sayHe('סלעי הגשר לא מגיעים עד הסוף... צריך מישהו שיודע לבנות באש!')
              api.pulse('bridge')
            }
          },
        },
        {
          id: 'sals',
          area: { x: 80, y: 490, w: 550, h: 130 },
          onTap(api) {
            api.sfx.squeak()
            api.pulse('sals')
          },
        },
      ],
    },
  ],

  overlays: {
    gamerLock: (api) => ({
      type: 'listen',
      title: '🔥 מדורת הגיימרים',
      text: 'המדורה נדלקת עם מילים של גיימרים אמיתיים! הסלמנדרה אומרת מילה - לחצו על הציור!',
      prompt: 'הקשיבו... איזו מילת גיימרים?',
      options: [
        { id: 'power', en: 'Power', he: 'כוח', emoji: '⚡' },
        { id: 'shield', en: 'Shield', he: 'מגן', emoji: '🛡️' },
        { id: 'map', en: 'Map', he: 'מפה', emoji: '🗺️' },
        { id: 'trophy', en: 'Trophy', he: 'גביע', emoji: '🏆' },
        { id: 'win', en: 'Win', he: 'ניצחון', emoji: '🥇' },
        { id: 'gem', en: 'Gem', he: 'יהלום', emoji: '💎' },
      ],
      rounds: api.setup.brazier.map((c) => ({ id: c, en: c[0].toUpperCase() + c.slice(1) })),
      onSolved(a) {
        a.set('brazierLit')
        a.closeOverlay()
        a.later(() => a.sayHe('המדורה מתלקחת - המקדש מואר!'), 600)
      },
    }),
    lavaVault: (api) => ({
      type: 'keypad',
      title: '🔢 כספת הלבה',
      text: 'הסלמנדרה לוחשת את הקוד באנגלית - הקישו את המספרים!',
      code: api.setup.code,
      onSolved(a) {
        a.set('vaultOpen')
        a.later(() => a.closeOverlay(), 400)
      },
    }),
    lavaCount: (api) => ({
      type: 'code',
      title: '🗿 תיבת הגעש',
      text: 'על המנעול חרוטים יהלום, סלמנדרה ולהבה. כמה יש מכל אחד בהר?',
      icons: ['💎', '🦎', '🔥'],
      answer: [api.setup.gems, api.setup.salamanders, api.setup.flames],
      onSolved(a) {
        a.set('chestOpen')
        a.later(() => a.closeOverlay(), 400)
      },
    }),
  },

  guide(f) {
    if (!f.gotShield) return { en: 'Dig! Find the SHIELD!', he: 'חפרו את המגן הכחול מהסלע במדרון!' }
    if (!f.sparksOff) return { en: 'Block the fire with the SHIELD!', he: 'חסמו את הניצוצות במערת הלבה עם המגן!' }
    if (!f.brazierLit) return { en: 'Light the fire! Listen to the GAMER words!', he: 'הדליקו את המדורה במקדש - מילים של גיימרים!' }
    if (!f.gotFireKey) return { en: 'Open the vault! Listen to the NUMBERS!', he: 'פתחו את כספת הלבה עם הקוד!' }
    if (!f.gotLavaGem) return { en: 'Count the GEMS, the lizards and the FIRE!', he: 'ספרו בהר ופתחו את תיבת הגעש במדרון!' }
    if (!f.blazeFreed) return { en: 'Use the KEY and the GEM! Free BLAZE!', he: 'שימו את המפתח ואת היהלום בגביש של בלייז!' }
    if (!f.doorOpen) return { en: 'BLAZE is free! Cross the bridge!', he: 'לחצו על בלייז או על הגשר - בורחים!' }
    return { en: 'YES! Goodbye, volcano!', he: 'ברחתם! להתראות הר געש!' }
  },

  hints(f) {
    if (!f.gotShield) return ['משהו כחול מציץ מהסלע במדרון - לחצו עליו שוב ושוב! 🛡️']
    if (!f.sparksOff) return [
      'וילון ניצוצות חוסם את מערת הלבה',
      'בחרו את המגן ולחצו על הניצוצות!',
    ]
    if (!f.brazierLit) return [
      'המדורה הגדולה במקדש האש - לחצו עליה',
      'מילים של גיימרים: POWER=כוח, SHIELD=מגן, MAP=מפה, TROPHY=גביע 🎮',
    ]
    if (!f.gotFireKey) return [
      'הכספת עם הכפתורים במקדש - עכשיו יש אור!',
      'הסלמנדרה אומרת מספרים באנגלית - הקישו אותם',
    ]
    if (!f.gotLavaGem) return [
      'תיבת הגעש במדרון - לחצו עליה',
      'ספרו: יהלומים במערה (אחרי המגן!), סלמנדרות בלוע, לפידים במדרון',
    ]
    if (!f.blazeFreed) return [
      'לגביש של בלייז יש שני מנעולים: חור מפתח ושקע יהלום',
      'שימו את מפתח האש 🗝️ ואת יהלום הלבה 💎 - אחד אחד!',
    ]
    if (!f.doorOpen) return ['בלייז חופשי ולוהט! לחצו עליו או על הגשר הזוהר - ובורחים! 🔥']
    return []
  },

  focus(f) {
    if (!f.gotShield) return { scene: 'slope', hotspot: 'shieldRock' }
    if (!f.sparksOff) return { scene: 'cave', hotspot: 'sparks' }
    if (!f.brazierLit) return { scene: 'temple', hotspot: 'brazier' }
    if (!f.gotFireKey) return { scene: 'temple', hotspot: 'vault' }
    if (!f.gotLavaGem) return { scene: 'slope', hotspot: 'countChest' }
    if (!f.blazeFreed) return { scene: 'crater', hotspot: 'crystal' }
    return { scene: 'crater', hotspot: 'bridge' }
  },

  isWon: (f) => !!f.doorOpen,
}
