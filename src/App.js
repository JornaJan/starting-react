import React, { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { format } from 'date-fns'
import Header from './Header'
import NavComp from './Nav'
import Home from './Home'
import Footer from './Footer'
import NewPost from './NewPost'
import EditPost from './EditPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import api from './api/posts'
import useWindowSize from './hooks/useWindowSize'
import useAxiosFetch from './hooks/useAxiosFetch'

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const history = useHistory()
  const { width } = useWindowSize()

  const { data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts')

  useEffect(() => {
    setPosts(data)
  }, [data])


  useEffect(() => {
    const filteredResults = posts.filter(post => ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()))

      setSearchResult(filteredResults.reverse())
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = {id, title: postTitle, datetime, body: postBody}
    try {
      const response = await api.post('/posts', newPost)
      const allPosts = [...posts, response.data]
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      history.push('/')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }

  }

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
    <div className="App">
      <Header title="React JS Blog" width={width} />
      <NavComp search={search} setSearch={setSearch} />
      <Switch>
        <Route path="/" exact>
          <Home posts={searchResult} fetchError={fetchError} isLoading={isLoading} />
        </Route>
        <Route path="/post" exact>
          <NewPost 
            handleSubmit={handleSubmit} 
            postTitle={postTitle} 
            setPostTitle={setPostTitle} 
            postBody={postBody}
            setPostBody={setPostBody}
          />
        </Route>
        <Route path="/edit/:id">
          <EditPost 
            posts={posts}
            handleEdit={handleEdit} 
            editTitle={editTitle} 
            setEditTitle={setEditTitle} 
            editBody={editBody}
            setEditBody={setEditBody}
          />
        </Route>
        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
