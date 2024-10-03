import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CitizenList from '../../../../Pages/Citizen/List/index';
import { getPagedCitizens, getFilteredCitizens, changeCitizenStatus } from '../../../../Services/citizens';
import { MemoryRouter } from 'react-router-dom';

// Mocking the services
jest.mock('../../../../Services/citizens', () => ({
  getPagedCitizens: jest.fn(),
  getFilteredCitizens: jest.fn(),
  changeCitizenStatus: jest.fn(),
}));

const mockCitizens = {
  content: [
    {
      id: 1,
      name: 'Citizen A',
      email: 'citizenA@test.com',
      active: true,
      activitiesAsStudent: [{ id: 1, name: 'Atividade A' }],
    },
    {
      id: 2,
      name: 'Citizen B',
      email: 'citizenB@test.com',
      active: false,
      activitiesAsStudent: [{ id: 2, name: 'Atividade B' }],
    },
  ],
  totalPages: 2,
};

describe('CitizenList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getPagedCitizens as jest.Mock).mockResolvedValue(mockCitizens);
    (getFilteredCitizens as jest.Mock).mockResolvedValue(mockCitizens);
    (changeCitizenStatus as jest.Mock).mockResolvedValue(true);
  });

  it('should render the list of citizens and pagination', async () => {
    render(
      <MemoryRouter>
        <CitizenList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Citizen A')).toBeInTheDocument();
      expect(screen.getByText('Citizen B')).toBeInTheDocument();
    });

    expect(screen.getByText('Linhas por página')).toBeInTheDocument();
  });

  it('should call changeCitizenStatus when status icon is clicked', async () => {
    render(
      <MemoryRouter>
        <CitizenList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Citizen A')).toBeInTheDocument();
    });

    // Simula o clique para desativar o cidadão
    fireEvent.click(screen.getAllByRole('button', { name: /desativar cidadão/i })[0]);

    await waitFor(() => {
      expect(changeCitizenStatus).toHaveBeenCalledWith(1); // Citizen A's ID
    });
  });

  it('should filter citizens when filter is applied', async () => {
    render(
      <MemoryRouter>
        <CitizenList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Citizen A')).toBeInTheDocument();
    });

    // Simulate applying a filter
    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Citizen A' } });
    fireEvent.click(screen.getByText('Filtrar'));

    await waitFor(() => {
      expect(getFilteredCitizens).toHaveBeenCalledWith(0, 10, 'citizen a', ''); // Filtrando pelo nome
    });
  });

  it('should change page and fetch citizens when pagination is used', async () => {
    render(
      <MemoryRouter>
        <CitizenList />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      expect(screen.getByText('Citizen A')).toBeInTheDocument();
    });
  
    const nextPageButton = screen.getByLabelText('Go to next page'); // Seleciona o botão de próxima página
    fireEvent.click(nextPageButton); // Simula o clique no botão de próxima página
  
    await waitFor(() => {
      expect(getPagedCitizens).toHaveBeenCalledWith(1, 10); // Nova página 1 com 10 linhas por página
    });
  });
  
});
