import { utilService } from "../../../services/util.service.js"

const {useState,useEffect,useRef} = React

export function MailSort({sortBy='date',onSetSortBy}){
     const [sortByToEdit, setSortByToEdit] = useState(sortBy)
     const onSetSortDebounce = useRef(utilService.debounce(onSetSortBy, 500))

     useEffect(() => {
        onSetSortDebounce.current(sortByToEdit)
    }, [sortByToEdit])
   function handleChange({target}){
   setSortByToEdit(target.value)
   }
    return <section className='sort-container'>
    <button value='date' onClick={handleChange}>{
    (sortByToEdit === 'date')?<ArrowDownIcon/> : <ArrowUpIcon/>} Date</button>
    <button value='subject' onClick={handleChange}>{
    (sortByToEdit === 'subject')?<ArrowDownIcon/> : <ArrowUpIcon/>} Subject</button>
    </section>
}

function ArrowUpIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg"
     height="24px" viewBox="0 -960 960 960" width="24px" 
     fill="#1f1f1f"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
}
function ArrowDownIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg"
     height="24px" viewBox="0 -960 960 960" width="24px" 
     fill="#1f1f1f"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
}