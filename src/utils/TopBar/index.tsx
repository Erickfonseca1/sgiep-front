// @ts-expect-error: [For now, ignore the TypeScript ]
import React from 'react'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../Context/AuthContext'

const TopBar = () => {
  const { logout, name, isAdmin, isManager, isCitizen, isProfessor } = useAuth()
  
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
              onClick={logout}
            >
              <LogoutIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar
