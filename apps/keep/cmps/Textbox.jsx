const { useState } = React

export function TextBox({ onAddNote }) {
    const [text, setText] = useState('')

    function handleKeyPress(ev) {
        if (ev.key === 'Enter' && text.trim()) {
            onAddNote(text.trim())
            setText('')
        }
    }

    return (
        <section className="text-box flex column center">
            <input
                type="text"
                value={text}
                onChange={(ev) => setText(ev.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write a note..."
            />
        </section>
    )
}

