const { useState } = React

export function NoteTxt({ onAddNote }) {
    const [txt, setTxt] = useState('')

    function handleKeyPress(ev) {
        if (ev.key === 'Enter' && txt.trim()) {
            onAddNote({ txt: txt.trim(), type: 'NoteTxt' })
            setTxt('')
        }
    }

    return (
        <div className="note-type flex row align-center space-between">
            <input
                type="text"
                value={txt}
                onChange={(ev) => setTxt(ev.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Take a note..."
                className="grow"
            />
        </div>
    )
}
