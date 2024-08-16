// @ts-expect-error: [For now, ignore the TypeScript ]
import React from 'react'
import * as S from './styles'
import { Divider, Drawer, IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import HomeIcon from '@mui/icons-material/Home'
import ScheduleIcon from '@mui/icons-material/Schedule'
import SubjectIcon from '@mui/icons-material/Subject';
import * as Logo from '../../assets/logotipo_sgiep.png'

type MenuProps = {
  isOpen: boolean
  toggleDrawer: () => void
}

const Menu = ({ isOpen, toggleDrawer }: MenuProps) => {
  const handleNavigateToHome = () => {
    toggleDrawer()
    window.location.href = '/'
  }

  const handleNavigateToProfessorSchedule = () => {
    toggleDrawer()
    window.location.href = '/professorschedule'
  }

  const handleNavigateToCitizenSchedule = () => {
    toggleDrawer()
    window.location.href = '/citizenschedule'
  }

  const handleNavigateToActivities = () => {
    toggleDrawer()
    window.location.href = '/activities'
  }

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      anchor="left"
      variant="temporary"
      sx={{
        width: '250px',
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: '250px', boxSizing: 'border-box' },
      }}
    >
      <S.Wrapper>
        <S.HeaderSection>
          <S.Header>
            <img src={Logo.default} alt="Logo SGIEP" style={{ width: '40px', height: '40px' }} />
            <S.MenuTitle>SGIEP</S.MenuTitle>
          </S.Header>
          <IconButton onClick={toggleDrawer}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </S.HeaderSection>
        <Divider />
        <ul>
          <S.ListItemButton onClick={handleNavigateToHome}>
            <HomeIcon />
            <span>Home</span>
          </S.ListItemButton>
          <S.ListItemButton onClick={handleNavigateToProfessorSchedule}>
            <ScheduleIcon />
            <span>Agenda do Professor</span>
          </S.ListItemButton>
          <S.ListItemButton onClick={handleNavigateToCitizenSchedule}>
            <ScheduleIcon />
            <span>Agenda do Cidadão</span>
          </S.ListItemButton>
          <S.ListItemButton onClick={handleNavigateToActivities}>
            <SubjectIcon />
            <span>Atividades Esportivas</span>
          </S.ListItemButton>
        </ul>
      </S.Wrapper>
    </Drawer>
  )
}

export default Menu
