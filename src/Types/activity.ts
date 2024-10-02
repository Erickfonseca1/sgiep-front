export type ActivityType = {
  id?: number; 
  name: string;
  description: string;
  location: string;
  maxVacancies: number;
  professor: { id: number, name?: string }; 
  schedules: { dayOfWeek: string, startTime: string, endTime: string }[];
}
