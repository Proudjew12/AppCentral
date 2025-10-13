import { showSuccessMsg } from '../services/event-bus.service.js'

export function Home() {
    return (
        <section className="home flex column align-center justify-center text-center full">
            <h1>
                Welcome to <span className="highlight">AppCentral</span>
            </h1>
            <p className="home-tagline">
                Your favorite apps — unified, simple, and beautifully built.
            </p>
        </section>
    )
}
