import dayjs, { Dayjs } from 'dayjs'
import { ActivityType } from '@/Types/activity'
import { extractDatesFromActivities } from '@/utils/Functions'

// Mock data for activities
const mockActivities: ActivityType[] = [
  {
      id: 1,
      name: 'Football',
      location: 'Field 1',
      schedules: [
          {
              id: 1,
              dayOfWeek: 'MONDAY',
              startTime: '10:00',
              endTime: '11:00',
          },
          {
              id: 2,
              dayOfWeek: 'WEDNESDAY',
              startTime: '10:00',
              endTime: '11:00',
          },
      ],
      description: '',
      professor: {
          id: undefined,
          name: '',
          role: '',
          activities: undefined
      }
  },
  {
      id: 2,
      name: 'Basketball',
      location: 'Court 2',
      schedules: [
          {
              id: 3,
              dayOfWeek: 'FRIDAY',
              startTime: '12:00',
              endTime: '13:00',
          },
      ],
      description: '',
      professor: {
          id: undefined,
          name: '',
          role: '',
          activities: undefined
      }
  },
]

describe('extractDatesFromActivities', () => {
  it('should correctly extract dates based on the day of the week from activities', () => {
    // Call the function with the mock data
    const result: Dayjs[] = extractDatesFromActivities(mockActivities)

    // Get the current week's Monday, Wednesday, and Friday
    const expectedDates = [
      dayjs().day(1), // MONDAY
      dayjs().day(3), // WEDNESDAY
      dayjs().day(5), // FRIDAY
    ]

    // Compare the result with the expected dates
    expect(result.length).toBe(expectedDates.length)

    result.forEach((date, index) => {
      expect(date.isSame(expectedDates[index], 'day')).toBe(true)
    })
  })

  it('should return an empty array if there are no activities', () => {
    const emptyActivities: ActivityType[] = []
    const result = extractDatesFromActivities(emptyActivities)
    expect(result).toEqual([])
  })

  it('should return an empty array if activities have no schedules', () => {
    const activitiesWithoutSchedules: ActivityType[] = [
      {
          id: 1,
          name: 'Yoga',
          location: 'Room 1',
          schedules: [],
          description: '',
          professor: {
              id: undefined,
              name: '',
              role: '',
              activities: undefined
          }
      },
    ]

    const result = extractDatesFromActivities(activitiesWithoutSchedules)
    expect(result).toEqual([])
  })

  it('should handle activities with undefined schedules', () => {
    const activitiesWithUndefinedSchedules: ActivityType[] = [
      {
          id: 1,
          name: 'Swimming',
          location: 'Pool',
          schedules: undefined,
          description: '',
          professor: {
              id: undefined,
              name: '',
              role: '',
              activities: undefined
          }
      },
    ]

    const result = extractDatesFromActivities(activitiesWithUndefinedSchedules)
    expect(result).toEqual([])
  })
})
