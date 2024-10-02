import { CitizenType } from '@/Types/user'

export type ScheduleType = {
  id?: number
  dayOfWeek: string
  startTime: string
  endTime: string
  activityName?: string
  activityLocation?: string
  citizens?: CitizenType[]
}
