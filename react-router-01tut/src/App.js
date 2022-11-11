import React, { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import Header from './Header'
import NavComp from './Nav'
import Home from './Home'
import Footer from './Footer'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'

function App() {
  return (
    <div className="App">
      <Header />
      <NavComp />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/post" exact>
          <NewPost />
        </Route>
        <Route path="/post/:id">
          <PostPage />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

