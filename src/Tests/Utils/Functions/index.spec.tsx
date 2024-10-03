import dayjs from 'dayjs';
import { extractDatesFromActivities } from '../../../utils/Functions'; // Substitua pelo caminho correto
import { ActivityType } from '../../../Types/activity';
import { ScheduleType } from '../../../Types/schedule';

describe('extractDatesFromActivities', () => {
  it('should return an empty array if no activities are provided', () => {
    const activities: ActivityType[] = [];
    const result = extractDatesFromActivities(activities);
    expect(result).toEqual([]);
  });

  it('should return an empty array if activities have no schedules', () => {
    const activities: ActivityType[] = [
      { id: 1, name: 'Activity 1', schedules: [] } as unknown as ActivityType,
    ];
    const result = extractDatesFromActivities(activities);
    expect(result).toEqual([]);
  });

  it('should return correct dates for activities with schedules', () => {
    const schedules: ScheduleType[] = [
      { dayOfWeek: 'MONDAY', startTime: '08:00', endTime: '09:00' },
      { dayOfWeek: 'WEDNESDAY', startTime: '10:00', endTime: '11:00' },
    ];

    const activities: ActivityType[] = [
      { id: 1, name: 'Activity 1', schedules } as ActivityType,
    ];

    const result = extractDatesFromActivities(activities);

    const expectedDates = [
      dayjs().day(1), // MONDAY
      dayjs().day(3), // WEDNESDAY
    ];

    // Verifica se as datas retornadas correspondem às datas esperadas (considerando o mesmo dia da semana)
    expect(result[0].day()).toBe(expectedDates[0].day());
    expect(result[1].day()).toBe(expectedDates[1].day());
  });

  it('should handle multiple activities with schedules', () => {
    const schedules1: ScheduleType[] = [
      { dayOfWeek: 'FRIDAY', startTime: '09:00', endTime: '10:00' },
    ];

    const schedules2: ScheduleType[] = [
      { dayOfWeek: 'TUESDAY', startTime: '07:00', endTime: '08:00' },
    ];

    const activities: ActivityType[] = [
      { id: 1, name: 'Activity 1', schedules: schedules1 } as ActivityType,
      { id: 2, name: 'Activity 2', schedules: schedules2 } as ActivityType,
    ];

    const result = extractDatesFromActivities(activities);

    const expectedDates = [
      dayjs().day(5), // FRIDAY
      dayjs().day(2), // TUESDAY
    ];

    expect(result[0].day()).toBe(expectedDates[0].day());
    expect(result[1].day()).toBe(expectedDates[1].day());
  });
});
