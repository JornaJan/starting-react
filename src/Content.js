import { useState } from 'react'

const Content = () => {
  const _name = 'Jorna'

  const [name, setName] = useState('Jorna') // 默认值
  const [count, setCount] = useState(0)

  const handleNameChange = () => {
    const names = ['Jorna', 'Wing', 'Hong10', 'Taisuke']
    const init = Math.floor(Math.random() * 3)
    setName(names[init])
  }

  const handleClick = () => {
    setCount(count + 1)
    setCount(count + 1)
    console.log(count)
  }

  const handleClick2 = () => {
    console.log(count)
  }


  return (
    <main>
      <h1 onDoubleClick={handleClick}>
        Hello {name}
      </h1>
      <p>{_name}</p>
      <button onClick={handleNameChange}>Change name</button>
      <button onClick={handleClick}>Click It</button>
      <button onClick={(e) => handleClick2(e)}>Click It</button>
    </main>
  )
}

export default Content
