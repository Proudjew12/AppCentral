import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'
const {useState,useEffect} = React
export function MailIndex() {
    const [mails,setMails] = useState(null)
    useEffect(()=>{
      mailService.query()
      .then(setMails)  
    },[])
    if(mails) return (<section className="container"><MailList mails={mails}/></section>)
    else return <div>Loading Mails...</div>
    
}

