// @ts-expect-error: [For now, ignore the TypeScript ]
import React, { useState } from 'react'
import * as S from './styles'
import { Collapse, Divider } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import HomeIcon from '@mui/icons-material/Home'
import ScheduleIcon from '@mui/icons-material/Schedule'
import PersonIcon from '@mui/icons-material/Person'
import MenuIcon from '@mui/icons-material/Menu'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AddIcon from '@mui/icons-material/Add'
import ListIcon from '@mui/icons-material/List'
import SportsIcon from '@mui/icons-material/Sports';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import * as Logo from '../../assets/logotipo_sgiep.png'
import { useNavigate } from 'react-router-dom'

type MenuProps = {
  isOpen: boolean
  toggleDrawer: () => void
}

const Menu = ({ isOpen, toggleDrawer }: MenuProps) => {
  const [adminOpen, setAdminOpen] = useState(false)
  const [professorOpen, setProfessorOpen] = useState(false)
  const [citizenOpen, setCitizenOpen] = useState(false)
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  const handleAdminClick = () => {
    setAdminOpen(!adminOpen)

    if (!isOpen)
      toggleDrawer()
  }

  const handleProfessorClick = () => {
    setProfessorOpen(!professorOpen)

    if (!isOpen)
      toggleDrawer()
  }

  const handleCitizenClick = () => {
    setCitizenOpen(!citizenOpen)

    if (!isOpen)
      toggleDrawer()
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
          >
          <ul>
            <Divider sx={{mt: 2}}/>
            {!isOpen &&
              <S.ListItemButton onClick={toggleDrawer}>
                <MenuIcon />
              </S.ListItemButton>
            }
            <S.ListItemButton onClick={() => handleNavigate('/')}>
              <HomeIcon />
              {isOpen && <span>Home</span>}
            </S.ListItemButton>

            <S.ListItemButton onClick={handleProfessorClick}>
              <AccountBoxIcon />
              {isOpen && <span>Professor</span>}
            </S.ListItemButton>
            <Collapse in={professorOpen} timeout="auto" unmountOnExit>
              <S.SublistItemButton onClick={() => handleNavigate('/professors/schedule')}>
                <ScheduleIcon />
                {isOpen && <span>Agenda</span>}
              </S.SublistItemButton>
            </Collapse>

            <S.ListItemButton onClick={handleCitizenClick}>
              <PersonIcon />
              {isOpen && <span>Cidadão</span>}
            </S.ListItemButton>
            <Collapse in={citizenOpen} timeout="auto" unmountOnExit>
              <S.SublistItemButton onClick={() => handleNavigate('/citizens/schedule')}>
                <ScheduleIcon />
                {isOpen && <span>Agenda</span>}
              </S.SublistItemButton>
            </Collapse>

            <S.ListItemButton onClick={handleAdminClick}>
              <AdminPanelSettingsIcon />
              {isOpen && <span>Administrador</span>}
            </S.ListItemButton>
            <Collapse in={adminOpen} timeout="auto" unmountOnExit>
              <S.SublistItemButton onClick={() => handleNavigate('/admin/list')}>
                <ListIcon />
                {isOpen && <span>Lista</span>}
              </S.SublistItemButton>
              <S.SublistItemButton onClick={() => handleNavigate('/admin/form')}>
                <AddIcon />
                {isOpen && <span>Adicionar</span>}
              </S.SublistItemButton>
            </Collapse>

            <S.ListItemButton onClick={() => handleNavigate('/activities')}>
              <SportsIcon />
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
