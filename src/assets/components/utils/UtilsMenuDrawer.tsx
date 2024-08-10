// src/components/UtilsMenuDrawer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface UtilsMenuDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const UtilsMenuDrawer: React.FC<UtilsMenuDrawerProps> = ({ isOpen, toggleDrawer }) => {
  return (
    <div style={{ ...styles.drawer, transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
      <button onClick={toggleDrawer}>Close Drawer</button>
      <ul>
        <li><Link to="/" onClick={toggleDrawer}>Home</Link></li>
        <li><Link to="/about" onClick={toggleDrawer}>About</Link></li>
        <li><Link to="/contact" onClick={toggleDrawer}>Contact</Link></li>
      </ul>
    </div>
  );
};

const styles = {
  drawer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '250px',
    height: '100%',
    backgroundColor: '#FFF',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
  } as React.CSSProperties,
};

export default UtilsMenuDrawer;
