import axios from "axios";

const getPost = () => {
    return axios.get(`https://dummyjson.com/products`).then((item) => {
        return item.data
    })
}

const getPostByKeyword = (param) => {
    return axios.get(`https://dummyjson.com/products/search?q=${param}`).then((item) => {
        return item.data
    })
}


export {getPost, getPostByKeyword}