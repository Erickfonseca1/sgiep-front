// src/Router.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './assets/layouts/DefaultLayout';
import Home from './assets/pages/Home';
import About from './assets/pages/About';
import Contact from './assets/pages/Contact';
import Activicty from './assets/pages/Activicty';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="/about" element={<DefaultLayout><About /></DefaultLayout>} />
        <Route path="/contact" element={<DefaultLayout><Contact /></DefaultLayout>} />
        <Route path="/activicty" element={<DefaultLayout><Activicty /></DefaultLayout>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
