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

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  //const response = await axios.post(baseUrl, newObject, config)
  const response = await axios.post('/', newObject, config)
  return response.data
}

let moduleExport = { getAll, create, setToken }
export default moduleExport
