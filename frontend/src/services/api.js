import axios from 'axios'

// Use a relative base URL so production builds work behind the same origin
const api = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

// Attach auth token if present
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error)
)

// Handle 401 globally
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem('token')
			if (window.location.pathname !== '/login') {
				window.location.href = '/login'
			}
		}
		return Promise.reject(error)
	}
)

export default api


