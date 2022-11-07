import logo from './logo.svg';
import './App.css';

function App() {
  const name = 'Jorna'

  const handleNameChange = () => {
    const names = ['Jorna', 'Wing', 'Hong10', 'Taisuke']
    const init = Math.floor(Math.random() * 3)
    return names[init]
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          <h1>
          Hello {handleNameChange()}
        </h1>
          <h3>{name}</h3>
          <p>{'哈哈'}</p>
      </header>
    </div>
  );
}

export default App;
