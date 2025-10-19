const { useState } = React

export function AddReview({ onAddReview }) {
    const [review, setReview] = useState({
        fullname: '',
        rating: 0,
        readAt: '',
    })

    function handleChange({ target }) {
        const { name, value } = target
        setReview(prev => ({ ...prev, [name]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        if (!review.fullname || !review.rating || !review.readAt) return
        onAddReview({ ...review, id: Date.now() })
        setReview({ fullname: '', rating: 0, readAt: '' })
    }

    return (
        <form onSubmit={onSubmit} className="add-review column align-start gap10">
            <label>Full Name:</label>
            <input
                type="text"
                name="fullname"
                value={review.fullname}
                onChange={handleChange}
                placeholder="Enter your name"
            />

            <label>Rating:</label>
            <select name="rating" value={review.rating} onChange={handleChange}>
                <option value="0">Select rating</option>
                {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} ★</option>
                ))}
            </select>

            <label>Read At:</label>
            <input
                type="date"
                name="readAt"
                value={review.readAt}
                onChange={handleChange}
            />

            <button className="btn-save">Add Review</button>
        </form>
    )
}
