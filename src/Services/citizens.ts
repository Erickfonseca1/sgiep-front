import { ActivityType } from '../Types/activity'
import { CitizenType } from '../Types/user'
import { api } from './api'

export const getCitizens = async (): Promise<CitizenType[]> => {
  try {
    const response = await api.get('/api/citizens')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getPagedCitizens = async (page: number, size: number): Promise<{ content: CitizenType[], totalPages: number}> => {
  try {
    const response = await api.get(`/api/citizens/paged?page=${page}&size=${size}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getFilteredCitizens = async (page: number, size: number, name: string, email: string): Promise<{ content: CitizenType[], totalPages: number}> => {
  try {
    const response = await api.get(`/api/citizens/filter?page=${page}&size=${size}&name=${name}&email=${email}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getCitizen = async (citizenId: number): Promise<CitizenType> => {
  try {
    const response = await api.get(`/api/citizens/${citizenId}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getCitizenActivities = async (citizenId: number): Promise<ActivityType[]> => {
  try {
    const response = await api.get(`/api/citizens/${citizenId}/activities`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const changeCitizenStatus = async (id: number) => {
  try {
    const response = await api.put(`/api/citizens/${id}/status`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
