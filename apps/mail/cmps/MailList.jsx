import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

const { Link } = ReactRouterDOM

export function MailList({ mails,removeMail }) {
    const style = {
        padding: '15px',  
        color: 'black',
        display: 'flex',
        border: 'solid 1px black',
        gap: '10vw'
    }
    function getDate(createdAt){
        const date = new Date(createdAt)
        const year = date.getFullYear()
        const month = utilService.getMonthName(date)
        const currentYear = new Date().getFullYear()
       return (currentYear-2>=year) ? year : month.substring(0,3)+' '+year
    }
    function getClassName(mail){
    return (mail.isRead) ? 'isRead' : ''
    }
    return (
        <ul style={{listStyleType:'none',padding:'0'}}>
            {mails.map(
                mail =>
                    <li key={mail.id}>
                        <Link to={`${mail.id}`} style={{textDecoration: 'none'}}>
                        <div  className={'mail '+getClassName(mail)} style={style}>
                            <span>{mail.from}</span>
                            <span>{mail.subject}</span>
                            <div className='date-and-remove-btn-container'>
                            <span>{getDate(mail.createdAt)}</span>
                            <button className='remove-btn' onClick={(ev)=>{removeMail(ev,mail.id)}}>
                            <TrashIcon />
                            </button>
                            </div>
                        </div>
                        </Link>
                    </li>
            )}
        </ul>
    )

}
function TrashIcon(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
         fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
    )
}
