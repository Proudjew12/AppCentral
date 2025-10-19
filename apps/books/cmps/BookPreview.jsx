const { useState, useEffect } = React

export function BookPreview({ book, onClose }) {
    const [currBook, setCurrBook] = useState(book)

    useEffect(() => {
        setCurrBook(book)
    }, [book])

    if (!currBook) return null

    const title = currBook.title
    const description = currBook.description
    const authors = currBook.authors || []
    const publishedDate = currBook.publishedDate
    const listPrice = currBook.listPrice || {}
    const rating = currBook.rating
    const thumbnail = currBook.thumbnail

    const price = Number(listPrice.amount || 0).toFixed(2)
    const currencyCode = listPrice.currencyCode || 'USD'
    const isOnSale = !!listPrice.isOnSale

    return (
        <section className="book-preview column align-center justify-center">
            <button className="preview-close-btn" onClick={onClose}>✖</button>

            <div className="preview-header column align-center gap10">
                <img
                    src={'assets/img/' + thumbnail}
                    alt={title}
                    className="book-img"
                    onError={ev => ev.target.src = 'assets/img/1.jpg'}
                />

                <div className="header-info column align-center text-center gap5">
                    <h2>{title}</h2>

                    {description && (
                        <p className="book-description-preview">{description}</p>
                    )}

                    {authors.length > 0 && (
                        <p className="authors">{authors.join(', ')}</p>
                    )}
                </div>
            </div>

            <div className="preview-details column align-center text-center gap10">
                <p><strong>Published:</strong> {publishedDate}</p>

                <p className="preview-price">
                    <strong>Price:</strong> 💲{price} {currencyCode}
                    {isOnSale && <span className="sale-badge">SALE</span>}
                </p>

                <div className="star-rating row justify-center align-center gap5">
                    {[1, 2, 3, 4, 5].map(function (star) {
                        return (
                            <span
                                key={star}
                                className={star <= rating ? 'star filled' : 'star'}
                            >
                                ★
                            </span>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
