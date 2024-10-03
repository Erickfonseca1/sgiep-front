import { api } from './api'
import { ManagerType } from '../Types/user'

export const getPagedManagers = async (page: number, size: number): Promise<{ content: ManagerType[], totalPages: number}> => {
  try {
    const response = await api.get(`/api/managers/paged?page=${page}&size=${size}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getActiveManagers = async (): Promise<ManagerType[]> => {
  try {
    const response = await api.get('/api/managers/active')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getFilteredManagers = async (page: number, size: number, name: string, email: string): Promise<{ content: ManagerType[], totalPages: number}> => {
  try {
    const response = await api.get(`/api/managers/filter?page=${page}&size=${size}&name=${name}&email=${email}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getManager = async (id: number): Promise<ManagerType> => {
  try {
    const response = await api.get(`/api/managers/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateManager = async (id: number, manager: ManagerType): Promise<ManagerType> => {
  try {
    const response = await api.put(`/api/managers/${id}`, manager)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const changeManagerStatus = async (id: number) => {
  try {
    const response = await api.put(`/api/managers/${id}/status`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}