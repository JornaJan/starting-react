### Reactjs study notes

Dave Gray channel [Youtube]

```jsx
import {useRef} from 'react'

// AddItem.js

const AddItem = ({newItem, setNewItem, handleSubmit}) => {
  const inputRef = useRef()
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input value={newItem} ref={inputRef} onChange={(e) => setNewItem(e.target.value)} type="text" autoFocus id="addItem" placeholder="Add Item" required />

      {/** 点击添加后 光标自动聚焦文本框*/}
      <button type="submit" aria-label="Add Item" onClick={() => inputRef.current.focus()}><FaPlus /></button>
    </form>
  )
}
```

#### json-server
启动json-server

- npx json-server -p 3500 -w data/db.json
