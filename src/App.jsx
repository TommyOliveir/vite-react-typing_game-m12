import React, { useState, useEffect, useRef } from "react"
import './App.css'

function App() {
  const STARTING_TIME = 10
  //
  const [text, setText] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const textBoxRef = useRef(null)

  function handleChange(e) {
    const { value } = e.target
    setText(value)
  }

  function calculateWordCount(text) {
    const wordsArr = text.trim().split(" ")
    return wordsArr.filter(word => word !== "").length
  }

  function startGame() {
    setIsTimeRunning(true)
    setTimeRemaining(STARTING_TIME)
    setText("")
    textBoxRef.current.disabled = false
    textBoxRef.current.focus()
  }

  function endGame() {
    setIsTimeRunning(false)
    setWordCount(calculateWordCount(text))
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(time => time - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      endGame()
    }
  }, [timeRemaining, isTimeRunning])
  //
  return (
    <div>

      <h1>Typing game</h1>
      <h2>How fast do you type?</h2>
      <textarea
        onChange={handleChange}
        value={text}
        disabled={!isTimeRunning}
        ref={textBoxRef}
      />
      <h4 className="time-remaining">Time remaining: <span> {timeRemaining} sec</span></h4>
      <button
        onClick={startGame}
        disabled={isTimeRunning}
      >
        Start
      </button>
      <h1>Word count: <span>{wordCount}</span></h1>

    </div>
  )
}

export default App
