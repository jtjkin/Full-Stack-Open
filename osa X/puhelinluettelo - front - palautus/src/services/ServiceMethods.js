import axios from 'axios'
const baseURL = 'https://sleepy-brook-28895.herokuapp.com/api/persons'
//const baseURL = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}
 
const addNew = (newInfo) => {
    const request = axios.post(baseURL, newInfo)
    return request.then(response => response.data)
}

const update = (id, newInfo) => {
    const request = axios.put(`${baseURL}/${id}`, newInfo)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    console.log(request.then(response => response.data))
}

export default {
    getAll,
    addNew,
    update,
    remove
}