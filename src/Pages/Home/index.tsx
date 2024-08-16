// @ts-expect-error: [ignore]
import React, { useEffect, useState } from 'react'
import * as S from './styles'
import * as Logo from '../../assets/full_logotipo_3.png'
import { getActivities } from '../../Services/activities';
import { getProfessors } from '../../Services/professors';
import { getCitizens } from '../../Services/citizens';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import { ProfessorType, CitizenType } from '../../Types/user';
import { ActivityType } from '../../Types/activity';

const Home = () => {
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [professors, setProfessors] = useState<ProfessorType[]>([])
  const [citizens, setCitizens] = useState<CitizenType[]>([])

  const handleGetDataLengths = () => {
    getActivities().then((response) => {
      setActivities(response)
    })

    getProfessors().then((response) => {
      setProfessors(response)
    })

    getCitizens().then((response) => {
      setCitizens(response)
    })
  }

  useEffect(() => {
    handleGetDataLengths()
  }, [])

  return (
    <S.Wrapper>
      <S.Container>
        <S.ImageContainer
        >
          <img src={Logo.default} alt='Logo SGIEP' style={{ width: '320px', height: '320px'}} />
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
              <SportsBasketballOutlinedIcon sx={{ fontSize: 80 }} />
            </S.DashboardItem>
            <S.Divider />

            <S.DashboardItem>
              <span>Professores</span>
              <span>{professors.length}</span>
              <SchoolIcon sx={{ fontSize: 80 }} />
            </S.DashboardItem>
            <S.Divider />
            <S.DashboardItem>
              <span>Cidadãos</span>
              <span>{citizens.length}</span>
              <PersonIcon sx={{ fontSize: 80 }} />
            </S.DashboardItem>
          </S.Dashboard>

          <S.ButtonsSection>
            <S.Button>
              <span>Ver Atividades</span>
            </S.Button>
            <S.Button>
              <span>Agenda Professor</span>
            </S.Button>
            <S.Button>
              <span>Agenda Cidadão</span>
            </S.Button>
          </S.ButtonsSection>
        </S.Content>
      </S.Container>
    </S.Wrapper>
  )
};

export default Home
