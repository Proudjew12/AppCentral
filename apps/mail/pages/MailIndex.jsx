import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailPreview } from '../cmps/MailPreview.jsx'
import { mailService } from '../services/mail.service.js'
const {useState,useEffect} = React
export function MailIndex() {
    const [mails,setMails] = useState(null)
    const style = {backgroundColor:'white',color:'black',height:'100%',width:'100%'}
    useEffect(()=>{
      mailService.query()
      .then(setMails)  
    },[])
    if(mails) return (<section style={style}><MailCompose/><MailList mails={mails}/></section>)
    else return <div>Loading Mails...</div>
    
}

