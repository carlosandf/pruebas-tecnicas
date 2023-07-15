import { createContext, useState } from 'react'
import { type Library } from '../types/books'
import { removeFromAvailable } from '../utils/books'

export type BooksContextState = {
  readingList?: Library[]
  availableBooks?: Library[]
  addToReadingList: (book: Library) => void
  updateAvailableBooks: (books: Library[]) => void
}

const context: BooksContextState = {
  readingList: [],
  availableBooks: [],
  addToReadingList: () => null,
  updateAvailableBooks: () => null
}

export const BooksContext = createContext(context)

export const BooksProvider = ({ children }: {children: JSX.Element}) => {
  const [availableBooks, setAvailableBooks] = useState<Library[]>([])
  const [readingList, setReadingList] = useState<Library[]>([])

  const updateAvailableBooks = (books: Library[]) => {
    setAvailableBooks(books)
  }

  const addToReadingList = (book: Library) => {
    const updated = removeFromAvailable(availableBooks, book)
    setAvailableBooks(updated)
    setReadingList([...readingList, book])
  }

  const data: BooksContextState = {
    readingList,
    availableBooks,
    addToReadingList,
    updateAvailableBooks
  }

  return (
    <BooksContext.Provider value={data}>
      {children}
    </BooksContext.Provider>
  )
}
