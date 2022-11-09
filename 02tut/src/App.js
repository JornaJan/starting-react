import React, { useState, useEffect } from 'react'
import Form from './Form'
import List from './List'
import Table from './Table'

function App() {
  const API_URL = 'http://jsonplaceholder.typicode.com/'
  const [reqType, setReqType] = useState('users')
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}${reqType}`)
        const data = await response.json()
        console.log(data)
        setItems(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchItems()
  }, [reqType])
  return (
    <div className="App">
      <h1>fetch data</h1>
      <Form reqType={reqType} setReqType={setReqType} />
      <Table items={items} />
      <List items={items} />
    </div>
  );
}

export default App;
