import React, { useState } from 'react'
import Square from './Square'
import Input from './Input'

function App() {
  const [colorValue, setColorValue] = useState('')
  const [hexValue, setHexValue] = useState('')
  const [isDarkText, setIsDarkText] = useState(true)

  return (
    <div className="App">
      <h1 style={{backgroundColor: 'mediumblue', color: '#fff'}}>01TUT</h1>
      <Square colorValue={colorValue} hexValue={hexValue} isDarkText={isDarkText} />
      <Input  colorValue={colorValue} setColorValue={setColorValue} setHexValue={setHexValue} isDarkText={isDarkText} setIsDarkText={setIsDarkText}/>
    </div>
  );
}

export default App;
