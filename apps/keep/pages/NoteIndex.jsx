import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => { loadNotes() }, [])

    function loadNotes() {
        noteService.query().then(notes => {

            const sortedNotes = [...notes].sort((a, b) => (b.isPinned === true) - (a.isPinned === true))
            setNotes(sortedNotes)
        })
    }


    function onAddNote({ txt, type, color }) {
        const noteType = type || 'NoteTxt'
        const note = noteService.getEmptyNote(txt, noteType)

        note.style = { backgroundColor: color }

        noteService.save(note)
            .then(() => {
                showSuccessMsg('✅ Note added!')
                loadNotes()
            })
            .catch(() => showErrorMsg('❌ Failed to add note'))
    }



    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                showSuccessMsg('🗑️ Note deleted!')
                loadNotes()
            })
            .catch(() => showErrorMsg('❌ Failed to delete note'))
    }

    function onEditNote(updatedNote) {
        noteService.save(updatedNote)
            .then(() => showSuccessMsg('✏️ Note updated!'))
            .catch(() => showErrorMsg('❌ Update failed'))
            .finally(loadNotes)
    }

    function onDuplicateNote(note) {
        const duplicate = {
            ...note,
            id: utilService.makeId(),
            createdAt: Date.now(),
            isPinned: false,
        }

        noteService.add(duplicate)
            .then(() => {
                showSuccessMsg('📋 Note duplicated!')
                loadNotes()
            })
            .catch(() => showErrorMsg('❌ Failed to duplicate note'))
    }

    function onTogglePin(note) {
        const updatedNote = { ...note, isPinned: !note.isPinned }

        noteService.save(updatedNote)
            .then(() => {
                showSuccessMsg(updatedNote.isPinned ? '📌 Note pinned!' : '📍 Note unpinned!')
                loadNotes()
            })
            .catch(() => showErrorMsg('❌ Failed to toggle pin'))
    }



    function onResetDemo() {
        const demoNotes = noteService.createDemoNotes()
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

            <NoteList notes={notes} onRemoveNote={onRemoveNote} onEditNote={onEditNote} onDuplicateNote={onDuplicateNote} onTogglePin={onTogglePin} />
        </section>
    )
}
