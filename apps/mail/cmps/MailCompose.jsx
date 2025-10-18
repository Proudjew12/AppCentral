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
    <button className='compose-btn'onClick={()=>{setOpen(true)}}><WriteIcon/></button>
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
function WriteIcon(){
  return <svg xmlns="http://www.w3.org/2000/svg"
   height="30px" viewBox="0 -960 960 960" width="30px" 
   fill="#1f1f1f"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
}