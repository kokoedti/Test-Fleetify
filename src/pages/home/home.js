import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { ColorRing } from "react-loader-spinner"
import GeneralButton from "../../components/button/general-button"
import SearchBar from "../../components/searchbar/searchbar"
import { getPost, getPostByKeyword } from "../../services/posts/post-service"
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
    const priceTag = '$'

    const columns = [
        {
            name: 'Product Name',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Brand',
            selector: row => row.brand,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true
        },
        {
            name: 'Price',
            selector: row => `${priceTag} ${row.price}`,
            sortable: true
        },
        {
            name: 'Rating',
            selector: row => row.rating,
        },
        {
            name: 'Stock',
            selector: row => row.stock,
        },
    ];

    const fetchPost = async () => {
       await getPost().then((item) => {
            setTableArr([...item.products])
            resetFlag('success')
        }).catch((error) => {
            resetFlag('error')
        })
    }
    

    const fetchPostByKeyword = async (param) => {
        await getPostByKeyword(param).then((item) => {
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
        <div className="canvas">
            <div>
                <h1>
                    Products List
                </h1>
            </div>

            <div className="search-row">
                <SearchBar placeholder={'Search'} setEvent={setKeyValue} clearInput={eventFlag.clearInput}></SearchBar>
                <GeneralButton label={'Cari'} setEvent={triggerSearch} disablingStatus={eventFlag.buttonSearchDisabled}></GeneralButton>
                <GeneralButton label={buttonLabel} setEvent={triggerReset} disablingStatus={eventFlag.buttonResetDisabled}></GeneralButton>
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
               !eventFlag.loading && <DataTable
                    columns={columns}
                    data={tableArr}
                    dense
                    pagination
                />
            }
            
           
        </div>
    )
}

export default Home