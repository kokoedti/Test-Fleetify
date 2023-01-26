import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { ColorRing } from "react-loader-spinner"
import GeneralButton from "../../components/button/general-button"
import SearchBar from "../../components/searchbar/searchbar"
import { getPost, getPostByKeyword } from "../../services/posts/post-service"
import { Columns } from "../../tools/data-table"
import './home.css'

const Home = () => {
    const [keyword, setKeyword] = useState('')
    const [buttonLabel, setButtonLabel] = useState('Reset')
    const [tableArr, setTableArr] = useState([])
    const [eventFlag, setEventFlag] = useState({
        buttonResetDisabled: false,
        buttonSearchDisabled: false,
        loading: true,
        clearInput: false
    })
    const [mounted, setMounted] = useState(false)
    const submitButtonStyle = 'text-white bg-blue-700 rounded-lg w-full h-full'
    const resetButonStyle = 'text-white bg-red-700 rounded-lg w-full h-full'
    

    const fetchPost = () => {
        getPost().then((item) => {
            setTableArr([...item.products])
            resetFlag('success')
        }).catch((error) => {
            resetFlag('error')
        })
    }
    

    const fetchPostByKeyword = (param) => {
        getPostByKeyword(param).then((item) => {
            setTableArr([...item.products])
            resetFlag('success')
        }).catch((error) => {
            resetFlag('error')
        })
    }

    const setKeyValue = (param) => {
        setKeyword(param.value)
    }
    
    const triggerSearch = (param) => {
        setEventFlag({
            buttonSearchDisabled: true,
            buttonResetDisabled: true,
            loading: true
        })

        fetchPostByKeyword(keyword)
    }

    const resetFlag = (status) => {
        if(status === 'success'){
            setEventFlag({
                loading: false,
                buttonSearchDisabled: false,
                buttonResetDisabled: false
            })
            if(buttonLabel.toLowerCase() !== 'reset'){
                setButtonLabel('Reset')
            }
        }else{
            setEventFlag({
                loading: true,
                buttonSearchDisabled: true,
                buttonResetDisabled: false
            })
            setButtonLabel('Refresh')
        }

        if(eventFlag.clearInput){
            setEventFlag({clearInput: false})
        }

        if(mounted){
            setMounted(false)
        }
    }

    const triggerReset = (param) => {
        if(keyword !== '' || buttonLabel.toLowerCase() === 'refresh'){
            setEventFlag({
                buttonSearchDisabled: true,
                buttonResetDisabled: true,
                loading: true,
                clearInput: true,
            })
            
            setKeyword('')
            fetchPost()
        }
    }

    useEffect(() => {
        if(!mounted){
            fetchPost()
        }
    }, [mounted])

    return(
        <div className="p-5">
            <div className="title-canvas">
                <h1 className="text-3xl font-bold">
                    Products List
                </h1>
            </div>

            <div className="row-canvas">
                <div className="grid grid-cols-4 gap-x-1.5">
                    <div className="col-span-2">
                        <SearchBar placeholder={'Search'} setEvent={setKeyValue} clearInput={eventFlag.clearInput}></SearchBar>
                    </div>
                    <div>
                        <GeneralButton label={'Cari'} setEvent={triggerSearch} disablingStatus={eventFlag.buttonSearchDisabled} buttonStyle={submitButtonStyle}></GeneralButton>
                    </div>
                    <div>
                        <GeneralButton label={buttonLabel} setEvent={triggerReset} disablingStatus={eventFlag.buttonResetDisabled} buttonStyle={resetButonStyle}></GeneralButton>
                    </div>
                </div>
            </div>
           {
            eventFlag.loading && 
            <div className="load-spinner">
                 <ColorRing
                    height = "100"
                    width = "100"
                    radius = "9"
                    color = 'green'
                    ariaLabel = 'three-dots-loading'
                />
            </div>
           }
            {
               !eventFlag.loading && 
               <div className="p-5 border border-gray-300 rounded-lg">
                    <DataTable
                    columns={Columns}
                    data={tableArr}
                    dense
                    pagination
                    />
                </div>
            }
            
           
        </div>
    )
}

export default Home