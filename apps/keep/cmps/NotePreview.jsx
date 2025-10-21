const { useState } = React

import { NoteTxt } from './note-types/NoteTxt.jsx'
import { NoteImg } from './note-types/NoteImg.jsx'
import { NoteVideo } from './note-types/NoteVideo.jsx'
import { NoteTodos } from './note-types/NoteTodos.jsx'
import { NoteAudio } from './note-types/NoteAudio.jsx'
import { NoteCanvas } from './note-types/NoteCanvas.jsx'
import { NoteMap } from './note-types/NoteMap.jsx'
import { NoteRecording } from './note-types/NoteRecording.jsx'
import { utilService } from '../../../services/util.service.js'

export function NotePreview({ onAddNote }) {
    const [noteType, setNoteType] = useState('NoteTxt')
    const [color, setColor] = useState('#ffffff')
    const [isExpanded, setIsExpanded] = useState(false)

    function handleRandomColor() {
        const random = utilService.getRandomPastelColor()
        setColor(utilService.rgbToHex(random))
    }

    function handleAddNote(noteData) {
        onAddNote(noteData)
        setIsExpanded(false)
    }

    function handleExpand() {
        setIsExpanded(true)
    }

    function handleCollapse() {
        setIsExpanded(false)
    }

    function renderPreviewByType() {
        const commonProps = { onAddNote: handleAddNote, color }
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
        <React.Fragment>
            {isExpanded && <div className="note-overlay" onClick={handleCollapse}></div>}

            <section
                className={`note-preview flex grow column ${isExpanded ? 'expanded' : 'collapsed'}`}
                onClick={handleExpand}
            >
                {!isExpanded && (
                    <p className="collapsed-placeholder grow flex align-center">
                        Take a note...
                    </p>
                )}


                {isExpanded && (
                    <div className="note-type-btns flex row align-center space-between grow">
                        <button onClick={() => setNoteType('NoteTxt')} title="Text"><i className="fa-solid fa-font"></i></button>
                        <button onClick={() => setNoteType('NoteImg')} title="Image"><i className="fa-regular fa-image"></i></button>
                        <button onClick={() => setNoteType('NoteVideo')} title="Video"><i className="fa-brands fa-youtube"></i></button>
                        <button onClick={() => setNoteType('NoteTodos')} title="Todos"><i className="fa-solid fa-list-check"></i></button>
                        <button onClick={() => setNoteType('NoteAudio')} title="Audio"><i className="fa-solid fa-music"></i></button>
                        <button onClick={() => setNoteType('NoteCanvas')} title="Canvas"><i className="fa-solid fa-paintbrush"></i></button>
                        <button onClick={() => setNoteType('NoteMap')} title="Map"><i className="fa-solid fa-map-location-dot"></i></button>
                        <button onClick={() => setNoteType('NoteRecording')} title="Recording"><i className="fa-solid fa-microphone"></i></button>
                        <input type="color" value={color} onChange={(ev) => setColor(ev.target.value)} className="color-picker" />
                        <button type="button" onClick={handleRandomColor} className="random-color-btn"><i className="fa-solid fa-dice"></i></button>
                    </div>
                )}

                <div className="grow flex column align-center">
                    {renderPreviewByType()}
                </div>
            </section>
        </React.Fragment>
    )
}
