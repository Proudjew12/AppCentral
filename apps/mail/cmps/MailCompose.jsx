const {useState} = React
export function MailCompose(){
 const [open, setOpen] = useState(false);
return(
    <section>
    <button onClick={()=>{setOpen(true)}}>Compose</button>
    <dialog open={open}>
    <form method='dialog'>
    <h2>New message</h2>
    <label>To:</label><input type='text'/><br/>
    <label>Subject:</label><input type='text'/><br/>
    <textarea rows='5' cols='50'></textarea><br/>
    <button>Send</button>
    </form>
    <button className='closeComposeBtn'>X</button>       
    </dialog>
    </section>
)
}