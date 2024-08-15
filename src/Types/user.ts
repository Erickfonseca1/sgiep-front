import { ActivityType } from './activity'

export type ProfessorType = {
  id?: number
  name: string
  role: string
  activities?: ActivityType[]
}

export type CitizenType = {
    id?: number,
    name: string,
    role: string,
    activities?: ActivityType[]
}
