import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/' //URL DO SEU BACKEND
})

// Envia o token JWT automaticamente em toda requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') //pegando o token no localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api