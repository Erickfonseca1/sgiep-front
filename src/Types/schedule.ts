import { StudentType } from './user'

export type ScheduleType = {
  id?: number
  dayOfWeek: string
  startTime: string
  endTime: string
  activityName?: string
  students?: StudentType[]
}
