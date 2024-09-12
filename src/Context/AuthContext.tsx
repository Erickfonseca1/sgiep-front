/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthProviderType } from '../Types/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { authenticateUser } from '../Services/auth'

const AuthContext = createContext<AuthProviderType>({
  isLoggedIn: false,
  isAdmin: false,
  isGestor: false,
  isProfessor: false,
  isCidadao: false,
  token: null,
  login: () => {},
  logout: () => {},
  loading: false,
  error: null
})

export const useAuth = () => useContext(AuthContext)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [isGestor, setIsGestor] = useState<boolean>(false)
  const [isProfessor, setIsProfessor] = useState<boolean>(false)
  const [isCidadao, setIsCidadao] = useState<boolean>(false) 
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const location = useLocation()
  const navigate = useNavigate()

  const logout = () => {
    setToken(null);
    setName(null);
    setIsAdmin(false);
    setIsGestor(false);
    setIsProfessor(false);
    setIsCidadao(false);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
  }

  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const { token, role, name } = await authenticateUser(email, password)

      setToken(token)
      setName(name)
      setIsAdmin(role === 'admin');
      setIsGestor(role === 'gestor');
      setIsProfessor(role === 'professor');
      setIsCidadao(role === 'citizen');
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      setIsLoggedIn(true);

      navigate('/');
    } catch (error) {
      console.error(error)
      setError('Usuário ou senha inválidos')
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
        setIsGestor(storedRole === 'gestor');
        setIsProfessor(storedRole === 'professor');
        setIsCidadao(storedRole === 'citizen');
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Erro ao buscar dados de login:', error);
      logout();
    }
  }

  useEffect(() => {
    getMe();
  }, [])

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login')
    }
  }, [isLoggedIn, location.pathname, navigate])

    

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, isGestor, isProfessor, isCidadao, token, login: handleLogin, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}