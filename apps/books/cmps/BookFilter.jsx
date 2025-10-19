export function BookFilter({ filterBy, onSetFilter }) {
    function handleChange({ target }) {
        const { name, value } = target
        onSetFilter({ [name]: value })
    }

    return (
        <section className="book-filter flex align-center gap10">
            <input
                type="text"
                name="title"
                value={filterBy.title}
                onChange={handleChange}
                placeholder="Search by title..."
            />

            <input
                type="number"
                name="maxPrice"
                value={filterBy.maxPrice}
                onChange={handleChange}
                placeholder="Max price"
            />
        </section>
    )
}
