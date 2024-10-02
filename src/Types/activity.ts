import { Key } from "react";

export type ActivityType = {
  id?: number; 
  name: string;
  description: string;
  location: string;
  maxVacancies: number;
  professor: { id: number, name?: string }; 
  schedules: {
    [x: string]: Key | null | undefined; dayOfWeek: string, startTime: string, endTime: string 
}[];
}
