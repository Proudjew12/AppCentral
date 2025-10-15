import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'keepDB'

export const keepService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    createDemoNotes
}

const COLOR_CLASSES = ['note-yellow', 'note-pink', 'note-green', 'note-blue', 'note-purple', 'note-orange']

async function query() {
    try {
        return await storageService.query(NOTES_KEY)
    } catch (err) {
        console.error('Failed to load notes:', err)
        localStorage.removeItem(NOTES_KEY)
        return []
    }
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



function createDemoNotes() {
    return [
        getEmptyNote('Buy milk and coffee ☕🥛'),
        getEmptyNote('Call mom ❤️'),
        getEmptyNote('Finish React Keep project 🚀')
    ].map(note => ({ ...note, id: utilService.makeId() }))
}

