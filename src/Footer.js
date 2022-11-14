import React from 'react'
import { useStoreState } from 'easy-peasy'

const Footer = () => {
  const postCount = useStoreState((state) => state.postCount)
  return (
    <footer>
      <p>{postCount} Blog Posts</p>
    </footer>
  )
}

export default Footer

