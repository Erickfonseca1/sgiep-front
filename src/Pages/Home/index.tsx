// @ts-expect-error: [ignore]
import React, { useEffect, useState } from 'react'
import * as S from './styles'
import * as Logo from '../../assets/full_logotipo_3.png'
import { getActivities } from '../../Services/activities'
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


const Home = () => {
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [professors, setProfessors] = useState<ProfessorType[]>([])
  const [citizens, setCitizens] = useState<CitizenType[]>([])
  const [managers, setManagers] = useState<ManagerType[]>([])
  const { isAdmin, isManager, isProfessor, isCitizen, name } = useAuth()

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

  useEffect(() => {
    handleGetDataLengths()
  }, [])

  return (
    <Wrapper>
      {(isAdmin || isManager) &&
        <S.Container>
          <S.ImageContainer>
            <img src={Logo.default} alt="Logo SGIEP" style={{ width: '320px', height: '320px' }} />
          </S.ImageContainer>

          <>
            <S.Divider />
          </>

          <S.Content>
            <S.PageTitle>SGIEP</S.PageTitle>
            <S.Subtitle>Sistema de Gerenciamento para Instituições Esportivas Públicas</S.Subtitle>

            <br />

            <S.Dashboard>
              <S.DashboardItem>
                <span>Atividades</span>
                <span>{activities.length}</span>
                <SportsIcon sx={{ fontSize: 80 }} />
              </S.DashboardItem>
              <S.Divider />

              {isAdmin &&
                <>
                  <S.DashboardItem>
                    <span>Gestores Ativos</span>
                    <span>{managers.length}</span>
                    <BadgeIcon sx={{ fontSize: 80 }} />
                  </S.DashboardItem>
                  <S.Divider />
                  <S.DashboardItem>
                    <span>Professores Ativos</span>
                    <span>{professors.length}</span>
                    <CoPresentIcon sx={{ fontSize: 80 }} />
                  </S.DashboardItem>
                  <S.Divider />
                  <S.DashboardItem>
                    <span>Cidadãos</span>
                    <span>{citizens.length}</span>
                    <PersonIcon sx={{ fontSize: 80 }} />
                  </S.DashboardItem>
                </>
              }

              {isManager &&
                <>
                  <S.DashboardItem>
                    <span>Professores</span>
                    <span>{professors.length}</span>
                    <CoPresentIcon sx={{ fontSize: 80 }} />
                  </S.DashboardItem>
                  <S.Divider />
                  <S.DashboardItem>
                    <span>Cidadãos</span>
                    <span>{citizens.length}</span>
                    <PersonIcon sx={{ fontSize: 80 }} />
                  </S.DashboardItem>
                </>
              }

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
              {isAdmin &&
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
              }
              {isManager &&
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
              }
            </S.ButtonsSection>

          </S.Content>
        </S.Container>
      }

      {(isProfessor || isCitizen) &&
        <>
          <S.PageTitle>
            Bem-vindo ao SGIEP {name}!
          </S.PageTitle>

          {isProfessor &&
            <S.Subtitle>
              Lorem ipsum sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.
            </S.Subtitle>
          }

          {isCitizen &&
            <S.Subtitle>
              Lorem ipsum amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.
            </S.Subtitle>
          }
        </> 
      }
    </Wrapper>
  )
}

export default Home
