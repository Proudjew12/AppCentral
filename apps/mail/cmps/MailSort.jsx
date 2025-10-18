import { utilService } from "../../../services/util.service.js"

const {useState,useEffect,useRef} = React

export function MailSort({sortBy,onSetSortBy}){
     const [sortByToEdit, setSortByToEdit] = useState(sortBy)
     const onSetSortDebounce = useRef(utilService.debounce(onSetSortBy, 500))

     useEffect(() => {
        onSetSortDebounce.current(sortByToEdit)
    }, [setSortByToEdit])
   function handleChange({target}){
   onSetSortBy(target.value)
   }
    return <section className='sort-container'>
    <button value='date' onClick={handleChange}>Date</button>
    <button value='subject' onClick={handleChange}>Subject</button>
    </section>
}