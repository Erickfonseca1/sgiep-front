import { AdminType } from '../Types/user'
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

export const getPagedAdmins = async (page: number, size: number): Promise<{ content: AdminType[], totalPages: number}> => {
  try {
    const response = await api.get(`/api/admins/paged?page=${page}&size=${size}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getFilteredAdmins = async (page: number, size: number, name: string, email: string): Promise<{ content: AdminType[], totalPages: number}> => {
  try {
    const response = await api.get(`/api/admins/filter?page=${page}&size=${size}&name=${name}&email=${email}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteAdmin = async (id: number) => {
  try {
    const response = await api.delete(`/api/admins/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}