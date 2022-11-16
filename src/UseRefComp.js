import { useState, useRef } from 'react'

const UseRefComp = () => {
  const [randomInput, setRandomInput] = useState('')
  const [seconds, setSeconds] = useState(0)

  const renders = useRef(0)
  const inputRef = useRef()
  const timerId = useRef()

  const handleChange = (e) => {
    setRandomInput(e.target.value)
    renders.current++
  }

  const startTimer = () => {
    timerId.current = setInterval(() => {
      renders.current++
      setSeconds(prev => prev + 1)
    }, 1000)
    inputRef.current.focus()
  }

  const stopTimer = () => {
    clearInterval(timerId.current)
    timerId.current = 0
    inputRef.current.focus()
  }

  const resetTimer = () => {
    stopTimer()
    if (seconds) {
      renders.current++
      setSeconds(0)
    }
    inputRef.current.focus()
  }
  return (
    <>
      <h3>useRef</h3>
      <input 
        type="text" 
        ref={inputRef}
        value={randomInput}
        placeholder="Random Input"
        onChange={handleChange}
        />
        <p>Renders: {renders.current}</p>
      <br/><br/>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
      <br/><br/>
      <p>seconds: {seconds}</p>
      <br/><br/>
      <p>{randomInput}</p>
    </>
  )
}

export default UseRefComp


