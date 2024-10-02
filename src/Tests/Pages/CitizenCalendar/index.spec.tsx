import { render, screen, waitFor } from '@testing-library/react';
import CitizenCalendar from '../../../Pages/CitizenCalendar';
import { getCitizen } from '../../../Services/citizens';
import { useAuth } from '../../../Context/AuthContext';

// Mocking the services
jest.mock('../../../Services/citizens', () => ({
  getCitizen: jest.fn(),
}));

jest.mock('../../../Context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockCitizen = {
  id: 1,
  name: 'Citizen Teste',
  activitiesAsStudent: [
    {
      name: 'Futebol',
      location: 'Quadra 1',
      schedules: [
        {
          id: 1,
          dayOfWeek: 'MONDAY',
          startTime: '10:00',
          endTime: '11:00',
          activityName: 'Futebol',
          activityLocation: 'Quadra 1',
        },
        {
          id: 2,
          dayOfWeek: 'WEDNESDAY',
          startTime: '12:00',
          endTime: '13:00',
          activityName: 'Futebol',
          activityLocation: 'Quadra 1',
        },
      ],
    },
  ],
};

describe('CitizenCalendar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ userId: 1 });
    (getCitizen as jest.Mock).mockResolvedValue(mockCitizen);
  });

  it('should display a message when there are no activities', async () => {
    (getCitizen as jest.Mock).mockResolvedValue({ id: 1, name: 'Citizen Teste', activitiesAsStudent: null });

    render(<CitizenCalendar />);

    await waitFor(() => {
      expect(screen.getByText('Você ainda não se inscreveu em nenhuma atividade.')).toBeInTheDocument();
    });
  });
});
