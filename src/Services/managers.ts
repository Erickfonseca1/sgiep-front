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

export const changeManagerStatus = async (id: number) => {
  try {
    const response = await api.put(`/api/users/${id}/status`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}