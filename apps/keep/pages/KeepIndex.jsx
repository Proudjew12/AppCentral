const { useState, useEffect } = React

import { TextBox } from '../cmps/Textbox.jsx'
import { KeepNotes } from '../cmps/KeepNotes.jsx'
import { keepService } from '../services/keep.service.js'

export function KeepIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        keepService.query().then(setNotes)
    }

    function onAddNote(txt) {
        const note = keepService.getEmptyNote(txt)
        keepService.save(note).then(loadNotes)
    }


    return (
        <section className="keep-index container">
            <h2>Keep App</h2>
            <TextBox />
            <button onClick={() => { localStorage.removeItem('keepDB'); loadNotes() }}>
                Reset Demo Notes
            </button>

            <KeepNotes notes={notes} />
        </section>
    )
}
