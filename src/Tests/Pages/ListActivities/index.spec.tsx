import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import ListActivities from '@/Pages/ListActivities'
import { getActivities } from '@/Services/activities'
import { enrollStudent } from '@/Services/enrollments'

jest.mock('@/Services/activities', () => ({
  getActivities: jest.fn(),
}))

jest.mock('@/Services/enrollments', () => ({
  enrollStudent: jest.fn(),
}))

// Mock para window.alert
beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

const mockActivities = [
  {
    id: 1,
    name: 'Futebol',
    description: 'Jogo de futebol',
    location: 'Quadra 1',
    professor: { id: 1, name: 'Professor A' },
    schedules: [
      { id: 1, dayOfWeek: 'MONDAY', startTime: '08:00', endTime: '10:00' },
      { id: 2, dayOfWeek: 'WEDNESDAY', startTime: '10:00', endTime: '12:00' },
    ],
  },
  {
    id: 2,
    name: 'Basquete',
    description: 'Jogo de basquete',
    location: 'Quadra 2',
    professor: { id: 2, name: 'Professor B' },
    schedules: [
      { id: 3, dayOfWeek: 'TUESDAY', startTime: '14:00', endTime: '16:00' },
    ],
  },
]

describe('ListActivities Component', () => {
  beforeEach(async () => {
    (getActivities as jest.Mock).mockResolvedValue(mockActivities)
    ;(enrollStudent as jest.Mock).mockResolvedValue('Inscrição realizada com sucesso')
    
    // Envolvendo a renderização dentro de `act`
    await act(async () => {
      render(<ListActivities />)
    })
  })

  it('should render the title and subtitle', () => {
    expect(screen.getByText('Atividades')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Explore as diversas atividades esportivas que oferecemos e encontre aquela que melhor se encaixa em seu estilo de vida. Participe, mantenha-se ativo e faça parte de nossa comunidade esportiva!'
      )
    ).toBeInTheDocument()
  })

  it('should load and display activities', async () => {
    await waitFor(() => {
      expect(screen.getByText('Futebol - Segunda-feira/Quarta-feira')).toBeInTheDocument()
      expect(screen.getByText('Basquete - Terça-feira')).toBeInTheDocument()
    })
  })

  it('should expand and collapse the activity card', async () => {
    await waitFor(() => {
      expect(screen.getByText('Futebol - Segunda-feira/Quarta-feira')).toBeInTheDocument()
    })

    const expandButton = screen.getAllByRole('button')[0]
    fireEvent.click(expandButton)

    expect(screen.getByText('Jogo de futebol')).toBeInTheDocument()
    expect(screen.getByText('Professor: Professor A')).toBeInTheDocument()

    fireEvent.click(expandButton)

    expect(screen.queryByText('Jogo de futebol')).not.toBeInTheDocument()
  })

  it('should call enrollStudent and display success message on enrollment', async () => {
    const expandButton = screen.getAllByRole('button')[0]
    fireEvent.click(expandButton)

    const enrollButton = screen.getByText('Increver-se')
    fireEvent.click(enrollButton)

    await waitFor(() => {
      expect(enrollStudent).toHaveBeenCalledWith(1, 3) // Activity ID 1, Citizen ID 3
    })

    expect(window.alert).toHaveBeenCalledWith('Inscrição realizada com sucesso')
  })

  it('should display an error message on enrollment failure', async () => {
    (enrollStudent as jest.Mock).mockRejectedValue(new Error('Erro ao tentar inscrever o cidadão na atividade'))

    const expandButton = screen.getAllByRole('button')[0]
    fireEvent.click(expandButton)

    const enrollButton = screen.getByText('Increver-se')
    fireEvent.click(enrollButton)

    await waitFor(() => {
      expect(enrollStudent).toHaveBeenCalledWith(1, 3) // Activity ID 1, Citizen ID 3
    })

    expect(window.alert).toHaveBeenCalledWith('Erro ao tentar inscrever o cidadão na atividade')
  })
})
