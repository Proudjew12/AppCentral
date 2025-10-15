const { useState } = React

export function NoteVideo({ onAddNote }) {
    const [url, setUrl] = useState('')

    function handleKeyPress(ev) {
        if (ev.key === 'Enter' && url.trim()) {
            onAddNote({ txt: url.trim(), type: 'NoteVideo' })
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
                placeholder="Enter YouTube URL..."
                className="grow"
            />
        </div>
    )
}
