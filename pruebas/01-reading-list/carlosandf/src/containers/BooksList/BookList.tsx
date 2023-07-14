import { type Library } from '../../types/books'

type Props = {
  library: Library[]
}

export const BookList = ({ library }: Props) => {
  return (
    <ul>
      {library.map(({ book }) => (
        <li key={book.title}>
          <article>
            <figure>
              <img src={book.cover} alt={book.title} width='150' />
            </figure>
            <section>
              <strong>{book.title}</strong>
            </section>
          </article>
        </li>
      ))}
    </ul>
  )
}
