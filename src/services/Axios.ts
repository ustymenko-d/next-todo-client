import axios from 'axios'

const Axios = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	withCredentials: true,
	timeout: 5000,
})

export default Axios
