import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { mailService } from '../../mail/services/mail.service.js'
import { CustomAudioPlayer } from './CustomPlayer.jsx'

const { Link, useSearchParams } = ReactRouterDOM
export function NoteList({ notes, onRemoveNote, onEditNote, onDuplicateNote, onTogglePin }) {
    if (!notes || !notes.length)
        return (
            <div className="keep-empty flex column align-center justify-center">
                <img src="assets/icons/lightbulb.svg" alt="No notes" className="keep-empty-icon" />
                <p>Notes you add appear here</p>
            </div>
        )

    async function onNoteClick(note) {
        if (note.type === 'NoteTodos') {
            const currentTitle = note.info.title || ''
            const currentTodos = (note.info.todos || []).map(todo => todo.txt).join(', ')

            const { value: formValues, isDenied, dismiss, isConfirmed } = await Swal.fire({
                title: '📝 Edit Todo Note',
                html: `
                    <input id="swal-input1" class="swal2-input" placeholder="Title" value="${currentTitle}">
                    <textarea id="swal-input2" class="swal2-textarea" placeholder="Todos (comma separated)">${currentTodos}</textarea>
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Save',
                cancelButtonText: '📋 Duplicate',
                showDenyButton: true,
                denyButtonText: '🗑️ Delete',
                background: (note.style && note.style.backgroundColor) || '#fff',
                color: '#111',
                reverseButtons: true,
                preConfirm: () => {
                    const title = document.getElementById('swal-input1').value
                    const todosText = document.getElementById('swal-input2').value
                    return { title, todosText }
                }
            })

            if (isDenied) return onRemoveNote(note.id)
            if (dismiss === Swal.DismissReason.cancel) return onDuplicateNote(note)

            if (isConfirmed && formValues) {
                const todos = formValues.todosText
                    .split(',')
                    .map(txt => ({ txt: txt.trim(), doneAt: null }))
                    .filter(todo => todo.txt)

                const updatedNote = {
                    ...note,
                    info: { ...note.info, title: formValues.title.trim(), todos }
                }

                onEditNote(updatedNote)
                showSuccessMsg('✅ Todo note updated!')
            }
            return
        }

        if (note.type === 'NoteCanvas') {
            const result = await Swal.fire({
                title: note.info.title || 'Canvas Drawing 🎨',
                html: `
                    <img src="${note.info.url || note.info.txt}" 
                        alt="Canvas drawing" 
                        style="width: 100%; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.2)" />
                `,
                showCancelButton: true,
                confirmButtonText: '📋 Duplicate',
                cancelButtonText: '🗑️ Delete',
                reverseButtons: true,
                background: (note.style && note.style.backgroundColor) || '#fff',
                color: '#111',
            })

            if (result.isDismissed) return
            if (result.isConfirmed) return onDuplicateNote(note)
            return onRemoveNote(note.id)
        }

        const result = await Swal.fire({
            title: '🗒️ Note Options',
            input: 'textarea',
            inputValue: note.info.body || note.info.txt || note.info.url || note.info.title || '',
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

        if (result.isDenied) return onRemoveNote(note.id)
        if (result.dismiss === Swal.DismissReason.cancel) return onDuplicateNote(note)

        if (result.isConfirmed && result.value !== undefined) {
            let updatedNote = { ...note }

            switch (note.type) {
                case 'NoteTxt':
                    updatedNote.info.txt = result.value
                    break
                case 'NoteImg':
                case 'NoteVideo':
                    updatedNote.info.url = result.value
                case 'NoteMail':
                    updatedNote.info.body = result.value
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
                            onError={(ev) => (ev.target.style.display = 'none')}
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
                                <li key={idx} className={todo.doneAt ? 'done' : ''}>
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

            case 'NoteAudio':
            case 'NoteRecording':
                const audioSrc = note.info.url || note.info.txt
                return (
                    <div className="note-audio flex column align-center justify-center grow">
                        <CustomAudioPlayer src={audioSrc} />
                        {note.info.title && <p>{note.info.title}</p>}
                    </div>
                )

            case 'NoteCanvas':
                const canvasImg = note.info.url || note.info.txt
                return (
                    <div
                        className="note-canvas flex column align-center justify-center grow"
                        style={{ width: '100%', padding: '0.5em' }}
                    >
                        <img src={canvasImg} alt={note.info.title || 'Canvas drawing'} />
                        {note.info.title && (
                            <p style={{ marginTop: '8px', fontWeight: 500 }}>{note.info.title}</p>
                        )}
                    </div>
                )

            case 'NoteMap':
                return (
                    <div
                        className="note-map-preview flex column align-start grow"
                        dangerouslySetInnerHTML={{ __html: note.info.txt }}
                    ></div>
                )
            case 'NoteMail':
                return (
                    <div
                        className="note-todos flex column align-start justify-center grow"
                    >
                        <h4>To: {note.info.to}</h4>
                        <p>Subject: {note.info.title}</p>
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
    function onMoveData(ev,note) {
        ev.stopPropagation()
        const body = note.info.todos.map(
            todo=>todo.txt
        ).join(' ')
        const mail = {
            id: '',
            createdAt: Date.now(),
            subject: note.info.title,
            body: body,
            isRead: true,
            sentAt: Date.now(),
            removedAt: null,
            from: mailService.getUser().email,
            to: "Notes@mails.com",
            starred: false
        }
        mailService.save(mail)
        
        
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
                   {(note.type === 'NoteTodos')?<Link to='/mail'><button onClick={(ev)=>{onMoveData(ev,note)}}><MailIcon /></button></Link>:''} 
                </article>
            ))}
        </section>
    )
}
function MailIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg"
        height="24px" viewBox="0 -960 960 960" width="24px"
        fill="#1f1f1f"><path d="M160-160q-33 0-56.5-23.5T80-240v
      -480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0
       33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480
       -440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
}
