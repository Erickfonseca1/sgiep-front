import { getProfessors, getProfessor, getProfessorActivities } from '@/Services/professors'
import { api } from '@/Services/api'
import { ProfessorType } from '@/Types/user'
import { ActivityType } from '@/Types/activity'

// Mocking the API module
jest.mock('@/Services/api', () => ({
  api: {
    get: jest.fn(),
  },
}))

describe('Professors API error handling', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {}) // Mock console.error
  })

  afterEach(() => {
    jest.restoreAllMocks() // Restore console.error after each test
  })

  it('should log an error to the console when getProfessors fails', async () => {
    const errorMessage = 'Failed to fetch professors'

    // Mocking the API to reject with an error
    ;(api.get as jest.Mock).mockRejectedValue(new Error(errorMessage))

    await expect(getProfessors()).rejects.toThrow(errorMessage)
    expect(api.get).toHaveBeenCalledWith('/api/professors')
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage))
  })

  it('should log an error to the console when getProfessor fails', async () => {
    const errorMessage = 'Failed to fetch professor'

    // Mocking the API to reject with an error
    ;(api.get as jest.Mock).mockRejectedValue(new Error(errorMessage))

    await expect(getProfessor(1)).rejects.toThrow(errorMessage)
    expect(api.get).toHaveBeenCalledWith('/api/professors/1')
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage))
  })

  it('should log an error to the console when getProfessorActivities fails', async () => {
    const errorMessage = 'Failed to fetch professor activities'

    // Mocking the API to reject with an error
    ;(api.get as jest.Mock).mockRejectedValue(new Error(errorMessage))

    await expect(getProfessorActivities(1)).rejects.toThrow(errorMessage)
    expect(api.get).toHaveBeenCalledWith('/api/professors/1/activities')
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage))
  })

  it('should fetch professors using getProfessors', async () => {
    const mockProfessors: ProfessorType[] = [
      {
        id: 1,
        name: 'Prof. John Doe',
        activities: [],
        role: '',
      },
      {
        id: 2,
        name: 'Prof. Jane Doe',
        activities: [],
        role: '',
      },
    ]

    // Mocking the API response
    ;(api.get as jest.Mock).mockResolvedValue({ data: mockProfessors })

    const result = await getProfessors()

    expect(api.get).toHaveBeenCalledWith('/api/professors')
    expect(result).toEqual(mockProfessors)
  })

  it('should fetch a single professor using getProfessor', async () => {
    const mockProfessor: ProfessorType = {
      id: 1,
      name: 'Prof. John Doe',
      activities: [],
      role: '',
    }

    // Mocking the API response
    ;(api.get as jest.Mock).mockResolvedValue({ data: mockProfessor })

    const result = await getProfessor(1)

    expect(api.get).toHaveBeenCalledWith('/api/professors/1')
    expect(result).toEqual(mockProfessor)
  })

  it('should fetch professor activities using getProfessorActivities', async () => {
    const mockActivities: ActivityType[] = [
      {
        id: 1,
        name: 'Mathematics',
        location: 'Room 101',
        schedules: [],
        description: '',
        professor: {
          id: undefined,
          name: '',
          role: '',
          activities: undefined,
        },
      },
      {
        id: 2,
        name: 'Physics',
        location: 'Room 102',
        schedules: [],
        description: '',
        professor: {
          id: undefined,
          name: '',
          role: '',
          activities: undefined,
        },
      },
    ]

    // Mocking the API response
    ;(api.get as jest.Mock).mockResolvedValue({ data: mockActivities })

    const result = await getProfessorActivities(1)

    expect(api.get).toHaveBeenCalledWith('/api/professors/1/activities')
    expect(result).toEqual(mockActivities)
  })
})
