export const openLibraryService = {
    searchBooks
}

const BASE_URL = 'https://openlibrary.org/search.json'

function searchBooks(query) {
    const url = `${BASE_URL}?q=${encodeURIComponent(query)}`
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.docs) return []
            return data.docs.map(mapOpenLibraryBookToLocalBook)
        })
}

function mapOpenLibraryBookToLocalBook(doc) {
    return {
        id: '',
        title: doc.title || 'No Title',
        description: typeof doc.description === 'string' ? doc.description : '',
        authors: doc.author_name || ['Unknown'],
        publishedDate: doc.first_publish_year || '',
        pageCount: doc.number_of_pages_median || 0,
        categories: doc.subject || [],
        language: doc.language ? doc.language[0] : 'en',
        thumbnail: doc.cover_i
            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
            : 'https://via.placeholder.com/128x190?text=No+Cover',
        listPrice: {
            amount: 20 + Math.floor(Math.random() * 80),
            currencyCode: 'USD',
            isOnSale: Math.random() > 0.5
        },
        rating: Math.floor(Math.random() * 5) + 1,
        reviews: []
    }
}
