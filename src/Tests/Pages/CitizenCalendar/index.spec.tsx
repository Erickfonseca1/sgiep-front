import { render, screen, waitFor } from '@testing-library/react'
import CitizenCalendar from '@/Pages/CitizenCalendar'
import { getCitizen } from '@/Services/citizens'
import { CitizenType } from '@/Types/user'

jest.mock('@/Services/citizens', () => ({
  getCitizen: jest.fn(),
}))

const mockCitizenData: CitizenType = {
  id: 1,
  name: 'João Silva',
  activities: [
    {
      id: 1,
      name: 'Futebol',
      location: 'Quadra 1',
      schedules: [
        {
          id: 1,
          dayOfWeek: 'Monday',
          startTime: '08:00',
          endTime: '10:00',
        },
      ],
      description: '',
      professor: {
        id: undefined,
        name: '',
        role: '',
        activities: undefined,
      },
    },
  ],
  role: '',
}

describe('CitizenCalendar Component', () => {
  beforeEach(() => {
    ;(getCitizen as jest.Mock).mockResolvedValue(mockCitizenData)
  })

  it('should handle a citizen with no activities', async () => {
    const mockEmptyCitizen: CitizenType = {
      id: 2,
      name: 'Maria Souza',
      activities: [],
      role: '',
    }
    ;(getCitizen as jest.Mock).mockResolvedValue(mockEmptyCitizen)

    render(<CitizenCalendar citizenId={2} />)

    await waitFor(() =>
      expect(
        screen.getByText((element) => {
          return element === 'Agenda Cidadão - Maria Souza'
        }),
      ).toBeInTheDocument(),
    )

    expect(screen.queryByText('Futebol')).not.toBeInTheDocument()
  })

  it('should log an error when getCitizen fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const mockError = new Error('Failed to fetch citizen')
    ;(getCitizen as jest.Mock).mockRejectedValue(mockError)

    render(<CitizenCalendar citizenId={1} />)

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch citizen:', mockError)
    })

    consoleErrorSpy.mockRestore()
  })

  it('should correctly sort and map activities', async () => {
    const mockCitizenWithUnorderedActivities: CitizenType = {
      id: 1,
      name: 'João Silva',
      activities: [
        {
          id: 1,
          name: 'Futebol',
          location: 'Quadra 1',
          schedules: [
            {
              id: 2,
              dayOfWeek: 'Wednesday', // Quarta-feira
              startTime: '10:00',
              endTime: '12:00',
            },
            {
              id: 1,
              dayOfWeek: 'Monday', // Segunda-feira
              startTime: '08:00',
              endTime: '10:00',
            },
          ],
          description: '',
          professor: {
            id: undefined,
            name: '',
            role: '',
            activities: undefined,
          },
        },
      ],
      role: '',
    }

    ;(getCitizen as jest.Mock).mockResolvedValue(mockCitizenWithUnorderedActivities)

    render(<CitizenCalendar citizenId={1} />)

    await waitFor(() => {
      const dayElements = screen.getAllByText(/feira/i)
      expect(dayElements[1]).toHaveTextContent('Segunda-feira')
    })
  })

  it('should handle activities with no schedules gracefully', async () => {
    const mockCitizenWithEmptySchedules: CitizenType = {
      id: 1,
      name: 'João Silva',
      activities: [
        {
          id: 1,
          name: 'Futebol',
          location: 'Quadra 1',
          schedules: [],
          description: '',
          professor: {
            id: undefined,
            name: '',
            role: '',
            activities: undefined,
          },
        },
      ],
      role: '',
    }

    ;(getCitizen as jest.Mock).mockResolvedValue(mockCitizenWithEmptySchedules)

    render(<CitizenCalendar citizenId={1} />)

    await waitFor(() => {
      expect(screen.queryByText('Futebol')).not.toBeInTheDocument()
      expect(screen.queryByText('Quadra 1')).not.toBeInTheDocument()
    })
  })
})
