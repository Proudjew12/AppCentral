
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailSort } from '../cmps/MailSort.jsx'
import { mailService } from '../services/mail.service.js'

const { useState, useEffect, useRef } = React
const { Link, useSearchParams } = ReactRouterDOM
export function MailIndex() {

  const [searchParams, setSearchParams] = useSearchParams()

  const [mails, setMails] = useState([])
  const [open, setOpen] = useState(false);
  const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))
  const [sortBy, setSortBy] = useState(mailService.getSortFromParams(searchParams))
  const [draft, setDraft] = useState(mailService.getEmptyMail())

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
    mailService.save({ ...mail, sentAt: Date.now() })
      .then(
        updatedMail =>
          setMails(prevMails =>
            prevMails.map(mail =>
              mail.id === updatedMail.id ? updatedMail : mail
            )
          )
      )
  }
  function removeMail(ev, mailId) {
    ev.preventDefault()
    if (filterBy.type != 'draft') mailService.get(mailId)
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
    else mailService.remove(mailId)
      .then(setMails(prevMails =>
        prevMails.filter(mail => (mail.id !== mailId))
      ))
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
  function onOpenModal(ev, curDraft = draft) {
    ev.preventDefault()
    setOpen(true)
    setDraft(curDraft)
  }
  function closeModal(updatedMail) {
    setOpen(false)
    setMails(prevMails =>
      prevMails.map(mail =>
        mail.id === updatedMail.id ? updatedMail : mail
      )
    )
    setDraft(mailService.getEmptyMail())
  }
  if (mails) return (<section className='mail-index-container' >
    <nav>
      <MailFolderList filterBy={filterBy} onSetFilterBy={onSetFilterBy} addMail={addMail} onOpenModal={onOpenModal} />
    </nav>
    <section className='mail-list-container'>

      <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <MailSort sortBy={sortBy} onSetSortBy={onSetSortBy} />
      <MailList mails={mails} removeMail={removeMail} toggleIsStarred={toggleIsStarred} toggleIsRead={toggleIsRead} onOpenModal={onOpenModal} />
      <ComposeModal open={open} addMail={addMail} draft={draft} closeModal={closeModal} />
    </section>
  </section>)
  else return <div>Loading Mails...</div>
}
function ComposeModal({ open, addMail, draft = mailService.getEmptyMail(), closeModal }) {

  const [mail, setMail] = useState(draft)
  const toInput = useRef()
  const subjectInput = useRef()
  const bodyTextarea = useRef()

  useEffect(() => {
    if (draft) loadDraft()
  }, [open])
  useEffect(() => {
    if (open) {

      if (mail.to || mail.subject || mail.body) saveDraft()
    }
  }, [open, mail])
  function loadDraft() {
    toInput.current.value = draft.to
    subjectInput.current.value = draft.subject
    bodyTextarea.current.value = draft.body
    setMail(draft)
  }
  function saveDraft() {
    mailService.save(mail)
      .then(newMail => {
        if (!mail.id) setMail(newMail)
      }
      )

  }
  function handleChange({ target }) {
    const { value, name: prop } = target
    setMail((prevMail) => ({ ...prevMail, [prop]: value }))
  }
  function onAddMail(ev) {
    setMail((prevMail) => ({ ...prevMail, sentAt: Date.now() }))
    ev.preventDefault()
    addMail(mail)
    onCloseModal()
  }
  function onCloseModal() {
    closeModal(mail)
    toInput.current.value = ''
    subjectInput.current.value = ''
    bodyTextarea.current.value = ''
    setMail(mailService.getEmptyMail())
  }
  
  return (
    <dialog open={open} className='compose-modal'>
      <div className='compose-title'>
        <p>New message</p>
        <button className='closeComposeBtn' onClick={onCloseModal}>X</button>
      </div>
      <div className='form-container'>
        <form method='dialog' onSubmit={(ev) => { onAddMail(ev) }}>
          <input ref={toInput} name='to' onChange={handleChange} type='email' placeholder='To' /><br />
          <input ref={subjectInput} name='subject' onChange={handleChange} type='text' placeholder='Subject' /><br />
          <textarea ref={bodyTextarea} rows='5' cols='50' name='body' onChange={handleChange}></textarea><br />
          <button type='submit' className='btn-send'>Send</button>
        </form>
      </div>
    </dialog>
  )
}


