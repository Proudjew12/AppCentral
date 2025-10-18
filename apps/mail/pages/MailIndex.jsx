import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailPreview } from '../cmps/MailPreview.jsx'
import { mailService } from '../services/mail.service.js'
const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
export function MailIndex() {

  const [searchParams, setSearchParams] = useSearchParams()

  const [mails, setMails] = useState([])
  const style = { backgroundColor: 'white', color: 'black', height: '100%', width: '100%' }
  const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))

  useEffect(() => {
    setSearchParams(filterBy)
    mailService.query(filterBy).then(setMails)
  }, [filterBy])

  function onSetFilterBy(newFilter){
  setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))  
  }
  function addMail(mail) {
    mailService.save(mail)
      .then(newMail => (setMails([newMail, ...mails])))
  }
  function removeMail(ev, mailId) {
    ev.preventDefault()
    mailService.remove(mailId)
      .then((setMails(mails.filter(mail => (mailId !== mail.id)))))
  }
  if (mails) return (<section style={style}><MailCompose addMail={addMail} /><MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/><MailList mails={mails} removeMail={removeMail} /></section>)
  else return <div>Loading Mails...</div>

}

