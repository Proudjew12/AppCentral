const { useState } = React

export function KeepNotes({ notes, onRemoveNote, onEditNote }) {
    const [editingId, setEditingId] = useState(null)
    const [editTxt, setEditTxt] = useState('')

    if (!notes || !notes.length) return <p className="text-center">No notes yet...</p>

    function startEdit(note) {
        setEditingId(note.id)
        setEditTxt(note.txt)
    }

    function saveEdit(note) {
        const updatedNote = { ...note, txt: editTxt }
        onEditNote(updatedNote)
        setEditingId(null)
        setEditTxt('')
    }

    return (
        <section className="keep-notes grid">
            {notes.map(note => (
                <article key={note.id} className="note-card flex column center"
                    style={{ backgroundColor: note.color }}>

                    {editingId === note.id ? (
                        <input
                            className="note-edit-input"
                            value={editTxt}
                            onChange={(ev) => setEditTxt(ev.target.value)}
                            onBlur={() => saveEdit(note)}
                            autoFocus
                        />
                    ) : (
                        <p onClick={() => startEdit(note)}>{note.txt}</p>
                    )}

                    <button className="btn-delete" onClick={() => onRemoveNote(note.id)}>🗑️</button>
                </article>
            ))}
        </section>
    )
}
