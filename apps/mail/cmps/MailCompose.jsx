import { mailService } from "../services/mail.service.js";

const { useState, useEffect, useRef } = React
export function MailCompose({ addMail, draft = mailService.getEmptyMail() }) {
  const [open, setOpen] = useState(false);
  const [mail, setMail] = useState(mailService.getEmptyMail())
  const toInput = useRef()
  const subjectInput = useRef()
  const bodyTextarea = useRef()

  useEffect(() => {
    if (draft) loadDraft()
  }, [])
  useEffect(() => {
    if (open) {
      if (mail.to || mail.subject || mail.body) saveDraft()
    }
  }, [open, mail])
  function loadDraft() {
    setMail(draft)
    toInput.current.value = draft.to
    subjectInput.current.value = draft.subject
    bodyTextarea.current.value = draft.body
  }
  function saveDraft() {
    mailService.save(mail)
      .then(newMail => {
        if (!mail.id) setMail(newMail)
        console.log(newMail);
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
    setOpen(false)
    toInput.current.value = ''
    subjectInput.current.value = ''
    bodyTextarea.current.value = ''
    setMail(mailService.getEmptyMail())
  }
  function onOpenModal() {
    setOpen(true)
  }
  return (
    <section className='mail-compose-container'>
      <button className='compose-btn' onClick={onOpenModal}><WriteIcon /> Compose</button>
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
    </section>
  )
}
function WriteIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg"
    height="30px" viewBox="0 -960 960 960" width="30px"
    fill="#1f1f1f"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
}