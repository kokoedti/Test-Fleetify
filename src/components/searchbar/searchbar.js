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
        <>
            <input 
            className='border border-gray-300 rounded-lg text-sm rounded-lg p-2.5 w-full'
            placeholder={placeholder ? placeholder : 'Text'} 
            id={'text'} onChange={listener} />
        </>
    )
}

export default SearchBar