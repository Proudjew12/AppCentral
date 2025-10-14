import { TextBox } from '../cmps/Textbox.jsx'
import { KeepNotes } from '../cmps/KeepNotes.jsx'


export function KeepIndex() {
    return (
        <section className="keep-index container">
            <h2>Keep App</h2>
            <TextBox />
            <KeepNotes />
        </section>
    )
}