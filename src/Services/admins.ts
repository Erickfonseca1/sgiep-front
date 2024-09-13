import { api } from './api'

export const getAdmins = async () => {
  try {
    const response = await api.get('/api/admins')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}