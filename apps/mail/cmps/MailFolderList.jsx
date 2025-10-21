import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
import { MailCompose } from "./MailCompose.jsx"

const { useState, useEffect, useRef } = React

export function MailFolderList({ filterBy, onSetFilterBy,addMail,onOpenModal}) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilterBy, 500))
    const [mailType,setMailType] = useState(filterBy.type)

    useEffect(() => {
        onSetFilterDebounce.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(value) {
        setMailType(value)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, type: value }))
    }
    return <section className='mail-folder-list'>
        <MailCompose addMail={addMail} onOpenModal={onOpenModal}/>
        <nav>
        <button className={(mailType ==='inbox')?'clicked-option':''} onClick={() => handleChange('inbox')}><InboxIcon /> Inbox </button>
        <button className={(mailType ==='starred')?'clicked-option':''} onClick={() => handleChange('starred')}><StarIcon /> Starred</button>
        <button className={(mailType ==='sent')?'clicked-option':''} onClick={() => handleChange('sent')}><SentIcon /> Sent </button>
        <button className={(mailType ==='draft')?'clicked-option':''} onClick={() => handleChange('draft')}><DraftIcon /> Draft</button>
        <button className={(mailType ==='removed')?'clicked-option':''} onClick={() => handleChange('removed')}><TrashIcon /> Trash</button>
        </nav>
    </section>
}
function InboxIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg"
        height="24px" viewBox="0 -960 960 960" width="24px"
        fill="#1f1f1f"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm280-120q38 0 69-22t43-58h168v-360H200v360h168q12 36 43 58t69 22ZM200-200h560-560Z" /></svg>
}
function StarIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg"
        height="24px" viewBox="0 -960 960 960" width="24px"
        fill="#1f1f1f"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" /></svg>
}
function SentIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg"
        height="24px" viewBox="0 -960 960 960" width="24px"
        fill="#1f1f1f"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" /></svg>
}
function DraftIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg"
        height="24px" viewBox="0 -960 960 960" width="24px"
        fill="#1f1f1f"><path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" /></svg>
}
function TrashIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
    )
}