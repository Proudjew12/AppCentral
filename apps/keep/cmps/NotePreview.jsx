import { NoteTxt } from './note-types/NoteTxt.jsx'
import { NoteImg } from './note-types/NoteImg.jsx'
import { NoteVideo } from './note-types/NoteVideo.jsx'
import { NoteTodos } from './note-types/NoteTodos.jsx'
import { NoteAudio } from './note-types/NoteAudio.jsx'
import { NoteCanvas } from './note-types/NoteCanvas.jsx'
import { NoteMap } from './note-types/NoteMap.jsx'
import { NoteRecording } from './note-types/NoteRecording.jsx'

import { utilService } from '../../../services/util.service.js'


const { useState } = React

export function NotePreview({ onAddNote }) {
    const [noteType, setNoteType] = useState('NoteTxt')
    const [color, setColor] = useState('#ffffff')

    function handleRandomColor() {
        const random = utilService.getRandomPastelColor()
        setColor(utilService.rgbToHex(random))
    }

    function renderPreviewByType() {
        const commonProps = { onAddNote, color }

        switch (noteType) {
            case 'NoteTxt': return <NoteTxt {...commonProps} />
            case 'NoteImg': return <NoteImg {...commonProps} />
            case 'NoteVideo': return <NoteVideo {...commonProps} />
            case 'NoteTodos': return <NoteTodos {...commonProps} />
            case 'NoteAudio': return <NoteAudio {...commonProps} />
            case 'NoteCanvas': return <NoteCanvas {...commonProps} />
            case 'NoteMap': return <NoteMap {...commonProps} />
            case 'NoteRecording': return <NoteRecording {...commonProps} />
            default: return <NoteTxt {...commonProps} />
        }
    }


    return (
        <section className="note-preview flex column align-center">
            <div className="note-type-btns flex row align-center space-between">
                <button
                    className={noteType === 'NoteTxt' ? 'active' : ''}
                    onClick={() => setNoteType('NoteTxt')}
                    title="Text Note"
                >
                    <i className="fa-solid fa-font"></i>
                </button>

                <button
                    className={noteType === 'NoteImg' ? 'active' : ''}
                    onClick={() => setNoteType('NoteImg')}
                    title="Image Note"
                >
                    <i className="fa-regular fa-image"></i>
                </button>

                <button
                    className={noteType === 'NoteVideo' ? 'active' : ''}
                    onClick={() => setNoteType('NoteVideo')}
                    title="Video Note"
                >
                    <i className="fa-brands fa-youtube"></i>
                </button>

                <button
                    className={noteType === 'NoteTodos' ? 'active' : ''}
                    onClick={() => setNoteType('NoteTodos')}
                    title="Todo Note"
                >
                    <i className="fa-solid fa-list-check"></i>
                </button>

                <button
                    className={noteType === 'NoteAudio' ? 'active' : ''}
                    onClick={() => setNoteType('NoteAudio')}
                    title="Audio Note"
                >
                    <i className="fa-solid fa-music"></i>
                </button>

                <button
                    className={noteType === 'NoteCanvas' ? 'active' : ''}
                    onClick={() => setNoteType('NoteCanvas')}
                    title="Canvas Note"
                >
                    <i className="fa-solid fa-paintbrush"></i>
                </button>

                <button
                    className={noteType === 'NoteMap' ? 'active' : ''}
                    onClick={() => setNoteType('NoteMap')}
                    title="Map Note"
                >
                    <i className="fa-solid fa-map-location-dot"></i>
                </button>

                <button
                    className={noteType === 'NoteRecording' ? 'active' : ''}
                    onClick={() => setNoteType('NoteRecording')}
                    title="Recording Note"
                >
                    <i className="fa-solid fa-microphone"></i>
                </button>

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