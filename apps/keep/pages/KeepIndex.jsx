import { TextBox } from '../cmps/Textbox.jsx'
import { KeepNotes } from '../cmps/KeepNotes.jsx'
import { keepService } from '../services/keep.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React

export function KeepIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => { loadNotes() }, [])

    function loadNotes() {
        keepService.query().then(setNotes)
    }

    function onAddNote(txt) {
        const note = keepService.getEmptyNote(txt)
        keepService.save(note)
            .then(() => {
                showSuccessMsg('✅ Note added!')
                loadNotes()
            })
            .catch(() => showErrorMsg('❌ Failed to add note'))
    }

    function onRemoveNote(noteId) {
        keepService.remove(noteId)
            .then(() => {
                showSuccessMsg('🗑️ Note deleted!')
                loadNotes()
            })
            .catch(() => showErrorMsg('❌ Failed to delete note'))
    }

    function onEditNote(updatedNote) {
        keepService.save(updatedNote)
            .then(() => showSuccessMsg('✏️ Note updated!'))
            .catch(() => showErrorMsg('❌ Update failed'))
            .finally(loadNotes)
    }

    return (
        <section className="keep-index flex column align-center">
            <h2>Keep App</h2>
            <TextBox onAddNote={onAddNote} />
            <button onClick={() => { localStorage.removeItem('keepDB'); loadNotes() }}>
                Reset Demo Notes
            </button>
            <KeepNotes notes={notes} onRemoveNote={onRemoveNote} onEditNote={onEditNote} />
        </section>
    )
}
