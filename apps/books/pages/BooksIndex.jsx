const { useState, useEffect, useRef } = React

import { BookList } from '../cmps/BooksList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookAdd } from '../cmps/BookAdd.jsx'
import { bookService } from '../services/books.service.js'

export function BooksIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [bookToEdit, setBookToEdit] = useState(null)

    const modalRef = useRef(null)

    useEffect(() => {
        if (!localStorage.getItem('booksDB')) bookService.createDemoBooks()
        loadBooks()
    }, [filterBy])

    async function loadBooks() {
        try {
            const books = await bookService.query(filterBy)
            setBooks(books)
        } catch (err) {
            console.error('Failed to load books:', err)
            Swal.fire('Error', 'Failed to load books', 'error')
        }
    }

    function onSetFilter(updatedFilter) {
        setFilterBy(prev => ({ ...prev, ...updatedFilter }))
    }

    // open modal for add or edit
    function openAddModal(book = null) {
        setBookToEdit(book)
        setIsAddOpen(true)
    }
    function closeAddModal() {
        setBookToEdit(null)
        setIsAddOpen(false)
    }

    // close modal when clicking outside
    useEffect(() => {
        function handleClickOutside(ev) {
            if (modalRef.current && !modalRef.current.contains(ev.target)) {
                closeAddModal()
            }
        }
        if (isAddOpen) document.addEventListener('mousedown', handleClickOutside)
        else document.removeEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isAddOpen])

    function onSelectBook(book) {
        Swal.fire({
            title: book.title,
            html: `
                <div style="text-align:left">
                    <img src="assets/img/${book.thumbnail}" style="width:150px;border-radius:8px;margin-bottom:10px">
                    <p><b>Author:</b> ${(book.authors && book.authors.join(', ')) || 'N/A'}</p>
                    <p><b>Price:</b> ${book.listPrice.amount} ${book.listPrice.currencyCode}</p>
                    <p><b>Rating:</b> ${'★'.repeat(book.rating || 0)}</p>
                    <p><b>Language:</b> ${book.language}</p>
                </div>
            `,
            background: '#1e1f22',
            color: '#f3f3f3',
            confirmButtonColor: '#ffb347'
        })
    }

    function onRemoveBook(bookId) {
        Swal.fire({
            title: 'Delete this book?',
            text: 'This cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(result => {
            if (result.isConfirmed) {
                bookService.remove(bookId).then(() => {
                    loadBooks()
                    Swal.fire('Deleted!', 'Book has been removed.', 'success')
                })
            }
        })
    }

    // 🧠 new edit logic
    function onEditBook(book) {
        openAddModal(book)
    }

    return (
        <section className="books-index main-layout flex column align-center">
            <h2>📚 MissBooks Library</h2>

            <div className="books-toolbar flex row space-between align-center">
                <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />

                <div className="flex gap10">
                    <button className="add-book-btn" onClick={() => openAddModal()}>
                        ➕ Add Book
                    </button>

                    <button
                        className="reset-btn"
                        onClick={() => {
                            bookService.resetDemoBooks()
                            loadBooks()
                        }}
                    >
                        ♻️ Reset Demo
                    </button>

                    <button
                        className="remove-all-btn"
                        onClick={() => {
                            bookService.clearAllBooks()
                            setBooks([])
                            Swal.fire('All books removed!', '', 'success')
                        }}
                    >
                        🗑️ Clear All
                    </button>
                </div>
            </div>

            {isAddOpen && (
                <div className="modal-overlay">
                    <div ref={modalRef} className="modal-content">
                        <button className="modal-close" onClick={closeAddModal}>✖</button>
                        <BookAdd
                            onBookAdded={() => {
                                loadBooks()
                                closeAddModal()
                            }}
                            bookToEdit={bookToEdit}
                        />
                    </div>
                </div>
            )}

            {!!books.length && (
                <BookList
                    books={books}
                    onSelectBook={onSelectBook}
                    onRemoveBook={onRemoveBook}
                    onEditBook={onEditBook}
                />
            )}
            {!books.length && <p>No books yet...</p>}
        </section>
    )
}
