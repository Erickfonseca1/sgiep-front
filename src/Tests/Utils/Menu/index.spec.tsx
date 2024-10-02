import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Menu from '../../../utils/Menu'; // Substitua pelo caminho correto
import { AuthContext } from '../../../Context/AuthContext'; // Mocke o AuthContext corretamente

// Mock do toggleDrawer
const toggleDrawer = jest.fn();

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
  it('should render with the correct logo', () => {
    const authValues = { isAdmin: false, isManager: false, isProfessor: false, isCitizen: false };
    renderMenu(true, authValues);

    const logo = screen.getByAltText('Logo SGIEP');
    expect(logo).toBeInTheDocument();
  });

  it('should open and close submenus correctly', async () => {
    const authValues = { isAdmin: true, isManager: false, isProfessor: false, isCitizen: false };
    renderMenu(true, authValues);

    // Abre o submenu
    const adminButton = screen.getByText('Administrador');
    fireEvent.click(adminButton);

    const adminSubmenu = screen.getByText('Lista');
    expect(adminSubmenu).toBeInTheDocument();

    // Fecha o submenu
    fireEvent.click(adminButton);

    // Espera o submenu ser removido
    await waitForElementToBeRemoved(() => screen.queryByText('Lista'));

    expect(adminSubmenu).not.toBeInTheDocument(); // Verifica se o submenu foi fechado
  });

  it('should render admin options when user is an admin', () => {
    const authValues = { isAdmin: true, isManager: false, isProfessor: false, isCitizen: false };
    renderMenu(true, authValues);

    const adminButton = screen.getByText('Administrador');
    expect(adminButton).toBeInTheDocument();
  });

  it('should render professor options when user is a professor', () => {
    const authValues = { isAdmin: false, isManager: false, isProfessor: true, isCitizen: false };
    renderMenu(true, authValues);

    const professorButton = screen.getByText('Minha Agenda');
    expect(professorButton).toBeInTheDocument();
  });

  it('should render citizen options when user is a citizen', () => {
    const authValues = { isAdmin: false, isManager: false, isProfessor: false, isCitizen: true };
    renderMenu(true, authValues);

    const citizenButton = screen.getByText('Agenda');
    expect(citizenButton).toBeInTheDocument();
  });
});
