import { ScheduleType } from "./schedule"
import { CitizenType, ProfessorType } from "./user"

export type ActivityType = {
    id?: number,
    name: string,
    description: string,
    location: string,
    professor: ProfessorType,
    citizens?: CitizenType[],
    schedules?: ScheduleType[]
}