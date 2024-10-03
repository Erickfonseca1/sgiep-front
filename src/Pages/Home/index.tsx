import { useEffect, useState } from 'react'
import * as S from './styles'
import * as Logo from '../../assets/full_logotipo_3.png'
import { getActivities, getActivityCitizens, getActivitySchedules } from '../../Services/activities'
import { getActiveProfessors } from '../../Services/professors'
import { getCitizens } from '../../Services/citizens'
import SportsIcon from '@mui/icons-material/Sports';
import PersonIcon from '@mui/icons-material/Person'
import BadgeIcon from '@mui/icons-material/Badge';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { ProfessorType, CitizenType, ManagerType } from '../../Types/user'
import { ActivityType } from '../../Types/activity'
import Button from '../../utils/Button'
import Wrapper from '../../utils/Wrapper'
import { useAuth } from '../../Context/AuthContext'
import { getActiveManagers } from '../../Services/managers'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { ScheduleType } from '../../Types/schedule'

const Home = () => {
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [professors, setProfessors] = useState<ProfessorType[]>([])
  const [citizens, setCitizens] = useState<CitizenType[]>([])
  const [managers, setManagers] = useState<ManagerType[]>([])
  const { isAdmin, isManager, isProfessor, isCitizen, name, userId } = useAuth()

  const handleGetDataLengths = () => {
    getActivities().then((response) => {
      setActivities(response)
    })

    getActiveProfessors().then((response) => {
      setProfessors(response)
    })

    getCitizens().then((response) => {
      setCitizens(response)
    })

    getActiveManagers().then((response) => {
      setManagers(response)
    })
  }

  const handleNavigateTo = (route: string) => {
    window.location.href = route
  }

  const getNextActivityMessage = (activitySchedules: ScheduleType[]) => {
    if (activitySchedules.length === 0) return 'Nenhum compromisso encontrado.'

    const dayOfWeekMap: { [key: string]: number } = {
      SUNDAY: 0,
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6
    };
  
    const today = dayjs();

    const nextSchedule = activitySchedules
      .map((schedule) => {
        const nextDayOfWeek = dayOfWeekMap[schedule.dayOfWeek];
        let nextDate = today.day(nextDayOfWeek);

        if (nextDate.isBefore(today, 'day')) {
          nextDate = nextDate.add(1, 'week');
        }
  
        return {
          ...schedule,
          nextDateTime: nextDate.set('hour', parseInt(schedule.startTime.split(':')[0]))
                                .set('minute', parseInt(schedule.startTime.split(':')[1]))
        };
      })
      .sort((a, b) => a.nextDateTime.diff(b.nextDateTime))[0]; // Ordenar e pegar o primeiro compromisso
  
    const daysUntilNext = nextSchedule.nextDateTime.diff(today, 'days');
  
    return `Seu próximo compromisso é a aula de ${nextSchedule.activityName} daqui a ${daysUntilNext} dias.`;
  };

  const [myActivities, setMyActivities] = useState<ActivityType[]>([])
  const [myNextCommitmentMessage, setMyNextCommitmentMessage] = useState('')

  const handleGetMyActivities = async () => {
    try {
      const response = await getActivities(); // Primeira chamada para obter as atividades
      console.log('Todas as atividades:', response);
  
      const filteredActivities = [];
      const allSchedules = [];
  
      // Itera sobre as atividades e busca os cidadãos associados
      for (const activity of response) {
        const citizens = await getActivityCitizens(activity.id); // Segunda chamada para buscar cidadãos associados
  
        // Verifica se o cidadão está inscrito na atividade ou se é o professor responsável
        const isStudent = citizens.some(citizen => citizen.id === userId);
        const isProfessor = activity.professor?.id === userId;
  
        if (isStudent || isProfessor) {
          filteredActivities.push(activity);
  
          // Adiciona os horários associados à atividade
          const schedules = await getActivitySchedules(activity.id);
          allSchedules.push(...schedules.map((s) => ({ ...s, activityName: activity.name })));
        }
      }
  
      console.log('Atividades filtradas:', filteredActivities);
      setMyActivities(filteredActivities);
  
      // Define a mensagem do próximo compromisso
      const nextActivityMessage = getNextActivityMessage(allSchedules);
      setMyNextCommitmentMessage(nextActivityMessage);
  
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    }
  };

  useEffect(() => {
    handleGetDataLengths()
    handleGetMyActivities()
  }, [userId])

  useEffect(() => {
    console.log('myActivities', myActivities)
  }, [myActivities])

  return (
    <Wrapper>
      {(isAdmin || isManager) && (
        <S.Container>
          <S.ImageContainer>
            <img src={Logo.default} alt="Logo SGIEP" />
          </S.ImageContainer>

          <>
            <S.Divider />
          </>

          <S.Content>
            <S.PageTitle>SGIEP</S.PageTitle>
            <S.Subtitle>Sistema de Gerenciamento para Instituições Esportivas Públicas</S.Subtitle>

            <S.Dashboard>
              <S.DashboardItem>
                <span>Atividades</span>
                <span>{activities.length}</span>
                <SportsIcon />
              </S.DashboardItem>

              {isAdmin && (
                <>
                  <S.DashboardItem>
                    <span>Gestores Ativos</span>
                    <span>{managers.length}</span>
                    <BadgeIcon />
                  </S.DashboardItem>
                  <S.DashboardItem>
                    <span>Professores Ativos</span>
                    <span>{professors.length}</span>
                    <CoPresentIcon />
                  </S.DashboardItem>
                  <S.DashboardItem>
                    <span>Cidadãos</span>
                    <span>{citizens.length}</span>
                    <PersonIcon />
                  </S.DashboardItem>
                </>
              )}

              {isManager && (
                <>
                  <S.DashboardItem>
                    <span>Professores</span>
                    <span>{professors.length}</span>
                    <CoPresentIcon />
                  </S.DashboardItem>
                  <S.DashboardItem>
                    <span>Cidadãos</span>
                    <span>{citizens.length}</span>
                    <PersonIcon />
                  </S.DashboardItem>
                </>
              )}
            </S.Dashboard>
            <S.ButtonsSection>
              <Button 
                onClick={() => handleNavigateTo('/activities')}
                size='small'
                color='primary'
                variant='outlined'
              >
                Atividades
              </Button>
              {isAdmin && (
                <>
                  <Button 
                    onClick={() => handleNavigateTo('/managers/list')}
                    size='small'
                    color='primary'
                    variant='outlined'
                  >
                    Gestores 
                  </Button>
                  <Button 
                    onClick={() => handleNavigateTo('/professors/list')}
                    size='small'
                    color='primary'
                    variant='outlined'
                  >
                    Professores 
                  </Button>
                  <Button 
                    onClick={() => handleNavigateTo('/activities')}
                    size='small'
                    color='primary'
                    variant='outlined'
                    disabled
                  >
                    Cidadãos 
                  </Button>
                </>
              )}
              {isManager && (
                <>
                  <Button 
                    onClick={() => handleNavigateTo('/professors/list')}
                    size='small'
                    color='primary'
                    variant='outlined'
                  >
                    Professores 
                  </Button>
                  <Button 
                    onClick={() => handleNavigateTo('/activities')}
                    size='small'
                    color='primary'
                    variant='outlined'
                    disabled
                  >
                    Cidadãos 
                  </Button>
                </>
              )}
            </S.ButtonsSection>
          </S.Content>
        </S.Container>
      )}

      {(isProfessor || isCitizen) && (
        <>
          <S.PageTitle>
            Bem-vindo ao SGIEP, {name}!
          </S.PageTitle>

          {isProfessor && (
            <>
              <S.Subtitle>Minhas Atividades</S.Subtitle>
              <S.ActivityContainer>
                {myActivities.length > 0 ? (
                  myActivities.map((activity) => (
                    <S.ActivityCard key={activity.id}>
                      <S.ActivityName>{activity.name}</S.ActivityName>
                      <S.ActivityDetails>Local: {activity.location}</S.ActivityDetails>
                    </S.ActivityCard>
                  ))
                ) : (
                  <S.NoActivityMessage>Nenhuma atividade encontrada.</S.NoActivityMessage>
                )}
              </S.ActivityContainer>
              <S.NextCommitment>{myNextCommitmentMessage}</S.NextCommitment>
            </>
          )}

          {isCitizen && (
            <>
              <S.Subtitle>Minhas Atividades</S.Subtitle>
              <S.ActivityContainer>
                {myActivities.length > 0 ? (
                  myActivities.map((activity) => (
                    <S.ActivityCard key={activity.id}>
                      <S.ActivityName>{activity.name}</S.ActivityName>
                      <S.ActivityDetails>Local: {activity.location}</S.ActivityDetails>
                    </S.ActivityCard>
                  ))
                ) : (
                  <S.NoActivityMessage>Nenhuma atividade encontrada.</S.NoActivityMessage>
                )}
              </S.ActivityContainer>
              <S.NextCommitment>{myNextCommitmentMessage}</S.NextCommitment>
            </>
          )}
        </>
      )}
    </Wrapper>
  )
}

export default Home
