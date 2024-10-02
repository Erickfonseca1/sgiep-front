import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ActivityForm from '../../../../Pages/Activity/Form';
import { createActivity } from '../../../../Services/activities';
import { getActiveProfessors } from '../../../../Services/professors';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../../../Services/activities', () => ({
  getActivityById: jest.fn(),
  createActivity: jest.fn(),
  updateActivity: jest.fn(),
  getActivitySchedules: jest.fn(),
}));

jest.mock('../../../../Services/professors', () => ({
  getActiveProfessors: jest.fn(),
}));

const mockProfessors = [
  { id: 1, name: 'Professor A' },
  { id: 2, name: 'Professor B' },
];
describe('ActivityForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getActiveProfessors as jest.Mock).mockResolvedValue(mockProfessors);
  });

  it('should display an error message if creating activity fails', async () => {
    (createActivity as jest.Mock).mockResolvedValue(null);

    render(
      <MemoryRouter>
        <ActivityForm />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole('button', { name: 'Cadastrar Atividade' }));

    await waitFor(() => {
      expect(screen.getByText('Erro ao criar atividade')).toBeInTheDocument();
    });
  });
  it('should add a new schedule', async () => {
    render(
      <MemoryRouter>
        <ActivityForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Adicionar Horário'));

    await waitFor(() => {
      const scheduleFields = screen.getAllByLabelText('Dia da Semana');
      expect(scheduleFields.length).toBe(2); // The original and the newly added one
    });
  });
});
