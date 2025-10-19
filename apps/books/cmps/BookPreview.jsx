const { useEffect, useState } = React
import { bookService } from '../services/books.service.js'
import { AddReview } from './AddReview.jsx'

export function BookPreview({ book, onClose, onNextBook, onPrevBook }) {
    const [currBook, setCurrBook] = useState(book)
    const [reviews, setReviews] = useState(book.reviews || [])

    useEffect(() => {
        setCurrBook(book)
        setReviews(book.reviews || [])
    }, [book])

    if (!currBook) return null

    const {
        title,
        description,
        authors,
        publishedDate,
        listPrice,
        rating,
        thumbnail,
        pageCount,
        categories = [],
        language = 'en'
    } = currBook

    const currencySymbol = bookService.getCurrencySymbol(listPrice.currencyCode)
    const fullPrice = Number(listPrice.amount || 0)
    const salePrice = Number(fullPrice * 0.5)

    function onAddReview(newReview) {
        const updatedBook = {
            ...currBook,
            reviews: [...(currBook.reviews || []), newReview]
        }
        setCurrBook(updatedBook)
        setReviews(updatedBook.reviews)
        bookService.save(updatedBook)
    }

    function onDeleteReview(reviewId) {
        const updatedBook = {
            ...currBook,
            reviews: (currBook.reviews || []).filter(r => r.id !== reviewId)
        }
        setCurrBook(updatedBook)
        setReviews(updatedBook.reviews)
        bookService.save(updatedBook)
    }

    return (
        <section className="preview-wrapper column align-center justify-center">

            <div className="book-preview column align-center justify-center">
                <button className="preview-close-btn" onClick={onClose}>✖</button>

                <div className="preview-header flex column align-center gap10">
                    <img
                        src={`assets/img/${thumbnail}`}
                        alt={title}
                        className="book-img"
                        onError={ev => (ev.target.src = 'assets/img/1.jpg')}
                    />
                    <div className="header-info column align-start justify-center">
                        <h2>{title}</h2>
                        {description && (
                            <p className="book-description-preview">{description}</p>
                        )}
                        <p className="authors">{authors.join(', ')}</p>
                    </div>
                </div>

                <div className="preview-details column align-center justify-center text-center">
                    <p><strong>Published:</strong> {publishedDate}</p>
                    <p><strong>Pages:</strong> {pageCount}</p>
                    <p><strong>Categories:</strong> {categories.join(', ')}</p>
                    <p><strong>Language:</strong> {language.toUpperCase()}</p>

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

                    <div className="star-rating row justify-center align-center gap5">
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

                <section className="reviews-section column align-center justify-center">
                    <h3>Reviews</h3>

                    {reviews.length ? (
                        <ul className="review-list clean-list column gap10">
                            {reviews.map(r => (
                                <li key={r.id} className="review-item flex space-between align-center">
                                    <div>
                                        <strong>{r.fullname}</strong> rated {r.rating}★
                                        <p>Read at: {r.readAt}</p>
                                    </div>
                                    <button className="remove-btn" onClick={() => onDeleteReview(r.id)}>🗑️</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews yet...</p>
                    )}

                    <AddReview onAddReview={onAddReview} />
                </section>
            </div>

        </section>
    )
}
