import { api } from './api'

export const enrollStudent = async ({ activityId, citizenId }: { activityId: number; citizenId: number }) => {
  try {
    const response = await api.post('/api/enrollments/enroll', {
      activityId,
      citizenId
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao inscrever cidadão:', error);
    throw error;
  }
};
