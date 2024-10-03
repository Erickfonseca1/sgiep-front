import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RoutesMap from '../../Routes';
import { useAuth } from '../../Context/AuthContext';

// Mocking the useAuth hook
jest.mock('../../Context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('RoutesMap Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render login when not authenticated', () => {
    // Mocking the return of useAuth to simulate not logged in
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: false,
      loadingAuthState: false,
      setLoadingAuthState: jest.fn(), // Mock the function
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <RoutesMap />
      </MemoryRouter>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('should render home page when logged in as an admin', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      isAdmin: true,
      isCitizen: false,
      isProfessor: false,
      loadingAuthState: false,
      setLoadingAuthState: jest.fn(), // Mock the function
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <RoutesMap />
      </MemoryRouter>
    );

    expect(screen.getByText(/SGIEP/i)).toBeInTheDocument();
  });

  it('should show "Loading..." when loadingAuthState is true', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: false,
      loadingAuthState: true,
      setLoadingAuthState: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <RoutesMap />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
