import React, { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { format } from 'date-fns'
import Header from './Header'
import NavComp from './Nav'
import Home from './Home'
import Footer from './Footer'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My first Post",
      datetime: "July 01 2022 14:58:00 AM",
      body: "lorem siLorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01 2022 14:58:00 AM",
      body: "lorem siLorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01 2022 14:58:00 AM",
      body: "lorem siLorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01 2022 14:58:00 AM",
      body: "lorem siLorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups"
    }
  ])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const history = useHistory()

  useEffect(() => {
    const filteredResults = posts.filter(post => ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()))

      setSearchResult(filteredResults.reverse())
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault()

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = {id, title: postTitle, datetime, body: postBody}
    const allPosts = [...posts, newPost]
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    history.push('/')

  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id)
    setPosts(postsList)
    history.push('/')

  }

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <NavComp search={search} setSearch={setSearch} />
      <Switch>
        <Route path="/" exact>
          <Home posts={searchResult} />
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
