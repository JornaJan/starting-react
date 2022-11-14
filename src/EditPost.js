import React, { useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import DataContext  from './context/DataContext'

const EditPost = () => {
  const { posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody } = useContext(DataContext)
  const { id } = useParams()
  const post = posts.find(post => (post.id).toString() === id)

  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  }, [post, setEditTitle, setEditBody])
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
