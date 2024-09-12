/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthProviderType } from '../Types/auth'
import { me } from '../Services/me'

const AuthContext = createContext<AuthProviderType>({
  isLoggedIn: false,
  isAdmin: false,
  isGestor: false,
  isProfessor: false,
  isCidadao: false,
  token: null,
  login: () => {},
  logout: () => {}
})

export const useAuth = () => useContext(AuthContext)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [isGestor, setIsGestor] = useState<boolean>(false)
  const [isProfessor, setIsProfessor] = useState<boolean>(false)
  const [isCidadao, setIsCidadao] = useState<boolean>(false) 
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const login = (token: string, userType: string) => {
    setToken(token)
    setIsAdmin(userType === 'admin')
    setIsGestor(userType === 'gestor')
    setIsProfessor(userType === 'professor')
    setIsCidadao(userType === 'citizen')
    localStorage.setItem('token', token)
    localStorage.setItem('userType', userType)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setToken(null)
    setIsAdmin(false)
    setIsGestor(false)
    setIsProfessor(false)
    setIsCidadao(false)
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    setIsLoggedIn(false)
  }

  const getMe = async () => {
    try {
      const user = await me()
      setToken(user.token)

      console.log('user:', user)

      if (user.token && user.userType) {
        login(user.token, user.userType)
      }
    } catch (error) {
      console.error(error)
      logout()
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    console.log('isLoggedIn useEffect:', isLoggedIn)
  }, [isLoggedIn])
    

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, isGestor, isProfessor, isCidadao, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}