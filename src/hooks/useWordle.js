import { useEffect, useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)]) // each guess is array
  const [history, setHistory] = useState([]) // each guess is string
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState({}) // {a:"green", b:"gray"}

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = (guess) => {
    //TODO check if already green then not control again
    const _formattedGuess = []
    for (let i = 0; i < guess.length; i++) {
      let _letterInGuess = guess[i]
      console.log(_letterInGuess)
      if (solution.includes(_letterInGuess)) {
        if (solution[i] === _letterInGuess) {
          _formattedGuess.push({ key: _letterInGuess, color: 'green' })
        } else {
          _formattedGuess.push({ key: _letterInGuess, color: 'yellow' })
        }
      } else {
        _formattedGuess.push({ key: _letterInGuess, color: 'gray' })
      }
    }

    addNewGuess(_formattedGuess)
    return _formattedGuess
  }

  useEffect(() => {
    console.log('usedKeys: ' + usedKeys)
  }, [usedKeys])

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
    setTurn((prevTurn) => prevTurn + 1)
    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys }

      formattedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.key]

        if (letter.color === 'green') {
          newKeys[letter.key] = 'green'
          return
        }
        if (letter.color === 'yellow' && currentColor !== 'green') {
          newKeys[letter.key] = 'yellow'
          return
        }
        if (
          letter.color === 'gray' &&
          currentColor !== 'green' &&
          currentColor !== 'yellow'
        ) {
          newKeys[letter.key] = 'gray'
          return
        }
      })

      return newKeys
    })
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

  return { turn, currentGuess, guesses, isCorrect, handleKeyUp, usedKeys }
}

export default useWordle
