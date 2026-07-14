// 10 לוחמים מקוריים לאוסף - שמות באנגלית (גם זה לימוד!)
// style קובע את המראה ב-Brawler.jsx, attack = ההתקפה הייחודית בקרב (spin = הפרוג'קטיל מסתובב)
export const BRAWLERS = [
  { id: 'rocky', name: 'Rocky', he: 'רוקי', color: '#f97316', skin: '#ffd9b3', style: 'mohawk', hair: '#e11d48', attack: { emoji: '🪨', name: 'Rock Punch', he: 'אגרוף סלע' } },
  { id: 'blaze', name: 'Blaze', he: 'בלייז', color: '#ef4444', skin: '#ffcf9e', style: 'fire', hair: '#f59e0b', attack: { emoji: '🔥', name: 'Fireball', he: 'כדור אש' } },
  { id: 'ninja', name: 'Ninja', he: 'נינג\'ה', color: '#334155', skin: '#ffd9b3', style: 'ninja', hair: '#0f172a', attack: { emoji: '✴️', name: 'Ninja Star', he: 'כוכב נינג\'ה', spin: true } },
  { id: 'robo', name: 'Robo', he: 'רובו', color: '#06b6d4', skin: '#cbd5e1', style: 'robot', hair: '#64748b', attack: { emoji: '💠', name: 'Laser', he: 'לייזר' } },
  { id: 'captain', name: 'Captain', he: 'קפטן', color: '#0ea5e9', skin: '#ffcf9e', style: 'pirate', hair: '#7c2d12', attack: { emoji: '💣', name: 'Cannonball', he: 'פצצת תותח' } },
  { id: 'luna', name: 'Luna', he: 'לונה', color: '#8b5cf6', skin: '#ffd9b3', style: 'luna', hair: '#c4b5fd', attack: { emoji: '🌙', name: 'Moonbeam', he: 'קרן ירח' } },
  { id: 'bolt', name: 'Bolt', he: 'בולט', color: '#eab308', skin: '#ffd9b3', style: 'goggles', hair: '#a16207', attack: { emoji: '⚡', name: 'Thunder', he: 'מכת ברק' } },
  { id: 'spike', name: 'Spike', he: 'ספייק', color: '#22c55e', skin: '#d9f99d', style: 'horns', hair: '#15803d', attack: { emoji: '🌵', name: 'Spikes', he: 'קוצים' , spin: true } },
  { id: 'king', name: 'King', he: 'קינג', color: '#f43f5e', skin: '#ffcf9e', style: 'crown', hair: '#451a03', attack: { emoji: '👑', name: 'Crown Throw', he: 'כתר מעופף', spin: true } },
  { id: 'shadow', name: 'Shadow', he: 'שאדו', color: '#1e1b4b', skin: '#a5b4fc', style: 'hood', hair: '#312e81', attack: { emoji: '🌑', name: 'Shadow Ball', he: 'כדור צללים' } },
]

// ספי גביעים: הראשון חינם, השאר נפתחים בהתקדמות
export const BRAWLER_THRESHOLDS = [0, 15, 35, 60, 90, 125, 165, 210, 260, 315]

export function unlockedBrawlers(trophies) {
  return BRAWLERS.filter((_, i) => trophies >= BRAWLER_THRESHOLDS[i])
}

export function nextBrawlerAt(trophies) {
  for (let i = 0; i < BRAWLERS.length; i++) {
    if (trophies < BRAWLER_THRESHOLDS[i]) return { brawler: BRAWLERS[i], at: BRAWLER_THRESHOLDS[i] }
  }
  return null
}
