/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-expect-error: [For now, ignore the TypeScript ]
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
import Button from '../../utils/Button'
import Wrapper from '../../utils/Wrapper'
import { useAuth } from '../../Context/AuthContext'


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

const ListActivities = () => {
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const { isAdmin, isManager, userId, isProfessor } = useAuth()
  const [citizenId, setCitizenId] = useState<number | null>(null)

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
      window.alert(message) 
    } catch (error: any) {
      window.alert(error.message || 'Erro ao tentar inscrever o cidadão na atividade') 
    }
  }

  useEffect(() => {
    handleGetActivities()
  }, [])

  useEffect(() => {
    if (userId) {
      setCitizenId(userId)
    }
  }, [userId])

  return (
    <Wrapper>
      <S.PageTitle>Atividades</S.PageTitle>
      <S.Subtitle>
        Explore as diversas atividades esportivas que oferecemos e encontre aquela que melhor se encaixa em seu estilo
        de vida. Participe, mantenha-se ativo e faça parte de nossa comunidade esportiva!
      </S.Subtitle>

      {isAdmin || isManager && 
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            color="primary"
            size="small"
            variant="contained"
            disabled
          >
            Criar atividade
          </Button>
        </div>
      }

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
                  {activity.id && (!isAdmin || !isManager || !isProfessor) && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button 
                        onClick={() => handleEnrollCitizen(activity.id || 0, citizenId)}
                        size='small'
                      >
                        Increver-se
                      </Button>
                    </div>
                  )}
                </S.CardSection>
              </S.CardContent>
            )}
          </S.Card>
        ))}
      </S.CardList>
    </Wrapper>
  )
}

export default ListActivities
