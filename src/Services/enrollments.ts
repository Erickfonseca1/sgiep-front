import { api } from './api'

export const enrollStudent = async (activityId: number, citizenId: number): Promise<string> => {
  try {
    const response = await api.post('/api/enrollments/enroll', null, {
      params: {
        activityId,
        citizenId,
      },
    })
    return response.data
  } catch (error: any) {
    console.error('Failed to enroll student:', error.response?.data || error.message)
    throw new Error(error.response?.data || 'Failed to enroll student')
  }
}
