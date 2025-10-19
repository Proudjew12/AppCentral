import { bookService } from '../services/books.service.js'

export function BooksList({ books, onEditBook, onRemoveBook, onViewBook }) {
    return (
        <ul className="book-list clean-list">
            {books.map(book => {
                const { id, title, authors, listPrice, rating, thumbnail } = book
                const fullPrice = Number(listPrice.amount || 0)
                const salePrice = Number(fullPrice * 0.5)
                const currencySymbol = bookService.getCurrencySymbol(listPrice.currencyCode)

                return (
                    <li
                        key={id}
                        className="book-item flex space-between align-center"
                        onClick={() => onViewBook(book)}
                    >
                        <div className="flex align-center gap10">
                            <img
                                src={`assets/img/${thumbnail}`}
                                alt={title}
                                className="book-img"
                                onError={ev => (ev.target.src = 'assets/img/1.jpg')}
                            />

                            <div>
                                <h3>{title}</h3>
                                <p>{authors.join(', ')}</p>

                                {listPrice.isOnSale ? (
                                    <p className="book-price">
                                        <span className="old-price">
                                            {currencySymbol}{fullPrice.toFixed(2)}
                                        </span>
                                        <span className="new-price">
                                            {currencySymbol}{salePrice.toFixed(2)}
                                        </span>
                                        <span className="sale-badge">SALE</span>
                                    </p>
                                ) : (
                                    <p className="book-price">
                                        {currencySymbol}{fullPrice.toFixed(2)}
                                    </p>
                                )}

                                <div className="star-rating row gap3 align-center">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span
                                            key={star}
                                            className={star <= rating ? 'star filled' : 'star'}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div
                            className="actions flex gap10"
                            onClick={ev => ev.stopPropagation()}
                        >
                            <button onClick={() => onEditBook(book)}>✏️ Edit</button>
                            <button onClick={() => onRemoveBook(id)}>🗑️ Remove</button>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}
