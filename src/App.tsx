// @ts-expect-error: [For now, ignore the TypeScript ]
import React, { useState } from 'react'
import './App.css'
import RoutesMap from './Routes'
import Menu from './utils/Menu'
import TopBar from './utils/TopBar'
import { Box, CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2CC295', // Mountain Meadow
      dark: '#00624C', // Dark Green
      light: '#CFFFD1', // Caribbean Green
      contrastText: '#FFFFFF', // Anti-Flash White
    },
    secondary: {
      main: '#177E6A', // Bangladesh Green
      dark: '#054A32', // Pine
      light: '#4F9A81', // Mint
      contrastText: '#000000', // Rich Black
    },
    background: {
      default: '#F5F5F5', // cinza claro usado no EventCard
      paper: '#FFFFFF', // branco usado em vários componentes
    },
    text: {
      primary: '#000000', // preto usado em CardContent
      secondary: '#0D3C21', // Rich Black (exemplo adicional)
    },
  },
  typography: {
    fontFamily: 'Quicksand, Roboto, sans-serif',
    h1: {
      fontFamily: 'Quicksand, sans-serif',
      fontSize: '32px',
      fontWeight: 300,
    },
    h2: {
      fontFamily: 'Quicksand, sans-serif',
      fontSize: '24px',
      fontWeight: 500,
    },
    body1: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 12, // Aplica bordas arredondadas globalmente
  },
  shadows: [
      'none',
      '0px 0px 4px rgba(0, 0, 0, 0.2)',
      '0px 0px 6px rgba(0, 0, 0, 0.1)',
      '0px 0px 6px rgba(0, 0, 0, 0.3)',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
  ],
})

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <TopBar toggleDrawer={toggleDrawer} />
        <Menu isOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        <main style={{ height: 'calc(100vh - 64px)', width: '100%', paddingTop: '64px' }}>
          <RoutesMap />
        </main>
      </Box>
    </ThemeProvider>
  )
}

export default App
