import { NoteTxt } from './note-types/NoteTxt.jsx'
import { NoteImg } from './note-types/NoteImg.jsx'
import { NoteVideo } from './note-types/NoteVideo.jsx'
import { NoteTodos } from './note-types/NoteTodos.jsx'

const { useState } = React

export function NotePreview({ onAddNote }) {
    const [noteType, setNoteType] = useState('NoteTxt')
    const [color, setColor] = useState('#ffffff') // default color

    function getRandomPastelColor() {
        const r = Math.floor((Math.random() * 127) + 127)
        const g = Math.floor((Math.random() * 127) + 127)
        const b = Math.floor((Math.random() * 127) + 127)
        return `rgb(${r}, ${g}, ${b})`
    }

    function handleRandomColor() {
        const random = getRandomPastelColor()
        setColor(rgbToHex(random))
    }

    function rgbToHex(rgb) {
        const rgbValues = rgb.match(/\d+/g)
        const hex = rgbValues
            .map(x => parseInt(x).toString(16).padStart(2, '0'))
            .join('')
        return `#${hex}`
    }

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

                <button onClick={() => setNoteType('NoteAudio')}><i className="fa-solid fa-music"></i></button>
                <button onClick={() => setNoteType('NoteCanvas')}><i className="fa-solid fa-paintbrush"></i></button>
                <button onClick={() => setNoteType('NoteMap')}><i className="fa-solid fa-map-location-dot"></i></button>
                <button onClick={() => setNoteType('NoteRecording')}><i className="fa-solid fa-microphone"></i></button>


                <input
                    type="color"
                    value={color}
                    onChange={(ev) => setColor(ev.target.value)}
                    title="Pick note color"
                    className="color-picker"
                />

                <button
                    type="button"
                    onClick={handleRandomColor}
                    title="Random pastel color"
                    className="random-color-btn"
                >
                    <i className="fa-solid fa-dice"></i>
                </button>
            </div>

            {renderPreviewByType()}
        </section>
    )
}