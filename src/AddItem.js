import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'

const AddItem = ({newItem, setNewItem, handleSubmit}) => {
  const inputRef = useRef()
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input value={newItem} ref={inputRef} onChange={(e) => setNewItem(e.target.value)} type="text" autoFocus id="addItem" placeholder="Add Item" required />
      <button type="submit" aria-label="Add Item" onClick={() => inputRef.current.focus()}><FaPlus /></button>
    </form>
  )
}

export default AddItem
