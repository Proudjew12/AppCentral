
import { BookForm } from './BookForm.jsx'
import { bookService } from '../services/books.service.js'
import { notify } from '../services/notification.service.js'

export function BookAdd({ bookToEdit, onBookAdded }) {
    async function handleSave(book) {
        try {
            await bookService.save(book)
            notify.success(book.id ? 'Book updated!' : 'Book added!')
            onBookAdded()
        } catch (err) {
            notify.error('Failed to save book')
        }
    }

    return (
        <section className="book-add main-layout flex column align-center">
            <BookForm book={bookToEdit || bookService.getEmptyBook()} onSave={handleSave} />
        </section>
    )
}
