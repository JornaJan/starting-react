import React from 'react'
import { useHistory } from 'react-router-dom'
import { format } from 'date-fns'
import { useStoreState, useStoreActions } from 'easy-peasy'

const NewPost = () => {

  const posts = useStoreState((state) => state.posts)
  const postTitle = useStoreState((state) => state.postTitle)
  const postBody = useStoreState((state) => state.postBody)
  const savePost = useStoreActions((actions) => actions.savePost)
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle)
  const setPostBody = useStoreActions((actions) => actions.setPostBody)

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = {id, title: postTitle, datetime, body: postBody}
    savePost(newPost)
    history.push('/')


  }
  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input 
          type="text"
          id="postTitle"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form> 
    </main>
  )
}

export default NewPost

