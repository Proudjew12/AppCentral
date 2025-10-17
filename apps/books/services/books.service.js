import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const BOOKS_KEY = 'booksDB'

export const bookService = {
    query,
    get,
    remove,
    save,
    add,
    getDefaultFilter,
    createDemoBooks,
    clearAllBooks,
    resetDemoBooks
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(BOOKS_KEY).then(books => {
        const { title, maxPrice } = filterBy
        if (title) {
            books = books.filter(book =>
                book.title.toLowerCase().includes(title.toLowerCase())
            )
        }
        if (maxPrice) {
            books = books.filter(book => book.listPrice.amount <= +maxPrice)
        }
        return books
    })
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
    if (!book.id) {
        if (!book.thumbnail) {
            const imgNum = Math.ceil(Math.random() * 20)
            book.thumbnail = `${imgNum}.jpg`
        }
        return storageService.post(BOOKS_KEY, book)
    } else {
        return storageService.put(BOOKS_KEY, book)
    }
}
function add(book) {
    return storageService.post(BOOKS_KEY, book)
}

function getDefaultFilter() {
    return { title: '', maxPrice: '' }
}

function clearAllBooks() {
    localStorage.removeItem(BOOKS_KEY)
    return Promise.resolve()
}

function resetDemoBooks() {
    localStorage.removeItem(BOOKS_KEY)
    createDemoBooks()
    return Promise.resolve()
}

function createDemoBooks() {
    localStorage.removeItem(BOOKS_KEY)

    function getRandomImg() {
        const imgNum = Math.ceil(Math.random() * 20)
        return `${imgNum}.jpg`
    }

    const books = [
        {
            id: utilService.makeId(),
            title: 'Harry Potter and the Philosopher’s Stone',
            subtitle: 'The Boy Who Lived',
            authors: ['J.K. Rowling'],
            publishedDate: 1997,
            description: 'Harry discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.',
            pageCount: 223,
            categories: ['Fantasy', 'Adventure'],
            thumbnail: getRandomImg(),
            language: 'en',
            listPrice: { amount: 19.99, currencyCode: 'USD', isOnSale: false },
            rating: 5,
        },
        {
            id: utilService.makeId(),
            title: 'The Hobbit',
            subtitle: 'There and Back Again',
            authors: ['J.R.R. Tolkien'],
            publishedDate: 1937,
            description: 'Bilbo Baggins embarks on a journey with a group of dwarves to reclaim their mountain home.',
            pageCount: 310,
            categories: ['Fantasy', 'Adventure'],
            thumbnail: getRandomImg(),
            language: 'en',
            listPrice: { amount: 14.99, currencyCode: 'USD', isOnSale: true },
            rating: 2,
        },
        {
            id: utilService.makeId(),
            title: '1984',
            subtitle: 'Big Brother is Watching You',
            authors: ['George Orwell'],
            publishedDate: 1949,
            description: 'A dystopian novel depicting a totalitarian regime and the surveillance state.',
            pageCount: 328,
            categories: ['Dystopia', 'Political Fiction'],
            thumbnail: getRandomImg(),
            language: 'en',
            listPrice: { amount: 9.99, currencyCode: 'USD', isOnSale: false },
            rating: 4,
        },
    ]

    utilService.saveToStorage(BOOKS_KEY, books)
    return books
}
