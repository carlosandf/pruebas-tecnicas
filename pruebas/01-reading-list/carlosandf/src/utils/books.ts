import { type Library } from '../types/books'

export const removeFromAvailable = (list: Library[], book: Library) => {
  const updated = list.filter((item) => item.book.ISBN !== book.book.ISBN)
  return updated
}
