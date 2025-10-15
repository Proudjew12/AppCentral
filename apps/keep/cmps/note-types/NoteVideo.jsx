const { useState } = React

export function NoteVideo({ onAddNote }) {
    const [url, setUrl] = useState('')

    function handleKeyPress(ev) {
        if (ev.key === 'Enter' && url.trim()) {
            onAddNote({ txt: inputValue, type: 'NoteImg', color })
            validateVideo(url.trim())
        }
    }

    function validateVideo(videoUrl) {
        const embedUrl = getEmbedUrl(videoUrl)

        const isYouTube = /youtu\.?be/.test(videoUrl)
        if (!isYouTube) {
            Swal.fire({
                title: '⚠️ Invalid Video',
                text: 'This URL is not a valid YouTube video link.',
                icon: 'warning',
                timer: 1800,
                showConfirmButton: false,
            })
            return
        }

        onAddNote({ txt: embedUrl, type: 'NoteVideo' })
        setUrl('')
        Swal.fire({
            title: '🎬 Video added!',
            text: 'Your video note was successfully created.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
        })
    }

    function getEmbedUrl(url) {
        if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/')
        if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'www.youtube.com/embed/')
        return url
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
