import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import { useState, useEffect } from 'react'
import AddItem from './AddItem'
import SearchItem from './SearchItem'
import apiRequest from './apiRequest'

function App() {
  const API_URL = 'http://localhost:3500/items'

  const [items, setItems] = useState([]) // 默认值

  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
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

  return (
    <div className="App">
      <Header 
        title="Jorna Jan" 
      />
      <SearchItem 
        search={search} 
        setSearch={setSearch}
      />
      <AddItem 
        newItem={newItem} 
        setNewItem={setNewItem} 
        handleSubmit={handleSubmit} 
      />
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
      <Footer 
        length={items.length} 
      />
    </div>
  )
}

export default App
