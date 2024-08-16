// @ts-expect-error: [For now, ignore the TypeScript ]
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home/index'
import ProfessorCalendar from '../Pages/ProfessorCalendar'
import CitizenCalendar from '../Pages/CitizenCalendar'
import ListActivities from '../Pages/ListActivities'

const RoutesMap = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/professorschedule" element={<ProfessorCalendar professorId={1} />} />
        <Route path="/citizenschedule" element={<CitizenCalendar citizenId={5} />} />
        <Route path="/activities" element={<ListActivities />} />
      </Routes>
    </Router>
  )
}

export default RoutesMap
