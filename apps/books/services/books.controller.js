const { useState, useEffect, useRef } = React
import { bookService } from '../services/books.service.js'
import { notify } from '../services/notification.service.js'

export function useBooksController() {
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


    function onResetDemo() {
        bookService.resetDemoBooks()
        loadBooks()
    }

    function onClearAll() {
        bookService.clearAllBooks()
        setBooks([])
        notify.toast('All books removed!', 'info')
    }

    return {
        books,
        filterBy,
        isAddOpen,
        isPreviewOpen,
        bookToEdit,
        selectedBook,
        modalRef,
        loadBooks,
        onSetFilter,
        openAddModal,
        closeAddModal,
        openPreviewModal,
        closePreviewModal,
        onRemoveBook,
        onEditBook,
        onResetDemo,
        onClearAll,
    }
}
