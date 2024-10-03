import { UserProfileType } from "../Types/user"
import { api } from "./api"

export const getUserProfile = async (id: number) => {
  try {
    const response = await api.get(`/api/users/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
} 

export const updateUserProfile = async (id: number, user: Partial<UserProfileType>): Promise<UserProfileType | null> => {
  try {
    const response = await api.put(`/api/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar o perfil:', error);
    return null;
  }
};