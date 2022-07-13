import { useEffect, useState } from 'react'

import Wordle from './components/Wordle'

import { API_URL } from './Utils/Constant'

function App() {
  const [solution, setSolution] = useState(null)

  useEffect(() => {
    const getWords = async () => {
      fetch(`${API_URL}/solutions`)
        .then((res) => res.json())
        .then((data) => {
          const randomSolution = data[Math.floor(Math.random() * data.length)]
          setSolution(randomSolution.word)
        })
    }
    getWords()
  }, [])
  return (
    <div className="App">
      <h1>wordle</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  )
}

export default App
