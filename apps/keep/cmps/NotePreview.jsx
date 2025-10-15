import { NoteTxt } from './note-types/NoteTxt.jsx'
import { NoteImg } from './note-types/NoteImg.jsx'
import { NoteVideo } from './note-types/NoteVideo.jsx'
import { NoteTodos } from './note-types/NoteTodos.jsx'

const { useState } = React

export function NotePreview({ onAddNote }) {
    const [noteType, setNoteType] = useState('NoteTxt')
    const [color, setColor] = useState('#ffffff') // default color

    function renderPreviewByType() {
        const commonProps = { onAddNote, color }

        switch (noteType) {
            case 'NoteTxt': return <NoteTxt {...commonProps} />
            case 'NoteImg': return <NoteImg {...commonProps} />
            case 'NoteVideo': return <NoteVideo {...commonProps} />
            case 'NoteTodos': return <NoteTodos {...commonProps} />
        }
    }

    return (
        <section className="note-preview flex column align-center">
            <div className="note-type-btns flex row align-center space-between">
                <button className={noteType === 'NoteTxt' ? 'active' : ''} onClick={() => setNoteType('NoteTxt')}>
                    <i className="fa-solid fa-font"></i>
                </button>
                <button className={noteType === 'NoteImg' ? 'active' : ''} onClick={() => setNoteType('NoteImg')}>
                    <i className="fa-regular fa-image"></i>
                </button>
                <button className={noteType === 'NoteVideo' ? 'active' : ''} onClick={() => setNoteType('NoteVideo')}>
                    <i className="fa-brands fa-youtube"></i>
                </button>
                <button className={noteType === 'NoteTodos' ? 'active' : ''} onClick={() => setNoteType('NoteTodos')}>
                    <i className="fa-solid fa-list-check"></i>
                </button>

                <input
                    type="color"
                    value={color}
                    onChange={(ev) => setColor(ev.target.value)}
                    title="Pick note color"
                    className="color-picker"
                />
            </div>

            {renderPreviewByType()}
        </section>
    )
}