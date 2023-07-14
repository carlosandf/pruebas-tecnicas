import { type BooksResponse } from '../types/books'

export const getData = async (): Promise<BooksResponse | null> => {
  try {
    const response = await fetch('/books.json')

    if (!response.ok) {
      throw response
    }

    const data = await response.json() as BooksResponse

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
