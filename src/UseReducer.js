import { useState, useReducer } from 'react'

const NoUseReducer = () => {
  const [userInput, setUserInput] = useState('')
  const [count, setCount] = useState(0)
  const [color, setColor] = useState(false)
  return (
    <div style={{color: color ? '#FFF' : '#FFF952'}}>
      <h3>No useReducer</h3>
      <input 
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <br/><br/>
      <p>{count}</p>
      <section>
        <button onClick={(() => setCount(prev => prev - 1))}>-</button>
        <button onClick={(() => setCount(prev => prev + 1))}>+</button>
        <button onClick={(() => setColor(prev => !prev))}>Color</button>
      </section>
      <br/><br/>
      <p>{userInput}</p>
    </div>
  )
}


const reducer = (state, action) => {
  switch (action.type) {
    case 'increase':
      return { ...state, count: state.count + 1 }
    case 'decrease':
      return { ...state, count: state.count - 1 }
    case 'newUserInput':
      return { ...state, userInput: action.payload }
    case 'toggleColor':
      return { ...state, color: !state.color }
    default:
      throw new Error()
  }
}


const ACTION = {
  INCREMENT: 'increase',
  DECREMENT: 'decrease',
  NEW_USER_INPUT: 'newUserInput',
  TOGGLE_COLOR: 'toggleColor'
}

const UseReducer = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0, userInput: '', color: false })
  return (
    <div style={{color: state.color ? '#FFF' : '#FFF952'}}>
      <h3>use useReducer</h3>
      <input 
        type="text"
        value={state.userInput}
        onChange={(e) => dispatch({ type: ACTION.NEW_USER_INPUT, payload: e.target.value})}
      />
      <br/><br/>
      <p>{state.count}</p>
      <section>
        <button onClick={(() => dispatch({ type: ACTION.DECREMENT}))}>-</button>
        <button onClick={(() => dispatch({ type: ACTION.INCREMENT}))}>+</button>
        <button onClick={(() => dispatch({ type: ACTION.TOGGLE_COLOR}))}>Color</button>
      </section>
      <br/><br/>
      <p>{state.userInput}</p>
    </div>
  )
}

const UseReducerMain = () => {
  return (
    <div>
      <h3>useReducer</h3>
      <NoUseReducer />
      <UseReducer />
    </div>
  )
}

export default UseReducerMain
