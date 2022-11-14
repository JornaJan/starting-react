import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory , Link} from 'react-router-dom'
import { format } from 'date-fns'
import api from './api/posts'
import DataContext  from './context/DataContext'

const EditPost = () => {
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const { posts, setPosts } = useContext(DataContext)
  const { id } = useParams()
  const post = posts.find(post => (post.id).toString() === id)
  const history = useHistory()

  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }

  }, [post, setEditTitle, setEditBody])

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatePost = {id, title: editTitle, datetime, body: editBody}
    try {

      const response = await api.put(`/posts/${id}`, updatePost)
      setPosts(posts.map(post => post.id === id ? {...response.data} : post))
      setEditTitle('')
      setEditBody('')
      history.push('/')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <main className="EditPost">
      {editTitle && 
        <>
      <h2>Edit Post</h2>
      <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="postTitle">Title:</label>
        <input 
          type="text"
          id="postTitle"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          required
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
          required
        />
        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
      </form> 
      </>
    }
    {
      !editTitle &&
      <>
          <h2>Post Not Found</h2>
          <p>well, that's disappointing.</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
      </>
    }
    </main>
  )
}

export default EditPost
