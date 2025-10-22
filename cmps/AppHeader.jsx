const { Link } = ReactRouterDOM
const { useState } = React

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function onToggleMenu(ev) {
        ev.stopPropagation()
        setIsMenuOpen(prev => !prev)
    }

    function onCloseMenu() {
        setIsMenuOpen(false)
    }

    function stop(ev) {
        ev.stopPropagation()
    }

    return (
        <header
            className="app-header flex space-between align-center"
            onClick={onCloseMenu}
        >

            <Link to="/" className="flex align-center gap-sm">
                <img src={`../logo/logo.png`} alt="Logo" />

            </Link>

            <nav className="flex align-center gap-md" onClick={stop}>
                <div className="apps-menu-wrapper relative">
                    <i
                        className="fa-solid fa-grip apps-icon"
                        title="Apps"
                        onClick={onToggleMenu}
                    ></i>

                    {isMenuOpen && (
                        <div className="apps-dropdown grid gap-md" onClick={stop}>
                            <Link to="/mail" className="app-item grid center text-center">
                                <div className="app-icon gmail grid center">📧</div>
                                <p>Mail</p>
                            </Link>

                            <Link to="/keep" className="app-item grid center text-center">
                                <div className="app-icon note grid center">📝</div>
                                <p>Keep</p>
                            </Link>

                            <Link to="/books" className="app-item grid center text-center">
                                <div className="app-icon books grid center">📚</div>
                                <p>Books</p>
                            </Link>

                            <Link to="/about" className="app-item grid center text-center">
                                <div className="app-icon about grid center">ℹ️</div>
                                <p>About</p>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}
