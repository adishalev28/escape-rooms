# CLAUDE.md - חדר הבריחה 🔐

## מה זה
משחק חדרי בריחה לאריאל (בן 7). מנוע data-driven: חדר = קובץ נתונים בלבד, המנוע מריץ הכל.

## Tech Stack
React 19 + Vite 7 + Tailwind 4 (זהה לזירת האנגלית `english-quest`). אין TypeScript, אין ספריות נוספות. אימוג'י בלבד, צלילים מסונתזים (`audio.js`), קריין דפדפן (`speech.js` - אנגלית + עברית).

## מבנה
```
src/
  App.jsx                 ← home ↔ RoomPlayer
  store.jsx               ← localStorage: treasures, best (שיאי זמן), completed
  data/rooms.js           ← רישום החדרים (comingSoon לחדרים עתידיים)
  data/pirateShip.js      ← חדר 1 - הפורמט לכל חדר חדש
  components/RoomPlayer.jsx  ← המנוע: intro → puzzles+bridges → outro
  components/HintBox.jsx     ← רמזים הדרגתיים (עד 3)
  puzzles/                ← 5 סוגי חידות: find, code, sequence, word, riddle
```

## להוסיף חדר חדש
1. קובץ חדש ב-`data/` לפי הפורמט של `pirateShip.js` (intro, puzzles, treasure, outro)
2. import + הוספה ל-`ROOMS` ב-`data/rooms.js` (להחליף את ה-comingSoon)
3. זהו. אין קוד.

## עקרונות עיצוב (גיל 7)
- בלי טיימר מעניש - סטופר רק לשבירת שיאים
- טעות אף פעם לא מענישה (רק shake וניסיון חוזר)
- רמזים הדרגתיים בכל חידה - הרמז האחרון הוא הפתרון
- חידות ויזואליות/קוליות לפני טקסט; מילים באנגלית רק מאוצר המילים של זירת האנגלית
- הכל אימוג'י מקורי - אסור דמויות עם זכויות יוצרים

## הפעלה
```bash
npm install && npm run dev   # פורט 5178 בפריוויו (escape-rooms-dev)
```
