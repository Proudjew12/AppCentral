const { useEffect, useState } = React

export function BookPreview({ book, onClose }) {
    const [currBook, setCurrBook] = useState(book)

    useEffect(() => {
        setCurrBook(book)
    }, [book])

    if (!currBook) return null

    const { title, description, authors, publishedDate, listPrice, rating, thumbnail } = currBook

    return (
        <section className="book-preview column align-center justify-center">
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
                <p>
                    <strong>Price:</strong> 💲{Number(listPrice.amount || 0).toFixed(2)} {listPrice.currencyCode}
                    {listPrice.isOnSale && <span className="sale-badge">SALE</span>}
                </p>

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
        </section>
    )
}
