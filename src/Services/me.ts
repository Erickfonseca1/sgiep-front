import { AuthType } from "../Types/auth"
import { api } from "./api"

export const me = async (): Promise<AuthType> => {
  try {
    // const response = await api.get('/api/me')
    // return response.data
    return {
      token: 'mockedToken123',
      userType: 'professor'
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}