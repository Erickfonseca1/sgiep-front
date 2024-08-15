import { ScheduleType } from './schedule'
import { ProfessorType, StudentType } from './user'

export type ActivityType = {
  id?: number
  name: string
  description: string
  location: string
  professor: ProfessorType
  students?: StudentType[]
  schedules?: ScheduleType[]
}
