import { useState } from 'react'
import { GameProvider } from './store.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import RoomPlayer from './components/RoomPlayer.jsx'

function Quest() {
  const [room, setRoom] = useState(null)
  const [playKey, setPlayKey] = useState(0)

  if (!room) return <HomeScreen onPlay={(r) => { setPlayKey((k) => k + 1); setRoom(r) }} />
  return <RoomPlayer key={playKey} room={room} onExit={() => setRoom(null)} />
}

export default function App() {
  return (
    <GameProvider>
      <Quest />
    </GameProvider>
  )
}
