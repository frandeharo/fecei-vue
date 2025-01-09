import axios from 'axios'
import authHeader from './headers'

const tokenApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: authHeader()
})

export default tokenApi
