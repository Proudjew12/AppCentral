const { useState } = React

export function NoteMap({ onAddNote, color }) {
    const [location, setLocation] = useState('')

    function handleKeyPress(ev) {
        if (ev.key === 'Enter' && location.trim()) {
            const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(location)}`
            onAddNote({ txt: mapUrl, type: 'NoteMap', color })
            setLocation('')
        }
    }

    return (
        <div className="note-type flex row align-center space-between">
            <input
                type="text"
                value={location}
                onChange={(ev) => setLocation(ev.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter location or address..."
                className="grow"
            />
        </div>
    )
}
