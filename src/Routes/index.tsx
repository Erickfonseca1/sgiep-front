// src/Router.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from '../Pages/DefaultLayout/index';
import Home from '../Pages/Home/index';
import About from '../Pages/About/index';
import Contact from '../Pages/Contact/index';
import ProfessorSchedule from '../Pages/ProfessorSchedule/index';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="/about" element={<DefaultLayout><About /></DefaultLayout>} />
        <Route path="/contact" element={<DefaultLayout><Contact /></DefaultLayout>} />
        <Route path="/professorschedule" element={<DefaultLayout><ProfessorSchedule /></DefaultLayout>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
