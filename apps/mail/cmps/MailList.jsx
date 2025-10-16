import { utilService } from "../../../services/util.service.js"

const { Link } = ReactRouterDOM

export function MailList({ mails }) {
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
                        <Link to={`${mail.id}`}>
                        <div  className={'mail '+getClassName(mail)} style={style}>
                            <span>{mail.from}</span>
                            <span>{mail.subject}</span>
                            <span className='createdAt-span'>{getDate(mail.createdAt)}</span>
                        </div>
                        </Link>
                    </li>
            )}
        </ul>
    )

}
