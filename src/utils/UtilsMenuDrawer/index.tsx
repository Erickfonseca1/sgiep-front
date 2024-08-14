// src/components/UtilsMenuDrawer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ManageHistory from '@mui/icons-material/ManageHistory';

interface UtilsMenuDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const UtilsMenuDrawer: React.FC<UtilsMenuDrawerProps> = ({ isOpen, toggleDrawer }) => {
  return (
    <Drawer
    variant='temporary'
    anchor='left'
    open={isOpen}
    onClose={toggleDrawer}
    sx={{ ...styles.drawer, transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
    >
      <div>
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Divider></Divider>
        <List>
          <ListItem button onClick={toggleDrawer} component={Link} to='/'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem button onClick={toggleDrawer} component={Link} to='/about'>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText>About</ListItemText>
          </ListItem>
          <ListItem button onClick={toggleDrawer} component={Link} to='/contact'>
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText>Contact</ListItemText>
          </ListItem>
          <ListItem button onClick={toggleDrawer} component={Link} to='/citizenschedule'>
            <ListItemIcon>
              <ManageHistory />
            </ListItemIcon>
            <ListItemText>Agenda Cidadão</ListItemText>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

const styles = {
  drawer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100px',
    height: '100%',
    backgroundColor: '#FFF',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
  } as React.CSSProperties,
};

export default UtilsMenuDrawer;
