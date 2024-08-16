import { enrollStudent } from '@/Services/enrollments'
import { api } from '@/Services/api'

// Mocking the API module
jest.mock('@/Services/api', () => ({
  api: {
    post: jest.fn(),
  },
}))

describe('enrollStudent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {}) // Mock console.error
  })

  afterEach(() => {
    jest.restoreAllMocks() // Restore console.error after each test
  })

  it('should enroll the student successfully and return the response data', async () => {
    const mockResponseData = 'Enrollment successful'

    // Mocking the API response
    ;(api.post as jest.Mock).mockResolvedValue({ data: mockResponseData })

    const result = await enrollStudent(1, 1)

    expect(api.post).toHaveBeenCalledWith('/api/enrollments/enroll', null, {
      params: {
        activityId: 1,
        citizenId: 1,
      },
    })
    expect(result).toBe(mockResponseData)
  })

  it('should handle API errors and log an error message', async () => {
    const errorMessage = 'Enrollment failed'
    const mockError = { response: { data: errorMessage } }

    // Mocking the API to reject with an error
    ;(api.post as jest.Mock).mockRejectedValue(mockError)

    await expect(enrollStudent(1, 1)).rejects.toThrow(new Error(errorMessage))
    expect(api.post).toHaveBeenCalledWith('/api/enrollments/enroll', null, {
      params: {
        activityId: 1,
        citizenId: 1,
      },
    })
    expect(console.error).toHaveBeenCalledWith('Failed to enroll student:', errorMessage)
  })

  it('should handle generic errors when no response data is provided', async () => {
    const errorMessage = 'Generic error'
    const mockError = new Error(errorMessage)

    // Mocking the API to reject with a generic error
    ;(api.post as jest.Mock).mockRejectedValue(mockError)

    await expect(enrollStudent(1, 1)).rejects.toThrow(new Error('Failed to enroll student'))
    expect(api.post).toHaveBeenCalledWith('/api/enrollments/enroll', null, {
      params: {
        activityId: 1,
        citizenId: 1,
      },
    })
    expect(console.error).toHaveBeenCalledWith('Failed to enroll student:', errorMessage)
  })
})
