import { render, screen, waitFor } from '@testing-library/react';
import Home from '../../../Pages/Home';
import { useAuth } from '../../../Context/AuthContext';
import { getActivities } from '../../../Services/activities';
import { getActiveProfessors } from '../../../Services/professors';
import { getCitizens } from '../../../Services/citizens';
import { getActiveManagers } from '../../../Services/managers';

// Mock das funções de autenticação e serviços
jest.mock('../../../Context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../../Services/activities', () => ({
  getActivities: jest.fn(),
}));

jest.mock('../../../Services/professors', () => ({
  getActiveProfessors: jest.fn(),
}));

jest.mock('../../../Services/citizens', () => ({
  getCitizens: jest.fn(),
}));

jest.mock('../../../Services/managers', () => ({
  getActiveManagers: jest.fn(),
}));

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the professor welcome message', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAdmin: false,
      isManager: false,
      isProfessor: true,
      isCitizen: false,
      name: 'Professor Test',
    });

    (getActivities as jest.Mock).mockResolvedValue([]); // Certifique-se de mockar corretamente
    (getActiveProfessors as jest.Mock).mockResolvedValue([]); 
    (getCitizens as jest.Mock).mockResolvedValue([]);
    (getActiveManagers as jest.Mock).mockResolvedValue([]);

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Bem-vindo ao SGIEP Professor Test!')).toBeInTheDocument();
      expect(screen.getByText(/Lorem ipsum sit amet/i)).toBeInTheDocument();
    });
  });

  it('should render the citizen welcome message', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAdmin: false,
      isManager: false,
      isProfessor: false,
      isCitizen: true,
      name: 'Citizen Test',
    });

    (getActivities as jest.Mock).mockResolvedValue([]); // Certifique-se de mockar corretamente
    (getActiveProfessors as jest.Mock).mockResolvedValue([]); 
    (getCitizens as jest.Mock).mockResolvedValue([]);
    (getActiveManagers as jest.Mock).mockResolvedValue([]);

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Bem-vindo ao SGIEP Citizen Test!')).toBeInTheDocument();
      expect(screen.getByText(/Lorem ipsum amet/i)).toBeInTheDocument();
    });
  });
});
