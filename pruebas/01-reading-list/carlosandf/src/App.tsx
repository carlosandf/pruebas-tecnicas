import { useEffect } from 'react'
import { useBooksContext } from './hooks/useBooksContext'
import { getData } from './services/getData'
import { BookList } from './containers'
import { Header } from './components'

function App () {
  const { readingList, availableBooks, updateAvailableBooks } = useBooksContext()

  useEffect(() => {
    getData()
      .then(response => {
        if (response) updateAvailableBooks(response?.library)
      })
      .catch(console.error)
  }, [])

  return (
    <>
      <Header />
      <main>
        <BookList library={availableBooks} />
        <aside>
          {(readingList && readingList?.length > 0) && (
            <ul>
              {
                readingList.map(({ book }) => (
                  <li key={`${book.ISBN}_reading`}>{book.title}</li>
                ))
              }
            </ul>
          )}
        </aside>
      </main>
    </>
  )
}

export default App
