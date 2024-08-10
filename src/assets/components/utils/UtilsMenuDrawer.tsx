// src/components/utils/UtilsMenuDrawer.tsx
import React from 'react';

interface UtilsMenuDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const UtilsMenuDrawer: React.FC<UtilsMenuDrawerProps> = ({ isOpen, toggleDrawer }) => {
  return (
    <div style={{ ...styles.drawer, transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
      <button onClick={toggleDrawer}>Close Drawer</button>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
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
    transition: 'transform 0.3s ease-in-out',
  } as React.CSSProperties,
};

export default UtilsMenuDrawer;
