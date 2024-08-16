// @ts-expect-error: [For now, ignore the TypeScript ]
import React, { useEffect, useState } from 'react'
import * as S from './styles'
import { CitizenType } from '../../Types/user'
import { getCitizen } from '../../Services/citizens'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import LocationOnIcon from '@mui/icons-material/LocationOn'

type CitizenCalendarProps = {
  citizenId: number
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

const CitizenCalendar = ({ citizenId }: CitizenCalendarProps) => {
  const [citizen, setCitizen] = useState<CitizenType | undefined>()

  const handleGetCitizen = async () => {
    try {
      const citizenData = await getCitizen(citizenId)
      setCitizen(citizenData)
    } catch (error) {
      console.error('Failed to fetch citizen:', error)
    }
  }

  const sortedActivities = citizen?.activities?.flatMap((activity) =>
    activity.schedules?.map((schedule) => ({
      ...schedule,
      activityName: activity.name,
      activityLocation: activity.location,
    }))
  )?.sort((a, b) => (a && b) ? daysOfWeekOrder[a.dayOfWeek] - daysOfWeekOrder[b.dayOfWeek] : 0);


  useEffect(() => {
    handleGetCitizen()
  }, [citizenId])

  return (
    <S.Wrapper>
      <S.PageTitle>Agenda Cidadão - {citizen?.name}</S.PageTitle>
      <S.Subtitle>Confira sua agenda semanal de atividades esportivas. Mantenha-se informado sobre seus compromissos e horários, e participe ativamente das aulas e eventos que você se inscreveu. Estar preparado é o primeiro passo para um estilo de vida saudável e ativo!</S.Subtitle>
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

export default CitizenCalendar
