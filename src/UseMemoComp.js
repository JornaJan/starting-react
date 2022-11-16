import { useState, useEffect, useCallback, useMemo } from 'react'

/**
const fib = (n) => {
  return (n <= 1) ? n : fib(n - 1) + fib(n - 2)
}
**/


const getArray = () => {
  for (let i = 0; i < 100000000; i++) {
    //
  }
  return ['Jorna', 'Jan']
}
const UseMemoComp = () => {
  const [userNumber, setUserNumber] = useState('')
  const [randomInput, setRandomInput] = useState('')

  const fib = useCallback((n) => {
    return (n <= 1) ? n : fib(n - 1) + fib(n - 2)
  }, [])

  const fibNumber = useMemo(() => fib(userNumber), [userNumber, fib])

  const myArray = useMemo(() => getArray(), [])

  useEffect(() => {
    console.log('New Array')
  }, [myArray])

  return (
    <main>
      <h3>useMemo</h3>
      <label>Fibonacci Sequence:</label>
      <input type="number" value={userNumber} placeholder="Position" onChange={(e) => setUserNumber(e.target.value)}/>
      <p>Number: {fibNumber || "--"}</p>
      <label>Random Input:</label>
      <input type="text" value={randomInput} placeholder="Random Input" onChange={(e) => setRandomInput(e.target.value)} />
      <p>{randomInput}</p>
    </main>
  ) 
}

export default UseMemoComp
