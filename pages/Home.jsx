import { showSuccessMsg } from '../services/event-bus.service.js'

export function Home() {
    return (
        <section className="home main-layout">
            <div className="container text-center">
                <h1>Welcome home</h1>
                <button onClick={() => showSuccessMsg('Yep, that works')}>
                    Show Msg
                </button>
            </div>

            <div className="box-container flex row-reverse wrap gap-md">
                <div className="box1"></div>
                <div className="box2"></div>
            </div>
        </section>
    )
}
