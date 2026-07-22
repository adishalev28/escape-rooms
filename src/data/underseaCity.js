// חדר 8: העיר שמתחת לים 🌊
// מילים חדשות מהעולם שמסביב (מים, בית, מכונית, לב, פרח, לשחות),
// זרם שנעצר במזרקה, קשר-מילים על הרשת, ונינג'ה לכוד ברשת דייגים!
import { ReefScene, StreetScene, PalaceScene, NetCaveScene } from '../scenes/seaArt.jsx'

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
  id: 'undersea-city',
  type: 'scene',
  title: 'העיר שמתחת לים',
  emoji: '🌊',
  guideEmoji: '🐙',
  rescue: 'ninja',
  parTime: 600,
  bg: 'from-sky-950 via-cyan-950 to-blue-950',
  intro: [
    'צללתם עם שנורקל... ומערבולת סחפה אתכם לעיר קסומה בקרקעית הים! 🌊',
    'בתים מכדים עתיקים, ארמון פנינה... ורשת דייגים ענקית שנפלה מהעולם שלמעלה!',
    'בתוך הרשת לכוד נינג\'ה - הלוחם מזירת האנגלית! אפילו הוא לא מצליח להשתחרר! ✴️',
    'תמנון חכם ידריך אתכם באנגלית. שחררו את נינג\'ה לפני שייגמר לכם האוויר! 🍀',
  ],
  treasure: { emoji: '🐚', name: 'צדפת הקולות', desc: 'צדפה שאם מקשיבים לה - שומעים את הים מכל מקום' },
  outro: 'הרשת נפרמה! נינג\'ה השתחרר בסלטה תת-ימית, תפס אתכם - וזינקתם יחד דרך המערבולת אל החוף! 🏖️',

  setup() {
    return {
      clownfish: r(2, 5),
      shells: r(2, 6),
      starfish: r(2, 4),
      knot: shuffleArr(['water', 'swim', 'house', 'car']),
    }
  },

  items: {
    trident: { emoji: '🔱', en: 'Trident', he: 'קלשון הים' },
    pearl: { emoji: '🫧', en: 'Pearl', he: 'פנינת הענק' },
    heart: { emoji: '❤️', en: 'Heart', he: 'אבן הלב', word: 'heart' },
  },

  scenes: [
    {
      id: 'reef',
      name: 'שונית האלמוגים',
      Art: ReefScene,
      hotspots: [
        {
          id: 'tridentRock',
          area: { x: 265, y: 440, w: 160, h: 235 },
          onTap(api) {
            if (api.has('gotTrident')) {
              api.sfx.thud()
              api.pulse('tridentRock')
            } else if (!api.has('pull1')) {
              api.set('pull1')
              api.sfx.creak()
              api.sayHe('הקלשון תקוע בסלע... משכו שוב!')
              api.pulse('tridentRock')
            } else if (!api.has('pull2')) {
              api.set('pull2')
              api.sfx.creak()
              api.sayHe('הוא זז! עוד משיכה אחת!')
              api.pulse('tridentRock')
            } else {
              api.set('gotTrident')
              api.addItem('trident')
            }
          },
        },
        {
          id: 'anemone',
          area: { x: 120, y: 505, w: 105, h: 75 },
          onTap(api) {
            api.say('Flower!')
            api.learnWord('flower')
            api.sfx.blub()
            api.pulse('anemone')
          },
        },
        {
          id: 'clowns',
          area: { x: 90, y: 70, w: 560, h: 340 },
          onTap(api) {
            api.say('Fish!')
            api.learnWord('fish')
            api.sfx.blub()
            api.pulse('clowns')
          },
        },
      ],
    },
    {
      id: 'street',
      name: 'רחוב העיר',
      Art: StreetScene,
      hotspots: [
        {
          id: 'fountain',
          area: { x: 270, y: 350, w: 180, h: 145 },
          onTap(api) {
            if (!api.has('currentOff')) api.openOverlay('fountainCount')
            else {
              api.say('Water!')
              api.learnWord('water')
              api.sfx.blub()
              api.pulse('fountain')
            }
          },
        },
        {
          id: 'car',
          area: { x: 345, y: 540, w: 180, h: 110 },
          onTap(api) {
            api.say('Car!')
            api.learnWord('car')
            api.sfx.thud()
            api.pulse('car')
          },
        },
        {
          id: 'houses',
          area: { x: 60, y: 430, w: 240, h: 135 },
          onTap(api) {
            api.say('House!')
            api.learnWord('house')
            api.sfx.tap()
            api.pulse('houses')
          },
        },
        {
          id: 'shells',
          area: { x: 60, y: 595, w: 620, h: 90 },
          onTap(api) {
            api.sfx.star()
            api.pulse('shells')
          },
        },
      ],
    },
    {
      id: 'palace',
      name: 'ארמון הפנינה',
      Art: PalaceScene,
      hotspots: [
        {
          id: 'clam',
          area: { x: 225, y: 500, w: 190, h: 145 },
          onTap(api) {
            if (api.has('clamOpen') && !api.has('gotPearl')) {
              api.set('gotPearl')
              api.addItem('pearl')
            } else {
              api.sfx.locked()
              if (!api.has('clamOpen')) api.sayHe('הצדפה סגורה חזק! צריך משהו לפתוח איתו...')
              api.pulse('clam')
            }
          },
          onItem(item, api) {
            if (item === 'trident' && !api.has('clamOpen')) {
              api.set('clamOpen')
              api.removeItem('trident')
              api.sfx.unlock()
              api.sayHe('הקלשון פותח את הצדפה... פנינה ענקית!')
              api.pulse('clam')
              return true
            }
            return false
          },
        },
        {
          id: 'organ',
          area: { x: 470, y: 330, w: 200, h: 260 },
          onTap(api) {
            if (api.has('organDone') && !api.has('gotHeart')) {
              api.set('gotHeart')
              api.addItem('heart')
            } else if (!api.has('organDone')) {
              api.openOverlay('coralOrgan')
            } else {
              api.sfx.good()
              api.pulse('organ')
            }
          },
        },
        {
          id: 'stars',
          area: { x: 90, y: 535, w: 460, h: 105 },
          onTap(api) {
            api.say('Star!')
            api.learnWord('star')
            api.pulse('stars')
          },
        },
      ],
    },
    {
      id: 'cave',
      name: 'מערת הרשת',
      Art: NetCaveScene,
      hotspots: [
        {
          id: 'net',
          area: { x: 295, y: 170, w: 290, h: 400 },
          onTap(api) {
            if (!api.has('currentOff')) {
              api.sfx.locked()
              api.parrot('The water is too strong!', 'הזרם חזק מדי! משהו בעיר שולט בזרמים...')
              api.pulse('current')
            } else if (!api.has('knotDone')) {
              api.openOverlay('wordKnot')
            } else if (!api.has('ninjaFreed')) {
              api.sayHe('הקשר נפרם! עכשיו המנעול - צריך פנינה ולב')
              api.pulse('net')
            } else if (!api.has('doorOpen')) {
              // לחיצה על נינג'ה המשוחרר = בורחים! (סיום סלחני)
              api.set('doorOpen')
              api.sfx.unlock()
              api.later(() => api.sfx.win(), 400)
            }
          },
          onItem(item, api) {
            if (!api.has('knotDone')) {
              if (item === 'pearl' || item === 'heart') {
                api.parrot('First the word knot!', 'קודם קשר המילים הזוהר למטה!')
                return true
              }
              return false
            }
            if (item === 'pearl' && !api.has('pearlSet')) {
              api.set('pearlSet')
              api.removeItem('pearl')
              api.sfx.good()
              api.pulse('net')
              if (api.has('heartSet')) api.later(() => { api.set('ninjaFreed'); api.sfx.win() }, 600)
              return true
            }
            if (item === 'heart' && !api.has('heartSet')) {
              api.set('heartSet')
              api.removeItem('heart')
              api.sfx.good()
              api.pulse('net')
              if (api.has('pearlSet')) api.later(() => { api.set('ninjaFreed'); api.sfx.win() }, 600)
              return true
            }
            return false
          },
        },
        {
          id: 'whirlpool',
          area: { x: 65, y: 430, w: 165, h: 240 },
          onTap(api) {
            if (api.has('ninjaFreed') && !api.has('doorOpen')) {
              api.set('doorOpen')
              api.sfx.unlock()
              api.later(() => api.sfx.win(), 400)
            } else {
              api.sfx.blub()
              if (!api.has('ninjaFreed')) api.sayHe('מערבולת היציאה... אבל לא עוזבים בלי נינג\'ה!')
              api.pulse('whirlpool')
            }
          },
        },
        {
          id: 'crab',
          area: { x: 575, y: 575, w: 110, h: 80 },
          onTap(api) {
            api.sfx.squeak()
            api.sayHe('הסרטן עושה תנועות מספריים - קליק קליק!')
            api.pulse('crab')
          },
        },
      ],
    },
  ],

  overlays: {
    fountainCount: (api) => ({
      type: 'code',
      title: '⛲ מזרקת הזרמים',
      text: 'המזרקה שולטת בזרמי העיר! על הלוח חרוטים דג ליצן, צדף וכוכב ים. כמה יש מכל אחד?',
      icons: ['🐠', '🐚', '⭐'],
      answer: [api.setup.clownfish, api.setup.shells, api.setup.starfish],
      onSolved(a) {
        a.set('currentOff')
        a.later(() => a.closeOverlay(), 400)
        a.later(() => a.sayHe('המזרקה מתעוררת - הזרם במערה נעצר!'), 900)
      },
    }),
    coralOrgan: {
      type: 'simon',
      title: '🎹 עוגב האלמוגים',
      pads: [
        { emoji: '🐟', tone: 262, color: 'from-orange-400 to-amber-600', word: 'Fish' },
        { emoji: '🦆', tone: 330, color: 'from-yellow-300 to-amber-500', word: 'Duck' },
        { emoji: '🐸', tone: 392, color: 'from-emerald-400 to-green-600', word: 'Frog' },
        { emoji: '⭐', tone: 494, color: 'from-sky-400 to-indigo-600', word: 'Star' },
      ],
      rounds: [3, 4],
      onSolved(api) {
        ;['fish', 'duck', 'frog', 'star'].forEach((w) => api.learnWord(w))
        api.set('organDone')
        api.closeOverlay()
        api.later(() => api.sayHe('העוגב מנגן... ואבן לב אדומה צפה מתוכו!'), 600)
      },
    },
    wordKnot: (api) => ({
      type: 'listen',
      title: '🪢 קשר המילים',
      text: 'הרשת קשורה בקשר מכושף! התמנון אומר מילה - לחצו על הציור הנכון והקשר ייפרם!',
      prompt: 'הקשיבו... מה התמנון אמר?',
      options: [
        { id: 'water', en: 'Water', he: 'מים', emoji: '💧' },
        { id: 'swim', en: 'Swim', he: 'לשחות', emoji: '🏊' },
        { id: 'house', en: 'House', he: 'בית', emoji: '🏠' },
        { id: 'car', en: 'Car', he: 'מכונית', emoji: '🚗' },
        { id: 'flower', en: 'Flower', he: 'פרח', emoji: '🌸' },
        { id: 'heart', en: 'Heart', he: 'לב', emoji: '❤️' },
      ],
      rounds: api.setup.knot.map((c) => ({ id: c, en: c[0].toUpperCase() + c.slice(1) })),
      onSolved(a) {
        a.set('knotDone')
        a.closeOverlay()
      },
    }),
  },

  guide(f) {
    if (!f.gotTrident) return { en: 'Pull the TRIDENT! Pull, pull!', he: 'משכו את הקלשון מהסלע בשונית!' }
    if (!f.gotPearl) return { en: 'Open the big shell! Take the PEARL!', he: 'פתחו את הצדפה הענקית בארמון עם הקלשון!' }
    if (!f.gotHeart) return { en: 'Play the coral organ! Find the HEART!', he: 'נגנו בעוגב האלמוגים בארמון!' }
    if (!f.currentOff) return { en: 'Count the FISH, the shells and the STARS!', he: 'ספרו בעיר והפעילו את המזרקה ברחוב!' }
    if (!f.knotDone) return { en: 'Untie the knot! Listen to the WORDS!', he: 'קשר המילים על הרשת - הקשיבו לתמנון!' }
    if (!f.ninjaFreed) return { en: 'Put the PEARL and the HEART in the lock!', he: 'שימו את הפנינה והלב במנעול הרשת!' }
    if (!f.doorOpen) return { en: 'NINJA is free! Jump in the whirlpool!', he: 'לחצו על נינג\'ה או על המערבולת - בורחים!' }
    return { en: 'YES! Goodbye, fish city!', he: 'ברחתם! להתראות עיר הדגים!' }
  },

  hints(f) {
    if (!f.gotTrident) return ['הקלשון הזהוב תקוע בסלע בשונית - לחצו עליו שוב ושוב! 🔱']
    if (!f.gotPearl) return [
      'הצדפה הוורודה הענקית בארמון הפנינה',
      'בחרו את הקלשון ולחצו על הצדפה - ואז קחו את הפנינה!',
    ]
    if (!f.gotHeart) return [
      'העוגב הסגול בארמון - לחצו עליו וחזרו על השיר',
      'כשהעוגב מנגן - אבן לב אדומה תצוף! קחו אותה',
    ]
    if (!f.currentOff) return [
      'המזרקה ברחוב העיר - לחצו עליה',
      'ספרו: דגי ליצן בשונית, צדפים ברחוב, כוכבי ים בארמון',
    ]
    if (!f.knotDone) return [
      'עכשיו הזרם נעצר - היכנסו למערת הרשת ולחצו על הקשר 🪢',
      'מילים חדשות: WATER=מים, SWIM=לשחות, HOUSE=בית, CAR=מכונית',
    ]
    if (!f.ninjaFreed) return ['נשאר המנעול: שימו את הפנינה 🫧 ואת הלב ❤️ על הרשת - אחד אחד!']
    if (!f.doorOpen) return ['נינג\'ה חופשי! לחצו עליו או על המערבולת הזוהרת - ובורחים! 🌀']
    return []
  },

  focus(f) {
    if (!f.gotTrident) return { scene: 'reef', hotspot: 'tridentRock' }
    if (!f.gotPearl) return { scene: 'palace', hotspot: 'clam' }
    if (!f.gotHeart) return { scene: 'palace', hotspot: 'organ' }
    if (!f.currentOff) return { scene: 'street', hotspot: 'fountain' }
    if (!f.knotDone || !f.ninjaFreed) return { scene: 'cave', hotspot: 'net' }
    return { scene: 'cave', hotspot: 'whirlpool' }
  },

  isWon: (f) => !!f.doorOpen,
}
