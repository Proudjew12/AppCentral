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

    useEffect(() => {
        function handleClickOutside(ev) {
            if (modalRef.current && !modalRef.current.contains(ev.target)) {
                if (isAddOpen) closeAddModal()
                if (isPreviewOpen) closePreviewModal()
            }
        }

        if (isAddOpen || isPreviewOpen) document.addEventListener('mousedown', handleClickOutside)
        else document.removeEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isAddOpen, isPreviewOpen])

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

            {isPreviewOpen && selectedBook && (
                <div className="modal-overlay">
                    <div ref={modalRef} className="modal-content">
                        <BookPreview book={selectedBook} onClose={closePreviewModal} />
                    </div>
                </div>
            )}

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
