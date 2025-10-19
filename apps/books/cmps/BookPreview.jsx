const { useEffect, useState } = React

export function BookPreview({ book, onClose }) {
    const [currBook, setCurrBook] = useState(book)

    useEffect(() => {
        setCurrBook(book)
    }, [book])

    if (!currBook) return null

    const { title, subtitle, authors, publishedDate, listPrice, rating, thumbnail } = currBook

    return (
        <section className="book-preview flex column align-start">
            <button className="preview-close-btn" onClick={onClose}>✖</button>

            <div className="preview-header flex align-center gap10">
                <img
                    src={`assets/img/${thumbnail}`}
                    alt={title}
                    className="book-img"
                    onError={ev => (ev.target.src = 'assets/img/1.jpg')}
                />
                <div>
                    <h2>{title}</h2>
                    {subtitle && <h4 className="subtitle">{subtitle}</h4>}
                    <p>{authors.join(', ')}</p>
                </div>
            </div>

            <div className="preview-details">
                <p><strong>Published:</strong> {publishedDate}</p>
                <p>
                    <strong>Price:</strong> 💲{listPrice.amount.toFixed(2)} {listPrice.currencyCode}
                    {listPrice.isOnSale && <span className="sale-badge">SALE</span>}
                </p>

                <div className="star-rating">
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
