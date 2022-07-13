import { useEffect } from 'react'
import Grid from './Grid'
import Keypad from '../components/Keypad'

import useWordle from '../hooks/useWordle'

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyUp, guesses, turn, usedKeys, isCorrect } =
    useWordle(solution)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    if (isCorrect) {
      console.log('win')
      window.removeEventListener('keyup', handleKeyUp)
    }

    if (turn > 5) {
      console.log('out of guesses')
      window.removeEventListener('keyup', handleKeyUp)
    }

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyUp, isCorrect])

  return (
    <div>
      {solution}
      <p>Current guess: {currentGuess}</p>
      <Grid currentGuess={currentGuess} turn={turn} guesses={guesses} />
      <Keypad usedKeys={usedKeys} />
    </div>
  )
}
