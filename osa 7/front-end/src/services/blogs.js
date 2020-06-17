import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNew = async newPost => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseUrl, newPost, config)
  return response.data
}

const update = async newLike => {
  const url = baseUrl + '/' + newLike.id
  const likes = {
    likes: newLike.likes
  }
  const response = await axios.put(url, likes)
  return response.data
}

const deletePost = async id => {
  const url = baseUrl + '/' + id
  const config = {
    headers: {authorization: token}
  }

  const response = await axios.delete(url, config)
  return response.data
}

export default { 
  getAll, 
  postNew, 
  setToken, 
  update, 
  deletePost } 