import { ScheduleType } from '@/Types/schedule'
import { CitizenType, ProfessorType } from '@/Types/user'

export type ActivityType = {
  id?: number
  name: string
  description: string
  location: string
  professor?: ProfessorType
  professorId?: number
  citizens?: CitizenType[]
  schedules?: ScheduleType[]
  maxVacancies: number
}
