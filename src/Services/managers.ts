import { api } from './api'

export const getManagers = async () => {
  try {
    const response = await api.get('/api/managers')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}