const {useState} = React
export function MailCompose(){
 const [open, setOpen] = useState(false);
return(
    <section>
    <button onClick={()=>{setOpen(true)}}>Compose</button>
    <dialog open={open} className='compose-modal'>
        <div className='compose-title'>
            <h2>New message</h2>
            <button className='closeComposeBtn'>X</button> 
    </div>
      <form method='dialog'>  
    <label>To:</label><input type='text'/><br/>
    <label>Subject:</label><input type='text'/><br/>
    <textarea rows='5' cols='50'></textarea><br/>
    <button>Send</button>
    </form>
          
    </dialog>
    </section>
)
}