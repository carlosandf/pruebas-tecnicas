import { useState, useEffect } from 'react'
import { getData } from './services/getData'
import { BookList } from './containers/BooksList'
import { type Library } from './types/books'

const INITIAL_STATE: Library[] = []

function App () {
  const [library, setLibrary] = useState(INITIAL_STATE)

  useEffect(() => {
    getData()
      .then(response => {
        if (response) setLibrary(response?.library)
      })
      .catch(console.error)
  }, [])

  return (
    <>
      <header></header>
      <main>
        <BookList library={library} />
      </main>
    </>
  )
}

export default App
