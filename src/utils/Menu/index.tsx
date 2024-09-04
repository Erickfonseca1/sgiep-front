// @ts-expect-error: [For now, ignore the TypeScript ]
import React from 'react'
import * as S from './styles'
import { Divider } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import HomeIcon from '@mui/icons-material/Home'
import ScheduleIcon from '@mui/icons-material/Schedule'
import SubjectIcon from '@mui/icons-material/Subject'
import MenuIcon from '@mui/icons-material/Menu'
import * as Logo from '../../assets/logotipo_sgiep.png'

type MenuProps = {
  isOpen: boolean
  toggleDrawer: () => void
}

const Menu = ({ isOpen, toggleDrawer }: MenuProps) => {

  const handleNavigate = (path: string) => {
    window.location.href = path;
  }

  return (
    <S.DrawerWrapper variant="permanent" open={isOpen}>
      <S.Wrapper>
        <S.HeaderSection open={isOpen}>
          <S.Header>
            <img src={Logo.default} alt="Logo SGIEP" style={{ width: '35px', height: '35px'}} />
            {isOpen && <S.MenuTitle>SGIEP</S.MenuTitle>}
          </S.Header>
        </S.HeaderSection>
        <Divider style={{color: 'black'}} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <ul>
            {!isOpen &&
              <S.ListItemButton onClick={toggleDrawer}>
                <MenuIcon />
              </S.ListItemButton>
            }
            <S.ListItemButton onClick={() => handleNavigate('/')}>
              <HomeIcon />
              {isOpen && <span>Home</span>}
            </S.ListItemButton>
            <S.ListItemButton onClick={() => handleNavigate('/professorschedule')}>
              <ScheduleIcon />
              {isOpen && <span>Agenda do Professor</span>}
            </S.ListItemButton>
            <S.ListItemButton onClick={() => handleNavigate('/citizenschedule')}>
              <ScheduleIcon />
              {isOpen && <span>Agenda do Cidadão</span>}
            </S.ListItemButton>
            <S.ListItemButton onClick={() => handleNavigate('/activities')}>
              <SubjectIcon />
              {isOpen && <span>Atividades Esportivas</span>}
            </S.ListItemButton>
          </ul>
          <ul>
              {isOpen &&
              <>
                <Divider />
                <S.ListItemButton onClick={toggleDrawer}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      width: '100%',
                    }}
                  >
                    <ArrowBackIosNewIcon />
                  </div>
                </S.ListItemButton>
              </>
              }
          </ul>
        </div>
      </S.Wrapper>
    </S.DrawerWrapper>
  )
}

export default Menu
