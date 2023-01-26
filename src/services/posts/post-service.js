import axios from "axios";

const getPost = async () => {
    return await axios.get(`https://dummyjson.com/products`).then((item) => {
        return item.data
    })
}

const getPostByKeyword = async (param) => {
    return await axios.get(`https://dummyjson.com/products/search?q=${param}`).then((item) => {
        return item.data
    })
}


export {getPost, getPostByKeyword}