import './general-button.css'

const GeneralButton = ({label, setEvent, disablingStatus, buttonStyle}) => {
    return(
        <button className={buttonStyle} disabled={disablingStatus} onClick={() => setEvent('triggered')}>{label ? label : 'OK'}</button>
    )
}

export default GeneralButton