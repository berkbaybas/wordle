import { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'

import { API_URL } from '../Utils/Constant'

const Keypad = ({ usedKeys }) => {
  const [letters, setLetters] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/letters`)
      .then((res) => res.json())
      .then((data) => {
        setLetters(data)
      })
  }, [])

  return (
    <div className="Keypad">
      {letters &&
        letters.map((letter) => (
          <div className={usedKeys[letter.key]}>{letter.key}</div>
        ))}
    </div>
  )
}

export default Keypad
