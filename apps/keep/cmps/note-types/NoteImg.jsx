const { useState } = React

export function NoteImg({ onAddNote }) {
    const [url, setUrl] = useState('')

    function handleKeyPress(ev) {
        if (ev.key === 'Enter' && url.trim()) {
            onAddNote({ txt: url.trim(), type: 'NoteImg' })
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
                placeholder="Enter image URL..."
                className="grow"
            />
        </div>
    )
}
