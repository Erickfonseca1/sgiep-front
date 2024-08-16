// @ts-expect-error: [For now, ignore the TypeScript ]
import React, { useState } from 'react'
import './App.css'
import RoutesMap from './Routes'
import Menu from './utils/Menu'
import TopBar from './utils/TopBar'
import { Box } from '@mui/material'

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar toggleDrawer={toggleDrawer} />
      <Menu isOpen={drawerOpen} toggleDrawer={toggleDrawer}/>
      <main style={{ height: 'calc(100vh - 64px)', width: '100%', paddingTop: '64px'}}>
        <RoutesMap /> 
      </main>
    </Box>
  )
}

export default App
