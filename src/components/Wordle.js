import { useEffect } from 'react'
import Grid from './Grid'

import useWordle from '../hooks/useWordle'

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyUp, guesses, isCorrect, turn } =
    useWordle(solution)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  })

  useEffect(() => {
    console.log('guesses: ', guesses)
    console.log('turn: ', turn)
    console.log('isCorrect: ', isCorrect)
  }, [guesses, turn, isCorrect])

  return (
    <div>
      {solution}
      <p>Current guess: {currentGuess}</p>
      <Grid currentGuess={currentGuess} turn={turn} guesses={guesses} />
    </div>
  )
}
