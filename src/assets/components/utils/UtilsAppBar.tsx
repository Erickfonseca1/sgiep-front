// src/components/UtilsAppBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface UtilsAppBarProps {
  toggleDrawer: () => void;
}

const UtilsAppBar: React.FC<UtilsAppBarProps> = ({ toggleDrawer }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
        </Typography>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About</Link>
        </Typography>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
        </Typography>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/activicty" style={{ color: 'inherit', textDecoration: 'none' }}>Activity</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default UtilsAppBar;
