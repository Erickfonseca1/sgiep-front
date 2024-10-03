import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminList from '../../../../Pages/Admin/List/index';
import { getPagedAdmins, getFilteredAdmins, deleteAdmin } from '../../../../Services/admins';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../../../Context/AuthContext';

// Mocking the `getPagedAdmins`, `getFilteredAdmins` and `deleteAdmin` service
jest.mock('../../../../Services/admins', () => ({
  getPagedAdmins: jest.fn(),
  getFilteredAdmins: jest.fn(),
  deleteAdmin: jest.fn(),
}));

// Mocking the AuthContext
jest.mock('../../../../Context/AuthContext', () => ({
  useAuth: jest.fn(), // Corrige para garantir que o useAuth seja uma função mockada corretamente
}));

const mockAdmins = {
  content: [
    { id: 1, name: 'Admin A', email: 'adminA@test.com' },
    { id: 2, name: 'Admin B', email: 'adminB@test.com' },
  ],
  totalPages: 2,
};

describe('AdminList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getPagedAdmins as jest.Mock).mockResolvedValue(mockAdmins);
    (getFilteredAdmins as jest.Mock).mockResolvedValue(mockAdmins);
    (deleteAdmin as jest.Mock).mockResolvedValue(true);
    (useAuth as jest.Mock).mockReturnValue({ userId: 1 }); // Corrigido para funcionar corretamente
  });

  it('should render the list of admins and pagination', async () => {
    render(
      <MemoryRouter>
        <AdminList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Admin A')).toBeInTheDocument();
      expect(screen.getByText('Admin B')).toBeInTheDocument();
    });

    expect(screen.getByText('Linhas por página')).toBeInTheDocument();
  });
  it('should call deleteAdmin and reload admins when confirmed', async () => {
    render(
      <MemoryRouter>
        <AdminList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Admin A')).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByRole('button', { name: /Excluir/i })[1]);

    await waitFor(() => {
      expect(screen.getByText('Confirmar Exclusão')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Excluir'));

    await waitFor(() => {
      expect(deleteAdmin).toHaveBeenCalledWith(2);
      expect(getPagedAdmins).toHaveBeenCalledTimes(2); // Uma vez na montagem e outra após a exclusão
    });
  });

  it('should filter admins when filter is applied', async () => {
    render(
      <MemoryRouter>
        <AdminList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Admin A')).toBeInTheDocument();
    });

    // Simulate applying a filter
    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Admin A' } });
    fireEvent.click(screen.getByText('Filtrar'));

    await waitFor(() => {
      expect(getFilteredAdmins).toHaveBeenCalledWith(0, 10, 'admin a', ''); // Filtrando pelo nome
    });
  });
});
