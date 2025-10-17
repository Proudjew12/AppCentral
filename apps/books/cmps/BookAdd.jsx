const { useState, useEffect } = React

import { bookService } from '../services/books.service.js'

export function BookAdd({ onBookAdded, bookToEdit: editedBook }) {
    const [bookToEdit, setBookToEdit] = useState(getEmptyBook())

    useEffect(() => {
        if (editedBook) setBookToEdit(editedBook)
    }, [editedBook])

    async function loadBooks() {
        try {
            const books = await bookService.query()
            setBooks(books)
        } catch (err) {
            console.error('Failed to load books:', err)
            Swal.fire('Error', 'Failed to load books', 'error')
        }
    }

    function getEmptyBook() {
        return {
            id: '',
            title: '',
            subtitle: '',
            authors: [''],
            publishedDate: '',
            description: '',
            pageCount: '',
            categories: [''],
            thumbnail: '',
            language: 'en',
            listPrice: {
                amount: '',
                currencyCode: 'USD',
                isOnSale: false,
            },
            rating: 0,
        }
    }

    function handleChange({ target }) {
        const { name, value, type, checked } = target

        if (name.startsWith('listPrice.')) {
            const key = name.split('.')[1]
            setBookToEdit(prev => ({
                ...prev,
                listPrice: { ...prev.listPrice, [key]: type === 'checkbox' ? checked : value },
            }))
        } else if (name === 'authors') {
            // Allow multiple authors separated by commas
            setBookToEdit(prev => ({ ...prev, authors: value.split(',').map(a => a.trim()) }))
        } else {
            setBookToEdit(prev => ({ ...prev, [name]: value }))
        }
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        if (!bookToEdit.title || !bookToEdit.listPrice.amount) {
            Swal.fire('Missing Info', 'Title and Price are required!', 'warning')
            return
        }

        bookService.save(bookToEdit).then(() => {
            if (onBookAdded) onBookAdded()
            Swal.fire({
                icon: 'success',
                title: bookToEdit.id ? 'Book Updated!' : 'Book Added!',
                showConfirmButton: false,
                timer: 1200,
            })
            setBookToEdit(getEmptyBook())
            loadBooks()
        })
    }

    function onEditBook(book) {
        setBookToEdit(book)
    }

    function onDeleteBook(bookId) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the book!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(result => {
            if (result.isConfirmed) {
                bookService.remove(bookId).then(() => {
                    loadBooks()
                    Swal.fire('Deleted!', 'The book has been removed.', 'success')
                })
            }
        })
    }

    return (
        <section className="book-add main-layout flex column align-center">
            <form onSubmit={onSaveBook} className="book-form flex column align-start">
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={bookToEdit.title}
                    onChange={handleChange}
                />

                <label>Subtitle:</label>
                <input
                    type="text"
                    name="subtitle"
                    value={bookToEdit.subtitle}
                    onChange={handleChange}
                />

                <label>Author(s):</label>
                <input
                    type="text"
                    name="authors"
                    placeholder="e.g. J.K. Rowling, George Orwell"
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
                            onClick={() =>
                                setBookToEdit(prev => ({ ...prev, rating: star }))
                            }
                        >
                            ★
                        </span>
                    ))}
                </div>

                <button className="btn-save">
                    {bookToEdit.id ? 'Update Book' : 'Add Book'}
                </button>

            </form>


        </section>
    )
}
