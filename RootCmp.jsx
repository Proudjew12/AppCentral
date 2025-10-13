const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

//* Cmps
import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { LabelPicker } from './cmps/LabelPicker.jsx'
import { LongText } from './cmps/LongText.jsx'

//*Pages
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'

import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'

export function RootCmp() {
    return <Router>
        <section className="root-cmp flex column min-h-100">
            <AppHeader />

            <main className="main-content grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mail" element={<MailIndex />} />
                    <Route path="/note" element={<NoteIndex />} />
                </Routes>
            </main>

            <AppFooter />
            <UserMsg />

        </section>
    </Router>
}
