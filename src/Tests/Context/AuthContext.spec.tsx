import { render, screen, waitFor, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../Context/AuthContext';
import { authenticateUser } from '../../Services/auth';
import userEvent from '@testing-library/user-event';

jest.mock('../../Services/auth', () => ({
  authenticateUser: jest.fn(),
}));

// Mock de localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Mock de window.location.href
beforeAll(() => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: { href: '' },
  });
});

const mockAuthData = {
  token: 'mock-token',
  role: 'admin',
  name: 'John Doe',
  id: 1,
};

const TestComponent = () => {
  const { handleLogin, isLoggedIn, name, logout, error } = useAuth();
  return (
    <div>
      <button onClick={() => handleLogin('test@test.com', 'password123')}>Login</button>
      <button onClick={logout}>Logout</button>
      <span data-testid="loginStatus">{isLoggedIn ? 'Logged In' : 'Logged Out'}</span>
      <span data-testid="name">{name || 'No Name'}</span>
      {error && <span data-testid="error">{error}</span>}
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    (authenticateUser as jest.Mock).mockResolvedValue(mockAuthData);
    window.localStorage.clear();
  });

  it('should log in and update the state correctly', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Verifica que inicialmente o usuário não está logado
    expect(screen.getByTestId('loginStatus').textContent).toBe('Logged Out');

    // Simula o clique no botão de login
    await act(async () => {
      userEvent.click(screen.getByText('Login'));
    });

    // Verifica se o login foi bem-sucedido e o estado foi atualizado
    await waitFor(() => {
      expect(screen.getByTestId('loginStatus').textContent).toBe('Logged In');
      expect(screen.getByTestId('name').textContent).toBe('John Doe');
    });

    // Verifica se o localStorage foi atualizado corretamente
    expect(window.localStorage.getItem('token')).toBe('mock-token');
  });

  it('should log out and clear the state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Simula o login
    await act(async () => {
      userEvent.click(screen.getByText('Login'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('loginStatus').textContent).toBe('Logged In');
    });

    // Simula o logout e aguarda o estado ser atualizado
    await act(async () => {
      userEvent.click(screen.getByText('Logout'));
    });

    await waitFor(() => {
      // Verifica se o logout limpou o estado e o localStorage
      expect(screen.getByTestId('loginStatus').textContent).toBe('Logged Out');
      expect(screen.getByTestId('name').textContent).toBe('No Name');
      expect(window.localStorage.getItem('token')).toBeNull();
    });
  });

  it('should show an error when login fails', async () => {
    // Simula um erro ao fazer login
    (authenticateUser as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Simula o clique no botão de login
    await act(async () => {
      userEvent.click(screen.getByText('Login'));
    });

    // Verifica se o erro foi exibido
    await waitFor(() => {
      expect(screen.getByTestId('error').textContent).toBe('Usuário ou senha inválidos');
    });
  });

  it('should retrieve user data from localStorage', async () => {
    // Simula dados já armazenados no localStorage
    window.localStorage.setItem('token', 'existing-token');
    window.localStorage.setItem('role', 'admin');
    window.localStorage.setItem('name', 'Existing User');
    window.localStorage.setItem('user_id', '1');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Verifica se o estado foi recuperado do localStorage
    await waitFor(() => {
      expect(screen.getByTestId('loginStatus').textContent).toBe('Logged In');
      expect(screen.getByTestId('name').textContent).toBe('Existing User');
    });
  });
});
