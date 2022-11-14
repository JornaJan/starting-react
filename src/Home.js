import React from 'react'
import { useStoreState } from 'easy-peasy'
import Feed from './Feed'

const Home = ({isLoading, fetchError}) => {
  const searchResults = useStoreState((state) => state.searchResults)
  console.log(useStoreState)
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}
      {fetchError && <p className="statusMsg" style={{color: "red"}}>{fetchError}</p>}
      {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : 
        <p style={{margin: "2rem"}}>
          no posts to display.
        </p>
      )}
    </main>
  )
}

export default Home



