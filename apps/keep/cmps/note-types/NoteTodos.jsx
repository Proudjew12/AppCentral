const { useState } = React

export function NoteTodos({ onAddNote }) {
    const [list, setList] = useState('')

    function handleKeyPress(ev) {
        if (ev.key === 'Enter' && list.trim()) {
            onAddNote({ txt: list.trim(), type: 'NoteTodos' })
            setList('')
        }
    }

    return (
        <div className="note-type flex row align-center space-between">
            <input
                type="text"
                value={list}
                onChange={(ev) => setList(ev.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter comma-separated list..."
                className="grow"
            />
        </div>
    )
}
