const { useState } = React

export function NoteImg({ onAddNote }) {
    const [url, setUrl] = useState('')

    function handleKeyPress(ev) {
        if (ev.key === 'Enter' && url.trim()) {
            validateImage(url.trim())
        }
    }

    function validateImage(imageUrl) {
        const img = new Image()
        img.onload = () => {
            onAddNote({ txt: imageUrl, type: 'NoteImg' })
            setUrl('')
            Swal.fire({
                title: '🖼️ Image added!',
                text: 'Your image note was successfully created.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
            })
        }
        img.onerror = () => {
            Swal.fire({
                title: '⚠️ Invalid Image',
                text: 'This URL is not a valid image.',
                icon: 'warning',
                timer: 1800,
                showConfirmButton: false,
            })
        }
        img.src = imageUrl
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
