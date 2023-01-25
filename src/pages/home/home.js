import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import GeneralButton from "../../components/button/general-button"
import SearchBar from "../../components/searchbar/searchbar"
import { getPost } from "../../services/posts/post-service"
import './home.css'

const Home = () => {
    const [tableArr, setTableArr] = useState([])
    const [isMounted, setIsMounted] = useState(false)

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
            console.log(item.products)
            setIsMounted(true)
            setTableArr([...item.products])
        }).catch((error) => {
            setIsMounted(true)
        })
    }
    


    useEffect(() => {
        if(!isMounted){
            fetchPost()
        }
    }, [isMounted])

    return(
        <div>
            <div className="search-row">
                <SearchBar></SearchBar>
                <GeneralButton></GeneralButton>
            </div>
            <DataTable
                columns={columns}
                data={tableArr}
                dense
                pagination
            />
        </div>
    )
}

export default Home