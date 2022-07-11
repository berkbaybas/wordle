import { useEffect, useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)]) // each guess is array
  const [history, setHistory] = useState([]) // each guess is string
  const [isCorrect, setIsCorrect] = useState(false)

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = (guess) => {
    //TODO check if already green then not control again
    const _formattedGuess = []
    for (let i = 0; i < guess.length; i++) {
      if (solution.includes(guess[i])) {
        if (solution[i] === guess[i]) {
          _formattedGuess.push({ key: guess[i], color: 'green' })
        } else {
          _formattedGuess.push({ key: guess[i], color: 'yellow' })
        }
      } else {
        _formattedGuess.push({ key: guess[i], color: 'gray' })
      }
    }

    addNewGuess(_formattedGuess)
    return _formattedGuess
  }

  //   useEffect(() => {
  //     console.log('guesses: ' + guesses)
  //   }, [guesses])

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true)
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })
    setHistory((prevHistory) => [...prevHistory, currentGuess])
    setTurn((prev) => prev + 1)
    setCurrentGuess('')
  }

  const handleKeyUp = ({ key }) => {
    if (key === 'Enter') {
      // only add guess if turn is less 5
      if (turn >= 5) {
        console.log('Tüm tahmin haklarini kullandin')
        return
      }

      // do not allow duplicate word
      if (history.includes(currentGuess)) {
        console.log('Daha önce bu tahmini yaptin')
        return
      }

      // check word is 5 chars long
      if (currentGuess.length !== 5) {
        console.log('Cevap 5 harf içermeli')
        return
      }

      const formattedGuess = formatGuess(currentGuess)
      //   console.log(formattedGuess)
    }

    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1))
      return
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key)
      }
    }
  }

  return { turn, currentGuess, guesses, isCorrect, handleKeyUp }
}

export default useWordle
