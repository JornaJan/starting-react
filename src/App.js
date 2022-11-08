import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import { useState, useEffect } from 'react'
import AddItem from './AddItem'
import SearchItem from './SearchItem'

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

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = { id, checked: false, item }
    const listItems = [...items, myNewItem]

    console.log(listItems)
    setItems(listItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return

    addItem(newItem)
    setNewItem('')
  }

  const handleCheck = (id) => {
    //console.log(id)
    const listItems = items.map(
      (item) => item.id === id ? 
        {...item, checked: !item.checked} :
        item
      )
    setItems(listItems)
  }

  const handleDelete = (id) => {
    console.log(id)
    const listItems = items.filter(item => item.id !== id)
    setItems(listItems)
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
