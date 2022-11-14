import React, { useContext } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import api from './api/posts'
import DataContext  from './context/DataContext'

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext)
  const { id } = useParams()
  const post = posts.find(post => (post.id).toString() === id)
  const history = useHistory()

  const handleDelete = async (id) => {
    try {
    await api.delete(`/posts/${id}`)  
    const postsList = posts.filter(post => post.id !== id)
    setPosts(postsList)
    history.push('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }

  }

  return (
    <main className="PostPage">
      <article className="post">
        {post && 
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage

