import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import { useState, useEffect } from 'react'
import AddItem from './AddItem'
import SearchItem from './SearchItem'

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []) // 默认值

  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  console.log('before use effect')
  useEffect(() => {
    console.log('inner use effect')
    localStorage.setItem('shoppinglist', JSON.stringify(items))
  }, [items])
  console.log('after use effect')

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
      <Content 
        items={items.filter(item => (
          (item.item).toLowerCase()).includes(search.toLowerCase())
        )}  
        handleCheck={handleCheck} 
        handleDelete={handleDelete} 
      />
      <Footer 
        length={items.length} 
      />
    </div>
  )
}

export default App
