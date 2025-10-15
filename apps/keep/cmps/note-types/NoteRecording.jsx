const { useState, useRef } = React

export function NoteRecording({ onAddNote, color }) {
    const [recording, setRecording] = useState(false)
    const [audioUrl, setAudioUrl] = useState('')
    const mediaRecorderRef = useRef(null)
    const chunksRef = useRef([])

    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            mediaRecorderRef.current = new MediaRecorder(stream)
            chunksRef.current = []

            mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data)
            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
                const url = URL.createObjectURL(blob)
                setAudioUrl(url)
                onAddNote({ txt: url, type: 'NoteRecording', color })
            }

            mediaRecorderRef.current.start()
            setRecording(true)
        } catch (err) {
            alert('🎙️ Microphone access denied')
        }
    }

    function stopRecording() {
        mediaRecorderRef.current.stop()
        setRecording(false)
    }

    return (
        <div className="note-type flex column align-center">
            <button onClick={recording ? stopRecording : startRecording}>
                {recording ? '⏹ Stop Recording' : '🎙️ Start Recording'}
            </button>

            {audioUrl && <audio controls src={audioUrl}></audio>}
        </div>
    )
}
