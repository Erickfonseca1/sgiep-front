/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-expect-error: [For now, ignore the TypeScript ]
import React, { useEffect, useState } from 'react'
import * as S from './styles'
import { getActivities, getActivitySchedules } from '../../Services/activities'
import { ActivityType } from '../../Types/activity'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { ScheduleType } from '@/Types/schedule'
import { AppBar, Divider, Toolbar, Typography } from '@mui/material'
import { enrollStudent } from '../../Services/enrollments'
import Button from '../../utils/Button'
import Wrapper from '../../utils/Wrapper'
import { useAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'


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

const PublicAcitivyList = () => {
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const { isAdmin, isManager, userId, isProfessor, isLoggedIn, isCitizen } = useAuth()
  const [citizenId, setCitizenId] = useState<number | null>(null)
  const [activitySchedules, setAcitivitySchedules] = useState<{[key: number]: ScheduleType[]}>({})

  const navigate = useNavigate()

  const handleGetActivities = async () => {
    const response = await getActivities()
    setActivities(response)
  }

  const toggleCardExpansion = async (id: number) => {
    if (expandedCard === id) {
      setExpandedCard(null)
    } else {
      setExpandedCard(id)
      if (!activitySchedules[id]) {
        const schedules = await getActivitySchedules(id)
        setAcitivitySchedules((prevSchedules) => ({ ...prevSchedules, [id]: schedules }))
      }
    }
  }

  const getDayOfWeekInPortuguese = (dayOfWeek: string): string => {
    return daysOfWeekMap[dayOfWeek]
  }

  const handleEnrollCitizen = async (activityId: number, citizenId: number | null) => {
    console.log('activityId', activityId)
    console.log('citizenId', citizenId)
  
    if (!citizenId) {
      window.alert('Usuário não está logado ou o ID do cidadão é inválido.');
      return;
    }
  
    try {
      const response = await enrollStudent({activityId, citizenId});
      window.alert(response);
    } catch (error: any) {
      if (error.message.includes("Não há vagas disponíveis")) {
        window.alert("Erro: Não há vagas disponíveis para esta atividade.");
      } else {
        window.alert(error.message || 'Erro ao tentar inscrever o cidadão na atividade');
      }
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
    <>
      {!isLoggedIn && (
        <AppBar 
          position="fixed" 
          color="primary"
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              SGIEP
            </Typography>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
              }}
            >
              <Button color="primary" variant='contained' size='small' onClick={() => navigate('/')}>
                Início
              </Button>

              {!userId && (
                <>
                  <Button color="primary" size='small' onClick={() => navigate('/activities')}>Atividades</Button>
                  <Button color="primary" variant='contained' size='small' onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button color="primary" variant='contained' size='small' onClick={() => navigate('/register')}>
                    Cadastro
                  </Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
      )}
      <div
        style={{
          marginTop: isLoggedIn ? '0' : '6rem',
          height: '100%',
        }}
      >
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
                  <span>{activity.name}</span>
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
                        {activitySchedules[activity.id]?.map((schedule) => (
                          <span key={schedule.id}>
                            {getDayOfWeekInPortuguese(schedule.dayOfWeek)} - {schedule.startTime} às {schedule.endTime}
                            <br />
                          </span>
                        ))}
                      </span>
                      {activity.id && (
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          {!userId ? (
                            <Button
                              onClick={() => navigate('/login')}
                              size="small"
                              color="primary"
                            >
                              Inscrever-se
                            </Button>
                          ) : (isAdmin || isManager || isProfessor) ? (
                            <Button
                              size="small"
                              color="primary"
                              disabled
                            >
                              Inscrever-se
                            </Button>
                          ) : ( isCitizen )&& (
                            <Button
                              onClick={() => handleEnrollCitizen(activity.id || 0, citizenId!)}
                              size="small"
                              color="primary"
                            >
                              Inscrever-se
                            </Button>
                          )}
                        </div>
                      )}
                    </S.CardSection>
                  </S.CardContent>
                )}
              </S.Card>
            ))}
          </S.CardList>
        </Wrapper>
      </div>
    </>
  )
}

export default PublicAcitivyList
