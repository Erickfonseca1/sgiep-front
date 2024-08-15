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
                activities: undefined
            }
        },
    ],
    role: ''
}

describe('CitizenCalendar Component', () => {
  beforeEach(() => {
    ;(getCitizen as jest.Mock).mockResolvedValue(mockCitizenData)
  })

  it("should render the citizen's name and activities", async () => {
    render(<CitizenCalendar citizenId={1} />)

    await waitFor(() => expect(screen.getByText('Agenda - João Silva')).toBeInTheDocument())

    expect(screen.getByText('Futebol')).toBeInTheDocument()
    expect(screen.getByText('Quadra 1')).toBeInTheDocument()
    expect(screen.getByText('08:00 - 10:00')).toBeInTheDocument()
    expect(screen.getByText('Segunda-feira')).toBeInTheDocument()
  })

  it('should handle a citizen with no activities', async () => {
    const mockEmptyCitizen: CitizenType = {
        id: 2,
        name: 'Maria Souza',
        activities: [],
        role: ''
    }
    ;(getCitizen as jest.Mock).mockResolvedValue(mockEmptyCitizen)

    render(<CitizenCalendar citizenId={2} />)

    await waitFor(() => expect(screen.getByText('Agenda - Maria Souza')).toBeInTheDocument())

    expect(screen.queryByText('Futebol')).not.toBeInTheDocument()
  })

  it('should display an error message if the citizen cannot be fetched', async () => {
    console.error = jest.fn();
  
    (getCitizen as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));
  
    render(<CitizenCalendar citizenId={3} />);
  
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Failed to fetch citizen:',
        expect.any(Error)
      );
    });
  });
})

