import { useContext } from 'react'
import { BooksContext } from '../context/BooksContex'

export const useBooksContext = () => useContext(BooksContext)
