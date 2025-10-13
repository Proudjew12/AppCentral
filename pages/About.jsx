export function About() {
    return (
        <section className="about flex column align-center text-center full">
            <div className="about-container main-layout flex column align-center text-center">
                <h1>About AppCentral</h1>

                <p className="about-intro">
                    Welcome to <span className="highlight">AppCentral</span> — a creative
                    full-stack project built by the{" "}
                    <span className="highlight">Brothers Team</span>.
                    <br />
                    Our goal was to combine multiple mini-apps into one clean and seamless experience.
                </p>

                <div className="about-cards flex wrap space-evenly">
                    <article className="about-card">
                        <h2>📧 MisterMail</h2>
                        <p>Stay productive with a minimal, intuitive email client.</p>
                    </article>

                    <article className="about-card">
                        <h2>📝 MissKeep</h2>
                        <p>Capture notes, lists, and ideas — organized, colorful, and quick.</p>
                    </article>

                    <article className="about-card">
                        <h2>📚 MissBooks</h2>
                        <p>Browse, review, and save your favorite books all in one place.</p>
                    </article>
                </div>

                <div className="team-section flex column align-center text-center">
                    <h2>👨‍💻 Meet the Team</h2>
                    <p>
                        Built with ❤️ by <strong>Ofek Cohen</strong> &{" "}
                        <strong>Eran Zindani</strong><br />
                        Together known as the <span className="highlight">Brothers Team</span> —
                        passionate about design, code, and creativity.
                    </p>
                </div>

                <p className="about-cta">
                    ✨ We believe small ideas can grow into something amazing — and this is just the start.
                </p>
            </div>
        </section>
    )
}
