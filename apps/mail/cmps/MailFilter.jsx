const { useEffect, useState, useRef } = React
import { utilService } from "../../../services/util.service.js"
export function MailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilterBy, 500))

    useEffect(() => {
        onSetFilterDebounce.current(filterByToEdit)
    }, [filterByToEdit])

     function handleChange({ target }) {
        const { value, name: prop } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [prop]: value }))
    }
    return (
        <section className='filter-container'>
            <input type='text' name='subject' placeholder='Search' onChange={handleChange} value={filterByToEdit.subject}/>
            <select name='isRead' onChange={handleChange} value={filterByToEdit.isRead}>
            <option value=''>All</option>
            <option value={true}>Read</option> 
            <option value={false}>Unread</option>   
            </select>
        </section>
    )
}