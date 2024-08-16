import { api } from "./api"

export const getCitizens = async () => {
  try {
    const response = await api.get('/api/citizens')
    return response.data
  } catch (error) {
    console.error(error)
  }
}