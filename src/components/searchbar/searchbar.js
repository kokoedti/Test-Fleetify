import { debounce } from 'lodash'
import { useEffect } from 'react'
import './searchbar.css'

const SearchBar = ({placeholder, setEvent, clearInput}) => {
    const listener = debounce((event) => {
        event.preventDefault()
        setEvent({
            event: 'input-event',
            value: event.target.value
        })
    }, 500)

    useEffect(() => {
        if(clearInput){
            let getValue = document.getElementById("text")
            getValue.value = ''
        }
    },[clearInput])

    return(
        <input 
        className='item-margin'
        placeholder={placeholder ? placeholder : 'Text'} 
        id={'text'} onChange={listener} />
    )
}

export default SearchBar