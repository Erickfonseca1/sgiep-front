import dayjs, { Dayjs } from 'dayjs'
import { ActivityType } from '../../Types/activity'
import { ScheduleType } from '../../Types/schedule'

const dayOfWeekMap: { [key: string]: number } = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };

export const extractDatesFromActivities = (activities: ActivityType[]) => {
    const dates: Dayjs[] = []

    activities.forEach(activity => {
        activity.schedules && activity.schedules.forEach((schedule: ScheduleType) => {
            const dayOfWeekString = schedule.dayOfWeek
            const dayOfWeekNumber = dayOfWeekMap[dayOfWeekString]

            const currentWeekDay = dayjs().day(dayOfWeekNumber)
            dates.push(currentWeekDay)
        })
    })

    return dates
}