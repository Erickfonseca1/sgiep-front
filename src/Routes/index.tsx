
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../Pages/Home/index'
import ProfessorCalendar from '../Pages/ProfessorCalendar'
import CitizenCalendar from '../Pages/CitizenCalendar'
import ListActivities from '../Pages/ListActivities'
import AdminForm from '../Pages/Admin/Form'
import Login from '../Pages/Login'
import {useAuth} from '../Context/AuthContext'

const RoutesMap = () => {
  const {isLoggedIn} = useAuth()
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ isLoggedIn ? <Navigate to="/" /> :  <Login />} />

        {isLoggedIn && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/professors">
              <Route path="schedule" element={<ProfessorCalendar professorId={1} />} />
            </Route>

            <Route path="/citizens">
              <Route path="schedule" element={<CitizenCalendar citizenId={3} />} />
            </Route>

            <Route path="/activities">
              <Route path="" element={<ListActivities />} />
            </Route>
            
            <Route path="/admin">
              <Route path="form" element={<AdminForm />} />
            </Route>
          </>
        )}
      </Routes>
    </Router>
  )
}

export default RoutesMap
