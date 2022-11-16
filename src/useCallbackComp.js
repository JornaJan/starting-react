import { useState, useEffect, useCallback } from 'react'

const UseCallbackComp = () => {
  const [userInput2, setUserInput2] = useState('')
  const [result, setResult] = useState(0)



  const [num3] = useState(8)
  const [num4] = useState(2)


  const sum2 = useCallback(() => num3 + num4, [num3, num4])
  const buildArray = useCallback(() => [num3, num4], [num3, num4])

  useEffect(() => {
    console.log(`New array: ${buildArray()}`)
   setResult(buildArray())
  //  setResult(sum2())
  }, [buildArray])
  return (
    <>
      <h1>{userInput2}</h1>
      <input 
        type="text" 
        placeholder="input" 
        value={userInput2} 
        onChange={(e) => setUserInput2(e.target.value)} />
    </>
  )
}

export default UseCallbackComp
