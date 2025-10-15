import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export function NoteList({ notes, onRemoveNote, onEditNote }) {
    if (!notes || !notes.length) return <p className="text-center">No notes yet...</p>

    async function onNoteClick(note) {
        const result = await Swal.fire({
            title: '🗒️ Edit Note',
            input: 'textarea',
            inputValue: note.info.txt || note.info.url || note.info.title || '',
            inputPlaceholder: 'Edit your note...',
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
            showDenyButton: true,
            denyButtonText: '🗑️ Delete',
            background: (note.style && note.style.backgroundColor) || '#fff',
            color: '#111',
        })

        if (result.isDenied) return onRemoveNote(note.id)

        if (result.isConfirmed && result.value !== undefined) {
            let updatedNote = { ...note }

            switch (note.type) {
                case 'NoteTxt':
                    updatedNote.info.txt = result.value
                    break
                case 'NoteImg':
                case 'NoteVideo':
                    updatedNote.info.url = result.value
                    break
                case 'NoteTodos':
                    updatedNote.info.title = result.value
                    break
            }

            onEditNote(updatedNote)
            showSuccessMsg('✅ Note updated!')
        }
    }


    function renderNoteContent(note) {
        switch (note.type) {
            case 'NoteTxt':
                return <p>{note.info.txt}</p>

            case 'NoteImg':
                return (
                    <div className="note-img flex column align-center">
                        <img
                            src={note.info.url}
                            alt={note.info.title || 'Note image'}
                            style={{ maxWidth: '100%', borderRadius: '6px' }}
                            onError={(ev) => ev.target.style.display = 'none'}
                        />
                        {note.info.title && <p>{note.info.title}</p>}
                    </div>
                )

            case 'NoteTodos':
                return (
                    <div className="note-todos">
                        <h4>{note.info.title}</h4>
                        <ul className="clean-list">
                            {note.info.todos.map(function (todo, idx) {
                                return (
                                    <li
                                        key={idx}
                                        style={{ textDecoration: todo.doneAt ? 'line-through' : 'none' }}
                                    >
                                        {todo.txt}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )

            case 'NoteVideo':
                const embedUrl = getEmbedUrl(note.info.url)
                return (
                    <div className="note-video flex column align-center">
                        <iframe
                            style={{ width: '100%', aspectRatio: '16 / 9', borderRadius: '8px' }}
                            src={embedUrl}
                            title={note.info.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <p>{note.info.title}</p>
                    </div>
                )

            default:
                return <p>Unsupported note type</p>
        }
    }

    function getEmbedUrl(url) {
        if (!url) return ''
        if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/')
        if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'www.youtube.com/embed/')
        return url
    }

    return (
        <section className="keep-notes grid">
            {notes.map(function (note) {
                return (
                    <article
                        key={note.id}
                        className="note-card flex column align-center"
                        style={{
                            backgroundColor:
                                (note.style && note.style.backgroundColor) ||
                                note.color ||
                                '#fff',
                        }}
                        onClick={function () { onNoteClick(note) }}
                    >
                        {renderNoteContent(note)}
                    </article>
                )
            })}
        </section>
    )
}
