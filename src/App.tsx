// @ts-expect-error: [adicione uma descrição do motivo aqui]
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
    <div>
      <TopBar toggleDrawer={toggleDrawer} />
      <Menu isOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <RoutesMap />
    </div>
  )
}

export default App
