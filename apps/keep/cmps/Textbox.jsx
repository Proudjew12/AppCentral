const { useState } = React

export function TextBox() {
    const [text, setText] = useState('')

    return (
        <section className="text-box">
            <input
                type="text"
                value={text}
                onChange={(ev) => setText(ev.target.value)}
                placeholder="Write a note..."
            />
            <p>{text}</p>
        </section>
    )
}
