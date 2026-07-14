import { useState } from 'react'
import { GameProvider } from './store.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import WordAlbum from './components/WordAlbum.jsx'
import RoomPlayer from './components/RoomPlayer.jsx'
import SceneEngine from './engine/SceneEngine.jsx'

function Quest() {
  const [room, setRoom] = useState(null)
  const [album, setAlbum] = useState(false)
  const [playKey, setPlayKey] = useState(0)

  if (album) return <WordAlbum onBack={() => setAlbum(false)} />
  if (!room) return <HomeScreen onPlay={(r) => { setPlayKey((k) => k + 1); setRoom(r) }} onAlbum={() => setAlbum(true)} />
  // חדר type:'scene' רץ במנוע ה-point-and-click; חדרים ישנים במנוע החידות
  const Engine = room.type === 'scene' ? SceneEngine : RoomPlayer
  return <Engine key={playKey} room={room} onExit={() => setRoom(null)} />
}

export default function App() {
  return (
    <GameProvider>
      <Quest />
    </GameProvider>
  )
}
