// @ts-expect-error: [For now, ignore the TypeScript ]
import React, { useEffect, useState } from 'react'
import * as S from './styles'
import { getProfessor } from '../../Services/professors'
import { ProfessorType } from '../../Types/user'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Divider } from '@mui/material'

type ProfessorCalendarProps = {
  professorId: number
}

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

const ProfessorCalendar = ({ professorId }: ProfessorCalendarProps) => {
  const [professor, setProfessor] = useState<ProfessorType | undefined>()

  const handleGetProfessor = async () => {
    try {
      const professorData = await getProfessor(professorId)
      setProfessor(professorData)
    } catch (error) {
      console.error('Failed to fetch professor:', error)
    }
  }

  const sortedActivities = professor?.activities?.flatMap((activity) =>
    activity.schedules?.map((schedule) => ({
      ...schedule,
      activityName: activity.name,
      activityLocation: activity.location,
    }))
  )?.sort((a, b) => (a && b) ? daysOfWeekOrder[a.dayOfWeek] - daysOfWeekOrder[b.dayOfWeek] : 0);


  useEffect(() => {
    handleGetProfessor()
  }, [professorId])

  return (
    <S.Wrapper>
      <S.PageTitle>Agenda do Professor- {professor?.name}</S.PageTitle>
      <S.Subtitle>Visualize sua agenda semanal de aulas e atividades. Este é o seu espaço para se organizar e garantir que todas as suas sessões sejam conduzidas com excelência. Mantenha-se preparado e faça a diferença na vida de seus alunos!</S.Subtitle>

      <S.CardList>
      {sortedActivities?.map((schedule) => ( 
        schedule && (
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
        )
        ))}
      </S.CardList>
    </S.Wrapper>
  )
}

export default ProfessorCalendar
