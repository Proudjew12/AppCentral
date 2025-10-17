import { mailService } from "../services/mail.service.js";

const {useState} = React
export function MailCompose({addMail}){
 const [open, setOpen] = useState(false);
 const [mail,setMail] = useState(mailService.getEmptyMail())

 function handleChange({ target }) {
        const { value, name: prop } = target
        setMail((prevMail) => ({ ...prevMail, [prop]: value }))
    }
    function onAddMail(ev){
    setMail((prevMail)=>({...prevMail,sentAt:Date.now()}))
    ev.preventDefault()
    addMail(mail)
    }
return(
    <section>
    <button onClick={()=>{setOpen(true)}}>Compose</button>
    <dialog open={open} className='compose-modal'>
        <div className='compose-title'>
            <p>New message</p>
            <button className='closeComposeBtn' onClick={()=>{setOpen(false)}}>X</button> 
    </div>
      <form method='dialog' onSubmit={(ev)=>{onAddMail(ev)}}>  
    <label htmlFor='to'>To:</label><input name='to' onChange={handleChange} type='text'/><br/>
    <label htmlFor='subject'>Subject:</label><input name='subject' onChange={handleChange} type='text'/><br/>
    <textarea rows='5' cols='50' name='body' onChange={handleChange}></textarea><br/>
    <button type='submit'>Send</button>
    </form>
          
    </dialog>
    </section>
)
}