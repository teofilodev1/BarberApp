import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL do seu backend Node
})

// Envia o token JWT automaticamente em toda requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api