import { LongTxt } from "../../../cmps/LongText.jsx"
import { utilService } from "../../../services/util.service.js"


const { Link } = ReactRouterDOM

export function MailList({ mails, removeMail, toggleIsStarred, toggleIsRead, onOpenModal }) {

    function getDate(sentAt) {
        const date = new Date(sentAt)
        const year = date.getFullYear()
        const month = utilService.getMonthName(date)
        const day = date.getDate() + '.'
        const currentYear = new Date().getFullYear()
        return (currentYear - 2 >= year) ? year : day + ' ' + month.substring(0, 3) + ' ' + year
    }
    function getClassName(mail) {
        return (mail.isRead) ? 'isRead' : ''
    }
    return (
        <section className='mail-list-container'>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
                {mails.map(
                    mail =>
                        <li key={mail.id}>
                            <Link to={`${mail.id}`} style={{ textDecoration: 'none' }}>
                                <div className={'mail ' + getClassName(mail)}>
                                    <div className='star-and-to-container'>
                                        {(!mail.removedAt && mail.sentAt) ?
                                            <button className='star-btn' onClick={(ev) => { toggleIsStarred(ev, mail.id) }}><StarButton bg={(mail.starred ? 'gold' : 'white')} /></button>
                                            : ''
                                        }
                                        <span>{mail.from}</span>
                                    </div>

                                    <span className='body-span'><LongTxt txt={mail.body} length={20} /></span>
                                    <div className='date-and-remove-btn-container'>
                                        <span>{getDate(mail.sentAt)}</span>
                                        <button className='remove-btn' onClick={(ev) => { removeMail(ev, mail.id) }}>
                                            <TrashIcon />
                                        </button>
                                        {(mail.sentAt) ? <button className='read-btn' onClick={(ev) => { toggleIsRead(ev, mail.id) }}>
                                            {(mail.isRead) ? <UnreadIcon /> : <ReadIcon />}
                                        </button>
                                            : <button className='edit-btn' onClick={(ev)=>{onOpenModal(ev,mail)}}><WriteIcon /></button>}
                                    </div>
                                </div>
                            </Link>
                        </li>
                )}
            </ul>
        </section>
    )

}
function TrashIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="24px"
            fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
    )
}
function StarButton({ bg }) {
    return <svg width="30" height="20" viewBox="0 0 24 24" fill={bg} stroke={'black'}>
        <path d="M12 .587l3.668 7.431L24 9.748l-6 5.853 1.417 8.264L12 19.771 4.583 23.865 6 15.601 0 9.748l8.332-1.73z" />
    </svg>

}
function ReadIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg"
        height="24px" viewBox="0 -960 960 960" width="24px"
        fill="#1f1f1f"><path d="m480-920 362 216q18 11 28 30t10 40v434q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200v-434q0-21 10-40t28-30l362-216Zm0 466 312-186-312-186-312 186 312 186Zm0 94L160-552v352h640v-352L480-360Zm0 160h320-640 320Z" /></svg>
}
function UnreadIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg"
        height="24px" viewBox="0 -960 960 960" width="24px"
        fill="#1f1f1f"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h404q-4 20-4 40t4 40H160l320 200 146-91q14 13 30.5 22.5T691-572L480-440 160-640v400h640v-324q23-5 43-14t37-22v360q0 33-23.5 56.5T800-160H160Zm0-560v480-480Zm600 80q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Z" /></svg>
}
function WriteIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg"
        height="24px" viewBox="0 -960 960 960" width="30px"
        fill="#1f1f1f"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
}