import { ActivityType } from '../Types/activity'
import { ProfessorType } from '../Types/user'
import { api } from './api'

export const getActiveProfessors = async (): Promise<ProfessorType[]> => {
  try {
    const response = await api.get('/api/professors/active')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getPagedProfessors = async (page: number, size: number): Promise<{ content: ProfessorType[], totalPages: number}> => {
  try {
    const response = await api.get(`/api/professors/paged?page=${page}&size=${size}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getFilteredProfessors = async (page: number, size: number, name: string, email: string): Promise<{ content: ProfessorType[], totalPages: number}> => {
  try {
    const response = await api.get(`/api/professors/filter?page=${page}&size=${size}&name=${name}&email=${email}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getProfessor = async (professorId: number): Promise<ProfessorType> => {
  try {
    const response = await api.get(`/api/professors/${professorId}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getProfessorActivities = async (professorId: number): Promise<ActivityType[]> => {
  try {
    const response = await api.get(`/api/professors/${professorId}/activities`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
