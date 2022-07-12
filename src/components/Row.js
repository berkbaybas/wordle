import React from 'react'

export default function Row({ guess, currentGuess }) {
  if (guess) {
    return (
      <div className="row">
        {guess.map((letter, index) => {
          return (
            <div key={index} className={`${letter.color} past`}>
              {letter.key}
            </div>
          )
        })}
      </div>
    )
  }

  if (currentGuess) {
    let currentGuessArr = [...Array(5)]
    let filledCurrentGuessArr = currentGuessArr.map((el, index) => {
      return currentGuess[index]
    })

    console.log(filledCurrentGuessArr)
    return (
      <div className="row">
        {filledCurrentGuessArr.map((letter, index) => {
          return (
            <div className={letter !== undefined ? 'filled' : ''} key={index}>
              {letter}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="row">
      {!guess && !currentGuess && (
        <>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </>
      )}
    </div>
  )
}
