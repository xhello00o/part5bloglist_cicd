import axios from 'axios'
const domain = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'
const baseUrl = `${domain}/api/login`

console.log(baseUrl)

const login = async (credentials) => {
  const response = await axios.post(baseUrl,credentials)
  return response.data
}

export default { login }