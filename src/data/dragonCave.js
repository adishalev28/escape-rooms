// חדר 4: מערת הדרקון 🐉 - הרמה הקשה ביותר!
// חדש כאן: 4 מבטים, פקודות של 2 מילים ("The RED key!"), 4 מפתחות צבעוניים,
// דרקון ישן שצריך להאכיל, והכל אקראי. בולט לכוד בכלוב!
import { EntranceScene, CrystalScene, HoardScene, GateScene } from '../scenes/dragonArt.jsx'

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
  id: 'dragon-cave',
  type: 'scene',
  title: 'מערת הדרקון',
  emoji: '🐉',
  guideEmoji: '🐲',
  rescue: 'bolt',
  parTime: 600,
  bg: 'from-slate-950 via-purple-950 to-slate-950',
  intro: [
    'נכנסתם למערה אפלה בהרים... והסלע נסגר מאחוריכם! 🐉',
    'בפנים: הר של זהב, דרקון ענק שישן... ובולט - הלוחם מזירת האנגלית - כלוב בכלוב ברזל! ⚡',
    'דרקון קטן וירוק מתנדב לעזור - אבל כמו כולם, הוא מדבר רק אנגלית! 🐲',
    'שער האבן נפתח עם 4 מפתחות צבעוניים. מצאו את כולם, שחררו את בולט - ובשקט... לא להעיר את הדרקון! 🤫',
  ],
  treasure: { emoji: '🐲', name: 'ביצת הדרקון', desc: 'ביצה זוהרת - אולי יבקע ממנה חבר חדש?' },
  outro: 'השער נפתח בשקשוק אדיר... הדרקון הגדול פקח עין אחת, חייך - וחזר לישון. ברחתם עם בולט אל אור היום! ⚡',

  // הכל אקראי: הספירות וסדר המפתחות בשער שונים בכל משחק
  setup() {
    return {
      bats: r(2, 5),
      gems: r(3, 6),
      mushrooms: r(2, 5),
      gold: r(2, 4),
      doorOrder: shuffleArr(['red', 'blue', 'green', 'yellow']),
    }
  },

  items: {
    candle: { emoji: '🕯️', en: 'Candle', he: 'נר (צריך להדליק אותו)', word: 'candle' },
    litCandle: { emoji: '🔥', en: 'Fire', he: 'נר דולק!', word: 'fire' },
    pickaxe: { emoji: '⛏️', en: 'Pickaxe', he: 'מעדר כבד' },
    fish: { emoji: '🐟', en: 'Fish', he: 'דג (מישהו רעב כאן?)', word: 'fish' },
    redKey: { emoji: '🔴🗝️', en: 'Red key', he: 'המפתח האדום', word: 'red' },
    blueKey: { emoji: '🔵🗝️', en: 'Blue key', he: 'המפתח הכחול', word: 'blue' },
    greenKey: { emoji: '🟢🗝️', en: 'Green key', he: 'המפתח הירוק', word: 'green' },
    yellowKey: { emoji: '🟡🗝️', en: 'Yellow key', he: 'המפתח הצהוב', word: 'yellow' },
    cageKey: { emoji: '🗝️', en: 'Key', he: 'מפתח הכלוב', word: 'key' },
  },

  scenes: [
    {
      id: 'entrance',
      name: 'פתח המערה',
      Art: EntranceScene,
      hotspots: [
        {
          id: 'candle',
          area: { x: 75, y: 250, w: 120, h: 100 },
          onTap(api) {
            if (!api.has('gotCandle')) {
              api.set('gotCandle')
              api.addItem('candle')
            } else api.sfx.tap()
          },
        },
        {
          id: 'pickrock',
          area: { x: 505, y: 445, w: 175, h: 230 },
          onTap(api) {
            if (api.has('gotPickaxe')) {
              api.sfx.thud()
              api.pulse('pickrock')
            } else if (!api.has('rockW1')) {
              api.set('rockW1')
              api.sfx.creak()
              api.sayHe('המעדר תקוע... נסו שוב!')
              api.pulse('pickrock')
            } else if (!api.has('rockW2')) {
              api.set('rockW2')
              api.sfx.creak()
              api.sayHe('הוא זז! עוד פעם אחת!')
              api.pulse('pickrock')
            } else {
              api.set('gotPickaxe')
              api.addItem('pickaxe')
            }
          },
        },
        {
          id: 'fishBarrel',
          area: { x: 60, y: 540, w: 145, h: 140 },
          onTap(api) {
            if (!api.has('gotFish')) {
              api.set('gotFish')
              api.addItem('fish')
            } else {
              api.sfx.thud()
              api.pulse('fishBarrel')
            }
          },
        },
        {
          id: 'echo',
          area: { x: 250, y: 595, w: 240, h: 80 },
          onTap(api) {
            if (!api.has('echoDone')) api.openOverlay('echoStones')
            else {
              api.sfx.good()
              api.pulse('echo')
            }
          },
        },
        {
          id: 'greenKey',
          area: { x: 345, y: 555, w: 90, h: 60 },
          onTap(api) {
            if (api.has('echoDone') && !api.has('gotGreenKey')) {
              api.set('gotGreenKey')
              api.addItem('greenKey')
            } else api.sfx.tap()
          },
        },
        {
          id: 'bats',
          area: { x: 140, y: 120, w: 460, h: 130 },
          onTap(api) {
            api.say('Bat!')
            api.learnWord('bat')
            api.sfx.squeak()
            api.pulse('bats')
          },
        },
      ],
    },
    {
      id: 'crystal',
      name: 'אולם הגבישים',
      Art: CrystalScene,
      hotspots: [
        {
          id: 'alcove',
          area: { x: 70, y: 330, w: 180, h: 145 },
          onTap(api) {
            if (api.has('alcoveLit') && !api.has('gotRedKey')) {
              api.set('gotRedKey')
              api.addItem('redKey')
            } else if (!api.has('alcoveLit')) {
              api.sayHe('חשוך שם בפנים... צריך אור!')
              api.pulse('alcove')
            } else api.sfx.tap()
          },
          onItem(item, api) {
            if (item === 'litCandle' && !api.has('alcoveLit')) {
              api.set('alcoveLit')
              api.removeItem('litCandle')
              api.sfx.good()
              api.pulse('alcove')
              return true
            }
            return false
          },
        },
        {
          id: 'bigCrystal',
          area: { x: 310, y: 240, w: 185, h: 250 },
          onTap(api) {
            if (api.has('crystalBroken') && !api.has('gotBlueKey')) {
              api.set('gotBlueKey')
              api.addItem('blueKey')
            } else {
              api.sfx.locked()
              if (!api.has('crystalBroken')) api.sayHe('המפתח כלוא בתוך הגביש! צריך משהו חזק...')
              api.pulse('bigCrystal')
            }
          },
          onItem(item, api) {
            if (item === 'pickaxe' && !api.has('crystalBroken')) {
              api.set('crystalBroken')
              api.removeItem('pickaxe')
              api.sfx.thud()
              api.later(() => api.sfx.good(), 400)
              api.pulse('bigCrystal')
              return true
            }
            return false
          },
        },
        {
          id: 'gems',
          area: { x: 60, y: 540, w: 600, h: 130 },
          onTap(api) {
            api.sfx.star()
            api.pulse('gems')
          },
        },
        {
          id: 'mushrooms',
          area: { x: 540, y: 485, w: 100, h: 55 },
          onTap(api) {
            api.sfx.blub()
            api.pulse('mushrooms')
          },
        },
      ],
    },
    {
      id: 'hoard',
      name: 'אוצר הדרקון',
      Art: HoardScene,
      hotspots: [
        {
          id: 'fireBowl',
          area: { x: 60, y: 320, w: 120, h: 140 },
          onTap(api) {
            api.sfx.creak()
            api.pulse('fireBowl')
          },
          onItem(item, api) {
            if (item === 'candle' && !api.has('candleLit')) {
              api.set('candleLit')
              api.removeItem('candle')
              api.addItem('litCandle')
              api.pulse('fireBowl')
              return true
            }
            return false
          },
        },
        {
          id: 'dragon',
          area: { x: 260, y: 330, w: 280, h: 175 },
          onTap(api) {
            api.sfx.creak()
            api.sayHe('שששש... הדרקון ישן! לא להעיר!')
            api.pulse('dragon')
          },
          onItem(item, api) {
            if (item === 'fish' && !api.has('dragonFed')) {
              api.set('dragonFed')
              api.removeItem('fish')
              api.sfx.good()
              api.sayHe('הדרקון הריח את הדג, חייך מתוך שינה... והתגלגל הצידה!')
              api.pulse('dragon')
              return true
            }
            return false
          },
        },
        {
          id: 'yellowKey',
          area: { x: 405, y: 505, w: 90, h: 55 },
          onTap(api) {
            if (api.has('dragonFed') && !api.has('gotYellowKey')) {
              api.set('gotYellowKey')
              api.addItem('yellowKey')
            } else api.sfx.tap()
          },
        },
        {
          id: 'chest',
          area: { x: 550, y: 460, w: 160, h: 175 },
          onTap(api) {
            if (api.has('chestOpen') && !api.has('gotCageKey')) {
              api.set('gotCageKey')
              api.addItem('cageKey')
            } else if (!api.has('chestOpen')) {
              api.openOverlay('countChest')
            } else {
              api.sfx.thud()
              api.pulse('chest')
            }
          },
        },
        {
          id: 'gold',
          area: { x: 70, y: 570, w: 500, h: 110 },
          onTap(api) {
            api.say('Gold!')
            api.learnWord('gold')
            api.pulse('gold')
          },
        },
      ],
    },
    {
      id: 'gate',
      name: 'שער האבן',
      Art: GateScene,
      hotspots: [
        {
          id: 'cage',
          area: { x: 30, y: 200, w: 160, h: 265 },
          onTap(api) {
            api.sfx.locked()
            if (!api.has('boltFreed')) api.sayHe('בולט כלוא! המנעול צריך מפתח...')
            api.pulse('cage')
          },
          onItem(item, api) {
            if (item === 'cageKey' && !api.has('boltFreed')) {
              api.set('boltFreed')
              api.removeItem('cageKey')
              api.sfx.unlock()
              api.later(() => api.sfx.win(), 500)
              api.pulse('cage')
              return true
            }
            return false
          },
        },
        {
          id: 'gate',
          area: { x: 200, y: 180, w: 320, h: 480 },
          onTap(api) {
            if (api.has('doorOpen')) return
            if (!api.has('boltFreed')) {
              api.parrot('First free BOLT!', 'קודם לשחרר את בולט מהכלוב!')
              api.pulse('cage')
              return
            }
            const keys = ['redKey', 'blueKey', 'greenKey', 'yellowKey']
            const missing = keys.filter((k) => !api.hasItem(k))
            if (missing.length) {
              api.parrot(`Find ${missing.length} more keys!`, `חסרים עוד ${missing.length} מפתחות צבעוניים!`)
              api.pulse('gate')
            } else {
              api.openOverlay('gateLock')
            }
          },
        },
        {
          id: 'babyDragon',
          area: { x: 550, y: 400, w: 150, h: 120 },
          onTap(api) {
            api.pulse('babyDragon')
            api.repeat()
          },
        },
      ],
    },
  ],

  overlays: {
    echoStones: {
      type: 'simon',
      title: '🗣️ אבני ההד',
      pads: [
        { emoji: '🦇', tone: 240, color: 'from-violet-500 to-purple-800', word: 'Bat' },
        { emoji: '🐸', tone: 320, color: 'from-emerald-400 to-green-700', word: 'Frog' },
        { emoji: '🐍', tone: 400, color: 'from-lime-400 to-emerald-600', word: 'Snake' },
        { emoji: '🐻', tone: 500, color: 'from-amber-500 to-orange-700', word: 'Bear' },
      ],
      rounds: [3, 4],
      onSolved(api) {
        ;['bat', 'frog', 'snake', 'bear'].forEach((w) => api.learnWord(w))
        api.set('echoDone')
        api.closeOverlay()
      },
    },
    countChest: (api) => ({
      type: 'code',
      title: '💰 תיבת האוצר',
      text: 'על המנעול חרוטים עטלף, פטרייה ומטבע. כמה יש מכל אחד במערה?',
      icons: ['🦇', '🍄', '🪙'],
      answer: [api.setup.bats, api.setup.mushrooms, api.setup.gold],
      onSolved(a) {
        a.set('chestOpen')
        a.later(() => a.closeOverlay(), 400)
      },
    }),
    gateLock: (api) => ({
      type: 'listen',
      title: '🗝️ שער ארבעת המפתחות',
      text: 'הדרקון הקטן אומר איזה מפתח להכניס - שתי מילים: צבע + מפתח! הקשיבו טוב!',
      prompt: 'הקשיבו... איזה מפתח עכשיו?',
      options: [
        { id: 'red', en: 'Red key', he: 'המפתח האדום', emoji: '🔴🗝️' },
        { id: 'blue', en: 'Blue key', he: 'המפתח הכחול', emoji: '🔵🗝️' },
        { id: 'green', en: 'Green key', he: 'המפתח הירוק', emoji: '🟢🗝️' },
        { id: 'yellow', en: 'Yellow key', he: 'המפתח הצהוב', emoji: '🟡🗝️' },
      ],
      rounds: api.setup.doorOrder.map((c) => ({ id: c, en: `The ${c.toUpperCase()} key!`, word: c })),
      onSolved(a) {
        ;['redKey', 'blueKey', 'greenKey', 'yellowKey'].forEach((k) => a.removeItem(k))
        a.set('gateSolved')
        a.closeOverlay()
        a.later(() => {
          a.sfx.creak()
          a.set('doorOpen')
        }, 700)
      },
    }),
  },

  guide(f) {
    if (!f.gotCandle) return { en: 'Find the CANDLE!', he: 'מצאו את הנר בפתח המערה!' }
    if (!f.candleLit) return { en: 'Make FIRE! Light the CANDLE!', he: 'הדליקו את הנר בקערת האש של הדרקון!' }
    if (!f.gotRedKey) return { en: 'Look in the DARK hole! Find the RED key!', he: 'האירו את הגומחה החשוכה באולם הגבישים!' }
    if (!f.gotPickaxe) return { en: 'Pull the PICKAXE! Pull, pull, pull!', he: 'משכו את המעדר מהסלע - כמה פעמים!' }
    if (!f.gotBlueKey) return { en: 'Break the BLUE crystal!', he: 'שברו את הגביש הכחול הגדול עם המעדר!' }
    if (!f.gotGreenKey) return { en: 'Listen to the echo stones! Repeat!', he: 'אבני ההד בפתח המערה - חזרו על השיר שלהן!' }
    if (!f.gotFish) return { en: 'The big dragon is hungry... Find the FISH!', he: 'הדרקון הגדול רעב... יש דג בחבית!' }
    if (!f.dragonFed) return { en: 'Give the FISH to the dragon! Shhh...', he: 'תנו את הדג לדרקון הישן - בשקט!' }
    if (!f.gotYellowKey) return { en: 'Take the YELLOW key!', he: 'קחו את המפתח הצהוב!' }
    if (!f.chestOpen) return { en: 'Count the BATS, the MUSHROOMS and the GOLD!', he: 'ספרו במערה ופתחו את תיבת האוצר!' }
    if (!f.gotCageKey) return { en: 'Take the key from the chest!', he: 'קחו את מפתח הכלוב מהתיבה!' }
    if (!f.boltFreed) return { en: 'Free BOLT!', he: 'שחררו את בולט מהכלוב!' }
    if (!f.doorOpen) return { en: 'Open the gate! Listen to the KEYS!', he: 'לשער! הקשיבו איזה מפתח להכניס בכל פעם!' }
    return { en: 'YES! Goodbye, dragon!', he: 'ברחתם! להתראות דרקון!' }
  },

  hints(f) {
    if (!f.gotCandle) return ['CANDLE זה נר! 🕯️ הוא על מדף סלע בפתח המערה']
    if (!f.candleLit) return [
      'FIRE זה אש! 🔥 איפה יש אש במערה?',
      'בחרו את הנר ולחצו על קערת האש באוצר הדרקון',
    ]
    if (!f.gotRedKey) return [
      'יש גומחה חשוכה עם ❓ באולם הגבישים',
      'בחרו את הנר הדולק ולחצו על הגומחה - ואז קחו את המפתח האדום!',
    ]
    if (!f.gotPickaxe) return ['המעדר תקוע בסלע בפתח המערה - לחצו עליו שוב ושוב עד שישתחרר! 💪']
    if (!f.gotBlueKey) return [
      'המפתח הכחול כלוא בתוך הגביש הענק',
      'בחרו את המעדר ולחצו על הגביש הכחול הגדול!',
    ]
    if (!f.gotGreenKey) return [
      '4 האבנים הזוהרות בפתח המערה שרות שיר - חזרו עליו!',
      'זה כמו השיר של התוכי, אבל עם חיות: BAT, FROG, SNAKE, BEAR',
      'כשתצליחו - מפתח ירוק יקפוץ! אל תשכחו לקחת אותו',
    ]
    if (!f.gotFish) return ['FISH זה דג! 🐟 יש אחד בחבית הישנה בפתח המערה']
    if (!f.dragonFed) return ['בחרו את הדג ולחצו על הדרקון הישן - הוא יריח ויזוז 🤫']
    if (!f.gotYellowKey) return ['המפתח הצהוב מציץ איפה שהדרקון ישן קודם!']
    if (!f.chestOpen) return [
      'לחצו על התיבה עם החריטות 🦇🍄🪙',
      'עטלפים בפתח המערה, פטריות זוהרות באולם הגבישים, ערימות זהב אצל הדרקון',
    ]
    if (!f.gotCageKey) return ['מפתח הכלוב הכסוף בתוך התיבה הפתוחה!']
    if (!f.boltFreed) return ['בחרו את מפתח הכלוב ולחצו על הכלוב של בולט! ⚡']
    if (!f.doorOpen) return [
      'לחצו על שער האבן עם 4 המנעולים',
      'הדרקון אומר שתי מילים: צבע + KEY. למשל RED key = המפתח האדום 🔴',
    ]
    return []
  },

  focus(f) {
    if (!f.gotCandle) return { scene: 'entrance', hotspot: 'candle' }
    if (!f.candleLit) return { scene: 'hoard', hotspot: 'fireBowl' }
    if (!f.gotRedKey) return { scene: 'crystal', hotspot: 'alcove' }
    if (!f.gotPickaxe) return { scene: 'entrance', hotspot: 'pickrock' }
    if (!f.gotBlueKey) return { scene: 'crystal', hotspot: 'bigCrystal' }
    if (!f.gotGreenKey) return { scene: 'entrance', hotspot: f.echoDone ? 'greenKey' : 'echo' }
    if (!f.gotFish) return { scene: 'entrance', hotspot: 'fishBarrel' }
    if (!f.dragonFed) return { scene: 'hoard', hotspot: 'dragon' }
    if (!f.gotYellowKey) return { scene: 'hoard', hotspot: 'yellowKey' }
    if (!f.gotCageKey) return { scene: 'hoard', hotspot: 'chest' }
    if (!f.boltFreed) return { scene: 'gate', hotspot: 'cage' }
    return { scene: 'gate', hotspot: 'gate' }
  },

  isWon: (f) => !!f.doorOpen,
}
