const { useState } = React

export function NoteAudio({ onAddNote, color }) {
    const [url, setUrl] = useState('')

    function handleKeyPress(ev) {
        if (ev.key === 'Enter' && url.trim()) {
            onAddNote({ txt: url.trim(), type: 'NoteAudio', color })
            setUrl('')
        }
    }

    return (
        <div className="note-type flex row align-center space-between">
            <input
                type="text"
                value={url}
                onChange={(ev) => setUrl(ev.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter audio URL..."
                className="grow"
            />
        </div>
    )
}
