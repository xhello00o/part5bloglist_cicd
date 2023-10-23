import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async(newObject) => {
  const config = {
    headers: { Authorization:token }
  }
  const response = await axios.post(baseUrl,newObject,config)
  return response.data
}

const addLike = async (id,addLikeObj) => {
  const config = {
    headers: { Authorization:token }
  }
  const response = await axios.put(`${baseUrl}/${id}`,addLikeObj,config)
  return response.data
}

const deleteblog = async (id) => {
  const config = {
    headers: { Authorization:token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`,config)
  return response.data


}


export default { getAll, create,setToken,addLike,deleteblog }