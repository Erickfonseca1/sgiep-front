// @ts-expect-error: [For now, ignore the TypeScript ]
import React, { useEffect, useState } from 'react'
import * as S from './styles'
import { Collapse, Divider } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import HomeIcon from '@mui/icons-material/Home'
import ScheduleIcon from '@mui/icons-material/Schedule'
import MenuIcon from '@mui/icons-material/Menu'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AddIcon from '@mui/icons-material/Add'
import ListIcon from '@mui/icons-material/List'
import SportsIcon from '@mui/icons-material/Sports';
import BadgeIcon from '@mui/icons-material/Badge';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import * as Logo from '../../assets/logotipo_sgiep.png'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import GroupsIcon from '@mui/icons-material/Groups';

type MenuProps = {
  isOpen: boolean
  toggleDrawer: () => void
}

const Menu = ({ isOpen, toggleDrawer }: MenuProps) => {
  const [adminOpen, setAdminOpen] = useState(false)
  const [professorsOpen, setProfessorsOpen] = useState(false)
  const [managerOpen, setManagerOpen] = useState(false)
  const [citizenOpen, setCitizenOpen] = useState(false)
  const [sportsOpen, setSportsOpen] = useState(false)
  const navigate = useNavigate()
  const { isAdmin, isProfessor, isCitizen, isManager} = useAuth()

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  const handleAdminClick = () => {
    setAdminOpen(!adminOpen)

    if (!isOpen)
      toggleDrawer()
  }

  const handleProfessorsClick = () => {
    setProfessorsOpen(!professorsOpen)

    if (!isOpen)
      toggleDrawer()
  }

  const handleCitizenClick = () => {
    setCitizenOpen(!citizenOpen)

    if (!isOpen)
      toggleDrawer()
  }

  const handleManagerClick = () => {
    setManagerOpen(!managerOpen)

    if (!isOpen)
      toggleDrawer()
  }

  const handleSportsClick = () => {
    setSportsOpen(!sportsOpen)

    if (!isOpen)
      toggleDrawer()
  }

  useEffect(() => {
    if (!isOpen) {
      setAdminOpen(false)
      setProfessorsOpen(false)
      setManagerOpen(false)
      setCitizenOpen(false)
      setSportsOpen(false)
    }
  }, [toggleDrawer])

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
            width: '100%',
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
            {isAdmin &&
              <>
                <S.ListItemButton onClick={handleAdminClick}>
                  <AdminPanelSettingsIcon />
                  {isOpen && <span>Administrador</span>}
                </S.ListItemButton>
                <Collapse in={adminOpen} timeout="auto" unmountOnExit>
                  <S.SublistItemButton onClick={() => handleNavigate('/admins/list')}>
                    <ListIcon />
                    {isOpen && <span>Lista</span>}
                  </S.SublistItemButton>
                  <S.SublistItemButton onClick={() => handleNavigate('/admins/form')}>
                    <AddIcon />
                    {isOpen && <span>Adicionar</span>}
                  </S.SublistItemButton>
                </Collapse>
                <S.ListItemButton onClick={handleManagerClick}>
                  <BadgeIcon />
                  {isOpen && <span>Gestor</span>}
                </S.ListItemButton>
                <Collapse in={managerOpen} timeout="auto" unmountOnExit>
                  <S.SublistItemButton onClick={() => handleNavigate('/managers/list')}>
                    <ListIcon />
                    {isOpen && <span>Lista</span>}
                  </S.SublistItemButton>
                  <S.SublistItemButton onClick={() => handleNavigate('/managers/form')}>
                    <AddIcon />
                    {isOpen && <span>Adicionar</span>}
                  </S.SublistItemButton>
                </Collapse>
                <S.ListItemButton onClick={handleProfessorsClick}>
                  <CoPresentIcon />
                  {isOpen && <span>Professores</span>}
                </S.ListItemButton>
                <Collapse in={professorsOpen} timeout="auto" unmountOnExit>
                  <S.SublistItemButton onClick={() => handleNavigate('/professors/list')}>
                    <ListIcon />
                    {isOpen && <span>Lista</span>}
                  </S.SublistItemButton>
                  <S.SublistItemButton onClick={() => handleNavigate('/professors/form')}>
                    <AddIcon />
                    {isOpen && <span>Adicionar</span>}
                  </S.SublistItemButton>
                </Collapse>
                <S.ListItemButton onClick={handleCitizenClick}>
                  <GroupsIcon />
                  {isOpen && <span>Cidadãos</span>}
                </S.ListItemButton>
                <Collapse in={citizenOpen} timeout="auto" unmountOnExit>
                  <S.SublistItemButton onClick={() => handleNavigate('/citizens/list')}>
                    <ListIcon />
                    {isOpen && <span>Lista</span>}
                  </S.SublistItemButton>
                  <S.SublistItemButton onClick={() => handleNavigate('/citizens/form')}>
                    <AddIcon />
                    {isOpen && <span>Adicionar</span>}
                  </S.SublistItemButton>
                </Collapse>
                <S.ListItemButton onClick={handleSportsClick}>
                  <SportsIcon />
                  {isOpen && <span>Atividades Esportivas</span>}
                </S.ListItemButton>
                <Collapse in={sportsOpen} timeout="auto" unmountOnExit>
                  <S.SublistItemButton onClick={() => handleNavigate('/activities/form')}>
                    <AddIcon />
                    {isOpen && <span>Adicionar</span>}
                  </S.SublistItemButton>
                </Collapse>
              </> 
            }

            {isManager &&
              <>
                <S.ListItemButton onClick={handleProfessorsClick}>
                  <CoPresentIcon />
                  {isOpen && <span>Professores</span>}
                </S.ListItemButton>
                <Collapse in={professorsOpen} timeout="auto" unmountOnExit>
                  <S.SublistItemButton onClick={() => handleNavigate('/professors/list')}>
                    <ListIcon />
                    {isOpen && <span>Lista</span>}
                  </S.SublistItemButton>
                  <S.SublistItemButton onClick={() => handleNavigate('/professors/form')}>
                    <AddIcon />
                    {isOpen && <span>Adicionar</span>}
                  </S.SublistItemButton>
                </Collapse>
                <S.ListItemButton onClick={() => handleNavigate('/activities')}>
                  <SportsIcon />
                  {isOpen && <span>Atividades Esportivas</span>}
                </S.ListItemButton>
              </>
            }

            {isProfessor &&
              <>

                <S.ListItemButton onClick={() => handleNavigate('/professors/schedule')}>
                  <ScheduleIcon />
                  {isOpen && <span>Minha Agenda</span>}
                </S.ListItemButton>
              </>
            }

            {isCitizen &&
              <>
                <S.ListItemButton onClick={() => handleNavigate('/citizens/schedule')}>
                  <ScheduleIcon />
                  {isOpen && <span>Agenda</span>}
                </S.ListItemButton>
                <S.ListItemButton onClick={() => handleNavigate('/activities')}>
                  <SportsIcon />
                  {isOpen && <span>Atividades Esportivas</span>}
                </S.ListItemButton>
              </>
            }
            {/* <ul>
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

            </ul> */}
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
