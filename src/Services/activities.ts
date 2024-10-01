import { ActivityType } from '../Types/activity'
import { api } from './api'

export const getActivities = async () => {
  try {
    const response = await api.get('/api/activities')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const createActivity = async (activity: ActivityType) => {
  try {
    const response = await api.post('/api/activities', activity)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
