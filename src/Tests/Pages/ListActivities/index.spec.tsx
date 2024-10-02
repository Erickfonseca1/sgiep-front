import { render, screen, waitFor } from '@testing-library/react';
import ListActivities from '../../../Pages/ListActivities';
import { getActivities } from '../../../Services/activities';
import { enrollStudent } from '../../../Services/enrollments';
import { useAuth } from '../../../Context/AuthContext';

// Mock dos serviços e do contexto
jest.mock('../../../Services/activities', () => ({
  getActivities: jest.fn(),
}));

jest.mock('../../../Services/enrollments', () => ({
  enrollStudent: jest.fn(),
}));

jest.mock('../../../Context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockActivities = [
  {
    id: 1,
    name: 'Futebol',
    description: 'Jogo de futebol',
    location: 'Quadra 1',
    professor: { name: 'Professor A' },
    schedules: [
      {
        id: 1,
        dayOfWeek: 'MONDAY',
        startTime: '10:00',
        endTime: '11:00',
      },
    ],
  },
  {
    id: 2,
    name: 'Basquete',
    description: 'Jogo de basquete',
    location: 'Quadra 2',
    professor: { name: 'Professor B' },
    schedules: [
      {
        id: 2,
        dayOfWeek: 'TUESDAY',
        startTime: '14:00',
        endTime: '15:00',
      },
    ],
  },
];

describe('ListActivities Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mocking the auth context values
    (useAuth as jest.Mock).mockReturnValue({
      isAdmin: false,
      isManager: false,
      isProfessor: false,
      userId: 1,
    });

    // Mocking the service to return mock activities
    (getActivities as jest.Mock).mockResolvedValue(mockActivities);
    (enrollStudent as jest.Mock).mockResolvedValue('Inscrição realizada com sucesso!');
  });

  it('should render the list of activities', async () => {
    render(<ListActivities />);

    // Usando uma função flexível para encontrar o texto
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Futebol'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('Basquete'))).toBeInTheDocument();
    });
  });
});
