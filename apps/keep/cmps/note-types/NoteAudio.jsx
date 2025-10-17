const { useState } = React

export function NoteAudio({ onAddNote, color }) {
    const [url, setUrl] = useState('')

    function isAudioUrl(url) {
        const audioExtensions = /\.(mp3|wav|ogg|m4a|aac|flac)$/i
        const audioSites = /(soundcloud\.com|spotify\.com|mixcloud\.com)/i
        return audioExtensions.test(url) || audioSites.test(url)
    }

    async function handleKeyPress(ev) {
        if (ev.key === 'Enter' && url.trim()) {
            const trimmedUrl = url.trim()

            if (!isAudioUrl(trimmedUrl)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid audio link 🎧',
                    text: 'Please enter a valid audio URL (e.g. .mp3, .wav, or SoundCloud link).',
                    confirmButtonColor: '#5b6caa',
                })
                return
            }

            onAddNote({ txt: trimmedUrl, type: 'NoteAudio', color })
            setUrl('')
            Swal.fire({
                icon: 'success',
                title: 'Audio added 🎶',
                showConfirmButton: false,
                timer: 1200,
            })
        }
    }

    return (
        <div className="note-type flex row align-center space-between">
            <input
                type="text"
                value={url}
                onChange={(ev) => setUrl(ev.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter audio URL (e.g. https://example.com/audio.mp3)"
                className="grow"
            />
        </div>
    )
}
