/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthProviderType, AuthType } from '../Types/auth'
import { authenticateUser } from '../Services/auth'

const AuthContext = createContext<AuthProviderType>({
  isLoggedIn: false,
  isAdmin: false,
  isManager: false,
  isProfessor: false,
  isCitizen: false,
  token: null,
  name: null,
  handleLogin: async (email: string, password: string) => false,
  logout: () => {},
  loading: false,
  error: null,
  loadingAuthState: true,
  setLoadingAuthState: () => {}
})

export const useAuth = () => useContext(AuthContext)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [isManager, setIsManager] = useState<boolean>(false)
  const [isProfessor, setIsProfessor] = useState<boolean>(false)
  const [isCitizen, setIsCitizen] = useState<boolean>(false) 
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('token') ? true : false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [loadingAuthState, setLoadingAuthState] = useState<boolean>(true);

  const logout = () => {
    setToken(null);
    setName(null);
    setIsAdmin(false);
    setIsManager(false);
    setIsProfessor(false);
    setIsCitizen(false);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
  }

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    setError(null)

    try {
      const { token, role, name } = await authenticateUser(email, password)

      setToken(token)
      setName(name)
      setIsAdmin(role === 'admin');
      setIsManager(role === 'gestor');
      setIsProfessor(role === 'professor');
      setIsCitizen(role === 'citizen');
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      setIsLoggedIn(true)
      return true
    } catch (error) {
      console.error(error)
      setError('Usuário ou senha inválidos')
      return false
    } finally {
      setLoading(false)
    }
  }

  const getMe = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedRole = localStorage.getItem('role');
      const storedName = localStorage.getItem('name');

      if (storedToken && storedRole) {
        setToken(storedToken);
        setName(storedName);
        setIsLoggedIn(true);
        setIsAdmin(storedRole === 'admin');
        setIsManager(storedRole === 'gestor');
        setIsProfessor(storedRole === 'professor');
        setIsCitizen(storedRole === 'citizen');
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Erro ao buscar dados de login:', error);
      logout();
    } finally {
      setLoadingAuthState(false);
    }
  }

  useEffect(() => {
    getMe();
  }, [])

  useEffect(() => {
    if (!isLoggedIn && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
      window.location.href = '/login'
    }
  }, [isLoggedIn])

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      isAdmin, 
      isManager, 
      isProfessor, 
      isCitizen, 
      token, 
      name, 
      handleLogin, 
      logout, 
      loading, 
      error, 
      loadingAuthState,
      setLoadingAuthState
    }}>
      {children}
    </AuthContext.Provider>
  )
}