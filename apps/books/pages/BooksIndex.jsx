const { useEffect } = React

import { BooksList } from '../cmps/BooksList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookAdd } from '../cmps/BookAdd.jsx'
import { BookPreview } from '../cmps/BookPreview.jsx'
import { useBooksController } from '../services/books.controller.js'

export function BooksIndex() {
    const {
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
    } = useBooksController()

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

    return (
        <section className="books-index main-layout flex column align-center">
            <h2>📚 MissBooks Library</h2>

            <div className="books-toolbar flex row space-between align-center">
                <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />

                <div className="flex gap10">
                    <button className="add-book-btn" onClick={() => openAddModal()}>
                        ➕ Add Book
                    </button>
                    <button className="reset-btn" onClick={onResetDemo}>
                        ♻️ Reset Demo
                    </button>
                    <button className="remove-all-btn" onClick={onClearAll}>
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
