
export function BookList({ books, onEditBook, onRemoveBook, onSelectBook }) {
    return (
        <ul className="book-list clean-list">
            {books.map(book => (
                <li
                    key={book.id}
                    className="book-item flex space-between align-center"
                    onClick={() => onSelectBook(book)}
                >
                    <div className="flex align-center gap10">
                        <img
                            src={`assets/img/${book.thumbnail}`}
                            alt={book.title}
                            className="book-img"
                        />
                        <div>
                            <h3>{book.title}</h3>
                            <p>{(book.authors && book.authors.join(', ')) || ''}</p>
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
                        <button
                            onClick={ev => {
                                ev.stopPropagation()
                                onEditBook(book)
                            }}
                        >
                            ✏️ Edit
                        </button>
                        <button
                            onClick={ev => {
                                ev.stopPropagation()
                                onRemoveBook(book.id)
                            }}
                        >
                            🗑️ Remove
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}
