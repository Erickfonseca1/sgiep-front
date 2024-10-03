
import React from 'react'
import { AppBar, Box, IconButton, Toolbar, Menu, MenuItem, Avatar } from '@mui/material'
import { useAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const { logout, name, isAdmin, isManager, isCitizen, isProfessor } = useAuth()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const navigate = useNavigate()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleMenuClose()
    logout()
  }

  const handleEditProfile = () => {
    handleMenuClose()
    navigate('/my-account')
  }


  return (
    <Box>
      <AppBar position="fixed" sx={{ backgroundColor: '#03624C'}}>
        <Toolbar
          sx={{
            display: 'flex',
            paddingLeft: '64px !important',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <p
              style={{
                color: 'white',
                fontSize: '18px',
                marginRight: 'auto',
                marginLeft: '16px',
                alignItems: 'center',
              }}
            >
              Olá, <b>{name}</b> - {isAdmin ? 'Administrador' : isManager ? 'Gestor' : isCitizen ? 'Cidadão' : isProfessor ? 'Professor' : ''}
            </p>
            <IconButton
              edge="end"
              color="inherit"
              sx={{
                marginLeft: 'auto',
              }}
              onClick={handleMenuOpen}
            >
              <Avatar alt={name || undefined} />
            </IconButton>

            {/* Menu suspenso */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleEditProfile}>Editar Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar
