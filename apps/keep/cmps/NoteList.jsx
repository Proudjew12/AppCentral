import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export function NoteList({ notes, onRemoveNote, onEditNote, onDuplicateNote, onTogglePin }) {
    if (!notes || !notes.length) return <p className="text-center">No notes yet...</p>

    async function onNoteClick(note) {
        const result = await Swal.fire({
            title: '🗒️ Note Options',
            input: 'textarea',
            inputValue: note.info.txt || note.info.url || note.info.title || '',
            inputPlaceholder: 'Edit your note...',
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: '📋 Duplicate',
            showDenyButton: true,
            denyButtonText: '🗑️ Delete',
            reverseButtons: true,
            background: (note.style && note.style.backgroundColor) || '#fff',
            color: '#111',
        })

        if (result.isDenied) {
            onRemoveNote(note.id)
            return
        }

        if (result.dismiss === Swal.DismissReason.cancel) {
            onDuplicateNote(note)
            return
        }

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
                    <div className="note-img flex column align-center justify-center grow">
                        <img
                            src={note.info.url}
                            alt={note.info.title || 'Note image'}
                            onError={(ev) => ev.target.style.display = 'none'}
                        />
                        {note.info.title && <p>{note.info.title}</p>}
                    </div>
                )

            case 'NoteTodos':
                return (
                    <div className="note-todos flex column align-start justify-center grow">
                        <h4>{note.info.title}</h4>
                        <ul className="clean-list">
                            {note.info.todos.map((todo, idx) => (
                                <li
                                    key={idx}
                                    className={todo.doneAt ? 'done' : ''}
                                >
                                    {todo.txt}
                                </li>
                            ))}
                        </ul>
                    </div>
                )

            case 'NoteVideo':
                const embedUrl = getEmbedUrl(note.info.url)
                return (
                    <div className="note-video flex column align-center justify-center grow">
                        <iframe
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
            {notes.map(note => (
                <article
                    key={note.id}
                    className={`note-card flex column align-center justify-between ${note.isPinned ? 'pinned' : ''}`}
                    style={{
                        backgroundColor:
                            (note.style && note.style.backgroundColor) ||
                            note.color ||
                            '#fff',
                    }}
                    onClick={() => onNoteClick(note)}
                >

                    <button
                        className={`btn-pin ${note.isPinned ? 'active' : ''}`}
                        title={note.isPinned ? 'Unpin note' : 'Pin note'}
                        onClick={(ev) => {
                            ev.stopPropagation()
                            onTogglePin(note)
                        }}
                    >
                        <i className="fa-solid fa-thumbtack"></i>
                    </button>

                    {renderNoteContent(note)}
                </article>

            ))}
        </section>
    )
}
