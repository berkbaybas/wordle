import { useEffect, useState } from 'react'
import Wordle from './components/Wordle'

const API_URL = 'http://localhost:3001/solutions'

function App() {
  const [solution, setSolution] = useState(null)

  useEffect(() => {
    const getWords = async () => {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          const randomSolution = data[Math.floor(Math.random() * data.length)]
          console.log(randomSolution)
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
