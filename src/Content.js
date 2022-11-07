const Content = () => {
  const name = 'Jorna'

  const handleNameChange = () => {
    const names = ['Jorna', 'Wing', 'Hong10', 'Taisuke']
    const init = Math.floor(Math.random() * 3)
    return names[init]
  }
  return (
    <main>
      <h1>
        Hello {handleNameChange()}
      </h1>
      <p>{name}</p>
    </main>
  )
}

export default Content
