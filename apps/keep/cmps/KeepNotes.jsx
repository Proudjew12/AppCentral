export function KeepNotes({ notes }) {
    if (!notes || !notes.length) return <p className="text-center">No notes yet...</p>

    return (
        <section className="keep-notes grid">
            {notes.map(note => (
                <article key={note.id} className={`note-card flex column center ${note.color}`}>
                    <p>{note.txt}</p>
                </article>
            ))}
        </section>
    )
}
