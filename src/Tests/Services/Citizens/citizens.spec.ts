import { getCitizens, getCitizen } from '@/Services/citizens'
import { api } from '@/Services/api'
import { CitizenType } from '@/Types/user'

// Mocking the API module
jest.mock('@/Services/api', () => ({
  api: {
    get: jest.fn(),
  },
}))

describe('Citizens API error handling', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {}) // Mock console.error
  })

  afterEach(() => {
    jest.restoreAllMocks() // Restore console.error after each test
  })

  it('should log an error to the console when getCitizens fails', async () => {
    const errorMessage = 'Failed to fetch citizens'

    // Mocking the API to reject with an error
    ;(api.get as jest.Mock).mockRejectedValue(new Error(errorMessage))

    await expect(getCitizens()).rejects.toThrow(errorMessage)
    expect(api.get).toHaveBeenCalledWith('/api/citizens')
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage))
  })

  it('should log an error to the console when getCitizen fails', async () => {
    const errorMessage = 'Failed to fetch citizen'

    // Mocking the API to reject with an error
    ;(api.get as jest.Mock).mockRejectedValue(new Error(errorMessage))

    await expect(getCitizen(1)).rejects.toThrow(errorMessage)
    expect(api.get).toHaveBeenCalledWith('/api/citizens/1')
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage))
  })

  it('should fetch citizens using getCitizens', async () => {
    const mockCitizens: CitizenType[] = [
      { id: 1, name: 'John Doe', activities: [], role: '' },
      { id: 2, name: 'Jane Doe', activities: [], role: '' },
    ]

    // Mocking the API response
    ;(api.get as jest.Mock).mockResolvedValue({ data: mockCitizens })

    const result = await getCitizens()

    expect(api.get).toHaveBeenCalledWith('/api/citizens')
    expect(result).toEqual(mockCitizens)
  })

  it('should fetch a single citizen using getCitizen', async () => {
    const mockCitizen: CitizenType = { id: 1, name: 'John Doe', activities: [], role: '' }

    // Mocking the API response
    ;(api.get as jest.Mock).mockResolvedValue({ data: mockCitizen })

    const result = await getCitizen(1)

    expect(api.get).toHaveBeenCalledWith('/api/citizens/1')
    expect(result).toEqual(mockCitizen)
  })

  it('should handle errors in getCitizens and getCitizen similarly', async () => {
    const errorMessage = 'Request failed'

    // Mocking the API to reject with an error for both functions
    ;(api.get as jest.Mock).mockRejectedValue(new Error(errorMessage))

    // Test for getCitizens
    await expect(getCitizens()).rejects.toThrow(errorMessage)
    expect(api.get).toHaveBeenCalledWith('/api/citizens')
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage))

    // Test for getCitizen
    await expect(getCitizen(1)).rejects.toThrow(errorMessage)
    expect(api.get).toHaveBeenCalledWith('/api/citizens/1')
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage))
  })
})
