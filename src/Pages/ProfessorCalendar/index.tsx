// @ts-expect-error: [For now, ignore the TypeScript ]
import React, { useEffect, useState } from 'react'
import * as S from './styles'
import { getProfessor } from '../../Services/professors'
import { ProfessorType } from '../../Types/user'
import { ScheduleType } from '../../Types/schedule'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Wrapper from '../../utils/Wrapper'
import { useAuth } from '../../Context/AuthContext'
import { getActivitySchedules } from '../../Services/activities'

const daysOfWeekMap: { [key: string]: string } = {
  Sunday: 'Domingo',
  Monday: 'Segunda-feira',
  Tuesday: 'Terça-feira',
  Wednesday: 'Quarta-feira',
  Thursday: 'Quinta-feira',
  Friday: 'Sexta-feira',
  Saturday: 'Sábado',
}

const daysOfWeekOrder: { [key: string]: number } = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
}

const getDayOfWeekInPortuguese = (dayOfWeek: string): string => {
  const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1).toLowerCase()
  return daysOfWeekMap[capitalizedDayOfWeek]
}

const ProfessorCalendar = () => {
  const { userId } = useAuth()
  const [professor, setProfessor] = useState<ProfessorType | undefined>()
  const [schedules, setSchedules] = useState<ScheduleType[]>([])

  const handleGetProfessor = async (id: number) => {
    try {
      const professorData = await getProfessor(id)
      setProfessor(professorData)

      if (professorData.activitiesAsProfessor) {
        const allSchedules: ScheduleType[] =[]
        for (const activity of professorData.activitiesAsProfessor) {
          const activitySchedules = await getActivitySchedules(activity.id!)
          allSchedules.push(
            ...activitySchedules.map((schedule) => ({
              ...schedule,
              activityName: activity.name,
              activityLocation: activity.location,
            })),
          )
        }
        setSchedules(allSchedules)
      }
    } catch (error) {
      console.error('Failed to fetch professor:', error)
    }
  }

  const sortedSchedules = schedules.sort((a, b) => daysOfWeekOrder[a.dayOfWeek] - daysOfWeekOrder[b.dayOfWeek])

  useEffect(() => {
    if (userId)
      handleGetProfessor(userId)
  }, [userId])

  return (
    <Wrapper>
      {professor &&
        <>
          <S.PageTitle>Agenda do Professor - {professor.name}</S.PageTitle>
          <S.Subtitle>
            Visualize sua agenda semanal de aulas e atividades. Este é o seu espaço para se organizar e garantir que todas
            as suas sessões sejam conduzidas com excelência. Mantenha-se preparado e faça a diferença na vida de seus
            alunos!
          </S.Subtitle>

          {/* <S.CardList>
            {sortedSchedules.map((schedule) => (
              <S.Card key={schedule.id}>
                <S.EventCard>
                  <S.Text className="day">{getDayOfWeekInPortuguese(schedule.dayOfWeek)}</S.Text>
                  <p>
                    {schedule.startTime} - {schedule.endTime}
                  </p>
                </S.EventCard>
                <S.CardContent>
                  <div style={{ alignItems: 'center', display: 'flex' }}>
                    <DirectionsRunIcon sx={{ marginRight: '8px' }} fontSize="small" />
                    {schedule.activityName}
                  </div>
                  <div style={{ alignItems: 'center', display: 'flex' }}>
                    <LocationOnIcon sx={{ marginRight: '8px' }} fontSize="small" />
                    {schedule.activityLocation}
                  </div>
                </S.CardContent>
              </S.Card>
            ))}
          </S.CardList> */}
          <S.CalendarContainer>
            {Object.keys(daysOfWeekOrder).map((dayOfWeek) => (
              <S.WeekColumn key={dayOfWeek}>
                <S.DayHeader>
                  {getDayOfWeekInPortuguese(dayOfWeek)}
                </S.DayHeader>
                <S.DayContent>
                  {sortedSchedules
                    .filter((schedule) => schedule.dayOfWeek === dayOfWeek)
                    .map((schedule) => (
                      <S.EventCard key={schedule.id}>
                        <S.EventTime>
                          {schedule.startTime} - {schedule.endTime}
                        </S.EventTime>
                        <S.EventContent>
                          <DirectionsRunIcon sx={{ marginRight: '8px' }} fontSize="small" />
                          {schedule.activityName}
                        </S.EventContent>
                        <S.EventContent>
                          <LocationOnIcon sx={{ marginRight: '8px' }} fontSize="small" />
                          {schedule.activityLocation}
                        </S.EventContent>
                      </S.EventCard>
                    ))}
                </S.DayContent>
              </S.WeekColumn>
            ))}
          </S.CalendarContainer>
        </>
      }
    </Wrapper>
  )
}

export default ProfessorCalendar
