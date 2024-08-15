import React, { useState } from 'react'
import './App.css'
import RoutesMap from './Routes'
import Menu from './utils/Menu'
import TopBar from './utils/TopBar'

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <div
      style={{ backgroundColor: '#f5f5f5', height: '100vh', overflow: 'hidden' }}
    >
      <TopBar toggleDrawer={toggleDrawer} />
      <Menu isOpen={drawerOpen} toggleDrawer={toggleDrawer}/>
      <RoutesMap />
    </div>
  )
}

export default App