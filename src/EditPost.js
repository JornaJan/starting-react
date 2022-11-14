import React, { useEffect } from 'react'
import { useParams, useHistory , Link} from 'react-router-dom'
import { format } from 'date-fns'
import { useStoreState, useStoreActions } from 'easy-peasy'

const EditPost = () => {
  const history = useHistory()
  const { id } = useParams()

  const editTitle = useStoreState((state) => state.editTitle)
  const editBody = useStoreState((state) => state.editBody)
  const editPost = useStoreActions((actions) => actions.editPost)
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle)
  const setEditBody = useStoreActions((actions) => actions.setEditBody)

  const getPostById = useStoreState((state) => state.getPostById)
  const post = getPostById(id)

  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }

  }, [post, setEditTitle, setEditBody])

  const handleEdit = (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = {id, title: editTitle, datetime, body: editBody}
    editPost(updatedPost)
    history.push(`/post/${id}`)
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
        <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
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
