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

#### try {} catch(e){} finally {} && loading

```jsx
// App.js
const [fetchError, setFetchError] = useState(null)
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw Error('Did not receive expected data')
      const listItems = await response.json()
      setItems(listItems)
      setFetchError(null)
    } catch(err) {
      setFetchError(err.message)
    } finally{
      setIsLoading(false)
    }
  } 

  setTimeout(() => {
    (async () => await fetchItems())()
  }, 2000)
}, [])

return (
 <main>
   {isLoading && <p>Loading Items...</p>}
   {fetchError && <p style={{color: 'red', fontSize: '14px', fontWeight: 'bold'}}>{`Error: ${fetchError}`}</p>}
   {!fetchError && !isLoading && <Content 
          items={items.filter(item => (
            (item.item).toLowerCase()).includes(search.toLowerCase())
          )}  
          handleCheck={handleCheck} 
          handleDelete={handleDelete} 
          />
    }
 </main>
)
```
