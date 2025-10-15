import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export function KeepNotes({ notes, onRemoveNote, onEditNote }) {
    if (!notes || !notes.length) return <p className="text-center">No notes yet...</p>

    async function onNoteClick(note) {
        const result = await Swal.fire({
            title: '🗒️ Your Note',
            text: note.txt,
            showCancelButton: true,
            confirmButtonText: '✏️ Edit',
            cancelButtonText: 'Close',
            showDenyButton: true,
            denyButtonText: '🗑️ Delete',
            background: note.color,
            color: '#111',
        })

        if (result.isDenied) {
            onRemoveNote(note.id)
            return
        }
        if (result.isConfirmed) {
            const { value: newTxt } = await Swal.fire({
                title: '✏️ Edit Note',
                input: 'textarea',
                inputValue: note.txt,
                inputPlaceholder: 'Edit your note here...',
                showCancelButton: true,
                confirmButtonText: 'Save',
                cancelButtonText: 'Cancel',
                inputAttributes: {
                    'aria-label': 'Note content',
                },
                background: note.color,
                color: '#111',
            })

            if (newTxt && newTxt !== note.txt) {
                const updatedNote = { ...note, txt: newTxt }
                onEditNote(updatedNote)
                showSuccessMsg('✏️ Note updated!')
            } else if (newTxt === '') {
                showErrorMsg('❌ Cannot save empty note')
            }
        }
    }

    return (
        <section className="keep-notes grid">
            {notes.map((note, idx) => (
                <article
                    key={note.id || idx}
                    className="note-card flex column center"
                    style={{ backgroundColor: note.color }}
                    onClick={() => onNoteClick(note)}
                >
                    <p>{note.txt}</p>
                </article>
            ))}

        </section>
    )
}
