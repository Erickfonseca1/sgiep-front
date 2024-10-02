import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ActivityList from '../../../../Pages/Activity/List';
import { getPagedActivities, deleteActivity, getActivityById, getActivityCitizens } from '../../../../Services/activities';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../../../Services/activities', () => ({
  getPagedActivities: jest.fn(),
  filterActivitiesByLocation: jest.fn(),
  deleteActivity: jest.fn(),
  getActivityById: jest.fn(),
  getActivityCitizens: jest.fn(),
}));

const mockActivities = {
  content: [
    { id: 1, name: 'Futebol', location: 'Quadra 1', maxVacancies: 20 },
    { id: 2, name: 'Basquete', location: 'Quadra 2', maxVacancies: 10 },
  ],
  totalElements: 2,
};

const mockCitizens = [
  { id: 1, name: 'Cidadão A' },
  { id: 2, name: 'Cidadão B' },
];

describe('ActivityList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getPagedActivities as jest.Mock).mockResolvedValue(mockActivities);
    (getActivityCitizens as jest.Mock).mockResolvedValue(mockCitizens);
  });

  it('should render activities and pagination', async () => {
    render(
      <MemoryRouter>
        <ActivityList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Futebol')).toBeInTheDocument();
      expect(screen.getByText('Basquete')).toBeInTheDocument();
    });

    // Verifica se a paginação está sendo renderizada corretamente
    expect(screen.getByText('Linhas por página')).toBeInTheDocument();
  });

  it('should delete activity and reload activities', async () => {
    render(
      <MemoryRouter>
        <ActivityList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Futebol')).toBeInTheDocument();
    });

    // Simula a exclusão de uma atividade
    (deleteActivity as jest.Mock).mockResolvedValueOnce({});
    fireEvent.click(screen.getAllByRole('button', { name: /deletar/i })[0]);

    await waitFor(() => {
      expect(deleteActivity).toHaveBeenCalledWith(1);
      expect(getPagedActivities).toHaveBeenCalledTimes(2); // Uma vez na montagem, outra vez após deletar
    });
  });

  it('should open modal and show activity details, then close the modal', async () => {
    (getActivityById as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'Futebol',
      location: 'Quadra 1',
      maxVacancies: 20,
      description: 'Descrição do Futebol',
      professor: { name: 'Professor A' },
    });
  
    render(
      <MemoryRouter>
        <ActivityList />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      expect(screen.getByText('Futebol')).toBeInTheDocument();
    });
  
    // Clica no botão de visualizar atividade
    fireEvent.click(screen.getAllByRole('button', { name: /visualizar/i })[0]);
  
    await waitFor(() => {
      expect(screen.getByText('Detalhes da Atividade')).toBeInTheDocument();
      expect(screen.getByText('Descrição do Futebol')).toBeInTheDocument();
      expect(screen.getByText('Professor A')).toBeInTheDocument();
      expect(screen.getByText('Cidadão A')).toBeInTheDocument();
    });
  
    // Fecha o modal
    fireEvent.click(screen.getByText('Fechar'));
  
    // Usa waitFor para garantir que o modal foi removido do DOM
    await waitFor(() => {
      expect(screen.queryByText('Detalhes da Atividade')).not.toBeInTheDocument();
    });
  });
  
});
