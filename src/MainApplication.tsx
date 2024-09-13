import React, { useState } from 'react'
import { Box } from '@mui/material'
import { useAuth } from './Context/AuthContext'
import Menu from './utils/Menu'
import TopBar from './utils/TopBar'
import RoutesMap from './Routes'

const Main: React.FC = () => {
  const { isLoggedIn } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {isLoggedIn &&
        <>
          <Menu isOpen={drawerOpen} toggleDrawer={toggleDrawer} />
          <TopBar/>
        </>
      }
      <main style={{ height: 'calc(100vh - 64px)', width: '100%', paddingTop: isLoggedIn ? '64px' :'0px' }}>
        <RoutesMap />
      </main>
    </Box>
  )
}

export default Main