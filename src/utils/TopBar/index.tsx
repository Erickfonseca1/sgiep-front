// @ts-expect-error: [For now, ignore the TypeScript ]
import React from 'react'
import { AppBar, Box, Toolbar } from '@mui/material'

const TopBar = () => {
  return (
    <Box>
      <AppBar position="fixed" sx={{ backgroundColor: '#03624C'}}>
        <Toolbar
          sx={{
            display: 'flex',
            paddingLeft: '64px !important',
          }}
        >
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar
