import React, { useState, useEffect } from 'react'
import Header from './Header'
import NavComp from './Nav'
import Home from './Home'
import Footer from './Footer'
import NewPost from './NewPost'
import EditPost from './EditPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Switch, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext'

function App() {
  return (
    <div className="App">
      <Header title="React JS Blog"  />
      <DataProvider>
      <NavComp />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/post" exact component={NewPost} />
        <Route path="/edit/:id" component={EditPost} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
