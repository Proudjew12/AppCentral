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
        case 'NoteCanvas':
            return {
                type,
                isPinned: false,
                style: { backgroundColor: utilService.getRandomPastelColor() },
                info: { url: txt, title: 'Canvas Drawing 🎨' },
                createdAt: Date.now()
            }
        case 'NoteRecording':
            return {
                type,
                isPinned: false,
                style: { backgroundColor: utilService.getRandomPastelColor() },
                info: { url: txt, title: 'Voice Note 🎤' },
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
        },
        {
            id: 'n105',
            createdAt: Date.now(),
            type: 'NoteAudio',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomPastelColor() },
            info: {
                title: 'Relaxing Demo Music 🎵',
                url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
            }
        },
        {
            id: 'n106',
            createdAt: Date.now(),
            type: 'NoteCanvas',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomPastelColor() },
            info: {
                title: 'My Real Canvas Demo 🎨',
                url: 'data:image/png;base64,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'
            }
        },
        {
            id: 'n107',
            createdAt: Date.now(),
            type: 'NoteRecording',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomPastelColor() },
            info: {
                title: 'Voice Memo 🎤',
                url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
            }
        },

    ]

    utilService.saveToStorage(NOTES_KEY, notes)
    return notes
}
