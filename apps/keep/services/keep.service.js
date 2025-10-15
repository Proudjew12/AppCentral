import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'keepDB'

export const keepService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    _createDemoNotes
}

const COLOR_CLASSES = ['note-yellow', 'note-pink', 'note-green', 'note-blue', 'note-purple', 'note-orange']

function query() {
    return storageService.query(NOTES_KEY).then(notes => {
        if (!notes || !notes.length) {
            notes = _createDemoNotes()
            utilService.saveToStorage(NOTES_KEY, notes)
        }
        return notes
    })
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) return storageService.put(NOTES_KEY, note)
    else return storageService.post(NOTES_KEY, note)
}

function getEmptyNote(txt = '') {
    return {
        txt,
        color: utilService.getRandomPastelColor(),
        createdAt: Date.now()
    }
}



function _createDemoNotes() {
    return [
        getEmptyNote('Buy milk and coffee ☕🥛'),
        getEmptyNote('Call mom ❤️'),
        getEmptyNote('Finish React Keep project 🚀')
    ]
}
