export function BooksList({ books, onEditBook, onRemoveBook }) {
    return (
        <ul className="book-list clean-list">
            {books.map(book => (
                <li key={book.id} className="book-item flex space-between align-center">
                    <div className="flex align-center gap10">
                        <img
                            src={`assets/img/${book.thumbnail}`}
                            alt={book.title}
                            className="book-img"
                            onError={ev => ev.target.src = 'assets/img/1.jpg'}
                        />
                        <div>
                            <h3>{book.title}</h3>
                            <p className="subtitle">{book.subtitle}</p>
                            <p>{book.authors.join(', ')}</p>
                            <p>💲{book.listPrice.amount}</p>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span
                                        key={star}
                                        className={star <= book.rating ? 'star filled' : 'star'}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="actions flex gap10">
                        <button onClick={() => onEditBook(book)}>✏️ Edit</button>
                        <button onClick={() => onRemoveBook(book.id)}>🗑️ Remove</button>
                    </div>
                </li>
            ))}
        </ul>
    )
}
