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
    function addMail(mail){
    mailService.save(mail)
    .then(newMail=>(setMails([newMail,...mails])))
    }
    function removeMail(ev,mailId){
        ev.preventDefault()
     mailService.remove(mailId)
     .then((setMails(mails.filter(mail=>(mailId!==mail.id)))))
    }
    if(mails) return (<section style={style}><MailCompose addMail={addMail}/><MailList mails={mails} removeMail={removeMail}/></section>)
    else return <div>Loading Mails...</div>
    
}

