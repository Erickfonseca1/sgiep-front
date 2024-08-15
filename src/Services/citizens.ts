import { CitizenType } from "../Types/user"
import { api } from "./api"

export const getCitizens = async (): Promise<CitizenType[]> => {
    try {
        const response = await api.get('/api/citizens')
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

