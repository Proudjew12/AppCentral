import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

import { keepService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React

export function NoteIndex() {
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

    function onResetDemo() {
        const demoNotes = keepService.createDemoNotes()
        utilService.saveToStorage('keepDB', demoNotes)
        showSuccessMsg('✨ Demo notes reloaded!')
        loadNotes()
    }

    function onClearAll() {
        localStorage.removeItem('keepDB')
        showSuccessMsg('🗑️ All notes cleared!')
        loadNotes()
    }

    return (
        <section className="keep-index flex column align-center">
            <h2>Keep App</h2>
            <NotePreview onAddNote={onAddNote} />

            <button onClick={onResetDemo}>Reset Demo Notes</button>
            <button onClick={onClearAll}>Clear All Notes</button>

            <NoteList notes={notes} onRemoveNote={onRemoveNote} onEditNote={onEditNote} />
        </section>
    )
}
