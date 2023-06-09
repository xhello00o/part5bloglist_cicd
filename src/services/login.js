import axios from 'axios'
const baseurl ='api/login'

const login = async (credentials) =>{
    const response = await axios.post(baseurl,credentials)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {login}