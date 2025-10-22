const { useState } = React

export function NoteTodos({ onAddNote, color }) {
    const [title, setTitle] = useState('')
    const [todosText, setTodosText] = useState('')

    function handleAddNote() {
        if (!title.trim() && !todosText.trim()) return

        const todos = todosText
            .split(/[,|\n]/)
            .map(txt => txt.trim())
            .filter(txt => txt)
            .map(txt => ({ txt, doneAt: null }))

        const newNote = {
            type: 'NoteTodos',
            color,
            info: {
                title: title.trim() || 'New todo list',
                todos,
                txt: title.trim() || 'New todo list',
            },
            style: { backgroundColor: color },
            isPinned: false,
        }

        onAddNote(newNote)
        setTitle('')
        setTodosText('')
    }

    function handleKeyPress(ev) {
        if (ev.key === 'Enter') handleAddNote()
    }

    return (
        <div className="note-type flex column gap-sm">
            <input
                type="text"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                placeholder="Enter title..."
            />
            <input
                type="text"
                value={todosText}
                onChange={(ev) => setTodosText(ev.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter todos (comma or new line separated)..."
            />
            <button onClick={handleAddNote}>Add Todo Note</button>
        </div>
    )
}
