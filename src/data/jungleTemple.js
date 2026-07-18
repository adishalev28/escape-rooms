// חדר 7: מקדש הג'ונגל 🐒
// חיות הג'ונגל באנגלית, תופי קצב מדברים, אבן שמש שמאירה מקדש חשוך,
// ורוקי כלוא בכלוב אבן. הסיום סלחני - גם רוקי וגם הקיר הסדוק בורחים!
import { PathScene, CanopyScene, TempleCourtScene, InnerTempleScene } from '../scenes/jungleArt.jsx'

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
  id: 'jungle-temple',
  type: 'scene',
  title: 'מקדש הג\'ונגל',
  emoji: '🐒',
  guideEmoji: '🐵',
  rescue: 'rocky',
  parTime: 600,
  bg: 'from-green-950 via-emerald-900 to-green-950',
  intro: [
    'הלכתם אחרי מפה ישנה בעומק הג\'ונגל... והגעתם למקדש אבן עתיק! 🐒',
    'הצמחייה נסגרה מאחוריכם - הדרך היחידה החוצה היא דרך המקדש!',
    'בפנים כלוא רוקי - הלוחם מזירת האנגלית - בכלוב אבן עתיק! 🪨',
    'קוף קטן וחכם ידריך אתכם באנגלית. שחררו את רוקי וברחו! 🍀',
  ],
  treasure: { emoji: '🗿', name: 'צלמית הג\'ונגל', desc: 'פסל קטן שמחייך למי שמציל חברים' },
  outro: 'רוקי מתח שרירים, נתן אגרוף אחד בקיר הסדוק - והקיר קרס! אור השמש הציף את המקדש ורצתם החוצה אל הג\'ונגל! 🌿',

  // הספירות וסדר שירת החיות - אקראיים בכל משחק
  setup() {
    return {
      butterflies: r(2, 5),
      monkeys: r(2, 5),
      flowers: r(2, 6),
      chant: shuffleArr(['lion', 'monkey', 'elephant', 'cow']),
    }
  },

  items: {
    banana: { emoji: '🍌', en: 'Banana', he: 'בננה', word: 'banana' },
    sunStone: { emoji: '☀️', en: 'Sun stone', he: 'אבן השמש', word: 'sun' },
    templeKey: { emoji: '🗝️', en: 'Key', he: 'מפתח המקדש', word: 'key' },
  },

  scenes: [
    {
      id: 'path',
      name: 'שביל הג\'ונגל',
      Art: PathScene,
      hotspots: [
        {
          id: 'stoneChest',
          area: { x: 70, y: 355, w: 200, h: 190 },
          onTap(api) {
            if (api.has('chestOpen') && !api.has('gotTempleKey')) {
              api.set('gotTempleKey')
              api.addItem('templeKey')
            } else if (!api.has('chestOpen')) {
              api.openOverlay('countChest')
            } else {
              api.sfx.thud()
              api.pulse('stoneChest')
            }
          },
        },
        {
          id: 'bflies',
          area: { x: 100, y: 60, w: 560, h: 200 },
          onTap(api) {
            api.sfx.star()
            api.pulse('bflies')
          },
        },
        {
          id: 'frog',
          area: { x: 520, y: 555, w: 90, h: 60 },
          onTap(api) {
            api.say('Frog!')
            api.learnWord('frog')
            api.sfx.squeak()
            api.pulse('frog')
          },
        },
      ],
    },
    {
      id: 'canopy',
      name: 'עצי הקופים',
      Art: CanopyScene,
      hotspots: [
        {
          id: 'bananaTree',
          area: { x: 260, y: 260, w: 200, h: 440 },
          onTap(api) {
            if (api.has('gotBanana')) {
              api.say('Tree!')
              api.learnWord('tree')
              api.pulse('bananaTree')
            } else if (!api.has('shake1')) {
              api.set('shake1')
              api.sfx.creak()
              api.sayHe('העץ זז... נערו אותו שוב!')
              api.pulse('bananaTree')
            } else if (!api.has('shake2')) {
              api.set('shake2')
              api.sfx.creak()
              api.sayHe('הבננות רועדות! עוד נענוע אחד!')
              api.pulse('bananaTree')
            } else {
              api.set('gotBanana')
              api.addItem('banana')
            }
          },
        },
        {
          id: 'monkeys',
          area: { x: 70, y: 80, w: 580, h: 280 },
          onTap(api) {
            api.say('Monkey!')
            api.learnWord('monkey')
            api.sfx.squeak()
            api.pulse('monkeys')
          },
        },
      ],
    },
    {
      id: 'court',
      name: 'חצר המקדש',
      Art: TempleCourtScene,
      hotspots: [
        {
          id: 'bigMonkey',
          area: { x: 65, y: 400, w: 150, h: 160 },
          onTap(api) {
            if (!api.has('monkeyMoved')) {
              api.sfx.squeak()
              api.parrot('I am hungry! BANANA please!', 'הקוף הגדול יושב על התופים ורעב מאוד...')
              api.pulse('bigMonkey')
            } else api.sfx.squeak()
          },
          onItem(item, api) {
            if (item === 'banana' && !api.has('monkeyMoved')) {
              api.set('monkeyMoved')
              api.removeItem('banana')
              api.sfx.good()
              api.sayHe('הקוף חוטף את הבננה וקופץ מהתופים בשמחה!')
              api.pulse('bigMonkey')
              return true
            }
            return false
          },
        },
        {
          id: 'drums',
          area: { x: 60, y: 545, w: 165, h: 120 },
          onTap(api) {
            if (!api.has('monkeyMoved')) {
              api.sfx.thud()
              api.parrot('I am hungry! BANANA please!', 'הקוף יושב על התופים! קודם תאכילו אותו')
              api.pulse('bigMonkey')
            } else if (!api.has('drumsDone')) {
              api.openOverlay('jungleDrums')
            } else {
              api.sfx.good()
              api.pulse('drums')
            }
          },
        },
        {
          id: 'totem',
          area: { x: 570, y: 320, w: 110, h: 230 },
          onTap(api) {
            if (api.has('drumsDone') && !api.has('gotSunStone')) {
              api.set('gotSunStone')
              api.addItem('sunStone')
            } else if (!api.has('drumsDone')) {
              api.sfx.locked()
              api.sayHe('הפה של הטוטם סגור... אולי הוא אוהב מוזיקה?')
              api.pulse('totem')
            } else api.sfx.tap()
          },
        },
        {
          id: 'flowers',
          area: { x: 60, y: 580, w: 620, h: 100 },
          onTap(api) {
            api.sfx.star()
            api.pulse('flowers')
          },
        },
      ],
    },
    {
      id: 'inner',
      name: 'אולם האוצר',
      Art: InnerTempleScene,
      hotspots: [
        {
          id: 'pedestal',
          area: { x: 80, y: 405, w: 140, h: 210 },
          onTap(api) {
            if (!api.has('sunLit')) {
              api.sayHe('יש כאן שקע עגול זוהר... משהו עגול וזהוב חסר בו')
              api.pulse('pedestal')
            } else api.sfx.tap()
          },
          onItem(item, api) {
            if (item === 'sunStone' && !api.has('sunLit')) {
              api.set('sunLit')
              api.removeItem('sunStone')
              api.sfx.good()
              api.later(() => api.sfx.win(), 400)
              api.sayHe('אבן השמש מאירה את כל המקדש!')
              api.pulse('pedestal')
              return true
            }
            return false
          },
        },
        {
          id: 'cage',
          area: { x: 320, y: 240, w: 250, h: 310 },
          onTap(api) {
            if (!api.has('sunLit')) {
              api.sayHe('חשוך מדי... רואים רק צללים')
              api.pulse('cage')
            } else if (!api.has('chantDone')) {
              api.openOverlay('animalChant')
            } else if (!api.has('rockyFreed')) {
              api.sayHe('שירת החיות הושלמה! עכשיו המנעול - בחרו את מפתח המקדש')
              api.pulse('cage')
            } else if (!api.has('doorOpen')) {
              // לחיצה על רוקי המשוחרר = הוא שובר את הקיר! (סיום סלחני)
              api.set('doorOpen')
              api.sfx.thud()
              api.later(() => api.sfx.unlock(), 400)
            }
          },
          onItem(item, api) {
            if (item === 'templeKey' && api.has('chantDone') && !api.has('rockyFreed')) {
              api.set('rockyFreed')
              api.removeItem('templeKey')
              api.sfx.unlock()
              api.later(() => api.sfx.win(), 500)
              api.pulse('cage')
              return true
            }
            if (item === 'templeKey' && !api.has('chantDone')) {
              api.parrot('First sing with the ANIMALS!', 'קודם מנעול שירת החיות שעל הכלוב!')
              return true
            }
            return false
          },
        },
        {
          id: 'wall',
          area: { x: 575, y: 215, w: 125, h: 370 },
          onTap(api) {
            if (api.has('rockyFreed') && !api.has('doorOpen')) {
              api.set('doorOpen')
              api.sfx.thud()
              api.later(() => api.sfx.unlock(), 400)
            } else if (!api.has('rockyFreed')) {
              api.sfx.thud()
              api.sayHe('הקיר סדוק... אבל צריך מישהו ממש חזק לשבור אותו! 💪')
              api.pulse('wall')
            }
          },
        },
      ],
    },
  ],

  overlays: {
    jungleDrums: {
      type: 'simon',
      title: '🥁 תופי הג\'ונגל',
      pads: [
        { emoji: '🐵', tone: 250, color: 'from-amber-500 to-orange-700', word: 'Monkey' },
        { emoji: '🦁', tone: 330, color: 'from-yellow-400 to-amber-600', word: 'Lion' },
        { emoji: '🐘', tone: 410, color: 'from-slate-400 to-slate-600', word: 'Elephant' },
        { emoji: '🐸', tone: 520, color: 'from-emerald-400 to-green-600', word: 'Frog' },
      ],
      rounds: [3, 4],
      onSolved(api) {
        ;['monkey', 'lion', 'elephant', 'frog'].forEach((w) => api.learnWord(w))
        api.set('drumsDone')
        api.closeOverlay()
        api.later(() => api.sayHe('הטוטם פותח את הפה... יש בפנים אבן זהב עגולה!'), 600)
      },
    },
    countChest: (api) => ({
      type: 'code',
      title: '🗿 תיבת האבן',
      text: 'על המנעול חרוטים פרפר, קוף ופרח. כמה יש מכל אחד בג\'ונגל?',
      icons: ['🦋', '🐵', '🌺'],
      answer: [api.setup.butterflies, api.setup.monkeys, api.setup.flowers],
      onSolved(a) {
        a.set('chestOpen')
        a.later(() => a.closeOverlay(), 400)
      },
    }),
    animalChant: (api) => ({
      type: 'listen',
      title: '🎶 שירת החיות',
      text: 'על הכלוב חרוטות חיות! הקוף שר חיה באנגלית - לחצו על החיה הנכונה!',
      prompt: 'הקשיבו... איזו חיה הקוף שר?',
      options: [
        { id: 'lion', en: 'Lion', he: 'אריה', emoji: '🦁' },
        { id: 'monkey', en: 'Monkey', he: 'קוף', emoji: '🐵' },
        { id: 'elephant', en: 'Elephant', he: 'פיל', emoji: '🐘' },
        { id: 'cow', en: 'Cow', he: 'פרה', emoji: '🐮' },
        { id: 'dog', en: 'Dog', he: 'כלב', emoji: '🐶' },
        { id: 'cat', en: 'Cat', he: 'חתול', emoji: '🐱' },
      ],
      rounds: api.setup.chant.map((c) => ({ id: c, en: c[0].toUpperCase() + c.slice(1) })),
      onSolved(a) {
        a.set('chantDone')
        a.closeOverlay()
      },
    }),
  },

  guide(f) {
    if (!f.gotBanana) return { en: 'Shake the TREE! Get the BANANA!', he: 'נערו את עץ הבננות - כמה פעמים!' }
    if (!f.monkeyMoved) return { en: 'Give the BANANA to the big monkey!', he: 'תנו את הבננה לקוף הגדול שעל התופים!' }
    if (!f.drumsDone) return { en: 'Play the drums! Listen to the ANIMALS!', he: 'נגנו בתופים - חזרו על שיר החיות!' }
    if (!f.gotSunStone) return { en: 'Take the SUN stone!', he: 'קחו את אבן השמש מפי הטוטם!' }
    if (!f.gotTempleKey) return { en: 'Count the BUTTERFLIES, the MONKEYS and the FLOWERS!', he: 'ספרו בג\'ונגל ופתחו את תיבת האבן!' }
    if (!f.sunLit) return { en: 'Put the SUN stone in the temple!', he: 'שימו את אבן השמש בכן שבאולם האוצר!' }
    if (!f.chantDone) return { en: 'Sing with the ANIMALS!', he: 'פתרו את שירת החיות שעל הכלוב של רוקי!' }
    if (!f.rockyFreed) return { en: 'Use the KEY! Free ROCKY!', he: 'פתחו את המנעול עם מפתח המקדש!' }
    if (!f.doorOpen) return { en: 'ROCKY is strong! Break the wall!', he: 'רוקי חזק! לחצו עליו או על הקיר הסדוק!' }
    return { en: 'YES! Goodbye, jungle!', he: 'ברחתם! להתראות ג\'ונגל!' }
  },

  hints(f) {
    if (!f.gotBanana) return [
      'BANANA זה בננה! 🍌 יש אשכול על העץ הגדול במבט עצי הקופים',
      'לחצו על העץ שוב ושוב עד שהבננות יפלו!',
    ]
    if (!f.monkeyMoved) return ['הקוף הגדול יושב על התופים בחצר המקדש - בחרו את הבננה ולחצו עליו!']
    if (!f.drumsDone) return [
      'עכשיו התופים פנויים - לחצו עליהם!',
      'התופים שרים חיות: MONKEY=קוף, LION=אריה, ELEPHANT=פיל, FROG=צפרדע',
    ]
    if (!f.gotSunStone) return ['הטוטם פתח את הפה - אבן השמש הזהובה בפנים! ☀️']
    if (!f.gotTempleKey) return [
      'תיבת האבן בשביל הג\'ונגל - לחצו עליה',
      'ספרו: פרפרים בשביל, קופים על העצים, פרחים בחצר המקדש',
    ]
    if (!f.sunLit) return [
      'אולם האוצר חשוך - יש שם כן אבן עם שקע עגול',
      'בחרו את אבן השמש ולחצו על הכן!',
    ]
    if (!f.chantDone) return [
      'עכשיו רואים את רוקי! על הכלוב חרוטות חיות - לחצו על הכלוב',
      'הקוף שר חיה באנגלית - בחרו את החיה הנכונה, 4 פעמים',
    ]
    if (!f.rockyFreed) return ['בחרו את מפתח המקדש במלאי ולחצו על הכלוב! 🗝️']
    if (!f.doorOpen) return ['רוקי חופשי וחזק! לחצו עליו או על הקיר הסדוק מימין - והוא ישבור אותו! 💪']
    return []
  },

  focus(f) {
    if (!f.gotBanana) return { scene: 'canopy', hotspot: 'bananaTree' }
    if (!f.monkeyMoved) return { scene: 'court', hotspot: 'bigMonkey' }
    if (!f.drumsDone) return { scene: 'court', hotspot: 'drums' }
    if (!f.gotSunStone) return { scene: 'court', hotspot: 'totem' }
    if (!f.gotTempleKey) return { scene: 'path', hotspot: 'stoneChest' }
    if (!f.sunLit) return { scene: 'inner', hotspot: 'pedestal' }
    if (!f.chantDone || !f.rockyFreed) return { scene: 'inner', hotspot: 'cage' }
    return { scene: 'inner', hotspot: 'wall' }
  },

  isWon: (f) => !!f.doorOpen,
}
