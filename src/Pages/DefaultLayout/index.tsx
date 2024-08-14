// src/assets/layouts/DefaultLayout.tsx
import React, { useState } from 'react';
import UtilsAppBar from '../../utils/Utils';
import UtilsMenuDrawer from '../../utils/UtilsMenuDrawer';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <div style={styles.layout}>
      <UtilsAppBar toggleDrawer={toggleDrawer} />
      <UtilsMenuDrawer isOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <main style={styles.main}>
        <div style={styles.container}>
          {children}
        </div>
      </main>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Full height of viewport
  } as React.CSSProperties,
  main: {
    backgroundColor: '#f5f5f5',
    flex: 1, // Grow to fill available space
    paddingTop: '64px', // Adjust according to the height of the AppBar
    overflow: 'auto', // Allow scrolling if content exceeds the height
    transition: 'margin 0.3s ease-in-out',
  } as React.CSSProperties,
  container: {
    padding: '0',
    maxWidth: '100%',
  } as React.CSSProperties,
};

export default DefaultLayout;
