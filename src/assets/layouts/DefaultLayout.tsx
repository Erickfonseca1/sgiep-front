// src/layout/DefaultLayout.tsx
import React, { useState, useEffect } from 'react';
import UtilsAppBar from '../components/utils/UtilsAppBar';
import UtilsMenuDrawer from '../components/utils/UtilsMenuDrawer';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    document.title = 'Default Layout';
  }, []);

  return (
    <div>
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
  main: {
    backgroundColor: '#f5f5f5',
    minHeight: '92vh',
    transition: 'margin 0.3s ease-in-out',
  } as React.CSSProperties,
  container: {
    padding: '0',
    maxWidth: '100%',
  } as React.CSSProperties,
};

export default DefaultLayout;
