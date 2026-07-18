// אלבום המילים של המסע - כל מילה שאריאל שומע ופועל לפיה נאספת כאן
// המילים מאוצר זירת האנגלית + מילות מפתח של החדרים
export const WORD_PACKS = [
  { id: 'pirate', name: 'אוצרות הים', emoji: '🏴‍☠️' },
  { id: 'space', name: 'מספרים וצבעים', emoji: '🚀' },
  { id: 'wizard', name: 'חיות ומטעמים', emoji: '🧙' },
  { id: 'dragon', name: 'יצורי המערה', emoji: '🐉' },
  { id: 'ghost', name: 'מספרים גדולים וספרים', emoji: '🏰' },
  { id: 'candy', name: 'צבעים ומתוקים', emoji: '🍭' },
  { id: 'jungle', name: 'חיות הג\'ונגל', emoji: '🐒' },
]

export const WORDS = [
  // ספינת הפיראטים
  { id: 'key', en: 'Key', he: 'מפתח', emoji: '🗝️', pack: 'pirate' },
  { id: 'box', en: 'Box', he: 'קופסה', emoji: '📦', pack: 'pirate' },
  { id: 'banana', en: 'Banana', he: 'בננה', emoji: '🍌', pack: 'pirate' },
  { id: 'apple', en: 'Apple', he: 'תפוח', emoji: '🍎', pack: 'pirate' },
  { id: 'fish', en: 'Fish', he: 'דג', emoji: '🐟', pack: 'pirate' },
  { id: 'star', en: 'Star', he: 'כוכב', emoji: '⭐', pack: 'pirate' },
  { id: 'gold', en: 'Gold', he: 'זהב', emoji: '✨', pack: 'pirate' },
  { id: 'bird', en: 'Bird', he: 'ציפור', emoji: '🐦', pack: 'pirate' },
  { id: 'dog', en: 'Dog', he: 'כלב', emoji: '🐶', pack: 'pirate' },
  // תחנת החלל
  { id: 'one', en: 'One', he: 'אחת', emoji: '1️⃣', pack: 'space' },
  { id: 'two', en: 'Two', he: 'שתיים', emoji: '2️⃣', pack: 'space' },
  { id: 'three', en: 'Three', he: 'שלוש', emoji: '3️⃣', pack: 'space' },
  { id: 'four', en: 'Four', he: 'ארבע', emoji: '4️⃣', pack: 'space' },
  { id: 'five', en: 'Five', he: 'חמש', emoji: '5️⃣', pack: 'space' },
  { id: 'red', en: 'Red', he: 'אדום', emoji: '🔴', pack: 'space' },
  { id: 'blue', en: 'Blue', he: 'כחול', emoji: '🔵', pack: 'space' },
  { id: 'green', en: 'Green', he: 'ירוק', emoji: '🟢', pack: 'space' },
  { id: 'yellow', en: 'Yellow', he: 'צהוב', emoji: '🟡', pack: 'space' },
  { id: 'card', en: 'Card', he: 'כרטיס', emoji: '💳', pack: 'space' },
  { id: 'battery', en: 'Battery', he: 'סוללה', emoji: '🔋', pack: 'space' },
  // מגדל הקוסם
  { id: 'rabbit', en: 'Rabbit', he: 'ארנב', emoji: '🐰', pack: 'wizard' },
  { id: 'cat', en: 'Cat', he: 'חתול', emoji: '🐱', pack: 'wizard' },
  { id: 'duck', en: 'Duck', he: 'ברווז', emoji: '🦆', pack: 'wizard' },
  { id: 'horse', en: 'Horse', he: 'סוס', emoji: '🐴', pack: 'wizard' },
  { id: 'milk', en: 'Milk', he: 'חלב', emoji: '🥛', pack: 'wizard' },
  { id: 'egg', en: 'Egg', he: 'ביצה', emoji: '🥚', pack: 'wizard' },
  { id: 'bread', en: 'Bread', he: 'לחם', emoji: '🍞', pack: 'wizard' },
  { id: 'cheese', en: 'Cheese', he: 'גבינה', emoji: '🧀', pack: 'wizard' },
  { id: 'moon', en: 'Moon', he: 'ירח', emoji: '🌙', pack: 'wizard' },
  // מערת הדרקון
  { id: 'fire', en: 'Fire', he: 'אש', emoji: '🔥', pack: 'dragon' },
  { id: 'candle', en: 'Candle', he: 'נר', emoji: '🕯️', pack: 'dragon' },
  { id: 'bat', en: 'Bat', he: 'עטלף', emoji: '🦇', pack: 'dragon' },
  { id: 'frog', en: 'Frog', he: 'צפרדע', emoji: '🐸', pack: 'dragon' },
  { id: 'snake', en: 'Snake', he: 'נחש', emoji: '🐍', pack: 'dragon' },
  { id: 'bear', en: 'Bear', he: 'דוב', emoji: '🐻', pack: 'dragon' },
  // טירת הרוחות
  { id: 'six', en: 'Six', he: 'שש', emoji: '6️⃣', pack: 'ghost' },
  { id: 'seven', en: 'Seven', he: 'שבע', emoji: '7️⃣', pack: 'ghost' },
  { id: 'eight', en: 'Eight', he: 'שמונה', emoji: '8️⃣', pack: 'ghost' },
  { id: 'nine', en: 'Nine', he: 'תשע', emoji: '9️⃣', pack: 'ghost' },
  { id: 'book', en: 'Book', he: 'ספר', emoji: '📖', pack: 'ghost' },
  { id: 'purple', en: 'Purple', he: 'סגול', emoji: '🟣', pack: 'ghost' },
  { id: 'white', en: 'White', he: 'לבן', emoji: '⚪', pack: 'ghost' },
  { id: 'black', en: 'Black', he: 'שחור', emoji: '⚫', pack: 'ghost' },
  { id: 'brown', en: 'Brown', he: 'חום', emoji: '🟤', pack: 'ghost' },
  // ממלכת הממתקים
  { id: 'orange', en: 'Orange', he: 'כתום', emoji: '🟠', pack: 'candy' },
  { id: 'pink', en: 'Pink', he: 'ורוד', emoji: '🩷', pack: 'candy' },
  { id: 'cake', en: 'Cake', he: 'עוגה', emoji: '🎂', pack: 'candy' },
  { id: 'icecream', en: 'Ice cream', he: 'גלידה', emoji: '🍦', pack: 'candy' },
  { id: 'pizza', en: 'Pizza', he: 'פיצה', emoji: '🍕', pack: 'candy' },
  { id: 'cookie', en: 'Cookie', he: 'עוגייה', emoji: '🍪', pack: 'candy' },
  // מקדש הג'ונגל
  { id: 'monkey', en: 'Monkey', he: 'קוף', emoji: '🐵', pack: 'jungle' },
  { id: 'lion', en: 'Lion', he: 'אריה', emoji: '🦁', pack: 'jungle' },
  { id: 'elephant', en: 'Elephant', he: 'פיל', emoji: '🐘', pack: 'jungle' },
  { id: 'cow', en: 'Cow', he: 'פרה', emoji: '🐮', pack: 'jungle' },
  { id: 'tree', en: 'Tree', he: 'עץ', emoji: '🌳', pack: 'jungle' },
  { id: 'sun', en: 'Sun', he: 'שמש', emoji: '☀️', pack: 'jungle' },
]

export const wordById = (id) => WORDS.find((w) => w.id === id)
