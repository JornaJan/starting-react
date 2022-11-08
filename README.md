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

### apiRequest
```jsx
// apiRequest.js
const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
  try {
    const response = await fetch(url, optionsObj)
    if (!response.ok)  throw Error('Please reload the app')
  } catch (err) {
    errMsg = err.message
  } finally {
    return errMsg
  }
}

export default apiRequest


// App.js
import apiRequest from './apiRequest'

const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = { id, checked: false, item }
    const listItems = [...items, myNewItem]

    console.log(listItems)
    console.log(JSON.stringify(myNewItem))
    setItems(listItems)

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, postOptions)
    if (result) setFetchError(result)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return

    addItem(newItem)
    setNewItem('')
  }

  const handleCheck = async (id) => {
    //console.log(id)
    const listItems = items.map(
      (item) => item.id === id ? 
        {...item, checked: !item.checked} :
        item
      )
    setItems(listItems)

    const myItem = listItems.filter((item) => item.id === id)
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }

    const regUrl = `${API_URL}/${id}`
    const result = await apiRequest(regUrl, updateOptions)
    if (result) setFetchError(result)
    
  }

  const handleDelete = async (id) => {
    console.log(id)
    const listItems = items.filter(item => item.id !== id)
    setItems(listItems)

    const deleteOptions = {
      method: 'DELETE'
    }
    const regUrl = `${API_URL}/${id}`
    const result = await apiRequest(regUrl, deleteOptions)
    if (result) setFetchError(result)
  }
```
