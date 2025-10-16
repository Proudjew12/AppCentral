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
 ? <MailPreview mail={mail}/>
 : <div>Loading...</div>
    

}