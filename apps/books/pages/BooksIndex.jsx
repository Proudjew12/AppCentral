const { useState, useEffect, useRef } = React

import { BooksList } from '../cmps/BooksList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookAdd } from '../cmps/BookAdd.jsx'
import { BookPreview } from '../cmps/BookPreview.jsx'
import { bookService } from '../services/books.service.js'
import { notify } from '../services/notification.service.js'

export function BooksIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [bookToEdit, setBookToEdit] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)
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
            notify.error('Failed to load books')
        }
    }

    function onSetFilter(updatedFilter) {
        setFilterBy(prev => ({ ...prev, ...updatedFilter }))
    }

    function openAddModal(book = null) {
        setBookToEdit(book)
        setIsAddOpen(true)
    }

    function closeAddModal() {
        setBookToEdit(null)
        setIsAddOpen(false)
    }

    function openPreviewModal(book) {
        setSelectedBook(book)
        setIsPreviewOpen(true)
    }

    function closePreviewModal() {
        setSelectedBook(null)
        setIsPreviewOpen(false)
    }

    function onNextBook() {
        if (!selectedBook || !books.length) return
        const currIdx = books.findIndex(b => b.id === selectedBook.id)
        const nextIdx = (currIdx + 1) % books.length
        setSelectedBook(books[nextIdx])
    }

    function onPrevBook() {
        if (!selectedBook || !books.length) return
        const currIdx = books.findIndex(b => b.id === selectedBook.id)
        const prevIdx = (currIdx - 1 + books.length) % books.length
        setSelectedBook(books[prevIdx])
    }

    async function onRemoveBook(bookId) {
        const result = await notify.confirmDelete('Delete this book?')
        if (result.isConfirmed) {
            await bookService.remove(bookId)
            notify.toast('Book deleted!')
            loadBooks()
        }
    }

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
                            notify.toast('All books removed!', 'info')
                        }}
                    >
                        🗑️ Clear All
                    </button>
                </div>
            </div>


            {isAddOpen && (
                <div
                    className="modal-overlay"
                    onClick={(ev) => {
                        if (ev.target.classList.contains('modal-overlay')) closeAddModal()
                    }}
                >
                    <div
                        ref={modalRef}
                        className="modal-content"
                        onClick={(ev) => ev.stopPropagation()}
                    >
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


            {isPreviewOpen && selectedBook && (
                <div
                    className="modal-overlay"
                    onClick={(ev) => {
                        if (ev.target.classList.contains('modal-overlay')) closePreviewModal()
                    }}
                >

                    <button
                        className="global-arrow prev"
                        onClick={(ev) => {
                            ev.stopPropagation()
                            onPrevBook()
                        }}
                    >
                        &lt;
                    </button>


                    <div
                        ref={modalRef}
                        className="modal-content"
                        onClick={(ev) => ev.stopPropagation()}
                    >
                        <BookPreview
                            book={selectedBook}
                            onClose={closePreviewModal}
                            onNextBook={onNextBook}
                            onPrevBook={onPrevBook}
                        />
                    </div>


                    <button
                        className="global-arrow next"
                        onClick={(ev) => {
                            ev.stopPropagation()
                            onNextBook()
                        }}
                    >
                        &gt;
                    </button>
                </div>
            )}

            {/* Book List */}
            {!!books.length && (
                <BooksList
                    books={books}
                    onRemoveBook={onRemoveBook}
                    onEditBook={onEditBook}
                    onViewBook={openPreviewModal}
                />
            )}

            {!books.length && <p>No books yet...</p>}
        </section>
    )
}
