import { useRef, useState, forwardRef, useImperativeHandle } from 'react'

const UseImperativeHandleComp = () => {
  const modalRef = useRef()

  const handleOpenModal = () => {
    modalRef.current.openModal()
  }

  console.log('parent rendered!')

  return (
    <div>
      <h1><span className="text-decoration-span">useImperativeHandle hook</span></h1>
      <p>Parent Component</p>
      <Modal ref={modalRef} />
      <button onClick={handleOpenModal}>Open</button>
    </div>
  )
}

const Modal = forwardRef(function Modal(props, ref) {
  const [modalState, setModalState] = useState(false)

  useImperativeHandle(ref, () => ({
    openModal: () => setModalState(true)
  }))

  console.log('child rendered')

  if (!modalState) return null

  return (
    <div className="modal">
      <p>This is my modal!!</p>
      <button onClick={() => setModalState(false)}>Close</button>
    </div>
  )


})

export default UseImperativeHandleComp
