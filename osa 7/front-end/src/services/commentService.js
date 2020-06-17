import axios from 'axios'
const baseUrl = '/api/blogs'

const postNewComment = async newComments => {
  const url = baseUrl + '/' + newComments.id + '/comments'
  const comments = {
    comments: newComments.comments
  }
  const response = await axios.put(url, comments)
  return response.data
}

export default { postNewComment}