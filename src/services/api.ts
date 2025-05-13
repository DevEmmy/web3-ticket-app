import axios from 'axios'
import { useUserStore } from '../store/useUserStore'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
})

api.interceptors.request.use((config) => {
  const token = useUserStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const userService = {
  login: async (wallet: string) => {
    const { data } = await api.post('/auth/login', { wallet })
    return data
  },
  getProfile: async () => {
    const { data } = await api.get('/user/profile')
    return data
  },
}

export default api
