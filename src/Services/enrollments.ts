/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from './api'

export const enrollStudent = async ({ activityId, citizenId }: { activityId: number; citizenId: number }) => {
  try {
    const response = await api.post('/api/enrollments/enroll', {
      activityId,
      citizenId
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data); // Lança o erro retornado pelo servidor
    } else {
      throw new Error('Erro desconhecido ao tentar inscrever o cidadão.');
    }
  }
};