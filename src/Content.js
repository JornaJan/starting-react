const Content = () => {
  const name = 'Jorna'

  const handleNameChange = () => {
    const names = ['Jorna', 'Wing', 'Hong10', 'Taisuke']
    const init = Math.floor(Math.random() * 3)
    return names[init]
  }

  const handleClick = () => {
    console.log('You clicked it!')
  }

  const handleClick2 = () => {
    console.log(`${name} You clicked it!`)
  }

  const handleClick3 = (e) => {
    console.log(e.target.innerText)
  }

  return (
    <main>
      <h1 onDoubleClick={handleClick}>
        Hello {handleNameChange()}
      </h1>
      <p>{name}</p>
      <button onClick={handleClick}>Click It</button>
      <button onClick={() => handleClick2('Jorna')}>Click It</button>
      <button onClick={(e) => handleClick3(e)}>Click It</button>
    </main>
  )
}

export default Content
