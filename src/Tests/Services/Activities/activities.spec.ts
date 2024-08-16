import { getActivities } from '@/Services/activities'
import { api } from '@/Services/api'

// Mocking the API module
jest.mock('@/Services/api', () => ({
  api: {
    get: jest.fn(),
  },
}))

describe('getActivities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {}) // Mock console.error
  })

  afterEach(() => {
    jest.restoreAllMocks() // Restore console.error after each test
  })

  it('should fetch activities successfully', async () => {
    const mockActivities = [
      { id: 1, name: 'Football', location: 'Field 1', schedules: [] },
      { id: 2, name: 'Basketball', location: 'Court 2', schedules: [] },
    ]

    // Mocking the API response
    ;(api.get as jest.Mock).mockResolvedValue({ data: mockActivities })

    const result = await getActivities()

    expect(api.get).toHaveBeenCalledWith('/api/activities')
    expect(result).toEqual(mockActivities)
  })

  it('should log an error to the console if fetching activities fails', async () => {
    const errorMessage = 'Failed to fetch activities'

    // Mocking the API to reject with an error
    ;(api.get as jest.Mock).mockRejectedValue(new Error(errorMessage))

    const result = await getActivities()

    expect(api.get).toHaveBeenCalledWith('/api/activities')
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage))
    expect(result).toBeUndefined() // Since the function does not rethrow the error
  })
})
