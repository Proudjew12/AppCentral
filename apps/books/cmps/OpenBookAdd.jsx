import { openLibraryService } from '../services/open-library.service.js'
import { bookService } from '../services/books.service.js'
import { notify } from '../services/notification.service.js'

export function OpenBookAdd({ onBookAdded }) {
    async function openImportModal() {
        const { value: searchQuery } = await Swal.fire({
            title: '📚 Import from Open Library',
            input: 'text',
            inputPlaceholder: 'Search for a book title...',
            confirmButtonText: '🔍 Search',
            showCancelButton: true,
            background: '#1e1f22',
            color: '#f3f3f3',
            inputAttributes: {
                autocapitalize: 'off'
            }
        })

        if (!searchQuery) return

        try {
            const books = await openLibraryService.searchBooks(searchQuery)

            if (!books.length) {
                return Swal.fire({
                    icon: 'info',
                    text: 'No books found.',
                    background: '#1e1f22',
                    color: '#f3f3f3'
                })
            }

            const bookOptions = books
                .slice(0, 10)
                .map((book, idx) => ({
                    title: book.title,
                    id: idx,
                }))

            const inputOptions = bookOptions.reduce((acc, book) => {
                acc[book.id] = book.title
                return acc
            }, {})

            const { value: selectedId } = await Swal.fire({
                title: 'Select a book to import',
                input: 'select',
                inputOptions,
                inputPlaceholder: 'Choose a book',
                confirmButtonText: '➕ Import Book',
                showCancelButton: true,
                background: '#1e1f22',
                color: '#f3f3f3'
            })

            if (selectedId !== undefined && books[selectedId]) {
                await bookService.save(books[selectedId])
                notify.success('Book imported successfully!')
                onBookAdded()
            }

        } catch (err) {
            console.error('❌ Open Library Import Error:', err)
            notify.error('Failed to import from Open Library')
        }
    }

    return (
        <button className="add-book-btn" onClick={openImportModal}>
            ➕ Import from Open Library
        </button>
    )
}
