import { noteService } from "../../keep/services/note.service.js"
const {useState,useEffect} = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailPreview({mail}){
function onMoveData(){
const txt = {to: mail.to,subject: mail.subject, body: mail.body}
const type = 'NoteMail'
const note = noteService.getEmptyNote(txt,type)
noteService.add(note)
console.log('added');

}
return(
    <section className='MailPreview'>
      <Link to='/keep'><button className='intergration-btn' onClick={()=>{onMoveData()}}>note</button> </Link>
      <h1>{mail.subject}</h1>  
      <h2>{mail.from}</h2>
      <p>{mail.body}</p>
    </section>
)
}