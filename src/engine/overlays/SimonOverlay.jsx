import SequencePuzzle from '../../puzzles/SequencePuzzle.jsx'

// השיר של התוכי - עטיפה לחידת הסימון הקיימת בתוך חלון
export default function SimonOverlay({ config, api }) {
  return (
    <SequencePuzzle
      puzzle={{ pads: config.pads, rounds: config.rounds }}
      onSolved={() => config.onSolved(api)}
    />
  )
}
