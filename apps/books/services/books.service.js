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
    getEmptyBook,
    clearAllBooks,
    resetDemoBooks,
    createDemoBooks,
    getCurrencySymbol,
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(BOOKS_KEY).then(books => {
        const { title, maxPrice } = filterBy
        let filtered = [...books]

        if (title) {
            filtered = filtered.filter(book =>
                book.title.toLowerCase().includes(title.toLowerCase())
            )
        }

        if (maxPrice) {
            filtered = filtered.filter(book =>
                book.listPrice.amount <= +maxPrice
            )
        }

        return filtered
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
function getCurrencySymbol(code) {
    switch (code) {
        case 'USD':
            return '$'
        case 'EUR':
            return '€'
        case 'ILS':
            return '₪'
        default:
            return '$'
    }
}

function randomImg() {
    const imgNum = Math.ceil(Math.random() * 20)
    return `${imgNum}.jpg`
}


function getEmptyBook() {
    return {
        id: '',
        title: '',
        description: '',
        authors: [''],
        publishedDate: '',
        pageCount: '',
        categories: [],
        language: 'en',
        thumbnail: '',
        listPrice: { amount: 0, currencyCode: 'USD', isOnSale: false },
        rating: 0,
    }
}

function createDemoBooks() {
    const demoBooks = [
        {
            id: utilService.makeId(),
            title: 'Harry Potter and the Philosopher’s Stone',
            description:
                'Harry discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.',
            authors: ['J.K. Rowling'],
            publishedDate: 1997,
            pageCount: 223,
            categories: ['Fantasy', 'Adventure'],
            language: 'en',
            thumbnail: randomImg(),
            listPrice: { amount: 19.99, currencyCode: 'USD', isOnSale: false },
            rating: 4,
        },
        {
            id: utilService.makeId(),
            title: 'The Hobbit',
            description:
                'Bilbo Baggins embarks on a journey with dwarves to reclaim their home.',
            authors: ['J.R.R. Tolkien'],
            publishedDate: 1937,
            pageCount: 310,
            categories: ['Fantasy', 'Adventure'],
            language: 'en',
            thumbnail: randomImg(),
            listPrice: { amount: 14.99, currencyCode: 'EUR', isOnSale: true },
            rating: 5,
        },
        {
            id: utilService.makeId(),
            title: '1984',
            description:
                'A dystopian novel depicting a totalitarian regime and the surveillance state.',
            authors: ['George Orwell'],
            publishedDate: 1949,
            pageCount: 328,
            categories: ['Dystopia', 'Political Fiction'],
            language: 'en',
            thumbnail: randomImg(),
            listPrice: { amount: 9.99, currencyCode: 'ILS', isOnSale: false },
            rating: 3,
        },
    ]

    utilService.saveToStorage(BOOKS_KEY, demoBooks)
    return demoBooks
}


