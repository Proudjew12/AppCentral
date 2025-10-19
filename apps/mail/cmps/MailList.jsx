import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

const { Link } = ReactRouterDOM

export function MailList({ mails,removeMail }) {

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
        <section className='mail-list-container'>
        <ul style={{listStyleType:'none',padding:'0'}}>
            {mails.map(
                mail =>
                    <li key={mail.id}>
                        <Link to={`${mail.id}`} style={{textDecoration: 'none'}}>
                        <div  className={'mail '+getClassName(mail)}>
                            <button className='star-btn'><StarButton bg={(mail.starred?'gold':'white')}/></button>
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
        </section>
    )

}
function TrashIcon(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="24px"
         fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
    )
}
function StarButton({bg}){
    return  <svg width="30" height="20" viewBox="0 0 24 24" fill={bg} stroke={'black'}>
    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.853 1.417 8.264L12 19.771 4.583 23.865 6 15.601 0 9.748l8.332-1.73z"/>
  </svg>

}