import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailSort } from '../cmps/MailSort.jsx'
import { mailService } from '../services/mail.service.js'
const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
export function MailIndex() {

  const [searchParams, setSearchParams] = useSearchParams()

  const [mails, setMails] = useState([])
  const style = { backgroundColor: 'white', color: 'black', height: '100%', width: '100%' }
  const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))
  const [sortBy, setSortBy] = useState(mailService.getSortFromParams(searchParams))


  useEffect(() => {
    setSearchParams({
      subject: filterBy.subject,
      isRead: filterBy.isRead,
      type: filterBy.type,
      sortBy: sortBy
    })
    mailService.query(filterBy,sortBy).then(setMails)
  }, [filterBy,sortBy])

  function onSetFilterBy(newFilter){
  setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))  
  }
  function onSetSortBy(newSort){
  setSortBy(newSort)  
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
  if (mails) return (<section className='mail-index-container' >
    <nav>
      <MailCompose addMail={addMail} />
      <MailFolderList filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
      </nav>
      <section style={style}>
    
    <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
    <MailSort sortBy={sortBy} onSetSortBy={onSetSortBy}/>
    <MailList mails={mails} removeMail={removeMail} />
    </section>
    </section>)
  else return <div>Loading Mails...</div>
}



