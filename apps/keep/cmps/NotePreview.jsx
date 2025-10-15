const { useState } = React

export function NotePreview({ onAddNote }) {
    const [text, setText] = useState('')
    const [noteType, setNoteType] = useState('text') // text | image | video | todos
    const [isFocused, setIsFocused] = useState(false)

    function handleKeyPress(ev) {
        if (ev.key === 'Enter' && text.trim()) {
            onAddNote({ txt: text.trim(), type: noteType })
            setText('')
            setIsFocused(false)
        }
    }

    function getPlaceholder() {
        switch (noteType) {
            case 'image': return 'Enter image URL...'
            case 'video': return 'Enter video URL...'
            case 'todos': return 'Enter comma separated list...'
            default: return 'Take a note...'
        }
    }

    return (
        <section className={`note-preview flex row align-center space-between ${isFocused ? 'active' : ''}`}>
            <input
                type="text"
                value={text}
                onChange={(ev) => setText(ev.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={getPlaceholder()}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="grow"
            />

            <div className="note-type-btns flex row align-center">
                <button
                    className={noteType === 'text' ? 'active' : ''}
                    title="Text note"
                    onClick={() => setNoteType('text')}
                >
                    <i className="fa-solid fa-font"></i>
                </button>
                <button
                    className={noteType === 'image' ? 'active' : ''}
                    title="Image note"
                    onClick={() => setNoteType('image')}
                >
                    <i className="fa-regular fa-image"></i>
                </button>
                <button
                    className={noteType === 'video' ? 'active' : ''}
                    title="Video note"
                    onClick={() => setNoteType('video')}
                >
                    <i className="fa-brands fa-youtube"></i>
                </button>
                <button
                    className={noteType === 'todos' ? 'active' : ''}
                    title="Todo list"
                    onClick={() => setNoteType('todos')}
                >
                    <i className="fa-solid fa-list-check"></i>
                </button>
            </div>
        </section>
    )
}
