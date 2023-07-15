import { type Library } from '../../types/books'
import { useBooksContext } from '../../hooks/useBooksContext'
import styles from './BookList.module.css'

type Props = {
  library: Library[] | undefined
}

export const BookList = ({ library }: Props) => {
  const { addToReadingList } = useBooksContext()

  const handleClick = (book: Library) => {
    addToReadingList(book)
  }

  return (
    <ul className={styles.container}>
      {library?.map(({ book }) => (
        <li key={book.ISBN} className={styles.item} onClick={() => handleClick({ book })}>
          <figure className={styles.imageContainer}>
            <img className={styles.image} src={book.cover} alt={book.title} height='200' />
          </figure>
        </li>
      ))}
    </ul>
  )
}
