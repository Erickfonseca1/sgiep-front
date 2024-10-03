import { ActivityType } from './activity'

export type ProfessorType = {
  id?: number
  name: string
  role: string
  email: string
  activitiesAsProfessor?: ActivityType[]
  active?: boolean
}

export type CitizenType = {
  id?: number
  name: string
  email: string
  role: string
  activitiesAsStudent?: ActivityType[]
  active?: boolean
}

export type ManagerType = {
  id?: number
  name: string
  email: string
  role: string
  active?: boolean
}

export type AdminType = {
  id?: number
  name: string
  email: string
  role: string
}

export type UserProfileType = {
  id: number
  name: string
  email: string
  role: string
  phone?: string
  address?: string
}

//enum com os tipos de usuários
export enum UserType {
  ADMIN = 'admin',
  MANAGER = 'manager',
  PROFESSOR = 'professor',
  CITIZEN = 'citizen'
}
