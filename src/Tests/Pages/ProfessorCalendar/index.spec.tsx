import { render, screen, waitFor } from '@testing-library/react'
import ProfessorCalendar from '@/Pages/ProfessorCalendar'
import { getProfessor } from '@/Services/professors'
import { ProfessorType } from '@/Types/user'

jest.mock('@/Services/professors', () => ({
  getProfessor: jest.fn(),
}))

const mockProfessorData: ProfessorType = {
  id: 1,
  name: 'Prof. João Silva',
  activities: [
    {
      id: 1,
      name: 'Matemática',
      location: 'Sala 101',
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

describe('ProfessorCalendar Component', () => {
  beforeEach(() => {
    ;(getProfessor as jest.Mock).mockResolvedValue(mockProfessorData)
  })

  it("should render the professor's name and activities", async () => {
    render(<ProfessorCalendar professorId={1} />)

    await waitFor(() => expect(screen.getByText('Agenda - Prof. João Silva')).toBeInTheDocument())

    expect(screen.getByText('Matemática')).toBeInTheDocument()
    expect(screen.getByText('Sala 101')).toBeInTheDocument()
    expect(screen.getByText('08:00 - 10:00')).toBeInTheDocument()
    expect(screen.getByText('Segunda-feira')).toBeInTheDocument()
  })

  it('should call getProfessor when the component is mounted', async () => {
    render(<ProfessorCalendar professorId={1} />)
    await waitFor(() => expect(getProfessor).toHaveBeenCalledTimes(2))
  })

  it('should log an error when getProfessor fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    ;(getProfessor as jest.Mock).mockRejectedValue(new Error('Failed to fetch professor'))

    render(<ProfessorCalendar professorId={1} />)

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch professor:', expect.any(Error))
    })

    consoleErrorSpy.mockRestore()
  })
})
