import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'keepDB'

export const noteService = {
    query,
    get,
    remove,
    save,
    add,
    getEmptyNote,
    createDemoNotes
}

function query() {
    return storageService.query(NOTES_KEY)
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

function getEmptyNote(txt = '', type = 'NoteTxt') {
    switch (type) {
        case 'NoteTxt':
            return {
                type,
                isPinned: false,
                style: { backgroundColor: utilService.getRandomPastelColor() },
                info: { txt },
                createdAt: Date.now()
            }

        case 'NoteImg':
            return {
                type,
                isPinned: false,
                style: { backgroundColor: utilService.getRandomPastelColor() },
                info: { url: txt, title: 'New image note' },
                createdAt: Date.now()
            }

        case 'NoteVideo':
            const embedUrl = txt.includes('watch?v=')
                ? txt.replace('watch?v=', 'embed/')
                : txt.includes('youtu.be/')
                    ? txt.replace('youtu.be/', 'www.youtube.com/embed/')
                    : txt

            return {
                type,
                isPinned: false,
                style: { backgroundColor: utilService.getRandomPastelColor() },
                info: { url: embedUrl, title: 'New video note' },
                createdAt: Date.now()
            }

        case 'NoteTodos':
            const todos = txt.split(',').map(todo => ({ txt: todo.trim(), doneAt: null }))
            return {
                type,
                isPinned: false,
                style: { backgroundColor: utilService.getRandomPastelColor() },
                info: { title: 'New todo list', todos },
                createdAt: Date.now()
            }
        case 'NoteAudio':
            return {
                type,
                isPinned: false,
                style: { backgroundColor: utilService.getRandomPastelColor() },
                info: { url: txt, title: 'Audio Note 🎵' },
                createdAt: Date.now()
            }


        default:
            return {
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: utilService.getRandomPastelColor() },
                info: { txt },
                createdAt: Date.now()
            }
    }
}

function add(note) {
    return storageService.post(NOTES_KEY, note)
}

function createDemoNotes() {
    localStorage.removeItem(NOTES_KEY)

    const notes = [
        {
            id: 'n101',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomPastelColor() },
            info: { txt: 'Fullstack Me Baby!' }
        },
        {
            id: 'n102',
            createdAt: 1112223,
            type: 'NoteImg',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomPastelColor() },
            info: {
                url: 'https://picsum.photos/300/200',
                title: 'Random nature photo 🌿'
            }
        },
        {
            id: 'n103',
            createdAt: 1112224,
            type: 'NoteTodos',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomPastelColor() },
            info: {
                title: 'Get my stuff together',
                todos: [
                    { txt: 'Driving license', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 }
                ]
            }
        },
        {
            id: 'n104',
            createdAt: 1112225,
            type: 'NoteVideo',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomPastelColor() },
            info: {
                title: 'Amazing Ocean Waves 🌊',
                url: 'https://www.youtube.com/embed/sU76IpHtRTI'
            }
        }
    ]

    utilService.saveToStorage(NOTES_KEY, notes)
    return notes
}
