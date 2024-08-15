import { api } from "./api"

export const getProfessors = async () => {
	try {
		const response = await api.get('/api/professors')
		return response.data
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const getProfessor = async (professorId: number) => {
	try {
		const response = await api.get(`/api/professors/${professorId}`)
		return response.data
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const getProfessorActivities = async (professorId: number) => {
	try {
		const response = await api.get(`/api/professors/${professorId}/activities`)
		return response.data
	} catch (error) {
		console.error(error)
		throw error
	}
}