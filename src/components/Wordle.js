import { useEffect } from 'react'
import Grid from './Grid'
import Keypad from '../components/Keypad'

import useWordle from '../hooks/useWordle'

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyUp, guesses, turn, usedKeys } =
    useWordle(solution)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  })

  return (
    <div>
      {solution}
      <p>Current guess: {currentGuess}</p>
      <Grid currentGuess={currentGuess} turn={turn} guesses={guesses} />
      <Keypad usedKeys={usedKeys} />
    </div>
  )
}
