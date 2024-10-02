import { CitizenType } from '@/Types/user'
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

export const getPagedActivities = async (page: number, size: number): Promise<{ content: ActivityType[], totalPages: number, totalElements: number }> => {
  try {
    const response = await api.get(`/api/activities/paged?page=${page}&size=${size}`)
    const activities = response.data._embedded?.activityList || []
    const pageInfo = response.data.page

    return {
      content: activities,
      totalPages: pageInfo.totalPages,
      totalElements: pageInfo.totalElements
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getActivityCitizens = async (activityId: number): Promise<CitizenType[]> => {
  try {
    const response = await api.get(`/api/activities/${activityId}/citizens`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cidadãos associados à atividade', error);
    throw error;
  }
}

export const getActivitySchedules = async (activityId: number): Promise<{ dayOfWeek: string, startTime: string, endTime: string }[]> => {
  try {
    const response = await api.get(`/api/activities/${activityId}/schedules`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar horários da atividade', error);
    throw error;
  }
}

export const getActivityById = async (id: number): Promise<ActivityType | null> => {
  try {
    const response = await api.get(`/api/activities/${id}`)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar atividade', error)
    return null
  }
}

export const getFilteredActivities = async (
  page: number,
  size: number,
  professorId?: number,
  name?: string,
  location?: string
) => {
  try {
    const response = await api.get(`/api/activities/professor/${professorId}/filter`, {
      params: {
        page,
        size,
        name,
        location,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const filterActivitiesByLocation = async (location: string, page: number, size: number) => {
  try {
    const response = await api.get(`/api/activities/paged?location=${location}&page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createActivity = async (activity: ActivityType): Promise<ActivityType | null> => {
  try {
    const response = await api.post('/api/activities', activity)
    return response.data
  } catch (error) {
    console.error('Erro ao criar a atividade', error)
    return null
  }
}

export const updateActivity = async (activityid: number, activity: ActivityType): Promise<ActivityType | null> => {
  try {
    const response = await api.put(`/api/activities/${activityid}`, activity)
    return response.data
  } catch (error) {
    console.error('Erro ao atualizar a atividade', error)
    return null
  }
}

export const deleteActivity = async (id: number) => {
  try {
    const response = await api.delete(`/api/activities/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
