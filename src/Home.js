import React from 'react'
import Feed from './Feed'
import { useContext } from 'react'
import DataContext  from './context/DataContext'

const Home = () => {
  const { searchResult, fetchError, isLoading} = useContext(DataContext)
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}
      {fetchError && <p className="statusMsg" style={{color: "red"}}>{fetchError}</p>}
      {!isLoading && !fetchError && (searchResult.length ? <Feed posts={searchResult} /> : 
        <p style={{margin: "2rem"}}>
          no posts to display.
        </p>
      )}
    </main>
  )
}

export default Home



