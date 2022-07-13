import React, { useEffect } from 'react'
import Row from './Row'

export default function Grid({ currentGuess, turn, guesses }) {
  useEffect(() => {}, [guesses])
  return (
    <div>
      {guesses.map((guess, index) => {
        if (turn === index) {
          return <Row key={index} currentGuess={currentGuess}></Row>
        } else {
          return <Row key={index} guess={guess}></Row>
        }
      })}
    </div>
  )
}
