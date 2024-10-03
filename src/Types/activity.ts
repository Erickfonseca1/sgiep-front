export type ActivityType = {
  id?: number; 
  name: string;
  description: string;
  location: string;
  maxVacancies: number;
  professor: { id: number, name?: string }; 
  students: { id: number, name?: string }[];
  schedules: {
    dayOfWeek: string, // String format like 'MONDAY', 'TUESDAY', etc.
    startTime: string, // Time in 'HH:mm' format
    endTime: string    // Time in 'HH:mm' format
  }[];
}
