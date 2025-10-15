const { useRef, useEffect } = React

export function NoteCanvas({ onAddNote, color }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, 250, 150)
    }, [])

    function saveCanvas() {
        const dataUrl = canvasRef.current.toDataURL()
        onAddNote({ txt: dataUrl, type: 'NoteCanvas', color })
    }

    return (
        <div className="note-type flex column align-center">
            <canvas
                ref={canvasRef}
                width="250"
                height="150"
                style={{ border: '1px solid #ccc', borderRadius: '8px' }}
            ></canvas>
            <button onClick={saveCanvas}>Save Canvas</button>
        </div>
    )
}
