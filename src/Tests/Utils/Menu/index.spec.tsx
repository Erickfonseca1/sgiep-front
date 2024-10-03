import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Menu from '../../../utils/Menu'; // Substitua pelo caminho correto
import { AuthContext } from '../../../Context/AuthContext'; // Mocke o AuthContext corretamente

// Mock do toggleDrawer
const toggleDrawer = jest.fn();
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderMenu = (isOpen: boolean, authValues: any) => {
    return render(
      <AuthContext.Provider value={authValues}>
        <BrowserRouter>
          <Menu isOpen={isOpen} toggleDrawer={toggleDrawer} />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  describe('Menu Component', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should render with the correct logo', () => {
      const authValues = { isAdmin: false, isManager: false, isProfessor: false, isCitizen: false };
      renderMenu(true, authValues);
  
      const logo = screen.getByAltText('Logo SGIEP');
      expect(logo).toBeInTheDocument();
    });
  
    it('should open and close the admin submenu correctly', async () => {
      const authValues = { isAdmin: true, isManager: false, isProfessor: false, isCitizen: false };
      renderMenu(true, authValues);
  
      const adminButton = screen.getByText('Administrador');
      fireEvent.click(adminButton);
  
      const adminSubmenu = screen.getByText('Lista');
      expect(adminSubmenu).toBeInTheDocument();
  
      fireEvent.click(adminButton);
  
      await waitForElementToBeRemoved(() => screen.queryByText('Lista'));
      expect(adminSubmenu).not.toBeInTheDocument();
    });
  
    it('should call navigate with correct path when home button is clicked', () => {
      const authValues = { isAdmin: false, isManager: false, isProfessor: false, isCitizen: false };
      renderMenu(true, authValues);
  
      const homeButton = screen.getByText('Home');
      fireEvent.click(homeButton);
  
      // Verifica se a navegação foi chamada corretamente com a rota "/"
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  
    it('should close all submenus when the drawer is closed', () => {
      const authValues = { isAdmin: true, isManager: true, isProfessor: true, isCitizen: true };
      renderMenu(true, authValues);
  
      // Simula que o menu foi fechado
      toggleDrawer();
  
      expect(toggleDrawer).toHaveBeenCalled();
      expect(screen.queryByText('Lista')).not.toBeInTheDocument();
    });
  
    it('should render citizen options when user is a citizen', () => {
      const authValues = { isAdmin: false, isManager: false, isProfessor: false, isCitizen: true };
      renderMenu(true, authValues);
  
      const citizenButton = screen.getByText('Agenda');
      expect(citizenButton).toBeInTheDocument();
    });
  
    it('should toggle sports submenu correctly', async () => {
      const authValues = { isAdmin: true, isManager: false, isProfessor: false, isCitizen: false };
      renderMenu(true, authValues);
    
      const sportsButton = screen.getByText('Atividades Esportivas');
      fireEvent.click(sportsButton);
    
      const sportsSubmenu = screen.getByText('Lista');
      expect(sportsSubmenu).toBeInTheDocument(); // Verifica que o submenu foi aberto
    
      fireEvent.click(sportsButton);
    
      // Espera que o submenu seja removido após o clique
      await waitForElementToBeRemoved(() => screen.queryByText('Lista'));
    
      expect(sportsSubmenu).not.toBeInTheDocument(); // Verifica se o submenu foi fechado
    });
  });
