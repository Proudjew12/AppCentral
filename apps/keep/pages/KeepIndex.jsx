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

    return (
        <section className="keep-index container">
            <h2>Keep App</h2>
            <TextBox />
            <KeepNotes notes={notes} />
        </section>
    )
}
