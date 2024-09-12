import { ActivityType } from './activity'

export type ProfessorType = {
  id?: number
  name: string
  role: string
  activities?: ActivityType[]
}

export type CitizenType = {
  id?: number
  name: string
  role: string
  activities?: ActivityType[]
}

export type ManagerType = {
  id?: number
  name: string
  role: string
}

export type AdminType = {
  id?: number
  name: string
  email: string
  password: string
  role: string
}
