import { ActivityType } from './activity'

export type ProfessorType = {
  id?: number
  name: string
  role: string
  activitiesAsProfessor?: ActivityType[]
}

export type CitizenType = {
  id?: number
  name: string
  role: string
  activitiesAsStudent?: ActivityType[]
}

export type ManagerType = {
  id?: number
  name: string
  email: string
  role: string
}

export type AdminType = {
  id?: number
  name: string
  email: string
  role: string
}

//enum com os tipos de usuários
export enum UserType {
  ADMIN = 'admin',
  MANAGER = 'manager',
  PROFESSOR = 'professor',
  CITIZEN = 'citizen'
}
