import { AuthType } from "../Types/auth"
import { api } from "./api"

export const authenticateUser = async (email: string, password: string): Promise<AuthType> => {
  try {
    const response = await api.post('/api/auth/login', {
      email,
      password
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const registerUser = async (name: string, email: string, password: string, role: string, phone?: string, address?: string) => {
  try {
    const response = await api.post('/api/auth/register', {
      name,
      email,
      password,
      role,
      phone,
      address
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}