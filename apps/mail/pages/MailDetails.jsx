import { MailPreview } from "../cmps/MailPreview.jsx";
import { mailService } from "../services/mail.service.js";

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

export function MailDetails(){
    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadMail()
        makeMailRead(params.mailId)
    }, [params.mailId])

    function loadMail() {
        setIsLoading(true)
        mailService.get(params.mailId)
            .then(setMail)
            .catch(() => {
                showErrorMsg('Couldnt get book...')
                navigate(`/mail`)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
return (!isLoading)
 ? <section className='mail-preview-container'><Link to='/mail'><button className='back-btn'><BackIcon/></button></Link><MailPreview mail={mail}/></section>
 : <div>Loading...</div>
    

}
function BackIcon(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" 
        height="24px" viewBox="0 -960 960 960" width="24px" 
        fill="#1f1f1f"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
    )
}
function makeMailRead(mailId){
    mailService.get(mailId)
      .then(prevMail => {
        const updatedMail = { ...prevMail, isRead:true }
        mailService.save(updatedMail)
      }
    )
}