import React, { useEffect } from 'react'
import Header from './Header'
import NavComp from './Nav'
import Home from './Home'
import Footer from './Footer'
import NewPost from './NewPost'
import EditPost from './EditPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import useAxiosFetch from './hooks/useAxiosFetch'
import { Switch, Route } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'

function App() {


  const setPosts = useStoreActions((actions) => actions.setPosts)
  const { data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts')

  useEffect(() => {
    setPosts(data)
  }, [data, setPosts])
  return (
    <div className="App">
      <Header title="React JS Blog"  />
      <NavComp />
      <Switch>
        <Route path="/" exact>
          <Home
            isLoading={isLoading}
            fetchError={fetchError}
            />
        </Route>
        <Route path="/post" exact component={NewPost} />
        <Route path="/edit/:id" component={EditPost} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
