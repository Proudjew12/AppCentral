const { useRef, useState, useEffect } = React

export function NoteCanvas({ onAddNote, color }) {
    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.lineCap = 'round'
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 2
        ctxRef.current = ctx
    }, [])

    function getMousePos(e) {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        }
    }

    function handleMouseDown(e) {
        const { x, y } = getMousePos(e)
        ctxRef.current.beginPath()
        ctxRef.current.moveTo(x, y)
        setIsDrawing(true)
    }

    function handleMouseUp() {
        setIsDrawing(false)
    }

    function handleMouseMove(e) {
        if (!isDrawing) return
        const { x, y } = getMousePos(e)
        ctxRef.current.lineTo(x, y)
        ctxRef.current.stroke()
    }

    function handleTouchStart(e) {
        handleMouseDown(e.touches[0])
    }

    function handleTouchMove(e) {
        handleMouseMove(e.touches[0])
    }

    function handleTouchEnd() {
        handleMouseUp()
    }

    function saveCanvas() {
        const dataUrl = canvasRef.current.toDataURL()
        onAddNote({ txt: dataUrl, type: 'NoteCanvas', color })
    }

    return (
        <div className="note-type flex column align-center">
            <canvas
                ref={canvasRef}
                width="300"
                height="200"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    border: '2px solid #aaa',
                    borderRadius: '10px',
                    cursor: 'crosshair',
                    backgroundColor: '#fff',
                }}
            ></canvas>

            <button onClick={saveCanvas} style={{ marginTop: '8px' }}>
                Save Drawing 🖼️
            </button>
        </div>
    )
}
