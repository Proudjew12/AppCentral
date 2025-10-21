const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilter }) {
    const [localFilter, setLocalFilter] = useState(filterBy)

    // Whenever the user types or selects, update parent
    useEffect(() => {
        onSetFilter(localFilter)
    }, [localFilter])

    function handleChange({ target }) {
        const { name, value } = target
        setLocalFilter(prev => ({ ...prev, [name]: value }))
    }

    function clearFilters() {
        setLocalFilter({ txt: '', type: '' })
    }

    return (
        <section className="note-filter flex row align-center space-between">
            <div className="flex row align-center grow">
                <input
                    type="text"
                    name="txt"
                    placeholder="Search notes..."
                    value={localFilter.txt}
                    onChange={handleChange}
                />
                {localFilter.txt && (
                    <button
                        className="btn-clear-search"
                        onClick={clearFilters}
                        title="Clear search"
                        type="button"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                )}
            </div>

            <select
                name="type"
                value={localFilter.type}
                onChange={handleChange}
            >
                <option value="">All Types</option>
                <option value="NoteTxt">Text</option>
                <option value="NoteImg">Image</option>
                <option value="NoteVideo">Video</option>
                <option value="NoteTodos">Todos</option>
                <option value="NoteAudio">Audio</option>
                <option value="NoteCanvas">Canvas</option>
                <option value="NoteMap">Map</option>
                <option value="NoteRecording">Recording</option>
            </select>
        </section>
    )
}
