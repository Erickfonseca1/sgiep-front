import React, { useEffect, useState } from 'react'
import * as S from './styles'
import { getActivities } from '../../Services/activities'
import { ActivityType } from '@/Types/activity'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { ScheduleType } from '@/Types/schedule'
import { Divider } from '@mui/material'
import { enrollStudent } from '../../Services/enrollments'

dayjs.locale('pt-br')

const daysOfWeekMap: { [key: string]: string } = {
  SUNDAY: 'Domingo',
  MONDAY: 'Segunda-feira',
  TUESDAY: 'Terça-feira',
  WEDNESDAY: 'Quarta-feira',
  THURSDAY: 'Quinta-feira',
  FRIDAY: 'Sexta-feira',
  SATURDAY: 'Sábado',
}

//mocked user id
const citizenId = 3

const ListActivities = () => {
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const handleGetActivities = async () => {
    const response = await getActivities()
    setActivities(response)
  }

  const toggleCardExpansion = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  const getFormattedDays = (schedules: ScheduleType[]) => {
    const uniqueDays = schedules
      .map((schedule) => daysOfWeekMap[schedule.dayOfWeek])
      .filter((value, index, self) => self.indexOf(value) === index)

    return uniqueDays.join('/')
  }

  const getDayOfWeekInPortuguese = (dayOfWeek: string): string => {
    return daysOfWeekMap[dayOfWeek]
  }

  const handleEnrollCitizen = async (activityId: number, citizenId: number) => {
    try {
      const message = await enrollStudent(activityId, citizenId)
      window.alert(message) // Exibir a mensagem de sucesso como um alert
    } catch (error: any) {
      window.alert(error.message || 'Erro ao tentar inscrever o cidadão na atividade') // Exibir a mensagem de erro como um alert
    }
  }

  useEffect(() => {
    handleGetActivities()
  }, [])

  return (
    <S.Wrapper>
      <S.PageTitle>Atividades</S.PageTitle>
      <S.Subtitle>
        Explore as diversas atividades esportivas que oferecemos e encontre aquela que melhor se encaixa em seu estilo
        de vida. Participe, mantenha-se ativo e faça parte de nossa comunidade esportiva!
      </S.Subtitle>

      <S.CardList>
        {activities.map((activity) => (
          <S.Card key={activity.id} expanded={expandedCard === activity.id}>
            <S.CardHeader>
              {activity.schedules && <span>{`${activity.name} - ${getFormattedDays(activity.schedules)}`}</span>}
              <S.IconButton onClick={() => toggleCardExpansion(activity.id || 0)}>
                {expandedCard === activity.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </S.IconButton>
            </S.CardHeader>
            {expandedCard === activity.id && (
              <S.CardContent>
                <Divider textAlign="left">Descrição</Divider>
                <S.CardSection>
                  <span>{activity.description}</span>
                </S.CardSection>
                <Divider textAlign="left">Detalhes</Divider>
                <S.CardSection>
                  <span>Local: {activity.location}</span>
                  <span>Professor: {activity.professor ? activity.professor.name : 'Não atribuído'}</span>
                  <span>Horários: </span>
                  <span>
                    {activity.schedules?.map((schedule) => (
                      <span key={schedule.id}>
                        {getDayOfWeekInPortuguese(schedule.dayOfWeek)} - {schedule.startTime} às {schedule.endTime}
                        <br />
                      </span>
                    ))}
                  </span>
                  {activity.id && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <S.Button onClick={() => handleEnrollCitizen(activity.id || 0, citizenId)}>Increver-se</S.Button>
                    </div>
                  )}
                </S.CardSection>
              </S.CardContent>
            )}
          </S.Card>
        ))}
      </S.CardList>
    </S.Wrapper>
  )
}

export default ListActivities
