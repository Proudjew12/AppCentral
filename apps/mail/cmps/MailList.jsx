import { utilService } from "../../../services/util.service.js"


export function MailList({ mails }) {
    const style = {
        padding: '15px', 
        backgroundColor: 'white', 
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
    return (
        <ul style={{listStyleType:'none',padding:'0'}}>
            {mails.map(
                mail =>
                    <li key={mail.id}>
                        <div style={style}>
                            <span>{mail.from}</span>
                            <span>{mail.subject}</span>
                            <span>{getDate(mail.createdAt)}</span>

                        </div>
                    </li>
            )}
        </ul>
    )

}
