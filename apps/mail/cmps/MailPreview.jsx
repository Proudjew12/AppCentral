import { mailService } from "../services/mail.service"

export function MailPreview({mail}){
return(
    <section className='MailPreview'>
      <h1>{mail.subject}</h1>  
      <h2>{mail.from}</h2>
      <p>{mail.body}</p>
    </section>
)
}