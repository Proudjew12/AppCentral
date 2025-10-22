const { useState, useEffect } = React

import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'

import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState({ txt: '', type: '' })

    useEffect(() => { loadNotes() }, [filterBy])

    function loadNotes() {
        noteService.query().then(notes => {
            let filtered = notes

            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                filtered = filtered.filter(note =>
                    (note.info.txt && regex.test(note.info.txt)) ||
                    (note.info.title && regex.test(note.info.title)) ||
                    (note.info.url && regex.test(note.info.url))
                )
            }

            if (filterBy.type) {
                filtered = filtered.filter(note => note.type === filterBy.type)
            }

            const sorted = [...filtered].sort((a, b) => (b.isPinned === true) - (a.isPinned === true))
            setNotes(sorted)
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
        const duplicate = { ...note, id: utilService.makeId(), createdAt: Date.now(), isPinned: false }

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

    function toggleMode() {
        document.body.classList.toggle('light-mode')
    }




    return (
        <React.Fragment>
            <section className="keep-index flex column">

                <div className="flex row align-center space-between full-width">
                    <div className="flex row align-center gap-sm">
                        <NoteFilter filterBy={filterBy} onSetFilter={setFilterBy} />
                    </div>

                    <div className="flex row align-center gap-sm">
                        <button onClick={onResetDemo}>Reset Demo Notes</button>
                        <button onClick={onClearAll}>Clear All Notes</button>
                    </div>
                    <div>
                        <button onClick={toggleMode} className="btn-toggle-mode">
                            🌓
                        </button>


                    </div>
                </div>

                <div className="flex row justify-center">
                    <NotePreview onAddNote={onAddNote} />
                </div>

                <NoteList
                    notes={notes}
                    onRemoveNote={onRemoveNote}
                    onEditNote={onEditNote}
                    onDuplicateNote={onDuplicateNote}
                    onTogglePin={onTogglePin}
                />
            </section>



        </React.Fragment>
    )
}
