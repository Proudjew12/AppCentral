const { useState, useEffect } = React
import { bookService } from '../services/books.service.js'


export function BookForm({ book = bookService.getEmptyBook(), onSave }) {
    const [bookToEdit, setBookToEdit] = useState(book)

    useEffect(() => {
        if (!book.description || !book.description.trim()) {
            setBookToEdit(prev => ({
                ...prev,

            }))
        } else {
            setBookToEdit(book)
        }
    }, [book])

    function handleChange({ target }) {
        const { name, value, type, checked } = target

        if (name === 'listPrice.amount') {
            setBookToEdit(prev => ({
                ...prev,
                listPrice: { ...prev.listPrice, amount: value ? +value : 0 }
            }))
        } else if (name.startsWith('listPrice.')) {
            const key = name.split('.')[1]
            setBookToEdit(prev => ({
                ...prev,
                listPrice: { ...prev.listPrice, [key]: type === 'checkbox' ? checked : value },
            }))
        } else if (name === 'authors') {
            setBookToEdit(prev => ({ ...prev, authors: value.split(',').map(a => a.trim()) }))
        } else {
            setBookToEdit(prev => ({ ...prev, [name]: value }))
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onSave(bookToEdit)
    }

    return (
        <form onSubmit={handleSubmit} className="book-form flex column align-start">
            <label>Title:</label>
            <input
                type="text"
                name="title"
                value={bookToEdit.title}
                onChange={handleChange}
            />

            <label>Description:</label>
            <textarea
                name="description"
                rows="4"
                value={bookToEdit.description}
                onChange={handleChange}
            />

            <label>Author(s):</label>
            <input
                type="text"
                name="authors"
                value={bookToEdit.authors.join(', ')}
                onChange={handleChange}
            />

            <label>Published Year:</label>
            <input
                type="number"
                name="publishedDate"
                value={bookToEdit.publishedDate}
                onChange={handleChange}
            />

            <label>Price:</label>
            <input
                type="number"
                name="listPrice.amount"
                value={bookToEdit.listPrice.amount}
                onChange={handleChange}
            />

            <label>Currency:</label>
            <select
                name="listPrice.currencyCode"
                value={bookToEdit.listPrice.currencyCode}
                onChange={handleChange}
            >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="ILS">ILS</option>
            </select>

            <label>On Sale:</label>
            <input
                type="checkbox"
                name="listPrice.isOnSale"
                checked={bookToEdit.listPrice.isOnSale}
                onChange={handleChange}
            />

            <label>Rating:</label>
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map(star => (
                    <span
                        key={star}
                        className={star <= bookToEdit.rating ? 'star filled' : 'star'}
                        onClick={() => setBookToEdit(prev => ({ ...prev, rating: star }))}
                    >
                        ★
                    </span>
                ))}
            </div>

            <button className="btn-save">
                {bookToEdit.id ? 'Update Book' : 'Add Book'}
            </button>
        </form>
    )
}
