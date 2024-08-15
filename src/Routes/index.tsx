// @ts-ignore
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/index';
import About from '../Pages/About/index';
import Contact from '../Pages/Contact/index';
import CitizenSchedule from '../Pages/CitizenSchedule/index';
import ProfessorCalendar from '../Pages/ProfessorCalendar';

const RoutesMap = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/professorschedule" element={<ProfessorCalendar professorId={1} />} />
        <Route path="/citizenschedule" element={<CitizenSchedule />} />
      </Routes>
    </Router>
  );
};

export default RoutesMap;
