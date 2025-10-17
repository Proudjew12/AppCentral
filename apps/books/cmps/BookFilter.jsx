const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
    const [filterToEdit, setFilterToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterToEdit)
    }, [filterToEdit])

    function handleChange({ target }) {
        const { name, value } = target
        setFilterToEdit(prev => ({ ...prev, [name]: value }))
    }

    return (
        <form className="book-filter flex gap10">
            <input
                type="text"
                name="title"
                value={filterToEdit.title}
                placeholder="Search by title..."
                onChange={handleChange}
            />
            <input
                type="number"
                name="maxPrice"
                value={filterToEdit.maxPrice || ''}
                placeholder="Max price"
                onChange={handleChange}
            />
        </form>
    )
}
