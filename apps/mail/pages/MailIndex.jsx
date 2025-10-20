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
  const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))
  const [sortBy, setSortBy] = useState(mailService.getSortFromParams(searchParams))


  useEffect(() => {
    setSearchParams({
      subject: filterBy.subject,
      isRead: filterBy.isRead,
      type: filterBy.type,
      sortBy: sortBy
    })
    mailService.query(filterBy, sortBy).then(setMails)
  }, [filterBy, sortBy])

  function onSetFilterBy(newFilter) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
  }
  function onSetSortBy(newSort) {
    setSortBy(newSort)
  }
  function addMail(mail) {
    mailService.save(mail)
      .then(newMail => (setMails([newMail, ...mails])))
  }
  
  function removeMail(ev, mailId) {
    ev.preventDefault()
    mailService.get(mailId)
      .then(prevMail => {
        const removedAt = (!prevMail.removedAt) ? Date.now() : null
        const updatedMail = { ...prevMail, removedAt: removedAt, starred: false }
        mailService.save(updatedMail)
        setMails(prevMails =>
          prevMails.filter(mail =>
            (mail.id !== updatedMail.id)
          )
        )
      })
  }
  function toggleIsStarred(ev, mailId) {
    ev.preventDefault()
    mailService.get(mailId)
      .then(prevMail => {
        const updatedMail = { ...prevMail, starred: !prevMail.starred }
        mailService.save(updatedMail)
        setMails(prevMails =>
          prevMails.map(mail =>
            mail.id === updatedMail.id ? updatedMail : mail
          )
        )
      })
  }
  function toggleIsRead(ev, mailId) {
    ev.preventDefault()
    mailService.get(mailId)
      .then(prevMail => {
        const updatedMail = { ...prevMail, isRead: !prevMail.isRead }
        mailService.save(updatedMail)
        setMails(prevMails =>
          prevMails.map(mail =>
            mail.id === updatedMail.id ? updatedMail : mail
          )
        )
      })
  }
  if (mails) return (<section className='mail-index-container' >
    <nav>
      <MailFolderList filterBy={filterBy} onSetFilterBy={onSetFilterBy} addMail={addMail} />
    </nav>
    <section className='mail-list-container'>

      <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <MailSort sortBy={sortBy} onSetSortBy={onSetSortBy} />
      <MailList mails={mails} removeMail={removeMail} toggleIsStarred={toggleIsStarred} toggleIsRead={toggleIsRead} />
    </section>
  </section>)
  else return <div>Loading Mails...</div>
}



