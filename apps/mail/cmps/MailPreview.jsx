import { noteService } from "../../keep/services/note.service.js"
const {useState,useEffect} = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailPreview({mail}){
function onMoveData(){
const txt = {to: mail.to,subject: mail.subject, body: mail.body}
const type = 'NoteMail'
const note = noteService.getEmptyNote(txt,type)
noteService.add(note)
}
return(
    <section className='MailPreview'>
      <button className='intergration-btn' onClick={()=>{onMoveData()}}>note</button> 
      <h1>{mail.subject}</h1>  
      <h2>{mail.from}</h2>
      <p>{mail.body}</p>
    </section>
)
}