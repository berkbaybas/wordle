import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3001/solutions'

function App() {
  const [solutions, setSolutions] = useState(null)

  useEffect(() => {
    const getWords = async () => {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          const randomSolution = data[Math.floor(Math.random() * data.length)]
          console.log(randomSolution)
          setSolutions(randomSolution)
        })
    }
    getWords()
  }, [])
  return (
    <div className="App">
      <h1>wordle</h1>
      {solutions && <h3>Günün Kelimesi: {solutions.word}</h3>}
    </div>
  )
}

export default App
