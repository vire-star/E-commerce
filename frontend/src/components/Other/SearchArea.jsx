import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const SearchArea = () => {
  return (
    <div className='h-[20vh] w-full bg-purple-600'>
      <Link to={'/search'}>
      <Button>
        search with ai
      </Button>
      </Link>
    </div>
  )
}

export default SearchArea