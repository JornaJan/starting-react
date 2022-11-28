import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import Layout from './Layout'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'

function App() {
  const [posts, setPosts] = useState([
    {
      "id": 1,
      "title": "My first Post",
      "datetime": "July 01 2022 14:58:00 AM",
      "body": "lorem siLorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups"
    },
    {
      "id": 2,
      "title": "My 2nd Post",
      "datetime": "July 01 2022 14:58:00 AM",
      "body": "lorem siLorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups"
    },
    {
      "id": 4,
      "title": "My Fourth Postsssss",
      "datetime": "November 13, 2022 5:13:38 PM",
      "body": "lorem siLorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups"
    }
    ])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const navigate = useNavigate()

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
    const allPosts = [...posts, newPost]
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
  }

  const handleDelete = async (id) => {
    const postsList = posts.filter(post => post.id !== id)
    setPosts(postsList)
    navigate('/')
  }

  return (
    <Routes>
      <Route path="/" exact element={<Layout search={search} setSearch={setSearch} />}>
        <Route index element={<Home posts={searchResult} />} />
        <Route path="post">
          <Route element={<NewPost 
            handleSubmit={handleSubmit} 
            postTitle={postTitle} 
            setPostTitle={setPostTitle} 
            postBody={postBody}
            setPostBody={setPostBody}
            />} />
          <Route path="/post/:id" element={<PostPage  posts={posts} handleDelete={handleDelete}/>} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
