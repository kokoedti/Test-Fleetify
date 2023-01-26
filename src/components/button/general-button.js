import './general-button.css'

const GeneralButton = ({label, setEvent, disablingStatus}) => {
    return(
        <button disabled={disablingStatus} onClick={() => setEvent('triggered')}>{label ? label : 'OK'}</button>
    )
}

export default GeneralButton