// @ts-ignore
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/index';
import About from '../Pages/About/index';
import Contact from '../Pages/Contact/index';
import ProfessorCalendar from '../Pages/ProfessorCalendar';
import CitizenCalendar from '../Pages/CitizenCalendar';

const RoutesMap = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/professorschedule" element={<ProfessorCalendar professorId={1} />} />
        <Route path="/citizenschedule" element={<CitizenCalendar citizenId={5} />} />
      </Routes>
    </Router>
  );
};

export default RoutesMap;
